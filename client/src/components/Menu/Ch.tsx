import React from 'react';

import Thread from 'api/store/Thread';

import Icon from 'client/components/common/Icon';
import LiveCnt from 'client/components/common/LiveCnt';
import MarqueeArea, { MarqueeAreaProps, MarqueeAreaState } from 'client/container/util/MarqueeArea';
import ContainerStyle from 'client/style/Container';
import ChStyle from 'client/style/Menu/common/Ch';

type ChProps = {
  isActive: boolean;
  didMountBgHighligt: boolean;
  didMountLiveCntHighligt: boolean;
  ch: string;
  title: string;
  favicon: string;
  post: string;
  stampId: number;
  type: string;
  rankNum?: number;
  liveCnt: number;
  handleOnClick: (ch: string) => void;
  bgStyle: React.CSSProperties;
  style: any;
  ui: any;
  app: any;
} & MarqueeAreaProps;

type ChState = {
  updateLiveCnt: boolean;
  bgStyle: any;
  style: any;
} & MarqueeAreaState;

export default class Ch extends MarqueeArea<ChProps, ChState> {
  constructor(props) {
    super(props);
    this.componentName = 'Ch';
    this.state = {
      updateLiveCnt: false,
      bgStyle: props.bgStyle,
      ...this.superState,
    };
    this.handleOnClick = this.handleOnClick.bind(this);
    this.getDecolationEvents = this.getDecolationEvents.bind(this);
  }

  componentDidMount() {
    const { ch, didMountBgHighligt } = this.props;
    this.measureText();
    this.api('onResponseChAPI', ch);

    if (didMountBgHighligt) {
      this.setState({
        bgStyle: {
          ...this.state.bgStyle,
          boxShadow: `${ContainerStyle.lineShadow},
            0px 0px 500px rgba(${ContainerStyle.themeSuperLightRGBString}, 1) inset,
            0px 0px 0px rgba(${ContainerStyle.themeSuperLightRGBString}, 1)`,
          zIndex: 10,
        },
      });
      setTimeout(() => {
        this.setState({
          bgStyle: {
            ...this.state.bgStyle,
            boxShadow: `${ContainerStyle.lineShadow},
            0px 0px 400px rgba(${ContainerStyle.themeSuperLightRGBString}, 1) inset,
            0px 0px 15px rgba(${ContainerStyle.themeSuperLightRGBString}, 1)`,
            zIndex: 10,
          },
        });

        setTimeout(() => {
          this.setState({
            bgStyle: {
              ...this.state.bgStyle,
              boxShadow: `${ContainerStyle.lineShadow},
            0px 0px 0px rgba(${ContainerStyle.themeSuperLightRGBString}, 1) inset,
            0px 0px 0px rgba(${ContainerStyle.themeSuperLightRGBString}, 1)`,
              zIndex: 1,
            },
          });
        }, 200);
      }, 0);
    }
  }

  componentWillUnmount() {
    const { ch } = this.props;
    this.clearTimeout();
  }

  componentDidUpdate(beforeProps) {
    if (this.props.isActive !== beforeProps.isActive) {
      this.setState({
        bgStyle: {
          ...this.state.bgStyle,
          background: this.props.bgStyle.background,
        },
      });
    }
    this.measureText();
  }

  getDecolationEvents(isActive) {
    const styleKey = isActive ? ChStyle.activeLiSelfLabel : ChStyle.unactiveLiSelfLabel;
    if (!isActive) {
      return {
        onMouseOver: () => {
          this.onMouseOverArea();
          this.setState({
            bgStyle: {
              ...this.state.bgStyle,
              background: ChStyle[`${styleKey}MouseOverBackground`],
            },
          });
        },
        onMouseLeave: () => {
          this.onMouseLeaveArea();
          this.setState({
            bgStyle: {
              ...this.state.bgStyle,
              background: ChStyle[`${styleKey}Background`],
            },
          });
        },
      };
    }
  }

  handleOnClick() {
    const { ch } = this.props;
    this.props.handleOnClick(ch);
  }

  render() {
    const { bgStyle } = this.state;
    const { isActive, ch, title, favicon, type, post, stampId, liveCnt, rankNum, didMountLiveCntHighligt, style, ui, app } = this.props;
    const dispType = type === Thread.findTypeHtml || type === Thread.findTypeAll ? null : type;
    const chStyle = style.ch;
    const liveCntStyle = style.liveCnt.self;
    const marqueeStyle: any = this.getMarqueeStyle();
    return (
      <li
        key={`${rankNum}.${ch}`}
        data-component-name={this.componentName}
        style={bgStyle}
        onClick={this.handleOnClick}
        {...this.getDecolationEvents(isActive)}>
        {this.renderRank(ui, app, rankNum, ch)}
        <div style={chStyle.upper}>
          <span style={chStyle.upperSpace} />
          <span ref={this.marqueeWrapRef} data-component-name={'MarqueeMenuIndex'} style={chStyle.upperRight}>
            <span ref={this.marqueeTextRef} style={marqueeStyle}>
              {title}
            </span>
          </span>
        </div>
        <div style={chStyle.bottom}>
          <span style={{ ...chStyle.bottomIcon, backgroundImage: `url( ${favicon} )` }} />
          <span style={chStyle.bottomPost} dangerouslySetInnerHTML={{ __html: this.renderPost(post, stampId) }} />
          <LiveCnt number={liveCnt} ch={ch} style={liveCntStyle} didMountHighlight={didMountLiveCntHighligt} />
        </div>
        {dispType && <span style={chStyle[`ext${dispType}`]}>{dispType}</span>}
      </li>
    );
  }

  renderPost(post, stampId) {
    if (stampId > 0) {
      post = Icon.getStampStr(post, stampId, false);
    }
    return post;
  }

  renderRank(ui, app, rankNum?, ch?: string): React.ReactNode {
    const disp = rankNum ? `RANK${rankNum}` : 'TUNE';
    const upperRankWrap = ChStyle.getUpperRankWrap({ app, ui });
    const upperRank = ChStyle.getUpperRank();
    const background = ChStyle.getDispRankBackground(rankNum);
    const width = ChStyle.getDispRankWidth(rankNum);
    return (
      <span style={{ ...upperRankWrap, background, width }}>
        <span style={upperRank}>{disp}</span>
      </span>
    );
  }
}
