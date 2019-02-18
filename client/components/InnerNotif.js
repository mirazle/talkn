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
    const {style} = this.state;
    const height = props.state.style.innerNotif.self.height;
    const notif = props.state.app.openInnerNotif;

    if( style.self.height !== height ){

      if( height === `${InnerNotifStyle.selfHeight}px` ){
        setTimeout( props.closeInnerNotif, 3000 );
      }

      this.setState({
        notif,
        style: {...style,
          self: {...style.self,
            height
          }
        }
      });
    }
  }

  render() {
    const { style, notif } = this.state;
    return (
      <div
        data-component-name={this.constructor.name} 
        style={style.self}
      >
        {notif}
      </div>
    );
  }
}
