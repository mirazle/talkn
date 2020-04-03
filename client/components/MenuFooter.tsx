import React from "react";
import TalknComponent from "client/components/TalknComponent";
import ClientState from "client/store/";
import Container from "client/style/Container";
import Icon from "client/components/Icon";

interface MenuFooterProps {
  mode?: string;
  clientState: ClientState;
}
const icon = new Icon();

export default class MenuFooter extends TalknComponent<MenuFooterProps, {}> {
  getIndexBackground() {
    const background = Container.themeRGBA;
    return {
      top: { background },
      middle: { background },
      bottom: { background }
    };
  }

  render() {
    const { style } = this.props.clientState;
    const UserIcon = Icon.getUser();
    const IndexIcon = Icon.getIndex(this.getIndexBackground());
    const Logs = Icon.getLogs({});
    const Setting = Icon.getSetting({});
    return (
      <div data-component-name={"MenuFooter"} style={style.menuFooter.self}>
        <div
          style={style.menuFooter.child}
          onClick={() => this.clientAction("OPEN_INNER_NOTIF")}
          {...icon.getDecolationProps1("icon", "user", "div")}
        >
          {UserIcon}
          <div>SOCIAL</div>
        </div>
        <div style={style.menuFooter.childIndex} {...icon.getDecolationProps1("icon", "index", "div")}>
          {IndexIcon}
          <div style={{ color: Container.themeRGBA }}>RANK</div>
        </div>
        <div
          style={style.menuFooter.child}
          onClick={() => this.clientAction("OPEN_INNER_NOTIF")}
          {...icon.getDecolationProps1("icon", "logs", "div")}
        >
          {Logs}
          <div>LOGS</div>
        </div>
        <div
          style={style.menuFooter.child}
          onClick={() => this.clientAction("OPEN_INNER_NOTIF")}
          {...icon.getDecolationProps1("icon", "setting", "div")}
        >
          {Setting}
          <div>SETTING</div>
        </div>
      </div>
    );
  }
}
