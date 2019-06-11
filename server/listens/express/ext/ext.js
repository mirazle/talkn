const ENV = "PROD";
class Ext {
    static get MODE_MODAL(){return "EXT_MODAL"}
    static get MODE_BOTTOM(){return "EXT_BOTTOM"}
    static get MODE_INCLUDE(){return "EXT_INCLUDE"}
    static get DEFAULT_MODE(){return Ext.MODE_MODAL}
    static getScriptTag(){
        const domain = ENV === "PROD" ? Ext.BASE_PROD_HOST : Ext.BASE_DEV_HOST;
        return document.querySelector(`script[src='//ext.${domain}']`);
    }
    static get INCLUDE_ID(){return "#talkn"}
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
    static getIframeCloseHeight(){return '45px'};
    static getIframeOpenNotifHeight(){return '85px'};
    static get iframeModalWidth(){return 280};
    static get iframeBrowserWidth(){return 320};
    static get iframeBrowserHeight(){return 420};
    static get talknNotifId(){return "talknNotifId"};
    static get activeMethodSecond(){return 1000};
    static get zIndex(){return 2147483647};
    static get modeModalBottom(){return 40};
    static get aacceptPostMessages(){return ['toggleIframe', 'location', 'openNotif', 'closeNotif', 'linkTo', 'changePost', 'getClientMetas']};

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

            // setupWindow
            this.setupWindow();
            const talknUrl = this.getTalknUrl();
            const width = `${this.getIframeWidth(true)} !important;`;
            const styles = this.getStyles( width );
            this.iframe  = document.createElement("iframe");
            this.loadIframe = this.loadIframe.bind(this);
            this.iframe.setAttribute("id", `${Ext.APP_NAME}Extension`);
            this.iframe.setAttribute("name", "extension");
            this.iframe.setAttribute("style", styles );
            this.iframe.setAttribute("src", talknUrl );
            this.iframe.setAttribute("frameBorder", 0 );
            this.iframe.addEventListener( "load", this.loadIframe );
            this.iframe.addEventListener( "transitionend", this.transitionend );

            switch( this.mode ){
            case Ext.MODE_MODAL:
                const modalIcon  = document.createElement("div");
                modalIcon.setAttribute("id", `${Ext.APP_NAME}Handle`);
                modalIcon.setAttribute("style", 
                    "position: fixed !important;" +
                    "bottom: 15px !important;" +
                    "right: 15px !important;" +
                    `z-index: ${Ext.zIndex} !important;` +
                    "width: 60px !important;" +
                    "height: 60px !important;" +
                    "background: rgba( 235,235,235,0.6 ) !important;" +
                    "border: 1px solid rgba( 255,255,255, 0.6) !important;" +
                    "border-radius: 100px !important;" +
                    `transition: ${Ext.BASE_TRANSITION}ms !important;` +
                    "transform: scale(1.0) !important;" 
                );
                modalIcon.addEventListener( "load", () => {} );
                modalIcon.addEventListener( "click", this.toggleIframe );
                modalIcon.addEventListener( "mouseover", () => {
                    modalIcon.style.transform = "scale(1.1)";
                });
                modalIcon.addEventListener( "mouseout", () => {
                    modalIcon.style.transform = "scale(1.0)";
                });
                document.body.appendChild(modalIcon);
                document.body.appendChild(this.iframe);
                break;
            case Ext.MODE_INCLUDE:
                document.querySelector( Ext.INCLUDE_ID ).appendChild( this.iframe );
                break;
            case Ext.MODE_BOTTOM:
                document.body.appendChild(this.iframe);
                break;
            }
        }
    }

    getMode(){
        const includeTag = document.querySelector( Ext.INCLUDE_ID );
        const scriptTag = this.scriptTag;
        let mode = Ext.DEFAULT_MODE;

        if( includeTag ){
            return Ext.MODE_INCLUDE;
        }

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

    getModeModalOpenTransform(){
        return `translate3d(0px, 0px, 0px) scale( 1 )`;
    }

    getModeModalCloseTransform(){
        const translateY = Number( this.getIframeOpenHeight() ) + Number( Ext.modeModalBottom );
        return `translate3d( 0px, ${translateY}px, 0px ) scale( 0.5 )`;
    }

    getStyles( width ){
        switch( this.mode ){
        case Ext.MODE_MODAL:
            return "" +
                `z-index: ${Ext.zIndex - 1} !important;` +
                "display: block !important;" +
                "align-items: flex-end !important;" + 
                "position: fixed !important; " +
                `bottom: ${Ext.modeModalBottom}px !important;` + 
                `right: ${this.getRight(true)} !important;` + 
                `width: ${width}` + 
                `min-width: ${width}` + 
                `max-width: ${width}` + 
                `height: ${this.getIframeOpenHeight(true)} !important;` + 
                "margin: 0 !important;" + 
                "padding: 0 !important;" + 
                "opacity: 0 !important;" + 
                `transition: ${Ext.BASE_TRANSITION}ms !important;` + 
                `transform: ${ this.getModeModalCloseTransform() } !important;`;
        case Ext.MODE_BOTTOM:
            return "" +
                `z-index: ${Ext.zIndex} !important;` +
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
                "transform: translate3d(0px, 0px, 0px) !important;";
        case Ext.MODE_INCLUDE:
            return "" +
                `z-index: ${Ext.zIndex} !important;` +
                "display: none !important;" +
                "align-items: flex-end !important;" + 
                "position: absolute !important; " +
                "bottom: 0px !important;" + 
                "right: 0px !important;" + 
                `width: 100% !important;` + 
                `min-width: 100% !important;` + 
                `max-width: 100% !important;` + 
                `height: 100% !important;` + 
                `min-height: 100% !important;` + 
                `max-height: 100% !important;` + 
                "margin: 0 !important;" + 
                "padding: 0 !important;" + 
                "transition: 0ms !important;" + 
                "transform: translate3d(0px, 0px, 0px) !important;";
        }
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

    getIframeWidth( addUnit = false ){
        const mode = this.mode;
        let width = Ext.iframeBrowserWidth + "px";
        switch( mode ){
        case Ext.MODE_BOTTOM:
            width = window.innerWidth < Ext.FULL_WIDTH_THRESHOLD ? "100%" : Ext.iframeBrowserWidth + "px";
            break;
        case Ext.MODE_MODAL:
            width = window.innerWidth < Ext.FULL_WIDTH_THRESHOLD ? "96%" : Ext.iframeModalWidth + "px";
            break;
        case Ext.MODE_INCLUDE:
            const talknTag = document.querySelector( Ext.INCLUDE_ID );
            width = talknTag ? talknTag.clientWidth : "100%";
            return addUnit ? width + "px" : width ;
        }
        return addUnit ? width : width.replace("px", "").replace("%", "") ;
    }

    getIframeOpenHeight( addUnit = false ){
        const mode = this.mode; 
        let height = Ext.iframeBrowserHeight + "px";
        switch( mode ){
        case Ext.MODE_BOTTOM:
            if( window.innerWidth < Ext.FULL_WIDTH_THRESHOLD ){
                height = `${Math.floor( window.innerHeight * 0.95 )}px`;
            }
            break;
        case Ext.MODE_MODAL:
            if( window.innerWidth < Ext.FULL_WIDTH_THRESHOLD ){
                height = `${Math.floor( window.innerHeight * 0.9 )}px`;
            }
            break;
        case Ext.MODE_INCLUDE:
            const talknTag = document.querySelector( Ext.INCLUDE_ID );
            height = talknTag ? talknTag.clientHeight : "100%";
            return addUnit ? height + "px" : height ;
        }
        return addUnit ? height : height.replace("px", "").replace("%", "");
    }

    getRight( addUnit = false ){
        const mode = this.mode;
        let right = 0
        switch( mode ){
        case Ext.MODE_BOTTOM:
        case Ext.MODE_INCLUDE:
            break;
        case Ext.MODE_MODAL:
            right = window.innerWidth < Ext.FULL_WIDTH_THRESHOLD ? "2%" : "10px";            
            break;
        }
        return addUnit ? right : right.replace("px", "").replace("%", "") ;
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
            extensionWidth: this.getIframeWidth(true),
            extensionOpenHeight: this.getIframeOpenHeight(false),
            extensionCloseHeight: Number( Ext.getIframeCloseHeight().replace("px", "") )
        });
    }

    bootExtension(params){
        const iframe = document.querySelector(`iframe#${Ext.APP_NAME}Extension`);
        switch(this.mode){
        case Ext.MODE_BOTTOM:
        case Ext.MODE_INCLUDE:
            iframe.style.height = Ext.getIframeCloseHeight();
            iframe.style.display = "flex";
            break;
        case Ext.MODE_MODAL:
            break;
        }
        this.postMessage("onTransition");
    }

    transitionend(e){
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
    }

    resizedWindow(e){
        this.resizeMethodId = null;
        const iframe = document.querySelector(`iframe#${Ext.APP_NAME}Extension`);
        const talknNotifId = sessionStorage.getItem(Ext.talknNotifId);  
        const width = this.getIframeWidth(true);
        iframe.style['width'] = width;
        iframe.style['min-width']  = width;
        iframe.style['max-width'] = width;

        if( ( talknNotifId === "null" ) === false && typeof talknNotifId === "object"){
            switch(this.mode){
            case Ext.MODE_BOTTOM:
            case Ext.MODE_INCLUDE:
                if( iframe.style.height === Ext.getIframeCloseHeight() ){
                    iframe.style.height = Ext.getIframeCloseHeight();
                }else{
                    iframe.style.height = this.getIframeOpenHeight();
                }
                break;
            case Ext.MODE_MODAL:
                iframe.style.height = this.getIframeOpenHeight(true);
                iframe.style.right = this.getRight(true);
                break;
            }
        }

        this.postMessage("updateExtension", {                
            extensionMode: this.mode,
            extensionWidth: this.getIframeWidth(true),
            extensionOpenHeight: Number( this.getIframeOpenHeight() ),
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
        switch( this.mode ){
        case Ext.MODE_BOTTOM:
        case Ext.MODE_INCLUDE:
            const talknNotifId = sessionStorage.getItem(Ext.talknNotifId);
            if(talknNotifId === "null"){
                if( iframe.style.height !== this.getIframeOpenHeight(true) ){
                    iframe.style.transition = "0ms";
                    iframe.style.height = this.getIframeOpenHeight(true);
                    this.postMessage("startDispPosts");
                }else{
                    this.postMessage("startUndispPosts");
                    setTimeout( () =>{ 
                        iframe.style.transition = "0ms";
                        iframe.style.height = Ext.getIframeCloseHeight(true);
                    }, Ext.BASE_TRANSITION );
                }
            }else{
                clearTimeout( talknNotifId );
                sessionStorage.setItem(Ext.talknNotifId, null);
                this.postMessage("closeNotif");
                iframe.style.transition = "0ms";
                iframe.style.height = this.getIframeOpenHeight(true);
                this.postMessage("startDispPosts");
            }
            break;
        case Ext.MODE_MODAL:
            if( iframe.style.opacity === "0" ){
                iframe.style.opacity = 1;
                iframe.style.transform = this.getModeModalOpenTransform(); 

                if( window.innerWidth < Ext.FULL_WIDTH_THRESHOLD ){
                    this.lockWindow();
                }

            }else{
                iframe.style.transform = this.getModeModalCloseTransform();
                iframe.style.opacity = 0;

                if( window.innerWidth < Ext.FULL_WIDTH_THRESHOLD ){
                    this.unlockWindow();
                }
            }
            break;
        }
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

    lockWindow(){
        const overflow = "hidden";
        const html = document.querySelector("html");
        const body = document.querySelector("body");
        html.style.overflow = overflow;
		body.style.overflow = overflow;
	}

	unlockWindow(){
        const overflow = "hidden";
        const html = document.querySelector("html");
        const body = document.querySelector("body");
        html.style.overflow = overflow;
		body.style.overflow = overflow;
    }
    
    location(params){
        const {protocol, connection} = params;
        location.href = `${protocol}/${connection}`;
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
