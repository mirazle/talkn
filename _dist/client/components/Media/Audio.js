"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const TalknComponent_1 = __importDefault(require("client/components/TalknComponent"));
class Audio extends TalknComponent_1.default {
    constructor(props) {
        super(props);
    }
    render() {
        const { src, state } = this.props;
        const { style } = state;
        return (react_1.default.createElement("audio", { src: src, style: style.audio.self, preload: "true", loop: false, controls: true, autoPlay: false, "data-component-name": "Audio" }));
    }
}
exports.default = Audio;
//# sourceMappingURL=Audio.js.map