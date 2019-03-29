import React, { Component } from 'react'
import define from 'common/define';
import App from 'common/schemas/state/App';
import { default as PostsSchems } from 'common/schemas/state/Posts';
import Post from 'client/components/Post';

export default class Posts extends Component {

  constructor(props){
    super(props);
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

    if( app.type === define.APP_TYPES.EXTENSION ){
      talknAPI.extension("loadTalkn", this.props.state);
    }
    this.setState({scrollHeight: this.refs.thread.scrollHeight});
    talknWindow.threadHeight = document.querySelector("[data-component-name=Posts]").clientHeight;
    talknWindow.animateScrollTo( talknWindow.threadHeight, 0 );
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
