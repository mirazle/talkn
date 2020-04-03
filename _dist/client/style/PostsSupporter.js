"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Ui_1 = __importDefault(require("api/store/Ui"));
const index_1 = __importDefault(require("./index"));
const Container_1 = __importDefault(require("./Container"));
const PostsFooter_1 = __importDefault(require("./PostsFooter"));
class PostsSupporter {
    constructor(params) {
        const self = PostsSupporter.getSelf(params);
        const emoji = PostsSupporter.getEmoji(params);
        const emojiLabel = PostsSupporter.getEmojiLabel(params);
        return {
            self,
            emoji,
            emojiLabel
        };
    }
    static get selfHeight() {
        return 172;
    }
    static getTransform({ app, ui }) {
        return ui.isOpenPostsSupporter
            ? `translate3d( 0px, -${PostsSupporter.selfHeight + PostsFooter_1.default.selfHeight}px, 0px )`
            : "translate3d( 0px, 0px, 0px )";
    }
    static getSelf({ app, ui }) {
        const layout = index_1.default.getLayoutFlex({
            display: "flex",
            position: "fixed",
            bottom: `-${PostsSupporter.selfHeight}px`,
            left: PostsFooter_1.default.getLeft({ app, ui }),
            height: PostsSupporter.selfHeight,
            width: PostsFooter_1.default.getWidth({ app, ui }),
            maxWidth: PostsFooter_1.default.getWidth({ app, ui }),
            color: Container_1.default.whiteRGB,
            flexFlow: "column wrap",
            alignItems: "center",
            justifyContent: "flex-start",
            background: Container_1.default.darkRGBA,
            whiteSpace: "nowrap",
            overflowScrolling: "touch",
            WebkitOverflowScrolling: "touch",
            overflowX: "scroll",
            overflowY: "hidden"
        });
        const content = {};
        const animation = index_1.default.getAnimationBase({
            transition: Container_1.default.getTransitionFirstOn({ app, ui }),
            transform: PostsSupporter.getTransform({ app, ui })
        });
        return index_1.default.get({ layout, content, animation });
    }
    static getEmoji({ app, ui }) {
        const fontSize = Ui_1.default.screenModeSmallLabel === ui.screenMode ? "35px" : "40px";
        const layout = index_1.default.getLayoutFlex({
            minWidth: "20%",
            maxWidth: "20%",
            height: "86px",
            flexFlow: "row wrap",
            alignItems: "center",
            justifyContent: "center",
            padding: "5px"
        });
        const content = index_1.default.getContentBase({
            fontSize,
            cursor: "pointer"
        });
        const animation = index_1.default.getAnimationBase({
            transition: Container_1.default.getTransition({ app, ui }),
            transform: "scale(1.0)"
        });
        return index_1.default.get({ layout, content, animation });
    }
    static getEmojiLabel({ app, ui }) {
        const margin = Ui_1.default.screenModeSmallLabel === ui.screenMode ? "0px" : "0px";
        const fontSize = Ui_1.default.screenModeSmallLabel === ui.screenMode ? "8px" : "10px";
        const layout = index_1.default.getLayoutFlex({
            width: "100%",
            minWidth: "100%",
            height: "30px",
            margin
        });
        const content = index_1.default.getContentBase({
            wordBreak: "break-word",
            fontSize,
            color: Container_1.default.whiteRGB
        });
        const animation = index_1.default.getAnimationBase({});
        return index_1.default.get({ layout, content, animation });
    }
}
exports.default = PostsSupporter;
//# sourceMappingURL=PostsSupporter.js.map