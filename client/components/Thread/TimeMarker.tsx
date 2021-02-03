import React from "react";
import TalknComponent from "client/components/TalknComponent";

interface TimeMarkerProps {
  style: object;
  label: any;
  type: "Fix" | "List";
}

interface TimeMarkerState {}

export default class TimeMarker extends TalknComponent<TimeMarkerProps, TimeMarkerState> {
  constructor(props) {
    super(props);
  }

  render() {
    const { label, style, type } = this.props;
    return (
      <li data-component-name={`TimeMarker${type}`} style={style}>
        {label}
      </li>
    );
  }
}
