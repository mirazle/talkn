import React from "react";
import TalknComponent from "client/components/TalknComponent";
import Detail from "client/components/Detail";
import DetailStyle from "client/style/Detail";

type Props = {
  state: any;
}

type State = unknown;

export default class DetailRight extends TalknComponent<Props, State> {
  constructor(props) {
    super(props);
    this.componentName = 'DetailRight';
  }
  render() {
    this.props.state.style.detail.self = this.props.state.style.detail[`self${DetailStyle.detailRightSelfKey}`];
    return <Detail data-component-name={this.componentName} {...this.props} />;
  }
}
