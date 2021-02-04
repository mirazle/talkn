import React from "react";
import TalknComponent from "client/components/TalknComponent";
import Detail from "client/components/Detail";
import DetailStyle from "client/style/Detail";

type DetailModalProps = {
  state: any;
}

export default class DetailModal extends TalknComponent<DetailModalProps, {}> {
  constructor(props) {
    super(props);
    this.componentName = 'DetailModal';
  }
  render() {
    this.props.state.style.detail.self = this.props.state.style.detail[`self${DetailStyle.detailModalSelfKey}`];
    return <Detail data-component-name={this.componentName} {...this.props} />;
  }
}
