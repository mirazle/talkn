import React, { Component, PropTypes } from "react"
import Posts from './Posts';
import Setting from './Setting';
import Detail from './Detail';
import Icon from './Icon';

export default class Main extends Component {

  constructor(props) {
    super(props);
    this.handleOnClickHeadTabIcon = this.handleOnClickHeadTabIcon.bind(this);
    this.handleOnClickUserIcon = this.handleOnClickUserIcon.bind(this);
    this.handleOnClickDetailIcon = this.handleOnClickDetailIcon.bind(this);
  }

  handleOnClickUserIcon( e ){
    const{ control } = this.props.state;
    const isOpenSetting = control.isOpenSetting ? false : true ;
    talknAPI.onClickDispSetting( isOpenSetting );
  }

  handleOnClickHeadTabIcon( e ){
    const{ control } = this.props.state;
    const isOpenMain = control.isOpenMain ? false : true ;
    talknAPI.onClickToggleDispMain( isOpenMain );
  }

  handleOnClickDetailIcon( e ){
    const{ control } = this.props.state;
    const isOpenDetail = control.isOpenDetail ? false : true ;
    talknAPI.onClickToggleDispDetail( isOpenDetail );
  }

 	render() {
		const{ state } = this.props;
    const { app, user, thread, style } = state;

    const { icon } = style;
    const MenuIcon = Icon.getMenu( icon.menu );
    const HeadTabIcon = Icon.getHeadTab( icon.headTab );
    const DetailIcon = Icon.getDetail( icon.detail );

		return (
      <main style={ style.main.self }>

        {/* Header */}
        <header style={ style.main.header }>

          {/* User Icon */}
          <span style={ style.main.headerUserIcon } onClick={ this.handleOnClickUserIcon }>
            <img style={ style.main.headerUserIconImg } src={'//assets.talkn.io/img/userIcon.png'} />
          </span>

          {/* Head Tab Icon */}
          <span style={ style.main.headerHeadTab } onClick={ this.handleOnClickHeadTabIcon }>
            { HeadTabIcon }
          </span>

          {/* Menu Icon */}
          <span style={ style.main.headerMenuIcon } onClick={ this.handleOnClickDetailIcon }>

            { MenuIcon }

            {/* Watch Cnt */}
            <span style={ style.main.headerChildWatchCnt }>
                {thread.watchCnt}
            </span>
          </span>

        </header>

        {/* Screen */}
        <div style={ style.main.screen }>
          <Setting {...this.props} />
          <Posts {...this.props} />
        </div>

        <Detail {...this.props} />

      </main>
		);
 	}
}
