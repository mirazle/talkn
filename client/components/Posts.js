import React, { Component } from 'react'
import define from 'common/define';
import App from 'common/schemas/state/App';
import { default as PostsSchems } from 'common/schemas/state/Posts';
import TalknSession from 'client/operations/TalknSession';
import Post from 'client/components/Post';
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
      posts: [],
    };
  }

  componentDidMount(){
    const{ app } = this.props.state;

    if( app.type === define.APP_TYPES.EXTENSION ){
      talknAPI.extension("loadTalkn", this.props.state);
    }
    this.setState({scrollHeight: this.refs.thread.scrollHeight});
    this.animateScrollTo( this.refs.thread, 9999999, 400 );
  }

  componentWillReceiveProps(props){
    const {app, postsMulti, postsSingle, postsChild} = props.state;
    let posts = [];
    switch(app.dispThreadType){
    case App.dispThreadTypeMulti:
      posts = postsMulti;
      break;
    case App.dispThreadTypeSingle:
      posts = postsSingle;
      break;
    case App.dispThreadTypeChild:
      posts = postsChild;
      break;
    case App.dispThreadTypeLogs:
      posts = postsChild;
      break;
    }

    if(this.state.posts !== posts){
      this.setState({...this.state, posts});
    }
  }

  componentDidUpdate(){
    const { thread, postsMulti, postsSingle, actionLog } = this.props.state;
    let { app } = this.props.state;
    switch( actionLog[ 0 ] ){
    case 'SERVER_TO_CLIENT[BROADCAST]:post':
      const { isScrollBottom } = this.state;
      if( app.isOpenMain && isScrollBottom ){
        this.props.startAnimateScrollTo();
      }else{
        const posts = app.dispThreadType === App.dispThreadTypeMulti ? postsMulti : postsSingle;
        const lastPost = posts[ posts.length - 1 ];
        //const childLayerCnt = lastPost.connections.length - thread.connections.length;
        this.props.openNotifInThread();
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
    case 'SERVER_TO_CLIENT[EMIT]:changeThreadDetail':
      app = App.getAppUpdatedOpenFlgs({app}, "changeThreadDetail");
      talknAPI.onClickToggleDispDetail( app );
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

    if( app.isOpenNotifInThread ){
      this.props.closeNotifInThread();
    }

    const { clientHeight, scrollTop, scrollHeight } = e.target;
    const isScrollBottom = ( scrollHeight === ( scrollTop + clientHeight ) );
    this.setState({isScrollBottom});
    this.props.scrollThread();
  }

  handleOnClickGetMore(){
    this.setState({...this.state, scrollHeight: this.refs.thread.scrollHeight});
    talknAPI.getMore();
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

  renderGetMore(){
		const { state } = this.props;
    const { style, thread, app, setting } = state;
    const { getThreadChildrenCnt } = setting.server;
    const posts = PostsSchems.getDispPosts(state);
    const dispPostCnt = posts.length;
    const postCntKey = app.dispThreadType === App.dispThreadTypeMulti ? "multiPostCnt" : "postCnt";
    let isDisp = false;

    if( thread[postCntKey] > getThreadChildrenCnt ){
      if( dispPostCnt < thread[postCntKey] ){
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

  renderPostList(){
		const{ state, talknAPI, timeago } = this.props;
    const{ app, style, thread, threads } = state;
    const posts = state[ `posts${app.dispThreadType}`];
    let postList = [];

    if( Object.keys( posts ).length > 0 ){
      postList = Object.keys( posts ).map( ( index ) => {
        const post = posts[ index ];
        const childLayerCnt = post.layer - thread.layer;
        return (
          <Post
            key={post._id}
            mode={'post'}
            {...post}
            app={app}
            thread={thread}
            threads={threads}
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

 	render() {
    const { style } = this.props.state;
		return (
      <div data-component-name={this.constructor.name} style={ style.posts.self } >
        {this.renderMultistream()}
        <ol data-component-name={'Thread'} ref="thread" onScroll={this.handleOnScroll} style={ style.posts.ol }>
          {this.renderGetMore()}
          {this.renderPostList()}
        </ol>
        <div data-component-name="newPost" style={style.main.notif}>NEW POST</div>
      </div>
		);
 	}
}
