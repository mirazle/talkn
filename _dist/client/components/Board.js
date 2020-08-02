"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const TalknComponent_1 = __importDefault(require("client/components/TalknComponent"));
const App_1 = __importDefault(require("api/store/App"));
const Icon_1 = __importDefault(require("client/components/Icon"));
const Links_1 = __importDefault(require("client/components/Links"));
const Icon_2 = __importDefault(require("client/style/Icon"));
const Board_1 = __importDefault(require("client/style/Board"));
class Board extends TalknComponent_1.default {
    constructor(props) {
        super(props);
        this.state = {
            displayLinks: false,
            exeTransitionEnd: false,
            linkContentsKey: "",
        };
        this.renderMain = this.renderMain.bind(this);
        this.renderLink = this.renderLink.bind(this);
        this.renderSub = this.renderSub.bind(this);
        this.renderLiChild = this.renderLiChild.bind(this);
        this.handleOnTransitionEnd = this.handleOnTransitionEnd.bind(this);
        this.handleOnClickToggleBoard = this.handleOnClickToggleBoard.bind(this);
        this.handleOnClickToggleBubblePost = this.handleOnClickToggleBubblePost.bind(this);
        this.handleOnClickLinks = this.handleOnClickLinks.bind(this);
        this.handleOnClickLinkTabs = this.handleOnClickLinkTabs.bind(this);
    }
    componentDidMount() {
        const { state } = this.props;
        const { app, ui } = state;
        const displayLinks = !(Board_1.default.getLinksDisplay({ app, ui }) === "none");
        this.setState({
            exeTransitionEnd: false,
            displayLinks,
        });
    }
    componentWillReceiveProps(props) {
        const { isOpenLinks } = props.state.ui;
        let updateState = {};
        if (!isOpenLinks) {
            updateState.displayLinks = false;
        }
        if (Object.keys(updateState).length > 0) {
            this.setState(updateState);
        }
    }
    handleOnClickToggleBoard() {
        const { ui } = this.props.state;
        if (ui.isOpenLinks) {
            this.clientAction("TOGGLE_LINKS");
        }
        else {
            this.clientAction("TOGGLE_DISP_BOARD");
        }
    }
    handleOnClickToggleBubblePost() {
        this.clientAction("TOGGLE_BUBBLE_POST");
    }
    handleOnClickLinks() {
        const { state } = this.props;
        const { app, ui } = state;
        switch (app.dispThreadType) {
            case App_1.default.dispThreadTypeMulti:
            case App_1.default.dispThreadTypeSingle:
                this.setState({ exeTransitionEnd: true });
                this.clientAction("TOGGLE_LINKS");
                break;
            case App_1.default.dispThreadTypeChild:
                this.onClickCh(app.rootCh, ui, false, "backToRootCh");
                break;
            case App_1.default.dispThreadTypeTimeline:
                this.onClickCh(app.rootCh, ui, false, "backToRootCh");
                break;
        }
    }
    handleOnTransitionEnd(e) {
        const { exeTransitionEnd } = this.state;
        const { ui } = this.props.state;
        let updateState = {};
        if (exeTransitionEnd) {
            if (ui.isOpenLinks) {
                updateState = { displayLinks: true };
            }
            else {
                updateState = { displayLinks: false };
            }
            this.setState({
                ...updateState,
                exeTransitionEnd: false,
            });
        }
    }
    handleOnClickLinkTabs(e) {
        this.setState({
            linkContentsKey: e.target.innerText,
        });
    }
    render() {
        const { app, ui } = this.props.state;
        const type = Board_1.default.getType({ app, ui });
        switch (type) {
            case Board_1.default.typesMain:
                return this.renderMain();
            case Board_1.default.typesLink:
                return this.renderLink();
            case Board_1.default.typesSub:
                return this.renderSub();
            default:
                return null;
        }
    }
    renderLiChild() {
        const { state, handleOnClickMultistream } = this.props;
        const { app, style, ui } = state;
        let onClick = app.isRootCh ? handleOnClickMultistream : () => { };
        const ThunderIcon = Icon_1.default.getThunder(Icon_2.default.getThunder({ ui, app }));
        return (react_1.default.createElement("li", { onClick: onClick, style: style.board.menuLi },
            ThunderIcon,
            react_1.default.createElement("div", { style: style.board.menuLiChild }, "CHILD")));
    }
    renderMain() {
        const { state } = this.props;
        const { app, style, ui } = state;
        const BubbleIcon = Icon_1.default.getBubble(Icon_2.default.getBubble(state));
        const LinksIcon = Icon_1.default.getLinks(Icon_2.default.getLinks(state));
        const linksLabel = app.isLinkCh ? "BACK" : "LINKS";
        return (react_1.default.createElement("div", { ref: "Board", "data-componet-name": "Board", style: style.board.self, onTransitionEnd: this.handleOnTransitionEnd },
            react_1.default.createElement(Links_1.default, Object.assign({}, this.props, { displayLinks: this.state.displayLinks })),
            react_1.default.createElement("div", { "data-componet-name": "BoardMenu", style: style.board.menu },
                react_1.default.createElement("ul", { style: style.board.menuUl },
                    react_1.default.createElement("li", { style: style.board.menuLi, onClick: this.handleOnClickToggleBubblePost },
                        react_1.default.createElement("div", null, BubbleIcon),
                        react_1.default.createElement("div", { style: style.board.menuLiBubble }, "BUBBLE")),
                    this.renderLiChild(),
                    react_1.default.createElement("li", { onClick: this.handleOnClickLinks, style: style.board.menuLi },
                        react_1.default.createElement("div", null, LinksIcon),
                        react_1.default.createElement("div", { style: style.board.menuLiLinks }, linksLabel))),
                react_1.default.createElement("div", { onClick: this.handleOnClickToggleBoard, style: style.board.menuToggle }, ui.isOpenBoard ? "▲" : "▼"))));
    }
    renderSub() {
        const { state } = this.props;
        const { style, ui } = state;
        const BubbleIcon = Icon_1.default.getBubble(Icon_2.default.getBubble(state));
        return (react_1.default.createElement("div", { ref: "Board", "data-componet-name": "Board", style: style.board.self, onTransitionEnd: this.handleOnTransitionEnd },
            react_1.default.createElement("div", { "data-componet-name": "BoardMenu", style: style.board.menu },
                react_1.default.createElement("ul", { style: style.board.menuUl },
                    react_1.default.createElement("li", { style: style.board.menuLi, onClick: this.handleOnClickToggleBubblePost },
                        react_1.default.createElement("div", null, BubbleIcon),
                        react_1.default.createElement("div", { style: style.board.menuLiBubble }, "BUBBLE"))),
                react_1.default.createElement("div", { onClick: this.handleOnClickToggleBoard, style: style.board.menuToggle }, ui.isOpenBoard ? "▲" : "▼"))));
    }
    renderLink() {
        const { state } = this.props;
        const { style, ui } = state;
        const LinksIcon = Icon_1.default.getLinks(Icon_2.default.getLinks(state));
        const BubbleIcon = Icon_1.default.getBubble(Icon_2.default.getBubble(state));
        const linksLabel = "BACK";
        return (react_1.default.createElement("div", { ref: "Board", "data-componet-name": "Board", style: style.board.self, onTransitionEnd: this.handleOnTransitionEnd },
            react_1.default.createElement("div", { "data-componet-name": "BoardMenu", style: style.board.menu },
                react_1.default.createElement("ul", { style: style.board.menuUl },
                    react_1.default.createElement("li", { style: style.board.menuLi, onClick: this.handleOnClickToggleBubblePost },
                        react_1.default.createElement("div", null, BubbleIcon),
                        react_1.default.createElement("div", { style: style.board.menuLiBubble }, "BUBBLE")),
                    react_1.default.createElement("li", { onClick: this.handleOnClickLinks, style: style.board.menuLi },
                        react_1.default.createElement("div", null, LinksIcon),
                        react_1.default.createElement("div", { style: style.board.menuLiLinks }, linksLabel))),
                react_1.default.createElement("div", { onClick: this.handleOnClickToggleBoard, style: style.board.menuToggle }, ui.isOpenBoard ? "▲" : "▼"))));
    }
}
exports.default = Board;
//# sourceMappingURL=Board.js.map