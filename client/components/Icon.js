import React, { Component, PropTypes } from "react"
import Style from 'common/schemas/state/Style';
import Container from 'common/schemas/state/Style/Container';

export default class Icon extends Component{

  static getMenu( style ){
    return (
      <div style={ style.div }>
        <span style={ style.span }></span>
        <span style={ style.span }></span>
        <span style={ style.span }></span>
      </div>
    );
  }

  static getDetail( style ){
    return (
      <div style={ style.div }>
        <span style={ style.top }></span>
        <span style={ style.middle }></span>
        <span style={ style.bottom }></span>
      </div>
    );
  }

  static getHeadTab( style ){
    return (
      <div style={ style.div }>
        <span style={ style.left }></span>
        <span style={ style.right }></span>
      </div>
    );
  }

  static getHeart( style ){
    return (
      <div style={ style.div }>
        <div style={ style.before }></div>
        <div style={ style.after }></div>
      </div>
    );
  }

  static getShare( style ){
    return (
      <div style={ style.div }>
        <div style={ style.arrow }></div>
        <div style={ style.bar }></div>
        <div style={ style.whiteBar1 }></div>
        <div style={ style.whiteBar2 }></div>
        <div style={ style.base }></div>
      </div>
    );
  }

  static getMoney( style ){
    return (
      <div style={ style.div }>
        <div style={ style.outer }>
          <div style={ style.inner }></div>
        </div>
      </div>
    );
  }
}
