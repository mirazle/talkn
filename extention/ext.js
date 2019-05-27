const ENV = "START";
class Ext {
    static get MODE(){
        return window.chrome && window.chrome.extension ? "BROESER" : "SCRIPT";
    }
    static get APP_NAME(){return "talkn"}
    static get ENV(){
        if( location.host.indexOf( Ext.BASE_DEV_HOST) >= 0 ){
            return "START";
        }
        return "PROD";
    }
    static get PROTOCOL(){return "https"}
    static get BASE_PROD_HOST(){return "talkn.io"}
    static get BASE_DEV_HOST(){return "localhost"}
    static get BASE_DEV_PORT(){return 8080} 
    static get FULL_WIDTH_THRESHOLD(){return 600}
    static get BASE_TRANSITION(){return 600}
    static get EXCLUSION_ORIGINS(){return ['https://localhost', 'https://talkn.io']}
    static get BASE_HOSTNAME(){
        if(ENV === "PROD"){
            return `${Ext.PROTOCOL}://${Ext.BASE_PROD_HOST}`;
        }else if(ENV === "START"){
            return `${Ext.PROTOCOL}://${Ext.BASE_DEV_HOST}`;
        }else if(ENV === "DEV"){
            return `${Ext.PROTOCOL}://${Ext.BASE_DEV_HOST}:${Ext.BASE_DEV_PORT}`;
        }
    };
    static getIframeOpenHeight(){
        if( Ext.MODE === "SCRIPT" ){
            if( window.innerWidth < Ext.FULL_WIDTH_THRESHOLD ){
                return `${Math.floor( window.innerHeight * 0.9 )}px`;
            }
        }
        return "450px";
    };
    static getIframeCloseHeight(){return '45px'};
    static getIframeOpenNotifHeight(){return '85px'};
    static getIframeWidth(){
        if( Ext.MODE === "SCRIPT" ){
            if( window.innerWidth < Ext.FULL_WIDTH_THRESHOLD ){
                return "100%";
            }
        }
        return Ext.iframeBrowserWidth + "px"; 
    };
    static get iframeBrowserWidth(){return 320};
    static get talknNotifId(){return "talknNotifId"};
    static get activeMethodSecond(){return 1000};
    static get aacceptPostMessages(){return ['toggleIframe', 'location', 'openNotif', 'closeNotif', 'linkTo', 'getClientMetas']};

    constructor(refusedFrame = false){
        console.log(this);
        this.refusedFrame = refusedFrame;
        this.href = window.location.href;
        this.connection = this.href.replace("http:/", "").replace("https:/", "");
        const hasSlash = this.connection.lastIndexOf("/") === ( this.connection.length - 1 );
        this.connection = hasSlash ? this.connection : this.connection + "/";
        const bootFlg = Ext.EXCLUSION_ORIGINS.every( ( origin ) =>{
            return this.href.indexOf( origin ) === -1;
        });

        if(bootFlg){

            this.methodIdMap = {};
            this.notifId = null;
            this.resizeMethodId = null;
            this.bootExtension = this.bootExtension.bind(this);
            this.catchMessage = this.catchMessage.bind(this);
            this.handleErrorMessage = this.handleErrorMessage.bind(this);
            this.toggleIframe = this.toggleIframe.bind(this);
            this.location = this.location.bind(this);
            this.openNotif = this.openNotif.bind(this);
            this.closeNotif = this.closeNotif.bind(this);
            this.transitionend = this.transitionend.bind(this);
            this.loadWindow = this.loadWindow.bind(this);
            this.resizeWindow = this.resizeWindow.bind(this);
            this.resizedWindow = this.resizedWindow.bind(this);

            // setupWindow
            this.setupWindow();
            this.iframe  = document.createElement("iframe");
            this.loadIframe = this.loadIframe.bind(this);
            this.talknUrl = this.getTalknUrl();
            this.iframe.setAttribute("id", `${Ext.APP_NAME}Extension`);
            this.iframe.setAttribute("name", "extension");
            this.iframe.setAttribute("style",
                "z-index: 2147483647 !important;" +
                "display: none !important;" +
                "align-items: flex-end !important;" + 
                "position: fixed !important; " +
                "bottom: 0px !important;" + 
                "right: 0px !important;" + 
                `width: ${Ext.getIframeWidth()} !important;` + 
                `height: ${Ext.getIframeCloseHeight()} !important;` + 
                "margin: 0 !important;" + 
                "padding: 0 !important;" + 
                "transition: 0ms !important;" + 
                "transform: translate3d(0px, 0px, 0px) !important;"
            );
            this.iframe.setAttribute("src", this.talknUrl );
            this.iframe.setAttribute("frameBorder", 0 );
            this.iframe.addEventListener( "load", this.loadIframe );
            this.iframe.addEventListener( "transitionend", this.transitionend );

            document.body.appendChild(this.iframe);
        }
    }

    getTalknUrl(){
        return this.refusedFrame ?
            chrome.runtime.getURL('index.html?' + this.connection) :
            Ext.BASE_HOSTNAME + this.connection;
    }

    setupWindow(){
        console.log(window);
        window.addEventListener('message', this.catchMessage, false);
        window.addEventListener('load', this.loadWindow);
        window.addEventListener('resize', this.resizeWindow);
    }

    loadIframe(e){
        console.log("LOAD");
        this.iframe = document.querySelector(`iframe#${Ext.APP_NAME}Extension`);
        this.postMessage("bootExtension");
        this.postMessage("postExtensionData", {
            extensionMode: Ext.MODE,
            extensionWidth: Ext.getIframeWidth().replace("px", "" ),
            extensionOpenHeight: Number( Ext.getIframeOpenHeight().replace("px", "") ),
            extensionCloseHeight: Number( Ext.getIframeCloseHeight().replace("px", "") )
        });
    }

    transitionend(e){
        const iframe = document.querySelector(`iframe#${Ext.APP_NAME}Extension`);
//        iframe.style.transition = "0ms";
//        this.postMessage("onTransitionEnd");
//        this.postMessage("onTransition");
    }

    bootExtension(params){

        // Display
        const iframe = document.querySelector(`iframe#${Ext.APP_NAME}Extension`);
        iframe.style.height = Ext.getIframeCloseHeight();
        iframe.style.display = "flex";
        this.postMessage("onTransition");
    }

    loadWindow(e){
        this.resizedWindow();
    }

    resizeWindow(e){
        if( this.resizeMethodId === null ){
            this.resizeMethodId = setTimeout( this.resizedWindow, Ext.BASE_TRANSITION );
        }
    }

    resizedWindow(e){
        this.resizeMethodId = null;
        const iframe = document.querySelector(`iframe#${Ext.APP_NAME}Extension`);
        const talknNotifId = sessionStorage.getItem(Ext.talknNotifId);
        iframe.style.width = Ext.getIframeWidth();

        if(talknNotifId === "null"){

            if( iframe.style.height === Ext.getIframeCloseHeight() ){
                iframe.style.height = Ext.getIframeCloseHeight();
            }else{
                iframe.style.height = Ext.getIframeOpenHeight();
            }

            this.postMessage("postExtensionData", {                
                extensionMode: Ext.MODE,
                extensionWidth: Ext.getIframeWidth().replace("px", "" ),
                extensionOpenHeight: Number( Ext.getIframeOpenHeight().replace("px", "") ),
                extensionCloseHeight: Number( Ext.getIframeCloseHeight().replace("px", "") )
            });
        }
    }

    catchMessage(e){
        const {type, method, params} = e.data;
        if( type === Ext.APP_NAME ){
            if(this[ method ] && typeof this[ method ] === "function"){
                if(this.methodIdMap[ method ] || Ext.aacceptPostMessages.includes(method)){
                    console.log("@@@@ CATCH " + method );
                    this[ method ]( params );
                    clearTimeout(this.methodIdMap[ method ]);
                    delete this.methodIdMap[ method ];
                }
            }
        }
    }

    postMessage(method, params = {}){
        const talknUrl = this.getTalknUrl();
        const requestObj = this.getRequestObj( method, params );
        const methodId = setTimeout( () => this.handleErrorMessage(method), Ext.activeMethodSecond);
        const talknFrame = document.querySelector(`iframe#${Ext.APP_NAME}Extension`);
        this.methodIdMap[method] = methodId;
        console.log("METHOD " + method + " " + talknUrl);
        talknFrame.contentWindow.postMessage(requestObj, talknUrl);
    }

    handleErrorMessage(method){
        if(this.methodIdMap[method]){
            switch(method){
            case 'bootExtension':
                this.postMessage("removeExtension");   
                const talknFrame = document.querySelector(`iframe#${Ext.APP_NAME}Extension`);
                talknFrame.remove();
                this.iframe.remove();
                delete this;
                console.warn("CSP Reboot: " + method );
                new Ext(true);
                break;
            }
        }
    }

    toggleIframe(params){
        const iframe = document.querySelector(`iframe#${Ext.APP_NAME}Extension`);
        const talknNotifId = sessionStorage.getItem(Ext.talknNotifId);

        if(talknNotifId === "null"){

            if( iframe.style.height !== Ext.getIframeOpenHeight() ){
                iframe.style.transition = "0ms";
                iframe.style.height = Ext.getIframeOpenHeight();
                this.postMessage("startDispPosts");
            }else{
                this.postMessage("startUndispPosts");
                setTimeout( () =>{ 
                    iframe.style.transition = "0ms";
                    iframe.style.height = Ext.getIframeCloseHeight();
                }, Ext.BASE_TRANSITION );
            }
        }else{
            clearTimeout( talknNotifId );
            sessionStorage.setItem(Ext.talknNotifId, null);
            this.postMessage("closeNotif");
            iframe.style.transition = "0ms";
            iframe.style.height = Ext.getIframeOpenHeight();
            this.postMessage("startDispPosts");
        }
    }

    location(params){
        const {protocol, connection} = params;
        location.href = `${protocol}/${connection}`;
    }

    openNotif(params){
        const iframe = document.querySelector(`iframe#${Ext.APP_NAME}Extension`);
        iframe.style.transition = "0ms";
        iframe.style.height = Ext.getIframeOpenNotifHeight();

        let talknNotifId = sessionStorage.getItem(Ext.talknNotifId);
        if(talknNotifId){
            clearTimeout( talknNotifId );
        }
        talknNotifId = setTimeout( this.closeNotif, params.transition );
        sessionStorage.setItem(Ext.talknNotifId, talknNotifId);

        setTimeout( () => {
            this.postMessage("openNotif");
        }, 10 );
    }

    closeNotif(params){
        let talknNotifId = sessionStorage.getItem(Ext.talknNotifId);
        clearTimeout( talknNotifId );
        sessionStorage.setItem(Ext.talknNotifId, null);
        const iframe = document.querySelector(`iframe#${Ext.APP_NAME}Extension`);
        iframe.style.transition = "0ms";
        iframe.style.height = Ext.getIframeCloseHeight();
        this.postMessage("closeNotif");
    }

    linkTo(params){
        if( params && params.href ){
            location.href = params.href
        }
    }

    getClientMetas(){
        let title = document.querySelector('title');
        title = title && title.text !== "" ? title.text : "";
        let description = document.querySelector('description');
        description = description && description.text !== "" ? description.text : "";
        const metas = document.querySelectorAll('meta');
        let clientMetas = {title, description};

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
            type: Ext.APP_NAME,
            url: location.href,
            href: location.href,
            method: method,
            methodId: 0,
            params: params
        };
    }
}

const ext = new Ext();
