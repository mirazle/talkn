import React, { Component, PropTypes } from "react"
import Posts from './Posts';
import Menu from './Menu/';
import Detail from './Detail';
import Screen from './Screen';
import Icon from './Icon';
import App from 'common/schemas/state/App';

export default class Main extends Component {

  constructor(props) {
    super(props);
    this.handleOnClickHeadTabIcon = this.handleOnClickHeadTabIcon.bind(this);
    this.handleOnClickUserIcon = this.handleOnClickUserIcon.bind(this);
    this.handleOnClickDetailIcon = this.handleOnClickDetailIcon.bind(this);
    this.getAppUpdatedOpenFlgs = this.getAppUpdatedOpenFlgs.bind(this);
  }


  handleOnClickHeadTabIcon( e ){
    const{ app } = this.props.state;
    if( app.isOpenMainPossible ){
      const{ app } = this.props.state;
      app.isOpenMain = app.isOpenMain ? false : true ;
      talknAPI.onClickToggleDispMain( app );
    }
  }

  handleOnClickUserIcon( e ){
    let { app } = this.props.state;
    switch( app.screenMode ){
    case App.screenModeSmallLabel :
      app.isOpenMenu = app.isOpenMenu ? false : true;
      break;
    default:
      app = this.getAppUpdatedOpenFlgs();
      break;
    }
    talknAPI.onClickToggleDispMenu( app );
  }

  handleOnClickDetailIcon( e ){
    let { app } = this.props.state;
    switch( app.screenMode ){
    case App.screenModeSmallLabel :
      app.isOpenDetail = app.isOpenDetail ? false : true;
      break;
    default:
      app = this.getAppUpdatedOpenFlgs();
      break;
    }
    talknAPI.onClickToggleDispDetail( app );
  }

  getAppUpdatedOpenFlgs(){
    const{ app } = this.props.state;
    switch( app.screenMode ){
    case App.screenModeMiddleLabel :
      if( app.isOpenDetail ){
        app.isOpenMenu = true;
        app.isOpenDetail = false;
      }else{
        app.isOpenMenu = false;
        app.isOpenDetail = true;
      }
      break;
    case App.screenModeLargeLabel :
      break;
    }
    return app;
  }

  getHeadTabProps(){
    const { app } = this.props.state;
    return app.isOpenMainPossible ? Icon.getDecolationProps1( 'icon', 'headTab', 'div' ) : {};
  }

 	render() {
		const{ state } = this.props;
    const { app, user, thread, style } = state;

    const { icon } = style;
    const MenuIcon = Icon.getMenu( icon.menu );
    const TalknLogo = Icon.getTalknLogo( icon.talknLogo );
    const HeadTabIcon = Icon.getHeadTab( icon.headTab );
    const DetailIcon = Icon.getDetail( icon.detail );

		return (
      <main style={ style.main.self }>

        {/* Header */}
        <header style={ style.main.header }>

          {/* User Icon */}
          <span style={ style.main.headerMenuIcon } onClick={ this.handleOnClickUserIcon } {...Icon.getDecolationProps1( 'icon', 'menu', 'div' )} >

            { MenuIcon }
{/*
            <span style={ style.main.headerChildTalknLogo }>
              { TalknLogo }
            </span>
*/}
          </span>

          {/* Head Tab Icon */}
          <span style={ style.main.headerHeadTab } onClick={ this.handleOnClickHeadTabIcon } { ...this.getHeadTabProps() } >
            { HeadTabIcon }
          </span>

          {/* Menu Icon */}
          <span style={ style.main.headerDetailIcon } onClick={ this.handleOnClickDetailIcon } {...Icon.getDecolationProps3( 'icon', 'detail', 'div' )} >

            { DetailIcon }

            {/* Watch Cnt */}
            <span style={ style.main.headerChildWatchCnt }>
                {thread.watchCnt}
            </span>
          </span>

        </header>

        {/* Screen */}
        <Screen {...this.props} />

        { app.screenMode === App.screenModeSmallLabel ? <Detail type={'SMALL'} {...this.props} /> : null }
      </main>
		);
 	}
}
