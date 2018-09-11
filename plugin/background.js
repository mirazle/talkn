
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
	switch (message.request) {
	case 'open':
		var host = 'localhost:8080';

		if( sender.url.indexOf( host ) === -1 ){
		  var option = sender.url.replace(/^(https:\/|http:\/)/, '');

			console.log("@@@");
			console.log( window.postMessage );
		  window.open('https://' + host + option, 'talkn', 'width=700, height=450, resizable=no, toolbar=no, status=no, scrollbars=no ,menubar=no, location=no, directories=no');

		}
		break;
	case 'getLength':
		sendResponse({data: localStorage.length});
		break;
	case 'getKeyName':
		sendResponse({data: localStorage.key(request.number)});
		break;
	case 'getItem':
		let result = JSON.parse(localStorage.getItem(request.key));
		result = ( result === null )? { response: null, requestKey: request.key } : { response: result, requestKey: request.key } ;
		chrome.tabs.sendMessage( sender.tab.id, result );
		break;
	case 'setItem':
		localStorage.setItem( request.key, request.value );
		//sendResponse({data: localStorage.setItem(request.key, request.value)});
		break;
	case 'removeItem':
		sendResponse({data: localStorage.removeItem[request.key]});
		break;
	case 'clearAll':
		sendResponse({data: localStorage.clear()});
		break;
	default:
		break;
	}
	return true;
});
