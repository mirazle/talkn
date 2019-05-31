import React, { Component } from "react"
import {default as InnerNotifStyle} from 'client/style/InnerNotif';

export default class InnerNotif extends Component {

  constructor(props){
    super(props);
    const { innerNotif: style } = this.props.state.style;
    const notif = this.props.state.app.openInnerNotif;
    this.state = {style, notif};
  }

  componentWillReceiveProps(props){
    const { style } = this.state;
    const { debug } = this.props;
    const height = debug ? "auto" : props.state.style.innerNotif.self.height;
    const isDebug = debug && debug !== "";
    const notif = isDebug ? debug : props.state.app.openInnerNotif;

    if( style.self.height !== height || isDebug ){

      if( height === `${InnerNotifStyle.selfHeight}px` && !isDebug ){
        setTimeout( props.closeInnerNotif, 3000 );
      }

      this.setState({
        isDebug,
        notif,
        style: {...style,
          self: {...style.self,
            wordBreak: isDebug ? "break-word" : "normal",
            top: isDebug ? "auto" : "45px",
            bottom: isDebug ? "45px" : "auto",
            height
          }
        }
      });
    }
  }

  render() {
    const { style, notif, isDebug } = this.state;
    if(isDebug){
      return (
        <div
          data-component-name={"InnerNotif"} 
          style={style.self}
          dangerouslySetInnerHTML={{__html: notif }}
        />
      );
    }else{
      return (
        <div
          data-component-name={"InnerNotif"} 
          style={style.self}
        >
          {notif}
        </div>
      );
    }
  }
}
