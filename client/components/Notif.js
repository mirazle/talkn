import React, { Component } from "react"
import Post from './Post';

export default class Notif extends Component {

  constructor(props){
    super(props);
    this.state = {active: true};
    this.shutdown = this.shutdown.bind(this);
    setTimeout(this.shutdown, 2000000);
  }

  shutdown(){
    this.setState({active: false});
  }

  render() {
    if(this.state.active){
      const {post, app, thread} = this.props;
      const childLayerCnt = post.layer - thread.layer;
      const postStyle = this.props.style.post;
      const notifStyle = this.props.style.notif;
      let style = {};
      style.self = {...postStyle.self, ...notifStyle.self};
      style.bottom = {...postStyle.bottom, ...notifStyle.bottom};
      style.bottomIcon = {...postStyle.bottomIcon, ...notifStyle.bottomIcon};
      style.bottomPost = {...postStyle.bottomPost, ...notifStyle.bottomPost};

      console.log("@@@@");
      console.log(notifStyle.bottom);
      console.log(postStyle.bottom);
      console.log(style.bottom);
      return (
        <Post
          key={post._id}
          mode={'notif'}
          {...post}
          app={app}
          thread={thread}
          childLayerCnt={childLayerCnt}
          style={style}
      />
      );
    }else{
      return null;
    }
 	}
}
