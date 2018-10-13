
chrome.runtime.sendMessage({request: "open"}, (response) => {
    const PROTOCOL = "https";
    const BASE_HOST = "localhost:8080";

    // TODO Extensionはサブドメインでアクセスする!!
    const BASE_HOSTNAME = `${PROTOCOL}://${BASE_HOST}`; 
    const iframe = document.createElement("iframe");
    const connection = location.href.replace("http:/", "").replace("https:/", "");
    
    iframe.setAttribute("name", "extension");
    iframe.setAttribute("style", "z-index: 2147483647; position: fixed; bottom: 0px; right: 0px;width: 320px; height: 45px");
    iframe.setAttribute("src", BASE_HOSTNAME + connection );
    iframe.setAttribute("frameBorder", 0 );

    document.body.appendChild(iframe);
});