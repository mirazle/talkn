import React from "react";
import TalknComponent from "client/components/TalknComponent";
import ClientState from "client/store/";
import Ui from "client/store/Ui";
import MenuUsers from "client/components/Menu/MenuUsers";
import MenuIndex from "client/components/Menu/MenuIndex";
import MenuLogs from "client/components/Menu/MenuLogs";
import MenuSetting from "client/components/Menu/MenuSetting";
import Header from "client/components/Header";
import MenuFooter from "client/components/MenuFooter";

interface Props {
  clientState: ClientState;
  openMenuTransitionEnd?: any;
}

export default class Menuextends extends TalknComponent<Props, {}> {
  constructor(props: Props) {
    super(props);
    this.handleOnClickLoginTwitter = this.handleOnClickLoginTwitter.bind(this);
    this.handleOnClickLoginFacebook = this.handleOnClickLoginFacebook.bind(this);
    this.handleOnTransitionEnd = this.handleOnTransitionEnd.bind(this);
  }

  componentDidMount() {
    this.clientAction("COMPONENT_DID_MOUNTS", { componentDidMounts: "Menu" });
  }

  handleOnClickLoginFacebook() {
    const href = `https://talkn.io:8443/auth/facebook?url=${window.location.href}`;
    location.href = href;
  }

  handleOnClickLoginTwitter() {
    const href = `https://talkn.io:8443/auth/twitter?url=${window.location.href}`;
    location.href = href;
  }

  handleOnTransitionEnd() {
    const { clientState, openMenuTransitionEnd } = this.props;
    const { ui } = clientState;
    if (ui.screenMode === Ui.screenModeSmallLabel) {
      if (ui.isOpenMenu) {
        openMenuTransitionEnd(window.scrollY);
        console.log("MENU INDEX LOCK");
        window.talknWindow.lockWindow();
      }
    }
  }

  render() {
    const { style } = this.props.clientState;
    return (
      <div data-component-name={"Menu"} onTransitionEnd={this.handleOnTransitionEnd} style={style.menu.self}>
        {this.renderHeader()}
        <div data-component-name={"MenuBody"} style={style.menu.wrapComponent}>
          {this.renderMenuComponent()}
        </div>
        {this.renderFooter()}
      </div>
    );
  }
  /*
  renderFriendLiLabel(name, icon, ch) {
    const { style } = this.props.state;
    const href = `/${ch}`;
    const label = ch ? (
      <span style={style.menu.namesAddCh}>
        {name}
        <br />
        {ch}
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
*/
  renderMenuComponent() {
    const { ui } = this.props.clientState;
    let menuComponent;
    switch (ui.menuComponent) {
      case Ui.menuComponentUsersLabel:
        menuComponent = <MenuUsers {...this.props} />;
        break;
      case Ui.menuComponentIndexLabel:
        menuComponent = <MenuIndex {...this.props} />;
        break;
      case Ui.menuComponentLogsLabel:
        menuComponent = <MenuLogs {...this.props} />;
        break;
      case Ui.menuComponentSettingLabel:
        menuComponent = <MenuSetting {...this.props} />;
        break;
    }
    return menuComponent;
  }

  renderHeader() {
    const { ui } = this.props.clientState;

    return ui.extensionMode === Ui.extensionModeExtBottomLabel || ui.extensionMode === Ui.extensionModeExtModalLabel ? (
      <Header {...this.props} />
    ) : null;
  }

  renderFooter() {
    const { ui } = this.props.clientState;
    if (ui.extensionMode === Ui.extensionModeExtBottomLabel || ui.extensionMode === Ui.extensionModeExtModalLabel) {
      return null;
    } else {
      switch (ui.screenMode) {
        case Ui.screenModeSmallLabel:
        case Ui.screenModeMiddleLabel:
        case Ui.screenModeLargeLabel:
          return <MenuFooter {...this.props} />;
      }
    }
  }
}
