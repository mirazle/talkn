import React from "react";
import TalknComponent from "client/components/TalknComponent";
import ClientState from "client/store/";
import Detail from "client/components/Detail";
import DetailStyle from "client/style/Detail";

interface Props {
  state: any;
}

export default class DetailRight extends TalknComponent<Props, {}> {
  render() {
    this.props.state.style.detail.self = this.props.state.style.detail[`self${DetailStyle.detailRightSelfKey}`];
    return <Detail {...this.props} />;
  }
}
