import React from "react";
import TalknComponent from "client/components/TalknComponent";
import ClientState from "client/store/";
import Ui from "client/store/Ui";
import Marquee from "client/container/util/Marquee";
import Icon from "client/components/Icon";

interface HeaderProps {
  clientState: ClientState;
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
    const { clientState } = this.props;
    let { app } = this.apiState;
    let { ui } = clientState;
    if (ui.extensionMode === "NONE") {
      switch (ui.screenMode) {
        case Ui.screenModeSmallLabel:
          break;
        default:
          ui = Ui.getUiUpdatedOpenFlgs({ app, ui }, "headerMenuIcon");
          break;
      }
      this.clientAction("ON_CLICK_TOGGLE_DISP_MENU", { ui });
    }
  }

  render() {
    const { clientState, handleOnClickToggleMain } = this.props;
    const { app } = this.apiState;
    const { style, ui } = clientState;
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
    const { clientState } = this.props;
    const { ui, style } = clientState;
    const { icon: IconStyle } = style;
    const HeaderUserIcon = Icon.getHeaderUser();
    const MenuIcon = Icon.getMenu(IconStyle.menu);
    if (
      ui.extensionMode === Ui.extensionModeExtBottomLabel ||
      ui.extensionMode === Ui.extensionModeExtModalLabel ||
      ui.extensionMode === Ui.extensionModeExtIncludeLabel
    ) {
      return (
        <span
          data-component-name={`Header-left`}
          style={style.header.leftIcon}
          onClick={() => this.clientAction("OPEN_INNER_NOTIF")}
          {...icon.getDecolationProps3("icon", "headerUser", "div")}
        >
          {HeaderUserIcon}
        </span>
      );
    } else {
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
  }

  renderRight() {
    const { handleOnClickToggleDetail } = this.props;
    const { style } = this.props.clientState;
    const { icon: iconStyle } = style;
    const DetailIcon = Icon.getDetail(iconStyle.detail);
    return (
      <span
        data-component-name={`${this.constructor.name}-right`}
        style={style.header.rightIcon}
        onClick={handleOnClickToggleDetail}
        {...icon.getDecolationProps3("icon", "detail", "div")}
      >
        {DetailIcon}

        {/* Watch Cnt */}
        {this.renderWatchCntComponent()}
      </span>
    );
  }

  renderWatchCntComponent() {
    const { thread } = this.apiState;
    const { style } = this.props.clientState;
    return (
      <span data-component-name={"Header-WatchCnt"} style={style.header.childAnalyzeWrap}>
        <div style={style.header.childAnalyzeType}>LIVE</div>
        <div style={style.header.childAnalyzeCnt}>{thread.watchCnt}</div>
      </span>
    );
  }
}
