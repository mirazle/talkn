const PROTOCOL = "https";
const HOST = "localhost:8080";


chrome.runtime.onMessage.addListener()
class Background {
    constructor() {
		this.appTabId    = 0;
		this.appWindowId = 0;
		this.catch = this.catch.bind(this);
		chrome.runtime.onMessage.addListener(this.catch);
	}

	catch(message, sender, callback){
		const response = this[ message.request ](message, sender);
		callback(response);
		return true;
	}

	open(message, sender){
		return {response: true};
	}
}

// noinspection JSUnusedGlobalSymbols
const b = new Background();
