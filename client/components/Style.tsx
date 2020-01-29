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
          @keyframes Rotation {
            0%   { transform: rotate(0deg) scale( 0.7 );  }
            100%   { transform: rotate(360deg) scale( 0.7 );  }
          }
          @keyframes LogoWrap1 {
            0%   { transform: translate3d( 0px, 0px, 0px ) scale(0); opacity: 1.0; box-shadow: 0px 0px 1px 0px rgba( 79, 174, 159, 0.4 ), 80px 80px 80px 0px rgba( 79, 174, 159, 0.4 ) inset; }
            50%   { transform: translate3d( 0px, 0px, 0px ) scale(1); opacity: 1.0; box-shadow: 0px 20px 80px 10px rgba( 79, 174, 159, 0.6 ), 80px 80px 80px 0px rgba( 79, 174, 159, 0.6 ) inset;}
            100%   { transform: translate3d( 0px, 0px, 0px ) scale(0); opacity: 1.0; box-shadow: 0px 0px 1px 0px rgba( 79, 174, 159, 0.4 ), 80px 80px 80px 0px rgba( 79, 174, 159, 0.4 ) inset;}
          }
          @keyframes Logo {
            0%   { transform: scale(0.95) translate3d(0px, 0px, 0px); opacity: 1.0; }
            50%   { transform: scale(1.05) translate3d(0px, 0px, 0px); opacity: 1.0; }
            100%   { transform: scale(0.95) translate3d(0px, 0px, 0px); opacity: 1.0; }
          }
          .LogoScreen{
            width: 100vw;
            height: 90vh;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .LogoWrap1 {
            position: absolute;
            animation-name: LogoWrap1;
            animation-duration: 2000ms;
            animation-iteration-count: infinite;
            width: 94px;
            height: 94px;
            border-radius: 100px;
            box-shadow: 0px 0px 30px 0px rgba( 100, 100, 100, 0.6 ), 80px 80px 80px 0px rgba( 79, 174, 159, 0.4 ) inset;
            transform: translate3d(0px, 0px, 0px) scale(0);
          }
          .Logo {
            animation-name: Logo;
            animation-duration: 2000ms;
            animation-iteration-count: infinite;
            width: 90px;
            height: 90px;
            transition: 600ms;
          }
          .LogoCh {
            font-size: 20px;
            font-weight: bold;
            color: rgba(69, 164, 149, 1);
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Hiragino Sans", "Noto Sans CJK JP", "Original Yu Gothic", "Yu Gothic", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Sans Emoji";
            border: 5px solid rgba(69, 164, 149, 1);
            border-radius: 100px;
            padding: 10px 20px 10px 20px;
          }
        `}
      </style>
    );
  }
}
