import React, { Component, PropTypes } from "react";
import Container from 'client/style/Container';
import User from 'common/schemas/state/User';
import util from 'common/util';
import conf from 'common/conf';
import Icon from './Icon';

export default class MenuIndex extends Component {

  getTimeId( connection ){
    return `timeAgo:${connection}`;
  }
  renderLi(){
    const { style, menuIndex, thread } = this.props.state;

    return menuIndex.map( ( mi ) => {
      if(  mi.connection === '' ) return null;
      const{ connection, post, favicon, createTime } = mi;
      const dispConnection = connection.replace( thread.connection, '@ ' );
      const dispFavicon = conf.assetsIconPath + util.getSaveFaviconName( favicon );
      const styleKey = thread.connection === connection ? 'liActive' : 'liUnactive' ;

      return (
        <li style={style.menuIndex[ styleKey ] } key={ connection }>
          <div style={style.menuIndex.upper}>
            <span style={style.menuIndex.upperSpace} />
            <span style={style.menuIndex.upperRight}>{dispConnection}</span>
          </div>

          <div style={style.menuIndex.bottom}>
            <span style={{...style.menuIndex.bottomIcon, backgroundImage: `url( ${dispFavicon} )`}} />
            <span style={style.menuIndex.bottomPost} dangerouslySetInnerHTML={{__html: post}} />
          </div>
        </li>
      )
    });
  }

 	render() {
    const { style, thread } = this.props.state;
    const { connection } = thread;
    const { icon } = style;
    const Search = Icon.getSearch( icon.search );

		return (
      <nav style={style.menuIndex.self}>

        <header style={style.menuIndex.header}>
          <span style={style.menuIndex.headerSearchIcon}>
            { Search }
          </span>
          <span style={style.menuIndex.headerConnection}>
            @ {connection}
          </span>
        </header>

        <ol style={style.menuIndex.ol}>
          {this.renderLi()}
        </ol>
      </nav>
		);
 	}
}
