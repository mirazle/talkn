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

interface Props {
  state: any;
  onChangeFindType: any;
  openMenuTransitionEnd?: any;
}

export default class Menuextends extends TalknComponent<Props, {}> {
  constructor(props: Props) {
    super(props);
    this.handleOnClickCh = this.handleOnClickCh.bind(this);
    this.renderTuneChLi = this.renderTuneChLi.bind(this);
    this.renderRankLi = this.renderRankLi.bind(this);
    this.renderSpaceLi = this.renderSpaceLi.bind(this);
  }

  componentDidMount() {
    this.clientAction("COMPONENT_DID_MOUNTS", { componentDidMounts: "Menu" });
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
    return (
      <div data-component-name={"Menu"} onTransitionEnd={() => {}} style={style.menu.self}>
        <header style={style.ranks.header}>
          <div style={style.ranks.headerSearchIcon}>{IconTune}</div>
          <div style={style.ranks.headerInput}>{app.rootCh}</div>
          <div style={style.ranks.headerUpdateIcon}>
            <select id="ch" onChange={onChangeFindType} style={style.ranks.headerFindSelect}>
              <option>{Thread.findTypeAll}</option>
              <option>{Thread.findTypeHtml}</option>
              <option>{Thread.findTypeMusic}</option>
              <option>{Thread.findTypeVideo}</option>
            </select>
            <Label htmlFor={"ch"} />
          </div>
        </header>
        <ol style={style.ranks.ol}>
          {this.renderTuneChLi()}
          {this.renderRankLi()}
          {this.renderSpaceLi()}
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
          ch={tuneCh.ch}
          title={tuneCh.title}
          favicon={tuneCh.favicon}
          type={tuneCh.findType}
          post={tuneCh.post}
          stampId={tuneCh.stampId}
          liveCntNode={Icon.getLiveCnt({ app, ui }, tuneCh.liveCnt)}
          handleOnClick={this.handleOnClickCh}
          animationStyle={tuneChStyle}
          style={style.ch}
        />
      );
    }
  }

  renderRankLi(): React.ReactNode {
    const { state } = this.props;
    const { app, thread, ranks } = state;
    const { ui, style } = state;
    return ranks.map((rank, rankNum) => {
      const isActive = thread.ch === rank.ch;
      const chStyle = isActive ? ChStyle.getActiveLiSelf({ app, ui }) : ChStyle.getUnactiveLiSelf({ app, ui });
      return (
        <Ch
          key={`${rank.ch}_${rankNum + 1}`}
          rankNum={rankNum + 1}
          isActive={isActive}
          ch={rank.ch}
          title={rank.title}
          favicon={rank.favicon}
          type={rank.findType}
          post={rank.post}
          stampId={rank.stampId}
          liveCntNode={Icon.getLiveCnt({ app, ui }, rank.liveCnt)}
          handleOnClick={this.handleOnClickCh}
          animationStyle={chStyle}
          style={style.ch}
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
