"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const TalknComponent_1 = __importDefault(require("client/components/TalknComponent"));
const Ui_1 = __importDefault(require("client/store/Ui"));
class Style extends TalknComponent_1.default {
    constructor(props) {
        super(props);
    }
    render() {
        const { app, ui } = this.props.state;
        let letterSpacing;
        let fontSize = ui.screenMode === Ui_1.default.screenModeSmallLabel ? 12 : 13;
        let lineHeight = ui.screenMode === Ui_1.default.screenModeSmallLabel ? 11 : 17;
        switch (ui.screenMode) {
            case Ui_1.default.screenModeSmallLabel:
                letterSpacing = "1vw";
                break;
            case Ui_1.default.screenModeMiddleLabel:
                letterSpacing = "3.5px";
                break;
            case Ui_1.default.screenModeLargeLabel:
                letterSpacing = "4px";
                break;
        }
        return (react_1.default.createElement("style", { type: "text/css" }, `
          #talkn textarea::placeholder {
            text-indent: 3% !important;
            font-size: ${fontSize}px !important;
            letter-spacing: ${letterSpacing} !important;
            line-height: ${lineHeight}px !important;
            color: rgb(170, 170, 170);
          }
          #talkn input::placeholder {
            text-indent: 3%;
            font-size: ${fontSize}px;
            letter-spacing: 1px;
            color: rgb(170, 170, 170);
          }
          @keyframes Rotation {
            0%   { transform: rotate(0deg) scale( 0.7 );  }
            100%   { transform: rotate(360deg) scale( 0.7 );  }
          }
          @keyframes LogoWrap1 {
            0%   { transform: translate3d( 0px, 0px, 0px ) scale(0) rotate(0deg); opacity: 0.0; box-shadow: 0px 0px 1px 0px rgba( 79, 174, 159, 0.0 ), 80px 80px 80px 0px rgba( 79, 174, 159, 0.0 ) inset; }
            25%   { transform: translate3d( 0px, 0px, 0px ) scale(1.0) rotate(0deg); opacity: 1.0; box-shadow: 0px 20px 80px 10px rgba( 79, 174, 159, 0.6 ), 80px 80px 80px 0px rgba( 79, 174, 159, 0.6 ) inset;}
            50%   { transform: translate3d( 0px, 2px, 0px ) scale(0.95) rotate(0deg); opacity: 1.0; box-shadow: 0px 20px 80px 10px rgba( 79, 174, 159, 0.65 ), 80px 80px 80px 0px rgba( 79, 174, 159, 0.65 ) inset;}
            80%   { transform: translate3d( 0px, 50px, 0px ) scale(0.3) rotate(0deg); opacity: 0.0; box-shadow: 0px 0px 1px 0px rgba( 79, 174, 159, 1.0 ), 80px 80px 80px 0px rgba( 79, 174, 159, 1.0 ) inset;}
            100%   { transform: translate3d( 0px, 0px, 0px ) scale(0.1) rotate(0deg); opacity: 0.0; box-shadow: 0px 0px 1px 0px rgba( 79, 174, 159, 1.0 ), 80px 80px 80px 0px rgba( 79, 174, 159, 1.0 ) inset;}
          }
          @keyframes Logo {
            0%   { transform: scale(0.95) translate3d(0px, 0px, 0px); opacity: 1.0; }
            50%   { transform: scale(1.05) translate3d(0px, 0px, 0px); opacity: 1.0; }
            100%   { transform: scale(0.95) translate3d(0px, 0px, 0px); opacity: 1.0; }
          }
          .LogoScreen{
            width: 100vw;
            height: 90vh;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .LogoWrap1 {
            position: absolute;
            animation-name: LogoWrap1;
            animation-duration: 2000ms;
            animation-iteration-count: infinite;
            width: 110px;
            height: 110px;
            border-radius: 110px;
            box-shadow: 0px 0px 30px 0px rgba( 100, 100, 100, 0.6 ), 80px 80px 80px 0px rgba( 79, 174, 159, 0.4 ) inset;
            transform: translate3d(0px, 0px, 0px) scale(0);
          }
          .Logo {
            animation-name: Logo;
            animation-duration: 2000ms;
            animation-iteration-count: infinite;
            width: 100px;
            height: 100px;
            transition: 600ms;
          }
          .LogoCh {
            font-size: 20px;
            font-weight: bold;
            color: rgba(69, 164, 149, 1);
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Hiragino Sans", "Noto Sans CJK JP", "Original Yu Gothic", "Yu Gothic", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Sans Emoji";
            border: 5px solid rgba(69, 164, 149, 1);
            border-radius: 100px;
            padding: 10px 20px 10px 20px;
          }
        `));
    }
}
exports.default = Style;
//# sourceMappingURL=Style.js.map