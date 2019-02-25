import React, { Component } from "react"
import define from 'common/define';
import App from 'common/schemas/state/App';
import Icon from 'client/components/Icon';

export default class Header extends Component {

  constructor(props) {
    super(props);
    this.handleOnClickHeadTabIcon = this.handleOnClickHeadTabIcon.bind(this);
    this.handleOnClickMenuIcon = this.handleOnClickMenuIcon.bind(this);
    this.handleOnClickDetailIcon = this.handleOnClickDetailIcon.bind(this);
  }

  handleOnClickHeadTabIcon( e ){
  }

  handleOnClickMenuIcon( e ){
    const { state } = this.props;
    let { app } = state;
    if(app.type !== define.APP_TYPES.EXTENSION ){
      switch( app.screenMode ){
      case App.screenModeSmallLabel :
        //app.isOpenMenu = app.isOpenMenu ? false : true;
        break;
      default:
        app = App.getAppUpdatedOpenFlgs(state, "headerMenuIcon");
        break;
      }
      talknAPI.onClickToggleDispMenu( app );
    }
  }

  handleOnClickDetailIcon( e ){
    const { state, onClickOpenLockMenu } = this.props;
    let { app, thread, threadDetail } = state

    if(app.openLockMenu !== App.openLockMenuLabelNo){
      onClickOpenLockMenu(App.openLockMenuLabelNo);
    }else{
      switch( app.screenMode ){
      case App.screenModeSmallLabel :
        app.isOpenDetail = app.isOpenDetail ? false : true;
        break;
      default:
        app = App.getAppUpdatedOpenFlgs(state, "headerDetailIcon");
        break;
      }
  
      if( app.isRootConnection){
        talknAPI.onClickToggleDispDetail( {threadDetail: thread, app} );
      }else{
        talknAPI.onClickToggleDispDetail( {threadDetail, app} );
      }
    }
  }

  renderLeft(){
    const {  app, thread, style } = this.props.state;
    const { icon } = style;
    const MenuIcon = Icon.getMenu( icon.menu );

    if(app.iframe){
      return (

        <span
          data-component-name={`${this.constructor.name}-left`}
          style={ style.header.leftIcon }>
      </span>

      );
    }else{
      return (
        <span
          data-component-name={`${this.constructor.name}-left`}
          style={ style.header.leftIcon }
          onClick={ this.handleOnClickMenuIcon }
          {...Icon.getDecolationProps1( 'icon', 'menu', 'div' )} >
          { MenuIcon }
        </span>
      );
    }
  }

  renderRight(){
    const {  app, thread, style } = this.props.state;
    const { icon } = style;
    const DetailIcon = Icon.getDetail( icon.detail );
    
    if(app.iframe){
      return (
        <span
          data-component-name={`${this.constructor.name}-right`}
          style={ style.header.rightIcon }
          onClick={ this.handleOnClickDetailIcon }
          {...Icon.getDecolationProps3( 'icon', 'detail', 'div' )} >

          { DetailIcon }

          {/* Watch Cnt */}
          <span style={ style.header.childAnalyze }>
            <div style={ style.header.childAnalyzeType }>LIVE</div>
            <div style={ style.header.childAnalyzeCnt }>{thread.watchCnt}</div>
          </span>
        </span>
      );
    }else{
      return (
        <span
          data-component-name={`${this.constructor.name}-right`}
          style={ style.header.rightIcon }
          onClick={ this.handleOnClickDetailIcon }
          {...Icon.getDecolationProps3( 'icon', 'detail', 'div' )} >

          { DetailIcon }

          {/* Watch Cnt */}
          <span style={ style.header.childAnalyze }>
            <div style={ style.header.childAnalyzeType }>LIVE</div>
            <div style={ style.header.childAnalyzeCnt }>{thread.watchCnt}</div>
          </span>
        </span>
      );
    }
  }

  render() {
    const{ state } = this.props;
    const {  thread, style } = state;
    const { icon } = style;
    const HeadTabIcon = Icon.getHeadTab( icon.headTab );
    return (
      <header data-component-name={this.constructor.name} style={ style.header.self }>

        {/* User Icon */}
        {this.renderLeft()}

        {/* Head Tab Icon */}
        <span
          data-component-name={`${this.constructor.name}-center`}
          style={ style.header.headTab }
          onClick={ this.handleOnClickHeadTabIcon }>
          { HeadTabIcon }
        </span>

        {/* Menu Icon */}
        {this.renderRight()}
      </header>
		);
 	}
}
