
class ClientScript {

    static get APP_NAME(){return "talkn"}
    static get PROTOCOL(){return "https"}
    static get BASE_HOST(){return "localhost:8080"}
    static get BASE_HOSTNAME(){return `${ClientScript.PROTOCOL}://${ClientScript.BASE_HOST}`};
    static get iframeCloseHeight(){return '45px'};
    static get iframeOpenHeight(){return '450px'};

    constructor(){

        this.catchMessage = this.catchMessage.bind(this);
        this.toggleIframe = this.toggleIframe.bind(this);

        // setupWindow
        this.setupWindow();
        this.iframe  = document.createElement("iframe");
        this.load = this.load.bind(this);
        this.connection = location.href.replace("http:/", "").replace("https:/", "");
        this.talknUrl = ClientScript.BASE_HOSTNAME + this.connection;

        this.iframe.setAttribute("id", `${ClientScript.APP_NAME}Extension`);
        this.iframe.setAttribute("name", "extension");
        this.iframe.setAttribute("style", "z-index: 2147483647; position: fixed; bottom: 0px; right: 0px;width: 320px; height: 45px;transition: 0ms; transform: translate3d(0px, 0px, 0px);");
        this.iframe.setAttribute("src", this.talknUrl );
        this.iframe.setAttribute("frameBorder", 0 );
        this.iframe.addEventListener( "load", this.load );
        document.body.appendChild(this.iframe);
    }

    setupWindow(){
        window.addEventListener('message', this.catchMessage, false);
    }

    load(e){
        this.iframe = e.path[1].querySelector(`iframe#${ClientScript.APP_NAME}Extension`);
        this.postMessage("bootExtension");
    }

    catchMessage(e){
        if( e.data.type === ClientScript.APP_NAME ){
            console.log(e.data);
            console.log(this);
            if(this[ e.data.method ] && typeof this[ e.data.method ] === "function"){
                this[ e.data.method ]( e );
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

    toggleIframe(e){
        const iframe = document.querySelector(`iframe#${ClientScript.APP_NAME}Extension`);
        if( iframe.style.height === ClientScript.iframeCloseHeight ){
            iframe.style.transition = "0ms";
            iframe.style.height = ClientScript.iframeOpenHeight;
            //this.postMessage("toggleDispMain");
        }else{
            iframe.style.transition = "600ms";
            iframe.style.height = ClientScript.iframeCloseHeight;
            //this.postMessage("toggleDispMain");
        }
    }
}

const c = new ClientScript();
