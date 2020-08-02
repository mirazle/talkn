"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Ui_1 = __importDefault(require("client/store/Ui"));
const Detail_1 = __importDefault(require("./Detail"));
const DetailRight_1 = __importDefault(require("./DetailRight"));
const DetailModal_1 = __importDefault(require("./DetailModal"));
class DetailFooter {
    constructor(params) {
        const { app, ui } = params;
        const DetailClass = Detail_1.default.getDetailClass({ app, ui });
        const self = DetailClass.getFooter(params);
        const child = DetailClass.getFooterChild(params);
        const childLike = DetailClass.getFooterChildLike(params);
        const childMoney = DetailClass.getFooterChildMoney(params);
        const childShare = DetailClass.getFooterChildShare(params);
        return {
            self,
            child,
            childLike,
            childMoney,
            childShare
        };
    }
    static getDetailClass({ app, ui }) {
        return ui.screenMode === Ui_1.default.screenModeSmallLabel ? DetailModal_1.default : DetailRight_1.default;
    }
    static get padding() {
        return 20;
    }
    static get margin() {
        return 5;
    }
    static getWidth({ app, ui }, addUnit = false) {
        switch (ui.screenMode) {
            case Ui_1.default.screenModeSmallLabel:
                return "100%";
            case Ui_1.default.screenModeMiddleLabel:
            case Ui_1.default.screenModeLargeLabel:
                return Detail_1.default.getDetailClass({ app, ui }).getWidth({ app, ui }, addUnit);
        }
    }
}
exports.default = DetailFooter;
//# sourceMappingURL=DetailFooter.js.map