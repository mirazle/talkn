"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const TalknComponent_1 = __importDefault(require("client/components/TalknComponent"));
const Sequence_1 = __importDefault(require("api/Sequence"));
const App_1 = __importDefault(require("api/store/App"));
const Ui_1 = __importDefault(require("api/store/Ui"));
const Audio_1 = __importDefault(require("client/components/Media/Audio"));
const Video_1 = __importDefault(require("client/components/Media/Video"));
class Media extends TalknComponent_1.default {
    constructor(props) {
        super(props);
        const { thread } = this.apiState;
        const { ui } = props.clientState;
        let src = "";
        let mediaType = "";
        if (ui.extensionMode === Ui_1.default.extensionModeExtNoneLabel) {
            if (thread.protocol === Sequence_1.default.HTTP_PROTOCOL || thread.protocol === Sequence_1.default.HTTPS_PROTOCOL) {
                src = thread.protocol + "/" + thread.ch.replace(/\/$/, "");
                mediaType = App_1.default.getMediaTypeFromSrc(src);
            }
        }
        this.state = {
            src,
            mediaType
        };
    }
    componentWillReceiveProps(props) {
        const { thread } = this.apiState;
        const { ui } = props.state;
        if (ui.extensionMode === Ui_1.default.extensionModeExtNoneLabel) {
            if (thread.protocol === Sequence_1.default.HTTP_PROTOCOL || thread.protocol === Sequence_1.default.HTTPS_PROTOCOL) {
                const { src, mediaType } = this.state;
                const newSrc = thread.protocol + "/" + thread.ch.replace(/\/$/, "");
                const newMediaType = App_1.default.getMediaTypeFromSrc(newSrc);
                if (src !== newSrc || mediaType !== newMediaType) {
                    this.setState({ src: newSrc, mediaType: newMediaType });
                }
            }
            else {
                this.setState({ src: "", mediaType: "" });
            }
        }
    }
    render() {
        const { src, mediaType } = this.state;
        switch (mediaType) {
            case App_1.default.mediaTagTypeAudio:
                return react_1.default.createElement(Audio_1.default, Object.assign({}, this.props, { src: src }));
            case App_1.default.mediaTagTypeVideo:
                return react_1.default.createElement(Video_1.default, Object.assign({}, this.props, { src: src }));
            default:
                return null;
        }
    }
}
exports.default = Media;
//# sourceMappingURL=index.js.map