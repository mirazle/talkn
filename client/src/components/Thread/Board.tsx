import React from 'react';

import App from 'api/store/App';

import TalknComponent from 'client/components/TalknComponent';
import Links from 'client/components/Thread/Links';
import Icon from 'client/components/common/Icon';
import BoardStyle from 'client/style/Board';
import IconStyle from 'client/style/Icon';

type BoardProps = {
  app?: any;
  state: any;
  handleOnClickCh?: any;
  handleOnClickMultistream?: any;
  timeago?: any;
};

type BoardState = {
  displayLinks: boolean;
  exeTransitionEnd: boolean;
  linkContentsKey: any;
};

export default class Board extends TalknComponent<BoardProps, BoardState> {
  constructor(props) {
    super(props);
    this.componentName = 'Board';
    this.state = {
      displayLinks: false,
      exeTransitionEnd: false,
      linkContentsKey: '',
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
    const displayLinks = !(BoardStyle.getLinksDisplay({ app, ui }) === 'none');
    this.setState({
      exeTransitionEnd: false,
      displayLinks,
    });
  }

  UNSAFE_componentWillReceiveProps(props) {
    const { isOpenLinks } = props.state.ui;
    let updateState: any = {};

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
      this.clientAction('TOGGLE_LINKS');
    } else {
      this.clientAction('TOGGLE_DISP_BOARD');
    }
  }

  handleOnClickToggleBubblePost() {
    this.clientAction('TOGGLE_BUBBLE_POST');
  }

  handleOnClickLinks() {
    const { state } = this.props;
    const { app, ui } = state;
    switch (app.dispThreadType) {
      case App.dispThreadTypeMulti:
      case App.dispThreadTypeSingle:
        this.setState({ exeTransitionEnd: true });
        this.clientAction('TOGGLE_LINKS');
        break;
      case App.dispThreadTypeChild:
        this.onClickCh(app.rootCh, ui, false, 'BackToRootCh');
        break;
      case App.dispThreadTypeTimeline:
        this.onClickCh(app.rootCh, ui, false, 'BackToRootCh');
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
      } else {
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

  renderLiChild() {
    const { state, handleOnClickMultistream } = this.props;
    const { app, style, ui } = state;
    let onClick = app.isRootCh ? handleOnClickMultistream : () => {};
    const ThunderIcon = Icon.getThunder(IconStyle.getThunder({ ui, app }));
    return (
      <li onClick={onClick} style={style.board.menuLi}>
        {ThunderIcon}
        <div style={style.board.menuLiChild}>CHILD</div>
      </li>
    );
  }

  renderMain() {
    const { state } = this.props;
    const { app, style, ui } = state;
    const BubbleIcon = Icon.getBubble(IconStyle.getBubble(state));
    const LinksIcon = Icon.getLinks(IconStyle.getLinks(state));
    const linksLabel = app.isLinkCh ? 'BACK' : 'LINKS';

    return (
      <div ref={this.componentName} data-componet-name={this.componentName} style={style.board.self} onTransitionEnd={this.handleOnTransitionEnd}>
        <Links {...this.props} displayLinks={this.state.displayLinks} />
        <div data-componet-name={'BoardMenu'} style={style.board.menu}>
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
            {ui.isOpenBoard ? '▲' : '▼'}
          </div>
        </div>
      </div>
    );
  }

  renderSub() {
    const { state } = this.props;
    const { style, ui } = state;
    const BubbleIcon = Icon.getBubble(IconStyle.getBubble(state));

    return (
      <div ref="Board" data-componet-name={'Board'} style={style.board.self} onTransitionEnd={this.handleOnTransitionEnd}>
        <div data-componet-name={'BoardMenu'} style={style.board.menu}>
          <ul style={style.board.menuUl}>
            <li style={style.board.menuLi} onClick={this.handleOnClickToggleBubblePost}>
              <div>{BubbleIcon}</div>
              <div style={style.board.menuLiBubble}>BUBBLE</div>
            </li>
          </ul>
          <div onClick={this.handleOnClickToggleBoard} style={style.board.menuToggle}>
            {ui.isOpenBoard ? '▲' : '▼'}
          </div>
        </div>
      </div>
    );
  }

  renderLink() {
    const { state } = this.props;
    const { style, ui } = state;
    const LinksIcon = Icon.getLinks(IconStyle.getLinks(state));
    const BubbleIcon = Icon.getBubble(IconStyle.getBubble(state));
    const linksLabel = 'BACK';

    return (
      <div ref="Board" data-componet-name={'Board'} style={style.board.self} onTransitionEnd={this.handleOnTransitionEnd}>
        <div data-componet-name={'BoardMenu'} style={style.board.menu}>
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
            {ui.isOpenBoard ? '▲' : '▼'}
          </div>
        </div>
      </div>
    );
  }
}
