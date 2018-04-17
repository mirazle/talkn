import React, { Component, PropTypes } from "react"
import Posts from './Posts';
import Menu from './Menu';
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
  }

  handleOnClickUserIcon( e ){
    const{ app } = this.props.state;
    app.isOpenMenu = app.isOpenMenu ? false : true ;
    talknAPI.onClickDispMenu( app );
  }

  handleOnClickHeadTabIcon( e ){
    const{ app } = this.props.state;
    if( app.isOpenMainPossible ){
      const{ app } = this.props.state;
      app.isOpenMain = app.isOpenMain ? false : true ;
      talknAPI.onClickToggleDispMain( app );
    }
  }

  handleOnClickDetailIcon( e ){
    const{ app } = this.props.state;
    app.isOpenDetail = app.isOpenDetail ? false : true ;
    talknAPI.onClickToggleDispDetail( app );
  }


  getHeadTabProps(){
    const { app } = this.props.state;
    return app.isOpenMainPossible ? Icon.getDecolationProps1( 'icon', 'headTab', 'div' ) : {};
  }

 	render() {
		const{ state } = this.props;
    const { app, user, thread, style } = state;

    const { icon } = style;
    const UserIcon = Icon.getUser( icon.user );
    const MenuIcon = Icon.getMenu( icon.menu );
    const HeadTabIcon = Icon.getHeadTab( icon.headTab );
    const DetailIcon = Icon.getDetail( icon.detail );

		return (
      <main style={ style.main.self }>

        {/* Header */}
        <header style={ style.main.header }>

          {/* User Icon */}
          <span style={ style.main.headerUserIcon } onClick={ this.handleOnClickUserIcon } {...Icon.getDecolationProps1( 'icon', 'user', 'div' )} >
            { UserIcon }
          </span>

          {/* Head Tab Icon */}
          <span style={ style.main.headerHeadTab } onClick={ this.handleOnClickHeadTabIcon } { ...this.getHeadTabProps() } >
            { HeadTabIcon }
          </span>

          {/* Menu Icon */}
          <span style={ style.main.headerMenuIcon } onClick={ this.handleOnClickDetailIcon } {...Icon.getDecolationProps1( 'icon', 'menu', 'div' )} >

            { MenuIcon }

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
