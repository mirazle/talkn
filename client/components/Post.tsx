import React, { Component } from "react";
import ReactDOM from "react-dom";
import TimeAgo from "react-timeago";
import Sequence from "common/Sequence";
import Emotions from "common/emotions/index";
import util from "common/util";
import conf from "common/conf";
import PostStyle from "client/style/Post";
import MarqueeArea, { MarqueeAreaProps, MarqueeAreaState } from "client/container/util/MarqueeArea";
import App from "common/schemas/state/App";

interface Props extends MarqueeAreaProps {
  id: number;
  app: any;
  onClickPost: (ch: string) => void;
  childLayerCnt: any;
  post: any;
  style: any;
}

interface State extends MarqueeAreaState {
  postStyle: any;
  isBubblePost: boolean;
  animatedWidth: number;
  overflowWidth: number;
}

const emotionCoverTypes = new Emotions();

export default class Post extends MarqueeArea<Props, State> {
  public static defaultProps: Props = {
    id: 0,
    app: {},
    onClickPost: () => {},
    childLayerCnt: 0,
    post: {},
    style: {}
  };
  constructor(props) {
    super(props);
    const { style, app } = props;
    this.state = {
      postStyle: style,
      isBubblePost: app.isBubblePost,
      ...this.superState
    };

    this.renderUpper = this.renderUpper.bind(this);
    this.renderTime = this.renderTime.bind(this);
    this.renderStampLabel = this.renderStampLabel.bind(this);
    this.getDecolationProps = this.getDecolationProps.bind(this);
  }

  componentWillReceiveProps(props) {
    const { postStyle, isBubblePost } = this.state;
    const beforeIsBubblePost = isBubblePost;
    const afterIsBubblePost = props.app.isBubblePost;
    if (beforeIsBubblePost !== afterIsBubblePost) {
      this.setState({
        postStyle: {
          ...postStyle,
          self: { ...props.style.self },
          upper: { ...postStyle.upper, display: props.style.upper.display },
          bottomPost: { ...props.style.bottomPost }
        },
        isBubblePost: afterIsBubblePost
      });
    }
  }

  getDecolationProps() {
    const { app } = this.props;
    return {
      onMouseOver: () => {
        this.onMouseOverArea();
        if (app.isBubblePost) {
          this.setState({
            postStyle: {
              ...this.state.postStyle,
              self: {
                ...this.state.postStyle.self,
                transition: "200ms",
                transform: "scale( 1.05 )",
                cursor: "pointer"
              }
            }
          });
        }
      },
      onMouseLeave: () => {
        this.onMouseLeaveArea();
        if (app.isBubblePost) {
          this.setState({
            postStyle: {
              ...this.state.postStyle,
              self: {
                ...this.state.postStyle.self,
                transition: "600ms",
                transform: "scale( 1 )",
                cursor: "default"
              }
            }
          });
        }
      },
      onMouseDown: () => {
        if (app.isBubblePost) {
          this.setState({
            postStyle: {
              ...this.state.postStyle,
              self: {
                ...this.state.postStyle.self,
                transform: "scale( 1 )",
                cursor: "pointer"
              }
            }
          });
        }
      },
      onMouseUp: () => {
        if (app.isBubblePost) {
          this.setState({
            postStyle: {
              ...this.state.postStyle,
              self: {
                ...this.state.postStyle.self,
                transform: "scale( 1.05 )",
                cursor: "pointer"
              }
            }
          });
        }
      }
    };
  }

  componentDidMount() {
    this.measureText();
  }

  componentWillUnmount() {
    this.clearTimeout();
  }

  shouldComponentUpdate(props) {
    const { app, actionLog } = props;

    if (app.isMediaCh) {
      return true;
      /*
      return [
        "NEXT_POSTS_TIMELINE",
        "CLEAR_POSTS_TIMELINE",
        "PREV_POSTS_TIMELINE"
      ].includes( actionLog[0] );
*/
    } else {
      if (props.app.actioned === "SCROLL_THREAD") {
        return false;
      } else {
        return true;
      }
    }
  }

  componentDidUpdate() {
    this.measureText();
  }

  render() {
    const { app, post, onClickPost } = this.props;
    const { postStyle } = this.state;
    const stampLabel = this.renderStampLabel(post.stampId);
    let dispFavicon = conf.assetsIconPath + util.getSaveFaviconName(post.favicon);

    if (dispFavicon.indexOf(Sequence.HTTPS_PROTOCOL) !== 0 && dispFavicon.indexOf(Sequence.HTTP_PROTOCOL) !== 0) {
      if (post.protocol === Sequence.TALKN_PROTOCOL) {
        dispFavicon = `${Sequence.HTTPS_PROTOCOL}//${dispFavicon}`;
      } else {
        dispFavicon = `${post.protocol}//${dispFavicon}`;
      }
    }

    if (post.dispFlg) {
      return (
        <li
          data-component-name={"Post"}
          id={post._id}
          style={postStyle.self}
          onClick={() => {
            onClickPost(post.ch);
          }}
          {...this.getDecolationProps()}
        >
          {this.renderUpper()}
          <div style={postStyle.bottom}>
            <span style={{ ...postStyle.bottomIcon, backgroundImage: `url( ${dispFavicon} )` }} />
            <span style={postStyle.bottomPost} dangerouslySetInnerHTML={{ __html: this.renderPost(post, app) }} />
          </div>
          {stampLabel}
        </li>
      );
    } else {
      return null;
    }
  }

  renderTime() {
    const { postStyle } = this.state;
    const { app, post } = this.props;
    const { createTime, currentTime } = post;

    if (app.isMediaCh) {
      const dispCurrentTime = String(currentTime).split(".")[0];
      return <time style={postStyle.upperTimeago}>{dispCurrentTime} Second.</time>;
    } else {
      return (
        <span style={postStyle.upperTimeago} className={"timeAgo"}>
          <TimeAgo
            date={createTime}
            formatter={(value, unit, suffix) => {
              let shortUnit = String(unit);
              switch (String(unit)) {
                case "year":
                  shortUnit = "YR";
                  break;
                case "month":
                  shortUnit = "wk";
                  break;
                case "week":
                  shortUnit = "wk";
                  break;
                case "hour":
                  shortUnit = "hr";
                  break;
                case "minute":
                  shortUnit = "min";
                  break;
                case "second":
                  shortUnit = "sec";
                  break;
              }
              shortUnit =
                app.extensionMode === App.extensionModeExtNoneLabel ? shortUnit : shortUnit.replace("ago", "");
              return `${value} ${shortUnit} ${suffix}`;
            }}
          />
        </span>
      );
    }
  }

  renderUpper() {
    const { childLayerCnt, post } = this.props;
    const { title } = post;
    const { postStyle } = this.state;
    const childLabel = childLayerCnt > 0 ? `${childLayerCnt}child` : "";
    const marqueeStyle: {} = this.getMarqueeStyle();

    return (
      <div style={{ ...postStyle.upper, overflow: "hidden" }}>
        <div style={postStyle.upperChild}>{childLabel}</div>
        <div ref={this.marqueeWrapRef} data-component-name={"MarqueePost"} style={postStyle.upperTitle} title={title}>
          <span ref={this.marqueeTextRef} style={marqueeStyle}>
            {title}
          </span>
        </div>
        {this.renderTime()}
      </div>
    );
  }

  renderPost(post, app) {
    if (post.stampId) {
      return PostStyle.getStampTag(post.post, app.isBubblePost);
    } else {
      return post.post;
    }
  }

  renderStampLabel(stampId) {
    const { style } = this.props;

    if (stampId) {
      let stampType = emotionCoverTypes.belongCoverTypes[stampId] ? emotionCoverTypes.belongCoverTypes[stampId] : "No";

      return (
        <div data-component-name={"stamp-label"} style={style.stampLabelWrap}>
          <div style={style.stampLabel}>{stampType}</div>
        </div>
      );
    } else {
      return null;
    }
  }
}
