import React from "react";
import TalknComponent from "client/components/TalknComponent";
import Container from "client/style/Container";
import Icon from "client/components/common/Icon";

type MenuFooterProps = {
  mode?: string;
  state: any;
}

type MenuFooterState = unknown;

const icon = new Icon();

export default class MenuFooter extends TalknComponent<MenuFooterProps, MenuFooterState> {
  constructor(props) {
    super(props);
    this.componentName = 'MenuFooter';
  }
  static getIndexBackground(): object {
    const background = Container.themeRGBA;
    return {
      top: { background },
      middle: { background },
      bottom: { background },
    };
  }

  render() {
    const { style, app, ui } = this.props.state;
    const UserIcon = Icon.getUser({ app, ui }, {});
    const IndexIcon = Icon.getIndex({ app, ui }, MenuFooter.getIndexBackground());
    const Logs = Icon.getLogs({ app, ui }, {});
    const Setting = Icon.getSetting({ app, ui }, {});
    return (
      <div data-component-name={this.componentName} style={style.menuFooter.self}>
        <div
          style={style.menuFooter.child}
          onClick={() => this.clientAction("OPEN_INNER_NOTIF")}
          {...icon.getDecolationProps1("icon", "user", "div")}
        >
          {UserIcon}
          <div>SOCIAL</div>
        </div>
        <div style={style.menuFooter.child} {...icon.getDecolationProps1("icon", "index", "div")}>
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
