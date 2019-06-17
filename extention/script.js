const TALKN_SCRIPT_ENV = "START";

class Script {
    static get BASE_PROD_HOST(){return "https://ext.talkn.io"}
    static get BASE_DEV_HOST(){return "https://ext.localhost"}
    static get BASE_DEV_PORT(){return 8080}
    static get BASE_HOSTNAME(){
        if(TALKN_SCRIPT_ENV === "PROD"){
            return `${Script.BASE_PROD_HOST}`;
        }else if(TALKN_SCRIPT_ENV === "START"){
            return `${Script.BASE_DEV_HOST}`;
        }else if(TALKN_SCRIPT_ENV === "DEV"){
            return `${Script.BASE_DEV_HOST}:${Script.BASE_DEV_PORT}`;
        }
    }

    constructor(){
        const script = document.createElement("script");
        script.async = true;
        script.type = "text/javascript";
        script.src = Script.BASE_HOSTNAME;
        document.querySelector("head").appendChild( script );
    }
}

const script = new Script();
