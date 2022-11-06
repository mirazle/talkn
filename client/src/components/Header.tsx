import React from 'react';

import Ui from 'common/clientState/store/Ui';
import define from 'common/define';

import TalknComponent from 'client/components/TalknComponent';
import Icon from 'client/components/common/Icon';
import LiveCnt from 'client/components/common/LiveCnt';
import Marquee from 'client/container/util/Marquee';

type HeaderProps = {
  state: any;
  handleOnClickToggleDetail?: any;
  handleOnClickToggleMain?: any;
};

type HeaderState = unknown;

const icon = new Icon();

export default class Header extends TalknComponent<HeaderProps, HeaderState> {
  constructor(props) {
    super(props);
    this.componentName = 'Header';
    this.handleOnClickMenuIcon = this.handleOnClickMenuIcon.bind(this);
  }

  handleOnClickMenuIcon(e) {
    const { state } = this.props;
    let { ui, app } = state;
    switch (ui.screenSize) {
      case Ui.screenSizeSmallLabel:
        break;
      default:
        ui = Ui.getUiUpdatedOpenFlgs({ app, ui }, 'headerMenuIcon');
        break;
    }
    this.clientAction('ON_CLICK_TOGGLE_DISP_MENU', { ui });
  }

  render() {
    const { state, handleOnClickToggleMain } = this.props;
    const { style, ui, app, thread } = state;
    const { icon } = style;
    const title = thread.serverMetas['title'] ? thread.serverMetas['title'] : define.APP_NAME;
    const HeadTabIcon = Icon.getHeadTab(icon.headTab, { app, ui });
    return (
      <header data-component-name={this.componentName} style={style.header.self}>
        {/* User Icon */}
        {this.renderLeft()}

        {/* Head Tab Icon */}
        <span data-component-name={'Header-center'} style={style.header.headTab} onClick={handleOnClickToggleMain}>
          <Marquee text={title} loop={true} hoverToStop={false} trailing={0} leading={0} />
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
        {...icon.getDecolationProps1('icon', 'menu', 'div')}>
        {MenuIcon}
      </span>
    );
  }

  renderRight() {
    const { handleOnClickToggleDetail } = this.props;
    const { style, app, ui, thread } = this.props.state;
    const { icon: iconStyle } = style;
    const DetailIcon = Icon.getDetail(iconStyle.detail);
    return (
      <span
        data-component-name={`${this.constructor.name}-right`}
        style={style.header.rightIcon}
        onClick={handleOnClickToggleDetail}
        {...icon.getDecolationProps3('icon', 'detail', 'div')}>
        {DetailIcon}
        <div style={style.header.liveCntWrap}>
          {ui.screenSize === Ui.screenSizeSmallLabel && (
            <LiveCnt number={thread.liveCnt} style={style.liveCnt.self} didMountHighlight={false} />
          )}
        </div>
      </span>
    );
  }
}
