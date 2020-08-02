import React from "react";
import Thread from "api/store/Thread";
import ChStyle from "client/style/Menu/common/Ch";
import Icon from "client/components/Icon";
import MarqueeArea, { MarqueeAreaProps, MarqueeAreaState } from "client/container/util/MarqueeArea";

interface ChProps extends MarqueeAreaProps {
  isActive: boolean;
  ch: string;
  title: string;
  favicon: string;
  post: string;
  stampId: number;
  type: string;
  rankNum?: number;
  liveCntNode: React.ReactNode;
  handleOnClick: (ch: string) => void;
  animationStyle: React.CSSProperties;
  style: any;
}

interface ChState extends MarqueeAreaState {
  animationStyle: any;
  style: any;
}

export default class ChComponent extends MarqueeArea<ChProps, ChState> {
  animationStyle: any;
  constructor(props) {
    super(props);
    this.state = {
      animationStyle: props.animationStyle,
      ...this.superState,
    };
    this.handleOnClick = this.handleOnClick.bind(this);
    this.getDecolationEvents = this.getDecolationEvents.bind(this);
  }

  componentDidMount() {
    const { ch } = this.props;
    this.measureText();
    this.api("onResponseChAPI", ch);
  }

  componentWillUnmount() {
    const { ch } = this.props;
    this.clearTimeout();
  }

  componentDidUpdate(beforeProps) {
    if (this.props.isActive !== beforeProps.isActive) {
      this.setState({
        animationStyle: {
          ...this.state.animationStyle,
          background: this.props.animationStyle.background,
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
            animationStyle: {
              ...this.state.animationStyle,
              background: ChStyle[`${styleKey}MouseOverBackground`],
            },
          });
        },
        onMouseLeave: () => {
          this.onMouseLeaveArea();
          this.setState({
            animationStyle: {
              ...this.state.animationStyle,
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
    const { animationStyle } = this.state;
    const { isActive, ch, title, favicon, type, post, stampId, liveCntNode, rankNum, style } = this.props;
    const dispType = type === Thread.findTypeHtml || type === Thread.findTypeAll ? null : type;
    const marqueeStyle: any = this.getMarqueeStyle();
    return (
      <li
        key={ch}
        data-component-name={"Ch"}
        style={animationStyle}
        onClick={this.handleOnClick}
        {...this.getDecolationEvents(isActive)}
      >
        {this.renderRank(rankNum, ch)}
        <div style={style.upper}>
          <span style={style.upperSpace} />
          <span ref={this.marqueeWrapRef} data-component-name={"MarqueeMenuIndex"} style={style.upperRight}>
            <span ref={this.marqueeTextRef} style={marqueeStyle}>
              {title}
            </span>
          </span>
        </div>
        <div style={style.bottom}>
          <span style={{ ...style.bottomIcon, backgroundImage: `url( ${favicon} )` }} />
          <span style={style.bottomPost} dangerouslySetInnerHTML={{ __html: this.renderPost(post, stampId) }} />
          {liveCntNode}
        </div>
        {dispType && <span style={style[`ext${dispType}`]}>{dispType}</span>}
      </li>
    );
  }

  renderPost(post, stampId) {
    if (stampId > 0) {
      post = Icon.getStampStr(post, stampId, false);
    }
    return post;
  }

  renderRank(rankNum?, ch?: string): React.ReactNode {
    const disp = rankNum ? `RANK${rankNum}` : "TUNE";
    const upperRankWrap = ChStyle.getUpperRankWrap();
    const upperRank = ChStyle.getUpperRank();
    const background = ChStyle.getDispRankBackground(rankNum);
    const width = ChStyle.getDispRankWidth(rankNum);
    // console.log("renderRank ============== " + rankNum + " " + " " + background + " " + ch);
    return (
      <span style={{ ...upperRankWrap, background, width }}>
        <span style={upperRank}>{disp}</span>
      </span>
    );
  }
}
