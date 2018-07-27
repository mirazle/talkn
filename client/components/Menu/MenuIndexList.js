import React, { Component, PropTypes } from "react";
import define from '~/common/define'
import User from 'common/schemas/state/User';
import util from 'common/util';
import conf from 'common/conf';
import Icon from 'client/components/Icon';
import MenuIndexListStyle from 'client/style/Menu/MenuIndexList';

export default class MenuIndexList extends Component {

  constructor(props) {
    super(props);
    const {style} = props.state;
    this.state = {style}
    this.getDecolationProps = this.getDecolationEvents.bind(this);
  }

  getDecolationEvents( focusConnection, styleKey ){
    const { menuIndex, onClickOtherThread } = this.props;
    return {
      onClick: () => {
        if( !focusConnection ){
          onClickOtherThread();
          talknAPI.find( menuIndex.connection );
        }
      },
    }
  }

  getDispConnection( focusConnection ){
    const { thread, menuIndex } = this.props;
    if( focusConnection ){
      return thread.connection;
    }else if( menuIndex.connection === '/' ){
      return menuIndex.connection.replace( thread.connection, '' );
    }else{
      return "/" + menuIndex.connection.replace( thread.connection, '' );
    }
  }

 	render() {
    const { style } = this.state;
    const { thread, menuIndex } = this.props;
    const focusConnection =  thread.connection === menuIndex.connection ? true : false ;
    const dispConnection = this.getDispConnection( focusConnection )
    const dispFavicon = `//${conf.assetsIconPath}${util.getSaveFaviconName( menuIndex.favicon )}` ;

    const styleKey = focusConnection ? 'activeLiSelf' : 'unactiveLiSelf' ;
    const baseBackground = focusConnection ? MenuIndexListStyle.activeLiBackground : MenuIndexListStyle.unactiveLiBackground;
    const baseBorderRightColor = focusConnection ? MenuIndexListStyle.activeLiBorderRightColor : MenuIndexListStyle.unactiveLiBorderRightColor;
    const baseStyle = {
      ...style.menuIndexList[ styleKey ],
      background: baseBackground,
      borderRightColor: baseBorderRightColor,
    };

    return (
      <li style={ baseStyle } { ...this.getDecolationEvents( focusConnection, styleKey ) }>

        <div style={style.menuIndexList.upper}>
          <span style={style.menuIndexList.upperSpace} />
          <span style={style.menuIndexList.upperRight}>{dispConnection}</span>
        </div>

        <div style={style.menuIndexList.bottom}>
          <span style={{...style.menuIndexList.bottomIcon, backgroundImage: `url( ${dispFavicon} )`}} />
          <span style={style.menuIndexList.bottomPost} dangerouslySetInnerHTML={{__html: menuIndex.post }} />
        </div>

      </li>
    )
 	}
}
