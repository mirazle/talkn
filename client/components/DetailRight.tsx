import React from "react";
import TalknComponent from "client/components/TalknComponent";
import ClientState from "client/store/";
import Detail from "client/components/Detail";
import DetailStyle from "client/style/Detail";

interface Props {
  clientState: ClientState;
}

export default class DetailRight extends TalknComponent<Props, {}> {
  render() {
    this.props.clientState.style.detail.self = this.props.clientState.style.detail[
      `self${DetailStyle.detailRightSelfKey}`
    ];
    return <Detail {...this.props} />;
  }
}
