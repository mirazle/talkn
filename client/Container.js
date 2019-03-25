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
import DetailRight from 'client/components/DetailRight';
import DetailModal from 'client/components/DetailModal';
import Menu from 'client/components/Menu';
import LockMenu from 'client/components/LockMenu';
import InnerNotif from 'client/components/InnerNotif';
import mapToStateToProps from 'client/mapToStateToProps/';

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
      app = App.getAppUpdatedOpenFlgs(state, "headerDetailIcon");
      talknAPI.onClickToggleDispDetail( {threadDetail, thread, app} );
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
    const props = this.getProps();
    return (
      <div data-component-type={this.constructor.name} style={ style.container.self }>
        <Style {...props} />
        <Posts {...props} />
        <span data-component-name="fixedComponents">
          <Header {...props} />
          <DetailRight {...props} /> 
          <LockMenu {...props} />
          <PostsFooter {...props} />
          <Menu {...props} />
          <InnerNotif {...this.props}/>;
        </span>
      </div>
    );
  }

  renderMiddle(){
    const { style } = this.props.state;
    const props = this.getProps();
    return (
      <div data-component-type={this.constructor.name} style={ style.container.self }>
        <Style {...props} />
        <Posts {...props} />
        <span data-component-name="fixedComponents">
          <Header {...props} />
          <DetailModal {...props} /> 
          <PostsFooter {...props} />
          <Menu {...props} />
          <InnerNotif {...this.props}/>
        </span>
      </div>
    );
  }

  renderSmall(){
    const { style } = this.props.state;
    const props = this.getProps();
    return (
      <span data-component-type={this.constructor.name} style={ style.container.self }>
        <Style {...props} />
        <Posts {...props} />
        <span data-component-name="fixedComponents">
          <Header {...props} />
          <DetailModal {...props} /> 
          <PostsFooter {...props} />
          <Menu {...props} />
          <InnerNotif {...this.props}/>;
        </span>
      </span>
    );
  }

  renderExtension(){
    const { style } = this.props.state;
    const props = this.getProps();
    return (
      <div data-component-type={this.constructor.name} style={ style.container.self }>
        <Style {...props} />
        <Main {...props} />
        <Footer {...props} />
      </div>
    );
  }

  renderIos(){
    const { style } = this.props.state;
    const props = this.getProps();
    return (
      <div data-component-type={this.constructor.name} style={ style.container.self }>
        <Style {...props} />
        <Main {...props} />
        <Footer {...props} />
      </div>
    );
  }
  
  renderAndroid(){
    const { style } = this.props.state;
    const props = this.getProps();
    return (
      <div data-component-type={this.constructor.name} style={ style.container.self }>
        <Style {...props} />
        <Main {...props} />
        <Footer {...props} />
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
