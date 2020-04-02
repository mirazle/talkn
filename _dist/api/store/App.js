"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(require("api/store/Schema"));
const Post_1 = __importDefault(require("api/store/Post"));
const Thread_1 = __importDefault(require("api/store//Thread"));
class App extends Schema_1.default {
    constructor(params = {}, call = "") {
        super();
        this.offsetTimelineFindId = Post_1.default.defaultFindId;
        this.offsetSingleFindId = Post_1.default.defaultFindId;
        this.offsetMultiFindId = Post_1.default.defaultFindId;
        this.offsetChildFindId = Post_1.default.defaultFindId;
        this.offsetLogsFindId = Post_1.default.defaultFindId;
        const ch = params.ch ? params.ch : "/";
        const name = params.name ? params.name : "talkn";
        const talknIndex = params.talknIndex ? params.talknIndex : 0;
        const isMediaCh = Schema_1.default.isSet(params.isMediaCh) ? params.isMediaCh : App.getIsMediaCh(ch);
        const isLinkCh = Schema_1.default.isSet(params.isLinkCh) ? params.isLinkCh : false;
        const rootCh = params.rootCh ? params.rootCh : ch;
        const isRootCh = Schema_1.default.isSet(params.isRootCh) ? params.isRootCh : rootCh === ch;
        const rootTitle = params.rootTitle ? params.rootTitle : "talkn";
        const src = App.getMediaSrc(params.protocol, ch);
        const chType = App.getMediaType(src, params);
        const tuned = params && params.tuned ? params.tuned : "";
        const dispThreadType = App.getDispThreadType(params, isMediaCh);
        const multistream = Schema_1.default.isSet(params.multistream) ? params.multistream : true;
        const multistreamed = params && params.multistreamed ? params.multistreamed : false;
        const findType = params && params.findType ? params.findType : Thread_1.default.findTypeAll;
        const offsetFindId = params && params.offsetFindId ? params.offsetFindId : App.defaultOffsetFindId;
        const offsetTimelineFindId = params && params.offsetTimelineFindId ? params.offsetTimelineFindId : App.defaultOffsetFindId;
        const offsetSingleFindId = params && params.offsetSingleFindId ? params.offsetSingleFindId : App.defaultOffsetFindId;
        const offsetMultiFindId = params && params.offsetMultiFindId ? params.offsetMultiFindId : App.defaultOffsetFindId;
        const offsetChildFindId = params && params.offsetChildFindId ? params.offsetChildFindId : App.defaultOffsetFindId;
        const offsetLogsFindId = params && params.offsetLogsFindId ? params.offsetLogsFindId : App.defaultOffsetFindId;
        const detailCh = params.detailCh ? params.detailCh : ch;
        const inputPost = params.inputPost ? params.inputPost : "";
        const inputStampId = params.inputStampId ? params.inputStampId : false;
        const inputCurrentTime = params.inputCurrentTime ? params.inputCurrentTime : 0.0;
        const inputSearch = params.inputSearch ? params.inputSearch : "";
        const actioned = params && params.actioned ? params.actioned : "";
        const isTransition = Schema_1.default.isSet(params.isTransition) ? params.isTransition : false;
        const isLoading = Schema_1.default.isSet(params.isLoading) ? params.isLoading : false;
        const isLoadingEnd = Schema_1.default.isSet(params.isLoadingEnd) ? params.isLoadingEnd : false;
        const debug = Schema_1.default.isSet(params.debug) ? params.debug : "";
        return this.create({
            name,
            talknIndex,
            isRootCh,
            isLinkCh,
            isMediaCh,
            rootCh,
            rootTitle,
            chType,
            dispThreadType,
            tuned,
            multistream,
            multistreamed,
            findType,
            offsetFindId,
            offsetTimelineFindId,
            offsetSingleFindId,
            offsetMultiFindId,
            offsetChildFindId,
            offsetLogsFindId,
            detailCh,
            inputPost,
            inputStampId,
            inputCurrentTime,
            inputSearch,
            actioned,
            isTransition,
            isLoading,
            isLoadingEnd,
            debug
        });
    }
    static get defaultOffsetFindId() {
        return Post_1.default.defaultFindId;
    }
    static get dispThreadTypeTimeline() {
        return "Timeline";
    }
    static get dispThreadTypeSingle() {
        return "Single";
    }
    static get dispThreadTypeMulti() {
        return "Multi";
    }
    static get dispThreadTypeChild() {
        return "Child";
    }
    static get dispThreadTypeLogs() {
        return "Logs";
    }
    static get mediaTagTypeNo() {
        return "html";
    }
    static get mediaTagTypeAudio() {
        return "audio";
    }
    static get mediaTagTypeVideo() {
        return "video";
    }
    static get mediaTypeMp3() {
        return "mp3";
    }
    static get mediaTypeMp4() {
        return "mp4";
    }
    static get mediaTypeM4a() {
        return "m4a";
    }
    static get mediaChs() {
        return [App.mediaTypeMp3, App.mediaTypeMp4, App.mediaTypeM4a];
    }
    static get mediaChTagTypes() {
        return {
            [App.mediaTypeMp3]: App.mediaTagTypeAudio,
            [App.mediaTypeMp4]: App.mediaTagTypeVideo,
            [App.mediaTypeM4a]: App.mediaTagTypeAudio
        };
    }
    static getMediaType(src, params) {
        if (params && params.chType) {
            return params.chType;
        }
        return App.getMediaTypeFromSrc(src);
    }
    static getMediaTypeFromSrc(src) {
        const mediaChTagTypeKeys = Object.keys(App.mediaChTagTypes);
        const mediaChTagTypeLength = mediaChTagTypeKeys.length;
        let mediaType = "html";
        for (let i = 0; i < mediaChTagTypeLength; i++) {
            const regExp = new RegExp(`.${mediaChTagTypeKeys[i]}$`);
            if (src.match(regExp)) {
                mediaType = App.mediaChTagTypes[mediaChTagTypeKeys[i]];
                break;
            }
        }
        return mediaType;
    }
    static validInputPost(value) {
        if (/\r\n$|\n$|\r$/gim.test(value))
            return "LAST TYPE BREAK LINE.";
        return false;
    }
    static validPost(value) {
        if (value === "")
            return "NO INPUT POST";
        if (/^\r\n+$|\n+$|\r+$/g.test(value))
            return "ONLY NEW LINE";
        if (/^\s+$/g.test(value))
            return "only space";
        if (/^\r\n+(\s|\S)+$|^\n+(\s|\S)+$|^\r+(\s|\S)+$/.test(value))
            return "EMPTY POST";
        return false;
    }
    static getWidth(params) {
        if (typeof window === "object" && window.innerWidth)
            return window.innerWidth;
        if (params.width) {
            if (typeof params.width === "string") {
                if (params.width.indexOf("px") >= 0) {
                    return Number(params.width.replace("px", ""));
                }
            }
            return params.width;
        }
        return 0;
    }
    static getHeight(params = {}) {
        if (typeof window === "object" && window.innerHeight)
            return window.innerHeight;
        return 0;
    }
    static isMediaContentType(contentType) {
        return App.isAudioContentType(contentType) || App.isVideoContentType(contentType);
    }
    static isAudioContentType(contentType) {
        return contentType.indexOf(App.mediaTagTypeAudio) >= 0;
    }
    static isVideoContentType(contentType) {
        return contentType.indexOf(App.mediaTagTypeVideo) >= 0;
    }
    static getMediaSrc(protocol, ch) {
        return protocol + "/" + ch.replace(/\/$/, "");
    }
    static getIsMediaCh(ch) {
        return App.mediaChs.some(ext => {
            const regexp = new RegExp(`.${ext}\/$|.${ext}$`);
            return ch.match(regexp);
        });
    }
    static isActiveMultistream({ app, ui }, called = "") {
        return ui.menuComponent === "Index" && !app.isMediaCh && app.dispThreadType === App.dispThreadTypeMulti;
    }
    static getDispThreadType(params, isMediaCh) {
        if (params && params.dispThreadType) {
            return params.dispThreadType;
        }
        else {
            if (isMediaCh) {
                return App.dispThreadTypeTimeline;
            }
            else {
                return App.dispThreadTypeMulti;
            }
        }
    }
    static getOffsetFindId({ posts }) {
        if (posts && posts[0] && posts[0]._id) {
            return posts[0]._id;
        }
        return Post_1.default.defaultFindId;
    }
    static getStepToDispThreadType({ app, menuIndex }, threadStatus, toCh, called = "") {
        let afterDispThreadType = "";
        const beforeDispThreadType = app.dispThreadType;
        app = App.getStepDispThreadType({ app, menuIndex }, threadStatus, toCh, called);
        afterDispThreadType = app.dispThreadType;
        return { app, stepTo: `${beforeDispThreadType} to ${afterDispThreadType}` };
    }
    static getStepDispThreadType({ app, menuIndex }, threadStatus = {}, toCh, called) {
        const log = false;
        app.isLinkCh = false;
        if (log)
            console.log(called + " rootCh = " + app.rootCh + " toCh = " + toCh);
        if (log)
            console.log(menuIndex);
        if (threadStatus.isMediaCh) {
            if (log)
                console.log("B");
            app.dispThreadType = App.dispThreadTypeTimeline;
            app.offsetFindId = app.offsetTimelineFindId ? app.offsetTimelineFindId : App.defaultOffsetFindId;
            app.isLinkCh = called === "toLinks" || called === "findMediaCh" ? true : false;
            app.isMediaCh = true;
            return app;
        }
        if (called === "toLinks") {
            const haveMenuIndex = menuIndex.some(mi => {
                return mi.ch === toCh || mi.ch === toCh + "/";
            });
            if (log) {
                console.log("C " + haveMenuIndex + "");
            }
            if (!haveMenuIndex) {
                if (log) {
                    console.log("D");
                }
                app.offsetFindId = App.defaultOffsetFindId;
                app.dispThreadType = App.dispThreadTypeChild;
                app.isLinkCh = true;
                return app;
            }
        }
        if (app.rootCh === toCh) {
            if (app.multistream) {
                if (log)
                    console.log("E");
                app.dispThreadType = App.dispThreadTypeMulti;
                app.offsetFindId = app.offsetMultiFindId ? app.offsetMultiFindId : App.defaultOffsetFindId;
            }
            else {
                if (log)
                    console.log("F");
                app.dispThreadType = App.dispThreadTypeSingle;
                app.offsetFindId = app.offsetSingleFindId ? app.offsetSingleFindId : App.defaultOffsetFindId;
            }
        }
        else {
            if (log)
                console.log("G");
            app.dispThreadType = App.dispThreadTypeChild;
            app.offsetFindId = app.offsetChildFindId ? app.offsetChildFindId : App.defaultOffsetFindId;
        }
        if (log)
            console.log(app);
        return app;
    }
}
exports.default = App;
//# sourceMappingURL=App.js.map