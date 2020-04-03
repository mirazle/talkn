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
const Board_1 = __importDefault(require("../Board"));
class Audio {
    constructor(params) {
        const self = Audio.getSelf(params);
        return {
            self
        };
    }
    static get marginBase() {
        return 5;
    }
    static get marginLeftMag() {
        return 5;
    }
    static get marginRightMag() {
        return 1;
    }
    static get marginLeft() {
        return Math.floor(window.innerWidth * 0.05);
    }
    static get marginRight() {
        return Audio.marginBase * Audio.marginRightMag;
    }
    static get height() {
        return 50;
    }
    static getSelfWidth({ app, ui }) {
        let width = "0";
        const reduceMargin = Audio.marginLeft + Audio.marginRight;
        const reduceWidth = Board_1.default.getTotalWidth({ app, ui });
        const reduce = reduceMargin + reduceWidth;
        switch (ui.screenMode) {
            case Ui_1.default.screenModeSmallLabel:
                width = `calc( 100% - ${reduce}px )`;
                break;
            case Ui_1.default.screenModeMiddleLabel:
                width = `calc( 100% - ${Menu_1.default.getWidth({ app, ui }, true) + reduce}px )`;
                break;
            case Ui_1.default.screenModeLargeLabel:
                width = `calc( ${100 - Detail_1.default.getWidth({ app, ui }, false)}% - ${Menu_1.default.getWidth({ app, ui }, true) +
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
        const width = Audio.getSelfWidth({ app, ui });
        const left = Audio.getSelfLeft({ app, ui });
        const layout = index_1.default.getLayoutBlock({
            display,
            position: "fixed",
            top: Header_1.default.headerHeight + 15 + "px",
            left,
            margin: `0px ${Audio.marginRight}px 0px ${Audio.marginLeft}px`,
            width,
            height: `${Audio.height}px`
        });
        const content = {};
        const animation = {};
        return index_1.default.get({ layout, content, animation });
    }
}
exports.default = Audio;
//# sourceMappingURL=Audio.js.map