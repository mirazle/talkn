import React, { Component } from 'react'
import conf from 'common/conf';
import App from 'common/schemas/state/App';
import { default as PostsSchems } from 'common/schemas/state/Posts';
import Post from 'client/components/Post';

export default class Posts extends Component {

  constructor(props){
    super(props);
    this.handleOnMouseDown = this.handleOnMouseDown.bind(this);
    this.handleOnScroll = this.handleOnScroll.bind(this);
    this.handleOnClickGetMore = this.handleOnClickGetMore.bind(this);
    this.state = {
      scrollHeight: 0,
      isAnimateScrolling: false,
      isScrollBottom: true,
      posts: [],
    };
  }

  componentDidMount(){
      const{ app } = this.props.state;
      if(
        app.extensionMode === App.extensionModeExtBottomLabel ||
        app.extensionMode === App.extensionModeExtIncludeLabel ||
        app.extensionMode === App.extensionModeExtModalLabel 
      ){
        this.setState({scrollHeight: this.refs.thread.scrollHeight});
        this.animateScrollTo( this.refs.thread, 9999999, 400 );
      }else{
        //talknWindow.threadHeight = document.querySelector("[data-component-name=Posts]").clientHeight;
        //talknWindow.animateScrollTo( talknWindow.threadHeight, 0 );
        talknWindow.animateScrollTo( 99999999, 0 );
      }
      talknAPI.componentDidMounts( "Posts" );
  }

  componentWillReceiveProps(props){
    const {app, postsTimeline, postsMulti, postsSingle, postsChild} = props.state;
    let posts = [];
    switch(app.dispThreadType){
    case App.dispThreadTypeTimeline:
      posts = postsTimeline;
      break;
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
    this.props.componentDidUpdates( this, "Posts" );
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

  handleOnMouseDown(){
    const{ app } = this.props.state;
    if(
      app.extensionMode === App.extensionModeExtBottomLabel ||
      app.extensionMode === App.extensionModeExtModalLabel 
    ){
//      this.refs.thread.scrollTop = this.refs.thread.scrollTop + 1;
    }
  }

  handleOnScroll( e ){
		const{ app } = this.props.state;
    if( app.isOpenNewPost ){
      this.props.closeNewPost();
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

  renderGetMore(){
		const { state } = this.props;
    const { style, thread, app } = state;
    const posts = PostsSchems.getDispPosts(state);
    const dispPostCnt = posts.length;
    const postCntKey = app.dispThreadType === App.dispThreadTypeMulti ?
      "multiPostCnt" : "postCnt";
    let isDisp = false;

    console.log( "@@@ " + postCntKey + " > " + conf.findOnePostCnt  );
    console.log( dispPostCnt + " < " + thread[postCntKey] );

    if( thread[postCntKey] > conf.findOnePostCnt ){
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
    const{ app, style, thread, threads, actionLog } = state;
    return state[ `posts${app.dispThreadType}`].map( ( post ) => {
      return (
        <Post
          key={post._id}
          {...post}
          app={app}
          actionLog={actionLog}
          thread={thread}
          threads={threads}
          childLayerCnt={post.layer - thread.layer}
          style={style.post}
          talknAPI={talknAPI}
          timeago={timeago}
        />
      )
    });
  }

  render() {
    const { style } = this.props.state;
    return (
      <ol
        data-component-name={"Posts"}
        style={ style.posts.self }
        ref="thread"
        onMouseDown={this.handleOnMouseDown}
        onScroll={this.handleOnScroll}
      >
          {this.renderGetMore()}
          {this.renderPostList()}
      </ol>
    );
 	}
}
