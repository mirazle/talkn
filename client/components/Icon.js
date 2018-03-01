import React, { Component, PropTypes } from "react"
import Style from 'common/schemas/state/Style';
import Container from 'common/schemas/state/Style/Container';

export default class Icon extends Component{

  static getMenu( params ){
    let div = {}
    div.layout = Style.getLayoutBlock();
    div.content = {};
    div.animation = Style.getAnimationBase();
    const divStyle = Style.get({...div});

    let span = {}
    span.layout = Style.getLayoutBlock({
      width: '6px',
      height: '6px',
      margin: '3px 70% 3px',
      borderRadius: '6px',
      background: Container. calmRGB,
    });
    span.content = {};
    span.animation = Style.getAnimationBase();
    const spanStyle = Style.get({...span});

    return (
      <div style={ divStyle }>
        <span style={ spanStyle }></span>
        <span style={ spanStyle }></span>
        <span style={ spanStyle }></span>
      </div>
    );
  }

  static getHeadTab( params ){
    let div = {}
    div.layout = Style.getLayoutBlock();
    div.content = {};
    div.animation = Style.getAnimationBase();
    const divStyle = Style.get({...div});

    const commonLayout = Style.getLayoutInlineBlock({
      width: '4px',
      height: '20px',
      borderRadius: '10px',
      background: Container. calmRGB,
    });

    let left = {}
    left.layout = commonLayout;
    left.content = {};
    left.animation = Style.getAnimationBase({
      transform: 'rotate(65deg) translate3d(-4px, 5px, 0px)',
    });
    const leftStyle = Style.get({...left});

    let right = {}
    right.layout = commonLayout;
    right.content = {};
    right.animation = Style.getAnimationBase({
      transform: 'rotate(-65deg) translate3d(4px, 5px, 0px)',
    });
    const rightStyle = Style.get({...right});

    return (
      <div style={ divStyle }>
        <span style={ leftStyle }></span>
        <span style={ rightStyle }></span>
      </div>
    );
  }
}


/*

ヘッダーのつまみ
span{height:40px; width:40px; display:block; position:relative;}

.demoSpan1{overflow:hidden; height:25px;}

.demoSpan1:before{content:''; height:20px; width:20px; display:block; border:5px solid #333; border-right-width:0; border-top-width:0; transform:rotate(-45deg);-webkit-transform:rotate(-45deg);-moz-transform:rotate(-45deg);-o-transform:rotate(-45deg);-ms-transform:rotate(-45deg); position:absolute; bottom:7px; left:7px;}
*/
