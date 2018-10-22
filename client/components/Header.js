import React, { Component } from "react"
import define from 'common/define';
import App from 'common/schemas/state/App';
import util from 'common/util';
import conf from 'common/conf';
import Icon from 'client/components/Icon';

export default class Header extends Component {

  constructor(props) {
    super(props);
    this.handleOnClickHeadTabIcon = this.handleOnClickHeadTabIcon.bind(this);
    this.handleOnClickUserIcon = this.handleOnClickUserIcon.bind(this);
    this.handleOnClickDetailIcon = this.handleOnClickDetailIcon.bind(this);
    this.handleOnClickIcon = this.handleOnClickIcon.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
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

  handleOnClickIcon( e ){
    const { app } = this.props.state;
    talknAPI.extension("onClickFooterIcon");
    if( app.type ===  define.APP_TYPES.EXTENSION  && app.isOpenMainPossible ){
      const isOpenMain = app.isOpenMain ? false : true ;
      talknAPI.onClickToggleDispMain( isOpenMain );
    }
  }

  handleOnClick( e ){
    if( !App.validInputPost( e.target.value ) ){
      talknAPI.post();
      talknAPI.onChangeInputPost('');
    }
  }

  handleOnChange( e ){
    if( !App.validInputPost( e.target.value ) ){
      talknAPI.onChangeInputPost( e.target.value );
    }
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

  getIconStyle(){
    const { thread, style } = this.props.state;
    const favicon = `//${conf.assetsIconPath}${util.getSaveFaviconName( thread.favicon )}`;
    return thread.favicon ? {...style.footer.icon, backgroundImage: `url(${favicon})` } : style.footer.icon ;
  }

  getIconProps(){
    const { app } = this.props.state;
    return app.isOpenMainPossible ? Icon.getDecolationProps1( 'footer', 'icon' ) : {};
  }

  getHeadTabProps(){
    const { app } = this.props.state;
    return app.isOpenMainPossible ? Icon.getDecolationProps1( 'icon', 'headTab', 'div' ) : {};
  }

  render() {
    const{ state } = this.props;
    const {  thread, style } = state;

    const { icon } = style;
    const MenuIcon = Icon.getMenu( icon.menu );
    const TalknLogo = Icon.getTalknLogo( icon.talknLogo );
    const HeadTabIcon = Icon.getHeadTab( icon.headTab );
    const DetailIcon = Icon.getDetail( icon.detail );
    return (
      <header style={ style.header.self }>

        {/* User Icon */}
        <span style={ style.header.menuIcon } onClick={ this.handleOnClickUserIcon } {...Icon.getDecolationProps1( 'icon', 'menu', 'div' )} >

          { MenuIcon }

        </span>

        {/* Head Tab Icon */}
        <span style={ style.header.headTab } onClick={ this.handleOnClickHeadTabIcon } { ...this.getHeadTabProps() } >
          { HeadTabIcon }
        </span>

        {/* Menu Icon */}
        <span style={ style.header.detailIcon } onClick={ this.handleOnClickDetailIcon } {...Icon.getDecolationProps3( 'icon', 'detail', 'div' )} >

          { DetailIcon }

          {/* Watch Cnt */}
          <span style={ style.header.childAnalyze }>
            <div style={ style.header.childAnalyzeType }>VIEWING</div>
            <div style={ style.header.childAnalyzeCnt }>{thread.watchCnt}</div>
          </span>
        </span>
      </header>
		);
 	}
}
