import React from "react";
import TalknComponent from "client/components/TalknComponent";
import ClientState from "client/store/";
import Ui from "client/store/Ui";
import Marquee from "client/container/util/Marquee";
import Icon from "client/components/Icon";

interface HeaderProps {
  state: any;
  handleOnClickToggleDetail?: any;
  handleOnClickToggleMain?: any;
}

const icon = new Icon();
interface HeaderState {}

export default class Header extends TalknComponent<HeaderProps, HeaderState> {
  constructor(props) {
    super(props);
    this.handleOnClickMenuIcon = this.handleOnClickMenuIcon.bind(this);
  }

  handleOnClickMenuIcon(e) {
    const { state } = this.props;
    let { ui, app } = state;
    switch (ui.screenMode) {
      case Ui.screenModeSmallLabel:
        break;
      default:
        ui = Ui.getUiUpdatedOpenFlgs({ app, ui }, "headerMenuIcon");
        break;
    }
    this.clientAction("ON_CLICK_TOGGLE_DISP_MENU", { ui });
  }

  render() {
    const { state, handleOnClickToggleMain } = this.props;
    const { style, ui, app } = state;
    const { icon } = style;
    const HeadTabIcon = Icon.getHeadTab(icon.headTab, { app, ui });
    return (
      <header data-component-name={"Header"} style={style.header.self}>
        {/* User Icon */}
        {this.renderLeft()}

        {/* Head Tab Icon */}
        <span data-component-name={`Header-center`} style={style.header.headTab} onClick={handleOnClickToggleMain}>
          <Marquee text={app.rootTitle} loop={true} hoverToStop={false} trailing={0} leading={0} />
        </span>

        {/* Menu Icon */}
        {this.renderRight()}
      </header>
    );
  }

  renderLeft() {
    const { app, ui, style } = this.props.state;
    const { icon: IconStyle } = style;
    const HeaderUserIcon = Icon.getHeaderUser({ app, ui });
    const MenuIcon = Icon.getMenu(IconStyle.menu);

    return (
      <span
        data-component-name={`${this.constructor.name}-left`}
        style={style.header.leftIcon}
        onClick={this.handleOnClickMenuIcon}
        {...icon.getDecolationProps1("icon", "menu", "div")}
      >
        {MenuIcon}
      </span>
    );
  }

  renderRight() {
    const { handleOnClickToggleDetail } = this.props;
    const { style, app, ui, thread } = this.props.state;
    const { icon: iconStyle } = style;
    const DetailIcon = Icon.getDetail(iconStyle.detail);
    const liveCnt =
      ui.screenMode === Ui.screenModeSmallLabel ? Icon.getLiveCnt({ app, ui }, thread.watchCnt) : undefined;
    return (
      <span
        data-component-name={`${this.constructor.name}-right`}
        style={style.header.rightIcon}
        onClick={handleOnClickToggleDetail}
        {...icon.getDecolationProps3("icon", "detail", "div")}
      >
        {DetailIcon}
        <div style={style.header.liveCntWrap}>{liveCnt}</div>
      </span>
    );
  }
}
