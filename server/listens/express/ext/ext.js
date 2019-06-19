const TALKN_EXT_ENV = "PROD";

class Ext {
    static get APP_NAME(){return "talkn"}
    static get MODE_MODAL(){return "EXT_MODAL"}
    static get MODE_BOTTOM(){return "EXT_BOTTOM"}
    static get MODE_INCLUDE(){return "EXT_INCLUDE"}
    static get DEFAULT_MODE(){return Ext.MODE_MODAL}
    static get BASE_PROD_HOST(){return "talkn.io"}
    static get BASE_DEV_HOST(){return "localhost"}
    static get BASE_DEV_PORT(){return 8080}
    static get EXCLUSION_ORIGINS(){return ['https://localhost', 'https://talkn.io']}
    static get INCLUDE_ID(){return `#${Ext.APP_NAME}`}
    static get APP_ENDPOINT(){
        if(TALKN_EXT_ENV === "PROD"){
            return `https://${Ext.BASE_PROD_HOST}`;
        }else if(TALKN_EXT_ENV === "START"){
            return `https://${Ext.BASE_DEV_HOST}`;
        }else if(TALKN_EXT_ENV === "DEV"){
            return `https://${Ext.BASE_DEV_HOST}:${Ext.BASE_DEV_PORT}`;
        }
    }
    static getMode(){
        const includeTag = document.querySelector( Ext.INCLUDE_ID );
        if( includeTag ){
            return Ext.MODE_INCLUDE;
        }

        let mode = Window.DEFAULT_MODE;
        const domain = TALKN_EXT_ENV === "PROD" ? Ext.BASE_PROD_HOST : Ext.BASE_DEV_HOST;
        const scriptTag =  document.querySelector(`script[src='//ext.${domain}']`);
        if( scriptTag && scriptTag.attributes ){
            if( scriptTag.attributes.mode && scriptTag.attributes.mode.value ){
                mode = scriptTag.attributes.mode.value;
            }
            if( mode !== Ext.MODE_BOTTOM && mode !== Ext.MODE_MODAL ){
                    mode = Window.DEFAULT_MODE;
            }
        }
        return mode;
    }
    constructor(){
        return Ext.getMode();
    }
}

class Styles{
    static get zIndex(){return 2147483647};
    static get modeModalBottom(){return 40};
    static get FULL_WIDTH_THRESHOLD(){return 600}
    static get BASE_TRANSITION(){return 600}
}

class Window {
    static get talknNotifId(){return "talknNotifId"};
    static get activeMethodSecond(){return 1000};
    static get aacceptPostMessages(){return [
        'toggleIframe',
        'location',
        'openNotif',
        'closeNotif',
        'linkTo',
        'setInputPost',
        'getClientMetas'
    ]};

    constructor( refusedFrame = false ){

        this.refusedFrame = refusedFrame;
        this.href = window.location.href;
        this.connection = this.href.replace("http:/", "").replace("https:/", "");
        const hasSlash = this.connection.lastIndexOf("/") === ( this.connection.length - 1 );
        this.connection = hasSlash ? this.connection : this.connection + "/";
        const bootFlg = Ext.EXCLUSION_ORIGINS.every( ( origin ) => {
            return this.href.indexOf( origin ) === -1;
        });

        if(bootFlg){

            // Variable
            this.mode = new Ext();
            this.browser = this.getBrowser();

            // Communication talkn Window
            this.methodIdMap = {};
            this.notifCnt = 0;
            this.notifId = null;

            this.resizeMethodId = null;
            this.htmlOverflow = null;
            this.htmlPosition = null;
            this.htmlWidth = null;
            this.htmlHeight = null;       
            
            this.load = this.load.bind(this);
            this.resize = this.resize.bind(this);
            this.resized = this.resized.bind(this);
            this.scroll = this.scroll.bind(this);
            this.transitionend = this.transitionend.bind(this);

            window.addEventListener('message', this.catchMessage);
            window.addEventListener('load', this.load);
            window.addEventListener('resize', this.resize);
            window.addEventListener('scroll', this.scroll);
            window.addEventListener('transitionend', this.transitionend);

            const iframe = new Iframe( this.mode );
        }
    }

    /********************************/
    /* Initial methods              */
    /********************************/

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

    bootExtension(params){
        const iframe = document.querySelector(`iframe#${Ext.APP_NAME}Extension`);
        switch(this.mode){
        case Ext.MODE_BOTTOM:
        case Ext.MODE_INCLUDE:
            iframe.style.height = Iframe.getCloseHeight();
            iframe.style.display = "flex";
            break;
        case Ext.MODE_MODAL:
            break;
        }
        this.postMessage("onTransition");
    }

    /********************************/
    /* Accept Communication methods */
    /********************************/

    toggleIframe(params){
        const iframe = document.querySelector(`iframe#${Ext.APP_NAME}Extension`);
        switch( this.mode ){
        case Ext.MODE_BOTTOM:
        case Ext.MODE_INCLUDE:
            const talknNotifId = sessionStorage.getItem(Window.talknNotifId);
            if(talknNotifId === "null"){
                if( iframe.style.height !== this.styles.getIframeOpenHeight(true) ){
                    iframe.style.transition = "0ms";
                    iframe.style.height = this.styles.getIframeOpenHeight(true);
                    this.postMessage("startDispPosts");
                }else{
                    this.postMessage("startUndispPosts");
                    setTimeout( () =>{ 
                        iframe.style.transition = "0ms";
                        iframe.style.height = Iframe.getCloseHeight(true);
                    }, Styles.BASE_TRANSITION );
                }
            }else{
                clearTimeout( talknNotifId );
                sessionStorage.setItem(Window.talknNotifId, null);
                this.postMessage("closeNotif");
                iframe.style.transition = "0ms";
                iframe.style.height = this.styles.getIframeOpenHeight(true);
                this.postMessage("startDispPosts");
            }
            break;
        case Ext.MODE_MODAL:
/*
            const textarea = this.textarea.get();
            if( textarea && textarea.value && textarea.value !== ""){
                this.postMessage("delegatePost", textarea.value );
                textarea.value = "";
                return false;
            }
*/            
            if( iframe.style.opacity === "0" ){
                const talknHandle = document.querySelector(`#${Ext.APP_NAME}Handle`);
                const talknHandleStyles = Styles.getModalHandleOpenStyles();
                talknHandle.style.background = talknHandleStyles.background;
                talknHandle.style.border = talknHandleStyles.border;
                talknHandle.style.transform = talknHandleStyles.transform;
                iframe.style.opacity = 1;
                iframe.style.transform = Iframe.getModalOpenTransform(); 
                if( window.innerWidth < Styles.FULL_WIDTH_THRESHOLD ){
                    this.lockWindow();
                }

            }else{

                if( this.inputPost ){
                    this.postMessage("post");
                    this.postMessage("onChangeInputPost");
                    this.inputPost = false;
                }else{
                    const talknHandle = document.querySelector(`#${Ext.APP_NAME}Handle`);
                    const talknHandleStyles = Styles.getModalHandleCloseStyles();
                    talknHandle.style.background = talknHandleStyles.background;
                    talknHandle.style.border = talknHandleStyles.border;
                    talknHandle.style.transform = talknHandleStyles.transform;

                    iframe.style.transform = this.styles.geModalCloseTransform();
                    iframe.style.opacity = 0;

                    if( window.innerWidth < Styles.FULL_WIDTH_THRESHOLD ){
                        this.unlockWindow();
                    }
                }
            }
            break;
        }
    }

    openNotif(params){
        const iframe = document.querySelector(`iframe#${Ext.APP_NAME}Extension`);
        switch( this.mode ){
        case Ext.MODE_BOTTOM:
            iframe.style.transition = "0ms";
            iframe.style.height = Styles.getIframeOpenNotifHeight();

            let talknNotifId = sessionStorage.getItem(Window.talknNotifId);
            if(talknNotifId){
                clearTimeout( talknNotifId );
            }
            talknNotifId = setTimeout( this.closeNotif, params.transition );
            sessionStorage.setItem(Window.talknNotifId, talknNotifId);

            setTimeout( () => {
                this.postMessage("openNotif");
            }, 10 );
            break;
        case Ext.MODE_MODAL:
            if( iframe.style.opacity === "0" ){
                const id ="notif" + params.id;
                const notif = document.createElement("div");
                const bottom = "21px";
                const width = window.innerWidth < Styles.FULL_WIDTH_THRESHOLD ? "calc( 100% - 130px )" : "190px";
                notif.setAttribute("id", id);
                notif.setAttribute("name", "notif");
                notif.setAttribute("style", 
                    "position: fixed !important;" +
                    `bottom: ${bottom} !important;` +
                    "right: 80px !important;" +
                    "display: flex !important;" + 
                    "align-items: center !important;" + 
                    "cursor: pointer !important;" + 
                    "justify-content: flex-start;" + 
                    `z-index: ${Styles.zIndex} !important;` +
                    `width: ${width} !important;` +
                    `min-width: ${width} !important;` +
                    `max-width: ${width} !important;` +
                    "height: 30px !important;" + 
                    "min-height: 30px !important;" + 
                    "max-height: 30px !important;" + 
                    "padding: 10px 20px 10px 10px !important;" +
                    "opacity: 0 !important;" +
                    `background: rgba(255,255,255,0.8) !important;` +
                    `border: 1px solid rgba(235, 235, 235, 0.8) !important;` +
                    "border-radius: 3px !important;" +
                    "color: rgba( 120, 120, 120, 0.9) !important;" +
                    `transition: ${Styles.BASE_TRANSITION}ms !important;` +
                    `transform: translate3d(0px, ${bottom} ,0px) scale(1.0) !important;` 
                );

                const notifIcon = document.createElement("div");
                notifIcon.setAttribute("style", 
                    "display: flex;" + 
                    "align-items: center;" + 
                    "justify-content: flex-start;" + 
                    `background-image: url(${params.favicon});` +
                    "background-position: 50% 50%;" +
                    "background-size: 20px 20px;" +
                    "background-repeat: no-repeat;" + 
                    "width: 20% !important;" +
                    "min-width: 20% !important;" +
                    "max-width: 20% !important;" +
                    "height: inherit !important;" +
                    "min-height: inherit !important;" +
                    "max-height: inherit !important;" 
                );

                const notifPost = document.createElement("div");
                notifPost.setAttribute("style", 
                    "overflow: hidden !important;" +
                    "display: flex !important;" +
                    "justify-content: flex-start !important;" + 
                    "align-items: center !important;" +
                    "width: 80% !important;" +
                    "min-width: 80% !important;" +
                    "max-width: 80% !important;" +
                    "height: inherit !important;" +
                    "min-height: inherit !important;" +
                    "max-height: inherit !important;" +
                    "white-space: nowrap !important;" +
                    "font-size: 13px !important;" +
                    "line-height: 27px;" +
                    "text-indent: 10px;"
                );
                notifPost.innerText = params.post;
                notif.appendChild( notifIcon );
                notif.appendChild( notifPost );

                notif.addEventListener( "click", () => {
                    const talknHandle = document.querySelector(`#${Ext.APP_NAME}Handle`);
                    const talknHandleStyles = Styles.getModalHandleOpenStyles();
                    talknHandle.style.background = talknHandleStyles.background;
                    talknHandle.style.border = talknHandleStyles.border;
                    talknHandle.style.transform = talknHandleStyles.transform;
                    iframe.style.transform = Iframe.getModalOpenTransform();
                    iframe.style.opacity = 1;

                    if( window.innerWidth < Styles.FULL_WIDTH_THRESHOLD ){
                        this.lockWindow();
                    }
                } );

                notif.addEventListener( "mouseover", () => {
                    const translates = notif.style.transform.split("translate3d(")[1].split(") ")[0]
                    notif.style.transform = `translate3d(${translates}) scale(1.05)`
                });

                notif.addEventListener( "mouseout", () => {
                    const translates = notif.style.transform.split("translate3d(")[1].split(") ")[0]
                    notif.style.transform = `translate3d(${translates}) scale(1.0)`
                });

                document.body.appendChild(notif);

                setTimeout( () => {
                    notif.style.opacity = 1;
                    notif.style.transform = "translate3d(0px, 0px, 0px) scale(1.0)";
                    setTimeout( () => {

                        notif.style.opacity = 0;
                        notif.style.transform = `translate3d(0px, ${bottom}, 0px) scale(1.0)`;
                        setTimeout( () => {
                            const removeNotif = document.getElementById(id);
                            document.body.removeChild(removeNotif);
                        }, 1000)

                    }, 2100 );
                }, 100 );
            }
            break;
        }
    }

    closeNotif(params){
        switch( this.mode ){
        case Ext.MODE_BOTTOM:7
            let talknNotifId = sessionStorage.getItem(Window.talknNotifId);
            clearTimeout( talknNotifId );
            sessionStorage.setItem(Window.talknNotifId, null);
            const iframe = document.querySelector(`iframe#${Ext.APP_NAME}Extension`);
            iframe.style.transition = "0ms";
            iframe.style.height = Iframe.getCloseHeight();
            this.postMessage("closeNotif");
            break;
        case Ext.MODAL_MODAL:
            break;
        }
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

    setInputPost(params){
        this.inputPost = params.inputPost;
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


    lockWindow(){
        const overflow = "hidden";
        const position = "fixed";
        const width = "100%";
        const height = "100%";
        const html = document.querySelector("html");
        const body = document.querySelector("body");
        this.windowScrollY = window.scrollY;
        this.htmlPosition = html.style.position;
        this.htmlOverflow = html.style.overflow;
        this.htmlWidth = html.style.width;
        body.style.position = position;
        body.style.overflow = overflow;
        body.style.width = width;
        body.style.height = height;
        body.style.marginTop = -( this.windowScrollY ) + "px";
    }

	unlockWindow(){
        const body = document.querySelector("body");
        body.style.position = this.htmlPosition;
        body.style.overflow = this.htmlOverflow;
        body.style.width = this.htmlWidth;
        body.style.height = this.htmlHeight;
        body.style.marginTop = "0px";
        window.scrollTo( 0, Number( this.windowScrollY ) );
    }

    transitionend(e){
    }

    load(e){
        this.resized();
    }

    resize(e){
        if( this.resizeMethodId === null ){
            this.resizeMethodId = setTimeout( this.resizedWindow, Styles.BASE_TRANSITION );
        }
    }

    scroll(e){
    }

    resized(e){
        this.resizeMethodId = null;
        const iframe = document.querySelector(`iframe#${Ext.APP_NAME}Extension`);
        const talknNotifId = sessionStorage.getItem(Window.talknNotifId);  
        const width = this.styles.getIframeWidth(true);
        iframe.style['width'] = width;
        iframe.style['min-width']  = width;
        iframe.style['max-width'] = width;

        if( ( talknNotifId === "null" ) === false && typeof talknNotifId === "object"){
            switch(this.mode){
            case Ext.MODE_BOTTOM:
            case Ext.MODE_INCLUDE:
                if( iframe.style.height === Iframe.getCloseHeight() ){
                    iframe.style.height = Iframe.getCloseHeight();
                }else{
                    iframe.style.height = this.styles.getIframeOpenHeight();
                }
                break;
            case Ext.MODE_MODAL:
                iframe.style.height = this.styles.getIframeOpenHeight(true);
                iframe.style.right = this.styles.getRight(true);
                break;
            }
        }

        this.postMessage("updateExtension", {                
            extensionMode: this.mode,
            extensionWidth: this.styles.getIframeWidth(true),
            extensionOpenHeight: Number( this.styles.getIframeOpenHeight() ),
            extensionCloseHeight: Number( Iframe.getCloseHeight().replace("px", "") )
        });
    }
}

class Iframe {

    static get id(){return `${Ext.APP_NAME}Extension`}
    static getCloseHeight(){return '45px'};
    static getIframeOpenNotifHeight(){return '85px'};
    static get modalWidth(){return 280};
    static get browserWidth(){return 320};
    static get browserHeight(){return 420};
    static get closeHeight(){return 45};
    static get modeModalBottom(){return 40};
    static get FULL_WIDTH_THRESHOLD(){return 600}
    static get BASE_TRANSITION(){return 600}

    constructor( mode ){
        this.mode = mode;
        const width = `${this.getWidth(true)} !important;`;
        const iframe  = document.createElement("iframe");
        this.load = this.load.bind(this);
        this.catchMessage = this.catchMessage.bind(this);
        this.handleErrorMessage = this.handleErrorMessage.bind(this);
        this.methodIdMap = {};

        iframe.id = Iframe.id
        iframe.name = "extension";
        iframe.style = this.getStyles( width );
        iframe.src = this.getSrc();
        iframe.frameBorder =  0;
        iframe.addEventListener( "load", this.load );

        switch( this.mode ){
        case Ext.MODE_MODAL:
            document.body.appendChild(iframe);
            break;
        case Ext.MODE_INCLUDE:
            document.querySelector( Ext.INCLUDE_ID ).appendChild( iframe );
            break;
        case Ext.MODE_BOTTOM:
            document.body.appendChild(iframe);
            break;
        }
    }

    get(){
        return document.querySelector(`#${Iframe.id}`);
    }

    getSrc(){
        if( this.refusedFrame ){
            return chrome.runtime.getURL('index.html?' + this.connection);
        }else{
            return Iframe.SRC + this.connection;
        }
    }

    getStyles( width ){
        switch( this.mode ){
        case Ext.MODE_MODAL:
            return "" +
                `z-index: ${Styles.zIndex - 1} !important;` +
                "display: block !important;" +
                "align-items: flex-end !important;" + 
                "position: fixed !important; " +
                `bottom: ${Styles.modeModalBottom}px !important;` + 
                `right: ${this.getRight(true)} !important;` + 
                `width: ${width}` + 
                `min-width: ${width}` + 
                `max-width: ${width}` + 
                `height: ${this.getOpenHeight(true)} !important;` + 
                "margin: 0 !important;" + 
                "padding: 0 !important;" + 
                "opacity: 0 !important;" + 
                `transition: ${Styles.BASE_TRANSITION}ms !important;` + 
                `transform: ${ this.geModalCloseTransform() } !important;`;
        case Ext.MODE_BOTTOM:
            return "" +
                `z-index: ${Styles.zIndex} !important;` +
                "display: none !important;" +
                "align-items: flex-end !important;" + 
                "position: fixed !important; " +
                "bottom: 0px !important;" + 
                "right: 0px !important;" + 
                `width: ${width}` + 
                `min-width: ${width}` + 
                `max-width: ${width}` + 
                `height: ${Iframe.getCloseHeight}px !important;` + 
                "margin: 0 !important;" + 
                "padding: 0 !important;" + 
                "transition: 0ms !important;" + 
                "transform: translate3d(0px, 0px, 0px) !important;";
        case Ext.MODE_INCLUDE:
            return "" +
                `z-index: ${Styles.zIndex} !important;` +
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

    getWidth( addUnit = false ){

        let width = Iframe.browserWidth + "px";
        switch( this.mode ){
        case Ext.MODE_BOTTOM:
            width = window.innerWidth < Styles.FULL_WIDTH_THRESHOLD ? "100%" : Iframe.browserWidth + "px";
            break;
        case Ext.MODE_MODAL:
            width = window.innerWidth < Styles.FULL_WIDTH_THRESHOLD ? "96%" : Iframe.modalWidth + "px";
            break;
        case Ext.MODE_INCLUDE:
            const talknTag = document.querySelector( Ext.INCLUDE_ID );
            width = talknTag ? talknTag.clientWidth : "100%";
            return addUnit ? width + "px" : width ;
        }
        return addUnit ? width : width.replace("px", "").replace("%", "") ;
    }

    getOpenHeight( addUnit = false ){
        let height = Iframe.browserHeight + "px";
        switch( this.mode ){
        case Ext.MODE_BOTTOM:
            if( window.innerWidth < Styles.FULL_WIDTH_THRESHOLD ){
                height = `${Math.floor( window.innerHeight * 0.95 )}px`;
            }
            break;
        case Ext.MODE_MODAL:
            if( window.innerWidth < Styles.FULL_WIDTH_THRESHOLD ){
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

        let right = 0
        switch( this.mode ){
        case Ext.MODE_BOTTOM:
        case Ext.MODE_INCLUDE:
            break;
        case Ext.MODE_MODAL:
            right = window.innerWidth < Styles.FULL_WIDTH_THRESHOLD ? "2%" : "10px";            
            break;
        }
        return addUnit ? right : right.replace("px", "").replace("%", "") ;
    }
    
    static getModalOpenTransform(){
        return `translate3d(0px, 0px, 0px) scale( 1 )`;
    }

    geModalCloseTransform(){
        const translateY = Number( this.getOpenHeight() ) + Number( Styles.modeModalBottom );
        return `translate3d( 0px, ${translateY}px, 0px ) scale( 0.5 )`;
    }

    load(e){
        this.iframe = document.querySelector(`iframe#${Ext.APP_NAME}Extension`);
        this.postMessage("bootExtension", {
            extensionMode: this.mode,
            extensionWidth: this.getWidth(true),
            extensionOpenHeight: this.getOpenHeight(false),
            extensionCloseHeight: Number( Iframe.getCloseHeight )
        });
    }

    /*************************/
    /* COMMUNICATION METHODS */
    /*************************/

    // From child window message.
    catchMessage(e){
        const {type, method, params} = e.data;
        if( type === Ext.APP_NAME ){
            if(this[ method ] && typeof this[ method ] === "function"){
                if(this.methodIdMap[ method ] || Window.aacceptPostMessages.includes(method)){
                    const iframe = document.querySelector(`iframe#${Ext.APP_NAME}Extension`);
                    this[ method ]( params );
                    clearTimeout(this.methodIdMap[ method ]);
                    delete this.methodIdMap[ method ];
                }
            }
        }
    }

    // To child window message.
    postMessage(method, params = {}){
        const talknUrl = this.getSrc();
        const requestObj = this.getRequestObj( method, params );
        const methodId = setTimeout( () => this.handleErrorMessage(method), Window.activeMethodSecond);
        const talknFrame = document.querySelector(`iframe#${Ext.APP_NAME}Extension`);
        this.methodIdMap[method] = methodId;
        talknFrame.contentWindow.postMessage(requestObj, talknUrl);
    }

    // handle error.
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
                new Window(true);
                break;
            }
        }
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

class HandleIcon {

    static get id(){return `${Ext.APP_NAME}${this.name}`}
    static getOpenStyles(){
        return {
            transform: `translate3d(0px, -17px, 0px) scale( 1 )`,
            background: "rgba(255, 255, 255, 0.95)",
            border: "1px solid rgba(235, 235, 235, 0.95)"
        }
    }

    static getCloseStyles(){
        return {
            transform: `translate3d(0px, 0px, 0px) scale( 0.95 )`,
            background: "rgba(255, 255, 255, 0.75)",
            border: "1px solid rgba(235, 235, 235, 0.75)"
        }
    }

    constructor(mode){
        this.mode = mode;
        let handleIcon  = document.createElement("canvas");
        handleIcon = this.drawCanvas( handleIcon );
        handleIcon.id = Handle.id;
        handleIcon.style = this.getStyle();

        this.click = this.click.bind( this );
        this.mouseover = this.mouseover.bind( this );
        this.mouseout = this.mouseout.bind( this );

        handleIcon.addEventListener( "click", this.click );
        handleIcon.addEventListener( "mouseover", this.mouseover );
        handleIcon.addEventListener( "mouseout", this.mouseout );

        document.body.appendChild(handleIcon);
    }

    get(){
        return document.querySelector(`#${HandleIcon.id}`);
    }

    getStyle(){
        const talknHandleStyles = HandleIcon.getCloseStyles();
        return "" + 
                    "position: fixed !important;" +
                    "bottom: 15px !important;" +
                    "right: 10px !important;" +
                    "cursor: pointer !important;" + 
                    "display: flex !important;" + 
                    "align-items: center !important;" + 
                    "justify-content: center !important;" + 
                    `z-index: ${Styles.zIndex} !important;` +
                    "width: 50px !important;" +
                    "height: 50px !important;" +
                    `background: ${talknHandleStyles.background} !important;` +
                    `border: ${talknHandleStyles.border} !important;` +
                    "border-radius: 100px !important;" +
                    `transition: ${Styles.BASE_TRANSITION}ms !important;` +
                    `transform: ${talknHandleStyles.transform} !important;` 
    }

    click(){
        const iframe = document.querySelector(`iframe#${Ext.APP_NAME}Extension`);
        switch( this.mode ){
        case Ext.MODE_BOTTOM:
        case Ext.MODE_INCLUDE:
            const talknNotifId = sessionStorage.getItem(Window.talknNotifId);
            if(talknNotifId === "null"){
                if( iframe.style.height !== this.styles.getIframeOpenHeight(true) ){
                    iframe.style.transition = "0ms";
                    iframe.style.height = this.styles.getIframeOpenHeight(true);
                    this.postMessage("startDispPosts");
                }else{
                    this.postMessage("startUndispPosts");
                    setTimeout( () =>{ 
                        iframe.style.transition = "0ms";
                        iframe.style.height = Iframe.getCloseHeight(true);
                    }, Styles.BASE_TRANSITION );
                }
            }else{
                clearTimeout( talknNotifId );
                sessionStorage.setItem(Window.talknNotifId, null);
                this.postMessage("closeNotif");
                iframe.style.transition = "0ms";
                iframe.style.height = this.styles.getIframeOpenHeight(true);
                this.postMessage("startDispPosts");
            }
            break;
        case Ext.MODE_MODAL:
/*
            const textarea = this.textarea.get();
            if( textarea && textarea.value && textarea.value !== ""){
                this.postMessage("delegatePost", textarea.value );
                textarea.value = "";
                return false;
            }
*/            
            if( iframe.style.opacity === "0" ){
                const handleIcon = this.get();
                const styles = Handle.getOpenStyles();
                handleIcon.style.background = styles.background;
                handleIcon.style.border = styles.border;
                handleIcon.style.transform = styles.transform;
                iframeIcon.style.opacity = 1;
                iframeIcon.style.transform = HandleIcon.getOpenTransform(); 
                if( window.innerWidth < Styles.FULL_WIDTH_THRESHOLD ){
                    this.lockWindow();
                }

            }else{

                if( this.inputPost ){
                    this.postMessage("post");
                    this.postMessage("onChangeInputPost");
                    this.inputPost = false;
                }else{
                    const handleIcon = this.get();
                    const styles = Handle.getCloseStyles();
                    handleIcon.style.background = styles.background;
                    handleIcon.style.border = styles.border;
                    handleIcon.style.transform = styles.transform;

                    iframe.style.transform = HandleIcon.geModalCloseTransform();
                    iframe.style.opacity = 0;

                    if( window.innerWidth < Styles.FULL_WIDTH_THRESHOLD ){
                        this.unlockWindow();
                    }
                }
            }
            break;
        }
    }

    mouseover(){
        const handleIcon = this.get();
        const translates = handleIcon.style.transform.split("translate3d(")[1].split(") ")[0]
        handleIcon.style.transform = `translate3d(${translates}) scale(1.1)`
    }

    mouseout(){
        const handleIcon = this.get();
        const translates = handleIcon.style.transform.split("translate3d(")[1].split(") ")[0]
        handleIcon.style.transform = `translate3d(${translates}) scale(1.0)`
    }

    drawCanvas(handle){
        const rgba = "rgba( 180, 180, 180, 0.7 )";
        const c = handle.getContext("2d");
        c.beginPath();
        c.moveTo(50,60);
        c.lineTo(240,40);
        c.lineTo(140,80);
        c.closePath();    
        c.strokeStyle = rgba;
        c.stroke();
        c.fillStyle= rgba;
        c.fill();
        c.closePath();
    
        c.beginPath();
        c.moveTo(241, 40);
        c.lineTo(150, 83);
        c.lineTo(230,100);
        c.closePath();    
        c.strokeStyle = rgba;
        c.stroke();
        c.fillStyle= rgba;
        c.fill();
        c.closePath();
    
        c.beginPath();
        c.moveTo(125, 80);
        c.lineTo(170, 90);
        c.lineTo(130,105);
        c.closePath();
        c.strokeStyle = rgba;
        c.stroke();
        c.fillStyle = rgba;
        c.fill();
        c.closePath();
        return handle;
    }
}

class Textarea {

    static get id(){return `${Ext.APP_NAME}${this.name}`}

    constructor(mode){
        this.mode = mode;
        const wrap = document.createElement("textarea");
        wrap.id = Textarea.id;
        wrap.style = this.getStyle();
        wrap.placeholder = "スマホで投稿アイコンを押した時の挙動の調整中";
        document.body.appendChild( wrap );
    }

    get(){
        return document.querySelector(`#${Textarea.id}`);
    }

    getStyle(){
        return "" + 
            "position: fixed !important;" + 
            "bottom: 80px !important;" + 
            "right: 70px !important;" + 
            "width: 270px !important;" + 
            "height: 30px !important;" + 
            "padding: 10px !important;" + 
            "border: 0px !important;" + 
            `z-index: ${Styles.zIndex} !important;` + 
            "background: rgba(255,255,255,0.8) !important;"; 
    }

    getValue(){
        return this.value;
    }
}

const ext = new Window();
