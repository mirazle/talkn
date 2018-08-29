import React, { Component, PropTypes } from "react";
import define from 'common/define'
import App from 'common/schemas/state/App';
import User from 'common/schemas/state/User';
import Thread from 'common/schemas/state/Thread';
import util from 'common/util';
import conf from 'common/conf';
import Icon from 'client/components/Icon';
import MenuIndexListStyle from 'client/style/Menu/MenuIndexList';

export default class MenuIndexList extends Component {

  constructor(props) {
    super(props);
    const {style} = props;
    this.state = {style}
    this.getDecolationProps = this.getDecolationEvents.bind(this);
  }

  componentDidMount(){
    const { menuIndexList } = this.props;
    talknAPI.onCatchConnectionAPI( menuIndexList.connection );
  }

  componentWillUnmount(){
    const { menuIndexList } = this.props;
    //talknAPI.offCatchConnectionAPI( menuIndexList.connection );
  }

  getDecolationEvents( focusConnection, styleKey ){
    const { app, menuIndexList, onClickOtherThread } = this.props;
    return {
      onClick: () => {
        if( !focusConnection ){
          onClickOtherThread( menuIndexList.connection );
          talknAPI.changeThread( menuIndexList.connection );
        }else{
          switch( app.screenMode ){
          case App.screenModeSmallLabel :
            app.isOpenMenu = app.isOpenMenu ? false : true;
            talknAPI.onClickToggleDispMenu( app );
            break;
          }
        }
      },
    }
  }

  getDispConnection( focusConnection ){
    const { thread, menuIndexList } = this.props;
    if( focusConnection ){
      return thread.connection;
    }else{
      if( menuIndexList.connection === '/' ){
        return menuIndexList.connection.replace( thread.connection, '' );
      }else{
        return  menuIndexList.connection.indexOf("//") === 0 ?
          menuIndexList.connection.replace( '//', '/' ) : menuIndexList.connection ;
      }
    }
  }

  getDispFavicon( focusConnection ){
    const { thread, menuIndexList } = this.props;
    const defaultFavicon = Thread.getDefaultFavicon();

    if( focusConnection ){
      if( menuIndexList.favicon === defaultFavicon ){
        if( thread.favicon === defaultFavicon ){
          return `//${conf.assetsIconPath}${util.getSaveFaviconName( menuIndexList.favicon )}`;
        }else{
          return thread.favicon;
        }
      }else{
        return menuIndexList.favicon;
      }
    }else{
      if( menuIndexList.favicon === defaultFavicon ){
        return `//${conf.assetsIconPath}${util.getSaveFaviconName( menuIndex.favicon )}`;
      }else{
        return menuIndexList.favicon;
      }
    }
  }

 	render() {
    const { style } = this.state;
    const { thread, menuIndexList } = this.props;
    const focusConnection =  thread.connection === menuIndexList.connection ? true : false ;
    const dispConnection = this.getDispConnection( focusConnection )
    const dispFavicon = this.getDispFavicon( focusConnection )
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
          <span style={style.menuIndexList.bottomPost} dangerouslySetInnerHTML={{__html: menuIndexList.post }} />
          <span style={style.menuIndexList.bottomWatchCnt}>
            <span style={style.menuIndexList.bottomWatchCntWrap}>
              {menuIndexList.watchCnt}
            </span>
          </span>
        </div>

      </li>
    )
 	}
}
