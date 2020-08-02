"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
const Container_1 = __importDefault(require("./Container"));
const Ui_1 = __importDefault(require("client/store/Ui"));
const Posts_1 = __importDefault(require("./Posts"));
const Detail_1 = __importDefault(require("./Detail"));
const Menu_1 = __importDefault(require("./Menu"));
class DetailModal {
    static getWidth({ app, ui }, addUnit = false) {
        const width = ui.screenMode === Ui_1.default.screenModeSmallLabel
            ? String(Math.floor(ui.width * Container_1.default.widthRatio)) + "px"
            : `calc( ${100 * Container_1.default.widthRatio}% - ${Menu_1.default.getWidth({ app, ui })} )`;
        return addUnit ? index_1.default.trimUnit(width) : width;
    }
    static getBaseMarginRate({ app, ui }, addUnit = false) {
        return Math.floor(((1 - Container_1.default.widthRatio) / 2) * 100);
    }
    static getBaseMargin({ app, ui }, addUnit = false) {
        return Posts_1.default.getWidth({ app, ui }, true) * (DetailModal.getBaseMarginRate({ app, ui }) / 100);
    }
    static getMargin({ app, ui }, addUnit = false) {
        if (ui.extensionMode === Ui_1.default.extensionModeExtBottomLabel) {
            return "0% 8%";
        }
        else {
            switch (ui.screenMode) {
                case Ui_1.default.screenModeSmallLabel:
                case Ui_1.default.screenModeMiddleLabel:
                case Ui_1.default.screenModeLargeLabel:
                    const marginRate = DetailModal.getBaseMarginRate({ app, ui });
                    return `0% ${marginRate}% 0% ${marginRate}%`;
            }
        }
    }
    static getHeight({ app, ui }, addUnit = false) {
        const marginRate = DetailModal.getBaseMarginRate({ app, ui });
        const blockSize = Container_1.default.getBlockSize({ app, ui });
        switch (ui.screenMode) {
            case Ui_1.default.screenModeSmallLabel:
                return `calc( ${100 - marginRate}% - ${blockSize * 2}px )`;
            case Ui_1.default.screenModeMiddleLabel:
                return `calc( ${100 - marginRate}% - ${blockSize * 2}px )`;
            case Ui_1.default.screenModeLargeLabel:
                const baseMargin = DetailModal.getBaseMargin({ app, ui });
                return `calc( 100% - ${blockSize * 2 + baseMargin}px )`;
        }
    }
    static getTransform({ app, ui }) {
        return ui.isOpenDetail
            ? DetailModal.getOpenSelfTransform({ app, ui })
            : DetailModal.getCloseSelfTransform({ app, ui });
    }
    static getCloseSelfTransform({ app, ui }) {
        return `translate3d(0%, 0px, 0px)`;
    }
    static getOpenSelfTransform({ app, ui }) {
        return `translate3d(0%, calc( -100% - ${Container_1.default.getBlockSize({ app, ui })}px ), 0px)`;
    }
    static getHeader(params) {
        return Detail_1.default.getHeader(params);
    }
    static getHeaderP(params) {
        return Detail_1.default.getHeaderP(params);
    }
    static getBody(params) {
        return Detail_1.default.getBody(params);
    }
    static getMeta(params) {
        return Detail_1.default.getMeta(params);
    }
    static getImg(params) {
        return Detail_1.default.getImg(params);
    }
    static getDescription(params) {
        return Detail_1.default.getDescription(params);
    }
    static getMetaContentTypeWrap(params) {
        return Detail_1.default.getMetaContentTypeWrap(params);
    }
    static getMetaContentType(params) {
        return Detail_1.default.getMetaContentType(params);
    }
    static getCh(params) {
        return Detail_1.default.getCh(params);
    }
    static getAnalyze(params) {
        return Detail_1.default.getAnalyze(params);
    }
    static getAnalyzeRow(params) {
        return Detail_1.default.getAnalyzeRow(params);
    }
    static getAnalyzeCol(params) {
        return Detail_1.default.getAnalyzeCol(params);
    }
    static getAnalyzeLabel(params) {
        return Detail_1.default.getAnalyzeLabel(params);
    }
    static getAnalyzeValue(params) {
        return Detail_1.default.getAnalyzeValue(params);
    }
    static getAnalyzeHr(params) {
        return Detail_1.default.getAnalyzeHr(params);
    }
    static getH1s(params) {
        return Detail_1.default.getH1s(params);
    }
    static getH1sLi(params) {
        return Detail_1.default.getH1sLi(params);
    }
    static getFooter(params) {
        return Detail_1.default.getFooter(params);
    }
    static getFooterChild(params) {
        return Detail_1.default.getFooterChild(params);
    }
    static getFooterChildLike(params) {
        return Detail_1.default.getFooterChildLike(params);
    }
    static getFooterChildMoney(params) {
        return Detail_1.default.getFooterChildMoney(params);
    }
    static getFooterChildShare(params) {
        return Detail_1.default.getFooterChildShare(params);
    }
    static getMetaItems(params) {
        return Detail_1.default.getMetaItems(params);
    }
    static getUpdateWrap(params) {
        return Detail_1.default.getUpdateWrap(params);
    }
    static getUpdate(params) {
        return Detail_1.default.getUpdate(params);
    }
    static getSpace(params) {
        return Detail_1.default.getSpace(params);
    }
}
exports.default = DetailModal;
//# sourceMappingURL=DetailModal.js.map