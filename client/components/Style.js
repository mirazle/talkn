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
          @keyframes LogoCircle {
            0%   { transform: translate3d(0px, -60px, 0px) scale(10); box-shadow: 0px 0px 0px 0px rgba(200, 200,200, 1); background: rgba( 240, 240, 240, 0.8); }
            50%   { transform: translate3d(0px, -60px, 0px) scale(0); box-shadow: 0px 0px 10px 1px rgba(240, 240,240, 1); background: rgba( 245, 245, 245, 0.0); }
            100%   { transform: translate3d(0px, -60px, 0px) scale(20); box-shadow: 0px 0px 10px 10px rgba(240, 240,240, 1); background: rgba( 240, 240, 240, 0.8); }
          }
          .LogoScreen{
            width: 100vw;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .LogoWrap1 {
            position: absolute;
            top: 35vh;
            animation-name: LogoWrap1;
            animation-duration: 1600ms;
            animation-iteration-count: infinite;
            width: 80px;
            height: 80px;
            border-radius: 10000px;
            box-shadow: 0px 0px 80px 0px rgba( 200, 200, 200, 0.9 ), 80px 80px 80px 0px rgba( 79,174,159, 0.8 ) inset;
            transform: tlanslate3d( 0px, -20px, 0px );
          }
          .Logo {
            animation-name: Logo;
            animation-duration: 4000ms;
            animation-iteration-count: infinite;
            width: inherit;
            height: inherit;
            background-image: url(//${conf.assetsImgPath}talkn.png);
            background-position: 50% 50%;
            background-size: 80px;
            background-repeat: no-repeat;
            transition: 600ms;
          }
          .LogoCircle {
            animation-name: LogoCircle1;
            animation-duration: 1600ms;
            animation-iteration-count: 1;
            animation-fill-mode: forwards;
            background: rgba( 240, 240, 240, 0.8);
            width: 10px;
            height: 10px;
            border-radius: 10000px;
            box-shadow: 0px 0px 0px 0px rgba(240, 240,240, 1);
            transform: translate3d(0px, -60px, 0px) scale(10);
            transition: 600ms;
          }
        `}
      </style>
		);
 	}
}
