import React, { Component } from "react"
import Post from './Post';
import Container from 'client/style/Container';

export default class Notif extends Component {

  static get STATUS_CONSTRUCT(){return 1};
  static get STATUS_DISPLAY(){return 2};
  static get STATUS_START_OPEN(){return 3};
  static get STATUS_START_NOTIF(){return 4};
  static get STATUS_START_CLOSE(){return 5};
  static get STATUS_UNDISPLAY(){return 6};

  constructor(props){
    super(props);
    this.log = this.log.bind(this);
    this.display = this.display.bind(this);
    this.startOpen = this.startOpen.bind(this);
    this.startNotif = this.startNotif.bind(this);
    this.startClose = this.startClose.bind(this);
    this.undisplay = this.undisplay.bind(this);
    this.onTransitionEnd = this.onTransitionEnd.bind(this);

    const postStyle = this.props.style.post;
    const notifStyle = this.props.style.notif;
    let style = {};
    style.self = {...postStyle.self, ...notifStyle.self};
    style.bottom = {...postStyle.bottom, ...notifStyle.bottom};
    style.bottomIcon = {...postStyle.bottomIcon, ...notifStyle.bottomIcon};
    style.bottomPost = {...postStyle.bottomPost, ...notifStyle.bottomPost};
    this.state = {style, status: Notif.STATUS_CONSTRUCT};
    //console.log("CONST");
  }

  componentWillUnmount(){
    return true;
    //Post.removeListener("transitionend");
  }

  componentDidMount(){
    this.display();
  }

  display(){
    const { style } = this.state;
    this.setState({
      status:  Notif.STATUS_DISPLAY,
      style: {...style,
        self: {...style.self,
          transition: `300ms`,
          transform: 'translate3d(0px, 40px, 0px)'
        }
      }
    });
    setTimeout(this.startOpen, 0 );
  }

  startOpen(){
    const { style } = this.state;
    const transition = Container.transitionNotif;
    this.setState({
      status:  Notif.STATUS_START_OPEN,
      style: {...style,
        self: {...style.self,
          transition: `900ms`,
          transform: 'translate3d(0px, 0px, 0px)'
        }
      }
    });
    setTimeout(this.startNotif, transition *1);
  }

  startNotif(){
    const { style } = this.state;
    const transition = Container.transitionNotif;
    this.setState({
      status:  Notif.STATUS_START_NOTIF,
      style: {...style,
        self: {...style.self,
          transition: `${transition * 1}ms`,
        }
      }
    });
    setTimeout(this.startClose, Container.transitionNotifDisp * 1);
  }

  startClose(){
    const { style } = this.state;
    const transition = Container.transitionNotif;
    this.setState({
      status: Notif.STATUS_START_CLOSE,
      style: {...style,
        self: {...style.self,
          transition: `${transition * 900}ms`,
          transform: 'translate3d(0px, 40px, 0px)'
        }
      }
    });
    setTimeout(this.undisplay, transition );
  }

  undisplay(){
    this.setState({status: Notif.STATUS_UNDISPLAY});
  }

  onTransitionEnd(){
    if(this.state === Notif.STATUS_START_CLOSE){
      this.setState({status: Notif.STATUS_UNDISPLAY});
    }
  }

  log(status){
    const date = new Date().getTime();
    switch(status){
    case Notif.STATUS_CONSTRUCT :
      console.log("@@@ 1 STATUS_CONSTRUCT " + this.state.style.self.transform + " " + this.state.style.self.transition + " " + date);
      break;
    case Notif.STATUS_DISPLAY :
      console.log("@@@ 2 STATUS_DISPLAY " + this.state.style.self.transform + " " + this.state.style.self.transition + " " + date);
      break;
    case Notif.STATUS_START_OPEN :
      console.log("@@@ 3 STATUS_START_OPEN " + this.state.style.self.transform + " " + this.state.style.self.transition + " " + date);
      break;
    case Notif.STATUS_START_NOTIF :
      console.log("@@@ 4 STATUS_START_NOTIF " + this.state.style.self.transform + " " + this.state.style.self.transition + " " + date);
      break;
    case Notif.STATUS_START_CLOSE :
      console.log("@@@ 5 STATUS_START_CLOSE " + this.state.style.self.transform + " " + this.state.style.self.transition + " " + date);
      break;
    case Notif.STATUS_UNDISPLAY : 
      console.log("@@@ 6 STATUS_UNDISPLAY " + this.state.style.self.transform + " " + this.state.style.self.transition + " " + date);
      break;
    }
  }

  render() {
    const {post, app, thread, handleOnClickToggleMain} = this.props;
    const {status, style} = this.state;
    const childLayerCnt = post.layer - thread.layer;
console.log("@@@@@@!!!! " + app.isOpenNotif + " " + status + " " + style.self.display );
    if(app.isOpenNotif){
      switch(status){
      case Notif.STATUS_CONSTRUCT :
      case Notif.STATUS_DISPLAY :
      case Notif.STATUS_START_OPEN :
      case Notif.STATUS_START_NOTIF :
      case Notif.STATUS_START_CLOSE :

        this.log(status);
        return (
          <Post
            key={post._id}
            mode={'notif'}
            {...post}
            app={app}   
            thread={thread}
            onTransitionEnd={this.onTransitionEnd}
            childLayerCnt={childLayerCnt}
            style={style}
            handleOnClickToggleMain={handleOnClickToggleMain}
          />
        );
      case Notif.STATUS_UNDISPLAY :    
      default:
        return null;
      }
    }else{
      return null;
    }
  }
}
