import React from "react";
import TalknComponent from "client/components/TalknComponent";
import conf from "common/conf";
import Sequence from "api/Sequence";
import Ui from "client/store/Ui";
import Icon from "client/components/common/Icon";
import Container from "client/style/Container";

type DetailFooterProps = {
  mode?: string;
  onClickOpenLockMenu?: any;
  state: any;
}

type DetailFooterState = {
  style: any;
}

export default class DetailFooter extends TalknComponent<DetailFooterProps, DetailFooterState> {
  constructor(props) {
    super(props);
    this.componentName = 'DetailFooter';
    this.handleOnClickLike = this.handleOnClickLike.bind(this);
    this.handleOnClickShare = this.handleOnClickShare.bind(this);
    this.handleOnClickPortal = this.handleOnClickPortal.bind(this);
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
      this.clientAction("ON_CLICK_OPEN_LOCK_MENU");
      onClickOpenLockMenu(Ui.openLockMenuLabelNo);
    } else {
      onClickOpenLockMenu(Ui.openLockMenuLabelShare);
    }
  }

  handleOnClickPortal() {
    const { ui } = this.props.state;
    if (ui.extensionMode === Ui.extensionModeBottom || ui.extensionMode === Ui.extensionModeModal) {
      window.talknWindow.ext.to("linkTo", Sequence.UNKNOWN, { href: `https://${conf.wwwURL}` });
    } else {
      // @ts-ignore.
      window.location.href = `https://${conf.wwwURL}`;
    }
  }

  render() {
    const { mode, state } = this.props;
    const { app, ui, style } = state;

    if (
      (ui.extensionMode === Ui.extensionModeBottom || ui.extensionMode === Ui.extensionModeModal) &&
      mode === "default"
    ) {
      return null;
    } else {
      const HeartIcon = Icon.getHeart({}, { app, ui });
      const ShareIcon = Icon.getShare({}, { app, ui });
      const MoneyIcon = Icon.getMoney({}, { app, ui });
      const shareColor =
        state.ui.openLockMenu === Ui.openLockMenuLabelShare ? Container.themeRGBA : Container.fontBaseRGB;

      return (
        <footer data-component-name={this.componentName} style={style.detailFooter.self}>
          <div style={style.detailFooter.childLike} onClick={this.handleOnClickLike}>
            {HeartIcon}
            <div>LIKE</div>
          </div>
          <div style={style.detailFooter.childShare} onClick={this.handleOnClickShare}>
            {ShareIcon}
            <div style={{ color: shareColor }}>SHARE</div>
          </div>
          <div style={style.detailFooter.childMoney} onClick={this.handleOnClickPortal}>
            {MoneyIcon}
            <div>ABOUT</div>
          </div>
        </footer>
      );
    }
  }
}
