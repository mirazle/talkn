import React, { Component } from "react"
import { connect } from 'react-redux';
import define from 'common/define';
import App from 'common/schemas/state/App';
import Loading from 'client/components/Loading';
import Style from 'client/components/Style';
import Main from 'client/components/Main';
import Posts from 'client/components/Posts';
import handles from 'client/actions/handles';
import callbacks from 'client/actions/callbacks';
import Header from 'client/components/Header';
import PostsFooter from 'client/components/PostsFooter';
import Footer from 'client/components/Footer';
import mapToStateToProps from 'client/mapToStateToProps/';
import { timingSafeEqual } from "crypto";

class Container extends Component {

  componentWillMount(){
    const { state, talknAPI } = this.props;
    const { thread } = state;
    talknAPI.find( thread.connection );
    talknAPI.findMenuIndex( thread.connection );
    this.getProps = this.getProps.bind(this);
    this.renderSmall = this.renderSmall.bind(this);
    this.renderMiddle = this.renderMiddle.bind(this);
    this.renderLarge = this.renderLarge.bind(this);
    this.handleOnClickToggleMain = this.handleOnClickToggleMain.bind(this);
    this.handleOnClickToggleDetail = this.handleOnClickToggleDetail.bind(this);
  }

  getProps(){
    return {
      ...this.props,
      handleOnClickToggleMain: this.handleOnClickToggleMain,
      handleOnClickToggleDetail: this.handleOnClickToggleDetail
    }
  }

  handleOnClickToggleDetail( e ){
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

  handleOnClickToggleMain( e ){
    const { onClickToggleMain, onClickOpenLockMenu, state} = this.props;
    const { app } = state;

    if( app.type ===  define.APP_TYPES.EXTENSION ){
      app.isOpenMain = app.isOpenMain ? false : true;
      app.isOpenNotif = false;
      
      onClickToggleMain( {app} );

      if(app.openLockMenu !== App.openLockMenuLabelNo){
        onClickOpenLockMenu(App.openLockMenuLabelNo);
      }
      talknAPI.extension("toggleIframe");
    }
  }

  renderMultistream(){
    const { state} = this.props;
    const { style, app, thread } = state;
    const ThunderIcon = Icon.getThunder( IconStyle.getThunder(state) );
    if( app.menuComponent === "Index" && app.isRootConnection ){
      return(
        <div
          style={style.posts.multistreamIconWrap}
          onClick={this.handleOnClickMultistream}
        >
          { ThunderIcon }
        </div>
      );
    }else{
      return null;
    }
  }

  renderLarge(){
    const { style } = this.props.state;
    return (
      <div data-component-type={this.constructor.name} style={ style.container.self }>
        <Style {...this.getProps()} />
        <Main {...this.getProps()} />
        <Footer {...this.getProps()} />
      </div>
    );
  }

  renderMiddle(){
    const { style } = this.props.state;
    return (
      <div data-component-type={this.constructor.name} style={ style.container.self }>
        <Style {...this.getProps()} />
        <Main {...this.getProps()} />
        <Footer {...this.getProps()} />
      </div>
    );
  }

  renderSmall(){
    const { style } = this.props.state;
    const props = this.getProps();
    return (
        <span>
          <Posts {...props} />
        </span>
    );
  }

  renderExtension(){
    const { style } = this.props.state;
    return (
      <div data-component-type={this.constructor.name} style={ style.container.self }>
        <Style {...this.getProps()} />
        <Main {...this.getProps()} />
        <Footer {...this.getProps()} />
      </div>
    );
  }

  renderIos(){
    const { style } = this.props.state;
    return (
      <div data-component-type={this.constructor.name} style={ style.container.self }>
        <Style {...this.getProps()} />
        <Main {...this.getProps()} />
        <Footer {...this.getProps()} />
      </div>
    );
  }
  
  renderAndroid(){
    const { style } = this.props.state;
    return (
      <div data-component-type={this.constructor.name} style={ style.container.self }>
        <Style {...this.getProps()} />
        <Main {...this.getProps()} />
        <Footer {...this.getProps()} />
      </div>
    );
  }

 	render() {
    const { style, app } = this.props.state;
    if( style && style.container && style.container.self && app.connectioned ){
      switch( app.screenMode ){
      case App.screenModeSmallLabel :
        return this.renderSmall(this);
      case App.screenModeMiddleLabel : 
        return this.renderMiddle(this);
      case App.screenModeLargeLabel : 
        return this.renderLarge(this);
      }
    }else{
      return <Loading />;
    }
 	}
}

export default connect(
	mapToStateToProps,
	{...handles, ...callbacks}
)( Container )
