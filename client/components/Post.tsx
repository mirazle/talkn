import React, { Component } from "react";
import ReactDOM from "react-dom";
import TimeAgo from "react-timeago";
import Sequence from "common/Sequence";
import Emotions from "common/emotions/index";
import util from "common/util";
import conf from "common/conf";
import PostStyle from "client/style/Post";

const FPS = 60;
const STEP = 1;
const TIMEOUT = (1 / FPS) * 1000;

interface Props {
  app: any;
  protocol: string;
  onClickPost: (ch: string) => void;
  timeago: any;
  childLayerCnt: any;
  post: any;
  style: any;
}

interface State {
  active: boolean;
  postStyle: any;
  timeId: string;
  isBubblePost: boolean;
  animatedWidth: number;
  overflowWidth: number;
}

const emotionCoverTypes = new Emotions();

export default class Post extends Component<Props, State> {
  public static defaultProps: Props = {
    app: {},
    protocol: Sequence.HTTPS_PROTOCOL,
    onClickPost: () => {},
    timeago: null,
    childLayerCnt: 0,
    post: {},
    style: {}
  };
  marqueeTimer: any;
  constructor(props) {
    const { style, app } = props;
    super(props);
    this.state = {
      active: true,
      postStyle: style,
      timeId: this.getTimeId(),
      isBubblePost: app.isBubblePost,
      animatedWidth: 0,
      overflowWidth: 0
    };

    this.mountTimeago = this.mountTimeago.bind(this);
    this.renderUpper = this.renderUpper.bind(this);
    this.renderTime = this.renderTime.bind(this);
    this.renderStampLabel = this.renderStampLabel.bind(this);
    this.getDecolationProps = this.getDecolationProps.bind(this);
  }

  componentWillReceiveProps(props) {
    const { title, dispFlg } = this.props.post;
    const { postStyle, isBubblePost } = this.state;

    if (title && title.length != title.length) {
      clearTimeout(this.marqueeTimer);
      this.setState({
        animatedWidth: 0
      });
    }

    if (!dispFlg) {
      this.setState({ active: false });
    } else {
      const beforeIsBubblePost = isBubblePost;
      const afterIsBubblePost = props.app.isBubblePost;
      if (beforeIsBubblePost !== afterIsBubblePost) {
        if (!beforeIsBubblePost && afterIsBubblePost) {
          this.mountTimeago();
        }

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
  }

  getDecolationProps() {
    const { app } = this.props;
    return {
      onMouseOver: () => {
        if (this.state.overflowWidth > 0) {
          this.startAnimation();
        }

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
        clearTimeout(this.marqueeTimer);
        this.setState({
          animatedWidth: 0
        });

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

  getTimeId() {
    return `timeAgo:${this.props.post._id}`;
  }

  componentDidMount() {
    this.mountTimeago();
    this.measureText();
  }

  componentWillUnmount() {
    clearTimeout(this.marqueeTimer);
    this.setState({ active: false });
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
      return true;
    }
  }

  componentDidUpdate() {
    this.measureText();
  }

  mountTimeago() {
    const { app, timeago } = this.props;
    if (!app.isMediaCh) {
      if (this.refs[this.state.timeId]) {
        // timeago.render(this.refs[this.state.timeId]);
      }
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
        <span style={postStyle.upperTimeago} ref={this.state.timeId} className={"timeAgo"}>
          <TimeAgo date={createTime} dateTime={createTime} />
        </span>
      );
    }
  }

  renderUpper() {
    const { childLayerCnt, post } = this.props;
    const { _id, title } = post;
    const { postStyle } = this.state;
    const childLabel = childLayerCnt > 0 ? `${childLayerCnt}child` : "";
    const marqueeStyle: any = {
      ...{ position: "relative", right: this.state.animatedWidth, whiteSpace: "nowrap" },
      ...this.props.style
    };
    return (
      <div style={{ ...postStyle.upper, overflow: "hidden" }}>
        <div style={postStyle.upperChild}>{childLabel}</div>
        <div ref={`MarqueeWrap${_id}`} data-component-name={"Marquee"} style={postStyle.upperTitle} title={title}>
          <span ref={`Marquee${_id}`} style={marqueeStyle}>
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

  render() {
    const { app, protocol, post, onClickPost } = this.props;
    const { active, postStyle } = this.state;
    const stampLabel = this.renderStampLabel(post.stampId);
    let dispFavicon = conf.assetsIconPath + util.getSaveFaviconName(post.favicon);

    if (dispFavicon.indexOf(Sequence.HTTPS_PROTOCOL) !== 0 && dispFavicon.indexOf(Sequence.HTTP_PROTOCOL) !== 0) {
      if (protocol === Sequence.TALKN_PROTOCOL) {
        dispFavicon = `${Sequence.HTTPS_PROTOCOL}//${dispFavicon}`;
      } else {
        dispFavicon = `${protocol}//${dispFavicon}`;
      }
    }

    if (active) {
      return (
        <li data-component-name={"Post"} id={post._id} style={postStyle.self} {...this.getDecolationProps()}>
          {this.renderUpper()}
          <div
            onClick={() => {
              onClickPost(post.ch);
            }}
            style={postStyle.bottom}
          >
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

  startAnimation() {
    clearTimeout(this.marqueeTimer);

    const animate = () => {
      const { overflowWidth } = this.state;
      let animatedWidth = this.state.animatedWidth + STEP;
      const isRoundOver = animatedWidth > overflowWidth;
      if (isRoundOver) {
        animatedWidth = 0;
      }
      this.setState({
        animatedWidth
      });

      this.marqueeTimer = setTimeout(animate, TIMEOUT);
    };

    this.marqueeTimer = setTimeout(animate, TIMEOUT);
  }

  measureText() {
    const { _id } = this.props.post;

    // マーキーさせたいテキストのcontainer
    //    const container: any = ReactDOM.findDOMNode(this);
    const container: any = ReactDOM.findDOMNode(this.refs[`MarqueeWrap${_id}`]);
    // const container = document.querySelector("[data-component-name='Marquee']");
    //const container = document.querySelector("[data-component-name='Marquee']");

    // マーキーさせたいテキスト全体(表示されない部分も含めて)
    const node: any = ReactDOM.findDOMNode(this.refs[`Marquee${_id}`]);

    if (container && node) {
      const containerWidth = container.offsetWidth;
      const textWidth = node.offsetWidth;
      const overflowWidth = textWidth - containerWidth;

      if (overflowWidth !== this.state.overflowWidth) {
        this.setState({
          overflowWidth
        });
      }
    }
  }
}
