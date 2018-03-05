import React, { Component, PropTypes } from "react"
import Posts from './Posts';
import Setting from './Setting';
import Icon from './Icon';

export default class Main extends Component {

  constructor(props) {
    super(props);
    this.handleOnClickHeadTabIcon = this.handleOnClickHeadTabIcon.bind(this);
    this.handleOnClickUserIcon = this.handleOnClickUserIcon.bind(this);
  }

  handleOnClickUserIcon( e ){
    const{ user } = this.props.state;
    const isOpenSetting = user.isOpenSetting ? false : true ;
    this.props.handleOnClickDispSetting( isOpenSetting );
  }

  handleOnClickHeadTabIcon( e ){
    const{ user } = this.props.state;
    const isOpenMain = user.isOpenMain ? false : true ;
    this.props.onClickToggleDispMain( isOpenMain );
  }

 	render() {
		const{ state, talknAPI } = this.props;
    const { app, user, thread, style } = state;

    const { icon } = style;
    const MenuIcon = Icon.getMenu( icon.menu );
    const HeadTabIcon = Icon.getHeadTab( icon.headTab );

		return (
      <main style={ style.thread.self }>
        <header style={ style.thread.header }>
          <div
            style={ style.thread.headerChildLeft }
            onClick={this.handleOnClickUserIcon}
          >
            <img style={ style.thread.headerChildUserIcon } src={'//assets.talkn.io/img/userIcon.png'} />
            <span style={ style.thread.headerChildWatchCnt }>({thread.watchCnt})</span>
          </div>
          <div
            style={ style.thread.headerChild }
            onClick={this.handleOnClickHeadTabIcon}
          >
            { HeadTabIcon }
          </div>
          <div style={ style.thread.headerChild }>
            { MenuIcon }
          </div>
        </header>

        <div style={ style.main.screen }>
          <Setting {...this.props} />
          <Posts {...this.props} />
        </div>
      </main>
		);
 	}
}
