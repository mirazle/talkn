import React, { Component } from "react";
import BoardStyle from 'client/style/Board';
import LinkStyle from 'client/style/Link';
import MenuIndexListStyle from 'client/style/Menu/MenuIndexList';

export default class Link extends Component {

  constructor(props) {
    super(props);
    const {active, state} = props;
    const {link} = state.style;
    this.getEvents = this.getEvents.bind( this );
    this.state = {
      active,
      style: link.unactiveLi
    };
  }

  getEvents( active ){
    const { style } = this.state;
    if( !active ){
      return {
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
    const { active, style } = this.state;
    const { text, handleOnClick,  } = this.props;
    let { upperRankWrap, upperRank } = this.props.state.style.menuIndexList;
    const background = MenuIndexListStyle.getDispRankBackground( 0 );
    const width = BoardStyle.tuneSize;

    if( active ){
      return (
        <li
          key={`linkTune`}
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
        <li
          style={style}
          onClick={handleOnClick}
          {...this.getEvents(active)}
        >
          { text }
        </li>
      );
    }
 	}
}