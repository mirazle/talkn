import React, { Component } from "react";
import App from "common/schemas/state/App";
import Thread from "common/schemas/state/Thread";
import conf from "common/conf";
import Icon from "client/components/Icon";
import MenuIndexList from "client/components/Menu/MenuIndexList";

interface Props {
  state: any;
  handleOnClickCh?: any;
  onClickToTimelineThread?: any;
  onClickToMultiThread?: any;
  onClickToSingleThread?: any;
  onClickToChildThread?: any;
  onClickToLogsThread?: any;
}

interface State {
  rootCh: any;
  style: any;
}
export default class MenuIndex extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    const { app, style } = props.state;
    const { rootCh } = app;
    this.state = { rootCh, style: style.menuIndex.headerUpdateIcon };
    this.handleOnClickUpdate = this.handleOnClickUpdate.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnKeyPress = this.handleOnKeyPress.bind(this);
  }

  getDecolationProps() {
    return {};
    /*
    return {
      onMouseOver: () => {
        this.setState(
          { style:
            {...this.state.style,
              transition: '200ms',
              transform: 'scale( 1.1 ) rotate( 0deg )'
            }
          }
        );
      },
      onMouseLeave: () => {
        this.setState( {style:
          {...this.state.style,
            transition: '600ms',
            transform: 'scale( 1 ) rotate( 0deg )'
          }
        });
      },
      onMouseDown: () => {
        this.setState( {style:
          {...this.state.style,
            transform: 'scale( 0.9 ) rotate( 180deg)'
          }
        });
      },
      onMouseUp: () => {
        this.setState( {style:
          {...this.state.style,
            transform: 'scale( 1 ) rotate( 0deg )'
          }
        });
      },
    }
    */
  }

  handleOnClickUpdate(ch) {
    const { rootCh } = this.props.state.app;
    window.talknAPI.findMenuIndex(rootCh);
  }

  handleOnChange(e) {
    this.setState({ rootCh: e.target.value });
  }

  handleOnKeyPress(e) {
    if (e.nativeEvent.keyCode === 13) {
      const value = e.target.value;
      let href = "";
      if (value.indexOf("http://") === 0) {
        href = value.replace(/^http:\//, "");
      } else if (value.indexOf("https://") === 0) {
        href = value.replace(/^https:\//, "");
      } else if (value.indexOf("//") === 0) {
        href = value.replace(/^\/\//, "/");
      } else if (value.indexOf("/") === 0) {
        href = value;
      } else {
        href = `/${value}`;
      }
      location.href = `https://${conf.domain}${href}`;
    }
  }

  componentDidUpdate() {
    const { app, actionLog } = this.props.state;
    switch (actionLog[0]) {
      case "SERVER_TO_CLIENT[EMIT]:changeThread":
        switch (app.screenMode) {
          case App.screenModeSmallLabel:
            if (!app.isLinkCh) {
              window.talknAPI.onClickToggleDispMenu();
            }
            break;
        }
    }
  }

  renderLi() {
    const { state, handleOnClickCh } = this.props;

    const { app, thread, menuIndex, style } = state;
    return menuIndex.map((mi, index) => {
      return (
        <MenuIndexList
          key={`${mi.ch}_${index}`}
          id={`${mi.ch}_${index}`}
          app={app}
          thread={thread}
          menuIndexList={mi}
          handleOnClickCh={handleOnClickCh}
          rank={index}
          style={style.menuIndexList}
        />
      );
    });
  }

  render() {
    const headerUpdateIconStyle = this.state.style;
    const { style } = this.props.state;
    const { icon } = style;
    const IconCh = Icon.getCh(icon.ch);
    const IconTune = Icon.getTune(icon.tune);
    const IconSearch = Icon.getSearch(icon.search);
    return (
      <nav data-component-name={"MenuIndex"} style={style.menuIndex.self}>
        <header style={style.menuIndex.header}>
          <div style={style.menuIndex.headerSearchIcon}>{IconTune}</div>
          <input
            type={"text"}
            style={style.menuIndex.headerInput}
            onChange={this.handleOnChange}
            onKeyPress={this.handleOnKeyPress}
            placeholder={"CH"}
            value={this.state.rootCh}
          />
          <div
            style={headerUpdateIconStyle}
            //            onClick={this.handleOnClickUpdate}
            {...this.getDecolationProps()}
          >
            {/* IconUpdate */}
            <select onChange={window.talknAPI.onChangeFindType} style={style.menuIndex.headerFindSelect}>
              <option>{Thread.findTypeAll}</option>
              <option>{Thread.findTypeHtml}</option>
              <option>{Thread.findTypeMusic}</option>
              <option>{Thread.findTypeVideo}</option>
            </select>
          </div>
        </header>

        <ol style={style.menuIndex.ol}>{this.renderLi()}</ol>
      </nav>
    );
  }
}
