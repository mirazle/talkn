import React, { Component } from 'react';

import TalknComponent from 'client/components/TalknComponent';
import LiveCntStyle from 'client/style/common/LiveCnt';

type LiveCntProps = {
  number: number;
  style: any;
  didMountHighlight: boolean;
  ch?: string;
};

type LiveCntState = {
  style: any;
};

export default class LiveCnt extends TalknComponent<LiveCntProps, LiveCntState> {
  constructor(props) {
    super(props);
    const { style } = props;
    this.componentName = 'LiveCnt';
    this.state = { style: style.div };
  }

  componentDidMount() {
    if (this.props.didMountHighlight) {
      this.setState({
        style: {
          ...this.state.style,
          boxShadow: LiveCntStyle.selfBoxShadowOnHighlight,
        },
      });

      setTimeout(() => {
        this.setState({
          style: {
            ...this.state.style,
            boxShadow: LiveCntStyle.selfBoxShadowOffHighlight,
          },
        });
      }, 400);
    }
  }
  componentDidUpdate(beforeProps) {
    if (beforeProps.number < this.props.number) {
      this.setState({
        style: {
          ...this.state.style,
          boxShadow: LiveCntStyle.selfBoxShadowOnHighlight,
        },
      });

      setTimeout(() => {
        this.setState({
          style: {
            ...this.state.style,
            boxShadow: LiveCntStyle.selfBoxShadowOffHighlight,
          },
        });
      }, 400);
    }
  }

  render() {
    const { number, style } = this.props;
    return (
      <span data-component-name={this.componentName} style={this.state.style}>
        <span style={style.circle}>{number}</span>
      </span>
    );
  }
}
