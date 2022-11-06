import React from 'react';

import Sequence from 'common/Sequence';
import Ui from 'common/clientState/store/Ui';
import define from 'common/define';

import Thread from 'api/store/Thread';

import DetailFooter from 'client/components/Detail/DetailFooter';
import EmotionGraph from 'client/components/Detail/EmotionGraph';
import LockMenu from 'client/components/Detail/LockMenu';
import TalknComponent from 'client/components/TalknComponent';
import Icon from 'client/components/common/Icon';
import conf from 'client/conf';
import Marquee from 'client/container/util/Marquee';
import Container from 'client/style/Container';

type DetailProps = {
  onClickOpenLockMenu?: any;
  handleOnClickToggleDetail?: any;
  state: any;
};

type DetailState = {
  metaStyle: any;
  chStyle: any;
};

export default class Detail extends TalknComponent<DetailProps, DetailState> {
  constructor(props) {
    super(props);
    this.componentName = 'Detail';
    const { style } = props.state;

    this.state = {
      metaStyle: style.detail.meta,
      chStyle: style.detail.ch,
    };

    this.handleOnClickUpdate = this.handleOnClickUpdate.bind(this);
    this.getMetaDecolationProps = this.getMetaDecolationProps.bind(this);
    this.getChDecolationProps = this.getChDecolationProps.bind(this);
  }

  getMetaDecolationProps() {
    return {
      onMouseOver: () => {
        this.setState({
          metaStyle: {
            ...this.state.metaStyle,
            background: Container.whiteRGBA,
          },
        });
      },
      onMouseLeave: () => {
        this.setState({
          metaStyle: {
            ...this.state.metaStyle,
            background: Container.lightRGBA,
          },
        });
      },
    };
  }

  getChDecolationProps() {
    return {
      onMouseOver: () => {
        this.setState({
          chStyle: {
            ...this.state.chStyle,
            background: Container.whiteRGBA,
          },
        });
      },
      onMouseLeave: () => {
        this.setState({
          chStyle: {
            ...this.state.chStyle,
            background: Container.lightRGBA,
          },
        });
      },
    };
  }

  handleOnClickLike() {
    const { state, onClickOpenLockMenu } = this.props;
    const { ui } = state;
    if (ui.openLockMenu !== Ui.openLockMenuLabelNo) {
      onClickOpenLockMenu(Ui.openLockMenuLabelNo);
    } else {
      this.clientAction('OPEN_INNER_NOTIF');
    }
  }

  handleOnClickShare() {
    const { state, onClickOpenLockMenu } = this.props;
    const { ui } = state;
    if (ui.openLockMenu !== Ui.openLockMenuLabelNo) {
      onClickOpenLockMenu(Ui.openLockMenuLabelNo);
    } else {
      onClickOpenLockMenu(Ui.openLockMenuLabelShare);
    }
  }

  handleOnClickPortal() {
    const { state, onClickOpenLockMenu } = this.props;
    const { ui } = state;
    if (ui.openLockMenu !== Ui.openLockMenuLabelNo) {
      onClickOpenLockMenu(Ui.openLockMenuLabelNo);
    }
  }

  handleOnClickUpdate() {
    const { threadDetail } = this.props.state;
    this.clientAction('OPEN_INNER_NOTIF', { ui: { openInnerNotif: 'Update thread data.' } });
    this.api('updateThread', { thread: { ch: threadDetail.ch, protocol: location.protocol } });
  }

  getImgStyle(state, style, protocol, serverMetas) {
    const { threadDetail } = this.props.state;
    let backgroundImage = style.detail.img.backgroundImage;
    let backgroundSize = style.detail.img.backgroundSize;
    switch (threadDetail.findType) {
      default:
      case Thread.findTypeHtml:
        if (serverMetas && serverMetas['og:image']) {
          if (
            `${serverMetas['og:image']}`.indexOf(Sequence.HTTPS_PROTOCOL) === 0 ||
            `${serverMetas['og:image']}`.indexOf(Sequence.HTTP_PROTOCOL) === 0
          ) {
            backgroundImage = `url("${serverMetas['og:image']}")`;
          } else {
            if (protocol === Sequence.TALKN_PROTOCOL) {
              backgroundImage = `url("${Sequence.HTTPS_PROTOCOL}${serverMetas['og:image']}")`;
            } else {
              backgroundImage = `url("${protocol}${serverMetas['og:image']}")`;
            }
          }
          backgroundSize = 'cover';
        }
        break;
      case Thread.findTypeMusic:
        backgroundImage = `url("${conf.ogpImages.Music}")`;
        backgroundSize = 'cover';
        break;
      case Thread.findTypeVideo:
        backgroundImage = `url("${conf.ogpImages.Video}")`;
        backgroundSize = 'cover';
        break;
    }
    return { ...style.detail.img, backgroundImage, backgroundSize };
  }

  getDescription(serverMetas) {
    if (serverMetas) {
      if (serverMetas['description'] && serverMetas['description'] !== conf.description) {
        return serverMetas['description'];
      }
      if (serverMetas['og:description'] && serverMetas['og:description']) {
        return serverMetas['og:description'];
      }
    }
    return conf.description;
  }

  render() {
    const { style } = this.props.state;
    return (
      <div data-component-name={this.componentName} style={style.detail.self}>
        {this.renderHeader()}
        <div data-component-name={'DetailBody'} style={style.detail.body}>
          {this.renderImage()}
          {this.renderMeta()}
          {this.renderExtension()}
          {this.renderCh()}
          <div data-component-name="Detail-space" style={style.detail.space}></div>
        </div>
        {this.renderLockMenu()}
        {this.renderDetailFooter()}
      </div>
    );
  }

  renderHeader(): React.ReactNode {
    const { state, handleOnClickToggleDetail } = this.props;
    const { style, threadDetail } = state;
    const title = threadDetail.serverMetas && threadDetail.serverMetas['title'] ? threadDetail.serverMetas['title'] : define.APP_NAME;
    return (
      <header data-component-name={'DetailHeader'} onClick={handleOnClickToggleDetail} style={style.detail.header}>
        <span style={style.detail.headerP}>
          <Marquee text={title} loop={true} hoverToStop={false} trailing={0} leading={0} />
        </span>
      </header>
    );
  }

  renderImage() {
    const { state } = this.props;
    const { threadDetail, style } = state;
    const { serverMetas, protocol } = threadDetail;
    style.detail.img = this.getImgStyle(state, style, protocol, serverMetas);
    return <div style={style.detail.img} />;
  }

  renderMeta() {
    const { metaStyle } = this.state;
    return (
      <div data-component-name={'DetaiMeta'} style={metaStyle} {...this.getMetaDecolationProps()}>
        {this.renderDescription()}
        <EmotionGraph {...this.props} />
        {this.renderIcons()}
        {this.renderContentTypes()}
      </div>
    );
  }

  renderDescription() {
    const { state } = this.props;
    const { threadDetail, style, app, ui } = state;
    const { serverMetas } = threadDetail;
    const description = this.getDescription(serverMetas);
    const linkToIcon = Icon.getSvgIcon('LinkTo', { app, ui });
    const { protocol, ch } = threadDetail;
    return (
      <div data-component-name={'Detail-description'} style={style.detail.description}>
        {description}
        {protocol !== Sequence.TALKN_PROTOCOL && (
          <a href={`${protocol}/${ch}`} style={style.detail.descriptionAnchor}>
            &nbsp;&nbsp;{linkToIcon}
          </a>
        )}
      </div>
    );
  }

  renderIcons() {
    const { state } = this.props;
    const { style } = state;
    // Have item icons.
    const TwitterIcon = Icons.getTwitterIcon(state);
    const FacebookIcon = Icons.getFacebookIcon(state);
    const AppstoreIcon = Icons.getAppstoreIcon(state);
    const AndroidIcon = Icons.getAndroidIcon(state);

    // Default icons.
    const HomeIcon = Icons.getHomeIcon(state);
    const TalknIcon = Icons.getTalknIcon(state);
    const GraphIcon = Icon.getGraph(state, {}, { active: false });
    const EmptyIcon = Icon.getEmpty(state, {}, { active: false });
    return (
      <div data-component-name="Detail-icons">
        <div style={style.detail.metaItems}>
          {TwitterIcon}
          {FacebookIcon}
          {AppstoreIcon}
          {AndroidIcon}
        </div>

        <div style={style.detail.metaItems}>
          {HomeIcon}
          {TalknIcon}
          {GraphIcon}
          {EmptyIcon}
        </div>
      </div>
    );
  }

  renderContentTypes() {
    const { state } = this.props;
    const { threadDetail, style } = state;
    const { contentType } = threadDetail;
    if (contentType) {
      const contentTypes = contentType.split(';').map((c, i) => (
        <div key={`${c}_${i}`} style={style.detail.metaContentType}>
          {c}
        </div>
      ));
      return <div style={style.detail.metaContentTypeWrap}>{contentTypes}</div>;
    }
    return undefined;
  }

  renderCh() {
    const { chStyle } = this.state;
    const { state } = this.props;
    const { style, threadDetail } = state;
    const IconUpdate = Icon.getUpdate(style.icon.update);
    return (
      <div data-component-name={'Detail-ch'} style={chStyle} {...this.getChDecolationProps()}>
        CH
        <br />
        {threadDetail.ch}
        <br />
        <br />
        <div onClick={this.handleOnClickUpdate} style={style.detail.updateWrap}>
          <div style={style.detail.update}>
            UPDATE
            {IconUpdate}
          </div>
        </div>
      </div>
    );
  }

  renderAnalyze() {
    const { state } = this.props;
    const { style, threadDetail } = state;
    return (
      <div style={style.detail.analyze}>
        <div style={style.detail.analyzeRow}>
          <div style={style.detail.analyzeCol}>
            <div style={style.detail.analyzeLabel}>LIVE</div>
            <hr style={style.detail.analyzeHr} />
            <div style={style.detail.analyzeValue}>{threadDetail.liveCnt}</div>
          </div>
          <div style={style.detail.analyzeCol}>
            <div style={style.detail.analyzeLabel}>POSITIBITY</div>
            <hr style={style.detail.analyzeHr} />
            <div style={style.detail.analyzeValue}>1.5</div>
          </div>
          <div style={style.detail.analyzeCol}>
            <div style={style.detail.analyzeLabel}>GROWTH</div>
            <hr style={style.detail.analyzeHr} />
            <div style={style.detail.analyzeValue}>2.0%</div>
          </div>
        </div>
        <div style={style.detail.analyzeRow}>
          <div style={style.detail.analyzeCol}>
            <div style={style.detail.analyzeLabel}>TOTAL POST</div>
            <hr style={style.detail.analyzeHr} />
            <div style={style.detail.analyzeValue}>{threadDetail.postCnt}</div>
          </div>
          <div style={style.detail.analyzeCol}>
            <div style={style.detail.analyzeLabel}>AD POWER</div>
            <hr style={style.detail.analyzeHr} />
            <div style={style.detail.analyzeValue}>102</div>
          </div>
          <div style={style.detail.analyzeCol}>
            <div style={style.detail.analyzeLabel}>RANK</div>
            <hr style={style.detail.analyzeHr} />
            <div style={style.detail.analyzeValue}>2</div>
          </div>
        </div>
        <div style={style.detail.analyzeRow}>
          <div style={style.detail.analyzeCol}>
            <div style={style.detail.analyzeLabel}>LIKE</div>
            <hr style={style.detail.analyzeHr} />
            <div style={style.detail.analyzeValue}>{threadDetail.postCnt}</div>
          </div>
          <div style={style.detail.analyzeCol}>
            <div style={style.detail.analyzeLabel}>SHARE</div>
            <hr style={style.detail.analyzeHr} />
            <div style={style.detail.analyzeValue}>12</div>
          </div>
          <div style={style.detail.analyzeCol}>
            <div style={style.detail.analyzeLabel}>MONEY</div>
            <hr style={style.detail.analyzeHr} />
            <div style={style.detail.analyzeValue}>13200</div>
          </div>
        </div>
      </div>
    );
  }

  renderH1s() {
    const { threadDetail, style } = this.props.state;
    const liTags = threadDetail.h1s.map((h1, i) => {
      return (
        <li style={style.detail.h1sLi} key={`h1s${i}`}>
          ・{h1}
        </li>
      );
    });
    return <ol style={style.detail.h1s}>{liTags}</ol>;
  }

  renderLockMenu() {
    const { ui } = this.props.state;
    switch (ui.screenSize) {
      case Ui.screenSizeSmallLabel:
      case Ui.screenSizeMiddleLabel:
        return <LockMenu {...this.props} />;
      case Ui.screenSizeLargeLabel:
        return null;
    }
  }

  renderDetailFooter() {
    const { ui } = this.props.state;
    switch (ui.screenSize) {
      case Ui.screenSizeSmallLabel:
      case Ui.screenSizeMiddleLabel:
      case Ui.screenSizeLargeLabel:
        return <DetailFooter {...this.props} />;
    }
  }

  renderExtension() {
    const { state } = this.props;
    const { ui } = state;
    const active = true;
    const href = define.chromeExtension;
    const onClick =
      ui.extensionMode !== Ui.extensionModeNone
        ? () => {
            window.talknWindow.ext.to('linkTo', Sequence.UNKNOWN, { href });
          }
        : () => {};
    return Icon.getChromeExtension({}, state, { active, href, onClick });
  }
}

class Icons {
  static getTwitterIcon(state) {
    const { threadDetail, ui } = state;
    const { serverMetas } = threadDetail;
    const active = serverMetas && serverMetas['twitter:site'] && serverMetas['twitter:site'] !== '';
    const href = active ? `${define.URL.twitter}${serverMetas['twitter:site'].replace('@', '')}` : '';
    const onClick =
      ui.extensionMode !== Ui.extensionModeNone
        ? () => {
            window.talknWindow.ext.to('linkTo', Sequence.UNKNOWN, { href });
          }
        : () => {};
    return Icon.getTwitter(state, {}, { active, href, onClick });
  }

  static getFacebookIcon(state) {
    const { threadDetail } = state;
    const { serverMetas } = threadDetail;
    const { ui } = state;
    const active = serverMetas && serverMetas['fb:page_id'];
    const href = active ? `${define.URL.facebook}${serverMetas['fb:page_id']}` : '';
    const onClick =
      ui.extensionMode !== Ui.extensionModeNone
        ? () => {
            window.talknWindow.ext.to('linkTo', Sequence.UNKNOWN, { href });
          }
        : () => {};
    return Icon.getFacebook(state, {}, { active, href, onClick });
  }

  static getAppstoreIcon(state) {
    const { threadDetail } = state;
    const { serverMetas } = threadDetail;
    const { ui } = state;
    const active = serverMetas && serverMetas['al:ios:app_store_id'];
    const href = active ? `${define.URL.appstore}${serverMetas['al:ios:app_store_id']}` : '';
    const onClick =
      ui.extensionMode !== Ui.extensionModeNone
        ? () => {
            window.talknWindow.ext.to('linkTo', Sequence.UNKNOWN, { href });
          }
        : () => {};
    return Icon.getAppstore(state, {}, { active, href, onClick });
  }

  static getAndroidIcon(state) {
    const { ui, threadDetail } = state;
    const { serverMetas } = threadDetail;
    const active = serverMetas && serverMetas['al:android:package'];
    const href = active ? `${define.URL.playstore}${serverMetas['al:android:package']}` : '';
    const onClick =
      ui.extensionMode !== Ui.extensionModeNone
        ? () => {
            window.talknWindow.ext.to('linkTo', Sequence.UNKNOWN, { href });
          }
        : () => {};
    return Icon.getAndroid(state, {}, { active, href, onClick });
  }

  static getHomeIcon(state) {
    const { threadDetail, ui } = state;
    const { protocol, ch, hasSlash } = threadDetail;
    const active = true;
    let href = `${Sequence.HTTPS_PROTOCOL}//${conf.domain}${ch}`;

    if (protocol !== Sequence.TALKN_PROTOCOL) {
      if (hasSlash && ch.lastIndexOf('/') === ch.length - 1) {
        href = `${protocol}/${ch}`.replace(/\/$/, '');
      } else {
        href = `${protocol}/${ch}`;
      }
    }
    const onClick =
      ui.extensionMode !== Ui.extensionModeNone
        ? () => {
            window.talknWindow.ext.to('linkTo', Sequence.UNKNOWN, { href });
          }
        : () => {};
    return Icon.getHome(state, {}, { active, href, onClick });
  }

  static getTalknIcon(state) {
    const { threadDetail, ui } = state;
    const { ch } = threadDetail;
    const active = true;
    const href = `${Sequence.HTTPS_PROTOCOL}//${conf.domain}${ch}`;
    const onClick =
      ui.extensionMode !== Ui.extensionModeNone
        ? () => {
            window.talknWindow.ext.to('linkTo', Sequence.UNKNOWN, { href });
          }
        : () => {};
    return Icon.getTalkn(state, {}, { active, href, onClick });
  }
}
