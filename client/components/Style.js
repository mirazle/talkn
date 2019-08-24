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
          @keyframes LogoWrap1 {
            0%   { transform: scale(0.8); opacity: 0.8; }
            50%   { transform: scale(1.00); opacity: 1.0; }
            100%   { transform: scale(0.8); opacity: 0.8; }
          }
          @keyframes Logo {
            0%   { transform: scale(0.84) translate3d(0px, 0px, 0px); opacity: 0.7; }
            25%   { transform: scale(0.92) translate3d(0px, 0px, 0px); opacity: 0.8; }
            50%   { transform: scale(1.00) translate3d(0px, 0px, 0px); opacity: 1.0; }
            75%   { transform: scale(0.92) translate3d(0px, 0px, 0px); opacity: 0.8; }
            100%   { transform: scale(0.84) translate3d(0px, 0px, 0px); opacity: 0.7; }
          }
          .LogoScreen{
            width: 100vw;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .LogoWrap1 {
            animation-duration: 1600ms;
            animation-name: LogoWrap1;
            animation-iteration-count: infinite;
            width: 100px;
            height: 100px;
            border-radius: 1000px;
            box-shadow: 0px 0px 80px 0px rgba( 200,200,200, 0.9 ), 80px 80px 80px 0px rgba( 79,174,159, 0.8 ) inset;
          }
          .Logo {
            animation-duration: 4000ms;
            animation-name: Logo;
            animation-iteration-count: infinite;
            width: inherit;
            height: inherit;
            background-image: url(//${conf.assetsImgPath}talkn.png);
            background-position: 50% 30%;
            background-size: 100px;
            background-repeat: no-repeat;
            transition: 600ms;
          }
        `}
      </style>
		);
 	}
}
