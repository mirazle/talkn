import React, { Component } from "react";
import App from "common/schemas/state/App";
import Icon from "client/components/Icon";
import MenuIndexList from "client/components/Menu/MenuIndexList";

interface Props {
  state: any;
  onClickOtherThread?: any;
}

export default class MenuLogs extends Component<Props> {
  handleOnKeyPress: any;
  handleOnChange: any;
  componentDidUpdate() {
    const { app, actionLog } = this.props.state;

    switch (actionLog[0]) {
      case "SERVER_TO_CLIENT[EMIT]:changeThread":
        switch (app.screenMode) {
          case App.screenModeSmallLabel:
            app.isOpenMenu = app.isOpenMenu ? false : true;
            window.talknWindow.parentCoreApi("onClickToggleDispMenu", app);
            break;
        }
    }
  }

  renderLi() {
    const { state, onClickOtherThread } = this.props;
    const { menuLogs } = state;
    return menuLogs.map((mi, index) => {
      return (
        <MenuIndexList key={mi.ch} menuIndexList={mi} onClickOtherThread={onClickOtherThread} {...this.props.state} />
      );
    });
  }

  render() {
    const { style, thread } = this.props.state;
    const { ch } = thread;
    const { icon } = style;
    const Search = Icon.getSearch(icon.search);
    const dispCh = ch.replace("/", "");
    return (
      <nav data-component-name={"MenuLogs"} style={style.menuIndex.self}>
        <header style={style.menuIndex.header}>
          <span style={style.menuIndex.headerSearchIcon}>{Search}</span>
          <span style={style.menuIndex.headerCh}>
            <input
              type={"text"}
              style={style.menuIndex.headerInput}
              onChange={this.handleOnChange}
              onKeyPress={this.handleOnKeyPress}
              defaultValue={""}
            />
          </span>
        </header>
        <ol style={style.menuIndex.ol}>{this.renderLi()}</ol>
      </nav>
    );
  }
}
