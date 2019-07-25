import React, { Component } from "react"
import { connect } from 'react-redux';
import define from 'common/define';
import App from 'common/schemas/state/App';
import Thread from 'common/schemas/state/Thread';
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
import PostsSupporter from 'client/components/PostsSupporter';
import Footer from 'client/components/Footer';
import DetailRight from 'client/components/DetailRight';
import DetailModal from 'client/components/DetailModal';
import Menu from 'client/components/Menu';
import Board from 'client/components/Board';
import LockMenu from 'client/components/LockMenu';
import Icon from 'client/components/Icon';
import Media from 'client/components/Media/';
import InnerNotif from 'client/components/InnerNotif';
import mapToStateToProps from 'client/mapToStateToProps/';
import componentDidUpdates from 'client/container/componentDidUpdates';
import TalknWindow from 'client/operations/TalknWindow';

class Container extends Component {

  constructor(props){
    super(props);
    const { state, talknAPI } = props;
    const { app, thread } = state;
    this.state = {notifs: []};

    talknAPI.find( thread.connection );
  
    if(
      app.extensionMode === App.extensionModeExtIncludeLabel ||
      app.extensionMode === App.extensionModeExtNoneLabel
    ){
      talknAPI.findMenuIndex( thread.connection );
    }
    this.getProps = this.getProps.bind(this);
    this.getNotifs = this.getNotifs.bind(this);
    this.renderSmall = this.renderSmall.bind(this);
    this.renderMiddle = this.renderMiddle.bind(this);
    this.renderLarge = this.renderLarge.bind(this);
    this.renderExtension = this.renderExtension.bind(this);
    this.handleOnClickFooterIcon = this.handleOnClickFooterIcon.bind(this);
    this.handleOnClickToggleMain = this.handleOnClickToggleMain.bind(this);
    this.handleOnClickToggleDetail = this.handleOnClickToggleDetail.bind(this);
    this.handleOnClickMultistream = this.handleOnClickMultistream.bind(this);
    this.handleOnClickConnection = this.handleOnClickConnection.bind(this);
  }

  componentDidMount(){
    talknAPI.componentDidMounts( "Container" );
  }

  componentDidUpdate(){
    componentDidUpdates( this, "Container" );
  }

  getProps(){
    return {
      ...this.props,
      componentDidUpdates,
      handleOnClickFooterIcon: this.handleOnClickFooterIcon,
      handleOnClickMultistream: this.handleOnClickMultistream,
      handleOnClickToggleMain: this.handleOnClickToggleMain,
      handleOnClickToggleDetail: this.handleOnClickToggleDetail,
      handleOnClickConnection: this.handleOnClickConnection
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
    const {
      onClickToggleMain,
      onClickToggleDispDetail,
      onClickOpenLockMenu,
      closeInnerNotif,
      state
    } = this.props;
    let { app, thread, threadDetail } = state;
    if(
      app.extensionMode === App.extensionModeExtBottomLabel ||
      app.extensionMode === App.extensionModeExtModalLabel
    ){
      //this.setState({notifs: []});
      //app.isOpenNotif = false;

      onClickToggleMain( {app} );

      if(app.isOpenDetail ){
        app.isOpenDetail = false;
        onClickToggleDispDetail( {threadDetail, thread, app} );
      }

      if(app.openLockMenu !== App.openLockMenuLabelNo){
        onClickOpenLockMenu(App.openLockMenuLabelNo);
      }

      talknWindow.parentTo("toggleIframe");
      talknWindow.parentTo("getClientMetas");
    }
  }

  handleOnClickFooterIcon( e ){
    const { toggleDispPostsSupporter } = this.props;
    toggleDispPostsSupporter();
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

  handleOnClickConnection( connection, called = ""){
    const {
      state,
      onClickToTimelineThread,
      onClickToMultiThread,
      onClickToSingleThread,
      onClickToChildThread,
      onClickToLogsThread
    } = this.props;
    let { app, menuIndex, setting } = state;

    let { thread } = state;
    thread.connection = connection;
    const isLinkConnection = app.isLinkConnection;
    const threadStatus = Thread.getStatus( thread, app, setting );
    let { app: updatedApp, stepTo } = App.getStepToDispThreadType( {app, menuIndex}, threadStatus, connection, called );

    if( !isLinkConnection && updatedApp.isLinkConnection ){
      talknAPI.onCatchConnectionAPI( connection );
    }

    if( isLinkConnection && !updatedApp.isLinkConnection ){
      talknAPI.offCatchConnectionAPI( connection );
    }

    app = updatedApp;
    console.log( stepTo );
    switch(stepTo){
    case `${App.dispThreadTypeTimeline} to ${App.dispThreadTypeChild}`:
    case `${App.dispThreadTypeMulti} to ${App.dispThreadTypeChild}`:
    case `${App.dispThreadTypeSingle} to ${App.dispThreadTypeChild}`:
    case `${App.dispThreadTypeChild} to ${App.dispThreadTypeChild}`:
      onClickToChildThread( connection, {app} );
      talknAPI.changeThread( connection );
      break;
    case `${App.dispThreadTypeTimeline} to ${App.dispThreadTypeMulti}`:
    case `${App.dispThreadTypeChild} to ${App.dispThreadTypeMulti}`:
      onClickToMultiThread( connection, {app} );
      talknAPI.changeThread( connection );
      break;
    case `${App.dispThreadTypeTimeline} to ${App.dispThreadTypeSingle}`:
    case `${App.dispThreadTypeChild} to ${App.dispThreadTypeSingle}`:
      onClickToSingleThread( connection, {app} );
      talknAPI.changeThread( connection );
      break;
    case `${App.dispThreadTypeMulti} to ${App.dispThreadTypeTimeline}`:
    case `${App.dispThreadTypeSingle} to ${App.dispThreadTypeTimeline}`:
    case `${App.dispThreadTypeChild} to ${App.dispThreadTypeTimeline}`:
    case `${App.dispThreadTypeTimeline} to ${App.dispThreadTypeTimeline}`:
      onClickToTimelineThread( connection, {app} );
      talknAPI.changeThread( connection );
      break;
    }
  }

  getDebug(props){
    const { state } = props;
    const { app } = state;
    return(
      <div style={{
        position: "fixed",
        top: "60vh",
        right: "3%",
        width: "90%",
        height: "100px",
        background: "rgba(255,255,255, 0.8)",
        border: "1px solid rgba(230, 230, 230, 0.8)",
        borderRadius: "3px",
        "zIndex": 10000000,
        padding: "2%"
      }}>
        <pre>
        {`
          @isOpenPosts: { ${app.isOpenPosts} }
          @height: { ${app.height} } 
          @extensionOpenHeight: { ${app.extensionOpenHeight} } 
        `}
        </pre>
      </div>
    )
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
    const { app, style } = props.state;
    if(
      app.extensionMode === App.extensionModeExtBottomLabel ||
      app.extensionMode === App.extensionModeExtModalLabel
    ){
      if( !app.isOpenPosts && !app.isDispPosts && app.isOpenNotif ){
        return (
          <ol data-component-name="Notifs" style={style.notif.notifs}>
            {this.state.notifs}
          </ol>
        );
      }
    }
    return (
      <ol data-component-name="Notifs" style={style.notif.notifs} />
    );
  }

  renderLarge(){
    const { style } = this.props.state;
    const props = this.getProps();
    const NewPost = this.getNewPost( props );
    const HideScreenBottom = this.getHideScreenBottom( props );
    return (
      <div data-component-name={"Container"} style={ style.container.self }>
        <Style {...props} />
        <Posts {...props} />
        <span data-component-name="fixedComponents">
          <Media {...props} />
          <Board {...props} />
          { NewPost }
          <Header {...props} />
          <PostsSupporter {...props} />
          <DetailRight {...props} /> 
          <LockMenu {...props} />
          <PostsFooter {...props} />
          <Menu {...props} />
          <InnerNotif {...this.props}/>;
          { HideScreenBottom }
{/*

          Youtube
          
          <iframe
            style={{position: "fixed", top: "0px", zIndex: 10000}}
            width="560"
            height="315"
            src="https://www.youtube.com/embed/NOcoQD4bZUw?enablejsapi=1"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen
          />
*/}
        </span>
      </div>
    );
  }

  renderMiddle(){
    const { style } = this.props.state;
    const props = this.getProps();
    const NewPost = this.getNewPost( props );
    const HideScreenBottom = this.getHideScreenBottom( props );
    return (
      <div data-component-name={"Container"} style={ style.container.self }>
        <Style {...props} />
        <Posts {...props} />
        <span data-component-name="fixedComponents">
          <Media {...props} />
          <Board {...props} />
          { NewPost }
          <Header {...props} />
          <PostsSupporter {...props} />
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
    const { style, app } = this.props.state;
    const props = this.getProps();
    const NewPost = this.getNewPost( props );
    const HideScreenBottom = this.getHideScreenBottom( props );
    const Debug = this.getDebug( props );
    return (
      <span data-component-name={"Container"} style={ style.container.self }>
        <Style {...props} />
        <Posts {...props} />
        <span data-component-name="fixedComponents">
          <Media {...props} />
          <Board {...props} />
          { NewPost }
          <Header {...props} />
          <PostsSupporter {...props} />
          <DetailModal {...props} /> 
          <PostsFooter {...props} />
          <Menu {...props} />
          <InnerNotif {...this.props} debug={""} />
          { /*Debug*/ }
          { HideScreenBottom }
        </span>
      </span>
    );
  }

  renderExtension(){
    const { style } = this.props.state;
    const props = this.getProps();
    const NewPost = this.getNewPost( props );
    const extScreenStyle = props.state.style.extScreen.self;
    const Debug = this.getDebug( props );
    return (
      <span data-component-name={"Container"} style={ style.container.self }>
        <Style {...props} />
        <div style={extScreenStyle} data-component-name={"extScreen"}>
          <Posts {...props} />
          <Header {...props} />
          <Media {...props} />
          <Board {...props} />
          { NewPost }
          <PostsSupporter {...props} />
          <DetailModal {...props} /> 
          <InnerNotif {...this.props} />
        </div>
        <span data-component-name="fixedComponents">
          { /* Notifs */}
          <PostsFooter {...props} />
          { /* Debug */ }
        </span>
      </span>
    );
  }

  renderIos(){
    const { style } = this.props.state;
    const props = this.getProps();
    const NewPost = this.getNewPost( props );
    return (
      <div data-component-name={"Container"} style={ style.container.self }>
        { NewPost }
        <Style {...props} />
        <Footer {...props} />
        { HideScreenBottom }
      </div>
    );
  }
  
  renderAndroid(){
    const { style } = this.props.state;
    const props = this.getProps();
    const NewPost = this.getNewPost( props );
    return (
      <div data-component-name={"Container"} style={ style.container.self }>
        { NewPost }
        <Style {...props} />
        <Footer {...props} />
        { HideScreenBottom }
      </div>
    );
  }

 	render() {
    const { style, app, actionLog } = this.props.state;
    if(
        style &&
        style.container &&
        style.container.self &&
        app.connectioned &&
        app.screenMode !== App.screenModeUndispLabel 
    ){
      if( 
        app.extensionMode === App.extensionModeExtBottomLabel ||
        app.extensionMode === App.extensionModeExtModalLabel 
      ){
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
      if(
        app.extensionMode === App.extensionModeExtBottomLabel ||
        app.extensionMode === App.extensionModeExtModalLabel
      ){
        return null;
      }else{
        return <Loading />;
      }
    }
 	}
}

export default connect(
	mapToStateToProps,
	{...handles, ...callbacks}
)( Container );
