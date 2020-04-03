import React from "react";
import TalknComponent from "client/components/TalknComponent";
import ClientState from "client/store/";
import Ui from "client/store/Ui";
import Icon from "client/components/Icon";
import MenuIndexList from "client/components/Menu/MenuIndexList";

interface Props {
  clientState: ClientState;
  onClickOtherThread?: any;
}

export default class MenuLogs extends TalknComponent<Props, {}> {
  handleOnKeyPress: any;
  handleOnChange: any;
  componentDidUpdate() {
    const { actionLog } = this.apiState;
    const { ui } = this.props.clientState;

    switch (actionLog[0]) {
      case "API_TO_CLIENT[EMIT]:changeThread":
        switch (ui.screenMode) {
          case Ui.screenModeSmallLabel:
            ui.isOpenMenu = ui.isOpenMenu ? false : true;
            this.clientAction("ON_CLICK_TOGGLE_DISP_MENU", { ui });
            break;
        }
    }
  }

  renderLi() {
    return null;
    /*
    const { onClickOtherThread } = this.props;
    const { menuLogs } = this.apiState;
    return menuLogs.map((mi, index) => {
      return null;
      return (
        <MenuIndexList
          key={mi.ch}
          menuIndexList={mi}
          onClickOtherThread={onClickOtherThread}
          {...this.props.clientState}
        />
      );
    });
    */
  }

  render() {
    const { thread } = this.apiState;
    const { style } = this.props.clientState;
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
