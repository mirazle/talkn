"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = __importDefault(require("api/store/App"));
const index_1 = __importDefault(require("client/style/index"));
const Menu_1 = __importDefault(require("client/style/Menu"));
const LockMenu_1 = __importDefault(require("client/style/LockMenu"));
const Container_1 = __importDefault(require("client/style/Container"));
const Posts_1 = __importDefault(require("client/style/Posts"));
const Detail_1 = __importDefault(require("client/style/Detail"));
const DetailRight_1 = __importDefault(require("client/style/DetailRight"));
const DetailModal_1 = __importDefault(require("client/style/DetailModal"));
const Header_1 = __importDefault(require("client/style/Header"));
const Footer_1 = __importDefault(require("client/style/Footer"));
const MenuFooter_1 = __importDefault(require("client/style/MenuFooter"));
const PostsFooter_1 = __importDefault(require("client/style/PostsFooter"));
const Notif_1 = __importDefault(require("client/style/Notif"));
const InnerNotif_1 = __importDefault(require("client/style/InnerNotif"));
const ExtScreen_1 = __importDefault(require("client/style/ExtScreen"));
const PostsSupporter_1 = __importDefault(require("client/style/PostsSupporter"));
const Board_1 = __importDefault(require("client/style/Board"));
const Links_1 = __importDefault(require("client/style/Links"));
const Post_1 = __importDefault(require("client/style/Post"));
const Icon_1 = __importDefault(require("client/style/Icon"));
const Audio_1 = __importDefault(require("client/style/Media/Audio"));
const Video_1 = __importDefault(require("client/style/Media/Video"));
exports.default = (state = {}, action) => {
    switch (action.type) {
        case "RESIZE_START_WINDOW":
        case "RESIZE_END_WINDOW":
        case "ON_TRANSITION":
        case "OFF_TRANSITION":
        case "ON_TRANSITION_END":
            return new index_1.default(action);
        case "TOGGLE_DISP_MAIN":
            return Object.assign({}, state);
        case "ON_CLICK_MULTISTREAM":
            return Object.assign(Object.assign({}, state), { board: Object.assign(Object.assign({}, state.board), { menuLiChild: Object.assign(Object.assign({}, state.board.menuLiChild), { color: !action.app.isMediaCh && action.app.multistream ? Board_1.default.activeColor : Board_1.default.unactiveColor }) }) });
        case "COMPONENT_DID_MOUNTS":
            return Object.assign(Object.assign({}, state), { menus: Object.assign(Object.assign({}, state.menus), { self: Object.assign(Object.assign({}, state.menus), { transform: Menu_1.default.getTransform(action) }) }) });
        case "SERVER_TO_CLIENT[BROADCAST]:find":
            return Object.assign(Object.assign({}, state), { menus: Object.assign(Object.assign({}, state.menus), { self: Object.assign(Object.assign({}, state.menus), { transform: Menu_1.default.getTransform(action) }) }) });
        case "SERVER_TO_CLIENT[EMIT]:find":
        case "OPEN_LINKS":
        case "CLOSE_LINKS":
        case "TOGGLE_LINKS":
            return Object.assign(Object.assign({}, state), { menus: Object.assign(Object.assign({}, state.menus), { self: Object.assign(Object.assign({}, state.menus), { transform: Menu_1.default.getTransform(action) }) }), posts: Object.assign(Object.assign({}, state.posts), { self: Posts_1.default.getSelf(action) }), board: Object.assign(Object.assign({}, state.board), { self: Object.assign(Object.assign({}, state.board.self), { width: Board_1.default.getSelfWidth(action), height: Board_1.default.getSelfHeight(action), boxShadow: Board_1.default.getSelfBoxShadow(action) }), menuLiChild: Board_1.default.getMenuLiChild(action), menuLiLinks: Board_1.default.getMenuLiLinks(action) }), links: Object.assign(Object.assign({}, state.links), { self: Object.assign(Object.assign({}, state.links.self), { display: Links_1.default.getSelfDisplay(action) }), linksUl: Object.assign(Object.assign({}, state.links.linksUl), { overflowY: Links_1.default.getLinksUlOevrflowY(action) }) }), icon: Object.assign(Object.assign({}, state.icon), { thunder: Icon_1.default.getThunder(action), bubble: Icon_1.default.getBubble(action), links: Icon_1.default.getLinks(action) }) });
        case "TOGGLE_BUBBLE_POST":
            return Object.assign(Object.assign({}, state), { board: Object.assign(Object.assign({}, state.board), { menuLiBubble: Object.assign(Object.assign({}, state.board.menuLiBubble), { color: action.ui.isBubblePost ? Board_1.default.activeColor : Board_1.default.unactiveColor }) }), posts: Object.assign(Object.assign({}, state.posts), { self: Posts_1.default.getSelf(action), more: Posts_1.default.getMore(action) }), post: Object.assign(Object.assign({}, state.post), { self: Post_1.default.getSelf(action), upper: Post_1.default.getUpper(action), bottomPost: Post_1.default.getBottomPost(action) }) });
        case "TOGGLE_DISP_POSTS_SUPPORTER":
        case "CLOSE_DISP_POSTS_SUPPORTER":
            return Object.assign(Object.assign({}, state), { postsSupporter: Object.assign(Object.assign({}, state.postsSupporter), { self: Object.assign(Object.assign({}, state.postsSupporter.self), { transform: PostsSupporter_1.default.getTransform(action) }) }) });
        case "ON_CLICK_TO_TIMELINE_THREAD":
            return Object.assign(Object.assign({}, state), { posts: Object.assign(Object.assign({}, state.posts), { self: Posts_1.default.getSelf(action) }), board: Object.assign(Object.assign({}, state.board), { self: Object.assign(Object.assign({}, state.board.self), { height: Board_1.default.getSelfHeight(action) }), menuLiChild: Object.assign(Object.assign({}, state.menuLiChild), { color: App_1.default.isActiveMultistream(action, "reducer") ? Board_1.default.activeColor : Board_1.default.unactiveColor }), menuLiLinks: Object.assign(Object.assign({}, state.menuLiLinks), { color: Board_1.default.unactiveColor }) }), video: Object.assign(Object.assign({}, state.video), { self: Video_1.default.getSelf(action) }), audio: Object.assign(Object.assign({}, state.audio), { self: Audio_1.default.getSelf(action) }) });
        case "ON_CLICK_TO_MULTI_THREAD":
            return Object.assign(Object.assign({}, state), { posts: Object.assign(Object.assign({}, state.posts), { self: Posts_1.default.getSelf(action) }), board: Object.assign(Object.assign({}, state.board), { self: Object.assign(Object.assign({}, state.board.self), { height: Board_1.default.getSelfHeight(action) }), menuLiChild: Object.assign(Object.assign({}, state.board.menuLiChild), { color: Board_1.default.activeColor }), menuLiLinks: Object.assign(Object.assign({}, state.menuLiLinks), { color: Board_1.default.activeColor }) }) });
        case "ON_CLICK_TO_SINGLE_THREAD":
            return Object.assign(Object.assign({}, state), { board: Object.assign(Object.assign({}, state.board), { self: Object.assign(Object.assign({}, state.board.self), { height: Board_1.default.getSelfHeight(action) }), menuLiLinks: Object.assign(Object.assign({}, state.menuLiLinks), { color: Board_1.default.activeColor }) }) });
        case "ON_CLICK_TO_CHILD_THREAD":
            return Object.assign(Object.assign({}, state), { board: Object.assign(Object.assign({}, state.board), { self: Object.assign(Object.assign({}, state.board.self), { height: Board_1.default.getSelfHeight(action) }), menuLiChild: Object.assign(Object.assign({}, state.board.menuLiChild), { color: Board_1.default.unactiveColor }), menuLiLinks: Object.assign(Object.assign({}, state.menuLiLinks), { color: Board_1.default.unactiveColor }) }), icon: Object.assign(Object.assign({}, state.icon), { thunder: Icon_1.default.getThunder(action) }) });
        case "ON_CLICK_TOGGLE_DISP_MENU":
        case "ON_CLICK_TOGGLE_DISP_DETAIL":
            return Object.assign(Object.assign({}, state), { menu: Object.assign(Object.assign({}, state.menu), { self: Object.assign(Object.assign({}, state.menu.self), { width: Menu_1.default.getWidth(action), transform: Menu_1.default.getTransform(action) }) }), detail: Object.assign(Object.assign({}, state.detail), { [`self${Detail_1.default.detailRightSelfKey}`]: Object.assign(Object.assign({}, state.detail[`self${Detail_1.default.detailRightSelfKey}`]), { transform: DetailRight_1.default.getTransform(action) }), [`self${Detail_1.default.detailModalSelfKey}`]: Object.assign(Object.assign({}, state.detail[`self${Detail_1.default.detailModalSelfKey}`]), { transform: DetailModal_1.default.getTransform(action) }) }), posts: Object.assign(Object.assign({}, state.posts), { self: Object.assign(Object.assign({}, state.posts.self), { width: Posts_1.default.getWidth(action) }) }), footer: Object.assign(Object.assign({}, state.footer), { self: Object.assign(Object.assign({}, state.footer.self), { width: Footer_1.default.getWidth(action), transform: Footer_1.default.getTransform(action) }) }), menuFooter: Object.assign(Object.assign({}, state.menuFooter), { self: Object.assign(Object.assign({}, state.menuFooter.self), { width: MenuFooter_1.default.getWidth(action) }) }), postsFooter: Object.assign(Object.assign({}, state.postsFooter), { self: Object.assign(Object.assign({}, state.postsFooter.self), { maxWidth: PostsFooter_1.default.getWidth(action), width: PostsFooter_1.default.getWidth(action) }) }) });
        case "ON_CLICK_OPEN_LOCK_MENU":
            return Object.assign(Object.assign({}, state), { lockMenu: Object.assign(Object.assign({}, state.lockMenu), { menuShare: Object.assign(Object.assign({}, state.lockMenu.menuShare), { transform: LockMenu_1.default.getCommonTransform(action) }) }) });
        case "OPEN_NEW_POST":
        case "CLOSE_NEW_POST":
            return Object.assign(Object.assign({}, state), { container: Object.assign(Object.assign({}, state.container), { newPost: Object.assign(Object.assign({}, state.container.newPost), { transform: Container_1.default.getNotifTranslateY(action) }) }) });
        case "OPEN_NOTIF":
        case "CLOSE_NOTIF":
            const notifDisplay = Notif_1.default.getNotifsDisplay(action);
            return Object.assign(Object.assign({}, state), { header: Object.assign(Object.assign({}, state.header), { self: Object.assign(Object.assign({}, state.header.self), { transform: Header_1.default.getNotifTranslateY(action) }) }), container: Object.assign(Object.assign({}, state.container), { newPost: Object.assign(Object.assign({}, state.container.newPost), { display: Container_1.default.getNewPostDisplay(action) }) }), notif: Object.assign(Object.assign({}, state.notif), { notifs: Object.assign(Object.assign({}, state.notif.notifs), { height: Notif_1.default.getNotifsHeight(action) }), self: Object.assign(Object.assign({}, state.notif.self), { display: notifDisplay }) }) });
        case "TOGGLE_DISP_BOARD":
            return Object.assign(Object.assign({}, state), { board: Object.assign(Object.assign({}, state.board), { self: Board_1.default.getSelf(action) }) });
        case "OPEN_INNER_NOTIF":
        case "CLOSE_INNER_NOTIF":
            return Object.assign(Object.assign({}, state), { innerNotif: Object.assign(Object.assign({}, state.innerNotif), { self: Object.assign(Object.assign({}, state.innerNotif.self), { height: action.app.openInnerNotif !== "" ? `${InnerNotif_1.default.selfHeight}px` : "0px" }) }) });
        case "UPDATE_STYLE":
            const { styleKey, eleType, tagName, style } = action;
            if (styleKey && eleType && tagName) {
                return Object.assign(Object.assign({}, state), { [styleKey]: Object.assign(Object.assign({}, state[styleKey]), { [eleType]: Object.assign(Object.assign({}, state[styleKey][eleType]), { [tagName]: Object.assign(Object.assign({}, state[styleKey][eleType][tagName]), style) }) }) });
            }
            else if (styleKey && eleType) {
                return Object.assign(Object.assign({}, state), { [styleKey]: Object.assign(Object.assign({}, state[styleKey]), { [eleType]: Object.assign(Object.assign({}, state[styleKey][eleType]), style) }) });
            }
            break;
        case "START_DISP_POSTS":
        case "START_UNDISP_POSTS":
            return Object.assign(Object.assign({}, state), { extScreen: Object.assign(Object.assign({}, state.extScreen), { self: Object.assign(Object.assign({}, state.extScreen.self), { transform: ExtScreen_1.default.getSelfTransform(action), transition: ExtScreen_1.default.getSelfTransition(action) }) }), notif: Object.assign(Object.assign({}, state.notif), { notifs: Object.assign(Object.assign({}, state.notif.notifs), { display: Notif_1.default.getNotifsDisplay(action) }) }) });
        default:
            return action.style ? action.style : state;
    }
};
//# sourceMappingURL=style.js.map