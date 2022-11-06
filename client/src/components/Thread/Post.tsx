import React from 'react';
import TimeAgo from 'react-timeago';

import Sequence from 'common/Sequence';
import util from 'common/util';

import Icon from 'client/components/common/Icon';
import conf from 'client/conf';
import MarqueeArea, { MarqueeAreaProps, MarqueeAreaState } from 'client/container/util/MarqueeArea';
import PostStyle from 'client/style/Post';

type PostProps = {
  id: number;
  app: any;
  ui: any;
  onClickPost: (ch: string) => void;
  childLayerCnt: any;
  post: any;
  style: any;
} & MarqueeAreaProps;

type PostState = {
  postStyle: any;
  isBubblePost: boolean;
  animatedWidth: number;
  overflowWidth: number;
} & MarqueeAreaState;

export default class Post extends MarqueeArea<PostProps, PostState> {
  public static defaultProps: PostProps = {
    id: 0,
    app: {},
    ui: {},
    onClickPost: () => {},
    childLayerCnt: 0,
    post: {},
    style: {},
  };
  constructor(props) {
    super(props);
    this.componentName = 'Post';
    const { style, ui } = props;
    this.state = {
      postStyle: style,
      isBubblePost: ui.isBubblePost,
      ...this.superState,
    };

    this.renderUpper = this.renderUpper.bind(this);
    this.renderTime = this.renderTime.bind(this);
    this.getDecolationProps = this.getDecolationProps.bind(this);
  }

  SAFE_componentWillReceiveProps(props) {
    const { postStyle, isBubblePost } = this.state;
    const beforeIsBubblePost = isBubblePost;
    const afterIsBubblePost = props.ui.isBubblePost;
    if (beforeIsBubblePost !== afterIsBubblePost) {
      this.setState({
        postStyle: {
          ...postStyle,
          self: { ...props.style.self },
          upper: { ...postStyle.upper, display: props.style.upper.display },
          bottomPost: { ...props.style.bottomPost },
        },
        isBubblePost: afterIsBubblePost,
      });
    }
  }

  getDecolationProps() {
    const { ui } = this.props;
    return {
      onMouseOver: () => {
        this.onMouseOverArea();
        if (ui.isBubblePost) {
          this.setState({
            postStyle: {
              ...this.state.postStyle,
              self: {
                ...this.state.postStyle.self,
                transition: '200ms',
                transform: 'scale( 1.05 )',
                cursor: 'pointer',
              },
            },
          });
        }
      },
      onMouseLeave: () => {
        this.onMouseLeaveArea();
        if (ui.isBubblePost) {
          this.setState({
            postStyle: {
              ...this.state.postStyle,
              self: {
                ...this.state.postStyle.self,
                transition: '600ms',
                transform: 'scale( 1 )',
                cursor: 'default',
              },
            },
          });
        }
      },
      onMouseDown: () => {
        if (ui.isBubblePost) {
          this.setState({
            postStyle: {
              ...this.state.postStyle,
              self: {
                ...this.state.postStyle.self,
                transform: 'scale( 1 )',
                cursor: 'pointer',
              },
            },
          });
        }
      },
      onMouseUp: () => {
        if (ui.isBubblePost) {
          this.setState({
            postStyle: {
              ...this.state.postStyle,
              self: {
                ...this.state.postStyle.self,
                transform: 'scale( 1.05 )',
                cursor: 'pointer',
              },
            },
          });
        }
      },
    };
  }

  componentDidMount() {
    this.measureText();
  }

  componentWillUnmount() {
    this.clearTimeout();
  }

  shouldComponentUpdate(props) {
    const { app, clientLog } = props;

    if (app.isMediaCh) {
      return true;
      /*
      return [
        "NEXT_POSTS_TIMELINE",
        "CLEAR_POSTS_TIMELINE",
        "PREV_POSTS_TIMELINE"
      ].includes( clientLog[0] );
*/
    } else {
      return !(props.app.actioned === 'SCROLL_THREAD');
    }
  }

  componentDidUpdate() {
    this.measureText();
  }

  render() {
    const { app, ui, post, onClickPost } = this.props;
    const { postStyle } = this.state;
    const selfStyle = PostStyle.getSelf({ app, ui });
    const stampLabel = Icon.getStampLabel({ app, ui, post });
    let dispFavicon = conf.assetsIconPath + util.getSaveFaviconName(post.favicon);
    if (dispFavicon.indexOf(Sequence.HTTPS_PROTOCOL) !== 0 && dispFavicon.indexOf(Sequence.HTTP_PROTOCOL) !== 0) {
      if (post.protocol === Sequence.TALKN_PROTOCOL) {
        dispFavicon = `${Sequence.HTTPS_PROTOCOL}//${dispFavicon}`;
      } else {
        dispFavicon = `${post.protocol}//${dispFavicon}`;
      }
    }

    if (post.dispFlg) {
      const postNode = this.renderPost(post, app, ui);
      return (
        <li
          data-component-name={this.componentName}
          id={post._id}
          style={{ ...selfStyle }}
          onClick={() => onClickPost(post.ch)}
          {...this.getDecolationProps()}>
          {this.renderUpper()}
          <div data-component-name={`${this.componentName}Bottom`} style={postStyle.bottom}>
            <span style={{ ...postStyle.bottomIcon, backgroundImage: `url( ${dispFavicon} )` }} />
            {postNode}
            {stampLabel}
          </div>
        </li>
      );
    } else {
      return undefined;
    }
  }

  renderTime() {
    const { postStyle } = this.state;
    const { app, ui, post } = this.props;
    const { createTime, currentTime } = post;

    if (app.isMediaCh) {
      const dispCurrentTime = String(currentTime).split('.')[0];
      return <time style={postStyle.upperTimeago}>{dispCurrentTime} sec.</time>;
    } else {
      return (
        <span style={postStyle.upperTimeago} className={'timeAgo'}>
          <TimeAgo date={createTime} formatter={(value, unit, suffix) => util.timeAgoFormatter(value, unit, suffix, ui.extensionMode)} />
        </span>
      );
    }
  }

  renderUpper() {
    const { childLayerCnt, post, app, ui } = this.props;
    const { title, _id } = post;
    const { postStyle } = this.state;
    const childLabel = childLayerCnt > 0 ? `${childLayerCnt}child` : '';
    const marqueeStyle: {} = this.getMarqueeStyle();
    const upperStyle = PostStyle.getUpper({ app, ui });
    return (
      <div style={{ ...upperStyle, overflow: 'hidden' }}>
        <div style={postStyle.upperChild}>{childLabel}</div>
        <div ref={this.marqueeWrapRef} data-component-name={'MarqueePost'} style={postStyle.upperTitle} title={title}>
          <span ref={this.marqueeTextRef} style={marqueeStyle}>
            {title}
          </span>
        </div>
        {this.renderTime()}
      </div>
    );
  }

  renderPost(post, app, ui): React.ReactNode {
    const isStamp = Boolean(post.stampId);
    const bottomPostStyle = PostStyle.getBottomPost({ app, ui }, isStamp);
    const postHtml = isStamp ? Icon.getStampStr(post.post, 0, ui.isBubblePost) : post.post;
    return <span style={bottomPostStyle} dangerouslySetInnerHTML={{ __html: postHtml }} />;
  }
}
