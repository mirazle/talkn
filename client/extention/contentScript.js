class ClientScript {

    static get APP_NAME(){return "talkn"}
    static get MODE(){return "START"}
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
    static get iframeOpenHeight(){return '450px'};

    constructor(){
        this.connection = location.href.replace("http:/", "").replace("https:/", "");

        const noBootFlg = ClientScript.EXCLUSION_HOSTS.some( host => this.connection.indexOf(host) >= 0);
        
        if(!noBootFlg){
            this.extensionBoot = this.extensionBoot.bind(this);
            this.catchMessage = this.catchMessage.bind(this);
            this.toggleIframe = this.toggleIframe.bind(this);
            this.location = this.location.bind(this);
            this.transitionend = this.transitionend.bind(this);
            this.loadTalkn = this.loadTalkn.bind(this);
            
            // setupWindow
            this.setupWindow();
            this.iframe  = document.createElement("iframe");
            this.loadIframe = this.loadIframe.bind(this);
            this.talknUrl = ClientScript.BASE_HOSTNAME + this.connection;
            this.iframe.setAttribute("id", `${ClientScript.APP_NAME}Extension`);
            this.iframe.setAttribute("name", "extension");
            this.iframe.setAttribute("style",
                "z-index: 2147483647;" +
                "display: none;" +
                "position: fixed; " +
                "bottom: 0px;" + 
                "right: 0px;" + 
                "width: 320px;" + 
                `height: ${ClientScript.iframeOpenHeight};` + 
                "margin: 0;" + 
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

    transitionend(e){
        this.postMessage("onTransition");
    }

    loadIframe(e){
        this.iframe = e.path[1].querySelector(`iframe#${ClientScript.APP_NAME}Extension`);
        this.postMessage("bootExtension");
    }

    loadTalkn(e){
    }
        
    extensionBoot(params){
        const iframe = document.querySelector(`iframe#${ClientScript.APP_NAME}Extension`);
        const {isOpenMain} = params;
        if( isOpenMain ){
            iframe.style.height = ClientScript.iframeOpenHeight;
            iframe.style.display = "block";
            this.postMessage("onTransition");
        }else{
            iframe.style.height = ClientScript.iframeCloseHeight;
            iframe.style.display = "block";
            this.postMessage("offTransition");
        }
    }

    catchMessage(e){
        if( e.data.type === ClientScript.APP_NAME ){
            if(this[ e.data.method ] && typeof this[ e.data.method ] === "function"){
                this[ e.data.method ]( e.data.params );
            }
        }
    }

    postMessage(method, params = {}){
        this.iframe.contentWindow.postMessage({
            type: ClientScript.APP_NAME,
            url: location.href,
            href: location.href,
            method: method,
            params: params
        }, this.talknUrl);
    }

    toggleIframe(params){
        this.postMessage("offTransition");
        const iframe = document.querySelector(`iframe#${ClientScript.APP_NAME}Extension`);
        if( iframe.style.height === ClientScript.iframeCloseHeight ){
            iframe.style.transition = "600ms";
            iframe.style.height = ClientScript.iframeOpenHeight;

        }else{
            iframe.style.transition = "600ms";
            iframe.style.height = ClientScript.iframeCloseHeight;
        }
    }

    location(params){
        const {protocol, connection} = params;
        location.href = `${protocol}/${connection}`;
    }
}

const c = new ClientScript();
