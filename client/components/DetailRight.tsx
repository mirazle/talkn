import React, { Component } from "react";
import Detail from "client/components/Detail";
import DetailStyle from "client/style/Detail";

interface Props {
  state: any;
}

export default class DetailRight extends Component<Props> {
  render() {
    this.props.state.style.detail.self = this.props.state.style.detail[
      `self${DetailStyle.detailRightSelfKey}`
    ];
    return <Detail {...this.props} />;
  }
}
