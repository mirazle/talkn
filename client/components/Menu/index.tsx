import React from "react";
import Thread from "api/store/Thread";
import TalknComponent from "client/components/TalknComponent";
import Ui from "client/store/Ui";
import { Label } from "client/components/common";
// import RankChList from "client/components/Menu/RankChList";
import MenuFooter from "client/components/Menu/Footer";
import Ch from "client/components/Menu/common/Ch";
import Icon from "client/components/Icon";
import ChStyle from "client/style/Menu/common/Ch";
import Ranks from "api/store/Ranks";

interface Props {
  state: any;
  onChangeFindType: any;
  openMenuTransitionEnd?: any;
}

interface State {
  tuneCh: any;
  chKeyRanks: any;
}

export default class Menuextends extends TalknComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { chKeyRanks: [], tuneCh: {} };
    this.transitionEnd = this.transitionEnd.bind(this);
    this.handleOnClickCh = this.handleOnClickCh.bind(this);
    this.renderTuneChLi = this.renderTuneChLi.bind(this);
    this.renderRankLi = this.renderRankLi.bind(this);
    this.renderSpaceLi = this.renderSpaceLi.bind(this);
  }

  componentDidMount() {
    this.clientAction("COMPONENT_DID_MOUNTS", { componentDidMounts: "Menu" });
  }

  componentDidUpdate() {
    const { tuneCh, ranks } = this.props.state;

    if (Object.keys(tuneCh).length > 0) {
      const tuneChJson = JSON.stringify(tuneCh);
      const tuneChStateJson = JSON.stringify(this.state.tuneCh);
      if (tuneChJson !== tuneChStateJson) {
        this.setState({ tuneCh });
      }
    }

    if (ranks.length > 0) {
      let chKeyRanks = {};
      ranks.forEach((rank, rankNum) => {
        chKeyRanks[rank.ch] = rank;
        chKeyRanks[rank.ch].rankNum = rankNum + 1;
      });

      const chKeyRanksJson = JSON.stringify(chKeyRanks);
      const chKeyRanksStateJson = JSON.stringify(this.state.chKeyRanks);
      if (chKeyRanksJson !== chKeyRanksStateJson) {
        this.setState({ chKeyRanks });
      }
    }
  }

  transitionEnd(e) {
    this.clientAction("ON_CLICK_TOGGLE_DISP_MENU_END");
  }

  handleOnClickCh(ch) {
    const { thread, ui } = this.props.state;
    const isFocusCh = thread.ch === ch;
    if (isFocusCh) {
      if (ui.screenMode === Ui.screenModeSmallLabel) {
        this.clientAction("ON_CLICK_TOGGLE_DISP_MENU");
      }
    } else {
      this.onClickCh(ch, ui, thread.hasSlash, "ch");
    }
  }

  render() {
    const { style, app } = this.props.state;
    const { onChangeFindType } = this.props;
    const { icon } = style;
    const IconTune = Icon.getTune(icon.tune);
    const { chKeyRanks } = this.state;
    const chKeyRanksAvtive = Boolean(Object.keys(chKeyRanks).length);
    return (
      <div data-component-name={"Menu"} onTransitionEnd={this.transitionEnd} style={style.menu.self}>
        <header style={style.ranks.header}>
          <div style={style.ranks.headerSearchIcon}>{IconTune}</div>
          <div style={style.ranks.headerInput}>{app.rootCh}</div>
          <div style={style.ranks.headerUpdateIcon}>
            <select id="ch" onChange={onChangeFindType} style={style.ranks.headerFindSelect}>
              <option>{Thread.findTypeAll}</option>
              <option>{Thread.findTypeHtml}</option>
              <option>{Thread.findTypeMusic}</option>
              <option>{Thread.findTypeVideo}</option>
              <option>{Thread.findTypeOther}</option>
            </select>
            <Label htmlFor={"ch"} />
          </div>
        </header>
        <ol style={style.ranks.ol}>
          {this.renderTuneChLi()}
          {chKeyRanksAvtive && this.renderRankLi()}
          {chKeyRanksAvtive && this.renderSpaceLi()}
        </ol>
        <MenuFooter {...this.props} />
      </div>
    );
  }

  renderTuneChLi(): React.ReactNode {
    const { style, app, ui, tuneCh, thread } = this.props.state;
    if (app.tuned === "") {
      return undefined;
    } else {
      const isActive = thread.ch === tuneCh.ch;
      const tuneChStyle = isActive ? ChStyle.getActiveLiSelf({ app, ui }) : ChStyle.getUnactiveLiSelf({ app, ui });
      return (
        <Ch
          key={`tune_${tuneCh.ch}`}
          isActive={isActive}
          didMountBgHighligt={false}
          ch={tuneCh.ch}
          title={tuneCh.title}
          favicon={tuneCh.favicon}
          type={tuneCh.findType}
          post={tuneCh.post}
          stampId={tuneCh.stampId}
          liveCnt={tuneCh.liveCnt}
          handleOnClick={this.handleOnClickCh}
          bgStyle={tuneChStyle}
          style={style}
        />
      );
    }
  }

  renderRankLi(): React.ReactNode {
    const { state } = this.props;
    const { app, thread, ranks } = state;
    const { ui, style } = state;
    const { chKeyRanks } = this.state;
    return ranks.map((rank, _rankNum) => {
      const rankNum = _rankNum + 1;
      const isActive = thread.ch === rank.ch;
      const chStyle = isActive ? ChStyle.getActiveLiSelf({ app, ui }) : ChStyle.getUnactiveLiSelf({ app, ui });
      const didMountBgHighligt =
        chKeyRanks[rank.ch].rankNum !== 0 &&
        rankNum !== chKeyRanks[rank.ch].rankNum &&
        rank.liveCnt !== chKeyRanks[rank.ch].liveCnt;
      return (
        <Ch
          key={`${rank.ch}_${rankNum}`}
          rankNum={rankNum}
          isActive={isActive}
          didMountBgHighligt={didMountBgHighligt}
          ch={rank.ch}
          title={rank.title}
          favicon={rank.favicon}
          type={rank.findType}
          post={rank.post}
          stampId={rank.stampId}
          liveCnt={rank.liveCnt}
          handleOnClick={this.handleOnClickCh}
          bgStyle={chStyle}
          style={style}
        />
      );
    });
  }

  renderSpaceLi(): React.ReactNode {
    const { style } = this.props.state;
    return <li style={style.ch.space}></li>;
  }
  renderRank(rankNum?, ch?: string): React.ReactNode {
    const upperRankWrap = ChStyle.getUpperRankWrap();
    const upperRank = ChStyle.getUpperRank();
    if (rankNum > 0) {
      const background = ChStyle.getDispRankBackground(rankNum);
      const width = ChStyle.getDispRankWidth(rankNum);
      return (
        <span style={{ ...upperRankWrap, background, width }}>
          <span style={upperRank}>RANK{rankNum}</span>
        </span>
      );
    } else {
      const background = ChStyle.getDispRankBackground();
      const width = ChStyle.getDispRankWidth();
      return (
        <span style={{ ...upperRankWrap, background, width }}>
          <span style={upperRank}>TUNE</span>
        </span>
      );
    }
  }
}
