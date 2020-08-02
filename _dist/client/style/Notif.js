"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Ui_1 = __importDefault(require("client/store/Ui"));
const index_1 = __importDefault(require("./index"));
const Container_1 = __importDefault(require("./Container"));
const Posts_1 = __importDefault(require("./Posts"));
class Notif {
    constructor(params) {
        const notifs = Notif.getNotifs(params);
        const self = Notif.getSelf(params);
        const bottom = Notif.getBottom(params);
        const bottomIcon = Notif.getBottomIcon(params);
        const bottomPost = Notif.getBottomPost(params);
        return {
            notifs,
            self,
            bottom,
            bottomIcon,
            bottomPost,
        };
    }
    static get selfHeight() {
        return 40;
    }
    static getNotifsDisplay({ app, ui }) {
        if (ui.extensionMode === Ui_1.default.extensionModeExtBottomLabel) {
            return "block";
        }
        else {
            return "none";
        }
    }
    static getNotifsHeight({ app, ui }) {
        if (ui.extensionMode === Ui_1.default.extensionModeExtBottomLabel) {
            if (ui.isOpenPosts) {
                return "0px";
            }
            else {
                if (ui.isOpenNotif) {
                    return `${Container_1.default.getBlockSize({ app, ui }) + Notif.selfHeight}px`;
                }
                else {
                    return `${Notif.selfHeight}px`;
                }
            }
        }
        else {
            return "0px";
        }
    }
    static getNotifs({ app, ui }) {
        const display = Notif.getNotifsDisplay({ app, ui });
        const height = Notif.getNotifsHeight({ app, ui });
        const layout = index_1.default.getLayoutBlock({
            display,
            position: "absolute",
            top: "0px",
            width: "100%",
            height,
            overflow: "visible",
        });
        const content = index_1.default.getContentBase();
        const animation = index_1.default.getAnimationBase();
        return index_1.default.get({ layout, content, animation });
    }
    static getSelf({ app, ui }) {
        const display = Notif.getNotifsDisplay({ app, ui });
        const width = Posts_1.default.getOlWidth({ app, ui }, true);
        const merginLeft = (100 - width) / 2;
        const layout = index_1.default.getLayoutBlock({
            display,
            position: "absolute",
            top: 0,
            width: `${width}%`,
            height: Notif.selfHeight + "px",
            background: Container_1.default.whiteRGBA,
            marginLeft: `${merginLeft}%`,
            borderTop: Container_1.default.border,
            borderLeft: Container_1.default.border,
            borderRight: Container_1.default.border,
            borderRadius: "3px 3px 0px 0px",
        });
        const content = index_1.default.getContentBase({
            textAlign: "left",
        });
        const animation = index_1.default.getAnimationBase({
            transform: "translate3d(0px, 40px, 0px)",
            transition: `${Container_1.default.transitionNotif}ms`,
        });
        return index_1.default.get({ layout, content, animation });
    }
    static getBottom({ app, ui }) {
        const layout = {
            width: "100%",
        };
        const content = {};
        const animation = {};
        return index_1.default.get({ layout, content, animation });
    }
    static getBottomIcon({ app, ui }) {
        const layout = {};
        const content = {};
        const animation = {};
        return index_1.default.get({ layout, content, animation });
    }
    static getBottomPost({ app, ui }) {
        const layout = {
            overflow: "hidden",
            padding: "15px 15px 15px 0px",
            background: "none",
        };
        const content = {
            lineHeight: "0.8",
            whiteSpace: "nowrap",
            color: index_1.default.fontBaseRGB,
        };
        const animation = {};
        return index_1.default.get({ layout, content, animation });
    }
}
exports.default = Notif;
//# sourceMappingURL=Notif.js.map