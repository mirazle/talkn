"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Ui_1 = __importDefault(require("client/store/Ui"));
const conf_1 = __importDefault(require("common/conf"));
const index_1 = __importDefault(require("../../index"));
const Container_1 = __importDefault(require("../../Container"));
class Ch {
    constructor(params) {
        const activeLiSelf = Ch.getActiveLiSelf(params);
        const unactiveLiSelf = Ch.getUnactiveLiSelf(params);
        const space = Ch.getSpace(params);
        const upper = Ch.getUpper();
        const upperSpace = Ch.getUpperSpace();
        const upperRankWrap = Ch.getUpperRankWrap();
        const upperRank = Ch.getUpperRank();
        const upperRight = Ch.getUpperRight();
        const bottom = Ch.getBottom(params);
        const bottomIcon = Ch.getBottomIcon(params);
        const bottomPost = Ch.getBottomPost();
        const ext = Ch.getExt();
        const extMusic = Ch.getExtMusic();
        const extVideo = Ch.getExtVideo();
        return {
            activeLiSelf,
            unactiveLiSelf,
            space,
            upper,
            upperSpace,
            upperRankWrap,
            upperRank,
            upperRight,
            bottom,
            bottomIcon,
            bottomPost,
            ext,
            extMusic,
            extVideo,
        };
    }
    static get tuneRGB() {
        return Container_1.default.themeRGB;
    }
    static get rank1RGB() {
        return "rgb(255, 10, 78)";
    }
    static get rank2RGB() {
        return "rgb(255, 127, 0)";
    }
    static get rank3RGB() {
        return "rgb(0, 142, 255)";
    }
    static get rankOtherRGB() {
        return Container_1.default.downreliefRGB;
    }
    static get oneDigitWidth() {
        return "17%";
    }
    static get twoDigitWidth() {
        return "18%";
    }
    static get thirdDigitWidth() {
        return "19%";
    }
    static get iconSize() {
        return 24;
    }
    static get activeLiSelfLabel() {
        return "activeLiSelf";
    }
    static get unactiveLiSelfLabel() {
        return "unactiveLiSelf";
    }
    static get activeLiSelfBackground() {
        return Container_1.default.whiteRGBA;
    }
    static get activeLiSelfMouseOverBackground() {
        return Container_1.default.whiteRGBA;
    }
    static get activeLiSelfMouseDownBackground() {
        return Container_1.default.whiteRGBA;
    }
    static get unactiveLiSelfBackground() {
        return Container_1.default.calmRGBA;
    }
    static get unactiveLiSelfMouseOverBackground() {
        return Container_1.default.whiteRGBA;
    }
    static get unactiveLiSelfMouseDownBackground() {
        return Container_1.default.whiteRGBA;
    }
    static get activeLiSelfBorderRightColor() {
        return `1px solid ${Container_1.default.whiteRGB}`;
    }
    static get unactiveLiSelfBorderRightColor() {
        return Container_1.default.border;
    }
    static getUnactiveLiBorder({ app, ui }) {
        if (ui.extensionMode === Ui_1.default.extensionModeExtBottomLabel) {
            return {
                borderTop: 0,
                borderRight: 0,
                borderBottom: Container_1.default.border,
                borderLeft: 0,
            };
        }
        else {
            return ui.screenMode === Ui_1.default.screenModeSmallLabel
                ? {
                    borderTop: 0,
                    borderRight: 0,
                    borderBottom: Container_1.default.border,
                    borderLeft: 0,
                }
                : {
                    borderTop: 0,
                    borderRight: Container_1.default.border,
                    borderBottom: Container_1.default.border,
                    borderLeft: 0,
                };
        }
    }
    static getDispRankBackground(rank = 0) {
        switch (rank) {
            case 0:
                return Ch.tuneRGB;
            case 1:
                return Ch.rank1RGB;
            case 2:
                return Ch.rank2RGB;
            case 3:
                return Ch.rank3RGB;
            default:
                return Ch.rankOtherRGB;
        }
    }
    static getDispRankWidth(rank = 0) {
        switch (String(rank).length) {
            case 0:
                return Ch.oneDigitWidth;
            case 1:
                return Ch.oneDigitWidth;
            case 2:
                return Ch.twoDigitWidth;
            case 3:
                return Ch.thirdDigitWidth;
            default:
                return Ch.thirdDigitWidth;
        }
    }
    static getActiveLiSelf({ app, ui }) {
        const height = Container_1.default.getBlockSize({ app, ui }) * 2;
        const layout = index_1.default.getLayoutBlock({
            width: "initial",
            height: `${height}px`,
            minHeight: `${height}px`,
            padding: "5px",
            borderTop: 0,
            borderRight: `1px solid ${Container_1.default.whiteRGB}`,
            borderBottom: Container_1.default.border,
            borderLeft: 0,
            background: Ch.activeLiSelfBackground,
            cursor: "pointer",
        });
        const content = index_1.default.getContentBase();
        const animation = index_1.default.getAnimationBase({
            transition: `${Container_1.default.transitionFirstOn}ms`,
        });
        return index_1.default.get({ layout, content, animation });
    }
    static getUnactiveLiSelf({ app, ui }) {
        const borders = Ch.getUnactiveLiBorder({ app, ui });
        const height = Container_1.default.getBlockSize({ app, ui }) * 2;
        const layout = index_1.default.getLayoutBlock({
            boxShadow: `${Container_1.default.lineShadow}`,
            width: "initial",
            height: `${height}px`,
            minHeight: `${height}px`,
            padding: "5px",
            ...borders,
            background: Ch.unactiveLiSelfBackground,
            cursor: "pointer",
        });
        const content = index_1.default.getContentBase();
        const animation = index_1.default.getAnimationBase({
            transition: `${Container_1.default.transitionFirstOn}ms`,
        });
        return index_1.default.get({ layout, content, animation });
    }
    static getSpace({ app, ui }) {
        const layout = index_1.default.getLayoutBlock({
            height: "100%",
            background: Container_1.default.silverRGBA,
        });
        const content = index_1.default.getContentBase({});
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getUpper() {
        const layout = index_1.default.getLayoutBlock({
            width: "100%",
            height: "20px",
        });
        const content = index_1.default.getContentBase({});
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getUpperSpace() {
        const layout = index_1.default.getLayoutInlineBlock({
            width: "18%",
            margin: "0px 2% 0px 0px",
        });
        const content = index_1.default.getContentBase({});
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getUpperRankWrap() {
        const layout = index_1.default.getLayoutInlineFlex({
            position: "absolute",
            left: "5px",
            top: "7px",
            width: Ch.thirdDigitWidth,
            height: "20px",
            background: Ch.rankOtherRGB,
            borderRadius: "10px",
            margin: "0",
        });
        const content = index_1.default.getContentBase({});
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getUpperRank() {
        const layout = index_1.default.getLayoutFlex({
            width: "100%",
        });
        const content = index_1.default.getContentBase({
            fontSize: "0.7em",
            fontWeight: "bold",
            color: Container_1.default.whiteRGB,
            lineHeight: "1.5",
        });
        const animation = index_1.default.getAnimationBase({
            transform: "scale(0.8)",
        });
        return index_1.default.get({ layout, content, animation });
    }
    static getUpperRight() {
        const layout = index_1.default.getLayoutInlineBlock({
            width: "80%",
        });
        const content = index_1.default.getContentBase({
            lineHeight: "1.5",
            textIndent: "4px",
            textAlign: "left",
        });
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getBottom({ app, ui }) {
        const layout = index_1.default.getLayoutFlex({
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "60%",
        });
        const content = index_1.default.getContentBase();
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getBottomIcon({ app, ui }) {
        const layout = index_1.default.getLayoutInlineBlock({
            width: "20%",
            height: "100%",
            backgroundImage: `url("${conf_1.default.assetsURL}/favicon.ico")`,
            backgroundPosition: "30% 50%",
            backgroundSize: `${Container_1.default.getFaviconSize({ app, ui })}px`,
            backgroundRepeat: "no-repeat",
        });
        const content = index_1.default.getContentBase();
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getBottomPost() {
        const layout = index_1.default.getLayoutInlineFlex({
            width: "60%",
            height: "100%",
            justifyContent: "flex-start",
        });
        const content = index_1.default.getContentBase({
            textIndent: "3%",
            textAlign: "left",
            whiteSpace: "nowrap",
        });
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getExt() {
        const layout = index_1.default.getLayoutFlex({
            position: "absolute",
            alignItems: "center",
            justifyContent: "center",
            bottom: "0px",
            right: "10px",
            width: "50px",
            height: "15px",
            background: Container_1.default.lightGrayRGBA,
            borderRadius: "3px 3px 0px 0px",
        });
        const content = index_1.default.getContentBase({
            textIndent: "3px",
            textAlign: "center",
            color: Container_1.default.whiteRGB,
        });
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getExtMusic() {
        let ext = Ch.getExt();
        ext.background = "rgba(143,198,143, 1)";
        return ext;
    }
    static getExtVideo() {
        let ext = Ch.getExt();
        ext.background = "rgba(105, 70, 255, 1)";
        return ext;
    }
}
exports.default = Ch;
//# sourceMappingURL=Ch.js.map