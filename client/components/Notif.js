import React, { Component } from "react"

export default class Notif extends Component {

  constructor(props){
    super(props);
    this.state = {active: true};
    this.shutdown = this.shutdown.bind(this);
    setTimeout(this.shutdown, 11600);
  }

  shutdown(){
    this.setState({active: false});
  }

  render() {
    if(this.state.active){
      const {_id, post} = this.props;
      return (
        <li key={_id}>
          {post}          
        </li>
      );
    }else{
      return null;
    }
 	}
}
