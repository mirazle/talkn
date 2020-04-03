import React from "react";
import TalknComponent from "client/components/TalknComponent";
import ClientState from "client/store/";
import Detail from "client/components/Detail";
import DetailStyle from "client/style/Detail";

interface DetailModalProps {
  clientState: ClientState;
}

export default class DetailModal extends TalknComponent<DetailModalProps, {}> {
  render() {
    this.props.clientState.style.detail.self = this.props.clientState.style.detail[
      `self${DetailStyle.detailModalSelfKey}`
    ];
    return <Detail {...this.props} />;
  }
}
