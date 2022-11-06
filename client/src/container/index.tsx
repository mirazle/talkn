import React from 'react';
import { connect } from 'react-redux';

import DateHelper from 'common/DateHelper';
import Sequence from 'common/Sequence';
import mapToStateToProps from 'common/clientState/mapToStateToProps/';
import TalknSession from 'common/clientState/operations/TalknSession';
import Ui from 'common/clientState/store/Ui';
import define from 'common/define';

import App from 'api/store/App';

import handles from 'client/actions/handles';
import DetailModal from 'client/components/Detail/DetailModal';
import DetailRight from 'client/components/Detail/DetailRight';
import LockMenu from 'client/components/Detail/LockMenu';
import Header from 'client/components/Header';
import InnerNotif from 'client/components/InnerNotif';
import PostsFooter from 'client/components/Input/PostsFooter';
import PostsSupporter from 'client/components/Input/PostsSupporter';
import SetChModal from 'client/components/Menu/SetChModal';
import Menu from 'client/components/Menu/index';
import Style from 'client/components/Style';
import TalknComponent from 'client/components/TalknComponent';
import Posts from 'client/components/Thread/Posts';
import componentDidUpdates from 'client/container/componentDidUpdates';

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

    this.getProps = this.getProps.bind(this);
    this.renderSmall = this.renderSmall.bind(this);
    this.renderMiddle = this.renderMiddle.bind(this);
    this.renderLarge = this.renderLarge.bind(this);
    this.handleOnClickFooterIcon = this.handleOnClickFooterIcon.bind(this);
    this.handleOnClickTogglePosts = this.handleOnClickTogglePosts.bind(this);
    this.handleOnClickToggleDetail = this.handleOnClickToggleDetail.bind(this);
    this.handleOnClickMultistream = this.handleOnClickMultistream.bind(this);
    this.handleOnClickToggleMain = this.handleOnClickToggleMain.bind(this);
  }

  componentDidMount() {
    this.clientAction('COMPONENT_DID_MOUNTS', 'Container');
  }

  componentDidUpdate() {
    componentDidUpdates(this, 'Container');
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
    if (ui.extensionMode === Ui.extensionModeBottom || ui.extensionMode === Ui.extensionModeModal) {
      onClickToggleMain({ app, ui });

      if (app.isOpenDetail) {
        app.isOpenDetail = false;
        onClickToggleDispDetail({ threadDetail, thread, app });
      }

      if (app.openLockMenu !== Ui.openLockMenuLabelNo) {
        onClickOpenLockMenu(Ui.openLockMenuLabelNo);
      }

      window.talknWindow.ext.to('toggleIframe', Sequence.UNKNOWN);

      if (!app.isLinkCh) {
        window.talknWindow.ext.to('getClientMetas', Sequence.UNKNOWN);
      }
    }
  }

  handleOnClickToggleDetail(e) {
    const { state, onClickOpenLockMenu } = this.props;
    let { app, thread, threadDetail } = this.clientState;
    let { ui } = state;
    if (ui.openLockMenu !== Ui.openLockMenuLabelNo) {
      onClickOpenLockMenu(Ui.openLockMenuLabelNo);
    } else {
      ui = Ui.getUiUpdatedOpenFlgs({ app, ui }, 'headerDetailIcon');
      this.clientAction('ON_CLICK_TOGGLE_DISP_DETAIL', { threadDetail, ui, app: { detailCh: thread.ch } });
    }
  }

  handleOnClickTogglePosts(e) {
    const { onClickTogglePosts, onClickToggleDispDetail, onClickOpenLockMenu, state } = this.props;
    let { app, thread, threadDetail } = state;
    let { ui } = state;
    if (ui.extensionMode === Ui.extensionModeBottom || ui.extensionMode === Ui.extensionModeModal) {
      onClickTogglePosts({ app, ui });

      if (ui.isOpenDetail) {
        ui.isOpenDetail = false;
        onClickToggleDispDetail({ threadDetail, thread, app, ui });
      }

      if (ui.openLockMenu !== Ui.openLockMenuLabelNo) {
        onClickOpenLockMenu(Ui.openLockMenuLabelNo);
      }

      window.talknWindow.ext.to('toggleIframe', Sequence.UNKNOWN);

      if (!app.isLinkCh) {
        window.talknWindow.ext.to('getClientMetas', Sequence.UNKNOWN);
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
    app.dispThreadType = app.dispThreadType === App.dispThreadTypeMulti ? App.dispThreadTypeSingle : App.dispThreadTypeMulti;
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

    this.clientAction('ON_CLICK_MULTISTREAM', { app, postsMulti, postsSingle });

    if (findFlg) {
      this.api('fetchPosts', { thread: { ch: app.rootCh }, app });
    }
  }

  render() {
    const { app, ui, ranks } = this.props.state;
    if (app.tunedCh !== '') {
      switch (ui.extensionMode) {
        case Ui.extensionModeNone:
        case Ui.extensionModeModal:
        case Ui.extensionModeEmbed:
          switch (ui.screenSize) {
            case Ui.screenSizeSmallLabel:
              return this.renderSmall();
            case Ui.screenSizeMiddleLabel:
              return this.renderMiddle();
            case Ui.screenSizeLargeLabel:
              return this.renderLarge();
          }
        case Ui.extensionModeLiveMedia:
          return this.renderLiveMedia();
      }
    }
    return <></>;
  }

  renderHideScreenBottom(props): React.ReactNode {
    const { style } = props.state;
    return <div data-component-name={'hideScreenBottom'} style={style.container.hideScreenBottom} />;
  }

  renderLiveMedia(): React.ReactNode {
    const { style } = this.props.state;
    const props: any = this.getProps();
    const HideScreenBottom = this.renderHideScreenBottom(props);
    return (
      <div data-component-name={'Container'} style={style.container.self}>
        <Style {...props} />
        <Posts {...props} />
        <div data-component-name="fixedComponents">
          <DetailModal {...props} />
          <LockMenu {...props} />
          <InnerNotif {...this.props} />
          <SetChModal {...this.props} />
          {HideScreenBottom}
        </div>
      </div>
    );
  }

  renderOnlyPost(): React.ReactNode {
    const { style } = this.props.state;
    const props: any = this.getProps();
    const HideScreenBottom = this.renderHideScreenBottom(props);
    return (
      <div data-component-name={'Container'} style={style.container.self}>
        <Style {...props} />
        <div data-component-name="fixedComponents">
          <PostsSupporter {...props} />
          <PostsFooter {...props} />
          {HideScreenBottom}
        </div>
      </div>
    );
  }

  renderLarge(): React.ReactNode {
    const { style } = this.props.state;
    const props: any = this.getProps();
    const HideScreenBottom = this.renderHideScreenBottom(props);
    return (
      <div data-component-name={'Container'} style={style.container.self}>
        <Style {...props} />
        <Posts {...props} />
        <div data-component-name="fixedComponents">
          <Header {...props} />
          <PostsSupporter {...props} />
          <DetailRight {...props} />
          <LockMenu {...props} />
          <PostsFooter {...props} />
          <Menu {...props} />
          <InnerNotif {...this.props} />
          <SetChModal {...this.props} />
          {HideScreenBottom}
        </div>
      </div>
    );
  }

  renderMiddle(): React.ReactNode {
    const { style } = this.props.state;
    const props: any = this.getProps();
    const HideScreenBottom = this.renderHideScreenBottom(props);
    return (
      <div data-component-name={'Container'} style={style.container.self}>
        <Style {...props} />
        <Posts {...props} />
        <div data-component-name="fixedComponents">
          <Header {...props} />
          <PostsSupporter {...props} />
          <DetailModal {...props} />
          <PostsFooter {...props} />
          <Menu {...props} />
          <InnerNotif {...this.props} />
          <SetChModal {...this.props} />
          {HideScreenBottom}
        </div>
      </div>
    );
  }

  renderSmall(): React.ReactNode {
    const { style } = this.props.state;
    const props: any = this.getProps();
    const HideScreenBottom = this.renderHideScreenBottom(props);
    return (
      <div data-component-name={'Container'} style={style.container.self}>
        <Style {...props} />
        <Posts {...props} />
        <div data-component-name="fixedComponents">
          <Header {...props} />
          <PostsSupporter {...props} />
          <DetailModal {...props} />
          <PostsFooter {...props} />
          <Menu {...props} />
          <InnerNotif {...this.props} />
          <SetChModal {...this.props} />
          {/*Debug*/}
          {HideScreenBottom}
        </div>
      </div>
    );
  }
}

{
  /*
Youtube
<iframe
  style={{position: "fixed", top: "0px", zIndex: 10000}}
  width="560"
  height="315"
  src="https://www.youtube.com/embed/NOcoQD4bZUw?enablejsapi=1"
  frameBorder="0"
  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen
/>
*/
}
export default connect(mapToStateToProps, { ...handles })(Container);
