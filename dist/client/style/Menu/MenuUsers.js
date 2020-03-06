"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../index"));
const Container_1 = __importDefault(require("../Container"));
const Ui_1 = __importDefault(require("api/store/Ui"));
class MenuUsers {
    constructor(params) {
        const self = MenuUsers.getSelf(params);
        const columns = MenuUsers.getColumns(params);
        const column = MenuUsers.getColumn(params);
        const columnLast = MenuUsers.getColumnLast(params);
        const img = MenuUsers.getImg(params);
        const wrap = MenuUsers.getWrap(params);
        const imgWrap = MenuUsers.getImgWrap(params);
        const names = MenuUsers.getNames(params);
        const namesAddCh = MenuUsers.getNamesAddCh(params);
        return {
            self,
            columns,
            column,
            columnLast,
            img,
            imgWrap,
            wrap,
            names,
            namesAddCh
        };
    }
    static getWidth({ app, ui }, addUnit = false) {
        let width = "0";
        switch (ui.screenMode) {
            case Ui_1.default.screenModeSmallLabel:
                width = "100.0%";
                break;
            case Ui_1.default.screenModeMiddleLabel:
                width = "300px";
                break;
            case Ui_1.default.screenModeLargeLabel:
                width = "300px";
                break;
        }
        return addUnit ? index_1.default.trimUnit(width) : width;
    }
    static getTransform({ app, ui }) {
        let transform = "translate3d( 0px ,0px, 0px )";
        switch (ui.screenMode) {
            case Ui_1.default.screenModeSmallLabel:
                transform = "translate3d( 0px ,0px, 0px )";
                break;
            case Ui_1.default.screenModeMiddleLabel:
                transform = app.isOpenDetail ? `translate3d( 0px ,0px, 0px )` : "translate3d( 0px ,0px, 0px )";
                break;
            case Ui_1.default.screenModeLargeLabel:
                transform = "translate3d( 0px ,0px, 0px )";
                break;
        }
        return transform;
    }
    static getSelf({ app, ui }) {
        const layout = index_1.default.getLayoutInlineBlock({
            position: "relative",
            width: MenuUsers.getWidth({ app, ui }),
            minWidth: MenuUsers.getWidth({ app, ui }),
            maxWidth: "inherit",
            height: "100%",
            WebkitOverflowScrolling: "touch",
            overflow: "scroll",
            borderTop: 0,
            borderRight: Container_1.default.border,
            borderBottom: 0,
            borderLeft: 0
        });
        const content = {};
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getColumns({ app, ui }) {
        const layout = index_1.default.getLayoutBlock({
            width: "inherit",
            minWidth: "inherit",
            maxWidth: "inherit",
            height: "auto",
            borderBottom: Container_1.default.border,
            borderRight: Container_1.default.border,
            background: Container_1.default.whiteRGB,
            overflow: "scroll"
        });
        const content = index_1.default.getContentBase({
            whiteSpace: "nowrap"
        });
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getColumn({ app, ui }) {
        const layout = index_1.default.getLayoutBlock({
            width: "inherit",
            minWidth: "inherit",
            maxWidth: "inherit",
            borderBottom: Container_1.default.border,
            borderRight: Container_1.default.border
        });
        const content = index_1.default.getContentBase({
            letterSpacing: "2px",
            textAlign: "left",
            lineHeight: "60px",
            whiteSpace: "nowrap"
        });
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getColumnLast({ app, ui }) {
        const layout = index_1.default.getLayoutBlock({
            width: "inherit",
            minWidth: "inherit",
            maxWidth: "inherit",
            marginLeft: "20px"
        });
        const content = index_1.default.getContentBase({
            letterSpacing: "2px",
            textAlign: "left",
            lineHeight: "60px",
            whiteSpace: "nowrap"
        });
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getWrap({ app, ui }) {
        const layout = index_1.default.getLayoutFlex({
            width: "initial",
            height: "60px",
            minWidth: "initial",
            minHeight: "initial",
            borderRight: Container_1.default.border
        });
        const content = index_1.default.getContentBase({
            textAlign: "left",
            content: "getWrap"
        });
        const animation = index_1.default.getAnimationBase({});
        return index_1.default.get({ layout, content, animation });
    }
    static getImgWrap({ app, ui }) {
        const layout = index_1.default.getLayoutBlock({
            flexGrow: 1,
            margin: "22px 0px 0px 0px",
            width: "60px",
            maxWidth: "60px",
            minWidth: "60px",
            height: "60px"
        });
        const content = index_1.default.getContentBase({});
        const animation = index_1.default.getAnimationBase({});
        return index_1.default.get({ layout, content, animation });
    }
    static getImg({ app, ui }) {
        const layout = index_1.default.getLayoutInlineBlock({
            borderRadius: "50%",
            width: "34px",
            height: "34px"
        });
        const content = index_1.default.getContentBase({});
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getNamesAddCh({ app, ui }) {
        const layout = index_1.default.getLayoutBlock({
            padding: "5px 10px 5px 5px",
            flexGrow: 4
        });
        const content = index_1.default.getContentBase({
            fontSize: "12px",
            textAlign: "left",
            lineHeight: "2"
        });
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getNames({ app, ui }) {
        const layout = index_1.default.getLayoutBlock({
            flexGrow: 4
        });
        const content = index_1.default.getContentBase({
            fontSize: "12px",
            textAlign: "left",
            lineHeight: "1.7"
        });
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
}
exports.default = MenuUsers;
//# sourceMappingURL=MenuUsers.js.map