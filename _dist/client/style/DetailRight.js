"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Ui_1 = __importDefault(require("client/store/Ui"));
const index_1 = __importDefault(require("./index"));
const Detail_1 = __importDefault(require("./Detail"));
class DetailRight {
    static get widthDecimalRate() {
        return 0.3;
    }
    static get widthRate() {
        return 100 * DetailRight.widthDecimalRate;
    }
    static get otherWidthDecimalRate() {
        return 1 - DetailRight.widthDecimalRate;
    }
    static get otherWidthRate() {
        return 100 * DetailRight.otherWidthDecimalRate;
    }
    static getWidth({ app, ui }, addUnit = false) {
        let width = "0";
        switch (ui.screenMode) {
            case Ui_1.default.screenModeSmallLabel:
                width = "0%";
                break;
            case Ui_1.default.screenModeMiddleLabel:
                width = "0%";
                break;
            case Ui_1.default.screenModeLargeLabel:
                width = "30%";
                break;
        }
        return addUnit ? index_1.default.trimUnit(width) : width;
    }
    static getMinWidth({ app, ui }, addUnit = false) {
        let width = "0";
        switch (ui.screenMode) {
            case Ui_1.default.screenModeSmallLabel:
                width = "0%";
                break;
            case Ui_1.default.screenModeMiddleLabel:
                width = "320px";
                break;
            case Ui_1.default.screenModeLargeLabel:
                width = "320px";
                break;
        }
        return addUnit ? index_1.default.trimUnit(width) : width;
    }
    static getTransform({ app, ui }) {
        let transform = DetailRight.closeSelfTransform;
        switch (ui.screenMode) {
            case Ui_1.default.screenModeSmallLabel:
                transform = DetailRight.closeSelfTransform;
                break;
            case Ui_1.default.screenModeMiddleLabel:
                transform = DetailRight.closeSelfTransform;
                break;
            case Ui_1.default.screenModeLargeLabel:
                transform = `translate3d(0px, 0px, 0px)`;
                break;
        }
        return transform;
    }
    static get closeSelfTransform() {
        return `translate3d(0%, calc( 100% + ${Detail_1.default.padding * 2}px ), 0px)`;
    }
    static get openSelfTransform() {
        return `translate3d(0%, 0%, 0px)`;
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
exports.default = DetailRight;
//# sourceMappingURL=DetailRight.js.map