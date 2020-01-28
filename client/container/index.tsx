import React, { Component } from "react";
import { connect } from "react-redux";
import define from "common/define";
import State from "common/schemas/state";
import App from "common/schemas/state/App";
import TalknSession from "client/operations/TalknSession";
import LoadingLogo from "client/components/LoadingLogo";
import Style from "client/components/Style";
import HeaderStyle from "client/style/Header";
import PostsFooterStyle from "client/style/PostsFooter";
import Icon from "client/components/Icon";
import Posts from "client/components/Posts";
import handles from "client/actions/handles";
import callbacks from "client/actions/callbacks";
import Header from "client/components/Header";
import PostsFooter from "client/components/PostsFooter";
import PostsSupporter from "client/components/PostsSupporter";
import Footer from "client/components/Footer";
import DetailRight from "client/components/DetailRight";
import DetailModal from "client/components/DetailModal";
import Menu from "client/components/Menu";
import Board from "client/components/Board";
import LockMenu from "client/components/LockMenu";
import Media from "client/components/Media";
import InnerNotif from "client/components/InnerNotif";
import TimeMarker from "client/components/TimeMarker";
import mapToStateToProps from "client/mapToStateToProps/";
import Marquee from "client/container/util/Marquee";
import DateHelper from "client/container/util/DateHelper";
import actionWrap from "client/container/util/actionWrap";
import componentDidUpdates from "client/container/componentDidUpdates";
import TalknWindow from "client/operations/TalknWindow";
import IconStyle from "client/style/Icon";

interface ContainerProps {
  state: State;
  talknAPI: any;
  onClickOpenLockMenu: (any?) => any;
  onClickToggleMain: (any?) => any;
  onClickToggleDispDetail: (any?) => any;
  closeInnerNotif: (any?) => any;
  toggleDispPostsSupporter: (any?) => any;
  onClickMultistream: (any?) => any;
}

interface ContainerState {
  notifs: any;
}

class Container extends Component<ContainerProps, ContainerState> {
  constructor(props: ContainerProps) {
    super(props);
    const { state, talknAPI } = props;
    const { app, thread } = state;
    this.state = { notifs: [] };
    talknAPI.find(thread.ch);

    if (app.extensionMode === App.extensionModeExtIncludeLabel || app.extensionMode === App.extensionModeExtNoneLabel) {
      talknAPI.findMenuIndex(thread.ch);
    }
    this.getProps = this.getProps.bind(this);
    this.renderNotifs = this.renderNotifs.bind(this);
    this.renderSmall = this.renderSmall.bind(this);
    this.renderMiddle = this.renderMiddle.bind(this);
    this.renderLarge = this.renderLarge.bind(this);
    this.renderExtension = this.renderExtension.bind(this);
    this.handleOnClickFooterIcon = this.handleOnClickFooterIcon.bind(this);
    this.handleOnClickToggleMain = this.handleOnClickToggleMain.bind(this);
    this.handleOnClickToggleDetail = this.handleOnClickToggleDetail.bind(this);
    this.handleOnClickMultistream = this.handleOnClickMultistream.bind(this);
    this.handleOnClickCh = this.handleOnClickCh.bind(this);
  }

  componentDidMount() {
    window.talknAPI.componentDidMounts("Container");
  }

  componentDidUpdate() {
    componentDidUpdates(this, "Container");
  }

  getProps(): any {
    return {
      ...this.props,
      componentDidUpdates,
      handleOnClickFooterIcon: this.handleOnClickFooterIcon,
      handleOnClickMultistream: this.handleOnClickMultistream,
      handleOnClickToggleMain: this.handleOnClickToggleMain,
      handleOnClickToggleDetail: this.handleOnClickToggleDetail,
      handleOnClickCh: this.handleOnClickCh,
      nowDate: DateHelper.getNowYmdhis()
    };
  }

  handleOnClickToggleDetail(e) {
    const { state, onClickOpenLockMenu } = this.props;
    let { app, thread, threadDetail } = state;
    if (app.openLockMenu !== App.openLockMenuLabelNo) {
      onClickOpenLockMenu(App.openLockMenuLabelNo);
    } else {
      app = App.getAppUpdatedOpenFlgs(state, "headerDetailIcon");
      window.talknAPI.onClickToggleDispDetail({ threadDetail, thread, app });
    }
  }

  handleOnClickToggleMain(e) {
    const { onClickToggleMain, onClickToggleDispDetail, onClickOpenLockMenu, closeInnerNotif, state } = this.props;
    let { app, thread, threadDetail } = state;
    if (app.extensionMode === App.extensionModeExtBottomLabel || app.extensionMode === App.extensionModeExtModalLabel) {
      onClickToggleMain({ app });

      if (app.isOpenDetail) {
        app.isOpenDetail = false;
        onClickToggleDispDetail({ threadDetail, thread, app });
      }

      if (app.openLockMenu !== App.openLockMenuLabelNo) {
        onClickOpenLockMenu(App.openLockMenuLabelNo);
      }

      window.talknWindow.parentTo("toggleIframe");

      if (!app.isLinkCh) {
        window.talknWindow.parentTo("getClientMetas");
      }
    }
  }

  handleOnClickFooterIcon(e) {
    const { toggleDispPostsSupporter } = this.props;
    toggleDispPostsSupporter();
  }

  handleOnClickMultistream() {
    const { app } = this.props.state;
    let { postsMulti, postsSingle } = this.props.state;
    let findFlg = false;
    const postsMultiCache = TalknSession.getStorage(app.rootCh, define.storageKey.postsMulti);
    const postsSingleCache = TalknSession.getStorage(app.rootCh, define.storageKey.postsSingle);
    postsMulti = postsMultiCache && postsMultiCache.length > 0 ? postsMultiCache : postsMulti;
    postsSingle = postsSingleCache && postsSingleCache.length > 0 ? postsSingleCache : postsSingle;

    app.dispThreadType =
      app.dispThreadType === App.dispThreadTypeMulti ? App.dispThreadTypeSingle : App.dispThreadTypeMulti;
    app.multistreamed = !(app.dispThreadType === App.dispThreadTypeMulti);
    app.multistream = app.dispThreadType === App.dispThreadTypeMulti;

    if (app.multistream) {
      if (postsMulti[0] && postsMulti[0]._id) {
        app.offsetFindId = postsMulti[0]._id;
        app.offsetMultiFindId = app.offsetFindId;
      } else {
        app.offsetFindId = App.defaultOffsetFindId;
        app.offsetMultiFindId = App.defaultOffsetFindId;
        findFlg = true;
      }
    } else {
      if (postsSingle[0] && postsSingle[0]._id) {
        app.offsetFindId = postsSingle[0]._id;
        app.offsetSingleFindId = app.offsetFindId;
      } else {
        app.offsetFindId = App.defaultOffsetFindId;
        app.offsetSingleFindId = App.defaultOffsetFindId;
        findFlg = true;
      }
    }

    this.props.onClickMultistream({ app, postsMulti, postsSingle });

    if (findFlg) {
      window.talknAPI.find(app.rootCh);
    }
  }

  handleOnClickCh(toCh, overWriteHasSlash, called = "") {
    actionWrap.onClickCh(toCh, overWriteHasSlash, called);
  }

  render() {
    const { style, app } = this.props.state;
    if (style && style.container && style.container.self && app.tuned) {
      if (
        app.extensionMode === App.extensionModeExtBottomLabel ||
        app.extensionMode === App.extensionModeExtModalLabel
      ) {
        return this.renderExtension();
      } else {
        switch (app.screenMode) {
          case App.screenModeSmallLabel:
            return this.renderSmall();
          case App.screenModeMiddleLabel:
            return this.renderMiddle();
          case App.screenModeLargeLabel:
            return this.renderLarge();
        }
      }
    } else {
      if (
        app.extensionMode === App.extensionModeExtBottomLabel ||
        app.extensionMode === App.extensionModeExtModalLabel
      ) {
        return null;
      } else {
        return <LoadingLogo />;
      }
    }
  }

  renderFixMarker(props) {
    const { state } = this.props;
    const { style, uiTimeMarker, app, thread } = state;
    console.log(app.isLoading);
    if (app.isLoading) {
      const loading = Icon.getLoading(IconStyle.getLoading({ app }));
      return <TimeMarker type={"Fix"} label={loading} style={style.timeMarker.fixTimeMarker} />;
    } else if (thread.postCnt > 0 && uiTimeMarker.now) {
      return <TimeMarker type={"Fix"} label={uiTimeMarker.now.label} style={style.timeMarker.fixTimeMarker} />;
    } else {
      return undefined;
    }
  }

  renderLinkLabel(props) {
    const { state } = this.props;
    const { app, style, thread } = state;
    if (app.isLinkCh) {
      return (
        <div data-component-name={"linkLabel"} style={style.container.linkLabel}>
          <Marquee text={`Link: ${thread.title}`} loop={true} hoverToStop={false} trailing={0} leading={0} />
        </div>
      );
    } else {
      return null;
    }
  }

  renderNewPost(props) {
    const { state } = props;
    const { style } = state;

    const log = false;
    let dispNewPost = false;

    // 実際に目視できるスレッドの高さ
    const frameHeight = HeaderStyle.headerHeight + PostsFooterStyle.selfHeight;
    const postsFrameHeight = window.innerHeight - frameHeight;

    // 実際のスレッドの高さ
    const postsRealHeight = TalknWindow.getPostsClientHeight();
    const PostsComponent = document.querySelector("[data-component-name=Posts]");
    //console.log( PostsComponent.scrollHeight );

    if (log) console.log("フレーム枠の縦幅： " + postsFrameHeight);
    if (log) console.log("実際の投稿縦幅： " + PostsComponent.scrollHeight);
    if (log) console.log("最下位スクロール：　" + window.talknWindow.isScrollBottom);

    // フレーム縦幅よりも、実際の投稿縦幅のほうが小さい場合
    if (PostsComponent) {
      if (PostsComponent.scrollHeight < postsFrameHeight) {
        // フレーム縦幅よりも、実際の投稿縦幅のほうが大きい場合
      } else {
        // 一番下までスクロールしている場合
        if (window.talknWindow.isScrollBottom) {
          // 一番下までスクロールしていない場合
        } else {
          dispNewPost = true;
        }
      }
    }

    if (dispNewPost) {
      //    if( postsFrameHeight < postsRealHeight ){
      return (
        <div data-component-name="newPost" style={style.container.newPost}>
          NEW POST
        </div>
      );
    } else {
      return null;
    }
  }

  renderHideScreenBottom(props) {
    const { state } = props;
    const { style } = state;
    return <div data-component-name={"hideScreenBottom"} style={style.container.hideScreenBottom} />;
  }

  renderNotifs(props) {
    const { app, style } = props.state;
    if (app.extensionMode === App.extensionModeExtBottomLabel || app.extensionMode === App.extensionModeExtModalLabel) {
      if (!app.isOpenPosts && !app.isDispPosts && app.isOpenNotif) {
        return (
          <ol data-component-name="Notifs" style={style.notif.notifs}>
            {this.state.notifs}
          </ol>
        );
      }
    }
    return <ol data-component-name="Notifs" style={style.notif.notifs} />;
  }

  renderLarge() {
    const { style } = this.props.state;
    const props: any = this.getProps();
    const NewPost = this.renderNewPost(props);
    const LinkLabel = this.renderLinkLabel(props);
    const HideScreenBottom = this.renderHideScreenBottom(props);
    const FixMarker = this.renderFixMarker(props);
    const nowDate = DateHelper.getNowYmdhis();
    return (
      <div data-component-name={"Container"} style={style.container.self}>
        <Style {...props} />
        <Posts {...props} />
        <span data-component-name="fixedComponents">
          <Media {...props} />
          <Board {...props} />
          {LinkLabel}
          {NewPost}
          {FixMarker}
          <Header {...props} />
          <PostsSupporter {...props} />
          <DetailRight {...props} />
          <LockMenu {...props} />
          <PostsFooter {...props} />
          <Menu {...props} />
          <InnerNotif {...this.props} />;{HideScreenBottom}
          {/*

          Youtube
          
          <iframe
            style={{position: "fixed", top: "0px", zIndex: 10000}}
            width="560"
            height="315"
            src="https://www.youtube.com/embed/NOcoQD4bZUw?enablejsapi=1"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen
          />
*/}
        </span>
      </div>
    );
  }

  renderMiddle() {
    const { style } = this.props.state;
    const props = this.getProps();
    const NewPost = this.renderNewPost(props);
    const LinkLabel = this.renderLinkLabel(props);
    const HideScreenBottom = this.renderHideScreenBottom(props);
    const FixMarker = this.renderFixMarker(props);
    return (
      <div data-component-name={"Container"} style={style.container.self}>
        <Style {...props} />
        <Posts {...props} />
        <span data-component-name="fixedComponents">
          <Media {...props} />
          <Board {...props} />
          {LinkLabel}
          {NewPost}
          {FixMarker}
          <Header {...props} />
          <PostsSupporter {...props} />
          <DetailModal {...props} />
          <PostsFooter {...props} />
          <Menu {...props} />
          <InnerNotif {...this.props} />
          {HideScreenBottom}
        </span>
      </div>
    );
  }

  renderSmall() {
    const { style, app } = this.props.state;
    const props = this.getProps();
    const NewPost = this.renderNewPost(props);
    const LinkLabel = this.renderLinkLabel(props);
    const HideScreenBottom = this.renderHideScreenBottom(props);
    const FixMarker = this.renderFixMarker(props);
    const nowDate = DateHelper.getNowYmdhis();
    return (
      <span data-component-name={"Container"} style={style.container.self}>
        <Style {...props} />
        <Posts {...props} />
        <span data-component-name="fixedComponents">
          <Media {...props} />
          <Board {...props} />
          {LinkLabel}
          {NewPost}
          {FixMarker}
          <Header {...props} />
          <PostsSupporter {...props} />
          <DetailModal {...props} />
          <PostsFooter {...props} />
          <Menu {...props} />
          <InnerNotif {...this.props} />
          {/*Debug*/}
          {HideScreenBottom}
        </span>
      </span>
    );
  }

  renderExtension() {
    const { style } = this.props.state;
    const props = this.getProps();
    const NewPost = this.renderNewPost(props);
    const LinkLabel = this.renderLinkLabel(props);
    const extScreenStyle = props.state.style.extScreen.self;
    const FixMarker = this.renderFixMarker(props);
    return (
      <span data-component-name={"Container"} style={style.container.self}>
        <Style {...props} />
        <div style={extScreenStyle} data-component-name={"extScreen"}>
          <Posts {...props} />
          <Header {...props} />
          <Board {...props} />
          {LinkLabel}
          {NewPost}
          {FixMarker}
          <PostsSupporter {...props} />
          <DetailModal {...props} />
          <InnerNotif {...this.props} />
        </div>
        <span data-component-name="fixedComponents">
          {/* Notifs */}
          <PostsFooter {...props} />
          {/* Debug */}
        </span>
      </span>
    );
  }

  renderIos() {
    const { style } = this.props.state;
    const props = this.getProps();
    const NewPost = this.renderNewPost(props);
    const HideScreenBottom = this.renderHideScreenBottom(props);
    return (
      <div data-component-name={"Container"} style={style.container.self}>
        {NewPost}
        <Style {...props} />
        <Footer {...props} />
        {HideScreenBottom}
      </div>
    );
  }

  renderAndroid() {
    const { style } = this.props.state;
    const props = this.getProps();
    const NewPost = this.renderNewPost(props);
    const HideScreenBottom = this.renderHideScreenBottom(props);
    return (
      <div data-component-name={"Container"} style={style.container.self}>
        {NewPost}
        <Style {...props} />
        <Footer {...props} />
        {HideScreenBottom}
      </div>
    );
  }
}

export default connect(mapToStateToProps, { ...handles, ...callbacks })(Container);
