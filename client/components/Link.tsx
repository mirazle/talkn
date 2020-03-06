import React, { Component } from "react";
import TalknComponent from "client/components/TalknComponent";
import ClientState from "client/store/";
import BoardStyle from "client/style/Board";
import LinkStyle from "client/style/Link";
import MenuIndexListStyle from "client/style/Menu/MenuIndexList";
import Marquee from "client/container/util/Marquee";

interface LinkProps {
  clientState: ClientState;
  text: string;
  handleOnClick?: any;
  isMainCh: boolean;
  isActive: boolean;
  ch: string;
}

interface LinkState {
  style: any;
  isActive: boolean;
}

export default class Link extends TalknComponent<LinkProps, LinkState> {
  constructor(props) {
    super(props);
    const { isActive, clientState } = props;
    const { link } = clientState.style;
    this.getEvents = this.getEvents.bind(this);
    this.state = {
      isActive,
      style: link.unactiveLi
    };
  }

  getEvents(isActive) {
    const { style } = this.state;
    if (!isActive) {
      return {
        onClick: this.props.handleOnClick,
        onMouseOver: () => {
          this.setState({
            style: { ...style, background: LinkStyle.activeBgColor }
          });
        },
        onMouseLeave: () => {
          this.setState({
            style: { ...style, background: LinkStyle.unactiveBgColor }
          });
        }
      };
    } else {
      return {};
    }
  }

  render() {
    const { isActive, style } = this.state;
    const { text } = this.props;
    let { upperRankWrap, upperRank } = this.props.clientState.style.menuIndexList;
    const background = MenuIndexListStyle.getDispRankBackground(0);
    const width = BoardStyle.tuneSize;

    if (isActive) {
      return (
        <li style={this.props.clientState.style.link.tuneLi}>
          <span style={{ ...upperRankWrap, background, width }}>
            <span style={upperRank}>TUNE</span>
          </span>
          <Marquee text={text} loop={true} hoverToStop={false} trailing={0} leading={0} />
        </li>
      );
    } else {
      return (
        <li style={style} {...this.getEvents(isActive)}>
          <Marquee text={text} loop={true} hoverToStop={false} trailing={0} leading={0} />
        </li>
      );
    }
  }
}
