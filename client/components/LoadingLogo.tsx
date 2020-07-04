import React from "react";
import TalknComponent from "client/components/TalknComponent";
import Style from "client/components/Style";
import conf from "common/conf";

interface Props {
  state: any;
}
interface State {}

export default class LoadingLogo extends TalknComponent<Props, State> {
  constructor(props) {
    super(props);
  }
  render() {
    return <></>;
  }
}
