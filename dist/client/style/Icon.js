"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
const Container_1 = __importDefault(require("./Container"));
const conf_1 = __importDefault(require("../conf"));
const App_1 = __importDefault(require("api/store/App"));
const Ui_1 = __importDefault(require("api/store/Ui"));
class Icon {
    constructor(params) {
        const bootOption = Object.assign(Object.assign({}, params.bootOption), params.app);
        const headTab = Icon.getHeadTab(params);
        const menu = Icon.getMenu(params);
        const talknLogo = Icon.getTalknLogo(params);
        const user = Icon.getUser(params);
        const headerUser = Icon.getHeaderUser(params);
        const tag = Icon.getTag(params);
        const home = Icon.getHome(params);
        const graph = Icon.getGraph(params);
        const search = Icon.getSearch(params);
        const index = Icon.getIndex(params);
        const logs = Icon.getLogs(params);
        const setting = Icon.getSetting(params);
        const thunder = Icon.getThunder(params);
        const bubble = Icon.getBubble(params);
        const detail = Icon.getDetail(params);
        const heart = Icon.getHeart(params);
        const share = Icon.getShare(params);
        const money = Icon.getMoney(params);
        const openEmoji = Icon.getOpenEmoji(params);
        const close = Icon.getClose(params);
        const ch = Icon.getCh(params);
        const update = Icon.getUpdate(params);
        const loading = Icon.getLoading(params);
        const tune = Icon.getTune(params);
        return {
            headTab,
            menu,
            talknLogo,
            user,
            headerUser,
            search,
            tag,
            home,
            graph,
            index,
            logs,
            setting,
            thunder,
            bubble,
            detail,
            heart,
            share,
            money,
            openEmoji,
            close,
            ch,
            update,
            loading,
            tune
        };
    }
    static get defaultOption() {
        return { sizePx: Icon.largeSize, active: true };
    }
    static get smallSize() {
        return "24px";
    }
    static get middleSize() {
        return "36px";
    }
    static get largeSize() {
        return "48px";
    }
    static get bigSize() {
        return "64px";
    }
    static getEmpty({ app, ui }, option = {}) {
        option = Object.assign(Object.assign({}, Icon.defaultOption), option);
        const sizePx = option.sizePx ? option.sizePx : Icon.middleSize;
        const cursor = option.active ? "pointer" : "default";
        return index_1.default.get({
            layout: index_1.default.getLayoutBlock({
                flexGrow: "1",
                width: sizePx,
                height: sizePx,
                minWidth: sizePx,
                minHeight: sizePx,
                backgroundSize: sizePx,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
            }),
            content: index_1.default.getContentBase({
                cursor
            }),
            animation: index_1.default.getAnimationBase({
                transform: `scale( 1 ) translate3d( 0px, 0px, 0px )`
            })
        });
    }
    static getTwitter({ app, ui }, option = {}) {
        option = Object.assign(Object.assign({}, Icon.defaultOption), option);
        const sizePx = option.sizePx ? option.sizePx : Icon.middleSize;
        const image = option.active ? "twitter.png" : "twitter_gray.png";
        const cursor = option.active ? "pointer" : "default";
        return index_1.default.get({
            layout: index_1.default.getLayoutBlock({
                flexGrow: "1",
                width: sizePx,
                height: sizePx,
                minWidth: sizePx,
                minHeight: sizePx,
                backgroundSize: sizePx,
                backgroundPosition: "center",
                backgroundImage: `url(https://${conf_1.default.assetsImgPath}${image})`,
                backgroundRepeat: "no-repeat"
            }),
            content: index_1.default.getContentBase({
                cursor
            }),
            animation: index_1.default.getAnimationBase({
                transform: `scale( 1 ) translate3d( 0px, 0px, 0px )`
            })
        });
    }
    static getFacebook({ app, ui }, option = {}) {
        option = Object.assign(Object.assign({}, Icon.defaultOption), option);
        const sizePx = option.sizePx ? option.sizePx : Icon.middleSize;
        const image = option.active ? "facebook.png" : "facebook_gray.png";
        const cursor = option.active ? "pointer" : "default";
        return index_1.default.get({
            layout: index_1.default.getLayoutBlock({
                flexGrow: "1",
                width: sizePx,
                height: sizePx,
                minWidth: sizePx,
                minHeight: sizePx,
                backgroundSize: sizePx,
                backgroundPosition: "center",
                backgroundImage: `url(https://${conf_1.default.assetsImgPath}${image})`,
                backgroundRepeat: "no-repeat"
            }),
            content: index_1.default.getContentBase({
                cursor
            }),
            animation: index_1.default.getAnimationBase({
                transform: `scale( 1 ) translate3d( 0px, 0px, 0px )`
            })
        });
    }
    static getAppstore({ app, ui }, option = {}) {
        option = Object.assign(Object.assign({}, Icon.defaultOption), option);
        const sizePx = option.sizePx ? option.sizePx : Icon.middleSize;
        const image = option.active ? "appstore.png" : "appstore_gray.png";
        const cursor = option.active ? "pointer" : "default";
        return index_1.default.get({
            layout: index_1.default.getLayoutBlock({
                flexGrow: "1",
                width: sizePx,
                height: sizePx,
                minWidth: sizePx,
                minHeight: sizePx,
                backgroundSize: sizePx,
                backgroundPosition: "center",
                backgroundImage: `url(https://${conf_1.default.assetsImgPath}${image})`,
                backgroundRepeat: "no-repeat"
            }),
            content: index_1.default.getContentBase({
                cursor
            }),
            animation: index_1.default.getAnimationBase({
                transform: `scale( 1 ) translate3d( 0px, 0px, 0px )`
            })
        });
    }
    static getAndroid({ app, ui }, option = {}) {
        option = Object.assign(Object.assign({}, Icon.defaultOption), option);
        const sizePx = option.sizePx ? option.sizePx : Icon.middleSize;
        const image = option.active ? "android.png" : "android_gray.png";
        const cursor = option.active ? "pointer" : "default";
        return index_1.default.get({
            layout: index_1.default.getLayoutBlock({
                flexGrow: "1",
                width: sizePx,
                height: sizePx,
                minWidth: sizePx,
                minHeight: sizePx,
                backgroundSize: sizePx,
                backgroundPosition: "center",
                backgroundImage: `url(https://${conf_1.default.assetsImgPath}${image})`,
                backgroundRepeat: "no-repeat"
            }),
            content: index_1.default.getContentBase({
                cursor
            }),
            animation: index_1.default.getAnimationBase({
                transform: `scale( 1 ) translate3d( 0px, 0px, 0px )`
            })
        });
    }
    static getHome({ app, ui }, option = {}) {
        option = Object.assign(Object.assign({}, Icon.defaultOption), option);
        const sizePx = option.sizePx ? option.sizePx : Icon.middleSize;
        const image = option.active ? "home.png" : "home_gray.png";
        const cursor = option.active ? "pointer" : "default";
        return index_1.default.get({
            layout: index_1.default.getLayoutBlock({
                flexGrow: "1",
                width: sizePx,
                height: sizePx,
                minWidth: sizePx,
                minHeight: sizePx,
                backgroundSize: sizePx,
                backgroundPosition: "center",
                backgroundImage: `url(https://${conf_1.default.assetsImgPath}${image})`,
                backgroundRepeat: "no-repeat"
            }),
            content: index_1.default.getContentBase({
                cursor
            }),
            animation: index_1.default.getAnimationBase({
                transform: `scale( 1 ) translate3d( 0px, 0px, 0px )`
            })
        });
    }
    static getGraph({ app, ui }, option = {}) {
        option = Object.assign(Object.assign({}, Icon.defaultOption), option);
        const sizePx = option.sizePx ? option.sizePx : Icon.middleSize;
        const image = option.active ? "graph.png" : "graph_gray.png";
        const cursor = option.active ? "pointer" : "default";
        return index_1.default.get({
            layout: index_1.default.getLayoutBlock({
                flexGrow: "1",
                width: sizePx,
                height: sizePx,
                minWidth: sizePx,
                minHeight: sizePx,
                backgroundSize: sizePx,
                backgroundPosition: "center",
                backgroundImage: `url(https://${conf_1.default.assetsImgPath}${image})`,
                backgroundRepeat: "no-repeat"
            }),
            content: index_1.default.getContentBase({
                cursor
            }),
            animation: index_1.default.getAnimationBase({
                transform: `scale( 1 ) translate3d( 0px, 0px, 0px )`
            })
        });
    }
    static getTalkn({ app, ui }, option = {}) {
        option = Object.assign(Object.assign({}, Icon.defaultOption), option);
        const sizePx = option.sizePx ? option.sizePx : Icon.middleSize;
        const image = option.active ? "talkn.png" : "talkn.png";
        const cursor = option.active ? "pointer" : "default";
        return index_1.default.get({
            layout: index_1.default.getLayoutBlock({
                flexGrow: "1",
                width: sizePx,
                height: sizePx,
                minWidth: sizePx,
                minHeight: sizePx,
                backgroundSize: sizePx,
                backgroundPosition: "center",
                backgroundImage: `url(https://${conf_1.default.assetsImgPath}${image})`,
                backgroundRepeat: "no-repeat"
            }),
            content: index_1.default.getContentBase({
                cursor
            }),
            animation: index_1.default.getAnimationBase({
                transform: `scale( 1 ) translate3d( 0px, 0px, 0px )`
            })
        });
    }
    static getTalknLogo({ app, ui }) {
        const img = index_1.default.get({
            layout: index_1.default.getLayoutBlock({
                backgroundImage: `url(${conf_1.default.assetsImgPath}talkn_logo2.png)`,
                backgroundPosition: "center center",
                backgroundSize: "90%",
                backgroundRepeat: "no-repeat"
            }),
            content: index_1.default.getContentBase(),
            animation: index_1.default.getAnimationBase({
                transform: `scale( 1 ) translate3d( 0px, 0px, 0px )`
            })
        });
        return { img };
    }
    static getChromeExtension({ app, ui }, option = {}) {
        option = Object.assign(Object.assign({}, Icon.defaultOption), option);
        const sizeWidthPx = "100%";
        const sizeHeightPx = "60px";
        const image = option.active ? "chrome_extension.png" : "chrome_extension.png";
        const cursor = option.active ? "pointer" : "default";
        return index_1.default.get({
            layout: index_1.default.getLayoutBlock({
                flexGrow: "1",
                width: sizeWidthPx,
                minWidth: sizeWidthPx,
                height: "180px",
                minHeight: sizeHeightPx,
                backgroundColor: Container_1.default.reliefRGB,
                backgroundSize: "75%",
                backgroundPosition: "center",
                backgroundImage: `url(https://${conf_1.default.assetsImgPath}${image})`,
                backgroundRepeat: "no-repeat"
            }),
            content: index_1.default.getContentBase({
                cursor
            }),
            animation: index_1.default.getAnimationBase({
                transform: `scale( 1 ) translate3d( 0px, 0px, 0px )`
            })
        });
    }
    static getTag({ app, ui }) {
        const div = index_1.default.get({
            layout: index_1.default.getLayoutInlineBlock({
                width: "30px",
                height: "30px"
            }),
            content: index_1.default.getContentBase({
                cursor: "pointer"
            }),
            animation: index_1.default.getAnimationBase({
                transform: "scale( 1 )"
            })
        });
        const left = index_1.default.get({
            layout: index_1.default.getLayoutInlineBlock({
                borderBottom: `2px solid ${Container_1.default.reliefRGB}`,
                borderLeft: `2px solid ${Container_1.default.reliefRGB}`,
                borderRadius: "0px",
                margin: "0 auto",
                width: "12px",
                height: "12px"
            }),
            content: index_1.default.getContentBase(),
            animation: index_1.default.getAnimationBase({
                transform: "rotate(45deg) translate3d(5px, 5px, 0px)"
            })
        });
        const right = index_1.default.get({
            layout: index_1.default.getLayoutInlineBlock({
                borderBottom: `2px solid ${Container_1.default.reliefRGB}`,
                borderLeft: `2px solid ${Container_1.default.reliefRGB}`,
                borderRadius: "0px",
                margin: "0 auto",
                width: "12px",
                height: "12px"
            }),
            content: index_1.default.getContentBase(),
            animation: index_1.default.getAnimationBase({
                transform: "rotate(-135deg) translate3d(-6px, -4px, 0px)"
            })
        });
        const bar = index_1.default.get({
            layout: index_1.default.getLayoutInlineBlock({
                background: Container_1.default.reliefRGB,
                width: "2px",
                height: "13px"
            }),
            content: index_1.default.getContentBase(),
            animation: index_1.default.getAnimationBase({
                transform: "rotate(40deg) translate3d(-5px, 13px, 0px)"
            })
        });
        return { div, left, right, bar };
    }
    static getHomeCss({ app, ui }) {
        const div = index_1.default.get({
            layout: index_1.default.getLayoutInlineBlock({
                width: "30px",
                height: "30px"
            }),
            content: index_1.default.getContentBase({
                cursor: "pointer"
            }),
            animation: index_1.default.getAnimationBase({
                transform: "scale( 1 )"
            })
        });
        const leaf = index_1.default.get({
            layout: index_1.default.getLayoutInlineBlock({
                borderBottom: `2px solid ${Container_1.default.reliefRGB}`,
                borderLeft: `2px solid ${Container_1.default.reliefRGB}`,
                borderRadius: "0px",
                margin: "0 auto",
                width: "19px",
                height: "18px"
            }),
            content: index_1.default.getContentBase(),
            animation: index_1.default.getAnimationBase({
                transform: "rotate(135deg) translate3d(5px, -3px, 0px)"
            })
        });
        const base = index_1.default.get({
            layout: index_1.default.getLayoutInlineBlock({
                borderRight: `2px solid ${Container_1.default.reliefRGB}`,
                borderBottom: `2px solid ${Container_1.default.reliefRGB}`,
                borderLeft: `2px solid ${Container_1.default.reliefRGB}`,
                borderRadius: "0px",
                margin: "0 auto",
                width: "20px",
                height: "12px"
            }),
            content: index_1.default.getContentBase(),
            animation: index_1.default.getAnimationBase({
                transform: "translate3d(2px, -6px, 0px)"
            })
        });
        const door = index_1.default.get({
            layout: index_1.default.getLayoutInlineBlock({
                background: `${Container_1.default.reliefRGB}`,
                width: "6px",
                height: "8px",
                margin: "0 auto",
                borderRadius: "5px 5px 0px 0px"
            }),
            content: index_1.default.getContentBase(),
            animation: index_1.default.getAnimationBase({
                transform: "translate3d(-11px, -5px, 0px)"
            })
        });
        return { div, leaf, door, base };
    }
    static getSearch({ app, ui }) {
        const div = index_1.default.get({
            layout: index_1.default.getLayoutInlineBlock({
                width: "45px",
                height: "45px",
                borderRadius: "100px"
            }),
            content: index_1.default.getContentBase(),
            animation: index_1.default.getAnimationBase({
                transform: "scale( 1 )"
            })
        });
        const circle = index_1.default.get({
            layout: index_1.default.getLayoutBlock({
                position: "absolute",
                top: "4px",
                left: "16px",
                margin: "7px auto",
                width: "18px",
                height: "18px",
                borderRadius: "100px",
                border: `3px solid ${Container_1.default.chromeOffTabRGB}`
            }),
            content: index_1.default.getContentBase(),
            animation: index_1.default.getAnimationBase({
                transform: `scale( 1 ) translate3d( 0px, 0px, 0px )`
            })
        });
        const bar = index_1.default.get({
            layout: index_1.default.getLayoutInlineBlock({
                position: "absolute",
                top: "23px",
                left: "13px",
                margin: "0 auto",
                background: Container_1.default.chromeOffTabRGB,
                width: "4px",
                height: "12px",
                borderRadius: "10px"
            }),
            content: index_1.default.getContentBase(),
            animation: index_1.default.getAnimationBase({
                transition: Container_1.default.getTransition({ app, ui }),
                transform: `scale(1) translate3d(0px, 0px, 0px) rotate(45deg)`
            })
        });
        return { div, circle, bar };
    }
    static getUser({ app, ui }) {
        const div = index_1.default.get({
            layout: index_1.default.getLayoutInlineBlock({
                width: "22px",
                height: Icon.smallSize,
                margin: "2px"
            }),
            content: index_1.default.getContentBase(),
            animation: index_1.default.getAnimationBase({
                transform: "scale( 1 )"
            })
        });
        const top = index_1.default.get({
            layout: index_1.default.getLayoutBlock({
                margin: "0 auto",
                background: Container_1.default.reliefRGB,
                width: "12px",
                height: "12px",
                borderRadius: "10px",
                position: "relative",
                top: "-12px",
                border: "3px solid rgb(250, 250, 250)"
            }),
            content: index_1.default.getContentBase(),
            animation: index_1.default.getAnimationBase({
                transform: `scale( 1 ) translate3d( 0px, 0px, 0px )`
            })
        });
        const bottom = index_1.default.get({
            layout: index_1.default.getLayoutBlock({
                margin: "0 auto",
                background: Container_1.default.reliefRGB,
                width: "8px",
                height: "12px",
                borderRadius: "6px",
                position: "relative",
                top: "8px"
            }),
            content: index_1.default.getContentBase(),
            animation: index_1.default.getAnimationBase({
                transform: `scale( 1 ) translate3d( 0px, 0px, 0px )`
            })
        });
        return { div, top, bottom };
    }
    static getHeaderUser({ app, ui }) {
        const div = index_1.default.get({
            layout: index_1.default.getLayoutInlineBlock({
                width: "40px",
                height: "40px",
                margin: "5px"
            }),
            content: index_1.default.getContentBase(),
            animation: index_1.default.getAnimationBase({
                transform: "scale( 1 )"
            })
        });
        const top = index_1.default.get({
            layout: index_1.default.getLayoutBlock({
                margin: "0 auto",
                background: `${Container_1.default.chromeOffTabRGB}`,
                width: "14px",
                height: "14px",
                borderRadius: "10px",
                position: "relative",
                top: "-12px",
                border: "3px solid rgb(250, 250, 250)"
            }),
            content: index_1.default.getContentBase(),
            animation: index_1.default.getAnimationBase({
                transform: `scale( 1 ) translate3d( 0px, 0px, 0px )`
            })
        });
        const bottom = index_1.default.get({
            layout: index_1.default.getLayoutBlock({
                margin: "0 auto",
                background: `${Container_1.default.chromeOffTabRGB}`,
                width: "10px",
                height: "16px",
                borderRadius: "6px",
                position: "relative",
                top: "12px"
            }),
            content: index_1.default.getContentBase(),
            animation: index_1.default.getAnimationBase({
                transform: `scale( 1 ) translate3d( 0px, 0px, 0px )`
            })
        });
        return { div, top, bottom };
    }
    static getIndex({ app, ui }) {
        const div = index_1.default.get({
            layout: index_1.default.getLayoutInlineBlock({
                width: "22px",
                height: Icon.smallSize,
                margin: "2px"
            }),
            content: index_1.default.getContentBase(),
            animation: index_1.default.getAnimationBase({
                transform: "scale( 1 )"
            })
        });
        const wrap = index_1.default.get({
            layout: index_1.default.getLayoutBlock({
                width: "22px",
                height: "22px",
                margin: "0 auto",
                borderRadius: "4px"
            }),
            content: index_1.default.getContentBase(),
            animation: index_1.default.getAnimationBase()
        });
        const commonSpan = index_1.default.get({
            layout: index_1.default.getLayoutBlock({
                width: "16px",
                height: "2px",
                margin: "4px auto",
                borderRadius: "6px",
                background: Container_1.default.reliefRGB
            }),
            content: index_1.default.getContentBase(),
            animation: index_1.default.getAnimationBase()
        });
        const top = index_1.default.get({
            layout: commonSpan,
            content: index_1.default.getContentBase(),
            animation: index_1.default.getAnimationBase({
                transform: `translate3d( 0px, 0px, 0px )`
            })
        });
        const middle = index_1.default.get({
            layout: commonSpan,
            content: index_1.default.getContentBase(),
            animation: index_1.default.getAnimationBase({
                transform: `translate3d( 0px, 0px, 0px )`
            })
        });
        const bottom = index_1.default.get({
            layout: commonSpan,
            content: index_1.default.getContentBase(),
            animation: index_1.default.getAnimationBase({
                transform: `translate3d( 0px, 0px, 0px )`
            })
        });
        return { div, wrap, top, middle, bottom };
    }
    static getLogs({ app, ui }) {
        const div = index_1.default.get({
            layout: index_1.default.getLayoutInlineBlock({
                width: "22px",
                height: Icon.smallSize,
                margin: "2px"
            }),
            content: index_1.default.getContentBase(),
            animation: index_1.default.getAnimationBase({
                transform: "scale( 1 )"
            })
        });
        const foot1 = index_1.default.get({
            layout: index_1.default.getLayoutInlineBlock({
                position: "absolute",
                top: "3px",
                left: "-6px"
            }),
            content: index_1.default.getContentBase(),
            animation: index_1.default.getAnimationBase({
                transform: `scale( 1 ) rotate(-15deg)`
            })
        });
        const foot1Top = index_1.default.get({
            layout: index_1.default.getLayoutBlock({
                margin: "0 auto",
                background: Container_1.default.reliefRGB,
                width: "8px",
                height: "12px",
                borderRadius: "45px 30px 45px 45px",
                position: "relative",
                left: "2px",
                zIndex: "0"
            }),
            content: index_1.default.getContentBase(),
            animation: index_1.default.getAnimationBase({
                transform: `translate3d( 0px, 0px, 0px )`
            })
        });
        const foot1Bottom = index_1.default.get({
            layout: index_1.default.getLayoutBlock({
                margin: "0 auto",
                background: Container_1.default.reliefRGB,
                width: "5px",
                height: "7px",
                borderRadius: "10px",
                position: "relative",
                top: "-2px",
                left: "2px",
                zIndex: "0"
            }),
            content: index_1.default.getContentBase(),
            animation: index_1.default.getAnimationBase({
                transform: `translate3d( 0px, 0px, 0px )`
            })
        });
        const foot1Space = index_1.default.get({
            layout: index_1.default.getLayoutBlock({
                width: "7px",
                height: "2px",
                background: Container_1.default.offWhiteRGB,
                margin: "0 auto",
                zIndex: "1000",
                position: "relative",
                left: "1px"
            }),
            content: index_1.default.getContentBase(),
            animation: index_1.default.getAnimationBase({
                transform: `translate3d( 0px, -8px, 1000px )`
            })
        });
        const foot2 = index_1.default.get({
            layout: index_1.default.getLayoutInlineBlock({
                width: "36px",
                height: "36px",
                position: "absolute",
                top: "-4px",
                left: "0px"
            }),
            content: index_1.default.getContentBase(),
            animation: index_1.default.getAnimationBase({
                transform: `scale( 0.5 ) rotate(30deg)`
            })
        });
        const foot2Top = index_1.default.get({
            layout: index_1.default.getLayoutBlock({
                margin: "0 auto",
                background: Container_1.default.reliefRGB,
                width: "10px",
                height: "20px",
                borderRadius: "30px 50px 40px 40px",
                position: "relative",
                left: "-5px",
                zIndex: "0"
            }),
            content: index_1.default.getContentBase(),
            animation: index_1.default.getAnimationBase({
                transform: `translate3d( 0px, 0px, 0px )`
            })
        });
        const foot2Bottom = index_1.default.get({
            layout: index_1.default.getLayoutBlock({
                margin: "0 auto",
                background: Container_1.default.reliefRGB,
                width: "7px",
                height: "7px",
                borderRadius: "2px 2px 3px 3px",
                position: "relative",
                left: "-5px",
                zIndex: "0"
            }),
            content: index_1.default.getContentBase(),
            animation: index_1.default.getAnimationBase({
                transform: `translate3d( 0px, 0px, 0px )`
            })
        });
        const foot2Space = index_1.default.get({
            layout: index_1.default.getLayoutBlock({
                width: "19px",
                height: "3px",
                background: Container_1.default.offWhiteRGB,
                margin: "0 auto",
                zIndex: "1000"
            }),
            content: index_1.default.getContentBase(),
            animation: index_1.default.getAnimationBase({
                transform: `translate3d( 0px, -10px, 1000px )`
            })
        });
        return {
            div,
            foot1,
            foot1Top,
            foot1Space,
            foot1Bottom,
            foot2,
            foot2Top,
            foot2Space,
            foot2Bottom
        };
    }
    static getSetting({ app, ui }) {
        const div = index_1.default.get({
            layout: index_1.default.getLayoutInlineBlock({
                width: "22px",
                height: Icon.smallSize,
                margin: "2px"
            }),
            content: index_1.default.getContentBase(),
            animation: index_1.default.getAnimationBase({
                transform: "scale( 1 )"
            })
        });
        const commonWing = index_1.default.get({
            layout: index_1.default.getLayoutBlock({
                position: "absolute",
                margin: "0 auto",
                background: Container_1.default.reliefRGB,
                width: "3px",
                height: "3px",
                borderRadius: "1px"
            }),
            content: index_1.default.getContentBase(),
            animation: index_1.default.getAnimationBase({
                transform: `translate3d( 0px, 0px, 0px )`
            })
        });
        const wing1 = index_1.default.get({
            layout: commonWing,
            content: index_1.default.getContentBase(),
            animation: index_1.default.getAnimationBase({
                transform: `translate3d(9.5px, 2px, 0px) rotate(0deg)`
            })
        });
        const wing2 = index_1.default.get({
            layout: commonWing,
            content: index_1.default.getContentBase(),
            animation: index_1.default.getAnimationBase({
                transform: `translate3d( 15px, 4.5px, 0px ) rotate( 45deg )`
            })
        });
        const wing3 = index_1.default.get({
            layout: commonWing,
            content: index_1.default.getContentBase(),
            animation: index_1.default.getAnimationBase({
                transform: `translate3d( 16.5px, 9px, 0px ) rotate( 90deg )`
            })
        });
        const wing4 = index_1.default.get({
            layout: commonWing,
            content: index_1.default.getContentBase(),
            animation: index_1.default.getAnimationBase({
                transform: `translate3d( 15.5px, 14px, 0px ) rotate( 125deg )`
            })
        });
        const wing5 = index_1.default.get({
            layout: commonWing,
            content: index_1.default.getContentBase(),
            animation: index_1.default.getAnimationBase({
                transform: `translate3d( 10px, 17px, 0px ) rotate( 180deg )`
            })
        });
        const wing6 = index_1.default.get({
            layout: commonWing,
            content: index_1.default.getContentBase(),
            animation: index_1.default.getAnimationBase({
                transform: `translate3d( 4px, 14.5px, 0px ) rotate( 225deg )`
            })
        });
        const wing7 = index_1.default.get({
            layout: commonWing,
            content: index_1.default.getContentBase(),
            animation: index_1.default.getAnimationBase({
                transform: `translate3d( 2.5px, 9.5px, 0px ) rotate( 270deg )`
            })
        });
        const wing8 = index_1.default.get({
            layout: commonWing,
            content: index_1.default.getContentBase(),
            animation: index_1.default.getAnimationBase({
                transform: `translate3d( 4px, 4.5px, 0px ) rotate( 315deg )`
            })
        });
        const circle = index_1.default.get({
            layout: index_1.default.getLayoutBlock({
                position: "absolute",
                top: "3px",
                left: "4px",
                width: "14px",
                height: "14px",
                border: `3px solid ${Container_1.default.reliefRGB}`,
                borderRadius: "50px"
            }),
            content: index_1.default.getContentBase(),
            animation: index_1.default.getAnimationBase({
                transform: `translate3d( 0px, 1px, 0px )`
            })
        });
        return {
            div,
            wing1,
            wing2,
            wing3,
            wing4,
            wing5,
            wing6,
            wing7,
            wing8,
            circle
        };
    }
    static getThunder({ app, ui }) {
        let borderColor = Container_1.default.reliefRGBA;
        if (App_1.default.isActiveMultistream({ app, ui })) {
            borderColor = Container_1.default.themeRGBA;
        }
        const div = index_1.default.get({
            layout: index_1.default.getLayoutInlineBlock({
                width: "30px",
                height: "30px"
            }),
            content: index_1.default.getContentBase(),
            animation: index_1.default.getAnimationBase({
                transition: Container_1.default.transitionOff,
                transform: "rotate(0deg) translate(0px, 0px)"
            })
        });
        const wrap = index_1.default.get({
            layout: index_1.default.getLayoutInlineBlock({
                borderRadius: "50px"
            }),
            content: index_1.default.getContentBase(),
            animation: index_1.default.getAnimationBase({
                transition: Container_1.default.transitionOff,
                transform: "rotate(90deg) translate3d(0px,0px,0px)"
            })
        });
        const top = index_1.default.get({
            layout: index_1.default.getLayoutBlock({
                position: "relative",
                top: "0px",
                left: "0px",
                width: "0px",
                height: "0px",
                margin: "0 auto",
                borderWidth: "8px 8px 10px 8px",
                borderTopStyle: "solid",
                borderRightStyle: "solid",
                borderBottomStyle: "solid",
                borderLeftStyle: "solid",
                borderTopColor: "transparent",
                borderRightColor: "transparent",
                borderBottomColor: `${borderColor}`,
                borderLeftColor: "transparent",
                borderTopLeftRadius: "0px",
                borderTopRightRadius: "0px",
                borderBottomRightRadius: "0px",
                borderBottomLeftRadius: "0px"
            }),
            content: index_1.default.getContentBase(),
            animation: index_1.default.getAnimationBase({
                transition: Container_1.default.transitionOff,
                transform: "skew(60deg, 0deg) rotate(0deg) translate(-3px, -3px)"
            })
        });
        const bottom = index_1.default.get({
            layout: index_1.default.getLayoutFlex({
                position: "relative",
                top: "0px",
                left: "0px",
                width: "0px",
                height: "0px",
                margin: "0 auto",
                borderWidth: "8px 8px 10px 8px",
                borderTopStyle: "solid",
                borderRightStyle: "solid",
                borderBottomStyle: "solid",
                borderLeftStyle: "solid",
                borderTopColor: `${borderColor}`,
                borderRightColor: "transparent",
                borderBottomColor: "transparent",
                borderLeftColor: "transparent",
                borderTopLeftRadius: "0px",
                borderTopRightRadius: "0px",
                borderBottomRightRadius: "0px",
                borderBottomLeftRadius: "0px"
            }),
            content: index_1.default.getContentBase(),
            animation: index_1.default.getAnimationBase({
                transition: Container_1.default.transitionOff,
                transform: "skew(60deg, 0deg) rotate(0deg) translate(15px, -3px)"
            })
        });
        return { div, wrap, top, bottom };
    }
    static getPlay({ app, ui }) {
        const bgColor = ui.isOpenLinks ? Container_1.default.themeRGB : Container_1.default.reliefRGB;
        const div = index_1.default.get({
            layout: index_1.default.getLayoutFlex({
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "30px",
                height: "30px"
            }),
            content: index_1.default.getContentBase(),
            animation: index_1.default.getAnimationBase({
                transition: Container_1.default.transitionOff,
                transform: "translate(0px, 0px)"
            })
        });
        const playCircleSize = "24px";
        const playCircle = index_1.default.get({
            layout: index_1.default.getLayoutInlineBlock({
                position: "absolute",
                top: "5px",
                width: playCircleSize,
                height: playCircleSize,
                minWidth: playCircleSize,
                minHeight: playCircleSize,
                border: `2px solid ${bgColor}`,
                borderRadius: "30px"
            }),
            content: index_1.default.getContentBase(),
            animation: index_1.default.getAnimationBase({
                transition: Container_1.default.transitionOff,
                transform: "translate3d(0px,0px,0px)"
            })
        });
        const playTriangleSize = "6px";
        const playTriangle = index_1.default.get({
            layout: index_1.default.getLayoutInlineBlock({
                position: "relative",
                width: playTriangleSize,
                height: playTriangleSize,
                borderTop: `${playTriangleSize} solid transparent`,
                borderRight: `${playTriangleSize} solid transparent`,
                borderBottom: `${playTriangleSize} solid transparent`,
                borderLeft: `${playTriangleSize} solid ${bgColor}`
            }),
            content: index_1.default.getContentBase(),
            animation: index_1.default.getAnimationBase({
                transition: Container_1.default.transitionOff,
                transform: "translate3d(4px, 1.5px, 0px)"
            })
        });
        return { div, playCircle, playTriangle };
    }
    static getLinks({ app, ui }) {
        const bgColor = Container_1.default.themeRGB;
        const div = index_1.default.get({
            layout: index_1.default.getLayoutFlex({
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "30px",
                height: "30px"
            }),
            content: index_1.default.getContentBase(),
            animation: index_1.default.getAnimationBase({
                transition: Container_1.default.transitionOff,
                transform: "translate(0px, 0px)"
            })
        });
        const blockWidth = "24px";
        const blockHeight = "14px";
        const linksA1 = index_1.default.get({
            layout: index_1.default.getLayoutInlineBlock({
                position: "absolute",
                top: "5px",
                left: "6px",
                width: blockWidth,
                height: blockHeight,
                border: `2px solid ${bgColor}`,
                borderRadius: "30px"
            }),
            content: index_1.default.getContentBase(),
            animation: index_1.default.getAnimationBase({
                transition: Container_1.default.transitionOff,
                transform: "translate3d(0px,0px,0px)"
            })
        });
        const whiteSize = "4px";
        const linksA2 = index_1.default.get({
            layout: index_1.default.getLayoutInlineBlock({
                position: "relative",
                top: "5px",
                left: "5px",
                width: whiteSize,
                height: whiteSize,
                borderRadius: "10px",
                background: Container_1.default.whiteRGB
            }),
            content: index_1.default.getContentBase(),
            animation: index_1.default.getAnimationBase({})
        });
        const linksB1 = index_1.default.get({
            layout: index_1.default.getLayoutInlineBlock({
                position: "absolute",
                top: "11px",
                left: "0px",
                width: blockWidth,
                height: blockHeight,
                border: `2px solid ${bgColor}`,
                borderRadius: "30px"
            }),
            content: index_1.default.getContentBase(),
            animation: index_1.default.getAnimationBase({
                transition: Container_1.default.transitionOff,
                transform: "translate3d(0px,0px,0px)"
            })
        });
        const linksB2 = index_1.default.get({
            layout: index_1.default.getLayoutInlineBlock({
                position: "relative",
                top: "-5px",
                left: "-5px",
                width: whiteSize,
                height: whiteSize,
                borderRadius: "10px",
                background: Container_1.default.whiteRGB
            }),
            content: index_1.default.getContentBase(),
            animation: index_1.default.getAnimationBase({})
        });
        return { div, linksA1, linksA2, linksB1, linksB2 };
    }
    static getBubble({ app, ui }) {
        const background = ui.isBubblePost ? Container_1.default.themeRGB : Container_1.default.reliefRGBA;
        const div = index_1.default.get({
            layout: index_1.default.getLayoutFlex({
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                width: "30px",
                height: "30px"
            }),
            content: index_1.default.getContentBase(),
            animation: index_1.default.getAnimationBase({
                transition: Container_1.default.transitionOff,
                transform: "translate(0px, 0px)"
            })
        });
        const bubble = index_1.default.get({
            layout: index_1.default.getLayoutInlineBlock({
                position: "relative",
                top: "5px",
                width: "18px",
                height: "14px",
                background,
                borderRadius: "30px"
            }),
            content: index_1.default.getContentBase(),
            animation: index_1.default.getAnimationBase({
                transition: Container_1.default.transitionOff,
                transform: "translate3d(0px,0px,0px)"
            })
        });
        const bubbleBar = index_1.default.get({
            layout: index_1.default.getLayoutInlineBlock({
                position: "relative",
                top: "5px",
                width: "5px",
                height: "10px",
                background,
                border: `3px solid ${background}`
            }),
            content: index_1.default.getContentBase(),
            animation: index_1.default.getAnimationBase({
                transition: Container_1.default.transitionOff,
                transform: "skew(30deg, 28deg) rotate(30deg) translate3d(-2px, -7px, 0px)"
            })
        });
        return { div, bubble, bubbleBar };
    }
    static getDetail({ app, ui }) {
        const margin = ui.screenMode === Ui_1.default.screenModeSmallLabel ? "3px 0px 0px 0px" : "1px auto";
        const div = index_1.default.get({
            layout: index_1.default.getLayoutFlex({
                width: "40px",
                height: "40px",
                borderRadius: "100px",
                margin,
                cursor: "pointer"
            }),
            content: index_1.default.getContentBase(),
            animation: index_1.default.getAnimationBase()
        });
        const wrap = index_1.default.get({
            layout: index_1.default.getLayoutBlock({
                width: "26px",
                height: "28px",
                margin: "7px auto",
                borderRadius: "2px",
                background: `${Container_1.default.calmRGB}`
            }),
            content: index_1.default.getContentBase(),
            animation: index_1.default.getAnimationBase()
        });
        const commonSpan = index_1.default.get({
            layout: index_1.default.getLayoutBlock({
                width: "14px",
                height: "2px",
                margin: "3px auto",
                borderRadius: "6px",
                background: Container_1.default.whiteRGB
            }),
            content: index_1.default.getContentBase(),
            animation: index_1.default.getAnimationBase()
        });
        const bar1 = index_1.default.get({
            layout: Object.assign(Object.assign({}, commonSpan), { width: "7px", margin: "5px 0px 0px 6px" }),
            content: index_1.default.getContentBase(),
            animation: index_1.default.getAnimationBase({
                transform: `translate3d( 0px, 0px, 0px )`
            })
        });
        const bar2 = index_1.default.get({
            layout: commonSpan,
            content: index_1.default.getContentBase(),
            animation: index_1.default.getAnimationBase({
                transform: `translate3d( 0px, 0px, 0px )`
            })
        });
        const bar3 = index_1.default.get({
            layout: commonSpan,
            content: index_1.default.getContentBase(),
            animation: index_1.default.getAnimationBase({
                transition: Container_1.default.getTransition({ app, ui }),
                transform: `translate3d( 0px, 0px, 0px )`
            })
        });
        const bar4 = index_1.default.get({
            layout: commonSpan,
            content: index_1.default.getContentBase(),
            animation: index_1.default.getAnimationBase({
                transition: Container_1.default.getTransition({ app, ui }),
                transform: `translate3d( 0px, 0px, 0px )`
            })
        });
        const mekuri = index_1.default.get({
            layout: Object.assign(Object.assign({}, commonSpan), { position: "absolute", top: 0, rightt: 0, width: 0, height: 0, borderRadius: 0, borderTop: `4px solid ${Container_1.default.whiteRGB}`, borderLeft: `4px solid ${Container_1.default.whiteRGB}`, borderRight: `4px solid ${Container_1.default.reliefRGB}`, borderBottom: `4px solid ${Container_1.default.reliefRGB}` }),
            content: index_1.default.getContentBase(),
            animation: index_1.default.getAnimationBase({
                transform: `translate3d(18px, -3px, 0px) rotate( 90deg )`
            })
        });
        return { div, wrap, bar1, bar2, bar3, bar4, mekuri };
    }
    static getMenu({ app, ui }) {
        const div = index_1.default.get({
            layout: index_1.default.getLayoutInlineBlock({
                width: "40px",
                height: "40px",
                margin: "4px auto"
            }),
            content: index_1.default.getContentBase(),
            animation: index_1.default.getAnimationBase({
                transition: Container_1.default.getTransition({ app, ui })
            })
        });
        const dot = index_1.default.get({
            layout: index_1.default.getLayoutBlock({
                width: "6px",
                height: "6px",
                margin: "4px auto",
                borderRadius: "6px",
                background: Container_1.default.calmRGB
            }),
            content: index_1.default.getContentBase(),
            animation: index_1.default.getAnimationBase()
        });
        return { div, dot };
    }
    static getHeadTabLeftTransform() {
        return Icon.getHeadTabLeftOpenTransform;
    }
    static getHeadTabRightTransform() {
        return Icon.getHeadTabRightOpenTransform;
    }
    static get getHeadTabLeftOpenTransform() {
        return "rotate( 120deg ) translate3d(3px, 5px, 0px)";
    }
    static get getHeadTabRightOpenTransform() {
        return "rotate( -120deg ) translate3d(-3px, 5px, 0px)";
    }
    static get getHeadTabLeftCloseTransform() {
        return "rotate( 90deg ) translate3d(3px, 5px, 0px)";
    }
    static get getHeadTabRightCloseTransform() {
        return "rotate( -90deg ) translate3d(-3px, 5px, 0px)";
    }
    static getHeadTab({ app, ui }) {
        const commonLayout = index_1.default.getLayoutInlineBlock({
            width: "4px",
            borderRadius: "10px",
            background: Container_1.default.calmRGB
        });
        const div = index_1.default.get({
            layout: index_1.default.getLayoutBlock({
                width: "40px",
                height: "20px"
            }),
            content: index_1.default.getContentBase(),
            animation: index_1.default.getAnimationBase()
        });
        const left = index_1.default.get({
            layout: commonLayout,
            content: index_1.default.getContentBase(),
            animation: index_1.default.getAnimationBase({
                transition: Container_1.default.getTransition({ app, ui }),
                transform: Icon.getHeadTabLeftTransform()
            })
        });
        const right = index_1.default.get({
            layout: commonLayout,
            content: index_1.default.getContentBase(),
            animation: index_1.default.getAnimationBase({
                transition: Container_1.default.getTransition({ app, ui }),
                transform: Icon.getHeadTabRightTransform()
            })
        });
        return { div, left, right };
    }
    static getHeart({ app, ui }) {
        const color = ui.openLockMenu === Ui_1.default.openLockMenuLabelShare ? Container_1.default.themeRGBA : Container_1.default.reliefRGB;
        const div = index_1.default.get({
            layout: index_1.default.getLayoutInlineBlock({
                width: Icon.smallSize,
                height: Icon.smallSize,
                margin: "2px"
            }),
            content: index_1.default.getContentBase({}),
            animation: index_1.default.getAnimationBase({})
        });
        const before = index_1.default.get({
            layout: index_1.default.getLayoutBase({
                width: "10px",
                height: "17px",
                borderRadius: "10px 10px 0 0",
                background: Container_1.default.reliefRGB
            }),
            content: index_1.default.getContentBase(),
            animation: index_1.default.getAnimationBase({
                transform: "rotate(-45deg) translate3d(0px, 7px, 0px)"
            })
        });
        const after = index_1.default.get({
            layout: index_1.default.getLayoutBase({
                width: "17px",
                height: "10px",
                borderRadius: "0 10px 10px 0",
                background: Container_1.default.reliefRGB
            }),
            content: index_1.default.getContentBase({}),
            animation: index_1.default.getAnimationBase({
                transform: "rotate(-45deg) translate3d(11px, -1px, 0px)"
            })
        });
        return { div, before, after };
    }
    static getShare({ app, ui }) {
        const color = ui.openLockMenu === Ui_1.default.openLockMenuLabelShare ? Container_1.default.themeRGBA : Container_1.default.reliefRGB;
        const div = index_1.default.get({
            layout: index_1.default.getLayoutInlineBlock({
                width: Icon.smallSize,
                height: Icon.smallSize,
                margin: "2px"
            }),
            content: index_1.default.getContentBase({}),
            animation: index_1.default.getAnimationBase({})
        });
        const base = index_1.default.get({
            layout: index_1.default.getLayoutInlineBlock({
                position: "absolute",
                top: "11px",
                left: "9px",
                width: "16px",
                height: "14px",
                margin: "0 auto",
                border: `2px solid ${color}`,
                borderRadius: "3px"
            }),
            content: index_1.default.getContentBase(),
            animation: index_1.default.getAnimationBase({
                transform: "translate3d(-4px, -1px, 0px)"
            })
        });
        const bar = index_1.default.get({
            layout: index_1.default.getLayoutInlineBlock({
                position: "absolute",
                top: "6px",
                left: "16px",
                width: "2px",
                height: "11px",
                margin: "0 auto",
                background: color
            }),
            content: index_1.default.getContentBase({}),
            animation: index_1.default.getAnimationBase({
                transform: "translate3d(-4px, -1px, 0px)"
            })
        });
        const whiteBar1 = index_1.default.get({
            layout: index_1.default.getLayoutInlineBlock({
                position: "absolute",
                width: "5px",
                height: "4px",
                top: "10px",
                left: "11px",
                margin: "0 auto",
                background: "rgb(250, 250, 250)",
                zIndex: 100
            }),
            content: index_1.default.getContentBase({}),
            animation: index_1.default.getAnimationBase({
                transform: "translate3d(-4px, 0px, 0px)"
            })
        });
        const whiteBar2 = index_1.default.get({
            layout: index_1.default.getLayoutInlineBlock({
                position: "absolute",
                width: "5px",
                height: "4px",
                top: "10px",
                left: "18px",
                margin: "0 auto",
                background: "rgb(250, 250, 250)",
                zIndex: 100
            }),
            content: index_1.default.getContentBase({}),
            animation: index_1.default.getAnimationBase({
                transform: "translate3d(-4px, 0px, 0px)"
            })
        });
        const arrow = index_1.default.get({
            layout: index_1.default.getLayoutInlineBlock({
                position: "absolute",
                top: "5px",
                left: "13px",
                width: "8px",
                height: "8px",
                borderTop: `2px solid ${color}`,
                borderRight: `2px solid ${color}`
            }),
            content: index_1.default.getContentBase({}),
            animation: index_1.default.getAnimationBase({
                transform: "translate3d(-4px, -1px, 0px) rotate( -45deg)"
            })
        });
        return { div, base, whiteBar1, whiteBar2, bar, arrow };
    }
    static getMoney({ app, ui }) {
        const div = index_1.default.get({
            layout: index_1.default.getLayoutInlineBlock({
                width: Icon.smallSize,
                height: Icon.smallSize,
                margin: "2px"
            }),
            content: index_1.default.getContentBase({}),
            animation: index_1.default.getAnimationBase({})
        });
        const outer = index_1.default.get({
            layout: index_1.default.getLayoutBlock({
                margin: "0 auto",
                width: "22px",
                height: "22px",
                borderRadius: "24px",
                border: `2px solid ${Container_1.default.reliefRGB}`
            }),
            content: index_1.default.getContentBase(),
            animation: index_1.default.getAnimationBase({
                transform: "translate3d(0px, 3px, 0px)"
            })
        });
        const inner = index_1.default.get({
            layout: index_1.default.getLayoutBlock({
                margin: "0 auto",
                width: "8px",
                height: "8px",
                borderRadius: "8px",
                border: `2px solid ${Container_1.default.reliefRGB}`
            }),
            content: index_1.default.getContentBase({}),
            animation: index_1.default.getAnimationBase({
                transform: "translate3d(0px, 5px, 0px)"
            })
        });
        return { div, outer, inner };
    }
    static getOpenEmoji(state) {
        const { app, ui } = state;
        const size = "5px";
        const display = Ui_1.default.screenModeSmallLabel === ui.screenMode ? "none" : "inline-block";
        const div = index_1.default.get({
            layout: index_1.default.getLayoutInlineBlock({
                display,
                width: size,
                height: size,
                minWidth: size,
                minHeight: size,
                margin: "0px 5px 0px 0px",
                borderRight: `${size} solid transparent`,
                borderTop: `${size} solid transparent`,
                borderBottom: `${size} solid transparent`,
                borderLeft: `${size} solid rgba(200,200,200,0.8)`
            }),
            content: index_1.default.getContentBase({}),
            animation: index_1.default.getAnimationBase({
                transform: "translate3d( 5px, 0px, 0px )",
                transition: Container_1.default.getTransition({ app, ui })
            })
        });
        return { div };
    }
    static getCloseEmoji({ app, ui }) {
        const size = "8px";
        const div = index_1.default.get({
            layout: index_1.default.getLayoutInlineBlock({
                width: size,
                height: size,
                minWidth: size,
                minHeight: size,
                margin: "0px 0px 0px -20px",
                borderRight: `${size} solid rgba(200,200,200,0.8)`,
                borderTop: `${size} solid transparent`,
                borderBottom: `${size} solid transparent`,
                borderLeft: `${size} solid transparent`
            }),
            content: index_1.default.getContentBase({}),
            animation: index_1.default.getAnimationBase({
                transform: "translate3d( 5px, 0px, 0px )",
                transition: Container_1.default.getTransition({ app, ui })
            })
        });
        return { div };
    }
    static getClose({ app, ui }) {
        const div = index_1.default.get({
            layout: index_1.default.getLayoutInlineBlock({
                width: "26px",
                height: "26px",
                margin: "1px"
            }),
            content: index_1.default.getContentBase({}),
            animation: index_1.default.getAnimationBase({})
        });
        const circle = index_1.default.get({
            layout: index_1.default.getLayoutBlock({
                position: "absolute",
                margin: "0 auto",
                width: "26px",
                height: "26px",
                border: `2px solid ${Container_1.default.calmRGB}`,
                borderRadius: "30px"
            }),
            content: index_1.default.getContentBase(),
            animation: index_1.default.getAnimationBase({
                transform: "translate3d(0px, 0px, 0px) rotate(0deg)"
            })
        });
        const bar1 = index_1.default.get({
            layout: index_1.default.getLayoutBlock({
                position: "absolute",
                margin: "0 auto",
                width: "2px",
                height: "18px",
                background: Container_1.default.calmRGBA,
                borderRadius: "2px"
            }),
            content: index_1.default.getContentBase(),
            animation: index_1.default.getAnimationBase({
                transform: "translate3d(10px, 2px, 0px) rotate(45deg)"
            })
        });
        const bar2 = index_1.default.get({
            layout: index_1.default.getLayoutBlock({
                position: "absolute",
                margin: "0 auto",
                width: "2px",
                height: "18px",
                background: Container_1.default.calmRGBA,
                borderRadius: "2px"
            }),
            content: index_1.default.getContentBase({}),
            animation: index_1.default.getAnimationBase({
                transform: "translate3d(10px, 2px, 0px) rotate(-45deg)"
            })
        });
        return { div, circle, bar1, bar2 };
    }
    static getCh({ app, ui }) {
        const color = Container_1.default.lightGrayRGB;
        const div = index_1.default.get({
            layout: index_1.default.getLayoutFlex({
                width: "44px",
                height: "44px"
            }),
            content: index_1.default.getContentBase({
                cursor: "pointer"
            }),
            animation: index_1.default.getAnimationBase({})
        });
        const circle1 = index_1.default.get({
            layout: index_1.default.getLayoutFlex({
                position: "absolute",
                top: "0px",
                width: "inherit",
                height: "inherit",
                border: `2px solid ${color}`,
                borderRadius: "30px"
            }),
            content: {},
            animation: {}
        });
        const circle2 = index_1.default.get({
            layout: index_1.default.getLayoutFlex({
                width: "75%",
                height: "75%",
                border: `2px solid ${color}`,
                borderRadius: "30px"
            }),
            content: index_1.default.getContentBase({
                cursor: "pointer"
            }),
            animation: index_1.default.getAnimationBase({})
        });
        const str = index_1.default.get({
            layout: index_1.default.getLayoutFlex({
                width: "inherit",
                height: "inherit",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "30px"
            }),
            content: index_1.default.getContentBase({
                lineHeight: 2,
                color,
                fontSize: "10px"
            }),
            animation: index_1.default.getAnimationBase({})
        });
        const commonShadowLayout = {
            width: "24px",
            height: "24px",
            background: Container_1.default.lightRGB,
            position: "absolute",
            zIndex: 10
        };
        const shadow1 = index_1.default.get({
            layout: Object.assign(Object.assign({}, commonShadowLayout), { top: "-4px" }),
            content: {},
            animation: {
                transform: "rotate(45deg) scale3d(1, 1, 1) skew(-57deg, -57deg)"
            }
        });
        const shadow2 = index_1.default.get({
            layout: Object.assign(Object.assign({}, commonShadowLayout), { top: "24px" }),
            content: {},
            animation: {
                transform: "rotate(45deg) scale3d(1, 1, 1) skew(-57deg, -57deg)"
            }
        });
        return { div, circle1, circle2, str, shadow1, shadow2 };
    }
    static getUpdate({ app, ui }) {
        const color = Container_1.default.whiteRGB;
        const div = index_1.default.get({
            layout: index_1.default.getLayoutFlex({
                width: Icon.middleSize,
                height: Icon.middleSize
            }),
            content: index_1.default.getContentBase({
                cursor: "pointer"
            }),
            animation: index_1.default.getAnimationBase({
                transform: "scale( 0.75)"
            })
        });
        const circle = index_1.default.get({
            layout: index_1.default.getLayoutBase({
                width: "55%",
                height: "55%",
                borderRadius: "30px",
                border: `2px solid ${color}`,
                overflow: "visible"
            }),
            content: index_1.default.getContentBase({
                cursor: "pointer"
            }),
            animation: index_1.default.getAnimationBase({})
        });
        const bar = index_1.default.get({
            layout: index_1.default.getLayoutBase({
                position: "relative",
                top: "1px",
                left: "12px",
                width: "8px",
                height: "8px",
                background: "none",
                borderTop: `0px solid ${Container_1.default.themeRGB}`,
                borderRight: `2px solid ${color}`,
                borderBottom: `2px solid ${color}`,
                borderLeft: `0px solid ${Container_1.default.themeRGB}`
            }),
            content: index_1.default.getContentBase({
                cursor: "pointer"
            }),
            animation: index_1.default.getAnimationBase({
                transform: "rotate(25deg)"
            })
        });
        const white = index_1.default.get({
            layout: index_1.default.getLayoutBase({
                position: "relative",
                top: "2px",
                left: "12px",
                width: "10px",
                height: "4px",
                background: "rgba(100, 192, 170, 1)"
            }),
            content: index_1.default.getContentBase({
                cursor: "pointer"
            }),
            animation: index_1.default.getAnimationBase({
                transform: "rotate(25deg)"
            })
        });
        return { div, circle, bar, white };
    }
    static getLoading({ app, ui }) {
        const color = Container_1.default.whiteRGB;
        const div = index_1.default.get({
            layout: index_1.default.getLayoutFlex({}),
            content: index_1.default.getContentBase({}),
            animation: index_1.default.getAnimationBase({})
        });
        const circle = index_1.default.get({
            layout: index_1.default.getLayoutBase({
                margin: "0 auto",
                width: "5em",
                height: "5em",
                borderRadius: "50%",
                borderTop: `0.6em solid rgba(255, 255, 255, 0.2)`,
                borderRight: "0.6em solid rgba(255, 255, 255, 0.2)",
                borderBottom: "0.6em solid rgba(255, 255, 255, 0.2)",
                borderLeft: "0.6em solid #ffffff"
            }),
            content: index_1.default.getContentBase({
                fontSize: "5px"
            }),
            animation: index_1.default.getAnimationBase({
                transform: "translateZ(0)",
                animation: "Rotation 1.1s infinite linear"
            })
        });
        const after = index_1.default.get({
            layout: index_1.default.getLayoutBase({
                display: "none",
                borderRadius: "50%",
                width: "5em",
                height: "5em"
            }),
            content: index_1.default.getContentBase(),
            animation: index_1.default.getAnimationBase({})
        });
        return { div, circle, after };
    }
    static getTune({ app, ui }) {
        const size = "30px";
        const zIndex = 1000000;
        const bgColor = Container_1.default.chromeOffTabRGB;
        const top1 = "153px";
        const top2 = "190px";
        const top3 = "280px";
        const top4 = "317px";
        const left1 = "69px";
        const left2 = "146px";
        const left3 = "324px";
        const left4 = "401px";
        const div = index_1.default.get({
            layout: index_1.default.getLayoutFlex({
                position: "absolute",
                width: "500px",
                height: "500px"
            }),
            content: index_1.default.getContentBase({}),
            animation: index_1.default.getAnimationBase({
                transform: "scale(0.1)"
            })
        });
        const side1 = index_1.default.get({
            layout: index_1.default.getLayoutBase({
                position: "absolute",
                top: "135px",
                left: "135px",
                border: `${size} solid ${bgColor}`,
                borderRadius: "300px",
                width: "230px",
                height: "230px",
                zIndex: 0
            }),
            content: index_1.default.getContentBase({}),
            animation: index_1.default.getAnimationBase({})
        });
        const side2 = index_1.default.get({
            layout: index_1.default.getLayoutBase({
                position: "absolute",
                top: "50px",
                left: "50px",
                border: `${size} solid ${bgColor}`,
                borderRadius: "300px",
                width: "400px",
                height: "400px",
                zIndex: 0
            }),
            content: index_1.default.getContentBase({}),
            animation: index_1.default.getAnimationBase({})
        });
        const cut = index_1.default.get({
            layout: index_1.default.getLayoutBase({
                position: "absolute",
                top: "50px",
                left: "-150px",
                background: "none",
                width: "0px",
                height: "0px",
                borderTop: `200px solid ${Container_1.default.lightRGB}`,
                borderRight: "400px solid rgba(255,255,255,0)",
                borderBottom: `200px solid ${Container_1.default.lightRGB}`,
                borderLeft: "400px solid rgba(255,255,255,0)",
                zIndex: 1
            }),
            content: index_1.default.getContentBase({}),
            animation: index_1.default.getAnimationBase({})
        });
        const center = index_1.default.get({
            layout: index_1.default.getLayoutBase({
                position: "absolute",
                top: "220px",
                left: "220px",
                width: "60px",
                height: "60px",
                borderRadius: "100px",
                background: bgColor,
                zIndex
            }),
            content: index_1.default.getContentBase({}),
            animation: index_1.default.getAnimationBase({})
        });
        const terminalLeftTop1 = index_1.default.get({
            layout: index_1.default.getLayoutBase({
                position: "absolute",
                top: top1,
                left: left1,
                width: size,
                height: size,
                borderRadius: "100px",
                background: bgColor,
                zIndex
            }),
            content: index_1.default.getContentBase({}),
            animation: index_1.default.getAnimationBase({})
        });
        const terminalLeftTop2 = index_1.default.get({
            layout: index_1.default.getLayoutBase({
                position: "absolute",
                top: top2,
                left: left2,
                width: size,
                height: size,
                borderRadius: "100px",
                background: bgColor,
                zIndex
            }),
            content: index_1.default.getContentBase({}),
            animation: index_1.default.getAnimationBase({})
        });
        const terminalLeftBottom1 = index_1.default.get({
            layout: index_1.default.getLayoutBase({
                position: "absolute",
                top: top4,
                left: left1,
                width: size,
                height: size,
                borderRadius: "100px",
                background: bgColor,
                zIndex
            }),
            content: index_1.default.getContentBase({}),
            animation: index_1.default.getAnimationBase({})
        });
        const terminalLeftBottom2 = index_1.default.get({
            layout: index_1.default.getLayoutBase({
                position: "absolute",
                top: top3,
                left: left2,
                width: size,
                height: size,
                borderRadius: "100px",
                background: bgColor,
                zIndex
            }),
            content: index_1.default.getContentBase({}),
            animation: index_1.default.getAnimationBase({})
        });
        const terminalRightTop1 = index_1.default.get({
            layout: index_1.default.getLayoutBase({
                position: "absolute",
                top: top1,
                left: left4,
                width: size,
                height: size,
                borderRadius: "100px",
                background: bgColor,
                zIndex
            }),
            content: index_1.default.getContentBase({}),
            animation: index_1.default.getAnimationBase({})
        });
        const terminalRightTop2 = index_1.default.get({
            layout: index_1.default.getLayoutBase({
                position: "absolute",
                top: top2,
                left: left3,
                width: size,
                height: size,
                borderRadius: "100px",
                background: bgColor,
                zIndex
            }),
            content: index_1.default.getContentBase({}),
            animation: index_1.default.getAnimationBase({})
        });
        const terminalRightBottom1 = index_1.default.get({
            layout: index_1.default.getLayoutBase({
                position: "absolute",
                top: top4,
                left: left4,
                width: size,
                height: size,
                borderRadius: "100px",
                background: bgColor,
                zIndex
            }),
            content: index_1.default.getContentBase({}),
            animation: index_1.default.getAnimationBase({})
        });
        const terminalRightBottom2 = index_1.default.get({
            layout: index_1.default.getLayoutBase({
                position: "absolute",
                top: top3,
                left: left3,
                width: size,
                height: size,
                borderRadius: "100px",
                background: bgColor,
                zIndex
            }),
            content: index_1.default.getContentBase({}),
            animation: index_1.default.getAnimationBase({})
        });
        return {
            div,
            side1,
            side2,
            cut,
            center,
            terminalLeftTop1,
            terminalLeftTop2,
            terminalLeftBottom1,
            terminalLeftBottom2,
            terminalRightTop1,
            terminalRightTop2,
            terminalRightBottom1,
            terminalRightBottom2
        };
    }
}
exports.default = Icon;
//# sourceMappingURL=Icon.js.map