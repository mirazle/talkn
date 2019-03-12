import React, { Component } from "react";
import { default as IconStyle } from 'client/style/Icon';
import Schema from 'common/schemas/Schema';

export default class Icon extends Component{

  static get smallSize(){ return IconStyle.smallSize };
  static get middleSize(){ return IconStyle.middleSize };
  static get largeSize(){ return IconStyle.largeSize };
  static get bigSize(){ return IconStyle.bigSize };

  static generateImageIcon( name = "Twitter", overStyle, state = {}, option = {} ){
    if( IconStyle[ `get${name}` ] ){
      const onClick = option.onClick ? option.onClick : () => {};
      const href = option.href ? option.href : "";
      const style = Icon.getOveredStyle( IconStyle[ `get${name}` ](state, option), overStyle );

      if( !Schema.isAnonymousFunc( onClick ) ){
        return (
          <div
            data-component-type={`Icon${name}`}
            onClick={onClick}
            style={style}
          />
        );
      }
      
      if( href !== "" ){
        return (
          <a  
            href={href}
            data-component-type={`Icon${name}`}
            style={style}
          />
        );
      }

      return (
        <div
          data-component-type={`Icon${name}`}
          style={style}
        />
      )
    }
    return null;
  }

  static getOveredStyle( baseStyle = {}, overStyle = {} ){
    Object.keys( overStyle ).forEach( key => {
      if( baseStyle[ key ] ){
        if( typeof baseStyle[ key ] === 'object' ){
          baseStyle[key] = {...baseStyle[key], ...overStyle[key]};
        }else{
          baseStyle[key] = overStyle[key];
        }
      }
    });
    return baseStyle;
  }

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
          boxShadow: '0px 0px 20px rgba(200, 200, 200, 0.7 ) inset',
          transition: '200ms',
          transform: 'scale( 1 )',
          borderRadius: '0px',
          cursor: 'pointer',
        } } );
      },
      onMouseLeave: () => {
        talknAPI.updateStyle( {styleKey, eleType, tagName, style: {
          boxShadow: '0px 0px 0px rgba(220, 220, 220, 0.7)',
          transition: '600ms',
          transform: 'scale( 1 )',
          borderRadius: '0px',
          cursor: 'default',
        } } );
      },
      onMouseDown: () => {
        talknAPI.updateStyle( {styleKey, eleType, tagName, style: {
          boxShadow: '0px 0px 30px rgba(200, 200, 200, 0.7) inset ',
          transform: 'scale( 0.8 )',
          borderRadius: '0px',
          cursor: 'pointer',
        } } );
      },
      onMouseUp: () => {
        talknAPI.updateStyle( {styleKey, eleType, tagName, style: {
          boxShadow: '0px 0px 20px rgba(240, 240, 240, 0.7) inset',
          transform: 'scale( 1 )',
          borderRadius: '0px',
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

  static getEmpty( overStyle, state = {}, option = {} ){
    const style = Icon.getOveredStyle( IconStyle.getEmpty(state, option), overStyle );
    return (
      <div data-component-type={'IconEmpty'} style={ style } />
    );
  }

  static getTwitter( overStyle, state = {}, option = {} ){
    return Icon.generateImageIcon( "Twitter", overStyle, state, option );
  }

  static getFacebook( overStyle, state = {}, option = {} ){
    return Icon.generateImageIcon( "Facebook", overStyle, state, option );
  }
  
  static getAppstore( overStyle, state = {}, option = {} ){
    return Icon.generateImageIcon( "Appstore", overStyle, state, option );
  }
  
  static getAndroid( overStyle, state = {}, option = {} ){
    return Icon.generateImageIcon( "Android", overStyle, state, option );
  }

  static getHome( overStyle, state = {}, option = {} ){
    return Icon.generateImageIcon( "Home", overStyle, state, option );
  }

  static getGraph( overStyle, state = {}, option = {} ){
    const onClick = option.onClick ? option.onClick : () => {};
    const style = Icon.getOveredStyle( IconStyle.getGraph(state, option), overStyle );
    return (
      <div
        data-component-type={'IconGraph'}
        onClick={onClick} 
        style={ style }
      />
    );
  }

  static getTalkn( overStyle, state = {}, option = {} ){
    return Icon.generateImageIcon( "Talkn", overStyle, state, option );
  }

  static getTalknLogo( style ){
    return (
      <div data-component-type={'IconTalknLogo'} style={ style.img } />
    );
  }

  static getTag( style ){
    return (
      <div data-component-type={'IconTag'} style={ style.div }>
        <div style={style.left}></div>
        <div style={style.right}></div>
        <div style={style.bar}></div>
      </div>
    );
  }

  static getHomeCss( style ){
    return (
      <div data-component-type={'IconHomeCss'} style={ style.div }>
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

  static getUser( overStyle = {}){
    const style = Icon.getOveredStyle( IconStyle.getUser(), overStyle );
    return (
      <div data-component-type={'IconUser'} style={ style.div }>
        <span style={ style.bottom }></span>
        <span style={ style.top }></span>
      </div>
    );
  }

  static getLogs( overStyle ){
    const style = Icon.getOveredStyle( IconStyle.getLogs(), overStyle );
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

  static getSetting( overStyle ){
    const style = Icon.getOveredStyle( IconStyle.getSetting(), overStyle );
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

  static getIndex( overStyle ){
    const style = Icon.getOveredStyle( IconStyle.getIndex(), overStyle );
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

  static getHeadTab( overStyle, params = {} ){
    const style = Icon.getOveredStyle( IconStyle.getHeadTab(params), overStyle );
    return (
      <div data-component-type={'IconHeadTab'} style={ style.div }>
        <span style={ style.left }></span>
        <span style={ style.right }></span>
      </div>
    );
  }

  static getHeart( overStyle, params = {} ){
    const style = Icon.getOveredStyle( IconStyle.getHeart(params), overStyle );
    return (
      <div data-component-type={'IconHeart'} style={ style.div }>
        <div style={ style.before }></div>
        <div style={ style.after }></div>
      </div>
    );
  }

  static getShare( overStyle, params = {}){
    const style = Icon.getOveredStyle( IconStyle.getShare(params), overStyle );
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

  static getMoney( overStyle, params = {} ){
    const style = Icon.getOveredStyle( IconStyle.getMoney(params), overStyle );
    return (
      <div data-component-type={'IconMoney'} style={ style.div } >
        <div style={ style.outer }>
          <div style={ style.inner }></div>
        </div>
      </div>
    );
  }

  static getClose( overStyle, params = {} ){
    const style = Icon.getOveredStyle( IconStyle.getClose(params), overStyle );
    return (
      <div data-component-type={'IconClose'} style={ style.div } >
        <div style={ style.circle }>
          <div style={ style.bar1 }/>
          <div style={ style.bar2 }/>
        </div>
      </div>
    );
  }
}
