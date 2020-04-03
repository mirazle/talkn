"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Ui_1 = __importDefault(require("api/store/Ui"));
const conf_1 = __importDefault(require("common/conf"));
const index_1 = __importDefault(require("../index"));
const Container_1 = __importDefault(require("../Container"));
class MenuIndexList {
    constructor(params) {
        const activeLiSelf = MenuIndexList.getActiveLiSelf(params);
        const unactiveLiSelf = MenuIndexList.getUnactiveLiSelf(params);
        const upper = MenuIndexList.getUpper();
        const upperSpace = MenuIndexList.getUpperSpace();
        const upperRankWrap = MenuIndexList.getUpperRankWrap();
        const upperRank = MenuIndexList.getUpperRank();
        const upperRight = MenuIndexList.getUpperRight();
        const bottom = MenuIndexList.getBottom();
        const bottomIcon = MenuIndexList.getBottomIcon();
        const bottomPost = MenuIndexList.getBottomPost();
        const bottomWatchCnt = MenuIndexList.getBottomWatchCnt();
        const bottomWatchCntWrap = MenuIndexList.getBottomWatchCntWrap();
        const ext = MenuIndexList.getExt();
        const extMusic = MenuIndexList.getExtMusic();
        const extVideo = MenuIndexList.getExtVideo();
        return {
            activeLiSelf,
            unactiveLiSelf,
            upper,
            upperSpace,
            upperRankWrap,
            upperRank,
            upperRight,
            bottom,
            bottomIcon,
            bottomPost,
            bottomWatchCnt,
            bottomWatchCntWrap,
            ext,
            extMusic,
            extVideo
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
    static get fontSize() {
        return 15;
    }
    static get iconSize() {
        return 24;
    }
    static get liHeight() {
        return 90;
    }
    static get activeLiSelfLabel() {
        return "activeLiSelf";
    }
    static get unactiveLiSelfLabel() {
        return "unactiveLiSelf";
    }
    static get activeLiSelfBackground() {
        return Container_1.default.whiteRGB;
    }
    static get activeLiSelfMouseOverBackground() {
        return Container_1.default.whiteRGB;
    }
    static get activeLiSelfMouseDownBackground() {
        return Container_1.default.whiteRGB;
    }
    static get unactiveLiSelfBackground() {
        return Container_1.default.calmRGB;
    }
    static get unactiveLiSelfMouseOverBackground() {
        return Container_1.default.whiteRGB;
    }
    static get unactiveLiSelfMouseDownBackground() {
        return Container_1.default.whiteRGB;
    }
    static get activeLiSelfBorderRightColor() {
        return `1px solid ${Container_1.default.whiteRGB}`;
    }
    static get unactiveLiSelfBorderRightColor() {
        return Container_1.default.border;
    }
    static getUnactiveLiBorder({ app, ui }) {
        if (ui.extensionMode === Ui_1.default.extensionModeExtBottomLabel) {
            return { borderBottom: Container_1.default.border };
        }
        else {
            return ui.screenMode === Ui_1.default.screenModeSmallLabel
                ? { borderBottom: Container_1.default.border, borderLeft: 0 }
                : {
                    borderRight: Container_1.default.border,
                    borderBottom: Container_1.default.border,
                    borderLeft: 0
                };
        }
    }
    static getDispRankBackground(rank) {
        switch (rank) {
            case 0:
                return MenuIndexList.tuneRGB;
            case 1:
                return MenuIndexList.rank1RGB;
            case 2:
                return MenuIndexList.rank2RGB;
            case 3:
                return MenuIndexList.rank3RGB;
            default:
                return MenuIndexList.rankOtherRGB;
        }
    }
    static getDispRankWidth(rank) {
        switch (String(rank).length) {
            case 0:
                return MenuIndexList.oneDigitWidth;
            case 1:
                return MenuIndexList.oneDigitWidth;
            case 2:
                return MenuIndexList.twoDigitWidth;
            case 3:
                return MenuIndexList.thirdDigitWidth;
            default:
                return MenuIndexList.thirdDigitWidth;
        }
    }
    static getActiveLiSelf({ app, ui }) {
        const layout = index_1.default.getLayoutBlock({
            width: "initial",
            height: `${MenuIndexList.liHeight}px`,
            padding: "5px",
            borderBottom: Container_1.default.border,
            borderRight: `1px solid ${Container_1.default.whiteRGB}`,
            background: MenuIndexList.activeLiSelfBackground,
            cursor: "pointer"
        });
        const content = index_1.default.getContentBase();
        const animation = index_1.default.getAnimationBase({
            transition: `${Container_1.default.transitionFirstOn}ms`
        });
        return index_1.default.get({ layout, content, animation });
    }
    static getUnactiveLiSelf({ app, ui }) {
        const borders = MenuIndexList.getUnactiveLiBorder({ app, ui });
        const layout = index_1.default.getLayoutBlock(Object.assign(Object.assign({ width: "initial", height: `${MenuIndexList.liHeight}px`, padding: "5px" }, borders), { background: MenuIndexList.unactiveLiSelfBackground, cursor: "pointer" }));
        const content = index_1.default.getContentBase();
        const animation = index_1.default.getAnimationBase({
            transition: `${Container_1.default.transitionFirstOn}ms`
        });
        return index_1.default.get({ layout, content, animation });
    }
    static getUpper() {
        const layout = index_1.default.getLayoutBlock({
            width: "100%",
            height: "20px"
        });
        const content = index_1.default.getContentBase({
            fontSize: `${MenuIndexList.fontSize}px`
        });
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getUpperSpace() {
        const layout = index_1.default.getLayoutInlineBlock({
            width: "18%",
            margin: "0px 2% 0px 0px"
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
            width: MenuIndexList.thirdDigitWidth,
            height: "20px",
            background: MenuIndexList.rankOtherRGB,
            borderRadius: "10px",
            margin: "0"
        });
        const content = index_1.default.getContentBase({});
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getUpperRank() {
        const layout = index_1.default.getLayoutFlex({
            width: "100%"
        });
        const content = index_1.default.getContentBase({
            fontSize: "10px",
            fontWeight: "bold",
            color: Container_1.default.whiteRGB,
            lineHeight: "1.5"
        });
        const animation = index_1.default.getAnimationBase({
            transform: "scale(0.8)"
        });
        return index_1.default.get({ layout, content, animation });
    }
    static getUpperRight() {
        const layout = index_1.default.getLayoutInlineBlock({
            width: "80%"
        });
        const content = index_1.default.getContentBase({
            lineHeight: "1.5",
            textAlign: "left"
        });
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getBottom() {
        const layout = index_1.default.getLayoutFlex({
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "55px"
        });
        const content = index_1.default.getContentBase();
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getBottomIcon() {
        const layout = index_1.default.getLayoutInlineBlock({
            width: "20%",
            height: "50px",
            backgroundImage: `url("${conf_1.default.assetsURL}/favicon.ico")`,
            backgroundPosition: "50% 30%",
            backgroundSize: "24px 24px",
            backgroundRepeat: "no-repeat"
        });
        const content = index_1.default.getContentBase();
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getBottomPost() {
        const layout = index_1.default.getLayoutInlineBlock({
            width: "60%"
        });
        const content = index_1.default.getContentBase({
            fontSize: `${MenuIndexList.fontSize}px`,
            lineHeight: 2.8,
            textAlign: "left",
            whiteSpace: "nowrap"
        });
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getBottomWatchCnt() {
        const layout = index_1.default.getLayoutInlineFlex({
            width: "20%"
        });
        const content = index_1.default.getContentBase({
            textAlign: "center"
        });
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getBottomWatchCntWrap() {
        const layout = index_1.default.getLayoutInlineFlex({
            position: "relative",
            top: "-6px",
            width: "26px",
            height: "26px",
            background: Container_1.default.themeRGBA,
            borderRadius: "20px"
        });
        const content = index_1.default.getContentBase({
            fontSize: "10px",
            lineHeight: 2,
            textAlign: "center",
            color: Container_1.default.whiteRGB
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
            borderRadius: "3px 3px 0px 0px"
        });
        const content = index_1.default.getContentBase({
            textIndent: "3px",
            fontSize: "8px",
            textAlign: "center",
            lineHeight: "1.5px",
            color: Container_1.default.whiteRGB
        });
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getExtMusic() {
        let ext = MenuIndexList.getExt();
        ext.background = "rgba(143,198,143, 1)";
        return ext;
    }
    static getExtVideo() {
        let ext = MenuIndexList.getExt();
        ext.background = "rgba(105, 70, 255, 1)";
        return ext;
    }
}
exports.default = MenuIndexList;
//# sourceMappingURL=MenuIndexList.js.map