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
    this.getAppUpdatedOpenFlgs = this.getAppUpdatedOpenFlgs.bind(this);
  }

  handleOnClickHeadTabIcon( e ){
  }

  handleOnClickMenuIcon( e ){

    let { app } = this.props.state;
  
    if(app.type !== define.APP_TYPES.EXTENSION ){
      switch( app.screenMode ){
      case App.screenModeSmallLabel :
        //app.isOpenMenu = app.isOpenMenu ? false : true;
        break;
      default:
        app = this.getAppUpdatedOpenFlgs();
        break;
      }
      talknAPI.onClickToggleDispMenu( app );
    }
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
