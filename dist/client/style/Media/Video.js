"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Ui_1 = __importDefault(require("api/store/Ui"));
const index_1 = __importDefault(require("../index"));
const Header_1 = __importDefault(require("../Header"));
const Detail_1 = __importDefault(require("../Detail"));
const Menu_1 = __importDefault(require("../Menu"));
class Video {
    constructor(params) {
        const self = Video.getSelf(params);
        return {
            self
        };
    }
    static get marginBase() {
        return 5;
    }
    static get marginLeftMag() {
        return 0;
    }
    static get marginRightMag() {
        return 0;
    }
    static get marginLeft() {
        return Video.marginBase * Video.marginLeftMag;
    }
    static get marginRight() {
        return Video.marginBase * Video.marginRightMag;
    }
    static get height() {
        return 260;
    }
    static getSelfWidth({ app, ui }) {
        let width = "0";
        const reduce = Video.marginLeftMag + Video.marginRightMag;
        switch (ui.screenMode) {
            case Ui_1.default.screenModeSmallLabel:
                width = `${100 - reduce}%`;
                break;
            case Ui_1.default.screenModeMiddleLabel:
                width = `calc( ${100 - reduce}% - ${Menu_1.default.getWidth({ app, ui }, true)}px )`;
                break;
            case Ui_1.default.screenModeLargeLabel:
                width = `calc( ${100 - Detail_1.default.getWidth({ app, ui }, false) - reduce}% - ${Menu_1.default.getWidth({ app, ui }, true) +
                    reduce}px )`;
                break;
        }
        return width;
    }
    static getSelfLeft({ app, ui }) {
        let left = "0px";
        switch (ui.screenMode) {
            case Ui_1.default.screenModeSmallLabel:
                left = "0px";
                break;
            case Ui_1.default.screenModeMiddleLabel:
            case Ui_1.default.screenModeLargeLabel:
                left = Menu_1.default.getWidth({ app, ui }, true);
                break;
        }
        return left;
    }
    static getSelf({ app, ui }) {
        const display = app.isMediaCh ? "block" : "none";
        const width = Video.getSelfWidth({ app, ui });
        const left = Video.getSelfLeft({ app, ui });
        const layout = index_1.default.getLayoutBlock({
            display,
            position: "fixed",
            background: "black",
            top: Header_1.default.headerHeight + "px",
            left,
            margin: `0px ${Video.marginRightMag}% 0px ${Video.marginLeftMag}%`,
            width,
            zIndex: 1,
            height: `${Video.height}px`,
            outline: "none"
        });
        const content = {};
        const animation = {};
        return index_1.default.get({ layout, content, animation });
    }
}
exports.default = Video;
//# sourceMappingURL=Video.js.map