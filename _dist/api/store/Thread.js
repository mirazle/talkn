"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const conf_1 = __importDefault(require("common/conf"));
const Sequence_1 = __importDefault(require("api/Sequence"));
const Schema_1 = __importDefault(require("api/store/Schema"));
const App_1 = __importDefault(require("api/store/App"));
class Thread extends Schema_1.default {
    constructor(params = {}, bootOption) {
        super();
        this.chs = ["/"];
        this.protocol = Sequence_1.default.TALKN_PROTOCOL;
        this.charset = "UTF-8";
        this.host = "";
        this.favicon = Thread.getDefaultFavicon();
        this.findType = Thread.findTypeAll;
        this.title = Thread.getDefaultTitle();
        this.metas = [];
        this.emotions = {};
        this.serverMetas = {};
        this.clientMetas = {};
        this.links = [];
        this.h1s = [];
        this.audios = [];
        this.videos = [];
        this.layer = Thread.getLayer();
        this.mediaIndex = [];
        this.postCnt = 0;
        this.multiPostCnt = 0;
        this.isSelfCh = false;
        this.createTime = "";
        this.updateTime = "";
        const thread = Thread.isWindowObj(params) ? Thread.constructorFromWindow(params, bootOption) : params;
        return this.create(thread);
    }
    static get findTypeAll() {
        return "All";
    }
    static get findTypeHtml() {
        return "Html";
    }
    static get findTypeMusic() {
        return "Music";
    }
    static get findTypeVideo() {
        return "Video";
    }
    static get findTypeOther() {
        return "Other";
    }
    static get findTypes() {
        return {
            [Thread.findTypeHtml]: ["text/html"],
            [Thread.findTypeMusic]: ["audio", "audio/mpeg", "audio/mp4", "audio/x-wav", "audio/midi", "application/x-smaf"],
            [Thread.findTypeVideo]: [
                "video",
                "video/mpeg",
                "video/mp4",
                "video/x-ms-wmv",
                "application/x-shockwave-flash",
                "video/3gpp2",
            ],
        };
    }
    static getDefaultTitle() {
        return "talkn";
    }
    static getDefaultFavicon() {
        return "user.png";
    }
    static isWindowObj(params) {
        return params.alert ? true : false;
    }
    static constructorFromWindow(params, bootOption) {
        const bootCh = bootOption.ch ? bootOption.ch : false;
        const ch = Thread.getCh(bootOption, bootCh);
        let thread = {};
        let href = "";
        thread.ch = ch;
        thread.chs = ["/"];
        thread.hasSlash = bootOption.hasslash ? Schema_1.default.getBool(bootOption.hasslash) : false;
        thread.protocol = "talkn:";
        thread.contentType = "";
        thread.charset = "UTF-8";
        thread.host = "";
        thread.favicon = Thread.getDefaultFavicon();
        thread.findType = Thread.findTypeAll;
        if (bootCh) {
            thread.protocol = Thread.getProtocol(bootCh);
            thread.host = Thread.getHost(bootCh);
            thread.chs = bootCh.chs && bootCh.chs.length > 0 ? bootCh.chs : Thread.getChs(ch);
        }
        else {
            thread.protocol = location.protocol ? location.protocol : "????:";
            thread.chs = params.chs && params.chs.length > 0 ? params.chs : Thread.getChs(ch);
            thread.contentType = document.contentType ? document.contentType : "";
            thread.charset = document.charset ? document.charset : "";
            thread.host = location.host ? location.host : "";
            thread.favicon = Thread.getFaviconFromWindow(window);
        }
        thread.title = Thread.getDefaultTitle();
        thread.metas = [];
        thread.serverMetas = {};
        thread.clientMetas = {};
        thread.emotions = {};
        thread.links = [];
        thread.h1s = [];
        thread.audios = [];
        thread.videos = [];
        thread.layer = Thread.getLayer(thread.ch);
        thread.mediaIndex = [];
        thread.postCnt = 0;
        thread.multiPostCnt = 0;
        thread.isSelfCh = Thread.getIsSelfCh(href, thread.ch);
        thread.createTime = "";
        thread.updateTime = "";
        return thread;
    }
    static getCh(bootOption, bootCh) {
        return bootOption && bootOption.ch && bootOption.ch !== "" ? bootOption.ch : "/";
    }
    static getChTop(ch) {
        if (ch !== "") {
            return "/" + ch.split("/")[1];
        }
        else {
            return "";
        }
    }
    static getChs(_ch) {
        let chs = ["/"];
        if (_ch !== "") {
            const ch = _ch.slice(-1) === "/" ? _ch : _ch + "/";
            if (ch !== "/") {
                const chArr = ch.split("/");
                const chLength = chArr.length;
                let newCh = "";
                let noSlashCh = "";
                for (var i = 1; i < chLength; i++) {
                    if (chArr[i] !== "") {
                        newCh += chArr[i];
                        newCh = newCh.slice(-1) === "/" ? newCh : newCh + "/";
                        newCh = newCh.slice(0, 1) === "/" ? newCh : "/" + newCh;
                        chs.push(newCh);
                    }
                }
            }
        }
        return chs;
    }
    static getHost(ch) {
        if (ch.indexOf(".") >= 0) {
            ch = ch.replace("https://", "").replace("http://", "");
            return ch.replace(/^\//, "").replace(/\/.*$/, "");
        }
        else {
            return conf_1.default.domain;
        }
    }
    static getProtocol(href) {
        if (href.indexOf("http:") >= 0)
            return "http:";
        if (href.indexOf("https:") >= 0)
            return "https:";
        if (location && location.protocol)
            return location.protocol;
        return "????:";
    }
    static getIsSelfCh(href, ch) {
        const replacedHref = href
            .replace("http:/", "")
            .replace("https:/", "")
            .replace(/\u002f$/, "");
        return replacedHref === ch;
    }
    static getLayer(ch = "/") {
        return ch.split("/").length - 1;
    }
    static getMediaSrc(thread) {
        return App_1.default.getMediaSrc(thread.protocol, thread.ch);
    }
    static getMediaTagType(thread) {
        const src = Thread.getMediaSrc(thread);
        return App_1.default.getMediaType(src, null);
    }
    static getFaviconFromWindow(window) {
        if (window && window.document) {
            const u = window.document.evaluate("//link[contains(@rel,'icon')or(contains(@rel,'ICON'))][1]/@href", window.document, null, 2, null).stringValue;
            const h = "http://";
            const hs = "https://";
            const l = location.host;
            if (u.indexOf(h) || u.indexOf(hs)) {
                const url = h + l + (u || "/favicon.ico");
                const strCnt = url.split("//").length - 1;
                if (strCnt === 1) {
                    return url;
                }
                else {
                    return u;
                }
            }
            else {
                return u;
            }
        }
        else {
            return "";
        }
    }
    static getStatus(thread, app, isExist, setting = {}) {
        let status = {
            dispType: "",
            isCreate: false,
            isRequireUpsert: false,
            isMultistream: false,
            isMediaCh: false,
            isToggleMultistream: false,
            getMore: false,
        };
        status.isCreate = Thread.getStatusCreate(isExist);
        status.isRequireUpsert = Thread.getStatusIsRequireUpsert(thread, setting, status.isCreate);
        status.isMultistream = Thread.getStatusIsMultistream(app);
        status.isToggleMultistream = Thread.getStatusIsToggleMultistream(app);
        status.isMediaCh = Thread.getStatusIsMediaCh(thread.ch);
        return status;
    }
    static getStatusCreate(isExist) {
        return !isExist;
    }
    static getStatusIsRequireUpsert(thread, setting, isCreate = false) {
        if (thread.updateTime) {
            const threadUpdateTime = thread.updateTime.getTime ? thread.updateTime.getTime() : thread.updateTime;
            const now = new Date();
            const nowYear = now.getFullYear();
            const nowMonth = now.getMonth();
            const nowDay = now.getDate();
            const nowHour = now.getHours();
            const nowMinutes = now.getMinutes();
            const activeDate = new Date(nowYear, nowMonth, nowDay, nowHour - conf_1.default.findOneThreadActiveHour);
            const activeTime = activeDate.getTime();
            return isCreate ? true : threadUpdateTime < activeTime;
        }
        else {
            return false;
        }
    }
    static getStatusIsMultistream(app) {
        if (app === undefined || app.dispThreadType === undefined)
            return true;
        return app.dispThreadType === App_1.default.dispThreadTypeMulti && app.multistream;
    }
    static getStatusIsMediaCh(ch) {
        return App_1.default.getIsMediaCh(ch);
    }
    static getStatusIsToggleMultistream(app) {
        if (app === undefined || app.actioned === undefined)
            return false;
        return app.isToggleMultistream;
    }
    static getContentTypeFromFindType(contentType) {
        const findTypeHtml = Thread.findTypes[Thread.findTypeHtml];
        const findTypeMusic = Thread.findTypes[Thread.findTypeMusic];
        const findTypeVideo = Thread.findTypes[Thread.findTypeVideo];
        let findType;
        if (contentType && contentType !== "") {
            let splitedContentType = "";
            if (contentType.indexOf(";") > 0) {
                splitedContentType = contentType.split(";")[0];
            }
            if (findTypeHtml.includes(splitedContentType)) {
                findType = Thread.findTypeHtml;
            }
            if (findTypeMusic.includes(splitedContentType)) {
                findType = Thread.findTypeMusic;
            }
            if (findTypeVideo.includes(splitedContentType)) {
                findType = Thread.findTypeVideo;
            }
        }
        return findType;
    }
    static getFindTypeFromSrc(src) {
        const str = App_1.default.getMediaTypeFromSrc(src);
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}
exports.default = Thread;
//# sourceMappingURL=Thread.js.map