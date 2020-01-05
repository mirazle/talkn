import React, { Component } from "react";
import conf from "common/conf";

interface Props {
  state?: any;
}

export default class Style extends Component<Props> {
  render() {
    let fontSize = 12;

    return (
      <style type="text/css">
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
            0%   { transform: scale(1); opacity: 1.0; box-shadow: 0px 0px 1px 0px rgba( 79, 174, 159, 0.4 ), 80px 80px 80px 0px rgba( 79, 174, 159, 0.4 ) inset; }
            50%   { transform: scale(1); opacity: 1.0; box-shadow: 0px 20px 60px 0px rgba( 79, 174, 159, 0.6 ), 80px 80px 80px 0px rgba( 79, 174, 159, 0.4 ) inset;}
            100%   { transform: scale(1); opacity: 1.0; box-shadow: 0px 0px 1px 0px rgba( 79, 174, 159, 0.4 ), 80px 80px 80px 0px rgba( 79, 174, 159, 0.4 ) inset;}
          }
          @keyframes Logo {
            0%   { transform: scale(0.95) translate3d(0px, 0px, 0px); opacity: 0.98; }
            50%   { transform: scale(1.05) translate3d(0px, 0px, 0px); opacity: 1.0; }
            100%   { transform: scale(0.95) translate3d(0px, 0px, 0px); opacity: 0.98; }
          }
          @keyframes LogoCircle {
            0%   { transform: translate3d(0px, -60px, 0px) scale(1); box-shadow: 0px 0px 0px 0px rgba(200, 200,200, 1); background: rgba( 240, 240, 240, 0.9); }
            50%   { transform: translate3d(0px, -60px, 0px) scale(0); box-shadow: 0px 0px 10px 1px rgba(240, 240,240, 1); background: rgba( 245, 245, 245, 0.0); }
            100%   { transform: translate3d(0px, -60px, 0px) scale(1); box-shadow: 0px 0px 10px 10px rgba(240, 240,240, 1); background: rgba( 240, 240, 240, 0.9); }
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
            animation-duration: 2000ms;
            animation-iteration-count: infinite;
            width: 80px;
            height: 80px;
            border-radius: 10000px;
            box-shadow: 0px 0px 30px 0px rgba( 100, 100, 100, 0.6 ), 80px 80px 80px 0px rgba( 79, 174, 159, 0.4 ) inset;
            transform: tlanslate3d( 0px, -20px, 0px );
          }
          .Logo {
            animation-name: Logo;
            animation-duration: 2000ms;
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
            animation-duration: 400ms;
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
