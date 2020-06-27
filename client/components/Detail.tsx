import React from "react";
import TalknComponent from "client/components/TalknComponent";
import conf from "client/conf";
import define from "common/define";
import Sequence from "api/Sequence";
import Ui from "client/store/Ui";
import Thread from "api/store/Thread";
import Marquee from "client/container/util/Marquee";
import DetailFooter from "client/components/DetailFooter";
import EmotionGraph from "client/components/EmotionGraph";
import LockMenu from "client/components/LockMenu";
import Icon from "client/components/Icon";

interface DetailProps {
  onClickOpenLockMenu?: any;
  handleOnClickToggleDetail?: any;
  state: any;
}

interface DetailState {
  style: any;
}

export default class Detail extends TalknComponent<DetailProps, DetailState> {
  constructor(props) {
    super(props);
    this.handleOnClickUpdate = this.handleOnClickUpdate.bind(this);
  }

  handleOnClickLike() {
    const { state, onClickOpenLockMenu } = this.props;
    const { ui } = state;
    if (ui.openLockMenu !== Ui.openLockMenuLabelNo) {
      onClickOpenLockMenu(Ui.openLockMenuLabelNo);
    } else {
      this.clientAction("OPEN_INNER_NOTIF");
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
    this.clientAction("OPEN_INNER_NOTIF", "Thread data has been updated.");
    this.coreApi("updateThread", threadDetail.ch);
  }

  render() {
    const { style } = this.props.state;
    return (
      <div data-component-name={"Detail"} style={style.detail.self}>
        {this.renderHeader()}
        <div data-component-name={"DetailBody"} style={style.detail.body}>
          {this.renderMeta()}
          {this.renderExtension()}
          {this.renderCh()}
          {/* this.renderAnalyze() */}
          <br />
          <br />
          <br />
          <br />
          <br />
          {/*<span style={{color: "gray"}}>特許出願中</span>*/}
          <br />
          <br />
          <br />
        </div>
        {this.renderLockMenu()}
        {this.renderDetailFooter()}
      </div>
    );
  }

  getImgStyle(state, style, protocol, serverMetas) {
    const { threadDetail } = this.props.state;
    let backgroundImage = style.detail.img.backgroundImage;
    let backgroundSize = style.detail.img.backgroundSize;
    switch (threadDetail.findType) {
      case Thread.findTypeHtml:
        if (serverMetas["og:image"]) {
          if (
            `${serverMetas["og:image"]}`.indexOf(Sequence.HTTPS_PROTOCOL) === 0 ||
            `${serverMetas["og:image"]}`.indexOf(Sequence.HTTP_PROTOCOL) === 0
          ) {
            backgroundImage = `url("${serverMetas["og:image"]}")`;
          } else {
            if (protocol === Sequence.TALKN_PROTOCOL) {
              backgroundImage = `url("${Sequence.HTTPS_PROTOCOL}${serverMetas["og:image"]}")`;
            } else {
              backgroundImage = `url("${protocol}${serverMetas["og:image"]}")`;
            }
          }
          backgroundSize = "cover";
        }
        break;
      case Thread.findTypeMusic:
        backgroundImage = `url("${conf.ogpImages.Music}")`;
        backgroundSize = "cover";
        break;
      case Thread.findTypeVideo:
        backgroundImage = `url("${conf.ogpImages.Video}")`;
        backgroundSize = "cover";
        break;
    }

    return { ...style.detail.img, backgroundImage, backgroundSize };
  }

  getDescription(serverMetas) {
    if (serverMetas) {
      if (serverMetas["description"] !== conf.description) {
        return serverMetas["description"];
      }
      if (serverMetas["og:description"]) {
        return serverMetas["og:description"];
      }
    }
    return conf.description;
  }

  renderHeader() {
    const { state, handleOnClickToggleDetail } = this.props;
    const { style, threadDetail } = state;
    return (
      <header data-component-name={"DetailHeader"} onClick={handleOnClickToggleDetail} style={style.detail.header}>
        <span style={style.detail.headerP}>
          {/*threadDetail.serverMetas.title*/}

          <Marquee text={threadDetail.title} loop={true} hoverToStop={false} trailing={0} leading={0} />
        </span>
      </header>
    );
  }

  getTwitterIcon(state) {
    const { threadDetail, ui } = this.props.state;
    const { serverMetas } = threadDetail;
    const active = serverMetas && serverMetas["twitter:site"] && serverMetas["twitter:site"] !== "";
    const href = active ? `${define.URL.twitter}${serverMetas["twitter:site"].replace("@", "")}` : "";
    const onClick =
      ui.extensionMode !== "NONE"
        ? () => {
            window.talknWindow.parentExtTo("linkTo", { href });
          }
        : () => {};
    return Icon.getTwitter({}, state, { active, href, onClick });
  }

  getFacebookIcon(state) {
    const { threadDetail } = this.props.state;
    const { serverMetas } = threadDetail;
    const { ui } = state;
    const active = serverMetas && serverMetas["fb:page_id"] !== "";
    const href = active ? `${define.URL.facebook}${serverMetas["fb:page_id"]}` : "";
    const onClick =
      ui.extensionMode !== "NONE"
        ? () => {
            window.talknWindow.parentExtTo("linkTo", { href });
          }
        : () => {};
    return Icon.getFacebook({}, state, { active, href, onClick });
  }

  getAppstoreIcon(state) {
    const { threadDetail } = this.props.state;
    const { serverMetas } = threadDetail;
    const { ui } = state;
    const active = serverMetas && serverMetas["al:ios:app_store_id"] !== "";
    const href = active ? `${define.URL.appstore}${serverMetas["al:ios:app_store_id"]}` : "";
    const onClick =
      ui.extensionMode !== "NONE"
        ? () => {
            window.talknWindow.parentExtTo("linkTo", { href });
          }
        : () => {};
    return Icon.getAppstore({}, state, { active, href, onClick });
  }

  getAndroidIcon(state) {
    const { ui, threadDetail } = state;
    const { serverMetas } = threadDetail;
    const active = serverMetas && serverMetas["al:android:package"] !== "";
    const href = active ? `${define.URL.playstore}${serverMetas["al:android:package"]}` : "";
    const onClick =
      ui.extensionMode !== "NONE"
        ? () => {
            window.talknWindow.parentExtTo("linkTo", { href });
          }
        : () => {};
    return Icon.getAndroid({}, state, { active, href, onClick });
  }

  getHomeIcon(state) {
    const { threadDetail, ui } = state;
    const { protocol, ch, hasSlash } = threadDetail;
    const active = true;
    let href = `${Sequence.HTTPS_PROTOCOL}//${conf.domain}${ch}`;

    if (protocol !== Sequence.TALKN_PROTOCOL) {
      if (hasSlash && ch.lastIndexOf("/") === ch.length - 1) {
        href = `${protocol}/${ch}`.replace(/\/$/, "");
      } else {
        href = `${protocol}/${ch}`;
      }
    }
    const onClick =
      ui.extensionMode !== "NONE"
        ? () => {
            window.talknWindow.parentExtTo("linkTo", { href });
          }
        : () => {};
    return Icon.getHome({}, state, { active, href, onClick });
  }

  getTalknIcon(state) {
    const { threadDetail, ui } = state;
    const { ch } = threadDetail;
    const active = true;
    const href = `${Sequence.HTTPS_PROTOCOL}//${conf.domain}${ch}`;
    const onClick =
      ui.extensionMode !== "NONE"
        ? () => {
            window.talknWindow.parentExtTo("linkTo", { href });
          }
        : () => {};
    return Icon.getTalkn({}, state, { active, href, onClick });
  }

  getDispContentType(contentType) {
    const { style } = this.props.state;
    if (contentType) {
      return contentType.split(";").map((c, i) => (
        <div key={`${c}_${i}`} style={style.detail.metaContentType}>
          {c}
        </div>
      ));
    }
    return "";
  }

  renderMeta() {
    const { state } = this.props;
    const { threadDetail, style } = state;
    const { serverMetas, contentType, h1s, protocol } = threadDetail;
    style.detail.img = this.getImgStyle(state, style, protocol, serverMetas);
    const description = this.getDescription(serverMetas);

    // Have item icons.
    const TwitterIcon = this.getTwitterIcon(state);
    const FacebookIcon = this.getFacebookIcon(state);
    const AppstoreIcon = this.getAppstoreIcon(state);
    const AndroidIcon = this.getAndroidIcon(state);

    // Default icons.
    const HomeIcon = this.getHomeIcon(state);
    const TalknIcon = this.getTalknIcon(state);
    const GraphIcon = Icon.getGraph({}, state, { active: false });
    const EmptyIcon = Icon.getEmpty({}, state, { active: false });

    // Content Type
    const dispContentType = this.getDispContentType(contentType);
    /*
    const h1LiTags = h1s.map( ( h1, i ) => {
      return( <li style={ style.detail.h1sLi } key={`h1s${i}`}>・{h1}</li> );
    });
    */

    return (
      <div data-component-name={"DetaiMeta"} style={style.detail.meta}>
        <div style={style.detail.img} />
        <div style={style.detail.description}>{description}</div>
        <EmotionGraph {...this.props} />
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

        <div style={style.detail.metaContentTypeWrap}>{dispContentType}</div>
      </div>
    );
  }

  renderCh() {
    const { state } = this.props;
    const { style, threadDetail } = state;
    const IconUpdate = Icon.getUpdate(style.icon.update);
    return (
      <div style={style.detail.ch}>
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
            <div style={style.detail.analyzeValue}>{threadDetail.watchCnt}</div>
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
    switch (ui.screenMode) {
      case Ui.screenModeSmallLabel:
      case Ui.screenModeMiddleLabel:
        return <LockMenu {...this.props} />;
      case Ui.screenModeLargeLabel:
        return null;
    }
  }

  renderDetailFooter() {
    const { ui } = this.props.state;
    switch (ui.screenMode) {
      case Ui.screenModeSmallLabel:
      case Ui.screenModeMiddleLabel:
      case Ui.screenModeLargeLabel:
        return <DetailFooter {...this.props} />;
    }
  }

  renderExtension() {
    const { state } = this.props;
    const { ui } = state;
    const active = true;
    const href = "https://chrome.google.com/webstore/detail/talkn-for-chrome/dkngnmdlcofambpfaccepbnjgfholgbo?hl=en";
    const onClick =
      ui.extensionMode !== "NONE"
        ? () => {
            window.talknWindow.parentExtTo("linkTo", { href });
          }
        : () => {};
    return Icon.getChromeExtension({}, state, { active, href, onClick });
  }
}
