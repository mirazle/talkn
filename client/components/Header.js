import React, { Component } from "react"
import define from 'common/define';
import App from 'common/schemas/state/App';
import Icon from 'client/components/Icon';

export default class Header extends Component {

  constructor(props) {
    super(props);
    this.handleOnClickMenuIcon = this.handleOnClickMenuIcon.bind(this);
  }

  handleOnClickMenuIcon( e ){
    const { state } = this.props;
    let { app } = state;
    if(app.extensionMode === "NONE" ){
      switch( app.screenMode ){
      case App.screenModeSmallLabel :
        break;
      default:
        app = App.getAppUpdatedOpenFlgs(state, "headerMenuIcon");
        break;
      }
      talknAPI.onClickToggleDispMenu( app );
    }
  }

  renderWatchCntComponent(){
    const { thread, style } = this.props.state;
    return (
      <span
        data-component-name={"Header-WatchCnt"}
        style={ style.header.childAnalyzeWrap }
      >
        <div style={ style.header.childAnalyzeType }>LIVE</div>
        <div style={ style.header.childAnalyzeCnt }>{thread.watchCnt}</div>
      </span>
    );
  }

  renderLeft(){
    const { openInnerNotif, state } = this.props;
    const {  app, style } = state;
    const { icon } = style;
    const HeaderUserIcon = Icon.getHeaderUser( );
    const MenuIcon = Icon.getMenu( icon.menu );
    if(
      app.extensionMode === App.extensionModeExtBottomLabel ||
      app.extensionMode === App.extensionModeExtModalLabel 
    ){
      return (
        <span
          data-component-name={`Header-left`}
          style={ style.header.leftIcon }
          onClick={() => openInnerNotif()}
          {...Icon.getDecolationProps3( 'icon', 'headerUser', 'div' )} 
        >
        { HeaderUserIcon }
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
    const { handleOnClickToggleDetail } = this.props;
    const {  app, thread, style } = this.props.state;
    const { icon } = style;
    const DetailIcon = Icon.getDetail( icon.detail );
    return (
      <span
        data-component-name={`${this.constructor.name}-right`}
        style={ style.header.rightIcon }
        onClick={ handleOnClickToggleDetail }
        {...Icon.getDecolationProps3( 'icon', 'detail', 'div' )} >

        { DetailIcon }

        {/* Watch Cnt */}
        {this.renderWatchCntComponent()}
      </span>
    );
  }

  render() {
    const{ state, handleOnClickToggleMain } = this.props;
    const { style, app } = state;
    const { icon } = style;
    const HeadTabIcon = Icon.getHeadTab( icon.headTab );

    return (
      <header data-component-name={"Header"} style={ style.header.self }>

        {/* User Icon */}
        {this.renderLeft()}

        {/* Head Tab Icon */}
        <span
          data-component-name={`Header-center`}
          style={ style.header.headTab }
          onClick={ handleOnClickToggleMain }>
          { HeadTabIcon }
        </span>

        {/* Menu Icon */}
        {this.renderRight()}
      </header>
    );
 	}
}
