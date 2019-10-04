import React, { Component } from "react";
import Container from "client/style/Container";
import Icon from "client/components/Icon";

interface Props {
  mode?: string;
  state: any;
  openInnerNotif?: any;
}

export default class MenuFooter extends Component<Props> {
  getIndexBackground() {
    const background = Container.themeRGBA;
    return {
      top: { background },
      middle: { background },
      bottom: { background }
    };
  }

  render() {
    const { openInnerNotif } = this.props;
    const { style } = this.props.state;
    const UserIcon = Icon.getUser();
    const IndexIcon = Icon.getIndex(this.getIndexBackground());
    const Logs = Icon.getLogs({});
    const Setting = Icon.getSetting({});
    return (
      <div data-component-name={"MenuFooter"} style={style.menuFooter.self}>
        <div
          style={style.menuFooter.child}
          onClick={() => openInnerNotif()}
          {...Icon.getDecolationProps1("icon", "user", "div")}
        >
          {UserIcon}
          <div>SOCIAL</div>
        </div>
        <div
          style={style.menuFooter.childIndex}
          {...Icon.getDecolationProps1("icon", "index", "div")}
        >
          {IndexIcon}
          <div style={{ color: Container.themeRGBA }}>RANK</div>
        </div>
        <div
          style={style.menuFooter.child}
          onClick={() => openInnerNotif()}
          {...Icon.getDecolationProps1("icon", "logs", "div")}
        >
          {Logs}
          <div>LOGS</div>
        </div>
        <div
          style={style.menuFooter.child}
          onClick={() => openInnerNotif()}
          {...Icon.getDecolationProps1("icon", "setting", "div")}
        >
          {Setting}
          <div>SETTING</div>
        </div>
      </div>
    );
  }
}
