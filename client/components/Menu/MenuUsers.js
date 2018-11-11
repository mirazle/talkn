import React, { Component } from "react";
import Marquee from 'react-marquee';
import TwitterLi from 'client/components/Menu/TwitterLi';

export default class MenuUsers extends Component {

  renderFriendLiLabel( name, icon, connection ){
    const { style } = this.props.state;
    const href = `/${connection}`;
    const label = connection ?
      (<div style={ style.menuUsers.namesAddConnection }>
          <Marquee
            text={name}
            loop={true}
            hoverToStop={false}
            trailing={0}
            leading={0}
          />
          <Marquee
            text={connection}
            loop={true}
            hoverToStop={false}
            trailing={0}
            leading={0}
          />
      </div>) :
      (<div style={ style.menuUsers.names }><br />{ name }</div>) ;

    return(
      <a style={ style.menuUsers.wrap } href={ href } data-li-a>
        <div style={style.menuUsers.imgWrap}>
          <img style={ style.menuUsers.img } src={ icon } />
        </div>
        { label }
      </a>
    );
  }

 	render() {
    const { style } = this.props.state;
		return (
      <div data-component-name={this.constructor.name} style={ style.menuUsers.self}>
        <ol style={ style.menuUsers.columns }>
        </ol>
      </div>
		);
 	}
}
