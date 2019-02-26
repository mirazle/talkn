import define from 'common/define';
import React, { Component } from "react";
import Marquee from 'react-marquee';
import App from 'common/schemas/state/App';
import Thread from 'common/schemas/state/Thread';
import util from 'common/util';
import conf from 'common/conf';
import Container from 'client/style/Container';
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

  getDecolationEvents( focusConnection, styleKey ){
    const { menuIndexList, onClickToMultiThread, onClickToSingleThread, onClickToChildThread, onClickToLogsThread } = this.props;
    const { connection } = menuIndexList;
    let { app } = this.props;
    return { 
      onClick: () => {
        if( focusConnection ){
          if( app.screenMode === App.screenModeSmallLabel ){
            talknAPI.onClickToggleDispMenu();
          }
        }else{

          const { stepTo } = App.getStepToDispThreadType( {app}, connection );
          switch(stepTo){
          case `${App.dispThreadTypeMulti} to ${App.dispThreadTypeChild}`:
          case `${App.dispThreadTypeSingle} to ${App.dispThreadTypeChild}`:
          case `${App.dispThreadTypeChild} to ${App.dispThreadTypeChild}`:
            onClickToChildThread( connection, {app} );
            talknAPI.changeThread( connection );
            break;
          case `${App.dispThreadTypeChild} to ${App.dispThreadTypeMulti}`:
            onClickToMultiThread( connection, {app} );
            talknAPI.changeThread( connection );
            break;
          case `${App.dispThreadTypeChild} to ${App.dispThreadTypeSingle}`:
            onClickToSingleThread( connection, {app} );
            talknAPI.changeThread( connection );
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
      }else if( !menuIndexList.connection ){
        return "";
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

  getDispWatchCnt(){
    const { style } = this.state;
    const { menuIndexList } = this.props;

    if( menuIndexList.watchCnt === 0 || menuIndexList.watchCnt > 0 ){
      return(
        <span style={style.menuIndexList.bottomWatchCnt}>
          <span style={style.menuIndexList.bottomWatchCntWrap}>
            {menuIndexList.watchCnt}
          </span>
        </span>
      )
    }else{
      return (
        <span style={style.menuIndexList.bottomWatchCnt}>
        </span>
      )
    }
  }

 	render() {
    const { style } = this.state;
    const { thread, menuIndexList } = this.props;
    const focusConnection =  thread.connection === menuIndexList.connection ? true : false ;
    const dispConnection = this.getDispConnection( focusConnection )
    const dispFavicon = this.getDispFavicon( focusConnection )
    const dispWatchCnt = this.getDispWatchCnt();

    const styleKey = focusConnection ? 'activeLiSelf' : 'unactiveLiSelf' ;
    const baseBackground = focusConnection ?
      MenuIndexListStyle.activeLiBackground : MenuIndexListStyle.unactiveLiBackground;
    const baseStyle = {
      ...style.menuIndexList[ styleKey ],
      background: baseBackground
    };

    return (
      <li data-component-name={this.constructor.name}
        key={dispConnection}
        style={ baseStyle }
        { ...this.getDecolationEvents( focusConnection, styleKey ) }>

        <div style={style.menuIndexList.upper}>
          <span style={style.menuIndexList.upperSpace} />
          <span style={style.menuIndexList.upperRight}>
            <Marquee
              text={dispConnection}
              loop={true}
              hoverToStop={false}
              trailing={0}
              leading={0}
            />
          </span>
        </div>

        <div style={style.menuIndexList.bottom}>
          <span style={{...style.menuIndexList.bottomIcon, backgroundImage: `url( ${dispFavicon} )`}} />
          <span style={style.menuIndexList.bottomPost} dangerouslySetInnerHTML={{__html: menuIndexList.post }} />
          {dispWatchCnt}
        </div>
      </li>
    )
 	}
}
