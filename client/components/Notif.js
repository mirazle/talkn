import React, { Component } from "react"
import Post from './Post';
import Container from 'client/style/Container';

export default class Notif extends Component {

  static get STATUS_CONSTRUCT(){return 1};
  static get STATUS_START_OPEN(){return 2};
  static get STATUS_START_CLOSE(){return 3};
  static get STATUS_UNDISPLAY(){return 4};

  constructor(props){
    super(props);
    this.startClose = this.startClose.bind(this);
    this.undisplay = this.undisplay.bind(this);
    this.onTransitionEnd = this.onTransitionEnd.bind(this);

    talknAPI.extension("openNotif");
    props.openNotif();

    const postStyle = this.props.style.post;
    const notifStyle = this.props.style.notif;
    let style = {};
    style.self = {...postStyle.self, ...notifStyle.self};
    style.bottom = {...postStyle.bottom, ...notifStyle.bottom};
    style.bottomIcon = {...postStyle.bottomIcon, ...notifStyle.bottomIcon};
    style.bottomPost = {...postStyle.bottomPost, ...notifStyle.bottomPost};
    this.state = {style, status: Notif.STATUS_CONSTRUCT};
  }

  componentDidMount(){
    const { style } = this.state;
    const transition = Container.transitionNotif;

    // OPEN
    this.setState({
      status:  Notif.STATUS_START_OPEN,
      style: {...style,
        self: {...style.self,
          transition: `${transition}ms`,
          transform: 'translate3d(0px, 0px, 0px)'
        }
      }
    });
    setTimeout(this.startClose, 2000 + transition );
  }

  startClose(){
    const { style } = this.state;
    const transition = Container.transitionNotif;
    this.setState({
      status: Notif.STATUS_START_CLOSE,
      style: {...style,
        self: {...style.self,
          transition: `${transition}ms`,
          transform: 'translate3d(0px, 40px, 0px)'
        }
      }
    });
    setTimeout(this.undisplay, transition * 2 );
  }

  undisplay(){
    this.props.closeNotif();
   }

  onTransitionEnd(){
    this.setState({status: Notif.STATUS_UNDISPLAY});
    talknAPI.extension("closeNotif");
  }

  render() {
    const {post, app, thread} = this.props;
    const {status, style} = this.state;
    const childLayerCnt = post.layer - thread.layer;
    const onTransitionEnd = status === Notif.STATUS_START_CLOSE ?
      this.onTransitionEnd : () => {};

    switch(status){
    case Notif.STATUS_CONSTRUCT :
    case Notif.STATUS_START_OPEN :
    case Notif.STATUS_START_CLOSE :
      return (
        <Post
          key={post._id}
          mode={'notif'}
          onTransitionEnd={onTransitionEnd}
          {...post}
          app={app}
          thread={thread}
          childLayerCnt={childLayerCnt}
          style={style}
        />
      );
    case Notif.STATUS_UNDISPLAY :    
    default:
      return null;
    }
  }
}
