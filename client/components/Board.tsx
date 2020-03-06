import React from "react";
import TalknComponent from "client/components/TalknComponent";
import ClientState from "client/store/";
import App from "api/store/App";
import Icon from "client/components/Icon";
import Links from "client/components/Links";
import IconStyle from "client/style/Icon";
import BoardStyle from "client/style/Board";

interface BoardProps {
  app?: any;
  clientState: ClientState;
  handleOnClickCh?: any;
  handleOnClickMultistream?: any;
  timeago?: any;
}

interface BoardState {
  displayLinks: boolean;
  exeTransitionEnd: boolean;
  linkContentsKey: any;
}

export default class Board extends TalknComponent<BoardProps, BoardState> {
  constructor(props) {
    super(props);
    this.state = {
      displayLinks: false,
      exeTransitionEnd: false,
      linkContentsKey: ""
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
    const { clientState } = this.props;
    const { app } = this.apiStore;
    const { ui } = clientState;
    const displayLinks = !(BoardStyle.getLinksDisplay({ app, ui }) === "none");
    this.setState({
      exeTransitionEnd: false,
      displayLinks
    });
  }

  componentWillReceiveProps(props) {
    const { isOpenLinks } = props.clientState.ui;
    let updateState: any = {};

    if (!isOpenLinks) {
      updateState.displayLinks = false;
    }

    if (Object.keys(updateState).length > 0) {
      this.setState(updateState);
    }
  }

  handleOnClickToggleBoard() {
    const { ui } = this.props.clientState;
    if (ui.isOpenLinks) {
      this.clientAction("TOGGLE_LINKS");
    } else {
      this.clientAction("TOGGLE_DISP_BOARD");
    }
  }

  handleOnClickToggleBubblePost() {
    this.clientAction("TOGGLE_BUBBLE_POST");
  }

  handleOnClickLinks() {
    const { handleOnClickCh } = this.props;
    const { app } = this.apiState;
    switch (app.dispThreadType) {
      case App.dispThreadTypeMulti:
      case App.dispThreadTypeSingle:
        this.setState({ exeTransitionEnd: true });
        this.clientAction("TOGGLE_LINKS");
        break;
      case App.dispThreadTypeChild:
        handleOnClickCh(app.rootCh, null, "backToRootCh");
        break;
      case App.dispThreadTypeTimeline:
        //if( app.isLinkCh ){
        handleOnClickCh(app.rootCh, null, "backToRootCh");
      //}
    }
  }

  handleOnTransitionEnd(e) {
    const { exeTransitionEnd } = this.state;
    const { ui } = this.props.clientState;
    let updateState = {};

    if (exeTransitionEnd) {
      if (ui.isOpenLinks) {
        updateState = { displayLinks: true };
      } else {
        updateState = { displayLinks: false };
      }

      this.setState({
        ...updateState,
        exeTransitionEnd: false
      });
    }
  }

  handleOnClickLinkTabs(e) {
    this.setState({
      linkContentsKey: e.target.innerText
    });
  }

  renderLiChild() {
    const { app } = this.apiState;
    const { clientState, handleOnClickMultistream } = this.props;
    const { style, ui } = clientState;

    let onClick = app.isRootCh && !app.isMediaCh ? handleOnClickMultistream : () => {};
    const ThunderIcon = Icon.getThunder(IconStyle.getThunder({ ui, app }));
    return (
      <li onClick={onClick} style={style.board.menuLi}>
        {ThunderIcon}
        <div style={style.board.menuLiChild}>CHILD</div>
      </li>
    );
  }

  renderMain() {
    const { clientState } = this.props;
    const { app } = this.apiState;
    const { style, ui } = clientState;
    const BubbleIcon = Icon.getBubble(IconStyle.getBubble(clientState));
    const LinksIcon = Icon.getLinks(IconStyle.getLinks(clientState));
    const linksLabel = app.isLinkCh ? "BACK" : "LINKS";

    return (
      <div
        ref="Board"
        data-componet-name={"Board"}
        style={style.board.self}
        onTransitionEnd={this.handleOnTransitionEnd}
      >
        <Links {...this.props} displayLinks={this.state.displayLinks} />
        <div data-componet-name={"BoardMenu"} style={style.board.menu}>
          <ul style={style.board.menuUl}>
            <li style={style.board.menuLi} onClick={this.handleOnClickToggleBubblePost}>
              <div>{BubbleIcon}</div>
              <div style={style.board.menuLiBubble}>BUBBLE</div>
            </li>
            {this.renderLiChild()}
            <li onClick={this.handleOnClickLinks} style={style.board.menuLi}>
              <div>{LinksIcon}</div>
              <div style={style.board.menuLiLinks}>{linksLabel}</div>
            </li>
          </ul>
          <div onClick={this.handleOnClickToggleBoard} style={style.board.menuToggle}>
            {ui.isOpenBoard ? "▲" : "▼"}
          </div>
        </div>
      </div>
    );
  }

  renderSub() {
    const { clientState } = this.props;
    const { style, ui } = clientState;
    const BubbleIcon = Icon.getBubble(IconStyle.getBubble(clientState));

    return (
      <div
        ref="Board"
        data-componet-name={"Board"}
        style={style.board.self}
        onTransitionEnd={this.handleOnTransitionEnd}
      >
        <div data-componet-name={"BoardMenu"} style={style.board.menu}>
          <ul style={style.board.menuUl}>
            <li style={style.board.menuLi} onClick={this.handleOnClickToggleBubblePost}>
              <div>{BubbleIcon}</div>
              <div style={style.board.menuLiBubble}>BUBBLE</div>
            </li>
          </ul>
          <div onClick={this.handleOnClickToggleBoard} style={style.board.menuToggle}>
            {ui.isOpenBoard ? "▲" : "▼"}
          </div>
        </div>
      </div>
    );
  }

  renderLink() {
    const { clientState } = this.props;
    const { style, ui } = clientState;
    const LinksIcon = Icon.getLinks(IconStyle.getLinks(clientState));
    const BubbleIcon = Icon.getBubble(IconStyle.getBubble(clientState));
    const linksLabel = "BACK";

    return (
      <div
        ref="Board"
        data-componet-name={"Board"}
        style={style.board.self}
        onTransitionEnd={this.handleOnTransitionEnd}
      >
        <div data-componet-name={"BoardMenu"} style={style.board.menu}>
          <ul style={style.board.menuUl}>
            <li style={style.board.menuLi} onClick={this.handleOnClickToggleBubblePost}>
              <div>{BubbleIcon}</div>
              <div style={style.board.menuLiBubble}>BUBBLE</div>
            </li>
            <li onClick={this.handleOnClickLinks} style={style.board.menuLi}>
              <div>{LinksIcon}</div>
              <div style={style.board.menuLiLinks}>{linksLabel}</div>
            </li>
          </ul>
          <div onClick={this.handleOnClickToggleBoard} style={style.board.menuToggle}>
            {ui.isOpenBoard ? "▲" : "▼"}
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { app } = this.apiState;
    const { ui } = this.props.clientState;
    const type = BoardStyle.getType({ app, ui });
    switch (type) {
      case BoardStyle.typesMain:
        return this.renderMain();
      case BoardStyle.typesLink:
        return this.renderLink();
      case BoardStyle.typesSub:
        return this.renderSub();
      default:
        return null;
    }
  }
}
