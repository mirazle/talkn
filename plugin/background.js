const PROTOCOL = "https";
const HOST = "localhost:8080";

class Background {
    constructor() {
console.log("CONSTRUCTER");
		this.appTabId    = 0;
		this.appWindowId = 0;
		
		this.open = this.open.bind(this);
		chrome.runtime.onMessage.addListener(this.open);
	}

	open(message, sender, sendResponse){

		if( sender.url.indexOf( HOST ) === -1 ){

			const option = sender.url.replace(/^(https:\/|http:\/)/, '');
			if(this.appWindowId) {
				console.log("UPDATE " + this.appWindowId);
				chrome.windows.update(this.appWindowId, {focused: true});
			} else {

				chrome.windows.create({
					type     : 'popup',
					url      : PROTOCOL + "://" + HOST + option,
					width    : 320,
					height   : 420,
					left     : screen.width - 320,
				}, window => {
					this.appWindowId = window.id;
					this.appTabId    = window.tabs[0].id;
					console.log( window.tabs[0] );
				});
			}
		}
	}
}

// noinspection JSUnusedGlobalSymbols
const b = new Background();
