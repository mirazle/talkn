import React, { Component } from "react";
import TalknComponent from "client/components/TalknComponent";
import Ui from "client/store/Ui";
import ContainerStyle from "client/style/Container";

interface Props {
  state: any;
}

interface State {}

export default class Style extends TalknComponent<Props, State> {
  constructor(props) {
    super(props);
  }
  render() {
    const { app, ui } = this.props.state;
    let fontSize = ui.screenMode === Ui.screenModeSmallLabel ? 12 : 13;
    let letterSpacing = ui.screenMode === Ui.screenModeSmallLabel ? 3 : 3;
    let lineHeight = ui.screenMode === Ui.screenModeSmallLabel ? 8 : 13;

    return (
      <style type="text/css">
        {`
          #talkn1 textarea::placeholder {
            text-indent: 3%;
            font-size: ${fontSize}px;
            letter-spacing: ${letterSpacing}px;
            line-height: ${lineHeight}px;
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
            0%   { transform: translate3d( 0px, 0px, 0px ) scale(0) rotate(0deg); opacity: 0.0; box-shadow: 0px 0px 1px 0px rgba( 79, 174, 159, 0.0 ), 80px 80px 80px 0px rgba( 79, 174, 159, 0.0 ) inset; }
            25%   { transform: translate3d( 0px, 0px, 0px ) scale(1.0) rotate(0deg); opacity: 1.0; box-shadow: 0px 20px 80px 10px rgba( 79, 174, 159, 0.6 ), 80px 80px 80px 0px rgba( 79, 174, 159, 0.6 ) inset;}
            50%   { transform: translate3d( 0px, 2px, 0px ) scale(0.95) rotate(0deg); opacity: 1.0; box-shadow: 0px 20px 80px 10px rgba( 79, 174, 159, 0.65 ), 80px 80px 80px 0px rgba( 79, 174, 159, 0.65 ) inset;}
            80%   { transform: translate3d( 0px, 50px, 0px ) scale(0.3) rotate(0deg); opacity: 0.0; box-shadow: 0px 0px 1px 0px rgba( 79, 174, 159, 1.0 ), 80px 80px 80px 0px rgba( 79, 174, 159, 1.0 ) inset;}
            100%   { transform: translate3d( 0px, 0px, 0px ) scale(0.1) rotate(0deg); opacity: 0.0; box-shadow: 0px 0px 1px 0px rgba( 79, 174, 159, 1.0 ), 80px 80px 80px 0px rgba( 79, 174, 159, 1.0 ) inset;}
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
            width: 110px;
            height: 110px;
            border-radius: 110px;
            box-shadow: 0px 0px 30px 0px rgba( 100, 100, 100, 0.6 ), 80px 80px 80px 0px rgba( 79, 174, 159, 0.4 ) inset;
            transform: translate3d(0px, 0px, 0px) scale(0);
          }
          .Logo {
            animation-name: Logo;
            animation-duration: 2000ms;
            animation-iteration-count: infinite;
            width: 100px;
            height: 100px;
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
