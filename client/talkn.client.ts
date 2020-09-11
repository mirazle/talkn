import Window from "client/Window";
console.log(window.opener);
window.talknWindow = new Window();
window.talknWindow.boot();
window.talknWindow.dom.renderTalkn();
