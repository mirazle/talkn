class ClientScript {

    static get APP_NAME(){return "talkn"}
    static get MODE(){return "PROD"}
    static get PROTOCOL(){return "https"}
    static get BASE_PROD_HOST(){return "talkn.io"}
    static get BASE_DEV_HOST(){return "localhost"}
    static get BASE_DEV_PORT(){return 8080} 
    static get EXCLUSION_HOSTS(){return ['localhost', 'talkn.io']}    
    static get BASE_HOSTNAME(){
        if(ClientScript.MODE === "PROD"){
            return `${ClientScript.PROTOCOL}://${ClientScript.BASE_PROD_HOST}`;
        }else if(ClientScript.MODE === "START"){
            return `${ClientScript.PROTOCOL}://${ClientScript.BASE_DEV_HOST}`;
        }else if(ClientScript.MODE === "DEV"){
            return `${ClientScript.PROTOCOL}://${ClientScript.BASE_DEV_HOST}:${ClientScript.BASE_DEV_PORT}`;
        }
    };
    static get iframeCloseHeight(){return '45px'};
    static get iframeCloseNotifHeight(){return '85px'};
    static get iframeOpenHeight(){return '450px'};
    static get talknNotifId(){return "talknNotifId"};
    static get activeMethodSecond(){return 1000};
    static get aacceptPostMessages(){return ['toggleIframe', 'location', 'openNotif', 'closeNotif', 'linkTo', 'getClientMetas']};

    constructor(refusedFrame = false){
        this.connection = location.href.replace("http:/", "").replace("https:/", "");
        const hasSlash = this.connection.lastIndexOf("/") === ( this.connection.length - 1 );
        this.connection = hasSlash ? this.connection : this.connection + "/";
        const noBootFlg = ClientScript.EXCLUSION_HOSTS.some( host => this.connection.indexOf(host) >= 0);

        if(!noBootFlg){

            const talknFrame = document.querySelector(`iframe#${ClientScript.APP_NAME}Extension`);
            if( refusedFrame && talknFrame !== null){
                talknFrame.remove();
            }

            this.methodIdMap = {};
            this.notifId = null;
            this.bootExtension = this.bootExtension.bind(this);
            this.catchMessage = this.catchMessage.bind(this);
            this.handleErrorMessage = this.handleErrorMessage.bind(this);
            this.toggleIframe = this.toggleIframe.bind(this);
            this.location = this.location.bind(this);
            this.openNotif = this.openNotif.bind(this);
            this.closeNotif = this.closeNotif.bind(this);
            this.transitionend = this.transitionend.bind(this);

            // setupWindow
            this.setupWindow();
            this.iframe  = document.createElement("iframe");
            this.loadIframe = this.loadIframe.bind(this);
            this.talknUrl = refusedFrame ?
                chrome.runtime.getURL('index.html?' + this.connection) : ClientScript.BASE_HOSTNAME + this.connection;
            this.iframe.setAttribute("id", `${ClientScript.APP_NAME}Extension`);
            this.iframe.setAttribute("name", "extension");
            this.iframe.setAttribute("style",
                "z-index: 2147483647;" +
                "display: none;" +
                "align-items: flex-end;" + 
                "position: fixed; " +
                "bottom: 0px;" + 
                "right: 0px;" + 
                "width: 320px;" + 
                `height: ${ClientScript.iframeCloseHeight};` + 
                "margin: 0;" + 
                "padding: 0;" + 
                "transition: 0ms;" + 
                "transform: translate3d(0px, 0px, 0px);"
            );
            this.iframe.setAttribute("src", this.talknUrl );
            this.iframe.setAttribute("frameBorder", 0 );
            this.iframe.addEventListener( "load", this.loadIframe );
            this.iframe.addEventListener( "transitionend", this.transitionend );
            document.body.appendChild(this.iframe);
        }
    }

    setupWindow(){
        window.addEventListener('message', this.catchMessage, false);
    }

    loadIframe(e){
        this.iframe = e.path[1].querySelector(`iframe#${ClientScript.APP_NAME}Extension`);
        this.postMessage("bootExtension");
    }

    transitionend(e){
        const iframe = document.querySelector(`iframe#${ClientScript.APP_NAME}Extension`);
        iframe.style.transition = "0ms";
        iframe.backgroundColor = "green";

        // TODO onTransitionしないとdetail開くときにアニメーションにならない。
        this.postMessage("onTransitionEnd");
        this.postMessage("onTransition");
    }

    bootExtension(params){
        const iframe = document.querySelector(`iframe#${ClientScript.APP_NAME}Extension`);
        iframe.style.height = ClientScript.iframeCloseHeight;
        iframe.style.display = "flex";
        this.postMessage("offTransition");
    }

    catchMessage(e){
        const {type, method, params} = e.data;
        if( type === ClientScript.APP_NAME ){
            if(this[ method ] && typeof this[ method ] === "function"){
                if(this.methodIdMap[ method ] || ClientScript.aacceptPostMessages.includes(method)){
                    this[ method ]( params );
                    clearTimeout(this.methodIdMap[ method ]);
                    delete this.methodIdMap[ method ];
                }
            }
        }
    }

    postMessage(method, params = {}){
        const requestObj = this.getRequestObj( method, params );
        const methodId = setTimeout( () => this.handleErrorMessage(method), ClientScript.activeMethodSecond);
        this.methodIdMap[method] = methodId;
        this.iframe.contentWindow.postMessage(requestObj, this.talknUrl);
    }

    handleErrorMessage(method){
        if(this.methodIdMap[method]){
            switch(method){
            case 'bootExtension':
                console.log("FAULT");
                new ClientScript(true);
                break;
            }
        }
    }

    toggleIframe(params){
        const iframe = document.querySelector(`iframe#${ClientScript.APP_NAME}Extension`);
        const talknNotifId = sessionStorage.getItem(ClientScript.talknNotifId);

        if(talknNotifId === "null"){
            if( iframe.style.height !== ClientScript.iframeOpenHeight ){
                iframe.style.transition = "600ms";
                iframe.style.height = ClientScript.iframeOpenHeight;
            }else{
                iframe.style.transition = "600ms";
                iframe.style.height = ClientScript.iframeCloseHeight;
            }
        }else{
            clearTimeout( talknNotifId );
            sessionStorage.setItem(ClientScript.talknNotifId, null);
            this.postMessage("closeNotif");
            iframe.style.transition = "600ms";
            iframe.style.height = ClientScript.iframeOpenHeight;
        }
    }

    location(params){
        const {protocol, connection} = params;
        location.href = `${protocol}/${connection}`;
    }

    openNotif(params){
        const iframe = document.querySelector(`iframe#${ClientScript.APP_NAME}Extension`);
        iframe.style.transition = "0ms";
        iframe.style.height = ClientScript.iframeCloseNotifHeight;
        this.postMessage("openNotif");

        let talknNotifId = sessionStorage.getItem(ClientScript.talknNotifId);
        if(talknNotifId){
            clearTimeout( talknNotifId );
        }

        talknNotifId = setTimeout( this.closeNotif, params.transition );
        sessionStorage.setItem(ClientScript.talknNotifId, talknNotifId);
    }

    closeNotif(params){
        let talknNotifId = sessionStorage.getItem(ClientScript.talknNotifId);
        clearTimeout( talknNotifId );
        sessionStorage.setItem(ClientScript.talknNotifId, null);
        const iframe = document.querySelector(`iframe#${ClientScript.APP_NAME}Extension`);
        iframe.style.transition = "0ms";
        iframe.style.height = ClientScript.iframeCloseHeight;

        this.postMessage("closeNotif");
    }

    linkTo(params){
        if( params && params.href ){
            location.href = params.href
        }
    }

    getClientMetas(){
        const metas = document.querySelectorAll('meta');
        let clientMetas = {};

        for( let i = 0; i < metas.length; i++ ){
            const item = metas[ i ];
            let key = i;
            let content = '';
            if( item.getAttribute('name') ){
                key = item.getAttribute('name');
                content = item.getAttribute('content');
            }else if( item.getAttribute('property') ){
                key = item.getAttribute('property');
                content = item.getAttribute('content');
            }else if( item.getAttribute('chaset') ){
                key = 'charset';
                content = item.getAttribute('chaset');
            }else if( item.getAttribute('http-equiv') ){
                key = item.getAttribute('http-equiv');
                content = item.getAttribute('content');
            }
            clientMetas[ key ] = content;
        }
        this.postMessage("getClientMetas", clientMetas);
    }

    getRequestObj(method, params = {}){
        return {
            type: ClientScript.APP_NAME,
            url: location.href,
            href: location.href,
            method: method,
            methodId: 0,
            params: params
        };
    }
}

const c = new ClientScript();