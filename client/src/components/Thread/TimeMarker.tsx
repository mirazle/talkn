import React from 'react';

import TalknComponent from 'client/components/TalknComponent';

type TimeMarkerProps = {
  style: object;
  label: any;
  type: 'Fix' | 'List';
};

type TimeMarkerState = unknown;

export default class TimeMarker extends TalknComponent<TimeMarkerProps, TimeMarkerState> {
  constructor(props) {
    super(props);
    this.componentName = 'TimeMarker';
  }

  render() {
    const { label, style, type } = this.props;
    return (
      <li data-component-name={`${this.componentName}${type}`} style={style}>
        {label}
      </li>
    );
  }
}
