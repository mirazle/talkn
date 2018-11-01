
class ClientScript {

    static get APP_NAME(){return "talkn"}
    static get PROTOCOL(){return "https"}
    static get BASE_HOST(){return "localhost"}
    static get BASE_HOSTNAME(){return `${ClientScript.PROTOCOL}://${ClientScript.BASE_HOST}`};
    static get iframeCloseHeight(){return '45px'};
    static get iframeOpenHeight(){return '450px'};

    constructor(){

        // setupWindow
        this.setupWindow();
        const iframe = document.createElement("iframe");
        this.load = this.load.bind(this);
        this.connection = location.href.replace("http:/", "").replace("https:/", "");
        this.talknUrl = ClientScript.BASE_HOSTNAME + this.connection;

        iframe.setAttribute("id", `${ClientScript.APP_NAME}Extension`);
        iframe.setAttribute("name", "extension");
        iframe.setAttribute("style", "z-index: 2147483647; position: fixed; bottom: 0px; right: 0px;width: 320px; height: 45px;transition: 600ms; transform: translate3d(0px, 0px, 0px);");
        iframe.setAttribute("src", this.talknUrl );
        iframe.setAttribute("frameBorder", 0 );
        iframe.addEventListener( "load", this.load );
        document.body.appendChild(iframe);
    }

    setupWindow(){
        window.addEventListener('message', this.catchMessage, false);
    }

    load(e){
        const iframe = e.path[1].querySelector(`iframe#${ClientScript.APP_NAME}Extension`);
        iframe.contentWindow.postMessage({
            type: ClientScript.APP_NAME,
            url: location.href,
            href: location.href
        }, this.talknUrl);
    }

    catchMessage(e){
        if( e.data.type === ClientScript.APP_NAME ){
            if(ClientScript[ e.data.method ]){
                ClientScript[ e.data.method ]( e );
            }
        }
    }

    static connection(e){
    }

    static onClickFooterIcon(e){
        const iframe = document.querySelector(`iframe#${ClientScript.APP_NAME}Extension`);
        if( iframe.style.height === ClientScript.iframeCloseHeight ){
            iframe.style.height = ClientScript.iframeOpenHeight;
        }else{
            iframe.style.height = ClientScript.iframeCloseHeight;
        }
    }
}

const c = new ClientScript();
