import React from 'react';

import TalknComponent from 'client/components/TalknComponent';

type Props = {
  state: any;
};
type State = unknown;

export default class LoadingLogo extends TalknComponent<Props, State> {
  constructor(props) {
    super(props);
    this.componentName = 'LoadingLogo';
  }
  render() {
    return <div className={this.componentName}></div>;
  }
}
