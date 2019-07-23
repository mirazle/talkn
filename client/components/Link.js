import React, { Component } from "react";
import BoardStyle from 'client/style/Board';
import LinkStyle from 'client/style/Link';
import MenuIndexListStyle from 'client/style/Menu/MenuIndexList';

export default class Link extends Component {

  constructor(props) {
    super(props);
    const {isActive, state} = props;
    const {link} = state.style;
    this.getEvents = this.getEvents.bind( this );
    this.state = {
      isActive,
      style: link.unactiveLi
    };
  }

  getEvents( isActive ){
    const { style } = this.state;
    if( !isActive ){
      return {
        onClick: this.props.handleOnClick,
        onMouseOver: () => {
          this.setState({
            style: {...style,
              background: LinkStyle.activeBgColor
            }
          });
        },
        onMouseLeave: () => {
          this.setState({
            style: {...style,
              background: LinkStyle.unactiveBgColor
            }
          });
        }
      };
    }else{
      return {};
    }
  }

 	render() {
    const { isActive, style } = this.state;
    const { text } = this.props;
    let { upperRankWrap, upperRank } = this.props.state.style.menuIndexList;
    const background = MenuIndexListStyle.getDispRankBackground( 0 );
    const width = BoardStyle.tuneSize;

    if( isActive ){
      return (
        <li
          style={this.props.state.style.link.tuneLi}
        >
          <span style={{...upperRankWrap, background, width}}>
            <span style={upperRank}>
              TUNE
            </span>
          </span>
          <span>
            {text}
          </span>
        </li>
      );
    }else{
      return (
        <li style={style} {...this.getEvents(isActive)}>
          { text }
        </li>
      );
    }
 	}
}