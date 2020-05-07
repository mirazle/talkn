import React from "react";
import TalknComponent from "client/components/TalknComponent";
import ClientState from "client/store/";
import conf from "common/conf";
import Ui from "client/store/Ui";
import Icon from "client/components/Icon";
import Container from "client/style/Container";

interface DetailFooterProps {
  mode?: string;
  onClickOpenLockMenu?: any;
  state: any;
}

interface DetailFooterState {
  style: any;
}

export default class DetailFooter extends TalknComponent<DetailFooterProps, DetailFooterState> {
  constructor(props) {
    super(props);
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
    if (ui.extensionMode === Ui.extensionModeExtBottomLabel || ui.extensionMode === Ui.extensionModeExtModalLabel) {
      window.talknWindow.parentExtTo("linkTo", { href: `https://${conf.wwwURL}` });
    } else {
      location.href = `https://${conf.wwwURL}`;
    }
  }

  render() {
    const { mode, state } = this.props;
    const { app, ui, style } = state;

    if (
      (ui.extensionMode === Ui.extensionModeExtBottomLabel || ui.extensionMode === Ui.extensionModeExtModalLabel) &&
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
        <footer data-component-name={"DetailFooter"} style={style.detailFooter.self}>
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
