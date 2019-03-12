import React, { Component, PropTypes } from "react"

export default class  Style extends Component {

 	render() {
		const{ state, talknAPI } = this.props;
    const { app, style } = state;  
    let fontSize = 12;
    if( app.width >= 310 ){
      fontSize = 12;
    }else if( app.width >= 300 && app.width < 310 ){
      fontSize = 12;
    }else if( app.width >= 295 && app.width < 300 ){
      fontSize = 11;
    }else if( app.width < 295 ){
      fontSize = 10;
    }

    return (
      <style type='text/css'>
        {`
          #talkn1 textarea::placeholder {
            text-indent: 2%;
            font-size: ${fontSize}px;
            color: rgb(170, 170, 170);
          }
        `}
      </style>
		);
 	}
}
