import React from 'react';

import TalknComponent from 'client/components/TalknComponent';
import { default as ContainerStyle } from 'client/style/Container';

type InnerNotifProps = {
  state: any;
  openInnerNotif?: any;
  handleOnClickToggleDetail?: any;
  handleOnClickToggleMain?: any;
};

type InnerNotifState = {
  style: any;
  notif: any;
  isDebug: boolean;
};

export default class InnerNotif extends TalknComponent<InnerNotifProps, InnerNotifState> {
  constructor(props) {
    super(props);
    this.componentName = 'InnerNotif';
    const { innerNotif: style } = this.props.state.style;
    const notif = this.props.state.ui.openInnerNotif;
    this.state = { style, notif, isDebug: false };
  }

  UNSAFE_componentWillReceiveProps(props) {
    const { app, ui } = props.state;
    const { style } = this.state;
    const height = props.state.style.innerNotif.self.height;
    const notif = ui.openInnerNotif;

    if (style.self.height !== height) {
      if (height === `${ContainerStyle.getBlockSize({ app, ui })}px`) {
        setTimeout(props.closeInnerNotif, 3000);
      }

      this.setState({
        notif,
        style: { ...style, self: { ...style.self, height } },
      });
    }
  }

  render() {
    const { style, notif, isDebug } = this.state;
    if (isDebug) {
      return <div data-component-name={this.componentName} style={style.self} dangerouslySetInnerHTML={{ __html: notif }} />;
    } else {
      return (
        <div data-component-name={this.componentName} style={style.self}>
          {notif}
        </div>
      );
    }
  }
}
