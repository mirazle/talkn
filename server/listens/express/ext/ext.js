const ENV = "PROD";
class Ext {
    static get MODE_MODAL(){return "EXT_MODAL"}
    static get MODE_BOTTOM(){return "EXT_BOTTOM"}
    static get DEFAULT_MODE(){return Ext.MODE_BOTTOM}
    static get MODE(){
        const domain = ENV === "PROD" ? Ext.BASE_PROD_HOST : Ext.BASE_DEV_HOST;
        const scriptTag = document.querySelector(`script[src='//ext.${domain}']`);
        let mode = Ext.DEFAULT_MODE;

        if( scriptTag && scriptTag.attributes ){
            if( scriptTag.attributes.mode && scriptTag.attributes.mode.value ){
                mode = scriptTag.attributes.mode.value;
            }
            if( mode !== Ext.MODE_BOTTOM && mode !== Ext.MODE_MODAL ){
                mode = Ext.DEFAULT_MODE;
            }
        }
        return mode;
    }
    static getScriptTag(){
        const domain = ENV === "PROD" ? Ext.BASE_PROD_HOST : Ext.BASE_DEV_HOST;
        return document.querySelector(`script[src='//ext.${domain}']`);
    }
    static get APP_NAME(){return "talkn"}
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
    }
    static getIframeOpenHeight( mode ){
        if( mode === "EXT_BOTTOM" ){
            if( window.innerWidth < Ext.FULL_WIDTH_THRESHOLD ){
                return `${Math.floor( window.innerHeight * 0.95 )}px`;
            }
        }
        return "450px";
    }
    static getIframeCloseHeight(){return '45px'};
    static getIframeOpenNotifHeight(){return '85px'};
    static getIframeWidth( mode ){

        if( mode === Ext.MODE_BOTTOM ){
            if( window.innerWidth < Ext.FULL_WIDTH_THRESHOLD ){
                return "100%";
            }
        }

        return Ext.iframeBrowserWidth + "px"; 
    }
    static get iframeBrowserWidth(){return 320};
    static get talknNotifId(){return "talknNotifId"};
    static get activeMethodSecond(){return 1000};
    static get aacceptPostMessages(){return ['toggleIframe', 'location', 'openNotif', 'closeNotif', 'linkTo', 'focusPost', 'changePost', 'getClientMetas']};

    constructor(refusedFrame = false){

        this.refusedFrame = refusedFrame;
        this.href = window.location.href;
        this.connection = this.href.replace("http:/", "").replace("https:/", "");
        const hasSlash = this.connection.lastIndexOf("/") === ( this.connection.length - 1 );
        this.connection = hasSlash ? this.connection : this.connection + "/";
        const bootFlg = Ext.EXCLUSION_ORIGINS.every( ( origin ) =>{
            return this.href.indexOf( origin ) === -1;
        });

        if(bootFlg){
            this.isRender = false;
            this.scriptTag = Ext.getScriptTag();
            this.mode = this.getMode();
            this.browser = this.getBrowser();
            this.methodIdMap = {};
            this.notifId = null;
            this.resizeMethodId = null;

            this.setupWindow = this.setupWindow.bind(this);
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
            this.scrollWindow = this.scrollWindow.bind(this);
            this.changePost = this.changePost.bind(this);
            this.debug = this.debug.bind(this);

            const talknUrl = this.getTalknUrl();
            const width = `${Ext.getIframeWidth()} !important;`;

            // setupWindow
            this.setupWindow();
            this.iframe  = document.createElement("iframe");
            this.loadIframe = this.loadIframe.bind(this);
            this.iframe.setAttribute("id", `${Ext.APP_NAME}Extension`);
            this.iframe.setAttribute("name", "extension");
            this.iframe.setAttribute("style",
                "z-index: 2147483647 !important;" +
                "display: none !important;" +
                "align-items: flex-end !important;" + 
                "position: fixed !important; " +
                "bottom: 0px !important;" + 
                "right: 0px !important;" + 
                `width: ${width}` + 
                `min-width: ${width}` + 
                `max-width: ${width}` + 
                `height: ${Ext.getIframeCloseHeight()} !important;` + 
                "margin: 0 !important;" + 
                "padding: 0 !important;" + 
                "transition: 0ms !important;" + 
                "transform: translate3d(0px, 0px, 0px) !important;"
            );
            this.iframe.setAttribute("src", talknUrl );
            this.iframe.setAttribute("frameBorder", 0 );
            this.iframe.addEventListener( "load", this.loadIframe );
            this.iframe.addEventListener( "transitionend", this.transitionend );
            document.body.appendChild(this.iframe);
        }
    }

    getMode(){
        const scriptTag = this.scriptTag;
        let mode = Ext.DEFAULT_MODE;
        if( scriptTag && scriptTag.attributes ){
            if( scriptTag.attributes.mode && scriptTag.attributes.mode.value ){
                mode = scriptTag.attributes.mode.value;
            }
            if( mode !== Ext.MODE_BOTTOM && mode !== Ext.MODE_MODAL ){
                if( mode.indexOf( "#" ) === 0 ){
                    this.isRender = true;
                }else{
                    mode = Ext.DEFAULT_MODE;
                }
            }
        }
        return mode;
    }

    getTalknUrl(){
        return this.refusedFrame ?
            chrome.runtime.getURL('index.html?' + this.connection) :
            Ext.BASE_HOSTNAME + this.connection;
    }

    getBrowser(){
        const agent = window.navigator.userAgent.toLowerCase();
        if ( (agent.indexOf('crios') !== -1) && (agent.indexOf('safari') > 0) ){
            return 'Chrome';
        }else if ( (agent.indexOf('crios') === -1) && (agent.indexOf('safari') > 0 ) ){
            return 'Safari';
        }else if (agent.indexOf("opera") > -1){
            return 'Opera';
        }else if (agent.indexOf("firefox") > -1){
            return 'Firefox';
        }
    }

    setupWindow(){
        window.addEventListener('message', this.catchMessage);
        window.addEventListener('load', this.loadWindow);
        window.addEventListener('resize', this.resizeWindow);
        window.addEventListener('scroll', this.scrollWindow);
    }

    loadIframe(e){
        this.iframe = document.querySelector(`iframe#${Ext.APP_NAME}Extension`);
        this.postMessage("bootExtension", {
            extensionMode: this.mode,
            extensionWidth: Ext.getIframeWidth().replace("px", "" ),
            extensionOpenHeight: Number( Ext.getIframeOpenHeight().replace("px", "") ),
            extensionCloseHeight: Number( Ext.getIframeCloseHeight().replace("px", "") )
        });
    }

    transitionend(e){
    }

    bootExtension(params){

        // Display
        const iframe = document.querySelector(`iframe#${Ext.APP_NAME}Extension`);
        iframe.style.height = Ext.getIframeCloseHeight();
        iframe.style.display = "flex";
        this.postMessage("onTransition");
        //this.debug("bootExtension");
    }

    loadWindow(e){
        this.resizedWindow();
    }

    resizeWindow(e){
        if( this.resizeMethodId === null ){
            this.resizeMethodId = setTimeout( this.resizedWindow, Ext.BASE_TRANSITION );
        }
    }

    scrollWindow(e){
        //this.debugWindow("scrollWindow");
    }

    resizedWindow(e){
        this.resizeMethodId = null;
        const iframe = document.querySelector(`iframe#${Ext.APP_NAME}Extension`);
        const talknNotifId = sessionStorage.getItem(Ext.talknNotifId);  
        const width = Ext.getIframeWidth();
        iframe.style['width'] = width;
        iframe.style['min-width']  = width;
        iframe.style['max-width'] = width;

        if(talknNotifId === "null"){

            if( iframe.style.height === Ext.getIframeCloseHeight() ){
                iframe.style.height = Ext.getIframeCloseHeight();
            }else{
                iframe.style.height = Ext.getIframeOpenHeight();
            }
        }

        this.postMessage("updateExtension", {                
            extensionMode: this.mode,
            extensionWidth: Ext.getIframeWidth().replace("px", "" ),
            extensionOpenHeight: Number( Ext.getIframeOpenHeight().replace("px", "") ),
            extensionCloseHeight: Number( Ext.getIframeCloseHeight().replace("px", "") )
        });
    }

    catchMessage(e){
        const {type, method, params} = e.data;
        if( type === Ext.APP_NAME ){
            if(this[ method ] && typeof this[ method ] === "function"){
                if(this.methodIdMap[ method ] || Ext.aacceptPostMessages.includes(method)){
                    const iframe = document.querySelector(`iframe#${Ext.APP_NAME}Extension`);
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
        talknFrame.contentWindow.postMessage(requestObj, talknUrl);
    }

    handleErrorMessage(method){
        if(this.methodIdMap[method]){
            switch(method){
            case 'bootExtension':
                this.postMessage("removeExtension");   

                const talknFrame = document.querySelector(`iframe#${Ext.APP_NAME}Extension`);
                talknFrame.removeEventListener( "load", this.loadIframe );
                talknFrame.removeEventListener( "transitionend", this.transitionend );
                talknFrame.remove();

                this.iframe.removeEventListener( "load", this.loadIframe );
                this.iframe.removeEventListener( "transitionend", this.transitionend );
                this.iframe.remove();
                delete this;

                window.removeEventListener('message', this.catchMessage);
                window.removeEventListener('load', this.loadWindow);
                window.removeEventListener('resize', this.resizeWindow);

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

    changePost(){
        //this.debug( "changePost" );
    }

    focusPost(){
        //this.debug( "focusPost", 1500);
    }

    debug( actionName = "debug", timeout = 0 ){
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
