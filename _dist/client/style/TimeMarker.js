"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Ui_1 = __importDefault(require("client/store/Ui"));
const index_1 = __importDefault(require("./index"));
const Container_1 = __importDefault(require("./Container"));
const Menu_1 = __importDefault(require("./Menu"));
const DetailRight_1 = __importDefault(require("./DetailRight"));
class TimeMarker {
    constructor(params) {
        const self = TimeMarker.getSelf(params);
        const fixTimeMarker = TimeMarker.getFixTimeMarker(params);
        return {
            self,
            fixTimeMarker,
        };
    }
    static getSelfWidthRate() {
        return 36;
    }
    static getSelfHeightPx() {
        return 22;
    }
    static getSelfMarginTop() {
        return 15;
    }
    static getSelfLeftRate() {
        return 50 - TimeMarker.getSelfWidthRate() / 2;
    }
    static getFixTimeMarkerStyles({ app, ui }) {
        const fontSize = "0.8em";
        let widthRate = TimeMarker.getSelfWidthRate() / 100;
        let width = ui.width * widthRate;
        let height = `${TimeMarker.getSelfHeightPx()}px`;
        let left = "25%";
        let menuWidthPx = 0;
        let detailWidthPx = 0;
        let postsWidthPx = 0;
        switch (ui.screenMode) {
            case Ui_1.default.screenModeSmallLabel:
                postsWidthPx = ui.width;
                width = postsWidthPx * widthRate;
                left = menuWidthPx + postsWidthPx * (TimeMarker.getSelfLeftRate() / 100) + "px";
                break;
            case Ui_1.default.screenModeMiddleLabel:
                menuWidthPx = Menu_1.default.getWidth({ app, ui }, true);
                postsWidthPx = ui.width - menuWidthPx;
                width = postsWidthPx * widthRate;
                left = menuWidthPx + postsWidthPx * (TimeMarker.getSelfLeftRate() / 100) + "px";
                break;
            case Ui_1.default.screenModeLargeLabel:
                menuWidthPx = Menu_1.default.getWidth({ app, ui }, true);
                detailWidthPx = (ui.width * Number(DetailRight_1.default.getWidth({ app, ui }, true))) / 100;
                postsWidthPx = ui.width - (menuWidthPx + detailWidthPx);
                width = postsWidthPx * widthRate;
                left = menuWidthPx + postsWidthPx * (TimeMarker.getSelfLeftRate() / 100) + "px";
                break;
        }
        return { width, height, left, fontSize };
    }
    static getSelf({ app, ui }) {
        const display = app.isMediaCh ? "none" : "flex";
        const layout = index_1.default.getLayoutFlex({
            width: `${TimeMarker.getSelfWidthRate()}%`,
            height: `${TimeMarker.getSelfHeightPx()}px`,
            margin: `${TimeMarker.getSelfMarginTop()}px auto 10px auto`,
            padding: "5px 10px",
            background: Container_1.default.darkLightRGBA,
            borderRadius: "20px",
            display,
        });
        const content = index_1.default.getContentBase({
            color: Container_1.default.whiteRGB,
            letterSpacing: "2px",
            fontSize: "0.8em",
        });
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getFixTimeMarker({ app, ui }) {
        const timeMarker = TimeMarker.getSelf({ app, ui });
        const { left, width, height, fontSize } = TimeMarker.getFixTimeMarkerStyles({ app, ui });
        return {
            ...timeMarker,
            position: "fixed",
            width,
            height,
            top: `${Container_1.default.getBlockSize({ app, ui })}px`,
            left,
            fontSize,
            lineHeight: "0.9em",
        };
    }
}
exports.default = TimeMarker;
//# sourceMappingURL=TimeMarker.js.map