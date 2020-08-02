"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Container_1 = __importDefault(require("./Container"));
const Detail_1 = __importDefault(require("./Detail"));
const DetailFooter_1 = __importDefault(require("./DetailFooter"));
const EmotionGraph_1 = __importDefault(require("./EmotionGraph"));
const Header_1 = __importDefault(require("./Header"));
const Footer_1 = __importDefault(require("./Footer"));
const PostsSupporter_1 = __importDefault(require("./PostsSupporter"));
const PostsFooter_1 = __importDefault(require("./PostsFooter"));
const MenuFooter_1 = __importDefault(require("./MenuFooter"));
const Icon_1 = __importDefault(require("./Icon"));
const Menu_1 = __importDefault(require("./Menu"));
const Ranks_1 = __importDefault(require("./Menu/Ranks"));
const Ch_1 = __importDefault(require("./Menu/common/Ch"));
const MenuUsers_1 = __importDefault(require("./Menu/MenuUsers"));
const LockMenu_1 = __importDefault(require("./LockMenu"));
const Posts_1 = __importDefault(require("./Posts"));
const Post_1 = __importDefault(require("./Post"));
const TimeMarker_1 = __importDefault(require("./TimeMarker"));
const InnerNotif_1 = __importDefault(require("./InnerNotif"));
const Audio_1 = __importDefault(require("./Media/Audio"));
const Video_1 = __importDefault(require("./Media/Video"));
const Notif_1 = __importDefault(require("./Notif"));
const Board_1 = __importDefault(require("./Board"));
const Links_1 = __importDefault(require("./Links"));
const Link_1 = __importDefault(require("./Link"));
const Loading_1 = __importDefault(require("./Loading"));
const ExtScreen_1 = __importDefault(require("./ExtScreen"));
class Style {
    constructor(params) {
        const container = new Container_1.default(params);
        const header = new Header_1.default(params);
        const footer = new Footer_1.default(params);
        const postsSupporter = new PostsSupporter_1.default(params);
        const postsFooter = new PostsFooter_1.default(params);
        const menuFooter = new MenuFooter_1.default(params);
        const menu = new Menu_1.default(params);
        const ranks = new Ranks_1.default(params);
        const ch = new Ch_1.default(params);
        const menuUsers = new MenuUsers_1.default(params);
        const extScreen = new ExtScreen_1.default(params);
        const lockMenu = new LockMenu_1.default(params);
        const posts = new Posts_1.default(params);
        const post = new Post_1.default(params);
        const timeMarker = new TimeMarker_1.default(params);
        const notif = new Notif_1.default(params);
        const board = new Board_1.default(params);
        const links = new Links_1.default(params);
        const link = new Link_1.default(params);
        const audio = new Audio_1.default(params);
        const video = new Video_1.default(params);
        const innerNotif = new InnerNotif_1.default(params);
        const detail = new Detail_1.default(params);
        const detailFooter = new DetailFooter_1.default(params);
        const emotionGraph = new EmotionGraph_1.default(params);
        const icon = new Icon_1.default(params);
        const loading = new Loading_1.default(params);
        return {
            container,
            header,
            footer,
            postsSupporter,
            postsFooter,
            menuFooter,
            detailFooter,
            menu,
            ranks,
            ch,
            menuUsers,
            extScreen,
            lockMenu,
            posts,
            post,
            timeMarker,
            notif,
            audio,
            video,
            board,
            links,
            link,
            innerNotif,
            detail,
            emotionGraph,
            icon,
            loading,
        };
    }
    static get fontBaseRGB() {
        return "rgb(130, 130, 130)";
    }
    static get darkLightRGB() {
        return "rgba(0, 0, 0, 0.2)";
    }
    static get darkLightRGBA() {
        return "rgba(0, 0, 0, 0.25)";
    }
    static get darkRGB() {
        return "rgb(0, 0, 0)";
    }
    static get darkRGBA() {
        return "rgba(0, 0, 0, 0.4)";
    }
    static get mono160RGB() {
        return "rgb(160, 160, 160)";
    }
    static get mono160RGBA() {
        return "rgb(160, 160, 160)";
    }
    static get mono180RGB() {
        return "rgb(180, 180, 180)";
    }
    static get mono192RGB() {
        return "rgb(192, 192, 192)";
    }
    static get mono200RGB() {
        return "rgb(200, 200, 200)";
    }
    static get mono205RGB() {
        return "rgb(205, 205, 205)";
    }
    static get mono210RGB() {
        return "rgb(210, 210, 210)";
    }
    static get mono211RGB() {
        return "rgb(211, 211, 211)";
    }
    static get mono215RGB() {
        return "rgb(215, 215, 215)";
    }
    static get mono220RGB() {
        return "rgb(220, 220, 220)";
    }
    static get mono225RGB() {
        return "rgb(225, 225, 225)";
    }
    static get mono230RGB() {
        return "rgb(230, 230, 230)";
    }
    static get mono235RGB() {
        return "rgb(235, 235, 235)";
    }
    static get mono240RGB() {
        return "rgb(240, 240, 240)";
    }
    static get mono245RGB() {
        return "rgb(245, 245, 245)";
    }
    static get mono250RGB() {
        return "rgb(250, 250, 250)";
    }
    static get mono251RGB() {
        return "rgb(251, 251, 251)";
    }
    static get mono252RGB() {
        return "rgb(252, 252, 252)";
    }
    static get mono253RGB() {
        return "rgb(253, 253, 253)";
    }
    static get mono254RGB() {
        return "rgb(254, 254, 254)";
    }
    static get mono255RGB() {
        return "rgb(255, 255, 255)";
    }
    static get mono180RGBA() {
        return "rgba(180, 180, 180, 0.96)";
    }
    static get mono192RGBA() {
        return "rgba(192, 192, 192, 0.96)";
    }
    static get mono200RGBA() {
        return "rgba(200, 200, 200, 0.96)";
    }
    static get mono205RGBA() {
        return "rgba(205, 205, 205, 0.96)";
    }
    static get mono210RGBA() {
        return "rgba(210, 210, 210, 0.96)";
    }
    static get mono211RGBA() {
        return "rgba(211, 211, 211, 0.96)";
    }
    static get mono215RGBA() {
        return "rgba(215, 215, 215, 0.96)";
    }
    static get mono220RGBA() {
        return "rgba(220, 220, 220, 0.96)";
    }
    static get mono225RGBA() {
        return "rgba(225, 225, 225, 0.96)";
    }
    static get mono230RGBA() {
        return "rgba(230, 230, 230, 0.96)";
    }
    static get mono235RGBA() {
        return "rgba(235, 235, 235, 0.96)";
    }
    static get mono240RGBA() {
        return "rgba(240, 240, 240, 0.96)";
    }
    static get mono245RGBA() {
        return "rgba(245, 245, 245, 0.96)";
    }
    static get mono250RGBA() {
        return "rgba(250, 250, 250, 0.96)";
    }
    static get mono252RGBA() {
        return "rgba(252, 252, 252, 0.96)";
    }
    static get mono255RGBA() {
        return "rgba(255, 255, 255, 0.96)";
    }
    static get twitterRGB() {
        return "rgba(76, 160, 235)";
    }
    static get twitterRGBA() {
        return "rgba(76, 160, 235, 0.96)";
    }
    static get facebookRGB() {
        return "rgba(73, 104, 173)";
    }
    static get facebookRGBA() {
        return "rgba(73, 104, 173, 0.96)";
    }
    static get emptyLabelStyle() {
        return { maxWidth: 0, maxHeight: 0 };
    }
    static get(styles = { layout: {}, content: {}, animation: {} }) {
        return { ...styles.layout, ...styles.content, ...styles.animation };
    }
    static getLayoutBase(style = {}) {
        const baseLayout = {
            display: "block",
            boxSizing: "border-box",
            overflow: "hidden",
            width: "inherit",
            height: "inherit",
            minWidth: "auto",
            minHeight: "auto",
            maxWidth: "inherit",
            maxHeight: "inherit",
            padding: 0,
            margin: 0,
            font: 0,
            lineHeight: 1,
            listStyle: "none",
            userSelect: "none",
            textDecoration: "none",
            verticalAlign: "baseline",
            borderCollapse: "collapse",
            borderSpacing: 0,
            border: 0,
            borderRadius: 0,
            zIndex: 1,
            align: "center",
        };
        return { ...baseLayout, ...style };
    }
    static getLayoutGrid(style = {}) {
        const blockLayout = Style.getLayoutBase({
            display: "grid",
        });
        return { ...blockLayout, ...style };
    }
    static getLayoutFlex(style = {}) {
        const blockLayout = Style.getLayoutBase({
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            flexWrap: "no-wrap",
        });
        return { ...blockLayout, ...style };
    }
    static getLayoutInlineFlex(style = {}) {
        const blockLayout = Style.getLayoutBase({
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            flexWrap: "no-wrap",
        });
        return { ...blockLayout, ...style };
    }
    static getLayoutTable(style = {}) {
        const blockLayout = Style.getLayoutBase({
            display: "table",
        });
        return { ...blockLayout, ...style };
    }
    static getLayoutTableRow(style = {}) {
        const blockLayout = Style.getLayoutBase({
            display: "table-row",
        });
        return { ...blockLayout, ...style };
    }
    static getLayoutTableCol(style = {}) {
        const blockLayout = Style.getLayoutBase({
            display: "table-cell",
        });
        return { ...blockLayout, ...style };
    }
    static getLayoutFlexChild(style = {}) {
        const blockLayout = Style.getLayoutBase({
            width: "auto",
            height: "auto",
        });
        return { ...blockLayout, ...style };
    }
    static getLayoutBlock(style = {}) {
        const blockLayout = Style.getLayoutBase({
            display: "block",
        });
        return { ...blockLayout, ...style };
    }
    static getLayoutInlineBlock(style = {}) {
        const inlineBlockLayout = Style.getLayoutBase({
            display: "inline-block",
            align: "center",
            verticalAlign: "middle",
        });
        return { ...inlineBlockLayout, ...style };
    }
    static getLayoutInline(style = {}) {
        const blockLayout = Style.getLayoutBase({
            display: "inline",
        });
        return { ...blockLayout, ...style };
    }
    static getContentBase(style = {}) {
        const contentBase = {
            wordWrap: "breakWord",
            whiteSpace: "normal",
            quotes: "none",
            content: "none",
            cursor: "default",
        };
        const fontBase = Style.getFontBase();
        return { ...contentBase, ...fontBase, ...style };
    }
    static getFontBase(style = {}) {
        const fontBase = {
            letterSpacing: "inherit",
            lineHeight: "inherit",
            textAlign: "center",
            color: Style.fontBaseRGB,
            fontWeight: 300,
            fontSize: "inherit",
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Hiragino Sans", "Noto Sans CJK JP", "Original Yu Gothic", "Yu Gothic", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Sans Emoji"',
        };
        return { ...fontBase, ...style };
    }
    static getAnimationBase(style = {}) {
        const animationBase = {
            transition: Container_1.default.transitionOff,
            transform: "translate3d(0px, 0px, 0px)",
        };
        return { ...animationBase, ...style };
    }
    static trimUnit(value) {
        return Number(value.toString().replace(/px|%|vw|vh|ms/, ""));
    }
}
exports.default = Style;
//# sourceMappingURL=index.js.map