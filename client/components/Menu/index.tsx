import React, { Component } from "react";
import App from "common/schemas/state/App";
import MenuUsers from "client/components/Menu/MenuUsers";
import MenuIndex from "client/components/Menu/MenuIndex";
import MenuLogs from "client/components/Menu/MenuLogs";
import MenuSetting from "client/components/Menu/MenuSetting";
import Header from "client/components/Header";
import MenuFooter from "client/components/MenuFooter";

interface Props {
  state: any;
  closeNewPost?: any;
  openMenuTransitionEnd?: any;
}

export default class Menu extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.handleOnClickMultistream = this.handleOnClickMultistream.bind(this);
    this.handleOnClickLoginTwitter = this.handleOnClickLoginTwitter.bind(this);
    this.handleOnClickLoginFacebook = this.handleOnClickLoginFacebook.bind(
      this
    );
    this.handleOnTransitionEnd = this.handleOnTransitionEnd.bind(this);
  }

  componentDidMount() {
    window.talknAPI.componentDidMounts("Menu");
  }

  handleOnClickMultistream() {
    const { app } = this.props.state;
    if (app.isOpenNotif) {
      this.props.closeNewPost();
    }
  }

  handleOnClickLoginFacebook() {
    const { thread } = this.props.state;
    const href = `https://talkn.io:8443/auth/facebook?url=${window.location.href}`;
    location.href = href;
  }

  handleOnClickLoginTwitter() {
    const { thread } = this.props.state;
    const href = `https://talkn.io:8443/auth/twitter?url=${window.location.href}`;
    location.href = href;
  }

  handleOnTransitionEnd() {
    const { state, openMenuTransitionEnd } = this.props;
    const { app } = state;
    if (app.screenMode === App.screenModeSmallLabel) {
      if (app.isOpenMenu) {
        openMenuTransitionEnd(window.scrollY);
        window.talknWindow.lockWindow();
      }
    }
  }

  renderFriendLiLabel(name, icon, connection) {
    const { style } = this.props.state;
    const href = `/${connection}`;
    const label = connection ? (
      <span style={style.menu.namesAddConnection}>
        {name}
        <br />
        {connection}
      </span>
    ) : (
      <span style={style.menu.names}>
        <br />
        {name}
      </span>
    );

    return (
      <a style={style.menu.wrap} href={href}>
        <img style={style.menu.img} src={icon} />
        {label}
      </a>
    );
  }

  renderMenuComponent() {
    const { app } = this.props.state;
    let menuComponent;
    switch (app.menuComponent) {
      case App.menuComponentUsersLabel:
        menuComponent = <MenuUsers {...this.props} />;
        break;
      case App.menuComponentIndexLabel:
        menuComponent = <MenuIndex {...this.props} />;
        break;
      case App.menuComponentLogsLabel:
        menuComponent = <MenuLogs {...this.props} />;
        break;
      case App.menuComponentSettingLabel:
        menuComponent = <MenuSetting {...this.props} />;
        break;
    }
    return menuComponent;
  }

  renderHeader() {
    const { app } = this.props.state;

    return app.extensionMode === App.extensionModeExtBottomLabel ||
      app.extensionMode === App.extensionModeExtModalLabel ? (
      <Header {...this.props} />
    ) : null;
  }

  renderFooter() {
    const { app } = this.props.state;
    if (
      app.extensionMode === App.extensionModeExtBottomLabel ||
      app.extensionMode === App.extensionModeExtModalLabel
    ) {
      return null;
    } else {
      switch (app.screenMode) {
        case App.screenModeSmallLabel:
        case App.screenModeMiddleLabel:
        case App.screenModeLargeLabel:
          return <MenuFooter {...this.props} />;
      }
    }
  }

  render() {
    const { style } = this.props.state;
    return (
      <div
        data-component-name={"Menu"}
        onTransitionEnd={this.handleOnTransitionEnd}
        style={style.menu.self}
      >
        {this.renderHeader()}
        <div data-component-name={"MenuBody"} style={style.menu.wrapComponent}>
          {this.renderMenuComponent()}
        </div>
        {this.renderFooter()}
      </div>
    );
  }
}
