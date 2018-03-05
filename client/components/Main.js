import React, { Component, PropTypes } from "react"
import Posts from './Posts';
import Icon from './Icon';

export default class Main extends Component {

  constructor(props) {
    super(props);
    this.handleOnClickIcon = this.handleOnClickIcon.bind(this);
  }

  handleOnClickIcon( e ){
    const{ user } = this.props.state;
    this.props.onClickToggleDispThread( !user.isOpenThread );
  }

 	render() {
		const{ state, talknAPI } = this.props;
    const { app, user, thread, style } = state;
    const MenuIcon = Icon.getMenu();
    const HeadTabIcon = Icon.getHeadTab();
		return (
      <main style={ style.thread.self }>
        <header style={ style.thread.header }>
          <div style={ style.thread.headerChildLeft }>
            <img style={ style.thread.headerChildUserIcon } src={'//assets.talkn.io/img/userIcon.png'} />
            <span style={ style.thread.headerChildWatchCnt }>({thread.watchCnt})</span>
          </div>
          <div
            style={ style.thread.headerChild }
            onClick={this.handleOnClickIcon}
            >
            { HeadTabIcon }
          </div>
          <div style={ style.thread.headerChild }>{ MenuIcon }</div>
        </header>

        <ol style={ style.main.screen }>
          <Posts {...this.props} />
        </ol>
      </main>
		);
 	}
}
