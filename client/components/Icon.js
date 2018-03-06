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
}
