const ENV = "PROD";
alert("HEY");
class Ext {
    static get MODE_MODAL(){return "EXT_MODAL"}
    static get MODE_BOTTOM(){return "EXT_BOTTOM"}
    static get MODE_INCLUDE(){return "EXT_INCLUDE"}
    static get DEFAULT_MODE(){return Ext.MODE_MODAL}
    static getScriptTag(){
        const domain = ENV === "PROD" ? Ext.BASE_PROD_HOST : Ext.BASE_DEV_HOST;
        return document.querySelector(`script[src='//ext.${domain}']`);
    }
    static get APP_NAME(){return "talkn"}
    static get PROTOCOL(){return "https"}
    static get BASE_PROD_HOST(){return "talkn.io"}
    static get BASE_DEV_HOST(){return "localhost"}
    static get BASE_DEV_PORT(){return 8080}
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

    constructor(refusedFrame = false){

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
            this.inputPost = false;
            this.scriptTag = Ext.getScriptTag();
            this.mode = this.getMode();
            this.styles = new Styles( this.mode );
            this.browser = this.getBrowser();
            this.methodIdMap = {};
            this.notifCnt = 0;
            this.notifId = null;
            this.resizeMethodId = null;
            this.windowScrollY = window.scrollY;
            this.htmlOverflow = null;
            this.htmlPosition = null;
            this.htmlWidth = null;
            this.htmlHeight = null;

            // Methods
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
            const width = `${this.styles.getIframeWidth(true)} !important;`;
            const styles = this.styles.getStyles( width );
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
                let talknHandle  = document.createElement("canvas");
                const talknHandleStyles = Styles.getModalHandleCloseStyles();
                talknHandle.setAttribute("id", `${Ext.APP_NAME}Handle`);
                talknHandle.setAttribute("style", 
                    "position: fixed !important;" +
                    "bottom: 15px !important;" +
                    "right: 10px !important;" +
                    "display: flex;" + 
                    "align-items: center;" + 
                    "justify-content: center;" + 
                    `z-index: ${Styles.zIndex} !important;` +
                    "width: 60px !important;" +
                    "height: 60px !important;" +
                    `background: ${talknHandleStyles.background} !important;` +
                    `border: ${talknHandleStyles.border} !important;` +
                    "border-radius: 100px !important;" +
                    `transition: ${Styles.BASE_TRANSITION}ms !important;` +
                    `transform: ${talknHandleStyles.transform} !important;` 
                );
                talknHandle.addEventListener( "load", () => {} );
                talknHandle.addEventListener( "click", this.toggleIframe );
                talknHandle.addEventListener( "mouseover", () => {
                    const translates = talknHandle.style.transform.split("translate3d(")[1].split(") ")[0]
                    talknHandle.style.transform = `translate3d(${translates}) scale(1.1)`
                });
                talknHandle.addEventListener( "mouseout", () => {
                    const translates = talknHandle.style.transform.split("translate3d(")[1].split(") ")[0]
                    talknHandle.style.transform = `translate3d(${translates}) scale(1.0)`
                });

                talknHandle = Styles.getDrawCanvas( talknHandle );
                document.body.appendChild(talknHandle);
                document.body.appendChild(this.iframe);
                break;
            case Ext.MODE_INCLUDE:
                document.querySelector( Styles.INCLUDE_ID ).appendChild( this.iframe );
                break;
            case Ext.MODE_BOTTOM:
                document.body.appendChild(this.iframe);
                break;
            }
        }
    }

    /********************************/
    /* Initial methods              */
    /********************************/

    getMode(){
        const includeTag = document.querySelector( Styles.INCLUDE_ID );
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
        console.log("LOAD IFRAME");
        this.iframe = document.querySelector(`iframe#${Ext.APP_NAME}Extension`);
        this.postMessage("bootExtension", {
            extensionMode: this.mode,
            extensionWidth: this.styles.getIframeWidth(true),
            extensionOpenHeight: this.styles.getIframeOpenHeight(false),
            extensionCloseHeight: Number( Styles.getIframeCloseHeight().replace("px", "") )
        });
    }

    bootExtension(params){
        const iframe = document.querySelector(`iframe#${Ext.APP_NAME}Extension`);
        switch(this.mode){
        case Ext.MODE_BOTTOM:
        case Ext.MODE_INCLUDE:
            iframe.style.height = Styles.getIframeCloseHeight();
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
            const talknNotifId = sessionStorage.getItem(Ext.talknNotifId);
            if(talknNotifId === "null"){
                if( iframe.style.height !== this.styles.getIframeOpenHeight(true) ){
                    iframe.style.transition = "0ms";
                    iframe.style.height = this.styles.getIframeOpenHeight(true);
                    this.postMessage("startDispPosts");
                }else{
                    this.postMessage("startUndispPosts");
                    setTimeout( () =>{ 
                        iframe.style.transition = "0ms";
                        iframe.style.height = Styles.getIframeCloseHeight(true);
                    }, Styles.BASE_TRANSITION );
                }
            }else{
                clearTimeout( talknNotifId );
                sessionStorage.setItem(Ext.talknNotifId, null);
                this.postMessage("closeNotif");
                iframe.style.transition = "0ms";
                iframe.style.height = this.styles.getIframeOpenHeight(true);
                this.postMessage("startDispPosts");
            }
            break;
        case Ext.MODE_MODAL:
            if( iframe.style.opacity === "0" ){
                
                const talknHandle = document.querySelector(`#${Ext.APP_NAME}Handle`);
                const talknHandleStyles = Styles.getModalHandleOpenStyles();
                talknHandle.style.background = talknHandleStyles.background;
                talknHandle.style.border = talknHandleStyles.border;
                talknHandle.style.transform = talknHandleStyles.transform;
                iframe.style.opacity = 1;
                iframe.style.transform = Styles.getModeModalOpenTransform(); 

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

                    iframe.style.transform = this.styles.getModeModalCloseTransform();
                    iframe.style.opacity = 0;

                    if( window.innerWidth < Styles.FULL_WIDTH_THRESHOLD ){
                        this.unlockWindow();
                    }
                    document.querySelector("body").focus(()=>{});
                    //this.postMessage("blurInputPost");
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

            let talknNotifId = sessionStorage.getItem(Ext.talknNotifId);
            if(talknNotifId){
                clearTimeout( talknNotifId );
            }
            talknNotifId = setTimeout( this.closeNotif, params.transition );
            sessionStorage.setItem(Ext.talknNotifId, talknNotifId);

            setTimeout( () => {
                this.postMessage("openNotif");
            }, 10 );
            break;
        case Ext.MODE_MODAL:
            if( iframe.style.opacity === "0" ){
                const id ="notif" + params.id;
                const notif = document.createElement("div");
                const width = window.innerWidth < Styles.FULL_WIDTH_THRESHOLD ? "calc( 100% - 110px )" : "190px";
                notif.setAttribute("id", id);
                notif.setAttribute("name", "notif");
                notif.setAttribute("style", 
                    "position: fixed !important;" +
                    "bottom: 20px !important;" +
                    "right: 80px !important;" +
                    "display: flex;" + 
                    "align-items: center;" + 
                    "justify-content: flex-start;" + 
                    `z-index: ${Styles.zIndex} !important;` +
                    `width: ${width} !important;` +
                    "height: 30px !important;" + 
                    "padding: 10px !important;" +
                    "opacity: 0 !important;" +
                    `background: rgba(255,255,255,0.7) !important;` +
                    `border: rgba(235, 235, 235, 0.7) !important;` +
                    "border-radius: 3px !important;" +
                    "color: rgba( 120, 120, 120, 0.9) !important;" +
                    `transition: ${Styles.BASE_TRANSITION}ms !important;` +
                    `transform: translate3d(0px, 20px,0px) scale(1.0) !important;` 
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
                    "height: inherit !important;" 
                );

                const notifPost = document.createElement("div");
                notifPost.setAttribute("style", 
                    "width: 80% !important;" +
                    "min-width: 80% !important;" +
                    "max-width: 80% !important;" +
                    "height: inherit !important;" +
                    "font-size: 15px !important;" +
                    "line-height: 27px;" +
                    "text-indent: 10px;"
                );
                notifPost.innerText = params.post;
                notif.appendChild( notifIcon );
                notif.appendChild( notifPost );

                notif.addEventListener( "click", () => {
                    const talknHandle = document.querySelector(`#${Ext.APP_NAME}Handle`);
                    const talknHandleStyles = Styles.getModalHandleCloseStyles();
                    talknHandle.style.background = talknHandleStyles.background;
                    talknHandle.style.border = talknHandleStyles.border;
                    talknHandle.style.transform = talknHandleStyles.transform;
                    iframe.style.transform = Styles.getModeModalOpenTransform();
                    iframe.style.opacity = 1;
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
            let talknNotifId = sessionStorage.getItem(Ext.talknNotifId);
            clearTimeout( talknNotifId );
            sessionStorage.setItem(Ext.talknNotifId, null);
            const iframe = document.querySelector(`iframe#${Ext.APP_NAME}Extension`);
            iframe.style.transition = "0ms";
            iframe.style.height = Styles.getIframeCloseHeight();
            this.postMessage("closeNotif");
            break;
        case Ext.MODAL_MODAL:
            console.log( "CLOSE NOTIF!" );
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

    loadWindow(e){
        this.resizedWindow();
    }

    resizeWindow(e){
        if( this.resizeMethodId === null ){
            this.resizeMethodId = setTimeout( this.resizedWindow, Styles.BASE_TRANSITION );
        }
    }

    scrollWindow(e){
    }

    resizedWindow(e){
        this.resizeMethodId = null;
        const iframe = document.querySelector(`iframe#${Ext.APP_NAME}Extension`);
        const talknNotifId = sessionStorage.getItem(Ext.talknNotifId);  
        const width = this.styles.getIframeWidth(true);
        iframe.style['width'] = width;
        iframe.style['min-width']  = width;
        iframe.style['max-width'] = width;

        if( ( talknNotifId === "null" ) === false && typeof talknNotifId === "object"){
            switch(this.mode){
            case Ext.MODE_BOTTOM:
            case Ext.MODE_INCLUDE:
                if( iframe.style.height === Styles.getIframeCloseHeight() ){
                    iframe.style.height = Styles.getIframeCloseHeight();
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
            extensionCloseHeight: Number( Styles.getIframeCloseHeight().replace("px", "") )
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
                if(this.methodIdMap[ method ] || Ext.aacceptPostMessages.includes(method)){
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
        const talknUrl = this.getTalknUrl();
        const requestObj = this.getRequestObj( method, params );
        const methodId = setTimeout( () => this.handleErrorMessage(method), Ext.activeMethodSecond);
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
                new Ext(true);
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


class Element{
    constructor( mode ){
        this.mode = mode;
    }

    static get
}

class Styles{

    static getIframeCloseHeight(){return '45px'};
    static getIframeOpenNotifHeight(){return '85px'};
    static get INCLUDE_ID(){return "#talkn"}
    static get iframeModalWidth(){return 280};
    static get iframeBrowserWidth(){return 320};
    static get iframeBrowserHeight(){return 420};
    static get zIndex(){return 2147483647};
    static get modeModalBottom(){return 40};
    static get FULL_WIDTH_THRESHOLD(){return 600}
    static get BASE_TRANSITION(){return 600}

    constructor( mode ){
        this.mode = mode;
    }

    static getDrawCanvas(talknHandle){
        const rgba = "rgba( 180, 180, 180, 0.7 )";
        const c = talknHandle.getContext("2d");
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
    
        return talknHandle
    }

    static getModalHandleOpenStyles(){
        return {
            transform: `translate3d(0px, -17px, 0px) scale( 1 )`,
            background: "rgba(255, 255, 255, 0.95)",
            border: "1px solid rgba(235, 235, 235, 0.95)"
        }
    }

    static getModalHandleCloseStyles(){
        return {
            transform: `translate3d(0px, 0px, 0px) scale( 0.95 )`,
            background: "rgba(255, 255, 255, 0.75)",
            border: "1px solid rgba(235, 235, 235, 0.75)"
        }
    }

    static getModeModalOpenTransform(){
        return `translate3d(0px, 0px, 0px) scale( 1 )`;
    }

    getIframeWidth( addUnit = false ){

        let width = Styles.iframeBrowserWidth + "px";
        switch( this.mode ){
        case Ext.MODE_BOTTOM:
            width = window.innerWidth < Styles.FULL_WIDTH_THRESHOLD ? "100%" : Styles.iframeBrowserWidth + "px";
            break;
        case Ext.MODE_MODAL:
            width = window.innerWidth < Styles.FULL_WIDTH_THRESHOLD ? "96%" : Styles.iframeModalWidth + "px";
            break;
        case Ext.MODE_INCLUDE:
            const talknTag = document.querySelector( Styles.INCLUDE_ID );
            width = talknTag ? talknTag.clientWidth : "100%";
            return addUnit ? width + "px" : width ;
        }
        return addUnit ? width : width.replace("px", "").replace("%", "") ;
    }

    getIframeOpenHeight( addUnit = false ){
        let height = Styles.iframeBrowserHeight + "px";
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
            const talknTag = document.querySelector( Styles.INCLUDE_ID );
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

    getModeModalCloseTransform(){
        const translateY = Number( this.getIframeOpenHeight() ) + Number( Styles.modeModalBottom );
        return `translate3d( 0px, ${translateY}px, 0px ) scale( 0.5 )`;
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
                `height: ${this.getIframeOpenHeight(true)} !important;` + 
                "margin: 0 !important;" + 
                "padding: 0 !important;" + 
                "opacity: 0 !important;" + 
                `transition: ${Styles.BASE_TRANSITION}ms !important;` + 
                `transform: ${ this.getModeModalCloseTransform() } !important;`;
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
                `height: ${Styles.getIframeCloseHeight()} !important;` + 
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
}

const ext = new Ext();
