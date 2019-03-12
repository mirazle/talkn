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
    const {menuIndexList: style} = props.style;
    this.state = {style}
    this.onClickEvents = this.onClickEvents.bind(this);
    this.getDecolationEvents = this.getDecolationEvents.bind(this);
  }

  componentDidMount(){
    const { app, menuIndexList } = this.props;
    if( app.rootConnection === menuIndexList.connection ){
      talknAPI.onCatchConnectionAPI( menuIndexList.connection );
    }
  }

  getDecolationEvents(styleKey){
    if( styleKey ===  MenuIndexListStyle.unactiveLiSelfLabel ){
      return {
        onMouseOver: () => {
          this.setState(
            { style:
              {...this.state.style,
                [ styleKey ]: { ...this.state.style[ styleKey ],
                  background: MenuIndexListStyle[ `${styleKey}MouseOverBackground` ]
                } 
              },
            }
          );
        },
        onMouseLeave: () => {
          this.setState( {style:
            {...this.state.style,
              [styleKey]: { ...this.state.style[ styleKey ],
                background: MenuIndexListStyle[ `${styleKey}Background` ]
              }
            }
          });
        },
        onMouseDown: () => {
          this.setState( {style:
            {...this.state.style,
              [styleKey]: { ...this.state.style[ styleKey ],
                background: MenuIndexListStyle[ `${styleKey}MouseDownBackground` ]
              }
            },
          });
        },
        onMouseUp: () => {
          this.setState( {style:
            {...this.state.style,
              [styleKey]: { ...this.state.style[ styleKey ],
                background: MenuIndexListStyle[ `${styleKey}MouseOverBackground` ]
              }
            },
          });
        },
      }
    }
  }

  onClickEvents(){
    const { thread, menuIndexList, onClickToMultiThread, onClickToSingleThread, onClickToChildThread, onClickToLogsThread } = this.props;
    const { connection } = menuIndexList;
    const isFocusConnection =  thread.connection === connection ? true : false ;
    const styleKey = isFocusConnection ? MenuIndexListStyle.activeLiSelfLabel : MenuIndexListStyle.unactiveLiSelfLabel ;
    let { app } = this.props;

    if( isFocusConnection ){
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

    this.setState( {style:
      {...this.state.style,
        [styleKey]: { ...this.state.style[ styleKey ],
          background: MenuIndexListStyle[ `${styleKey}Background` ]
        }
      },
    });
  }

  getDispRank( rank ){
    let { upperRankWrap, upperRank } = this.state.style;

    if( rank ){
      const background = MenuIndexListStyle.getDispRankBackground( rank );
      const width = MenuIndexListStyle.getDispRankWidth( rank );
      return (
        <span style={{...upperRankWrap, background, width}}>
          <span style={upperRank}>
            RANK{rank}
          </span>
        </span>
      )
    }else{
      return null
    }
  }

  getDispConnection( isFocusConnection ){
    const { thread, menuIndexList } = this.props;
    if( isFocusConnection ){
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

  getDispFavicon(){
    const { isFocusConnection } = this.state;
    const { thread, menuIndexList } = this.props;
    const defaultFavicon = Thread.getDefaultFavicon();

    if( isFocusConnection ){
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
        <span style={style.bottomWatchCnt}>
          <span style={style.bottomWatchCntWrap}>
            {menuIndexList.watchCnt}
          </span>
        </span>
      )
    }else{
      return (
        <span style={style.bottomWatchCnt}>
        </span>
      )
    }
  }

 	render() {
    const { style } = this.state;
    const { thread, menuIndexList, rank } = this.props;
    const isFocusConnection =  thread.connection === menuIndexList.connection ? true : false ;
    const styleKey = isFocusConnection ? MenuIndexListStyle.activeLiSelfLabel : MenuIndexListStyle.unactiveLiSelfLabel ;
    const title = menuIndexList.title;
    const dispRank = this.getDispRank( rank );
    const dispFavicon = this.getDispFavicon()
    const dispWatchCnt = this.getDispWatchCnt();
    const baseStyle = style[ styleKey ];

    //if( styleKey === MenuIndexListStyle.unactiveLiSelfLabel ) console.log(baseStyle.borderRight);

    return (
      <li
        data-component-name={this.constructor.name}
        key={menuIndexList.connection}
        style={ baseStyle }
        onClick={this.onClickEvents}
        { ...this.getDecolationEvents(styleKey) }
      >
        {dispRank}
        <div style={style.upper}>
          <span style={style.upperSpace} />
          <span style={style.upperRight}>
            <Marquee
              text={title}
              loop={true}
              hoverToStop={false}
              trailing={0}
              leading={0}
            />
          </span>
        </div>

        <div style={style.bottom}>
          <span style={{...style.bottomIcon, backgroundImage: `url( ${dispFavicon} )`}} />
          <span style={style.bottomPost} dangerouslySetInnerHTML={{__html: menuIndexList.post }} />
          {dispWatchCnt}
        </div>
      </li>
    )
 	}
}
