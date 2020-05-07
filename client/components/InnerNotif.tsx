import React, { Component } from "react";
import TalknComponent from "client/components/TalknComponent";
import state from "client/store/";
import { default as InnerNotifStyle } from "client/style/InnerNotif";

interface InnerNotifProps {
  state: any;
  openInnerNotif?: any;
  handleOnClickToggleDetail?: any;
  handleOnClickToggleMain?: any;
}

interface InnerNotifState {
  style: any;
  notif: any;
  isDebug: boolean;
}

export default class InnerNotif extends TalknComponent<InnerNotifProps, InnerNotifState> {
  constructor(props) {
    super(props);
    const { innerNotif: style } = this.props.state.style;
    const notif = this.props.state.ui.openInnerNotif;
    this.state = { style, notif, isDebug: false };
  }

  componentWillReceiveProps(props) {
    const { ui } = props.state;
    const { style } = this.state;
    const height = props.state.style.innerNotif.self.height;
    const notif = ui.openInnerNotif;

    if (style.self.height !== height) {
      if (height === `${InnerNotifStyle.selfHeight}px`) {
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
      return <div data-component-name={"InnerNotif"} style={style.self} dangerouslySetInnerHTML={{ __html: notif }} />;
    } else {
      return (
        <div data-component-name={"InnerNotif"} style={style.self}>
          {notif}
        </div>
      );
    }
  }
}
