chrome.runtime.onMessage.addListener( (request, sender, callback) => {
    const options = localStorage.getItem("talknExtensionOptions");
    console.log( options );
    callback(options);
});