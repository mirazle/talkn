import React, { Component } from "react";
import ReactDOM from "react-dom";

interface Props {
  style: object;
  label: string;
  type: "Fix" | "List";
}

interface State {}

export default class TimeMarker extends Component<Props, State> {
  constructor(props) {
    super(props);
  }

  render() {
    const { label, style, type } = this.props;
    return (
      <li data-component-name={`TimeMarker${type}`} style={style}>
        {`${label}`}
      </li>
    );
  }
}
