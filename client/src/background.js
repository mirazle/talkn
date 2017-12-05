
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
console.log( '### BACKGROUND ####### ' + request.method + " " + request.key );

	switch (request.method) {
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
