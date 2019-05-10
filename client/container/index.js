import React, { Component } from "react"
import { connect } from 'react-redux';
import define from 'common/define';
import App from 'common/schemas/state/App';
import TalknSession from 'client/operations/TalknSession';
import Loading from 'client/components/Loading';
import Style from 'client/components/Style';
import HeaderStyle from 'client/style/Header';
import PostsFooterStyle from 'client/style/PostsFooter';
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
import Icon from 'client/components/Icon';
import InnerNotif from 'client/components/InnerNotif';
import mapToStateToProps from 'client/mapToStateToProps/';
import componentDidUpdates from 'client/container/componentDidUpdates';
import TalknWindow from 'client/operations/TalknWindow';

class Container extends Component {

  constructor(props){
    super(props);
    const { state, talknAPI } = props;
    const { thread } = state;
    this.state = {notifs: []};

    talknAPI.find( thread.connection );
    talknAPI.findMenuIndex( thread.connection );
    this.getProps = this.getProps.bind(this);
    this.getNotifs = this.getNotifs.bind(this);
    this.renderSmall = this.renderSmall.bind(this);
    this.renderMiddle = this.renderMiddle.bind(this);
    this.renderLarge = this.renderLarge.bind(this);
    this.renderExtension = this.renderExtension.bind(this);
    this.handleOnClickToggleMain = this.handleOnClickToggleMain.bind(this);
    this.handleOnClickToggleDetail = this.handleOnClickToggleDetail.bind(this);
    this.handleOnClickMultistream = this.handleOnClickMultistream.bind(this);
  }

  componentDidUpdate(){
    componentDidUpdates( this );
  }

  getProps(){
    return {
      ...this.props,
      componentDidUpdates,
      handleOnClickMultistream: this.handleOnClickMultistream,
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
      this.setState({notifs: []});
      app.isDispMain = app.isDispMain ? false : true;
      app.isOpenNotif = false;
      
      onClickToggleMain( {app} );

      if(app.openLockMenu !== App.openLockMenuLabelNo){
        onClickOpenLockMenu(App.openLockMenuLabelNo);
      }
      talknAPI.extension("toggleIframe");
    }
  }

  handleOnClickMultistream(){
    const { app } = this.props.state;
    let { postsMulti, postsSingle } = this.props.state;
    let findFlg = false;
    const postsMultiCache = TalknSession.getStorage( app.rootConnection, define.storageKey.postsMulti);
    const postsSingleCache = TalknSession.getStorage( app.rootConnection, define.storageKey.postsSingle);
    postsMulti = postsMultiCache && postsMultiCache.length > 0 ? postsMultiCache : postsMulti;
    postsSingle = postsSingleCache && postsSingleCache.length > 0 ? postsSingleCache : postsSingle;

    app.dispThreadType = app.dispThreadType === App.dispThreadTypeMulti ? App.dispThreadTypeSingle : App.dispThreadTypeMulti ;
    app.multistreamed = !( app.dispThreadType === App.dispThreadTypeMulti );
    app.multistream = app.dispThreadType === App.dispThreadTypeMulti;

    if(app.multistream){
      if(postsMulti[0] && postsMulti[0]._id){
        app.offsetFindId = postsMulti[0]._id;
        app.offsetMultiFindId = app.offsetFindId;  
      }else{
        app.offsetFindId = App.defaultOffsetFindId;
        app.offsetMultiFindId = App.defaultOffsetFindId;
        findFlg = true;
      }
    }else{
      if(postsSingle[0] && postsSingle[0]._id){
        app.offsetFindId = postsSingle[0]._id;
        app.offsetSingleFindId = app.offsetFindId;
      }else{
        app.offsetFindId = App.defaultOffsetFindId;
        app.offsetSingleFindId = App.defaultOffsetFindId;
        findFlg = true;
      }
    }

    this.props.onClickMultistream({app, postsMulti, postsSingle});

    if(findFlg){
      talknAPI.find( app.rootConnection );
    }
  }

  getNewPost(props){
    const { state} = props;
    const { style, app } = state;
    const frameHeight = HeaderStyle.headerHeight + PostsFooterStyle.selfHeight;
    const postsFrameHeight = app.height - frameHeight;
    const postsRealHeight = app.postsHeight + frameHeight - TalknWindow.getLastPostHeight();

    if( postsFrameHeight < postsRealHeight ){
      return (
        <div data-component-name="newPost" style={style.container.newPost}>
          NEW POST
        </div>
      );
    }else{
      return null;
    }
  }
  
  getHideScreenBottom(props){
    const { state} = props;
    const { style } = state;
    return(
      <div
        data-component-name={"hideScreenBottom"}
        style={style.container.hideScreenBottom}
      />
    );
  }

  getNotifs(props){
    const { style } = props.state;
    return (
      <ol data-component-name="Notifs" style={style.notif.notifs}>
        {this.state.notifs}
      </ol>
    );
  }

  renderLarge(){
    const { style } = this.props.state;
    const props = this.getProps();
    const MultistreamIcon = Icon.getMultistreamIcon( props );
    const NewPost = this.getNewPost( props );
    const HideScreenBottom = this.getHideScreenBottom( props );
    return (
      <div data-component-name={this.constructor.name} style={ style.container.self }>
        <Style {...props} />
        <Posts {...props} />
        <span data-component-name="fixedComponents">
          { MultistreamIcon }
          { NewPost }
          <Header {...props} />
          <DetailRight {...props} /> 
          <LockMenu {...props} />
          <PostsFooter {...props} />
          <Menu {...props} />
          <InnerNotif {...this.props}/>;
          { HideScreenBottom }
        </span>
      </div>
    );
  }

  renderMiddle(){
    const { style } = this.props.state;
    const props = this.getProps();
    const MultistreamIcon = Icon.getMultistreamIcon( props );
    const NewPost = this.getNewPost( props );
    const HideScreenBottom = this.getHideScreenBottom( props );
    return (
      <div data-component-name={this.constructor.name} style={ style.container.self }>
        <Style {...props} />
        <Posts {...props} />
        <span data-component-name="fixedComponents">
          { MultistreamIcon }
          { NewPost }
          <Header {...props} />
          <DetailModal {...props} /> 
          <PostsFooter {...props} />
          <Menu {...props} />
          <InnerNotif {...this.props}/>
          { HideScreenBottom }
        </span>
      </div>
    );
  }

  renderSmall(){
    const { style } = this.props.state;
    const props = this.getProps();
    const MultistreamIcon = Icon.getMultistreamIcon( props );
    const NewPost = this.getNewPost( props );
    const HideScreenBottom = this.getHideScreenBottom( props );
    return (
      <span data-component-name={this.constructor.name} style={ style.container.self }>
        <Style {...props} />
        <Posts {...props} />
        <span data-component-name="fixedComponents">
          { MultistreamIcon }
          { NewPost }
          <Header {...props} />
          <DetailModal {...props} /> 
          <PostsFooter {...props} />
          <Menu {...props} />
          <InnerNotif {...this.props}/>;
          { HideScreenBottom }
        </span>
      </span>
    );
  }

  renderExtension(){
    const { app, style } = this.props.state;
    const props = this.getProps();
    const MultistreamIcon = Icon.getMultistreamIcon( props );
    const NewPost = this.getNewPost( props );

    // Open
    if( app.isDispMain && app.isOpenMain ){
      console.log("OPEN " + app.isDispMain+ " && " + app.isOpenMain);
      return (
        <span data-component-name={this.constructor.name} style={ style.container.self }>
          <Style {...props} />
          <Posts {...props} />
          <span data-component-name="fixedComponents">
            { MultistreamIcon }
            { NewPost }
            <Header {...props} />
            <DetailModal {...props} /> 
            <PostsFooter {...props} />
            <InnerNotif {...this.props}/>
            </span>
        </span>
      );

    // Opening
    }else if( app.isDispMain ){
      console.log("OPENING " + app.isDispMain+ " && " + app.isOpenMain);
      return (
        <span data-component-name={this.constructor.name} style={ style.container.self }>
          <Style {...props} />
          <Posts {...props} />
          <span data-component-name="fixedComponents">
            { MultistreamIcon }
            <Header {...props} />
            <DetailModal {...props} /> 
            <PostsFooter {...props} />
            </span>
        </span>
      );
    
    // Closing
    }else if( !app.isDispMain && app.isOpenMain ){
      console.log("CLOSING " + app.isDispMain+ " && " + app.isOpenMain);
      return (
        <span data-component-name={this.constructor.name} style={ style.container.self }>
          <Style {...props} />
          <Posts {...props} />
          <span data-component-name="fixedComponents">
            { MultistreamIcon }
            <Header {...props} />
            <DetailModal {...props} /> 
            <PostsFooter {...props} />
            </span>
        </span>
      );

    // Close
    }else if( !app.isDispMain && !app.isOpenMain ){
      console.log("CLOSE " + app.isDispMain+ " && " + app.isOpenMain);
      const Notifs = this.getNotifs( props );
      return (
        <span data-component-name={this.constructor.name} style={ style.container.self }>
          <Style {...props} />
          <span data-component-name="fixedComponents">
            { Notifs }
            <PostsFooter {...props} />
          </span>
        </span>
      );
    }
  }

  renderIos(){
    const { style } = this.props.state;
    const props = this.getProps();
    const MultistreamIcon = Icon.getMultistreamIcon( props );
    const NewPost = this.getNewPost( props );
    return (
      <div data-component-name={this.constructor.name} style={ style.container.self }>
        { MultistreamIcon }
        { NewPost }
        <Style {...props} />
        <Main {...props} />
        <Footer {...props} />
        { HideScreenBottom }
      </div>
    );
  }
  
  renderAndroid(){
    const { style } = this.props.state;
    const props = this.getProps();
    const MultistreamIcon = Icon.getMultistreamIcon( props );
    const NewPost = this.getNewPost( props );
    return (
      <div data-component-name={this.constructor.name} style={ style.container.self }>
        { MultistreamIcon }
        { NewPost }
        <Style {...props} />
        <Main {...props} />
        <Footer {...props} />
        { HideScreenBottom }
      </div>
    );
  }

 	render() {
    const { style, app } = this.props.state;
    if( style && style.container && style.container.self && app.connectioned ){
      if( app.type === define.APP_TYPES.EXTENSION ){
        return this.renderExtension(this);
      } else {
        switch( app.screenMode ){
        case App.screenModeSmallLabel :
          return this.renderSmall(this);
        case App.screenModeMiddleLabel : 
          return this.renderMiddle(this);
        case App.screenModeLargeLabel : 
          return this.renderLarge(this);
        }
      }
    }else{
      return <Loading />;
    }
 	}
}

export default connect(
	mapToStateToProps,
	{...handles, ...callbacks}
)( Container );