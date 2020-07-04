import React from "react";
import { LabelStyle } from "client/style/common";

type LabelProps = {
  htmlFor: string;
};

export const Label: React.FunctionComponent<LabelProps> = (props: LabelProps) => (
  <label style={LabelStyle} htmlFor={props.htmlFor}>
    {props.htmlFor}
  </label>
);
