import React, { Component, PropTypes } from "react"
import Post from './Post';

export default class Main extends Component {

  renderPosts(){
		const{ state, talknAPI, timeago } = this.props;
    const{ style, posts } = state;
    let postList = [];
    if( Object.keys( posts ).length > 0 ){
      postList = Object.keys( posts ).map( ( index ) => {
        const post = posts[ index ];
        return <Post
          key={post._id}
          {...post}
          style={style}
          talknAPI={talknAPI}
          timeago={timeago}
        />;

      });
    }
    return (<ol>{postList}</ol>);
  }

 	render() {
		const{ state, talknAPI } = this.props;
    const { app, user, style } = state;
		return (
      <main style={ style.main.self }>
        <header style={ style.main.header }>
        </header>
        <ol style={ style.main.body }>
          {this.renderPosts()}
        </ol>
      </main>
		);
 	}
}
