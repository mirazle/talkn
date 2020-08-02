"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const TalknComponent_1 = __importDefault(require("client/components/TalknComponent"));
const Sequence_1 = __importDefault(require("api/Sequence"));
const Board_1 = __importDefault(require("client/style/Board"));
const Link_1 = __importDefault(require("client/components/Link"));
class Links extends TalknComponent_1.default {
    static getCh(str, thread) {
        let ch = "";
        const isIncludeProtocol = Links.isIncludeProtocol(str);
        if (isIncludeProtocol) {
            ch = Links.removeProtocol(str);
        }
        else {
            if (str && typeof str === "string" && str.indexOf("/") === 0) {
                ch = "/" + thread.host + str;
            }
            else {
                const splitedCh = thread.ch.split("/");
                const splitedChLength = splitedCh.length - 2;
                let chPart = "";
                for (let i = 0; i < splitedChLength; i++) {
                    chPart = chPart + splitedCh[i] + "/";
                }
                ch = chPart + str + "/";
                if (ch.indexOf(thread.host) === -1) {
                    ch = "/" + thread.host + ch;
                }
            }
        }
        if (ch.lastIndexOf("/") !== ch.length - 1) {
            ch = ch + "/";
        }
        return ch;
    }
    static isIncludeProtocol(str) {
        if (str && typeof str === "string") {
            if (str.indexOf(Sequence_1.default.HTTP_PROTOCOL) >= 0) {
                return true;
            }
            if (str.indexOf(Sequence_1.default.HTTPS_PROTOCOL) >= 0) {
                return true;
            }
        }
        return false;
    }
    static removeProtocol(str) {
        return str.replace(`${Sequence_1.default.HTTP_PROTOCOL}/`, "").replace(`${Sequence_1.default.HTTPS_PROTOCOL}/`, "");
    }
    constructor(props) {
        super(props);
        const { thread } = props.state;
        this.state = {
            ch: thread.ch,
            linkContents: {
                html: [],
                music: [],
                movie: [],
            },
            displayLinks: false,
            linkContentsKey: "html",
        };
        this.setLinkContents = this.setLinkContents.bind(this);
        this.renderLinkTabs = this.renderLinkTabs.bind(this);
        this.handleOnClickLinkTabs = this.handleOnClickLinkTabs.bind(this);
    }
    setLinkContents() {
        const { app, thread, ui } = this.props.state;
        const displayLinks = !(Board_1.default.getLinksDisplay({ app, ui }) === "none");
        const linkContents = this.state.linkContents;
        let isTuneActive = false;
        if (app.isRootCh) {
            isTuneActive = true;
        }
        const tuneLi = (react_1.default.createElement(Link_1.default, Object.assign({ key: `linkTune`, isMainCh: true, isActive: isTuneActive, text: thread.title, ch: thread.ch, handleOnClick: () => {
                this.clientAction("TOGGLE_LINKS");
                this.onClickCh(thread.ch, ui, thread.hasSlash, "toLinks");
            } }, this.props)));
        const getLi = (chKey, textKey) => (obj, i) => {
            if (obj[chKey]) {
                const ch = Links.getCh(obj[chKey], thread);
                const hasSlash = obj[chKey].lastIndexOf("/") === ch.length - 1 ? true : false;
                return (react_1.default.createElement(Link_1.default, Object.assign({ key: `${chKey}${i}`, isMainCh: false, isActive: false, text: obj[textKey], ch: ch, handleOnClick: () => {
                        this.clientAction("TOGGLE_LINKS");
                        this.onClickCh(ch, ui, hasSlash, "toLinks");
                    } }, this.props)));
            }
            else {
                return null;
            }
        };
        linkContents.html = thread.links.map(getLi("href", "text"));
        linkContents.music = thread.audios.map(getLi("src", "src"));
        linkContents.movie = thread.videos.map(getLi("src", "src"));
        linkContents.html.unshift(tuneLi);
        linkContents.music.unshift(tuneLi);
        linkContents.movie.unshift(tuneLi);
        this.setState({
            linkContents,
            displayLinks,
        });
    }
    componentDidMount() {
        this.setLinkContents();
    }
    componentDidUpdate(props) {
        if (props.state.actionLog[0] === "API_TO_CLIENT[EMIT]:tune") {
            this.setLinkContents();
        }
    }
    handleOnClickLinkTabs(e) {
        this.setState({
            linkContentsKey: e.target.innerText,
        });
    }
    renderLinkTabs() {
        const { style, ui, app } = this.props.state;
        const { linkContents, linkContentsKey } = this.state;
        const activeStyle = Board_1.default.getLinksTabActive({ app, ui });
        const lastStyle = Board_1.default.getLinksTabLast({ app, ui });
        const linkContentKeys = Object.keys(linkContents);
        const lastIndex = linkContentKeys.length - 1;
        return linkContentKeys.map((linkKey, index) => {
            let liStyle = style.links.linksTabUnactive;
            if (lastIndex === index) {
                liStyle = { ...liStyle, ...lastStyle };
            }
            if (linkContentsKey === linkKey) {
                liStyle = { ...liStyle, ...activeStyle };
            }
            return (react_1.default.createElement("li", { key: linkKey, style: liStyle, onClick: this.handleOnClickLinkTabs }, linkKey));
        });
    }
    render() {
        const { displayLinks } = this.props;
        const { style } = this.props.state;
        const contents = this.state.linkContents[this.state.linkContentsKey];
        if (displayLinks) {
            return (react_1.default.createElement("div", { "data-componet-name": "Links", style: style.links.self },
                react_1.default.createElement("ul", { "data-componet-name": "LinksUl", style: style.links.linksUl }, contents),
                react_1.default.createElement("ul", { "data-componet-name": "LinkMenuUl", style: style.links.linkMenuUl }, this.renderLinkTabs())));
        }
        else {
            return (react_1.default.createElement("div", { "data-componet-name": "Links", style: style.links.self },
                react_1.default.createElement("ul", { "data-componet-name": "LinksUl", style: style.links.linksUl })));
        }
    }
}
exports.default = Links;
//# sourceMappingURL=Links.js.map