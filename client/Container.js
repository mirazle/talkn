import React, { Component } from "react"
import { connect } from 'react-redux';
import define from 'common/define';
import App from 'common/schemas/state/App';
import TalknSession from 'client/operations/TalknSession';
import Loading from 'client/components/Loading';
import Style from 'client/components/Style';
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
import Notif from 'client/components/Notif';
import InnerNotif from 'client/components/InnerNotif';
import mapToStateToProps from 'client/mapToStateToProps/';
import IconStyle from 'client/style/Icon';

class Container extends Component {

  componentWillMount(){
    const { state, talknAPI } = this.props;
    const { thread } = state;
    this.state = {
      notifs: [],
    };

    talknAPI.find( thread.connection );
    talknAPI.findMenuIndex( thread.connection );
    this.getProps = this.getProps.bind(this);
    this.renderSmall = this.renderSmall.bind(this);
    this.renderMiddle = this.renderMiddle.bind(this);
    this.renderLarge = this.renderLarge.bind(this);
    this.handleOnClickToggleMain = this.handleOnClickToggleMain.bind(this);
    this.handleOnClickToggleDetail = this.handleOnClickToggleDetail.bind(this);
    this.handleOnClickMultistream = this.handleOnClickMultistream.bind(this);
  }

  componentDidUpdate(){
    const { state, handleOnClickToggleMain, createNotif } = this.props;
    const { actionLog, thread, style } = state;
    let { app } = state;

    switch( actionLog[ 0 ] ){
      case 'SERVER_TO_CLIENT[EMIT]:find':
      talknWindow.threadHeight = document.querySelector("[data-component-name=Posts]").clientHeight;
      break;
    case 'SERVER_TO_CLIENT[BROADCAST]:post':

      talknWindow.threadHeight = document.querySelector("[data-component-name=Posts]").clientHeight;
      if( app.isOpenMain && talknWindow.isScrollBottom ){
        talknWindow.animateScrollTo(
          talknWindow.threadHeight,
          400,
          this.props.endAnimateScrollTo
        );
      }else{
        this.props.openNotifInThread();
      }
      break;
    case 'SERVER_TO_CLIENT[EMIT]:getMore':

      const threadHeight = document.querySelector("[data-component-name=Posts]").clientHeight;
      window.scrollTo(0, threadHeight - talknWindow.threadHeight);
      talknWindow.threadHeight = threadHeight;

      if(thread.isSelfConnection){
        const clientMetas = document.querySelectorAll('meta');
        if( Object.keys( thread.serverMetas ).length !== clientMetas.length ){
          let serverMetas = {};
          for( let i = 0; i < clientMetas.length; i++ ){
            const item = clientMetas[ i ];
            let key = i;
            let content = '';
            if( item.getAttribute('name') ){
              key = item.getAttribute('name');
              content = item.getAttribute('content');
            }else if( item.getAttribute('property') ){
              key = item.getAttribute('property');
              content = item.getAttribute('content');
            }else if( item.getAttribute('chaset') ){
              key = 'charset';
              content = item.getAttribute('chaset');
            }else if( item.getAttribute('http-equiv') ){
              key = item.getAttribute('http-equiv');
              content = item.getAttribute('content');
            }

            if( !serverMetas[ key ] ){
              serverMetas[ key ] = content;
            }
          }
          talknAPI.updateThreadServerMetas(serverMetas);
        }
      }
      break;
    case 'SERVER_TO_CLIENT[EMIT]:changeThread':
      window.scrollTo(0, 9999999);
      break;
    case 'SERVER_TO_CLIENT[EMIT]:changeThreadDetail':
      app = App.getAppUpdatedOpenFlgs({app}, "changeThreadDetail");
      talknAPI.onClickToggleDispDetail( app );
      break;
    case 'OPEN_NOTIF':
      const posts = state[ `posts${app.dispThreadType}` ];
      const lastPost = posts[posts.length - 1];
      if(
        lastPost &&
        app.type === define.APP_TYPES.EXTENSION &&
        !app.isOpenMain
      ){

        createNotif();

        this.setState({
          notifs: this.state.notifs.concat(
            <Notif
              key={lastPost._id}
              app={app}
              style={style}
              thread={thread}
              post={lastPost}
              handleOnClickToggleMain={handleOnClickToggleMain}
            />
          )
        });
      }
      break;
    }
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
    const { style } = state;
    return (
      <div data-component-name="newPost" style={style.container.notif}>
        NEW POST
      </div>
    );
  }
  
  getMultistreamIcon(props){
    const { state} = props;
    const { style, app } = state;
    const ThunderIcon = Icon.getThunder( IconStyle.getThunder(state) );
    if( app.menuComponent === "Index" && app.isRootConnection ){
      return(
        <div
          data-component-name={"multistreamIcon"}
          style={style.container.multistreamIconWrap}
          onClick={this.handleOnClickMultistream}
        >
          { ThunderIcon }
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

  getNotifs(){
    const { style } = this.props.state;
    return (
      <ol data-component-name="Notifs" style={style.notif.notifs}>
        {this.state.notifs}
      </ol>
    );
  }

  renderLarge(){
    const { style } = this.props.state;
    const props = this.getProps();
    const MultistreamIcon = this.getMultistreamIcon( props );
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
    const MultistreamIcon = this.getMultistreamIcon( props );
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
    const MultistreamIcon = this.getMultistreamIcon( props );
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
    const props = this.getProps();
    const MultistreamIcon = this.getMultistreamIcon( props );
    const NewPost = this.getNewPost( props );
    const Notifs = this.getNotifs( props );
    console.log(this.state.notifs);
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
          { Notifs }
        </span>
      </span>
    );
  }

  renderIos(){
    const { style } = this.props.state;
    const props = this.getProps();
    const MultistreamIcon = this.getMultistreamIcon( props );
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
    const MultistreamIcon = this.getMultistreamIcon( props );
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
