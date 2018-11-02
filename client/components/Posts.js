import React, { Component } from 'react'
import define from 'common/define';
import PostSchema from 'common/schemas/state/Post';
import App from 'common/schemas/state/App';
import TalknSession from 'client/operations/TalknSession';
import Post from 'client/components/Post';
import Header from './Header';
import PostsFooter from './PostsFooter';
import Detail from './Detail';
import IconStyle from 'client/style/Icon';
import Icon from './Icon';

export default class Posts extends Component {

  constructor(props){
    super(props);
    this.handleOnScroll = this.handleOnScroll.bind(this);
    this.handleOnClickGetMore = this.handleOnClickGetMore.bind(this);
    this.animateScrollTo = this.animateScrollTo.bind(this);
    this.handleOnClickMultistream = this.handleOnClickMultistream.bind(this);
    this.state = {
      scrollHeight: 0,
      isAnimateScrolling: false,
      isScrollBottom: true,
    };
  }

  componentDidMount(){
    this.setState({scrollHeight: this.refs.thread.scrollHeight});
    this.animateScrollTo( this.refs.thread, 9999999, 400 );
  }

  componentDidUpdate(){
    const { posts, thread, app, actionLog } = this.props.state;
    switch( actionLog[ 0 ] ){
    case 'SERVER_TO_CLIENT[BROADCAST]:post':
      const { isScrollBottom } = this.state;
      if( isScrollBottom ){
        this.props.startAnimateScrollTo();
      }else{
        const lastPost = posts[ posts.length - 1 ];
        const childLayerCnt = lastPost.connections.length - thread.connections.length;
        this.props.openNotif();
      }
      break;
    case 'SERVER_TO_CLIENT[EMIT]:getMore':

      this.refs.thread.scrollTop = this.refs.thread.scrollHeight - this.state.scrollHeight;

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
      this.animateScrollTo( this.refs.thread, 9999999, 400 );
      break;
    case 'START_ANIMATE_SCROLL_TO':
      this.animateScrollTo(
        this.refs.thread,
        this.refs.thread.scrollHeight,
        400,
        this.props.endAnimateScrollTo
      );
      break;
    default:
      break;
    }
  }

  animateScrollTo( element, to, duration, callback = ()=>{}) {
    if( !this.state.isAnimateScrolling ){
      let start = element.scrollTop;
      let change = to - start;
      let currentTime = 0;
      let increment = 20;

      const animateScroll = ()　=>　{
        currentTime += increment;
        let scrollTop = Math.easeInOutQuad(currentTime, start, change, duration);
        element.scrollTop = scrollTop;
        if(currentTime < duration){
          this.setState({isAnimateScrolling: true});
          setTimeout(animateScroll, increment);
        }else{
          this.setState({isAnimateScrolling: false});
          callback();
        }
      };
      animateScroll();
    }
  }

  handleOnScroll( e ){
		const{ app } = this.props.state;

    if( app.isOpenNotif ){
      this.props.closeNotif();
    }

    const { clientHeight, scrollTop, scrollHeight } = e.target;
    const isScrollBottom = ( scrollHeight === ( scrollTop + clientHeight ) );
    this.setState({isScrollBottom});
    this.props.scrollThread();
  }

  handleOnClickGetMore(){
    const{ thread } = this.props.state;
    this.setState({scrollHeight: this.refs.thread.scrollHeight});
    talknAPI.getMore();
  }

  handleOnClickMultistream(){
    const { updateUser, updateSetting, updatePosts, state} = this.props;
    const { app, setting, user, thread } = state;
    const { storageKey } = define;

    setting.multistream = !setting.multistream;

    const rootConnection = app.rootConnection;
    const getPostKey = setting.multistream ? storageKey.postMulti : storageKey.postSingle ;
    const cachePosts = TalknSession.getStorage( rootConnection, storageKey[ getPostKey ] );
    const posts = cachePosts ? cachePosts : new PostSchema();
    const postLength = posts.length;
    const existPost = posts.length > 0 ;

    // stateを更新
    user.offsetFindId = existPost ? posts[ postLength - 1 ]._id : PostSchema.defaultFindId; 

    updateUser( "offsetFindId", user );
    updateSetting( "multistream", setting );
    updatePosts( posts );

    talknAPI.find(thread.connection);
  }

  renderGetMore(){
		const { state } = this.props;
    const { style, posts, thread, setting } = state;
    const { getThreadChildrenCnt } = setting.server;
    const dispPostCnt = Object.keys( posts ).length;
    let isDisp = false;

    if( thread.postCnt > getThreadChildrenCnt ){
      if( dispPostCnt < thread.postCnt ){
        isDisp = true;
      }
    }

    if( isDisp ){
      return (
        <li style={style.posts.more} onClick={this.handleOnClickGetMore}>
          GET MORE
        </li>
      )
    }
    return null;
  }

  renderMultistream(){
    const { setting, style, app, thread } = this.props.state;
    const ThunderIcon = Icon.getThunder( IconStyle.getThunder({setting, app}) );

    if( app.menuComponent === "Index" && thread.connection === app.rootConnection ){
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

  renderPostList(){
		const{ state, talknAPI, timeago } = this.props;
    const{ style, thread, posts } = state;
    let postList = [];
    
    if( Object.keys( posts ).length > 0 ){
      postList = Object.keys( posts ).map( ( index ) => {
        const post = posts[ index ];
        const childLayerCnt = post.connections.length - thread.connections.length;

        return (
          <Post
            key={post._id}
            {...post}
            thread={thread}
            childLayerCnt={childLayerCnt}
            style={style.post}
            talknAPI={talknAPI}
            timeago={timeago}
          />
        )
      });
    }
    return postList;
  }

  renderHeader(){
    const{ app } = this.props.state;
    return app.type === define.APP_TYPES.EXTENSION ?
      <Header {...this.props} /> : null;
  }

  renderDetail(){
    const { app } = this.props.state;
    return app.screenMode === App.screenModeSmallLabel ?  
      <Detail type={'SMALL'} {...this.props} /> : null ;
  }

  renderFooter(){
    const { app } = this.props.state;
    if( app.type ===  define.APP_TYPES.EXTENSION){
      return null;
    }else{
      switch( app.screenMode ){
      case App.screenModeSmallLabel :
        return <PostsFooter {...this.props} />;
      case App.screenModeMiddleLabel : 
      case App.screenModeLargeLabel : 
        return null;
      }
    }
  }

 	render() {
    const { style } = this.props.state;

		return (
      <div data-component-name={this.constructor.name} style={ style.posts.self } >
        {this.renderHeader()}
        {this.renderMultistream()}
        <ol ref="thread" onScroll={this.handleOnScroll} style={ style.posts.ol }>
          {this.renderGetMore()}
          {this.renderPostList()}
        </ol>
        {this.renderDetail()}
        {this.renderFooter()}

        <div data-component-name="newPost" style={style.main.notif}>NEW POST</div>
      </div>
		);
 	}
}
