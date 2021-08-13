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
    const SocialIcon = Icon.getSvg({ app, ui }, { key: 'social', active: false});
    const RankIcon = Icon.getSvg({ app, ui }, { key: 'rankOn', active: false});
    const LogsIcon = Icon.getSvg({ app, ui }, { key: 'logs', active: false});
    const SettingIcon = Icon.getSvg({ app, ui }, { key: 'setting', active: false});
    return (
      <div data-component-name={this.componentName} style={style.menuFooter.self}>
        <div
          style={style.menuFooter.child}
          onClick={() => this.clientAction("OPEN_INNER_NOTIF")}
          {...icon.getDecolationProps1("icon", "user", "div")}
        >
          {SocialIcon}
          <div>SOCIAL</div>
        </div>
        <div style={style.menuFooter.child} {...icon.getDecolationProps1("icon", "index", "div")}>
          {RankIcon}
          <div style={{ color: Container.themeRGBA, fontWeight: 600 }}>RANK</div>
        </div>
        <div
          style={style.menuFooter.child}
          onClick={() => this.clientAction("OPEN_INNER_NOTIF")}
          {...icon.getDecolationProps1("icon", "logs", "div")}
        >
          {LogsIcon}
          <div>LOGS</div>
        </div>
        <div
          style={style.menuFooter.child}
          onClick={() => this.clientAction("OPEN_INNER_NOTIF")}
          {...icon.getDecolationProps1("icon", "setting", "div")}
        >
          {SettingIcon}
          <div>SETTING</div>
        </div>
      </div>
    );
  }
}
