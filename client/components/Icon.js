import React, { Component, PropTypes } from "react"
import Style from 'client/style';
import Container from 'client/style/Container';

export default class Icon extends Component{

  constructor(props) {
    super(props);
  }

  static getDecolationProps1( styleKey, eleType, tagName ){
    return {
      onMouseOver: () => {
        talknAPI.updateStyle( {styleKey, eleType, tagName, style: {
          boxShadow: '0px 0px 20px rgba(240, 240, 240, 0.7 ) inset',
          transition: '200ms',
          transform: 'scale( 1 )',
          borderRadius: '100px',
          cursor: 'pointer',
        } } );
      },
      onMouseLeave: () => {
        talknAPI.updateStyle( {styleKey, eleType, tagName, style: {
          boxShadow: '0px 0px 0px rgba(240, 240, 240, 0.7)',
          transition: '600ms',
          transform: 'scale( 1 )',
          borderRadius: '100px',
          cursor: 'default',
        } } );
      },
      onMouseDown: () => {
        talknAPI.updateStyle( {styleKey, eleType, tagName, style: {
          boxShadow: '0px 0px 30px rgba(235, 235, 235, 0.7) inset ',
          transform: 'scale( 0.8 )',
          borderRadius: '100px',
          cursor: 'pointer',
        } } );
      },
      onMouseUp: () => {
        talknAPI.updateStyle( {styleKey, eleType, tagName, style: {
          boxShadow: '0px 0px 20px rgba(240, 240, 240, 0.7) inset',
          transform: 'scale( 1 )',
          borderRadius: '100px',
          cursor: 'pointer',
        } } );
      },
    }
  }

  static getDecolationProps2( styleKey, eleType, tagName ){
    return {
      onMouseOver: () => {
        talknAPI.updateStyle( {styleKey, eleType, tagName, style: {
          boxShadow: '0px 0px 20px rgba(240, 240, 240, 0.7 ) inset',
          transition: '200ms',
          transform: 'scale( 1 )',
          borderRadius: '100px',
          cursor: 'pointer',
        } } );
      },
      onMouseLeave: () => {
        talknAPI.updateStyle( {styleKey, eleType, tagName, style: {
          boxShadow: '0px 0px 0px rgba(240, 240, 240, 0.7)',
          transition: '600ms',
          transform: 'scale( 1 )',
          borderRadius: '100px',
          cursor: 'default',
        } } );
      },
      onMouseDown: () => {
        talknAPI.updateStyle( {styleKey, eleType, tagName, style: {
          boxShadow: '0px 0px 30px rgba(255, 200, 255, 0.7) inset ',
          transform: 'scale( 0.8 )',
          borderRadius: '100px',
          cursor: 'pointer',
        } } );
      },
      onMouseUp: () => {
        talknAPI.updateStyle( {styleKey, eleType, tagName, style: {
          boxShadow: '0px 0px 20px rgba(240, 240, 240, 0.7) inset',
          transform: 'scale( 1 )',
          borderRadius: '100px',
          cursor: 'pointer',
        } } );
      },
    }
  }

  static getTalknLogo( style ){
    return (
      <div style={ style.img } />
    );
  }

  static getUser( style ){
    return (
      <div style={ style.div }>
        <span style={ style.top }></span>
        <span style={ style.bottom }></span>
      </div>
    );
  }

  static getMenu( style ){
    return (
      <div style={ style.div }>
        <div style={ style.dot }/>
        <div style={ style.dot }/>
        <div style={ style.dot }/>
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
      <div style={ style.div } >
        <div style={ style.outer }>
          <div style={ style.inner }></div>
        </div>
      </div>
    );
  }
}
