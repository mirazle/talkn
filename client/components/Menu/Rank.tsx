import React from "react";
import TalknComponent from "client/components/TalknComponent";
import ClientState from "client/store/";
import Ui from "client/store/Ui";
import Thread from "api/store/Thread";
import conf from "common/conf";
import Icon from "client/components/Icon";
import MenuIndexList from "client/components/Menu/MenuIndexList";

interface RankProps {
  state: any;
  onClickToTimelineThread?: any;
  onClickToMultiThread?: any;
  onClickToSingleThread?: any;
  onClickToChildThread?: any;
  onClickToLogsThread?: any;
  onClickOtherThread?: any;
}

interface RankState {
  rootCh: string;
  style: any;
}
export default class Rank extends TalknComponent<RankProps, RankState> {
  constructor(props) {
    super(props);
    const { app, style } = props.state;
    const { rootCh } = app;
    this.state = { rootCh, style: style.rank.headerUpdateIcon };
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
    this.coreApi("rank", rootCh);
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
    const { ui, app, actionLog } = this.props.state;
    switch (actionLog[0]) {
      case "API_TO_CLIENT[EMIT]:changeThread":
        switch (ui.screenMode) {
          case Ui.screenModeSmallLabel:
            if (!app.isLinkCh) {
              console.log(ui.isOpenMenu);
              this.clientAction("ON_CLICK_TOGGLE_DISP_MENU");
            }
            break;
        }
    }
  }

  render() {
    const headerUpdateIconStyle = this.state.style;
    const { state, onChangeFindType }: any = this.props;
    const { style } = this.props.state;
    const { icon } = style;
    const IconCh = Icon.getCh(icon.ch);
    const IconTune = Icon.getTune(icon.tune);
    const IconSearch = Icon.getSearch(icon.search);
    return (
      <nav data-component-name={"Rank"} style={style.rank.self}>
        <header style={style.rank.header}>
          <div style={style.rank.headerSearchIcon}>{IconTune}</div>
          <div style={style.rank.headerInput}>{this.state.rootCh}</div>
          <div
            style={headerUpdateIconStyle}
            //            onClick={this.handleOnClickUpdate}
            {...this.getDecolationProps()}
          >
            {/* IconUpdate */}
            <select onChange={onChangeFindType} style={style.rank.headerFindSelect}>
              <option>{Thread.findTypeAll}</option>
              <option>{Thread.findTypeHtml}</option>
              <option>{Thread.findTypeMusic}</option>
              <option>{Thread.findTypeVideo}</option>
            </select>
          </div>
        </header>

        <ol style={style.rank.ol}>
          {this.renderLi()}
          <li style={style.menuIndexList.space}></li>
        </ol>
      </nav>
    );
  }

  renderLi() {
    const { state, onClickOtherThread } = this.props;
    const { app, thread, rank } = state;
    const { ui, style } = state;
    return rank.map((mi, index) => {
      return (
        <MenuIndexList
          key={`${mi.ch}_${index}`}
          id={`${mi.ch}_${index}`}
          app={app}
          ui={ui}
          thread={thread}
          menuIndexList={mi}
          onClickOtherThread={onClickOtherThread}
          rank={index}
          style={style.menuIndexList}
        />
      );
    });
  }
}
