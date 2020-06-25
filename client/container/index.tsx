import React from "react";
import { connect } from "react-redux";
import define from "common/define";
import App from "api/store/App";
import Ui from "client/store/Ui";
import handles from "client/actions/handles";
import TalknSession from "client/operations/TalknSession";
import TalknComponent from "client/components/TalknComponent";
import LoadingLogo from "client/components/LoadingLogo";
import Style from "client/components/Style";
import HeaderStyle from "client/style/Header";
import ContainerStyle from "client/style/Container";
import PostsFooterStyle from "client/style/PostsFooter";
import Icon from "client/components/Icon";
import Posts from "client/components/Posts";
import Header from "client/components/Header";
import PostsFooter from "client/components/PostsFooter";
import PostsSupporter from "client/components/PostsSupporter";
import DetailRight from "client/components/DetailRight";
import DetailModal from "client/components/DetailModal";
import Menu from "client/components/Menu/index";
import Board from "client/components/Board";
import LockMenu from "client/components/LockMenu";
import Media from "client/components/Media";
import InnerNotif from "client/components/InnerNotif";
import TimeMarker from "client/components/TimeMarker";
import mapToStateToProps from "client/mapToStateToProps/";
import Marquee from "client/container/util/Marquee";
import DateHelper from "client/container/util/DateHelper";
import componentDidUpdates from "client/container/componentDidUpdates";
import TalknWindow from "client/operations/TalknWindow";
import IconStyle from "client/style/Icon";

interface ContainerProps {
  state: any;
  onClickOpenLockMenu: (any?) => any;
  onClickTogglePosts: (any?) => any;
  onClickToggleDispDetail: (any?) => any;
  onClickToggleMain: (any?) => any;
  toggleDispPostsSupporter: (any?) => any;
  onClickMultistream: (any?) => any;
}

interface ContainerState {
  notifs: any;
}

class Container extends TalknComponent<ContainerProps, ContainerState> {
  constructor(props: ContainerProps) {
    super(props);
    const { ui, thread } = props.state;
    this.state = { notifs: [] };
    this.coreApi("fetchPosts", { thread: { ch: thread.ch } });
    if (ui.extensionMode === Ui.extensionModeExtIncludeLabel || ui.extensionMode === Ui.extensionModeExtNoneLabel) {
      this.coreApi("rank", { thread: { ch: thread.ch } });
    }
    this.getProps = this.getProps.bind(this);
    this.renderNewPost = this.renderNewPost.bind(this);
    this.renderSmall = this.renderSmall.bind(this);
    this.renderMiddle = this.renderMiddle.bind(this);
    this.renderLarge = this.renderLarge.bind(this);
    this.renderExtension = this.renderExtension.bind(this);
    this.handleOnClickFooterIcon = this.handleOnClickFooterIcon.bind(this);
    this.handleOnClickTogglePosts = this.handleOnClickTogglePosts.bind(this);
    this.handleOnClickToggleDetail = this.handleOnClickToggleDetail.bind(this);
    this.handleOnClickMultistream = this.handleOnClickMultistream.bind(this);
    this.handleOnClickToggleMain = this.handleOnClickToggleMain.bind(this);
  }

  componentDidMount() {
    this.clientAction("COMPONENT_DID_MOUNTS", "Container");
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
      handleOnClickTogglePosts: this.handleOnClickTogglePosts,
      handleOnClickToggleMain: this.handleOnClickToggleMain,
      handleOnClickToggleDetail: this.handleOnClickToggleDetail,
      nowDate: DateHelper.getNowYmdhis(),
    };
  }

  handleOnClickToggleMain(e) {
    const { onClickToggleMain, onClickToggleDispDetail, onClickOpenLockMenu, state } = this.props;
    let { app, thread, threadDetail } = state;
    let { ui } = state;
    if (ui.extensionMode === Ui.extensionModeExtBottomLabel || ui.extensionMode === Ui.extensionModeExtModalLabel) {
      onClickToggleMain({ app, ui });

      if (app.isOpenDetail) {
        app.isOpenDetail = false;
        onClickToggleDispDetail({ threadDetail, thread, app });
      }

      if (app.openLockMenu !== Ui.openLockMenuLabelNo) {
        onClickOpenLockMenu(Ui.openLockMenuLabelNo);
      }

      window.talknWindow.parentExtTo("toggleIframe");

      if (!app.isLinkCh) {
        window.talknWindow.parentExtTo("getClientMetas");
      }
    }
  }

  handleOnClickToggleDetail(e) {
    const { state, onClickOpenLockMenu } = this.props;
    let { app, threadDetail } = this.clientState;
    let { ui } = state;
    if (ui.openLockMenu !== Ui.openLockMenuLabelNo) {
      onClickOpenLockMenu(Ui.openLockMenuLabelNo);
    } else {
      ui = Ui.getUiUpdatedOpenFlgs({ app, ui }, "headerDetailIcon");
      this.clientAction("ON_CLICK_TOGGLE_DISP_DETAIL", { threadDetail, ui });
    }
  }

  handleOnClickTogglePosts(e) {
    const { onClickTogglePosts, onClickToggleDispDetail, onClickOpenLockMenu, state } = this.props;
    let { app, thread, threadDetail } = state;
    let { ui } = state;
    if (ui.extensionMode === Ui.extensionModeExtBottomLabel || ui.extensionMode === Ui.extensionModeExtModalLabel) {
      onClickTogglePosts({ app, ui });

      if (ui.isOpenDetail) {
        ui.isOpenDetail = false;
        onClickToggleDispDetail({ threadDetail, thread, app, ui });
      }

      if (ui.openLockMenu !== Ui.openLockMenuLabelNo) {
        onClickOpenLockMenu(Ui.openLockMenuLabelNo);
      }

      window.talknWindow.parentExtTo("toggleIframe");

      if (!app.isLinkCh) {
        window.talknWindow.parentExtTo("getClientMetas");
      }
    }
  }

  handleOnClickFooterIcon(e) {
    const { toggleDispPostsSupporter } = this.props;
    toggleDispPostsSupporter();
  }

  handleOnClickMultistream() {
    let { app, postsMulti, postsSingle } = this.props.state;
    let findFlg = false;
    const postsMultiCache = TalknSession.getStorage(app.rootCh, define.storageKey.postsMulti);
    const postsSingleCache = TalknSession.getStorage(app.rootCh, define.storageKey.postsSingle);
    postsMulti = postsMultiCache && postsMultiCache.length > 0 ? postsMultiCache : postsMulti;
    postsSingle = postsSingleCache && postsSingleCache.length > 0 ? postsSingleCache : postsSingle;

    app.isToggleMultistream = true;
    app.dispThreadType =
      app.dispThreadType === App.dispThreadTypeMulti ? App.dispThreadTypeSingle : App.dispThreadTypeMulti;
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

    this.clientAction("ON_CLICK_MULTISTREAM", { app, postsMulti, postsSingle });

    if (findFlg) {
      this.coreApi("fetchPosts", { thread: { ch: app.rootCh }, app });
    }
  }

  render() {
    const { style, ui, app } = this.props.state;
    if (style && style.container && style.container.self && app.tuned) {
      /*
      if (ui.extensionMode === Ui.extensionModeExtBottomLabel || ui.extensionMode === Ui.extensionModeExtModalLabel) {
        return this.renderExtension();
      } else {
*/
      switch (ui.screenMode) {
        case Ui.screenModeSmallLabel:
          return this.renderSmall();
        case Ui.screenModeMiddleLabel:
          return this.renderMiddle();
        case Ui.screenModeLargeLabel:
          return this.renderLarge();
      }
    }
    /*
  } else {
      if (ui.extensionMode === Ui.extensionModeExtBottomLabel || ui.extensionMode === Ui.extensionModeExtModalLabel) {
        return null;
      }
    }
*/
    return <LoadingLogo />;
  }

  renderFixMarker(props): React.ReactNode {
    const { app, thread, ui, uiTimeMarker, style } = this.props.state;
    if (ui.isLoading) {
      const loading = Icon.getLoading(IconStyle.getLoading({ app, ui }));
      return <TimeMarker type={"Fix"} label={loading} style={style.timeMarker.fixTimeMarker} />;
    } else if (thread.postCnt > 0 && uiTimeMarker.now && uiTimeMarker.now.label) {
      return <TimeMarker type={"Fix"} label={uiTimeMarker.now.label} style={style.timeMarker.fixTimeMarker} />;
    } else {
      return undefined;
    }
  }

  renderLinkLabel(props): React.ReactNode {
    const { style, app, thread } = this.props.state;
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

  renderNewPost(props): React.ReactNode {
    const { style, app, ui } = props.state;

    const log = false;
    let dispNewPost = false;

    // 実際に目視できるスレッドの高さ
    const frameHeight = ContainerStyle.getBlockSize({ app, ui }) * 2;
    const postsFrameHeight = window.innerHeight - frameHeight;

    // 実際のスレッドの高さ
    const postsRealHeight = TalknWindow.getPostsClientHeight();
    const PostsComponent = document.querySelector("[data-component-name=Posts]");

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

  renderHideScreenBottom(props): React.ReactNode {
    const { style } = props.state;
    return <div data-component-name={"hideScreenBottom"} style={style.container.hideScreenBottom} />;
  }

  renderLarge(): React.ReactNode {
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
          <InnerNotif {...this.props} />
          {HideScreenBottom}
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

  renderMiddle(): React.ReactNode {
    const { style } = this.props.state;
    const props: any = this.getProps();
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

  renderSmall(): React.ReactNode {
    const { style } = this.props.state;
    const props: any = this.getProps();
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

  renderExtension(): React.ReactNode {
    const { style, ui } = this.props.state;
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
          <PostsFooter {...props} />
          <Menu {...props} />
        </span>
      </span>
    );
  }
}

export default connect(mapToStateToProps, { ...handles })(Container);
