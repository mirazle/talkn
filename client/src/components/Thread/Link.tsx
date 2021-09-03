import React, { Component } from 'react';

import TalknComponent from 'client/components/TalknComponent';
import Marquee from 'client/container/util/Marquee';
import BoardStyle from 'client/style/Board';
import LinkStyle from 'client/style/Link';
import ChStyle from 'client/style/Menu/common/Ch';

type LinkProps = {
  state: any;
  text: string;
  handleOnClick?: any;
  isMainCh: boolean;
  isActive: boolean;
  ch: string;
};

type LinkState = {
  style: any;
  isActive: boolean;
};

export default class Link extends TalknComponent<LinkProps, LinkState> {
  constructor(props) {
    super(props);
    this.componentName = 'Link';
    const { isActive, state } = props;
    const { link } = state.style;
    this.getEvents = this.getEvents.bind(this);
    this.state = {
      isActive,
      style: link.unactiveLi,
    };
  }

  getEvents(isActive) {
    const { style } = this.state;
    if (!isActive) {
      return {
        onClick: this.props.handleOnClick,
        onMouseOver: () => {
          this.setState({
            style: { ...style, background: LinkStyle.activeBgColor },
          });
        },
        onMouseLeave: () => {
          this.setState({
            style: { ...style, background: LinkStyle.unactiveBgColor },
          });
        },
      };
    } else {
      return {};
    }
  }

  render() {
    const { isActive, style } = this.state;
    const { text } = this.props;
    let { upperRankWrap, upperRank } = this.props.state.style.ch;
    const background = ChStyle.getDispRankBackground(0);
    const width = BoardStyle.tuneSize;

    if (isActive) {
      return (
        <li data-componet-name={this.componentName} style={this.props.state.style.link.tuneLi}>
          <span style={{ ...upperRankWrap, background, width }}>
            <span style={upperRank}>TUNE</span>
          </span>
          <Marquee text={text} loop={true} hoverToStop={false} trailing={0} leading={0} />
        </li>
      );
    } else {
      return (
        <li data-componet-name={this.componentName} style={style} {...this.getEvents(isActive)}>
          <Marquee text={text} loop={true} hoverToStop={false} trailing={0} leading={0} />
        </li>
      );
    }
  }
}
