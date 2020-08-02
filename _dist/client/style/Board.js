"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = __importDefault(require("api/store/App"));
const Ui_1 = __importDefault(require("client/store/Ui"));
const index_1 = __importDefault(require("./index"));
const Container_1 = __importDefault(require("./Container"));
const Detail_1 = __importDefault(require("./Detail"));
const Menu_1 = __importDefault(require("./Menu"));
class Board {
    constructor(params) {
        const self = Board.getSelf(params);
        const menu = Board.getMenu(params);
        const menuUl = Board.getMenuUl(params);
        const menuLi = Board.getMenuLi(params);
        const menuLiChild = Board.getMenuLiChild(params);
        const menuLiBubble = Board.getMenuLiBubble(params);
        const menuLiLinks = Board.getMenuLiLinks(params);
        const menuToggle = Board.getMenuToggle(params);
        const links = Board.getLinks(params);
        const linksUl = Board.getLinksUl(params);
        const linksLi = Board.getLinksLi(params);
        const linksLiActive = Board.getLinksLiActive(params);
        const linksLiUnactive = Board.getLinksLiUnactive(params);
        const linksTuneLi = Board.getLinksTuneLi(params);
        const linkMenuUl = Board.getLinkMenuUl(params);
        const linkMenuLi = Board.getLinkMenuLi(params);
        const linksTabActive = Board.getLinksTabActive(params);
        const linksTabUnactive = Board.getLinksTabUnactive(params);
        const linksTabLast = Board.getLinksTabLast(params);
        return {
            self,
            menu,
            menuUl,
            menuLi,
            menuLiChild,
            menuLiBubble,
            menuLiLinks,
            menuToggle,
            links,
            linksUl,
            linksLi,
            linksLiActive,
            linksLiUnactive,
            linksTuneLi,
            linkMenuUl,
            linkMenuLi,
            linksTabActive,
            linksTabUnactive,
            linksTabLast,
        };
    }
    static get tuneSize() {
        return 50;
    }
    static get size() {
        return 54;
    }
    static get padding() {
        return 5;
    }
    static get right() {
        return 0;
    }
    static get activeColor() {
        return Container_1.default.themeRGB;
    }
    static get unactiveColor() {
        return Container_1.default.fontBaseRGB;
    }
    static get typesMain() {
        return "MAIN";
    }
    static get typesLink() {
        return "LINK";
    }
    static get typesSub() {
        return "SUB";
    }
    static getType({ app, ui }) {
        switch (app.dispThreadType) {
            case App_1.default.dispThreadTypeMulti:
            case App_1.default.dispThreadTypeSingle:
                return Board.typesMain;
            default:
                if (!app.isRootCh && app.isLinkCh) {
                    return Board.typesLink;
                }
                else {
                    return Board.typesSub;
                }
        }
    }
    static getTotalWidth({ app, ui }) {
        return Board.size + Board.padding * 2 + Board.right;
    }
    static getSelfTop({ app, ui }) {
        return "55px";
    }
    static getSelfWidth({ app, ui }, addUnit = false) {
        let width = "93%";
        if (ui.isOpenLinks) {
            if (ui.extensionMode === Ui_1.default.extensionModeExtBottomLabel) {
                width = "93%";
            }
            else {
                switch (ui.screenMode) {
                    case Ui_1.default.screenModeSmallLabel:
                        return "93%";
                    case Ui_1.default.screenModeMiddleLabel:
                        return `calc(97% - ${Menu_1.default.getWidth({ app, ui }, false)})`;
                    case Ui_1.default.screenModeLargeLabel:
                        width = `calc( ${97 - Detail_1.default.getWidth({ app, ui }, false)}% - ${Menu_1.default.getWidth({ app, ui }, false)} )`;
                        break;
                }
            }
        }
        else {
            width = Board.getTotalWidth({ app, ui }) + "px";
        }
        return addUnit ? index_1.default.trimUnit(width) : width;
    }
    static getSelfHeight({ app, ui }) {
        if (ui.isOpenBoard) {
            const type = Board.getType({ app, ui });
            switch (type) {
                case Board.typesMain:
                    return "237px";
                case Board.typesLink:
                    return "178px";
                case Board.typesSub:
                    return "118px";
                default:
                    return "0px";
            }
        }
        else {
            return "60px";
        }
    }
    static getSelfBorderRadius({ app, ui }) {
        return "10px 0px 0px 10px";
    }
    static getSelfBackground({ app, ui }) {
        return ui.isOpenBoard ? Container_1.default.lightRGBA : Container_1.default.whiteRGBA;
    }
    static getSelfRight({ app, ui }, addUnit = false) {
        const right = ui.screenMode === Ui_1.default.screenModeLargeLabel
            ? `calc( ${Detail_1.default.getWidth({ app, ui }, true)} + ${Board.right}px )`
            : `${Board.right}px`;
        return addUnit ? right : index_1.default.trimUnit(right);
    }
    static getSelfBoxShadow({ app, ui }, addUnit = false) {
        return ui.isOpenLinks ? "rgb(220, 220, 220) 0px 0px 5px" : "rgb(220, 220, 220) 0px 0px 5px";
    }
    static getLinksDisplay({ app, ui }) {
        return ui.isOpenLinks ? "flex" : "none";
    }
    static getSelf({ app, ui }) {
        const width = Board.getSelfWidth({ app, ui });
        const height = Board.getSelfHeight({ app, ui });
        const borderRadius = Board.getSelfBorderRadius({ app, ui });
        const background = Board.getSelfBackground({ app, ui });
        const right = Board.getSelfRight({ app, ui }, true);
        const boxShadow = Board.getSelfBoxShadow({ app, ui });
        const layout = index_1.default.getLayoutFlex({
            position: "fixed",
            top: Board.getSelfTop({ app, ui }),
            overflow: "hide",
            right,
            height,
            width,
            padding: "5px",
            background,
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "flex-end",
            boxShadow,
            borderRadius,
            zIndex: 3,
        });
        const content = {};
        const animation = index_1.default.getAnimationBase({
            transition: Container_1.default.getTransitionFirstOn({ app, ui }),
        });
        return index_1.default.get({ layout, content, animation });
    }
    static getMenu({ app, ui }) {
        const layout = index_1.default.getLayoutFlex({
            width: Board.getTotalWidth({ app, ui }) + "px",
            height: "100%",
            flexDirection: "column",
            alignItems: "flex-end",
        });
        const content = {};
        const animation = {};
        return index_1.default.get({ layout, content, animation });
    }
    static getMenuUl({ app, ui }) {
        const layout = index_1.default.getLayoutFlex({
            height: "100%",
            width: "100%",
            justifyContent: "flex-start",
            alignItems: "flex-end",
            flexDirection: "column",
        });
        const content = {};
        const animation = index_1.default.getAnimationBase({
            transition: Container_1.default.getTransition({ app, ui }),
        });
        return index_1.default.get({ layout, content, animation });
    }
    static getMenuLi({ app, ui }) {
        const size = Board.size + "px";
        const layout = index_1.default.getLayoutFlex({
            flexDirection: "column",
            width: size,
            height: size,
            minWidth: size,
            minHeight: size,
            maxWidth: size,
            maxHeight: size,
            background: Container_1.default.whiteRGBA,
            borderRadius: "5px",
            marginBottom: "5px",
        });
        const content = index_1.default.getContentBase({
            fontSize: "0.7em",
            letterSpacing: "1px",
            lineHeight: "17px",
        });
        const animation = index_1.default.getAnimationBase({
            transition: Container_1.default.getTransition({ app, ui }),
        });
        return index_1.default.get({ layout, content, animation });
    }
    static getMenuLiChild({ app, ui }) {
        const color = App_1.default.isActiveMultistream({ app, ui }, "getLiChild") ? Board.activeColor : Board.unactiveColor;
        const layout = {};
        const content = index_1.default.getContentBase({
            color,
        });
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getMenuLiBubble({ app, ui }) {
        const color = ui.isBubblePost ? Board.activeColor : Board.unactiveColor;
        const layout = {};
        const content = index_1.default.getContentBase({
            color,
        });
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getMenuLiLinks({ app, ui }) {
        const bgColor = Container_1.default.themeRGB;
        const layout = {};
        const content = index_1.default.getContentBase({
            color: bgColor,
        });
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getMenuToggle({ app, ui }) {
        const size = Board.size - 4 + "px";
        const layout = index_1.default.getLayoutFlex({
            width: size,
            height: size,
            minHeight: size,
            maxHeight: size,
        });
        const content = {};
        const animation = index_1.default.getAnimationBase({
            transition: Container_1.default.getTransition({ app, ui }),
        });
        return index_1.default.get({ layout, content, animation });
    }
    static getLinks({ app, ui }) {
        const display = Board.getLinksDisplay({ app, ui });
        const layout = index_1.default.getLayoutFlex({
            display,
            width: "100%",
            height: `calc( 100% )`,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            padding: "0px 3px 0px 0px",
        });
        const content = index_1.default.getContentBase({});
        const animation = {};
        return index_1.default.get({ layout, content, animation });
    }
    static getLinksUl({ app, ui }) {
        const layout = index_1.default.getLayoutFlex({
            height: "100%",
            width: "100%",
            justifyContent: "flex-start",
            alignItems: "flex-end",
            flexDirection: "column",
            overflow: "scroll",
            overflowScrolling: "touch",
            WebkitOverflowScrolling: "touch",
        });
        const content = {};
        const animation = index_1.default.getAnimationBase({
            transition: Container_1.default.getTransition({ app, ui }),
        });
        return index_1.default.get({ layout, content, animation });
    }
    static getLinksLi({ app, ui }) {
        const size = Board.size + "px";
        const layout = index_1.default.getLayoutFlex({
            alignItems: "flex-start",
            flexDirection: "column",
            width: "100%",
            height: size,
            minHeight: size,
            maxHeight: size,
            background: Container_1.default.whiteRGBA,
            borderRadius: "5px",
            padding: "0px 0px 0px 10px",
            marginBottom: "5px",
        });
        const content = index_1.default.getContentBase({
            cursor: "pointer",
            lineHeight: "17px",
        });
        const animation = index_1.default.getAnimationBase({
            transition: Container_1.default.getTransition({ app, ui }),
        });
        return index_1.default.get({ layout, content, animation });
    }
    static getLinksLiActive({ app, ui }) {
        const styles = Board.getLinksLi({ app, ui });
        styles.background = Container_1.default.whiteRGB;
        styles.color = Container_1.default.fontBaseRGB;
        return styles;
    }
    static getLinksLiUnactive({ app, ui }) {
        const styles = Board.getLinksLi({ app, ui });
        styles.background = Container_1.default.calmRGB;
        styles.color = Container_1.default.fontBaseRGB;
        return styles;
    }
    static getLinksTuneLi({ app, ui }) {
        const styles = Board.getLinksLi({ app, ui });
        styles.alignItems = "center";
        return styles;
    }
    static getLinkMenuUl({ app, ui }) {
        const size = Board.size + "px";
        const layout = index_1.default.getLayoutFlex({
            minHeight: size,
            height: size,
            width: "100%",
            justifyContent: "flex-start",
            alignItems: "flex-end",
            flexDirection: "row",
        });
        const content = {};
        const animation = index_1.default.getAnimationBase({
            transition: Container_1.default.getTransition({ app, ui }),
        });
        return index_1.default.get({ layout, content, animation });
    }
    static getLinkMenuLi({ app, ui }) {
        const size = Board.size - 4 + "px";
        const layout = index_1.default.getLayoutFlex({
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            flexGrow: 1,
            margin: "5px 1% 0px 0px",
            height: size,
            minHeight: size,
            maxHeight: size,
            background: Container_1.default.reliefRGB,
            borderRadius: "5px",
        });
        const content = index_1.default.getContentBase({
            cursor: "pointer",
            color: Container_1.default.whiteRGB,
        });
        const animation = index_1.default.getAnimationBase({
            transition: Container_1.default.getTransition({ app, ui }),
        });
        return index_1.default.get({ layout, content, animation });
    }
    static getLinksTabActive({ app, ui }) {
        const styles = {};
        styles.background = Container_1.default.whiteRGBA;
        styles.color = Container_1.default.fontBaseRGB;
        return styles;
    }
    static getLinksTabUnactive({ app, ui }) {
        const styles = Board.getLinkMenuLi({ app, ui });
        return styles;
    }
    static getLinksTabLast({ app, ui }) {
        const styles = {};
        styles.margin = "5px 0px 0px 0px";
        return styles;
    }
}
exports.default = Board;
//# sourceMappingURL=Board.js.map