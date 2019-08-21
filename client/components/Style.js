import React, { Component, PropTypes } from "react"
import conf from 'common/conf';

export default class  Style extends Component {

 	render() {
		const{ state } = this.props;
    let fontSize = 12;

    return (
      <style type='text/css'>
        {`
          #talkn1 textarea::placeholder {
            text-indent: 3%;
            font-size: ${fontSize}px;
            letter-spacing: 2px;
            line-height: 9px;
            color: rgb(170, 170, 170);
          }
          #talkn1 input::placeholder {
            text-indent: 3%;
            font-size: ${fontSize}px;
            letter-spacing: 1px;
            color: rgb(170, 170, 170);
          }
          @keyframes Logo {
            0%   { transform: scale(0.9); opacity: 1.0; }
            50%   { transform: scale(1.00); opacity: 1.0; }
            100%   { transform: scale(0.9); opacity: 1.0; }
          } 
          .Logo {
            animation-duration: 2000ms;
            animation-name: Logo;
            animation-iteration-count: infinite;
            width: inherit;
            height: inherit;
            background-image: url(//${conf.assetsImgPath}talkn.png);
            background-position: center center;
            background-size: 10%;
            background-repeat: no-repeat;
            transition: 600ms;
          }
        `}
      </style>
		);
 	}
}
