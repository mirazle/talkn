import React, { Component } from "react";
import App from "common/schemas/state/App";
import Thread from "common/schemas/state/Thread";
import Post from "common/schemas/state/Post";
import util from "common/util";
import conf from "common/conf";
import MenuIndexListStyle from "client/style/Menu/MenuIndexList";
import PostStyle from "client/style/Post";
import MarqueeArea, { MarqueeAreaProps, MarqueeAreaState } from "client/container/util/MarqueeArea";

interface MenuIndexListProps extends MarqueeAreaProps {
  app: App;
  thread: Thread;
  menuIndexList: Post[] | any;
  handleOnClickCh: any;
  rank: string;
  style: any;
}

interface MenuIndexListState extends MarqueeAreaState {
  state: any;
  style: any;
}

export default class MenuIndexListComponent extends MarqueeArea<MenuIndexListProps, MenuIndexListState> {
  state: any;
  constructor(props) {
    super(props);
    this.state = { style: props.style, ...this.superState };
    this.handleOnClick = this.handleOnClick.bind(this);
    this.getDecolationEvents = this.getDecolationEvents.bind(this);
  }

  componentDidMount() {
    const { menuIndexList } = this.props;
    this.measureText();
    window.talknWindow.parentCoreApi("onCatchChApi", menuIndexList.ch);
  }

  componentWillUnmount() {
    this.clearTimeout();
  }

  componentDidUpdate() {
    this.measureText();
  }

  getDecolationEvents(styleKey) {
    if (styleKey === MenuIndexListStyle.unactiveLiSelfLabel) {
      return {
        onMouseOver: () => {
          this.onMouseOverArea();
          this.setState({
            style: {
              ...this.state.style,
              [styleKey]: {
                ...this.state.style[styleKey],
                background: MenuIndexListStyle[`${styleKey}MouseOverBackground`]
              }
            }
          });
        },
        onMouseLeave: () => {
          this.onMouseLeaveArea();
          this.setState({
            style: {
              ...this.state.style,
              [styleKey]: {
                ...this.state.style[styleKey],
                background: MenuIndexListStyle[`${styleKey}Background`]
              }
            }
          });
        },
        onMouseDown: () => {
          this.setState({
            style: {
              ...this.state.style,
              [styleKey]: {
                ...this.state.style[styleKey],
                background: MenuIndexListStyle[`${styleKey}MouseDownBackground`]
              }
            }
          });
        },
        onMouseUp: () => {
          this.setState({
            style: {
              ...this.state.style,
              [styleKey]: {
                ...this.state.style[styleKey],
                background: MenuIndexListStyle[`${styleKey}MouseOverBackground`]
              }
            }
          });
        }
      };
    }
  }

  handleOnClick() {
    const { thread, menuIndexList, handleOnClickCh } = this.props;
    const { ch } = menuIndexList;
    const isFocusCh = thread.ch === ch ? true : false;
    const styleKey = isFocusCh ? MenuIndexListStyle.activeLiSelfLabel : MenuIndexListStyle.unactiveLiSelfLabel;
    let { app } = this.props;

    if (isFocusCh) {
      if (app.screenMode === App.screenModeSmallLabel) {
        window.talknWindow.parentCoreApi("onClickToggleDispMenu");
      }
    } else {
      handleOnClickCh(ch, null, "menuIndexList");
    }

    this.setState({
      style: {
        ...this.state.style,
        [styleKey]: {
          ...this.state.style[styleKey],
          background: MenuIndexListStyle[`${styleKey}Background`]
        }
      }
    });
  }

  render() {
    const { style } = this.state;
    const { app, thread, menuIndexList, rank } = this.props;
    const isFocusCh = thread.ch === menuIndexList.ch ? true : false;
    const styleKey = isFocusCh ? MenuIndexListStyle.activeLiSelfLabel : MenuIndexListStyle.unactiveLiSelfLabel;
    const title = app.rootCh === menuIndexList.ch ? app.rootTitle : menuIndexList.title;

    const dispRank = this.renderRank(rank);
    const dispFavicon = this.renderDispFavicon();
    const dispWatchCnt = this.renderDispWatchCnt();
    const baseStyle = style[styleKey];
    const dispExt = menuIndexList.findType === Thread.findTypeHtml ? null : menuIndexList.findType;
    const marqueeStyle: any = this.getMarqueeStyle();
    return (
      <li
        data-component-name={"MenuIndexList"}
        key={menuIndexList.ch}
        style={baseStyle}
        onClick={this.handleOnClick}
        {...this.getDecolationEvents(styleKey)}
      >
        {dispRank}
        <div style={style.upper}>
          <span style={style.upperSpace} />
          <span ref={this.marqueeWrapRef} data-component-name={"MarqueeMenuIndex"} style={style.upperRight}>
            <span ref={this.marqueeTextRef} style={marqueeStyle}>
              {title}
            </span>
          </span>
        </div>

        <div style={style.bottom}>
          <span
            style={{
              ...style.bottomIcon,
              backgroundImage: `url( ${dispFavicon} )`
            }}
          />
          <span
            style={style.bottomPost}
            dangerouslySetInnerHTML={{
              __html: this.renderPost(menuIndexList, app)
            }}
          />
          {dispWatchCnt}
        </div>

        {dispExt && <span style={style[`ext${dispExt}`]}>{dispExt}</span>}
      </li>
    );
  }

  renderPost(menuIndexList, app) {
    let { ch, post, stampId } = menuIndexList;
    if (stampId > 0) {
      post = PostStyle.getStampTag(post, false);
    }
    return post;
  }

  renderDispFavicon() {
    const { isFocusCh } = this.state;
    const { thread, menuIndexList } = this.props;
    const defaultFavicon = Thread.getDefaultFavicon();

    if (isFocusCh) {
      if (menuIndexList.favicon === defaultFavicon) {
        if (thread.favicon === defaultFavicon) {
          return `//${conf.assetsIconPath}${util.getSaveFaviconName(menuIndexList.favicon)}`;
        } else {
          return `//${conf.assetsIconPath}${util.getSaveFaviconName(thread.favicon)}`;
        }
      } else {
        return `//${conf.assetsIconPath}${util.getSaveFaviconName(menuIndexList.favicon)}`;
      }
    } else {
      if (menuIndexList.favicon === defaultFavicon) {
        return `//${conf.assetsIconPath}${util.getSaveFaviconName(menuIndexList.favicon)}`;
      } else {
        return `//${conf.assetsIconPath}${util.getSaveFaviconName(menuIndexList.favicon)}`;
      }
    }
  }

  renderDispWatchCnt() {
    const { style } = this.state;
    const { menuIndexList } = this.props;

    if (menuIndexList.watchCnt === 0 || menuIndexList.watchCnt > 0) {
      return (
        <span style={style.bottomWatchCnt}>
          <span style={style.bottomWatchCntWrap}>{menuIndexList.watchCnt}</span>
        </span>
      );
    } else {
      return <span style={style.bottomWatchCnt}></span>;
    }
  }
  renderRank(rank) {
    let { upperRankWrap, upperRank } = this.state.style;
    if (rank) {
      const background = MenuIndexListStyle.getDispRankBackground(rank);
      const width = MenuIndexListStyle.getDispRankWidth(rank);
      return (
        <span style={{ ...upperRankWrap, background, width }}>
          <span style={upperRank}>RANK{rank}</span>
        </span>
      );
    } else if (rank === 0) {
      const background = MenuIndexListStyle.getDispRankBackground(rank);
      const width = MenuIndexListStyle.getDispRankWidth(rank);
      return (
        <span style={{ ...upperRankWrap, background, width }}>
          <span style={upperRank}>TUNE</span>
        </span>
      );
    } else {
      return null;
    }
  }

  getDispCh(isFocusCh) {
    const { thread, menuIndexList } = this.props;
    if (isFocusCh) {
      return thread.ch;
    } else {
      if (menuIndexList.ch === "/") {
        return menuIndexList.ch.replace(thread.ch, "");
      } else if (!menuIndexList.ch) {
        return "";
      } else {
        return menuIndexList.ch.indexOf("//") === 0 ? menuIndexList.ch.replace("//", "/") : menuIndexList.ch;
      }
    }
  }
}
