import React, { Component, PropTypes } from "react"
import ReactDOM from 'react-dom'
import Post from './Post';

export default class Main extends Component {

  componentDidMount(){
    const scrollHeight = this.refs.posts.scrollHeight;
    console.log( scrollHeight );
    this.scrollTo( this.refs.posts, scrollHeight, 0 )
  }

  componentDidUpdate(){
    const { actionLog } = this.props.state;
    switch( actionLog[ 0 ] ){
    case 'SERVER_TO_CLIENT[BROADCAST]:post':
      const scrollHeight = this.refs.posts.scrollHeight;
      this.scrollTo( this.refs.posts, scrollHeight, 1000 )
      break;
    default:
      break;
    }
  }

  scrollTo(element, to, duration) {
    let start = element.scrollTop;
    let change = to - start;
    let currentTime = 0;
    let increment = 20;

    const animateScroll = ()　=>　{
      currentTime += increment;
      element.scrollTop = Math.easeInOutQuad(currentTime, start, change, duration);;
      if(currentTime < duration) setTimeout(animateScroll, increment);
    };
    animateScroll();
  }

  renderPosts(){
		const{ state, talknAPI, timeago } = this.props;
    const{ style, posts } = state;
    let postList = [];
    if( Object.keys( posts ).length > 0 ){
      postList = Object.keys( posts ).map( ( index ) => {
        const post = posts[ index ];
        if( post._id ){
          return <Post
            key={post._id}
            {...post}
            style={style.post}
            talknAPI={talknAPI}
            timeago={timeago}
          />;
        }
      });
    }
    return (
      <ol
        ref="posts"
        style={ style.main.body }>
        {postList}
      </ol>
    );
  }

 	render() {
		const{ state, talknAPI } = this.props;
    const { app, user, style } = state;
		return (
      <main style={ style.main.self }>
        <header style={ style.main.header } />
        {this.renderPosts()}
      </main>
		);
 	}
}
