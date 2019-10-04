import React, { Component } from "react";
import conf from "common/conf";
import App from "common/schemas/state/App";
import Icon from "client/components/Icon";
import Container from "client/style/Container";

interface Props {
  mode?: string;
  onClickOpenLockMenu?: any;
  openInnerNotif?: any;
  state: any;
}

interface State {
  style: any;
}

export default class DetailFooter extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.handleOnClickLike = this.handleOnClickLike.bind(this);
    this.handleOnClickShare = this.handleOnClickShare.bind(this);
    this.handleOnClickPortal = this.handleOnClickPortal.bind(this);
  }

  handleOnClickLike() {
    const { state, onClickOpenLockMenu, openInnerNotif } = this.props;
    const { app } = state;
    if (app.openLockMenu !== App.openLockMenuLabelNo) {
      onClickOpenLockMenu(App.openLockMenuLabelNo);
    } else {
      openInnerNotif();
    }
  }

  handleOnClickShare() {
    const { state, onClickOpenLockMenu, openInnerNotif } = this.props;
    const { app } = state;
    if (app.openLockMenu !== App.openLockMenuLabelNo) {
      onClickOpenLockMenu(App.openLockMenuLabelNo);
    } else {
      onClickOpenLockMenu(App.openLockMenuLabelShare);
    }
  }

  handleOnClickPortal() {
    const { app } = this.props.state;
    if (
      app.extensionMode === App.extensionModeExtBottomLabel ||
      app.extensionMode === App.extensionModeExtModalLabel
    ) {
      window.talknWindow.parentTo("linkTo", { href: `https://${conf.wwwURL}` });
    } else {
      location.href = `https://${conf.wwwURL}`;
    }
  }

  render() {
    const { mode, state } = this.props;
    const { app, style } = state;

    if (
      (app.extensionMode === App.extensionModeExtBottomLabel ||
        app.extensionMode === App.extensionModeExtModalLabel) &&
      mode === "default"
    ) {
      return null;
    } else {
      const HeartIcon = Icon.getHeart({}, state);
      const ShareIcon = Icon.getShare({}, state);
      const MoneyIcon = Icon.getMoney({}, state);
      const shareColor =
        state.app.openLockMenu === App.openLockMenuLabelShare
          ? Container.themeRGBA
          : Container.fontBaseRGB;

      return (
        <footer
          data-component-name={"DetailFooter"}
          style={style.detailFooter.self}
        >
          <div
            style={style.detailFooter.childLike}
            onClick={this.handleOnClickLike}
          >
            {HeartIcon}
            <div>LIKE</div>
          </div>
          <div
            style={style.detailFooter.childShare}
            onClick={this.handleOnClickShare}
          >
            {ShareIcon}
            <div style={{ color: shareColor }}>SHARE</div>
          </div>
          <div
            style={style.detailFooter.childMoney}
            onClick={this.handleOnClickPortal}
          >
            {MoneyIcon}
            <div>ABOUT</div>
          </div>
        </footer>
      );
    }
  }
}
