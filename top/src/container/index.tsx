import React from 'react';
import { connect } from 'react-redux';

import handles from 'client/actions/handles';
import TalknComponent from 'client/components/TalknComponent';
import componentDidUpdates from 'client/container/componentDidUpdates';
import mapToStateToProps from 'client/mapToStateToProps/';

interface ContainerProps {
  state: any;
  onClickOpenLockMenu: (any?) => any;
  onClickTogglePosts: (any?) => any;
  onClickToggleDispDetail: (any?) => any;
  onClickToggleMain: (any?) => any;
  toggleDispPostsSupporter: (any?) => any;
  onClickMultistream: (any?) => any;
}

interface ContainerState {
  notifs: any;
}

class Container extends TalknComponent<ContainerProps, ContainerState> {
  constructor(props: ContainerProps) {
    super(props);
    const { ui, thread } = props.state;
    this.state = { notifs: [] };
  }

  componentDidMount() {
    this.clientAction('COMPONENT_DID_MOUNTS', 'Container');
  }

  componentDidUpdate() {
    componentDidUpdates(this, 'Container');
  }
  render() {
    const { ranks } = this.props.state;

    console.log(ranks);

    return <>HOHO</>;
  }
}
export default connect(mapToStateToProps, { ...handles })(Container);
