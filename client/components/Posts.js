import React, { Component } from 'react'
import define from 'common/define';
import App from 'common/schemas/state/App';
import { default as PostsSchems } from 'common/schemas/state/Posts';
import Post from 'client/components/Post';

export default class Posts extends Component {

  constructor(props){
    super(props);
    this.handleOnClickGetMore = this.handleOnClickGetMore.bind(this);
    this.animateScrollTo = this.animateScrollTo.bind(this);
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
    case 'SERVER_TO_CLIENT[EMIT]:find':
      talknWindow.threadHeight = document.querySelector("[data-component-name=Posts]").clientHeight;
      break;
    case 'SERVER_TO_CLIENT[BROADCAST]:post':
      console.log(talknWindow.isScrollBottom);
      if( app.isOpenMain && talknWindow.isScrollBottom ){
        console.log("@@@ A");
        this.props.startAnimateScrollTo();
      }else{
        console.log("@@@ B");

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

  handleOnClickGetMore(){
    this.setState({...this.state, scrollHeight: this.refs.thread.scrollHeight});
    talknAPI.getMore();
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
      <ol
        data-component-name={this.constructor.name}
        style={ style.posts.self }
        ref="thread"
        onScroll={this.handleOnScroll}
      >
          {this.renderGetMore()}
          {this.renderPostList()}
      </ol>
    );
 	}
}
