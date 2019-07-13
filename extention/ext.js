const TALKN_EXT_ENV = "PROD";

class Ext {
    static get APP_NAME(){return "talkn"}
    static get MODE_MODAL(){return "EXT_MODAL"}
    static get MODE_BOTTOM(){return "EXT_BOTTOM"}
    static get MODE_INCLUDE(){return "EXT_INCLUDE"}
    static get DEFAULT_MODE(){return Ext.MODE_MODAL}
    static get BASE_EXT_SUBDOMAIN(){return "ext"}
    static get BASE_PROD_HOST(){return "talkn.io"}
    static get BASE_DEV_HOST(){return "localhost"}
    static get BASE_DEV_PORT(){return 8080}
    static get EXCLUSION_ORIGINS(){return ['https://localhost', 'https://talkn.io']}
    static get DEFAULT_DISPLAY_MODE_KEY(){return 0 }
    static get DEFAULT_DISPLAY_MODE_DIRECTION(){return "ASC" }
    static get DISPLAY_MODE(){return [ Ext.DISPLAY_MODE_ACTIVE, Ext.DISPLAY_MODE_OPEN ] }
    static get DISPLAY_MODE_ACTIVE(){return "ACTIVE" }
    static get DISPLAY_MODE_STANBY(){return "STANBY" }
    static get DISPLAY_MODE_OPEN(){return "OPEN" }
    static get INCLUDE_ID(){return `#${Ext.APP_NAME}`}
    static get APP_HOST(){
        if(TALKN_EXT_ENV === "PROD"){
            return `//${Ext.BASE_PROD_HOST}`;
        }else if(TALKN_EXT_ENV === "START"){
            return `//${Ext.BASE_DEV_HOST}`;
        }else if(TALKN_EXT_ENV === "DEV"){
            return `//${Ext.BASE_DEV_HOST}:${Ext.BASE_DEV_PORT}`;
        }
    }
    static get APP_EXT_HOST(){
        if(TALKN_EXT_ENV === "PROD"){
            return `//${Ext.BASE_EXT_SUBDOMAIN}.${Ext.BASE_PROD_HOST}`;
        }else if(TALKN_EXT_ENV === "START"){
            return `//${Ext.BASE_EXT_SUBDOMAIN}.${Ext.BASE_DEV_HOST}`;
        }else if(TALKN_EXT_ENV === "DEV"){
            return `//${Ext.BASE_EXT_SUBDOMAIN}.${Ext.BASE_DEV_HOST}:${Ext.BASE_DEV_PORT}`;
        }
    }
    static get APP_ENDPOINT(){
        return `https:${Ext.APP_HOST}`;
    }
    static isExt(){
        const scriptTag = document.querySelector(`script[src='${Ext.APP_EXT_HOST}']`);
        return scriptTag === null ? true : false ;
    }
    static getMode( options ){

        let includeTag;

        /************/
        /*  OPTION  */
        /************/

        if( options && options.mode ){  

            if( "EXT_" + options.mode ===  Ext.MODE_MODAL ){
                return Ext.MODE_MODAL;
            }
            if( "EXT_" + options.mode ===  Ext.MODE_INCLUDE && options.selector ){
                includeTag = document.querySelector( options.selector );
                if( includeTag ){                  
                    Object.keys( options ).forEach( (key) => {
                        if( key !== "mode" ){
                            includeTag.style[ key ] = options[ key ];
                        }
                    } );
                    return Ext.MODE_INCLUDE;
                }
            }
        }

        /************/
        /*  NORMAL  */
        /************/

        includeTag = document.querySelector( Ext.INCLUDE_ID );
        if( includeTag ){
            return Ext.MODE_INCLUDE;
        }

        let mode = Ext.DEFAULT_MODE;
        const domain = TALKN_EXT_ENV === "PROD" ? Ext.BASE_PROD_HOST : Ext.BASE_DEV_HOST;
        const scriptTag =  document.querySelector(`script[src='//ext.${domain}']`);
        if( scriptTag && scriptTag.attributes ){
            
            if( scriptTag.attributes.mode && scriptTag.attributes.mode.value ){
                mode = "EXT_" + scriptTag.attributes.mode.value.toUpperCase();
            }

            // 定義しているどのモードにも該当しない場合
            if( mode !== Ext.MODE_BOTTOM && mode !== Ext.MODE_MODAL && mode !== Ext.MODE_INCLUDE ){

                // デフォルトのモードを設定する
                mode = Ext.DEFAULT_MODE;
            }
        }
        return mode;
    }
    static getRequestObj(method, params = {}){
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

class Styles{
    static get zIndex(){return 2147483647}
    static get FULL_WIDTH_THRESHOLD(){return 600}
    static get BASE_TRANSITION(){return 600}
    static get WIDTH(){return 280}
    static get BOTTOM(){return 45}
    static get BORDER_RADIUS(){return 5}
    static get BASE_SHADOW(){return "rgba(220, 220, 220, 0.95) 0px 0px 3px 0px !important;"}
    static get BASE_ACTIVE_BG_COLOR(){return "rgba(255, 255, 255, 0.975) !important;"}
    static get BASE_UNACTIVE_BG_COLOR(){return "rgba(255, 255, 255, 0.75) !important;"}
    static get BASE_ACTIVE_BORDER(){return "1px solid rgba(235, 235, 235, 0.975) !important;"}
    static get BASE_UNACTIVE_BORDER(){return "1px solid rgba(235, 235, 235, 0.75) !important;"}
    constructor(){
        const style = document.createElement("style");
        const css = document.createTextNode(`#${Textarea.id}::placeholder { ` + 
            `font-size: 12px; ` +
            `line-height: 10px; ` +
            `letter-spacing: 2px; ` +
            `color: rgb(170, 170, 170); ` +
        `}`);

        style.type = "text/css";
        style.appendChild(css);
        document.head.appendChild(style);
    }
}

class Elements {
    constructor(_window){
        this.window = _window;
        this.action = this.action.bind( this );
    }
    action( called, name ){
        const elm = this.get();
        const styles = this[`get${name}Styles`]( called　);

        if( elm && styles ){
            Object.keys( styles ).forEach( ( key ) => {
                elm.style[ key ] = styles[ key ];
            });
        }
    }
    callback( called, displayMode, displayModeDirection, actionName, _window ){

        // スマホだと頻繁にNativeのヘッダーやフッターが表示、非表示を繰り返しresizedが実行されてしまうため排他制御
        if( window.innerWidth < Styles.FULL_WIDTH_THRESHOLD ){
            if( called !== "resized" ){
                switch( displayMode ){
                case Ext.DISPLAY_MODE_ACTIVE :
                    if( displayModeDirection === "DESC" ){
                        window.scrollTo( 0, _window.ins.body.locktimeMarginTop );
                    }
                    break;
                case Ext.DISPLAY_MODE_OPEN :
                    if( displayModeDirection === "DESC" ){
                        window.scrollTo( 0, _window.ins.body.locktimeMarginTop );
                    }
                    break;
                }
            }
        }
    }
}

class Window extends Elements {
    static get talknNotifId(){return "talknNotifId"};
    static get mediaSecondInterval(){ return 333 };
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

    static getCurrentTime( currentTime, base = 10 ){
        return Math.floor( currentTime * base ) / base;
    }

    static getActiveStyles( called ){

    }

    static getOpenStyles( called ){

    }

    constructor( refusedFrame = false ){
        super( window );
        this.refusedFrame = refusedFrame;
        this.isExt = Ext.isExt();
        this.href = window.location.href;
        this.connection = this.href.replace("http:/", "").replace("https:/", "");
        const hasSlash = this.connection.lastIndexOf("/") === ( this.connection.length - 1 );
        this.connection = hasSlash ? this.connection : this.connection + "/";
        const bootFlg = Ext.EXCLUSION_ORIGINS.every( ( origin ) => {
            return this.href.indexOf( origin ) === -1;
        });

        if(bootFlg){
            
            let init = ( options = {} ) => {

                // Variable
                this.talknParams = {};
                this.extMode = Ext.getMode(options);
                this.includeId = this.extMode === Ext.MODE_INCLUDE && options && options.selector ?
                    options.selector : Ext.INCLUDE_ID;
                this.displayModeKey = Ext.DEFAULT_DISPLAY_MODE_KEY;
                this.displayModeDirection = "ASC";
                this.browser = this.getBrowser();
                this.handleMediaCurrentTime = 0;
                this.scrollY = window.scrollY;
                this.ins = {};

                // Communication talkn Window
                this.methodIdMap = {};
                this.notifCnt = 0;
                this.notifId = null;

                this.transitionEndId = null;
                this.resizeMethodId = null;
                this.htmlOverflow = null;
                this.htmlPosition = null;
                this.htmlWidth = null;
                this.htmlHeight = null;       

                // Callback Methods.
                this.load = this.load.bind(this);
                this.resize = this.resize.bind(this);
                this.resized = this.resized.bind(this);
                this.scroll = this.scroll.bind(this);
                this.transitionend = this.transitionend.bind(this);
                this.remove = this.remove.bind(this);

                this.updateDisplayMode = this.updateDisplayMode.bind(this);
                this.transformDisplayMode = this.transformDisplayMode.bind(this);
                this.openNotif = this.openNotif.bind(this);
                this.closeNotif = this.closeNotif.bind(this);
                this.setupMedia = this.setupMedia.bind(this);

                // Communicarion Methods.
                this.childTo = this.childTo.bind(this);
                this.catchMessage = this.catchMessage.bind(this);
                this.handleErrorMessage = this.handleErrorMessage.bind(this);

                window.addEventListener('message', this.catchMessage);
                window.addEventListener('load', this.load);
                window.addEventListener('resize', this.resize);
                window.addEventListener('scroll', this.scroll);
                window.addEventListener('transitionend', this.transitionend);

                this.ins.window = this;
                this.ins.styles = new Styles( this );
                this.ins.body = new Body( this );
                this.ins.iframe = new Iframe( this );
                this.ins.handleIcon = new HandleIcon( this );
                this.ins.textarea = new Textarea( this );
                this.ins.notifStatus = new NotifStatus( this );

                this.setupMedia();
            };

            init = init.bind( this );

            if( this.isExt ){
                // Communication to background.js
                chrome.runtime.sendMessage({ message: "message"}, (res) => {
                    const options = res ? JSON.parse( res ) : {};
                    init( options );
                });
            }else{
                init();   
            }
        }
    }



    /********************************/
    /* Control transform            */
    /********************************/

    updateDisplayMode( called, transform = true, option = {}){
        if( option.displayModeKey !== undefined ){
            this.displayModeKey = option.displayModeKey;
            if( option.displayModeDirection ){
                this.displayModeDirection = option.displayModeDirection;
            }
        }else{
            if( this.displayModeDirection === "ASC" ){
                this.displayModeKey++;
                if( this.displayModeKey >= Ext.DISPLAY_MODE.length ){
                    this.displayModeDirection = "DESC";
                    this.displayModeKey = this.displayModeKey - 2;
                }
            }else{
                this.displayModeKey--;
                if( this.displayModeKey < 0 ){
                    this.displayModeDirection = "ASC";
                    this.displayModeKey = 1
                }
            }
        }

        if( transform ){
            this.transformDisplayMode( called, this.displayModeKey );
        }
    }

    transformDisplayMode( called, displayModeKey ){
        const { body, iframe, handleIcon, textarea, notifStatus } = this.ins;
        const displayMode = Ext.DISPLAY_MODE[ displayModeKey ].toLowerCase();
        const actionName = displayMode.charAt(0).toUpperCase() + displayMode.slice(1);

        const beforeDisplayMode = Ext.DISPLAY_MODE[ this.displayModeKey ];
        const beforeDisplayModeDirection = this.displayModeDirection;

        if( this) this.action( called, actionName );
        if( body ) body.action( called, actionName );
        if( iframe ) iframe.action( called, actionName );
        if( handleIcon ) handleIcon.action( called, actionName );
        if( textarea ) textarea.action( called, actionName );
        if( notifStatus ) notifStatus.action( called, actionName );
        this.callback( called, beforeDisplayMode, beforeDisplayModeDirection, actionName, this );
    }

    /********************************/
    /* Initial methods              */
    /********************************/

    get(){
        return window;
    }

    isMediaConnection(){
        const href = location.href;
        let isMediaConnection = false;
        if( href.match(/mp3$/) || href.match(/mp3\/$/) ){
            isMediaConnection = true;
		}

		if( href.match(/mp4$/) || href.match(/mp4\/$/) ){
            isMediaConnection = true;
        }

		if( href.match(/m4a$/) || href.match(/m4a\/$/) ){
            isMediaConnection = true;
        }
        return isMediaConnection;
    }

    setupMedia(){
		const href = location.href;
		let isMediaConnection = this.isMediaConnection();
        if( isMediaConnection ){
            const media = document.querySelector("video");
            setInterval( () => {
                if( !media.paused ){  
                    this.handleMediaCurrentTime = media.currentTime;
                }
            }, Window.mediaSecondInterval );
        }
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

    /*************************/
    /* Child Window          */
    /* Communication methods */
    /*************************/

    bootExtension(params){
        const { iframe } = this.ins;
        const iframeElm = iframe.get();
        switch(this.extMode){
        case Ext.MODE_BOTTOM:
        case Ext.MODE_INCLUDE:
            iframeElm.style.height = Iframe.getCloseHeight();
            iframeElm.style.display = "flex";
            break;
        case Ext.MODE_MODAL:
            break;
        }

        this.talknParams = params;
        this.childTo("onTransition");
    }

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

    // handle error.
    handleErrorMessage(method){
        if(this.methodIdMap[method]){
            switch(method){
            case 'bootExtension':
                this.childTo("removeExtension");
                const { iframe } = this.window.ins;
                iframe.remove();
                this.remove();

                console.warn("CSP Reboot: " + method );
                new Window(true);
                break;
            }
        }
    }

    // To child window message.
    childTo(method, params = {}){
        const iframe = this.ins.iframe.get();
        const src = this.ins.iframe.getSrc();
        const requestObj = Ext.getRequestObj( method, params );
        const methodId = setTimeout( () => this.handleErrorMessage(method), Window.activeMethodSecond);
        this.methodIdMap[method] = methodId;
        iframe.contentWindow.postMessage(requestObj, src);
    }

    /********************************/
    /* Accept Communication methods */
    /********************************/

    toggleIframe(params){
        this.updateDisplayMode("toggleIframe");
    }

    openNotif(params){
        const { iframe, notifStatus } = this.ins; 
        const iframeElm = iframe.get();
        switch( this.extMode ){
        case Ext.MODE_BOTTOM:
            iframeElm.style.transition = "0ms";
            iframeElm.style.height = Iframe.getIframeOpenNotifHeight();

            let talknNotifId = sessionStorage.getItem(Window.talknNotifId);
            if(talknNotifId){
                clearTimeout( talknNotifId );
            }
            talknNotifId = setTimeout( this.closeNotif, params.transition );
            sessionStorage.setItem(Window.talknNotifId, talknNotifId);

            setTimeout( () => {
                this.childTo("openNotif");
            }, 50 );
            break;
        case Ext.MODE_MODAL:
            switch( Ext.DISPLAY_MODE[ this.displayModeKey ] ){
            case Ext.DISPLAY_MODE_ACTIVE:
                notifStatus.addCnt(params.addUnreadCnt);
                new Notif(this, params);
                break;
            }
            break;
        }
    }

    closeNotif(params){
        switch( this.extMode ){
        case Ext.MODE_BOTTOM:7
            let talknNotifId = sessionStorage.getItem(Window.talknNotifId);
            clearTimeout( talknNotifId );
            sessionStorage.setItem(Window.talknNotifId, null);
            const iframe = document.querySelector(`iframe#${Ext.APP_NAME}Extension`);
            iframe.style.transition = "0ms";
            iframe.style.height = Iframe.getCloseHeight();
            this.childTo("closeNotif");
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
        this.childTo("getClientMetas", clientMetas);
    }

    transitionend(e){
        const { body, iframe, handleIcon, textarea} = this.ins;

        if( this.transitionEndId === null ){

            this.transitionEndId = setTimeout( () => {
                this.transitionEndId = null;

                this.childTo("updateExtension", {                
                    extensionMode: this.extMode,
                    extensionWidth: iframe.getWidth(true),
                    extensionOpenHeight: Number( iframe.getHeight() ),
                    extensionCloseHeight: Number( Iframe.getCloseHeight() )
                });
            }, Styles.BASE_TRANSITION );
        }

        if( body && body.transitionEnd ) body.transitionEnd(e);
        if( iframe && iframe.transitionEnd ) iframe.transitionEnd(e);
        if( handleIcon && handleIcon.transitionEnd ) handleIcon.transitionEnd(e);
        if( textarea && textarea.transitionEnd ) textarea.transitionEnd(e);
    }

    load(e){
        this.resized();
    }

    resize(e){
        if( this.resizeMethodId === null ){
            this.resizeMethodId = setTimeout( this.resized, Styles.BASE_TRANSITION );
        }
    }

    scroll(e){
    }

    resized(e){
        const { iframe } = this.ins;
        this.resizeMethodId = null;

        this.updateDisplayMode( "resized", true, {displayModeKey: this.displayModeKey, displayModeDirection: this.displayModeDirection} );

        this.childTo("updateExtension", {                
            extensionMode: this.extMode,
            extensionWidth: iframe.getWidth(true),
            extensionOpenHeight: Number( iframe.getHeight() ),
            extensionCloseHeight: Number( Iframe.getCloseHeight() )
        });
    }

    remove(){
        window.removeEventListener('message', this.catchMessage);
        window.removeEventListener('load', this.load);
        window.removeEventListener('resize', this.resize);
        window.removeEventListener('scroll', this.scroll);
        window.removeEventListener('transitionend', this.transitionend);
    }

    /*************************/
    /* ANIMATION             */
    /*************************/

    getActiveStyles( called ){
        return {}
    }

    getOpenStyles( called ){
        this.scrollY = window.scrollY;
        return {}
    }
}

class Body extends Elements {
    constructor( _window ){
        super(_window);
        const bodyElm = this.get();
        this.locktimeMarginTop = 0;
        this.overflow = bodyElm.style.overflow;
        this.position = bodyElm.style.position;
        this.width = bodyElm.style.width;
        this.height = bodyElm.style.height;
        this.marginTop = bodyElm.style.marginTop;
    }

    get(){
        return document.querySelector(`body`);
    }

    /*************************/
    /* ANIMATION             */
    /*************************/

    getActiveStyles( called ){
        if( window.innerWidth < Styles.FULL_WIDTH_THRESHOLD ){
            return {
//                overflow: this.overflow,
                position: this.position,
                width: this.width,
                height: this.height,
                marginTop: this.marginTop
            }
        }
        return {};
    }

    getOpenStyles( called ){
        if( window.innerWidth < Styles.FULL_WIDTH_THRESHOLD ){

            // スマホでOPENした際にresizedが実行されるため排他制御
            if( called === "resized" ){
                return {};
            }else{
                this.locktimeMarginTop = window.scrollY;
                return {
                    position: "fixed",
                    width: "100%",
                    height: "100%" ,
                    marginTop: -( window.scrollY ) + "px"
                }
            }
        }
    }

    transitionEnd(){
        
    }
}


class Iframe extends Elements {

    static get id(){return `${Ext.APP_NAME}Extension`}
    static getCloseHeight(addUnit = false){
        return addUnit ? '45px' : 45 ;
    }
    static getIframeOpenNotifHeight(){return '85px'};
    static get width(){
        return window.innerWidth < Styles.FULL_WIDTH_THRESHOLD ? "96%" : 280;
    }
    static get height(){
        return window.innerWidth < Styles.FULL_WIDTH_THRESHOLD ? "2%" : 420;
    }
    static get right(){
        return window.innerWidth < Styles.FULL_WIDTH_THRESHOLD ? "2%" : 10;
    }
    static get transform(){
        return `translate3d( 0px, ${Styles.BOTTOM}px, 0px )`;
    }
    static get closeHeight(){return 0};
    static get modeModalBottom(){return 45};

    constructor( _window ){
        super( _window );
        this.methodIdMap = {};
        this.load = this.load.bind(this);
        this.getSrc = this.getSrc.bind(this);
        this.getWidth = this.getWidth.bind(this);
        this.getHeight = this.getHeight.bind(this);
        this.getRight = this.getRight.bind(this);
        this.getTransform = this.getTransform.bind(this);
        this.remove = this.remove.bind( this );

        const width = `${this.getWidth(true)} !important;`;
        const iframe  = document.createElement("iframe");
        iframe.id = Iframe.id
        iframe.name = "extension";
        iframe.style = this.getStyles( width );
        iframe.src = this.getSrc();
        iframe.frameBorder =  0;
        iframe.addEventListener( "load", this.load );

        switch( this.window.extMode ){
        case Ext.MODE_MODAL:
            document.body.appendChild(iframe);
            break;
        case Ext.MODE_INCLUDE:
            document.querySelector( this.window.includeId ).appendChild( iframe );
            break;
        case Ext.MODE_BOTTOM:
            document.body.appendChild(iframe);
            break;
        }
    }

    getSrc(){
        if( this.window.refusedFrame ){
            return window.chrome.runtime.getURL('index.html?' + this.window.connection);
        }else{
            return Ext.APP_ENDPOINT + this.window.connection;
        }
    }

    /*************************/
    /* UI DATAS              */
    /*************************/

    get(){
        return document.querySelector(`#${Iframe.id}`);
    }

    getStyles( width ){
        switch( this.window.extMode ){
        case Ext.MODE_MODAL:
            const activeStyles = this.getActiveStyles();
            return "" +
                `z-index: ${Styles.zIndex - 1} !important;` +
                "display: block !important;" +
                "align-items: flex-end !important;" + 
                "position: fixed !important; " +
                `bottom: ${Styles.BOTTOM}px !important;` + 
                `right: ${activeStyles.right} !important;` + 
                `width: ${activeStyles.width}` + 
                `min-width: ${activeStyles.width}` + 
                `max-width: ${activeStyles.width}` + 
                `height: ${activeStyles.height} !important;` + 
                `min-height: ${activeStyles.height} !important;` + 
                `max-height: ${activeStyles.height} !important;` + 
                "margin: 0 !important;" + 
                "padding: 0 !important;" + 
                `opacity: ${activeStyles.opacity} !important;` + 
                `transition: ${Styles.BASE_TRANSITION}ms !important;` + 
                `transform: ${ activeStyles.transform } !important;`;
        case Ext.MODE_BOTTOM:
            const height = Iframe.getCloseHeight(true);
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
                `height: ${height} !important;` + 
                `min-height: ${height} !important;` + 
                `max-height: ${height} !important;` + 
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
        let width = Styles.WIDTH;
        switch( this.window.extMode ){
        case Ext.MODE_BOTTOM:
            width = window.innerWidth < Styles.FULL_WIDTH_THRESHOLD ? "100%" : width;
            break;
        case Ext.MODE_MODAL:
            width = window.innerWidth < Styles.FULL_WIDTH_THRESHOLD ? "96%" : Styles.WIDTH + "px";
            break;
        case Ext.MODE_INCLUDE:
            const talknTag = document.querySelector( this.window.includeId );
            width = talknTag ? talknTag.clientWidth : "100%";
            return addUnit ? width + "px" : width ;
        }
        return addUnit ? width : width.replace("px", "").replace("%", "") ;
    }

    getHeight( addUnit = false ){
        let height = "0px";
        switch( this.window.extMode ){
        case Ext.MODE_BOTTOM:
            height = window.innerWidth < Styles.FULL_WIDTH_THRESHOLD ? `${Math.floor( window.innerHeight * 0.9 )}px` : Iframe.getCloseHeight(true);
            break;
        case Ext.MODE_MODAL:
            height = window.innerWidth < Styles.FULL_WIDTH_THRESHOLD ?
                `${Math.floor( window.innerHeight * 0.9 )}px` : "420px";
            break;
        case Ext.MODE_INCLUDE:
            const talknTag = document.querySelector( this.window.includeId );
            height = talknTag ? talknTag.clientHeight : "100%";
            return addUnit ? height + "px" : height ;
        }
        return addUnit ? height : height.replace("px", "").replace("%", "");
    }

    getRight( addUnit = false ){
        let right = 0
        switch( this.window.extMode ){
        case Ext.MODE_BOTTOM:
        case Ext.MODE_INCLUDE:
            break;
        case Ext.MODE_MODAL:
            right = window.innerWidth < Styles.FULL_WIDTH_THRESHOLD ? "2%" : "10px";
            break;
        }
        return addUnit ? right : right.replace("px", "").replace("%", "") ;
    }

    getTransform(){
        let transform = "translate3d( 0px 0px 0px)";
        switch( this.window.extMode ){

        case Ext.MODE_INCLUDE:
            break;
        case Ext.MODE_BOTTOM:
        case Ext.MODE_MODAL:
            switch( Ext.DISPLAY_MODE[ this.window.displayModeKey ] ){
            case Ext.DISPLAY_MODE_ACTIVE:
                const translateY = Styles.BOTTOM + Number( this.getHeight() );
                return `translate3d( 0px, ${ translateY }px, 0px ) scale( 0.5 )`;
            case Ext.DISPLAY_MODE_OPEN:
                return `translate3d( 0px, 0px, 0px ) scale( 1.0 )`;
            }
            break;
        }
        return transform;
    }
    
    getOpacity( addUnit = false ){
        let width = Styles.WIDTH + "px";
        switch( this.window.extMode ){
        case Ext.MODE_BOTTOM:
            width = window.innerWidth < Styles.FULL_WIDTH_THRESHOLD ? "100%" : width;
            break;
        case Ext.MODE_MODAL:
                switch( Ext.DISPLAY_MODE[ this.window.displayModeKey ] ){
                case Ext.DISPLAY_MODE_ACTIVE:
                    return 1;
                case Ext.DISPLAY_MODE_OPEN:
                    return 1;
                }
            break;
        case Ext.MODE_INCLUDE:
            const talknTag = document.querySelector( this.window.includeId );
            width = talknTag ? talknTag.clientWidth : "100%";
            return addUnit ? width + "px" : width ;
        }
        return addUnit ? width : width.replace("px", "").replace("%", "") ;
    }


    static getModalOpenTransform(){
        return `translate3d(0px, 0px, 0px) scale( 1 )`;
    }

    getModalCloseTransform(){
        const translateY = Number( this.getHeight() ) + Number( Iframe.modeModalBottom );
        return `translate3d( 0px, ${translateY}px, 0px )`;
    }

    load(e){
        const isMediaConnection = this.window.isMediaConnection();
        this.window.childTo("bootExtension", {
            isMediaConnection,
            extensionMode: this.window.extMode,
            extensionWidth: this.getWidth(true),
            extensionOpenHeight: this.getHeight(false),
            extensionCloseHeight: Number( Iframe.getCloseHeight() )
        });
    }

    remove(){
        const iframeElm = this.get();
        iframeElm.removeEventListener( "load", this.loadIframe );
        iframeElm.remove();
        delete this;
    }

    /*************************/
    /* ANIMATION             */
    /*************************/

    getActiveStyles( called ){
        const width = this.getWidth(true);
        const height = this.getHeight(true);
        const right = this.getRight(true);
        const opacity = this.getOpacity();
        const transform = this.getTransform();
        return {
            transform,
            opacity,
            right,
            width: width,
            minWidth: width,
            maxWidth: width,
            height: height,
            minHeight: height,
            maxHeight: height
        }
    }

    getOpenStyles( called ){
        const { iframe } = this.window.ins;
        const width = this.getWidth(true);
        const height = this.getHeight(true);
        const right = this.getRight(true);
        const opacity = this.getOpacity();
        const transform = iframe.getTransform();
        return {
            transform,
            opacity,
            right,
            minWidth: width,
            maxWidth: width,
            height: height,
            minHeight: height,
            maxHeight: height
        }
    }

    transitionEnd(){
        
    }
}

class HandleIcon extends Elements {

    static get id(){return `${Ext.APP_NAME}${this.name}`}
    static get width(){return 62}
    static get right(){return 5}
    constructor(_window){
        super( _window );

        if( this.window.extMode !== Ext.MODE_INCLUDE ){
            let handleIcon  = document.createElement("canvas");
            handleIcon = this.drawCanvas( handleIcon );
            handleIcon.id = HandleIcon.id;
            handleIcon.style = this.getStyle();

            this.click = this.click.bind( this );
            this.mouseover = this.mouseover.bind( this );
            this.mouseout = this.mouseout.bind( this );

            handleIcon.addEventListener( "click", this.click );
            handleIcon.addEventListener( "mouseover", this.mouseover );
            handleIcon.addEventListener( "mouseout", this.mouseout );

            document.body.appendChild(handleIcon);
        }
    }

    /*************************/
    /* UI DATAS              */
    /*************************/

    get(){
        return document.querySelector(`#${HandleIcon.id}`);
    }

    getStyle(){
        const talknHandleStyles = this.getActiveStyles();
        return "" + 
                    `position: fixed !important;` +
                    `bottom: ${talknHandleStyles.bottom} !important;` +
                    `right: ${HandleIcon.right}px !important;` +
                    `cursor: pointer !important;` + 
                    `display: flex !important;` + 
                    `align-items: center !important;` + 
                    `justify-content: center !important;` + 
                    `z-index: ${Styles.zIndex} !important;` +
                    `width: ${HandleIcon.width}px  !important;` +
                    `height: ${HandleIcon.width}px !important;` +
                    `background: ${talknHandleStyles.background} !important;` +
                    `border: ${talknHandleStyles.border} !important;` +
                    `border-radius: 100px !important;` +
                    `box-shadow: ${Styles.BASE_SHADOW}` +
                    `transition: ${Styles.BASE_TRANSITION}ms !important;` +
                    `transform: ${talknHandleStyles.transform} !important;` 
    }
    
    drawCanvas(handle){
        const rgba = "rgba( 180, 180, 180, 0.7 )";
        const c = handle.getContext("2d");
        c.beginPath();

        // 横 縦
        c.moveTo(50,60);
        c.lineTo(230,40);
        c.lineTo(140,80);
        c.closePath();    
        c.strokeStyle = rgba;
        c.stroke();
        c.fillStyle= rgba;
        c.fill();
        c.closePath();
    
        c.beginPath();
        c.moveTo(231, 40);
        c.lineTo(150, 83);
        c.lineTo(240,100);
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

    /*************************/
    /* EVENT LISTENER        */
    /*************************/

    click(){
        const { iframe, textarea, notifStatus } = this.window.ins;
        const iframeElm = iframe.get();

        switch( this.window.extMode ){
        case Ext.MODE_INCLUDE:
            const talknNotifId = sessionStorage.getItem(Window.talknNotifId);
            if(talknNotifId === "null"){
                if( iframeElm.style.height !== this.styles.getIframeOpenHeight(true) ){
                    iframeElm.style.transition = "0ms";
                    iframeElm.style.height = this.styles.getIframeOpenHeight(true);
                    this.childTo("startDispPosts");
                }else{
                    this.childTo("startUndispPosts");
                    setTimeout( () =>{ 
                        iframeElm.style.transition = "0ms";
                        iframeElm.style.height = Iframe.getCloseHeight(true);
                    }, Styles.BASE_TRANSITION );
                }
            }else{
                clearTimeout( talknNotifId );
                sessionStorage.setItem(Window.talknNotifId, null);
                this.childTo("closeNotif");
                iframeElm.style.transition = "0ms";
                iframeElm.style.height = this.styles.getIframeOpenHeight(true);
                this.childTo("startDispPosts");
            }
            break;
        case Ext.MODE_BOTTOM:
        case Ext.MODE_MODAL:

            notifStatus.resetCnt();

            const regex = /^\s*$/;
            const inputPost = textarea.getValue();
            switch( Ext.DISPLAY_MODE[ this.window.displayModeKey ] ){
            case Ext.DISPLAY_MODE_ACTIVE:
                this.window.updateDisplayMode("clickHandleIcon");
                break;
            case Ext.DISPLAY_MODE_OPEN:
                if( inputPost !== "" && !regex.test( inputPost )){

                    const inputCurrentTime = Window.getCurrentTime( this.window.handleMediaCurrentTime );
                    this.window.childTo("delegatePost", {inputPost, inputCurrentTime} );
                    this.window.childTo("onChangeInputPost");
                    textarea.clear();
                    textarea.focus();

                }else{
                    this.window.updateDisplayMode("clickHandleIcon");
                }        
                break;
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

    /*************************/
    /* ANIMATION             */
    /*************************/

    getActiveStyles( called ){
        switch( this.window.extMode ){
        case Ext.MODE_MODAL:
            return {
                bottom: "15px",
                boxShadow: "rgb(200, 200, 200) 0px 0px 10px 0px",
                transform: `translate3d(0px, 0px, 0px) scale( 0.95 )`,
                background: Styles.BASE_ACTIVE_BG_COLOR,
                border: Styles.BASE_UNACTIVE_BORDER
            }
        case Ext.MODE_BOTTOM:
            return {
                bottom: "0px",
                boxShadow: "rgb(200, 200, 200) 0px 0px 10px 0px",
                transform: `translate3d(0px, 0px, 0px) scale( 0.95 )`,
                background: Styles.BASE_ACTIVE_BG_COLOR,
                border: Styles.BASE_UNACTIVE_BORDER
            }
        }
    }

    getOpenStyles( called ){
        switch( this.window.extMode ){
        case Ext.MODE_MODAL:
            return {
                boxShadow: "rgb(200, 200, 200) 0px 0px 0px 0px",
                transform: `translate3d(0px, -25px, 0px) scale( 1 )`,
                background: Styles.BASE_ACTIVE_BG_COLOR,
                border: Styles.BASE_ACTIVE_BORDER
            }
        case Ext.MODE_BOTTOM:
            return {
                boxShadow: "rgb(200, 200, 200) 0px 0px 0px 0px",
                transform: `translate3d(0px, 0px, 0px) scale( 0.95 )`,
                background: Styles.BASE_ACTIVE_BG_COLOR,
                border: Styles.BASE_ACTIVE_BORDER
            }
        }
    }

    transitionEnd(){
        
    }
}

class NotifStatus extends Elements{
    static get id(){return `${Ext.APP_NAME}${this.name}`}
    constructor( _window, params ){
        super( _window );

        const id = NotifStatus.id;
        const notifStatus = document.createElement("div");
        const width = "24px";
        const height = "24px";
        const openStyles = this.getOpenStyles();

        this.getActiveStyles = this.getActiveStyles.bind( this );
        this.getOpenStyles = this.getOpenStyles.bind( this );
        this.addCnt = this.addCnt.bind( this );
        this.resetCnt = this.resetCnt.bind( this );

        notifStatus.id = id;
        notifStatus.innerText = 0;
        notifStatus.style = "" + 
            `position: fixed !important;` +
            `bottom: 20px !important;` +
            `right: 10px !important;` +
            `display: flex !important;` + 
            `align-items: center !important;` + 
            `justify-content: center !important;` + 
            `cursor: pointer !important;` + 
            `z-index: ${Styles.zIndex} !important;` +
            `width: 24px !important;` +
            `min-width: ${width} !important;` +
            `max-width: ${width} !important;` +
            `height: ${height} !important;` + 
            `min-height: ${height} !important;` + 
            `max-height: ${height} !important;` + 
            `padding: 0px !important;` +
            `opacity: 1 !important;` +
            `font-size: 8px !important;` +
            `color: rgb(255,255,255) !important;` +
            `background: rgba( 79, 174, 159, 0.6 ) !important;` +
            `border-radius: 100px !important;` +
            `transition: ${Styles.BASE_TRANSITION}ms !important;` +
            `transform: ${openStyles.transform} !important;`;
        document.body.appendChild( notifStatus );
    }

    get(){
        return document.querySelector(`#${NotifStatus.id}`);
    }

    addCnt( cnt ){
        const statusNotif = this.get();
        const baseCnt = Number( statusNotif.innerText );
        const updatedCnt = baseCnt + Number( cnt );

        if( updatedCnt > 0 ){
            statusNotif.innerHTML = updatedCnt;
            const activeStyles = this.getActiveStyles("addCnt");
            statusNotif.style.transform = activeStyles.transform;
        }else{
            this.reset();
        }
    }

    resetCnt(){
        const statusNotif = this.get();
        const openStyles = this.getOpenStyles();
        statusNotif.innerHTML = 0;
        statusNotif.style.transform = openStyles.transform;
    }

    getActiveStyles( called ){
        const statusNotif = this.get();
        const baseCnt = Number( statusNotif.innerText );
        if( baseCnt > 0 ){
            return {
                transform: "scale(1.0)"
            }
        }else{
            return {
                transform: "scale(0.0)"
            }
        }
    }

    getOpenStyles( called ){
        return {
            transform: "scale(0.0)"

        }
    }
}

class Notif extends Elements{

    static get id(){return `${Ext.APP_NAME}${this.name}`}
    constructor( _window, params ){
        super( _window );

        this.getWidth = this.getWidth.bind( this );
        this.getHeight = this.getHeight.bind( this );
        this.getBottom = this.getBottom.bind( this );
        this.getRight = this.getRight.bind( this );
        this.getTranslateY = this.getTranslateY.bind( this );
        this.getBorderRadius = this.getBorderRadius.bind( this );

        const notif = document.createElement("div");
        const id = Notif.id + params.id;
        const width = this.getWidth(true);
        const height = this.getHeight(true);
        const padding = this.getPadding(true);
        const bottom = this.getBottom(true);
        const right = this.getRight(true); 
        const translateY = this.getTranslateY(true);
        const borderRadius = this.getBorderRadius();
        
        notif.setAttribute("id", id);
        notif.setAttribute("name", "notif");
        notif.setAttribute("style", 
            `position: fixed !important;` +
            `bottom: ${bottom} !important;` +
            `right: ${right} !important;` +
            `display: flex !important;` + 
            `align-items: center !important;` + 
            `cursor: pointer !important;` + 
            `justify-content: flex-start;` + 
            `z-index: ${Styles.zIndex - 2} !important;` +
            `width: ${width} !important;` +
            `min-width: ${width} !important;` +
            `max-width: ${width} !important;` +
            `height: ${height} !important;` + 
            `min-height: ${height} !important;` + 
            `max-height: ${height} !important;` + 
            `padding: 0px 20px 0px 10px!important;` +
            `opacity: 0 !important;` +
            `background: ${Styles.BASE_UNACTIVE_BG_COLOR}` +
            `border: ${Styles.BASE_UNACTIVE_BORDER}` +
            `border-radius: ${borderRadius} !important;` +
            `box-shadow: ${Styles.BASE_SHADOW}` +
            `color: rgba( 120, 120, 120, 0.9) !important;` +
            `transition: ${Styles.BASE_TRANSITION}ms !important;` +
            `transform: translate3d( 0px, 0px, 0px ) !important;` 
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

        notifPost.innerText = this.convertEmojiStamp( params.post );
        notif.appendChild( notifIcon );
        notif.appendChild( notifPost );

        notif.addEventListener( "click", () => {
            switch( this.window.extMode ){
            case Ext.MODE_MODAL:
                switch( Ext.DISPLAY_MODE[ this.window.displayModeKey ] ){
                case Ext.DISPLAY_MODE_ACTIVE:
                    this.window.updateDisplayMode("clickNotif");
                    break;
                case Ext.DISPLAY_MODE_OPEN:
                    break;        
                }
            case Ext.MODE_BOTTOM:
            case Ext.MODE_INCLUDE:
                break;
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

        const debugRate = 1;
        setTimeout( () => {
            notif.style.opacity = 1;
            notif.style.transform = `translate3d(0px, ${translateY}, 0px) scale(1.0)`;
            setTimeout( () => {

                notif.style.opacity = 0;
                notif.style.transform = `translate3d(0px, 0px, 0px) scale(1.0)`;
                setTimeout( () => {
                    const removeNotif = document.getElementById(id);
                    document.body.removeChild(removeNotif);
                }, 1000 * debugRate )

            }, 2100 * debugRate );
        }, 50 );
    }

    convertEmojiStamp( value ){
        if( value.indexOf( '<div class="talknStamps"' ) === 0 ){
            const v1 = value.split(';">');
            if( v1 && v1[1] ){
                const v2 = v1[1].split("</div>");
                if( v2 && v2[0] ){
                    return v2[0] + " (STAMP)";
                }
            }
        }
        return value;
    }

    getWidth(addUnit = false){
        let width = 0
        switch( this.window.extMode ){
        case Ext.MODE_MODAL:
            switch( Ext.DISPLAY_MODE[ this.window.displayModeKey ] ){
            case Ext.DISPLAY_MODE_ACTIVE:
                width = window.innerWidth < Styles.FULL_WIDTH_THRESHOLD ? "calc( 100% - 130px )" : "180px";
                break;
            case Ext.DISPLAY_MODE_OPEN:
                break;        
            }
        case Ext.MODE_BOTTOM:
        case Ext.MODE_INCLUDE:
            break;
        }
        return addUnit ? width : width.replace( "px", "" ).replace("%", "");
    }

    getHeight(addUnit = false){
        let height = "40px";
        return addUnit ? height : height.replace( "px", "" ).replace("%", "");
    }

    getPadding(addUnit = false){
        let padding = "0px";
        switch( this.window.extMode ){
        case Ext.MODE_MODAL:
            switch( Ext.DISPLAY_MODE[ this.window.displayModeKey ] ){
            case Ext.DISPLAY_MODE_ACTIVE:
                padding =  "10px 20px 10px 10px";
                break;
            case Ext.DISPLAY_MODE_OPEN:
                break;        
            }
        case Ext.MODE_BOTTOM:
        case Ext.MODE_INCLUDE:
            break;
        }
        return addUnit ? padding : padding.replace( "px", "" ).replace("%", "");
    }

    getBottom(addUnit = false){
        let bottom = "0px";
        switch( this.window.extMode ){
        case Ext.MODE_MODAL:
            switch( Ext.DISPLAY_MODE[ this.window.displayModeKey ] ){
            case Ext.DISPLAY_MODE_ACTIVE:
                bottom =  "0px";
                break;
            case Ext.DISPLAY_MODE_OPEN:
                break;        
            }
        case Ext.MODE_BOTTOM:
        case Ext.MODE_INCLUDE:
            break;
        }
        return addUnit ? bottom : bottom.replace( "px", "" ).replace("%", "");
    }

    getRight(addUnit = false){
        let right = "75px";
        switch( this.window.extMode ){
        case Ext.MODE_MODAL:
            switch( Ext.DISPLAY_MODE[ this.window.displayModeKey ] ){
            case Ext.DISPLAY_MODE_ACTIVE:
                right = "75px";
                break;
            case Ext.DISPLAY_MODE_OPEN:
                break;        
            }
        case Ext.MODE_BOTTOM:
        case Ext.MODE_INCLUDE:
            break;
        }
        return addUnit ? right : right.replace( "px", "" ).replace("%", "");
    }


    getTranslateY(addUnit = false){
        let transformY = `-21px`;
        switch( this.window.extMode ){
        case Ext.MODE_MODAL:
            switch( Ext.DISPLAY_MODE[ this.window.displayModeKey ] ){
            case Ext.DISPLAY_MODE_ACTIVE:
                    transformY = "-21px";
                break;
            case Ext.DISPLAY_MODE_OPEN:
                break;        
            }
        case Ext.MODE_BOTTOM:
        case Ext.MODE_INCLUDE:
            break;
        }
        return addUnit ? transformY : transformY.replace( "px", "" ).replace("%", "");
    }

    getBorderRadius(){
        let borderRadius = `4px 4px 4px 4px`;
        return borderRadius;
    }
}

class Textarea extends Elements {
    static get id(){return `${Ext.APP_NAME}${this.name}`}
    constructor(_window){
        super(_window);
        this.get = this.get.bind( this );   
        this.getValue = this.getValue.bind( this );   
        this.setValue = this.setValue.bind( this );   
        this.clear = this.clear.bind( this );   
        this.focuse = this.focus.bind( this );   
        this.keypress = this.keypress.bind( this );
        this.getDisplay = this.getDisplay.bind( this );
        this.transitionEnd = this.transitionEnd.bind( this );
        this.transitionEnd = this.transitionEnd.bind( this );
        this.create();
    }

    create( display = "none" ){
        const textarea = document.createElement("textarea");
        textarea.id = Textarea.id;
        textarea.style = this.getStyle( display );
        textarea.placeholder = "Comment to web";
        textarea.addEventListener("keypress", this.keypress );
        document.body.appendChild( textarea );
    }

    get(){
        return document.querySelector(`#${Textarea.id}`);
    }

    getStyle( display ){
        const width = this.getWidth(true);
        const height = this.getHeight(true);
        const right = this.getRight(true);
        const bottom = this.getBottom(true);
        return "" + 
            `position: fixed !important;` +
            `bottom: ${bottom} !important;` +
            `right: ${right} !important;` +
            `display: ${display} !important;` +
            `box-sizing: border-box !important;` +
            `overflow: hidden !important;` +
            `width: ${width} !important;` +
            `min-width: ${width} !important;` +
            `max-width: ${width} !important;` +
            `height: ${height} !important;` + 
            `min-height: ${height} !important;` +
            `max-height: ${height} !important;` +
            `padding: 6px !important;` +
            `margin: 0 !important;` +
            `font-style: inherit !important;` +
            `font-variant: inherit !important;` + 
            `font-weight: inherit !important;` +
            `font-stretch: inherit !important;` +
            `font-size: 12px !important;` +
            `line-height: 0.9 !important;` +
            `font-family: "Myriad Set Pro", "Lucida Grande", "Helvetica Neue", Helvetica, Arial, Verdana, sans-serif !important;` +
            `list-style: none !important;` +
            `user-select: none !important;` +
            `text-decoration: none !important;` +
            `vertical-align: middle !important;` +
            `border-collapse: collapse !important;` +
            `border-spacing: 0px !important;` +
            `border: 1px solid rgb(220, 220, 220) !important;` +
            `border-radius: 3px !important;` +
            `z-index: ${Styles.zIndex - 1} !important;` +
            `background: rgb(255,255,255) !important;` +
            `outline: none !important;` +
            `resize: none !important;` +
            `-webkit-appearance: none !important;` +
            `letter-spacing: 1.5px !important;` +
            `white-space: normal !important;` +
            `quotes: none !important;` +
            `content: none !important;` +
            `cursor: default !important;` + 
            `text-align: left !important;` +
            `text-indent: 3% !important;` +
            `color: rgb(160, 160, 160) !important;` +
            `transform: translate3d(0px, 0px, 0px) !important;`
    }

    getValue(){
        return this.get().value;
    }

    setValue( addValue ){
        return this.get().value = this.getText().value + addValue;
    }

    clear(){
        this.get().value = "";
        document.body.removeChild(this.get());
        this.create("block");
    }

    focus(){
        this.get().focus();
    }

    keypress( e ){
        if ( e.keyCode === 13 ) {
            if( e.shiftKey ){
                this.setValue( '\n' );
            }else{
                const { textarea } = this.window.ins;
                const regex = /^\s*$/;
                const inputPost = textarea.getValue();

                if( inputPost !== "" && !regex.test( inputPost )){

                    const inputCurrentTime = Window.getCurrentTime( this.window.handleMediaCurrentTime );
                    this.window.childTo("delegatePost", {inputPost, inputCurrentTime} );
                    this.window.childTo("onChangeInputPost");
                    textarea.clear();
                    const textareaElm = textarea.get();
                    textareaElm.focus();
                    
                    e.preventDefault();
                    return false;
                }
            }
        }
    }

    /*************************/
    /* ANIMATION             */
    /*************************/

    getDisplay(){
        switch( this.window.extMode ){
        case Ext.MODE_MODAL:
            switch( Ext.DISPLAY_MODE[ this.window.displayModeKey ] ){
            case Ext.DISPLAY_MODE_ACTIVE:
                return "none";
            case Ext.DISPLAY_MODE_OPEN:
                return "none";
            }
        case Ext.MODE_BOTTOM:
            return "block";
        }
        return "none";
    }

    getRight(addUnit = false){
        let right = 0;
        switch( this.window.extMode ){
        case Ext.MODE_BOTTOM:
            right = window.innerWidth < Styles.FULL_WIDTH_THRESHOLD ? "21%" : "73px";
            break;
        case Ext.MODE_MODAL:
            right = window.innerWidth < Styles.FULL_WIDTH_THRESHOLD ? "21%" : "67px";
            break;
        }
        return addUnit ? right : right.replace("px", "").replace("%", "") ;
    }

    getWidth(addUnit = false){
        let width = window.innerWidth < Styles.FULL_WIDTH_THRESHOLD ? "57.6%" : "166px";
        return addUnit ? width : width.replace("px", "").replace("%", "") ;
    }

    getHeight(addUnit = false){
        let height = window.innerWidth < Styles.FULL_WIDTH_THRESHOLD ? "25px" : "25px";
        return addUnit ? height : height.replace("px", "").replace("%", "") ;
    }

    getBottom(addUnit = false){
        let bottom = "0px";
        switch( this.window.extMode ){
        case Ext.MODE_BOTTOM:
            bottom = "9px";
            break;
        case Ext.MODE_MODAL:
            bottom = "55px"
            break;
        }
        return addUnit ? bottom : bottom.replace("px", "").replace("%", "") ;
    }

    transitionEnd(e){
        switch( this.window.extMode ){
        case Ext.MODE_BOTTOM:
            break;
        case Ext.MODE_MODAL:
            switch( e.target.id ){
            case Iframe.id :
            case HandleIcon.id :
                const { textarea } = this.window.ins; 
                const textareaElm = textarea.get();
                const width = textarea.getWidth(true);

                switch( Ext.DISPLAY_MODE[ this.window.displayModeKey ] ){
                case Ext.DISPLAY_MODE_ACTIVE:
                    textareaElm.style.width = width;
                    textareaElm.style.minWidth = width;
                    textareaElm.style.maxWidth = width;
                    textareaElm.style.display = "none";
                    break;
                case Ext.DISPLAY_MODE_OPEN:
                    textareaElm.style.width = width;
                    textareaElm.style.minWidth = width;
                    textareaElm.style.maxWidth = width;
                    textareaElm.style.display = "block";
                    break;        
                }
                break;
            }
        }
    }

    getActiveStyles( called ){
        const display = this.getDisplay();
        const width = this.getWidth(true);
        const height = this.getHeight(true);
        const right = this.getRight(true);
        const bottom = this.getBottom(true);
        return {
            display,
            width,
            height,
            right,
            bottom
        }
    }

    getOpenStyles( called ){
        const display = this.getDisplay();
        const width = this.getWidth(true);
        const height = this.getHeight(true);
        const right = this.getRight(true);
        const bottom = this.getBottom(true);
        return {
            display,
            width,
            height,
            right,
            bottom
        }
    }
}

const ext = new Window();
