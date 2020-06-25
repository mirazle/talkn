import React from "react";
import TalknComponent from "client/components/TalknComponent";
import Ui from "client/store/Ui";
import MenuUsers from "client/components/Menu/MenuUsers";
import Rank from "client/components/Menu/Rank";
import MenuLogs from "client/components/Menu/MenuLogs";
import MenuSetting from "client/components/Menu/MenuSetting";
import Header from "client/components/Header";
import MenuFooter from "client/components/MenuFooter";
import App from "api/store/App";

interface Props {
  state: any;
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
    const { state, openMenuTransitionEnd } = this.props;
    const { app, ui } = state;

    if (ui.extensionMode !== Ui.extensionModeExtNoneLabel) {
      if (ui.isOpenMenu) {
        openMenuTransitionEnd(window.scrollY);
        window.talknWindow.lockWindow();
      } else {
        window.talknWindow.unlockWindow();
      }
    }
  }

  render() {
    const { style } = this.props.state;
    return (
      <div data-component-name={"Menu"} onTransitionEnd={this.handleOnTransitionEnd} style={style.menu.self}>
        <div data-component-name={"MenuBody"} style={style.menu.body}>
          {this.renderMenuComponent()}
        </div>
        <MenuFooter {...this.props} />
      </div>
    );
  }

  renderMenuComponent() {
    const { ui } = this.props.state;
    let menuComponent;
    switch (ui.menuComponent) {
      case Ui.menuComponentUsersLabel:
        menuComponent = <MenuUsers {...this.props} />;
        break;
      case Ui.menuComponentIndexLabel:
        menuComponent = <Rank {...this.props} />;
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
}
