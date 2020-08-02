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
const ExtScreen_1 = __importDefault(require("client/style/ExtScreen"));
const PostsSupporter_1 = __importDefault(require("client/style/PostsSupporter"));
const Board_1 = __importDefault(require("client/style/Board"));
const Links_1 = __importDefault(require("client/style/Links"));
const Post_1 = __importDefault(require("client/style/Post"));
const Icon_1 = __importDefault(require("client/style/Icon"));
const Audio_1 = __importDefault(require("client/style/Media/Audio"));
const Video_1 = __importDefault(require("client/style/Media/Video"));
const Ranks_1 = __importDefault(require("client/style/Menu/Ranks"));
exports.default = (state = {}, action) => {
    switch (action.type) {
        case "ON_RESIZE_START_WINDOW":
        case "ON_RESIZE_END_WINDOW":
        case "ON_TRANSITION":
        case "ON_TRANSITION_END":
        case "OFF_TRANSITION":
        case "EXT_TO_CLIENT[ACTION]:ON_TRANSITION":
        case "bootExtension":
            return new index_1.default(action);
        case "TOGGLE_DISP_MAIN":
            return { ...state };
        case "API_TO_CLIENT[EMIT]:rank":
        case "API_TO_CLIENT[EMIT]:tune":
        case "API_TO_CLIENT[BROADCAST]:tune":
            return {
                ...state,
                ranks: {
                    ...state.ranks,
                    ol: Ranks_1.default.getOl(action),
                },
            };
        case "ON_CLICK_MULTISTREAM":
            return {
                ...state,
                board: {
                    ...state.board,
                    menuLiChild: {
                        ...state.board.menuLiChild,
                        color: action.app.multistream ? Board_1.default.activeColor : Board_1.default.unactiveColor,
                    },
                },
                icon: {
                    ...state.icon,
                    thunder: {},
                },
            };
        case "COMPONENT_DID_MOUNTS":
            return {
                ...state,
                menus: {
                    ...state.menus,
                    self: { ...state.menus, transform: Menu_1.default.getTransform(action) },
                },
            };
        case "API_TO_CLIENT[BROADCAST]:fetchPosts":
            return {
                ...state,
                menus: {
                    ...state.menus,
                    self: { ...state.menus, transform: Menu_1.default.getTransform(action) },
                },
            };
        case "API_TO_CLIENT[REQUEST]:fetchPosts":
            return {
                ...state,
                posts: { ...state.posts, self: Posts_1.default.getSelf(action) },
            };
        case "API_TO_CLIENT[EMIT]:fetchPosts":
        case "OPEN_LINKS":
        case "CLOSE_LINKS":
        case "TOGGLE_LINKS":
            return {
                ...state,
                menus: {
                    ...state.menus,
                    self: { ...state.menus, transform: Menu_1.default.getTransform(action) },
                },
                posts: { ...state.posts, self: Posts_1.default.getSelf(action) },
                board: {
                    ...state.board,
                    self: {
                        ...state.board.self,
                        width: Board_1.default.getSelfWidth(action),
                        height: Board_1.default.getSelfHeight(action),
                        boxShadow: Board_1.default.getSelfBoxShadow(action),
                    },
                    menuLiChild: Board_1.default.getMenuLiChild(action),
                    menuLiLinks: Board_1.default.getMenuLiLinks(action),
                },
                links: {
                    ...state.links,
                    self: {
                        ...state.links.self,
                        display: Links_1.default.getSelfDisplay(action),
                    },
                    linksUl: {
                        ...state.links.linksUl,
                        overflowY: Links_1.default.getLinksUlOevrflowY(action),
                    },
                },
                icon: {
                    ...state.icon,
                    thunder: Icon_1.default.getThunder(action),
                    bubble: Icon_1.default.getBubble(action),
                    links: Icon_1.default.getLinks(action),
                },
            };
        case "TOGGLE_BUBBLE_POST":
            return {
                ...state,
                board: {
                    ...state.board,
                    menuLiBubble: {
                        ...state.board.menuLiBubble,
                        color: action.ui.isBubblePost ? Board_1.default.activeColor : Board_1.default.unactiveColor,
                    },
                },
                posts: {
                    ...state.posts,
                    self: Posts_1.default.getSelf(action),
                    more: Posts_1.default.getMore(action),
                },
                post: {
                    ...state.post,
                    self: Post_1.default.getSelf(action),
                    upper: Post_1.default.getUpper(action),
                    bottomPost: Post_1.default.getBottomPost(action),
                },
            };
        case "TOGGLE_DISP_POSTS_SUPPORTER":
        case "CLOSE_DISP_POSTS_SUPPORTER":
            return {
                ...state,
                postsSupporter: {
                    ...state.postsSupporter,
                    self: {
                        ...state.postsSupporter.self,
                        transform: PostsSupporter_1.default.getTransform(action),
                    },
                },
            };
        case "ON_CLICK_TO_TIMELINE_THREAD":
            return {
                ...state,
                posts: { ...state.posts, self: Posts_1.default.getSelf(action) },
                board: {
                    ...state.board,
                    self: {
                        ...state.board.self,
                        height: Board_1.default.getSelfHeight(action),
                    },
                    menuLiChild: {
                        ...state.menuLiChild,
                        color: App_1.default.isActiveMultistream(action, "reducer") ? Board_1.default.activeColor : Board_1.default.unactiveColor,
                    },
                    menuLiLinks: { ...state.menuLiLinks, color: Board_1.default.unactiveColor },
                },
                video: { ...state.video, self: Video_1.default.getSelf(action) },
                audio: { ...state.audio, self: Audio_1.default.getSelf(action) },
            };
        case "ON_CLICK_TO_MULTI_THREAD":
            return {
                ...state,
                posts: { ...state.posts, self: Posts_1.default.getSelf(action) },
                board: {
                    ...state.board,
                    self: {
                        ...state.board.self,
                        height: Board_1.default.getSelfHeight(action),
                    },
                    menuLiChild: { ...state.board.menuLiChild, color: Board_1.default.activeColor },
                    menuLiLinks: { ...state.menuLiLinks, color: Board_1.default.activeColor },
                },
            };
        case "ON_CLICK_TO_SINGLE_THREAD":
            return {
                ...state,
                board: {
                    ...state.board,
                    self: {
                        ...state.board.self,
                        height: Board_1.default.getSelfHeight(action),
                    },
                    menuLiLinks: { ...state.menuLiLinks, color: Board_1.default.activeColor },
                },
            };
        case "ON_CLICK_TO_CHILD_THREAD":
            return {
                ...state,
                board: {
                    ...state.board,
                    self: {
                        ...state.board.self,
                        height: Board_1.default.getSelfHeight(action),
                    },
                    menuLiChild: {
                        ...state.board.menuLiChild,
                        color: Board_1.default.unactiveColor,
                    },
                    menuLiLinks: { ...state.menuLiLinks, color: Board_1.default.unactiveColor },
                },
                icon: { ...state.icon, thunder: Icon_1.default.getThunder(action) },
            };
        case "ON_CLICK_TOGGLE_DISP_MENU":
        case "ON_CLICK_TOGGLE_DISP_DETAIL":
            return {
                ...state,
                menu: {
                    ...state.menu,
                    self: {
                        ...state.menu.self,
                        width: Menu_1.default.getWidth(action),
                        transform: Menu_1.default.getTransform(action),
                    },
                },
                detail: {
                    ...state.detail,
                    [`self${Detail_1.default.detailRightSelfKey}`]: {
                        ...state.detail[`self${Detail_1.default.detailRightSelfKey}`],
                        transform: DetailRight_1.default.getTransform(action),
                    },
                    [`self${Detail_1.default.detailModalSelfKey}`]: {
                        ...state.detail[`self${Detail_1.default.detailModalSelfKey}`],
                        transform: DetailModal_1.default.getTransform(action),
                    },
                },
                posts: {
                    ...state.posts,
                    self: { ...state.posts.self, width: Posts_1.default.getWidth(action) },
                },
                footer: {
                    ...state.footer,
                    self: {
                        ...state.footer.self,
                        width: Footer_1.default.getWidth(action),
                        transform: Footer_1.default.getTransform(action),
                    },
                },
                menuFooter: {
                    ...state.menuFooter,
                    self: {
                        ...state.menuFooter.self,
                        width: MenuFooter_1.default.getWidth(action),
                    },
                },
                postsFooter: {
                    ...state.postsFooter,
                    self: {
                        ...state.postsFooter.self,
                        maxWidth: PostsFooter_1.default.getWidth(action),
                        width: PostsFooter_1.default.getWidth(action),
                    },
                },
            };
        case "ON_CLICK_OPEN_LOCK_MENU":
            return {
                ...state,
                lockMenu: {
                    ...state.lockMenu,
                    menuShare: {
                        ...state.lockMenu.menuShare,
                        transform: LockMenu_1.default.getCommonTransform(action),
                    },
                },
            };
        case "OPEN_NEW_POST":
        case "CLOSE_NEW_POST":
            return {
                ...state,
                container: {
                    ...state.container,
                    newPost: {
                        ...state.container.newPost,
                        transform: Container_1.default.getNotifTranslateY(action),
                    },
                },
            };
        case "OPEN_NOTIF":
        case "CLOSE_NOTIF":
            const notifDisplay = Notif_1.default.getNotifsDisplay(action);
            return {
                ...state,
                header: {
                    ...state.header,
                    self: {
                        ...state.header.self,
                        transform: Header_1.default.getNotifTranslateY(action),
                    },
                },
                container: {
                    ...state.container,
                    newPost: {
                        ...state.container.newPost,
                        display: Container_1.default.getNewPostDisplay(action),
                    },
                },
                notif: {
                    ...state.notif,
                    notifs: {
                        ...state.notif.notifs,
                        height: Notif_1.default.getNotifsHeight(action),
                    },
                    self: { ...state.notif.self, display: notifDisplay },
                },
            };
        case "TOGGLE_DISP_BOARD":
            return {
                ...state,
                board: { ...state.board, self: Board_1.default.getSelf(action) },
            };
        case "OPEN_INNER_NOTIF":
        case "CLOSE_INNER_NOTIF":
            return {
                ...state,
                innerNotif: {
                    ...state.innerNotif,
                    self: {
                        ...state.innerNotif.self,
                        height: action.ui.openInnerNotif !== "" ? `${Container_1.default.getBlockSize(action)}px` : "0px",
                    },
                },
            };
        case "UPDATE_STYLE":
            const { styleKey, eleType, tagName, style } = action;
            if (styleKey && eleType && tagName) {
                return {
                    ...state,
                    [styleKey]: {
                        ...state[styleKey],
                        [eleType]: {
                            ...state[styleKey][eleType],
                            [tagName]: { ...state[styleKey][eleType][tagName], ...style },
                        },
                    },
                };
            }
            else if (styleKey && eleType) {
                return {
                    ...state,
                    [styleKey]: {
                        ...state[styleKey],
                        [eleType]: { ...state[styleKey][eleType], ...style },
                    },
                };
            }
            break;
        case "START_DISP_POSTS":
        case "START_UNDISP_POSTS":
            return {
                ...state,
                extScreen: {
                    ...state.extScreen,
                    self: {
                        ...state.extScreen.self,
                        transform: ExtScreen_1.default.getSelfTransform(action),
                        transition: ExtScreen_1.default.getSelfTransition(action),
                    },
                },
                notif: {
                    ...state.notif,
                    notifs: {
                        ...state.notif.notifs,
                        display: Notif_1.default.getNotifsDisplay(action),
                    },
                },
            };
        default:
            return action.style ? action.style : state;
    }
};
//# sourceMappingURL=style.js.map