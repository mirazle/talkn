import React, { Component, PropTypes } from "react"

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

  static getDecolationProps3( styleKey, eleType, tagName ){
    return {
      onMouseOver: () => {
        talknAPI.updateStyle( {styleKey, eleType, tagName, style: {
          boxShadow: '0px 0px 20px rgba(240, 240, 240, 0.7 ) inset',
          transition: '200ms',
          transform: 'scale( 1 )',
          cursor: 'pointer',
        } } );
      },
      onMouseLeave: () => {
        talknAPI.updateStyle( {styleKey, eleType, tagName, style: {
          boxShadow: '0px 0px 0px rgba(240, 240, 240, 0.7)',
          transition: '600ms',
          transform: 'scale( 1 )',
          cursor: 'default',
        } } );
      },
      onMouseDown: () => {
        talknAPI.updateStyle( {styleKey, eleType, tagName, style: {
          boxShadow: '0px 0px 30px rgba(235, 235, 235, 0.7) inset ',
          transform: 'scale( 0.8 )',
          cursor: 'pointer',
        } } );
      },
      onMouseUp: () => {
        talknAPI.updateStyle( {styleKey, eleType, tagName, style: {
          boxShadow: '0px 0px 20px rgba(240, 240, 240, 0.7) inset',
          transform: 'scale( 1 )',
          cursor: 'pointer',
        } } );
      },
    }
  }
  
  static getTalknLogo( style ){
    return (
      <div data-component-type={'IconTalknLogo'} style={ style.img } />
    );
  }

  static getTag( style ){
    console.log(style);
    return (
      <div data-component-type={'IconTag'} style={ style.div }>
        <div style={style.left}></div>
        <div style={style.right}></div>
        <div style={style.bar}></div>
      </div>
    );
  }

  static getHome( style ){
    return (
      <div data-component-type={'IconHome'} style={ style.div }>
        <div style={style.leaf}></div>
        <div style={style.base}></div>
        <div style={style.door}></div>
      </div>
    );
  }

  static getSearch( style ){
    return (
      <div data-component-type={'IconSearch'} style={ style.div }>
        <span style={ style.circle }></span>
        <span style={ style.bar }></span>
      </div>
    );
  }

  static getUser( style ){
    return (
      <div data-component-type={'IconUser'} style={ style.div }>
        <span style={ style.bottom }></span>
        <span style={ style.top }></span>
      </div>
    );
  }

  static getLogs( style ){
    return (
      <div data-component-type={'IconLogs'} style={ style.div }>
        <div style={ style.foot1 }>
          <span style={ style.foot1Top }></span>
          <span style={ style.foot1Bottom }></span>
          <span style={ style.foot1Space }></span>
        </div>
        <div style={ style.foot2 }>
          <span style={ style.foot2Top }></span>
          <span style={ style.foot2Bottom }></span>
          <span style={ style.foot2Space }></span>
        </div>
      </div>
    );
  }

  static getSetting( style ){
    return (
      <div data-component-type={'IconSetting'} style={ style.div }>
        <div style={ style.wing1 } />
        <div style={ style.wing2 } />
        <div style={ style.wing3 } />
        <div style={ style.wing4 } />
        <div style={ style.wing5 } />
        <div style={ style.wing6 } />
        <div style={ style.wing7 } />
        <div style={ style.wing8 } />
        <div style={ style.circle } />
      </div>
    );
  }

  static getMenu( style ){
    return (
      <div data-component-type={'IconMenu'} style={ style.div }>
        <div style={ style.dot }/>
        <div style={ style.dot }/>
        <div style={ style.dot }/>
      </div>
    );
  }

  static getIndex( style ){
    return (
      <div data-component-type={'IconIndex'} style={ style.div }>
        <div style={ style.wrap }>
          <span style={ style.top }></span>
          <span style={ style.middle }></span>
          <span style={ style.bottom }></span>
        </div>
      </div>
    );
  }

  static getDetail( style ){
    return (
      <div data-component-type={'IconDetail'} style={ style.div }>
        <div style={ style.wrap }>
          <span style={ style.bar1 }></span>
          <span style={ style.bar2 }></span>
          <span style={ style.bar3 }></span>
          <span style={ style.bar4 }></span>
          <span style={ style.mekuri }></span>
        </div>
      </div>
    );
  }

  static getThunder( style ){
    return (
      <div data-component-type={'IconThunder'} style={ style.div }>
        <div style={ style.wrap }>
          <span style={ style.top }></span>
          <span style={ style.bottom }></span>
        </div>
      </div>
    );
  }

  static getHeadTab( style ){
    return (
      <div data-component-type={'IconHeadTab'} style={ style.div }>
        <span style={ style.left }></span>
        <span style={ style.right }></span>
      </div>
    );
  }

  static getHeart( style ){
    return (
      <div data-component-type={'IconHeart'} style={ style.div }>
        <div style={ style.before }></div>
        <div style={ style.after }></div>
      </div>
    );
  }

  static getShare( style ){
    return (
      <div data-component-type={'IconShare'} style={ style.div }>
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
      <div data-component-type={'IconMoney'} style={ style.div } >
        <div style={ style.outer }>
          <div style={ style.inner }></div>
        </div>
      </div>
    );
  }
}
