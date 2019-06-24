const setting = localStorage.getItem("talknExtensionSetting");
chrome.runtime.onMessage.addListener( (request, sender, callback) => {
    callback(setting);
});