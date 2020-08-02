"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(require("api/store/Schema"));
const Container_1 = __importDefault(require("client/style/Container"));
const TimeMarker_1 = __importDefault(require("client/style/TimeMarker"));
const initUiTimeMarkerObject = {
    index: 0,
    offsetTop: 0,
    label: "",
};
class UiTimeMarker extends Schema_1.default {
    constructor(params = {}) {
        super();
        this.list = [];
        this.now = { ...initUiTimeMarkerObject };
        this.before = { ...initUiTimeMarkerObject };
        this.after = { ...initUiTimeMarkerObject };
        const list = params && params.list ? params.list : [];
        const now = params && params.now ? params.now : { ...initUiTimeMarkerObject };
        const before = params && params.before ? params.before : { ...initUiTimeMarkerObject };
        const after = params && params.after ? params.after : { ...initUiTimeMarkerObject };
        return this.create({
            list,
            now,
            before,
            after,
        });
    }
    static generate(scrollTop = 0, timeMarkers, { app, ui }) {
        const timeMarkerSize = timeMarkers.length;
        let list = [];
        let now = { ...initUiTimeMarkerObject };
        let before = { ...initUiTimeMarkerObject };
        let after = { ...initUiTimeMarkerObject };
        if (timeMarkerSize > 0) {
            const scrollBaseTop = TimeMarker_1.default.getSelfMarginTop() + scrollTop + Container_1.default.getBlockSize({ app, ui });
            timeMarkers.forEach((timeMarker, index) => {
                if (now.label === "" && scrollBaseTop <= timeMarker.offsetTop) {
                    now.index = index;
                    now.label = timeMarker.innerText;
                    now.offsetTop = timeMarker.offsetTop;
                    if (timeMarkers[index - 1]) {
                        before.index = now.index - 1;
                        before.label = timeMarkers[index - 1].innerText;
                        before.offsetTop = timeMarkers[index - 1].offsetTop;
                    }
                    else {
                        before = { ...now };
                    }
                    if (timeMarkers[index + 1]) {
                        after.index = now.index + 1;
                        after.label = timeMarkers[index + 1].innerText;
                        after.offsetTop = timeMarkers[index + 1].offsetTop;
                    }
                    else {
                        after = { ...now };
                    }
                }
                const addList = {
                    index,
                    offsetTop: timeMarker.offsetTop,
                    label: timeMarker.innerText,
                };
                list.push(addList);
            });
            if (now.label === "") {
                now.index = timeMarkerSize - 1;
                now.label = timeMarkers[now.index].innerText;
                now.offsetTop = timeMarkers[now.index].offsetTop;
                before = { ...now };
                after = { ...now };
                if (timeMarkers[now.index - 1]) {
                    before.index = timeMarkers[now.index - 1] ? now.index - 1 : now.index;
                    before.label = timeMarkers[now.index - 1] ? timeMarkers[now.index - 1].innerText : now.label;
                    before.offsetTop = timeMarkers[now.index - 1] ? timeMarkers[now.index - 1].offsetTop : now.offsetTop;
                }
                if (timeMarkers[now.index + 1]) {
                    after.index = timeMarkers[now.index + 1] ? now.index + 1 : now.index;
                    after.label = timeMarkers[now.index + 1] ? timeMarkers[now.index + 1].innerText : now.label;
                    after.offsetTop = timeMarkers[now.index + 1] ? timeMarkers[now.index + 1].offsetTop : now.offsetTop;
                }
            }
        }
        return { list, now, before, after };
    }
    static update(scrollTop = 0, uiTimeMarker) {
        let list = uiTimeMarker.list;
        let now = uiTimeMarker.now;
        let before = uiTimeMarker.before;
        let after = uiTimeMarker.after;
        const listCnt = list.length;
        if (listCnt > 0) {
            const scrollBaseTop = TimeMarker_1.default.getSelfMarginTop() + scrollTop + 54;
            if (now.index === listCnt - 1) {
                if (scrollBaseTop < now.offsetTop) {
                    after = now;
                    now = before;
                    before = list[before["index"] - 1] ? list[before["index"] - 1] : before;
                }
            }
            else if (now.index === 0) {
                if (after.offsetTop <= scrollBaseTop) {
                    before = list[now.index];
                    now = list[now.index + 1];
                    after = list[after.index + 1] ? list[after.index + 1] : after;
                }
            }
            else {
                if (now.offsetTop <= scrollBaseTop && scrollBaseTop < after.offsetTop) {
                }
                else {
                    if (scrollBaseTop < now.offsetTop) {
                        before = list[before.index - 1] ? list[before.index - 1] : before;
                        now = list[now.index - 1] ? list[now.index - 1] : now;
                        after = list[after.index - 1];
                    }
                    if (after.offsetTop <= scrollBaseTop) {
                        before = list[before.index + 1];
                        now = list[now.index + 1] ? list[now.index + 1] : now;
                        after = list[after.index + 1] ? list[after.index + 1] : after;
                    }
                }
            }
        }
        return { list, now, before, after };
    }
}
exports.default = UiTimeMarker;
//# sourceMappingURL=UiTimeMarker.js.map