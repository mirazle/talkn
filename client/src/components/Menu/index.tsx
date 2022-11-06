import React from 'react';

import Ui from 'common/clientState/store/Ui';

import Ch from 'client/components/Menu/Ch';
import MenuFooter from 'client/components/Menu/Footer';
import SearchBar from 'client/components/Menu/SearchBar';
import TalknComponent from 'client/components/TalknComponent';
import ChStyle from 'client/style/Menu/common/Ch';

type Props = {
  state: any;
  onChangeFindType: any;
  openMenuTransitionEnd?: any;
};

type State = {
  tuneCh: { [key: string]: string };
  chKeyRanks: any;
};

export default class Menuextends extends TalknComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.componentName = 'Menu';
    this.state = { chKeyRanks: [], tuneCh: {} };
    this.transitionEnd = this.transitionEnd.bind(this);
    this.handleOnClickCh = this.handleOnClickCh.bind(this);
    this.renderTuneChLi = this.renderTuneChLi.bind(this);
    this.renderRankLi = this.renderRankLi.bind(this);
    this.renderSpaceLi = this.renderSpaceLi.bind(this);
  }

  componentDidMount() {
    this.clientAction('COMPONENT_DID_MOUNTS', { componentDidMounts: 'Menu' });
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
    this.clientAction('ON_CLICK_TOGGLE_DISP_MENU_END');
  }

  handleOnClickCh(ch) {
    const { thread, ui } = this.props.state;
    const isFocusCh = thread.ch === ch;
    if (isFocusCh) {
      if (ui.screenSize === Ui.screenSizeSmallLabel) {
        this.clientAction('ON_CLICK_TOGGLE_DISP_MENU');
      }
    } else {
      this.onClickCh(ch, ui, thread.hasSlash, 'ch');
    }
  }

  render() {
    const { style, app } = this.props.state;
    const { chKeyRanks } = this.state;
    const chKeyRanksAvtive = Boolean(Object.keys(chKeyRanks).length);
    return (
      <div data-component-name={this.componentName} onTransitionEnd={this.transitionEnd} style={style.menu.self}>
        <SearchBar {...this.props} visibleExt />
        <ol style={style.ranks.ol}>
          {this.renderTuneChLi()}
          {chKeyRanksAvtive && this.renderRankLi()}
          {this.renderSpaceLi()}
        </ol>
        <MenuFooter {...this.props} />
      </div>
    );
  }

  renderTuneChLi(): React.ReactNode {
    const { style, app, ui, tuneCh, thread } = this.props.state;
    if (app.tunedCh === '') {
      return undefined;
    } else {
      const isActive = thread.ch === tuneCh.ch;
      const tuneChStyle = isActive ? ChStyle.getActiveLiSelf({ app, ui }) : ChStyle.getUnactiveLiSelf({ app, ui });
      const didMountLiveCntHighligt = tuneCh.liveCnt > this.state.tuneCh.liveCnt;
      return (
        <Ch
          key={`tune_${tuneCh.ch}`}
          isActive={isActive}
          didMountBgHighligt={false}
          didMountLiveCntHighligt={didMountLiveCntHighligt}
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
          ui={ui}
          app={app}
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

      if (chKeyRanks[rank.ch]) {
        const didMountBgHighligt =
          chKeyRanks[rank.ch].rankNum !== 0 && rankNum < chKeyRanks[rank.ch].rankNum && rank.liveCnt !== chKeyRanks[rank.ch].liveCnt;
        const didMountLiveCntHighligt = rank.liveCnt > chKeyRanks[rank.ch].liveCnt;
        return (
          <Ch
            key={`${rank.ch}_${rankNum}`}
            ui={ui}
            app={app}
            rankNum={rankNum}
            isActive={isActive}
            didMountBgHighligt={didMountBgHighligt}
            didMountLiveCntHighligt={didMountLiveCntHighligt}
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
      } else {
        return undefined;
      }
    });
  }

  renderSpaceLi(): React.ReactNode {
    const { style } = this.props.state;
    return <li style={style.ch.space}></li>;
  }
}
