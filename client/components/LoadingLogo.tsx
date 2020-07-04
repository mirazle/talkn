import React from "react";
import TalknComponent from "client/components/TalknComponent";

interface Props {
  state: any;
}
interface State {}

export default class LoadingLogo extends TalknComponent<Props, State> {
  constructor(props) {
    super(props);
  }
  render() {
    return <div className={"LogoScreen"}></div>;
  }
}
