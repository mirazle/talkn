"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Ui_1 = __importDefault(require("api/store/Ui"));
const index_1 = __importDefault(require("./index"));
const Container_1 = __importDefault(require("./Container"));
const Menu_1 = __importDefault(require("./Menu"));
const DetailRight_1 = __importDefault(require("./DetailRight"));
const DetailModal_1 = __importDefault(require("./DetailModal"));
const Header_1 = __importDefault(require("./Header"));
const conf_1 = __importDefault(require("../conf"));
class Detail {
    constructor(params) {
        const { app, ui } = params;
        const styles = {};
        const DetailClass = Detail.getDetailClass({ app, ui });
        styles[`self${Detail.detailRightSelfKey}`] = Detail.getDetailRightSelf(params);
        styles[`self${Detail.detailModalSelfKey}`] = Detail.getDetailModalSelf(params);
        styles.header = DetailClass.getHeader(params);
        styles.headerP = DetailClass.getHeaderP(params);
        styles.body = DetailClass.getBody(params);
        styles.meta = DetailClass.getMeta(params);
        styles.img = DetailClass.getImg(params);
        styles.description = DetailClass.getDescription(params);
        styles.metaContentTypeWrap = DetailClass.getMetaContentTypeWrap(params);
        styles.metaContentType = DetailClass.getMetaContentType(params);
        styles.ch = DetailClass.getCh(params);
        styles.analyze = DetailClass.getAnalyze(params);
        styles.analyzeRow = DetailClass.getAnalyzeRow(params);
        styles.analyzeCol = DetailClass.getAnalyzeCol(params);
        styles.analyzeLabel = DetailClass.getAnalyzeLabel(params);
        styles.analyzeValue = DetailClass.getAnalyzeValue(params);
        styles.analyzeHr = DetailClass.getAnalyzeHr(params);
        styles.h1s = DetailClass.getH1s(params);
        styles.h1sLi = DetailClass.getH1sLi(params);
        styles.footer = DetailClass.getFooter(params);
        styles.footerChild = DetailClass.getFooterChild(params);
        styles.footerChildLike = DetailClass.getFooterChildLike(params);
        styles.footerChildMoney = DetailClass.getFooterChildMoney(params);
        styles.footerChildShare = DetailClass.getFooterChildShare(params);
        styles.metaItems = DetailClass.getMetaItems(params);
        styles.updateWrap = DetailClass.getUpdateWrap(params);
        styles.update = DetailClass.getUpdate(params);
        return styles;
    }
    static get detailRightSelfKey() {
        return "Right";
    }
    static get detailModalSelfKey() {
        return "Modal";
    }
    static get screenModeOfRightDetail() {
        return Ui_1.default.screenModeLargeLabel;
    }
    static get padding() {
        return 20;
    }
    static get margin() {
        return 5;
    }
    static getDetailClass({ app, ui }) {
        return Detail.isRightDetail({ app, ui }) ? DetailRight_1.default : DetailModal_1.default;
    }
    static isRightDetail({ app, ui }) {
        return ui.screenMode === Detail.screenModeOfRightDetail;
    }
    static getDetailModalSelf({ app, ui }) {
        const screenMode = Ui_1.default.getScreenMode(ui.width);
        const display = screenMode === Ui_1.default.screenModeLargeLabel ? "none" : "block";
        const left = screenMode === Ui_1.default.screenModeSmallLabel ? "0px" : Menu_1.default.baseWidth;
        const background = ui.extensionMode === Ui_1.default.extensionModeExtBottomLabel ? Container_1.default.reliefRGB : Container_1.default.reliefRGB;
        const height = DetailModal_1.default.getHeight({ app, ui });
        const layout = index_1.default.getLayoutBlock({
            display,
            position: "fixed",
            top: "100%",
            left,
            width: DetailModal_1.default.getWidth({ app, ui }, false),
            height,
            margin: DetailModal_1.default.getMargin({ app, ui }),
            background,
            border: Container_1.default.border,
            borderRadius: Container_1.default.radiuses,
            WebkitOverflowScrolling: "touch",
            zIndex: 1
        });
        const content = index_1.default.getContentBase();
        const animation = index_1.default.getAnimationBase({
            transform: DetailModal_1.default.getTransform({ app, ui }),
            transition: Container_1.default.getTransition({ app, ui })
        });
        return index_1.default.get({ layout, content, animation });
    }
    static getDetailRightSelf({ app, ui }) {
        const layout = index_1.default.getLayoutBlock({
            position: "fixed",
            top: "0px",
            right: "0px",
            width: DetailRight_1.default.getWidth({ app, ui }),
            minWidth: DetailRight_1.default.getWidth({ app, ui }),
            height: `calc( 100% - ${Header_1.default.headerHeight}px )`,
            WebkitOverflowScrolling: "touch",
            background: Container_1.default.calmRGB,
            overflow: "hidden",
            margin: `${Header_1.default.headerHeight}px 0px 0px 0px`,
            zIndex: 0
        });
        const content = index_1.default.getContentBase();
        const animation = index_1.default.getAnimationBase({
            transition: "0ms"
        });
        return index_1.default.get({ layout, content, animation });
    }
    static getFooterBorders({ app, ui }) {
        switch (ui.screenMode) {
            case Ui_1.default.screenModeSmallLabel:
            case Ui_1.default.screenModeMiddleLabel:
                return { borderTop: Container_1.default.border };
            case Ui_1.default.screenModeLargeLabel:
                return { borderTop: Container_1.default.border, borderLeft: Container_1.default.border };
        }
    }
    static getFooterPositions({ app, ui }) {
        switch (ui.screenMode) {
            case Ui_1.default.screenModeSmallLabel:
                return {};
            case Ui_1.default.screenModeMiddleLabel:
            case Ui_1.default.screenModeLargeLabel:
                return {
                    position: "absolute",
                    right: "0px",
                    bottom: "0px"
                };
        }
    }
    static getWidth({ app, ui }, addUnit = false) {
        let width = "100%";
        switch (ui.screenMode) {
            case Ui_1.default.screenModeLargeLabel:
                width = "30%";
        }
        return addUnit ? width : index_1.default.trimUnit(width);
    }
    static getTransform({ app, ui }) {
        return Detail.getDetailClass({ app, ui }).getTransform({ app, ui });
    }
    static getHeader({ app, ui }) {
        const layout = index_1.default.getLayoutFlex({
            width: "100%",
            height: Header_1.default.headerHeight,
            maxHeight: Header_1.default.headerHeight,
            borderBottom: Container_1.default.border,
            background: Container_1.default.whiteRGB,
            padding: "0px 20px"
        });
        const content = index_1.default.getContentBase({});
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getHeaderP({ app, ui }) {
        const layout = index_1.default.getLayoutBlock({
            width: "100%",
            height: "auto",
            maxHeight: Header_1.default.headerHeight
        });
        const content = index_1.default.getContentBase({
            lineHeight: "1.8",
            fontSize: "16px",
            textOverflow: "ellipsis"
        });
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getBody({ app, ui }) {
        const layout = index_1.default.getLayoutBlock({
            overflowX: "hidden",
            overflowY: "scroll",
            width: "100%",
            height: `calc( 100% - ${Header_1.default.headerHeight * 2}px )`,
            background: Container_1.default.reliefRGBA,
            zIndex: 0
        });
        const content = index_1.default.getContentBase();
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getMeta({ app, ui }) {
        const layout = index_1.default.getLayoutBlock({
            width: "100%",
            height: "initial",
            background: Container_1.default.offWhiteRGBA,
            borderBottom: Container_1.default.border
        });
        const content = index_1.default.getContentBase();
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getImg({ app, ui }) {
        const layout = index_1.default.getLayoutBlock({
            width: "100%",
            height: "30vh",
            maxHeight: "400px",
            backgroundColor: Container_1.default.whiteRGB,
            backgroundImage: `url(//${conf_1.default.assetsImgPath}talkn_logo1.png)`,
            backgroundPosition: "center center",
            backgroundSize: "60%",
            backgroundRepeat: "no-repeat"
        });
        const content = index_1.default.getContentBase();
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getDescription({ app, ui }) {
        const layout = index_1.default.getLayoutBlock({
            width: "90%",
            height: "initial",
            margin: `7%`
        });
        const content = index_1.default.getContentBase({
            lineHeight: 2,
            fontSize: "16px",
            textAlign: "left"
        });
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getMetaContentTypeWrap({ app, ui }) {
        const layout = index_1.default.getLayoutFlex({
            flexDirection: "column",
            alignItems: "flex-end",
            width: "initial",
            height: "initial",
            borderRadius: "10px",
            margin: `${Detail.margin * 2}% ${Detail.margin}%`
        });
        const content = index_1.default.getContentBase({
            fontsize: "14px",
            textAlign: "right"
        });
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getMetaContentType({ app, ui }) {
        const layout = index_1.default.getLayoutBlock({
            background: Container_1.default.reliefRGB,
            width: "initial",
            height: "initial",
            margin: "10px 0px",
            padding: "10px 20px 10px 20px",
            justifyContent: "flex-end",
            borderRadius: "30px"
        });
        const content = index_1.default.getContentBase({
            fontSize: "12px",
            color: Container_1.default.whiteRGB,
            textAlign: "right"
        });
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getCh({ app, ui }) {
        const layout = index_1.default.getLayoutBlock({
            width: "100%",
            height: "initial",
            background: Container_1.default.offWhiteRGBA,
            borderTop: Container_1.default.border,
            borderBottom: Container_1.default.border,
            padding: "15px",
            margin: "0px 0px 45px 0px"
        });
        const content = index_1.default.getContentBase({
            fontSize: "14px",
            textAlign: "left",
            lineHeight: "30px",
            wordBreak: "break-word"
        });
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getAnalyze({ app, ui }) {
        const layout = index_1.default.getLayoutTable({
            width: "100%",
            height: "initial",
            background: Container_1.default.whiteRGB,
            borderTop: Container_1.default.border,
            borderBottom: Container_1.default.border
        });
        const content = index_1.default.getContentBase({
            textAlign: "center"
        });
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getAnalyzeRow({ app, ui }) {
        const layout = index_1.default.getLayoutTableRow({});
        const content = index_1.default.getContentBase({});
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getAnalyzeCol({ app, ui }) {
        const layout = index_1.default.getLayoutTableCol({
            width: "33.3%",
            height: "120px",
            verticalAlign: "middle",
            margin: "40px auto 40px auto"
        });
        const content = index_1.default.getContentBase({});
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getAnalyzeLabel({ app, ui }) {
        const layout = index_1.default.getLayoutBlock({
            width: "initial",
            height: "initial",
            marginBottom: "20px"
        });
        const content = index_1.default.getContentBase({
            lineHeight: "14px",
            fontSize: "12px"
        });
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getAnalyzeValue({ app, ui }) {
        const layout = index_1.default.getLayoutBlock({
            margin: "0 auto",
            width: "initial",
            height: "initial"
        });
        const content = index_1.default.getContentBase({
            fontSize: "1.8em",
            color: Container_1.default.themeRGBA
        });
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getAnalyzeHr({ app, ui }) {
        const layout = index_1.default.getLayoutBlock({
            width: "70%",
            height: "initial",
            margin: "10px auto 10px auto",
            borderTop: `1px solid ${Container_1.default.borderRGB}`
        });
        const content = index_1.default.getContentBase({});
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getH1s({ app, ui }) {
        const layout = index_1.default.getLayoutBlock({
            width: "100%",
            height: "initial",
            margin: `${Detail.margin}px auto`,
            background: Container_1.default.whiteRGB,
            borderTop: Container_1.default.border,
            borderBottom: Container_1.default.border
        });
        const content = index_1.default.getContentBase({
            textAlign: "left"
        });
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getH1sLi({ app, ui }) {
        const layout = index_1.default.getLayoutBlock({
            width: "90%",
            height: "initial",
            margin: `5px ${Detail.margin}% 5px ${Detail.margin}%`
        });
        const content = index_1.default.getContentBase({
            fontSize: "14px",
            lineHeight: 2,
            textAlign: "left"
        });
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getFooter({ app, ui }) {
        const positions = Detail.getFooterPositions({ app, ui });
        const borders = Detail.getFooterBorders({ app, ui });
        const layout = index_1.default.getLayoutFlex(Object.assign(Object.assign({ width: "100%", background: Container_1.default.offWhiteRGB, height: Header_1.default.headerHeight, zÎndex: "1px" }, positions), borders));
        const content = index_1.default.getContentBase();
        const animation = index_1.default.getAnimationBase({
            transform: "translate3d(0px, 0px, 0px)"
        });
        return index_1.default.get({ layout, content, animation });
    }
    static getFooterChild({ app, ui }) {
        const layout = index_1.default.getLayoutBlock({
            flexGrow: 1,
            height: "100%"
        });
        const content = index_1.default.getContentBase({
            fontSize: "0.5em",
            cursor: "pointer"
        });
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getFooterChildLike({ app, ui }) {
        const layout = index_1.default.getLayoutBlock({
            flexGrow: 1,
            height: "100%"
        });
        const content = index_1.default.getContentBase({
            fontSize: "0.5em"
        });
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getFooterChildMoney({ app, ui }) {
        const layout = index_1.default.getLayoutBlock({
            flexGrow: 1,
            height: "100%"
        });
        const content = index_1.default.getContentBase({
            fontSize: "0.5em"
        });
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getFooterChildShare({ app, ui }) {
        const layout = index_1.default.getLayoutBlock({
            flexGrow: 1,
            height: "100%"
        });
        const content = index_1.default.getContentBase({
            fontSize: "0.5em"
        });
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getMetaItems({ app, ui }) {
        const layout = index_1.default.getLayoutFlex({
            width: "90%",
            margin: `${Detail.margin}%`
        });
        const content = index_1.default.getContentBase({});
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getUpdateWrap({ app, ui }) {
        const layout = index_1.default.getLayoutFlex({
            justifyContent: "flex-end",
            alignItems: "flex-end",
            margin: "0px 0px 30px 0px"
        });
        const content = index_1.default.getContentBase({});
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getUpdate({ app, ui }) {
        const layout = index_1.default.getLayoutFlex({
            width: "160px",
            borderRadius: "30px",
            background: Container_1.default.themeRGBA
        });
        const content = index_1.default.getContentBase({
            textIndent: "15px",
            cursor: "pointer",
            fontSize: "12px",
            color: Container_1.default.whiteRGB
        });
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
}
exports.default = Detail;
//# sourceMappingURL=Detail.js.map