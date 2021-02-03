import React from "react";
import TalknComponent from "client/components/TalknComponent";
import ClientState from "client/store/";
import Detail from "client/components/Detail";
import DetailStyle from "client/style/Detail";

interface DetailModalProps {
  state: any;
}

export default class DetailModal extends TalknComponent<DetailModalProps, {}> {
  render() {
    this.props.state.style.detail.self = this.props.state.style.detail[`self${DetailStyle.detailModalSelfKey}`];
    return <Detail {...this.props} />;
  }
}
