import React, { Component, PropTypes } from "react";
import Container from 'client/style/Container';
import User from 'common/schemas/state/User';
import util from 'common/util';
import conf from 'common/conf';
import Icon from '../Icon';
import MenuIndexList from './MenuIndexList';

export default class MenuIndex extends Component {

  renderLi(){
    const { style, menuIndex, thread } = this.props.state;
    return menuIndex.map( ( mi, index ) => {
      return (
        <MenuIndexList
          key={ mi.connection }
          thread={ thread }
          menuIndex={mi}
          {...this.props}
        />
      )
    });
  }

 	render() {
    const { style, thread } = this.props.state;
    const { connection } = thread;
    const { icon } = style;
    const Search = Icon.getSearch( icon.search );
    const dispConnection = connection.replace( '/', '' );
		return (
      <nav style={style.menuIndex.self}>

        <header style={style.menuIndex.header}>
          <span style={style.menuIndex.headerSearchIcon}>
            { Search }
          </span>
          <button style={style.menuIndex.headerRootConnection}>/</button>
          <span style={style.menuIndex.headerConnection}>
            <input
              type={ 'text' }
              style={style.menuIndex.headerInput}
              rows={1}
              onChange={this.handleOnChange}
              onKeyPress={this.handleOnKeyPress}
              defaultValue={ dispConnection }
//              placeholder='Search Thread .'
            />
          </span>
        </header>

        <ol style={style.menuIndex.ol}>
          {this.renderLi()}
        </ol>
      </nav>
		);
 	}
}
