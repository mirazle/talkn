import React, { Component } from "react";
import TalknComponent from "client/components/TalknComponent";
import ClientState from "client/store/";
import { default as InnerNotifStyle } from "client/style/InnerNotif";

interface InnerNotifProps {
  clientState: ClientState;
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
    const { innerNotif: style } = this.props.clientState.style;
    const notif = this.props.clientState.ui.openInnerNotif;
    this.state = { style, notif, isDebug: false };
  }

  componentWillReceiveProps(props) {
    const { ui } = props.clientState;
    const { style } = this.state;
    const height = props.clientState.style.innerNotif.self.height;
    const notif = ui.openInnerNotif;

    if (style.self.height !== height) {
      if (height === `${InnerNotifStyle.selfHeight}px`) {
        setTimeout(props.closeInnerNotif, 3000);
      }

      this.setState({
        notif,
        style: { ...style, self: { ...style.self, height } }
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
