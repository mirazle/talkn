import React, { Component } from "react";
import App from "common/schemas/state/App";
import UiTimeMarker from "common/schemas/state/UiTimeMarker";
import DateHelper from "client/container/util/DateHelper";
import Post from "client/components/Post";
import TimeMarker from "client/components/TimeMarker";
import conf from "common/conf";

interface Props {
  state: any;
  scrollThread?: any;
  closeNewPost?: any;
  crollThread?: any;
  componentDidUpdates?: any;
  nowDate: {};
  updateUiTimeMarker: (uiTimeMarker) => void;
}

interface State {
  scrollHeight: number;
  scrollTop: number;
  isAnimateScrolling: boolean;
  posts: any;
}

export default class Posts extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.handleOnMouseDown = this.handleOnMouseDown.bind(this);
    this.handleOnScroll = this.handleOnScroll.bind(this);
    this.handleOnClickGetMore = this.handleOnClickGetMore.bind(this);
    this.handleOnClickPost = this.handleOnClickPost.bind(this);
    this.state = {
      scrollHeight: 0,
      scrollTop: 0,
      isAnimateScrolling: false,
      //isScrollBottom: true,
      posts: []
    };
  }

  componentDidMount() {
    const { app } = this.props.state;
    if (
      app.extensionMode === App.extensionModeExtBottomLabel ||
      app.extensionMode === App.extensionModeExtIncludeLabel ||
      app.extensionMode === App.extensionModeExtModalLabel
    ) {
      const Posts = document.querySelector("[data-component-name=Posts]");
      window.talknWindow.updateUiTimeMarker(Posts.scrollHeight - Posts.clientHeight);
      this.setState({ scrollHeight: Posts.scrollHeight });
      this.animateScrollTo(Posts, 9999999, 400);
    } else {
      //talknWindow.threadHeight = document.querySelector("[data-component-name=Posts]").clientHeight;
      //talknWindow.animateScrollTo( talknWindow.threadHeight, 0 );
      window.talknWindow.animateScrollTo(99999999, 0);
    }

    window.talknAPI.componentDidMounts("Posts");
  }

  componentWillReceiveProps(props) {
    const { app, postsTimeline, postsMulti, postsSingle, postsChild } = props.state;
    let posts = [];
    switch (app.dispThreadType) {
      case App.dispThreadTypeTimeline:
        posts = postsTimeline;
        break;
      case App.dispThreadTypeMulti:
        posts = postsMulti;
        break;
      case App.dispThreadTypeSingle:
        posts = postsSingle;
        break;
      case App.dispThreadTypeChild:
        posts = postsChild;
        break;
      case App.dispThreadTypeLogs:
        posts = postsChild;
        break;
    }

    if (this.state.posts !== posts) {
      this.setState({ ...this.state, posts });
    }
  }

  componentDidUpdate() {
    this.props.componentDidUpdates(this, "Posts");
  }

  animateScrollTo(element, to, duration, callback = () => {}) {
    if (!this.state.isAnimateScrolling) {
      let start = element.scrollTop;
      let change = to - start;
      let currentTime = 0;
      let increment = 20;

      const animateScroll = () => {
        currentTime += increment;
        let scrollTop = Math.easeInOutQuad(currentTime, start, change, duration);
        element.scrollTop = scrollTop;
        if (currentTime < duration) {
          this.setState({ isAnimateScrolling: true });
          setTimeout(animateScroll, increment);
        } else {
          this.setState({ isAnimateScrolling: false });
          callback();
        }
      };
      animateScroll();
    }
  }

  handleOnMouseDown() {
    const { app } = this.props.state;
    if (app.extensionMode === App.extensionModeExtBottomLabel || app.extensionMode === App.extensionModeExtModalLabel) {
      //      this.refs.thread.scrollTop = this.refs.thread.scrollTop + 1;
    }
  }

  handleOnScroll(e) {
    const { app, thread } = this.props.state;
    let { uiTimeMarker } = this.props.state;
    if (app.isOpenNewPost) {
      this.props.closeNewPost();
    }

    const { clientHeight, scrollTop, scrollHeight } = e.target;
    const isScrollBottom = scrollHeight === scrollTop + clientHeight;
    window.talknWindow.setIsScrollBottom(app, isScrollBottom);

    const newUiTimeMarker = UiTimeMarker.update(scrollTop, uiTimeMarker);
    if (uiTimeMarker.now.label !== newUiTimeMarker.now.label) {
      window.talknAPI.onScrollUpdateTimeMarker(newUiTimeMarker);
    }

    if (scrollTop === 0) {
      if (thread.postCnt > conf.findOnePostCnt) {
        const HtmlThread: HTMLElement = this.refs.thread as HTMLElement;
        this.setState({
          ...this.state,
          scrollHeight: HtmlThread.scrollHeight
        });
        window.talknWindow.exeGetMore(this.props.state);
      }
    }
  }

  handleOnClickPost(ch: string) {
    const { threads } = this.props.state;
    let { app } = this.props.state;

    if (threads[ch]) {
      app = App.getAppUpdatedOpenFlgs({ app }, "post");
      window.talknAPI.onClickToggleDispDetail({
        threadDetail: threads[ch],
        app
      });
    } else {
      window.talknAPI.changeThreadDetail(ch);
    }
  }

  handleOnClickGetMore() {
    const HtmlThread: HTMLElement = this.refs.thread as HTMLElement;
    this.setState({
      ...this.state,
      scrollHeight: HtmlThread.scrollHeight
    });
    window.talknAPI.getMore();
  }

  render() {
    const { style } = this.props.state;
    return (
      <ol
        data-component-name={"Posts"}
        style={style.posts.self}
        ref="thread"
        onMouseDown={this.handleOnMouseDown}
        onScroll={this.handleOnScroll}
      >
        {this.renderPostList()}
      </ol>
    );
  }

  renderPostList() {
    const { state, nowDate } = this.props;
    const { app, style, thread } = state;
    const posts = state[`posts${app.dispThreadType}`];
    const postCnt = posts.length;
    let dispPosts = [];
    let beforeDiffDay: number = 0;

    // Add time marker.
    for (let i = 0; i < postCnt; i++) {
      let timeLabel = "";
      const post = posts[i];
      const postYmdhis = DateHelper.getMongoYmdhis(post.createTime);
      const diffDay = DateHelper.getDiffDay(nowDate, postYmdhis);
      const isDispTimeMarker = i === 0 ? true : beforeDiffDay !== diffDay;
      beforeDiffDay = diffDay;

      if (isDispTimeMarker) {
        switch (diffDay) {
          case 0:
            timeLabel = "Today";
            break;
          case 1:
            timeLabel = "Yesterday";
            break;
          default:
            timeLabel = `(${postYmdhis.Day})${postYmdhis.M}/${postYmdhis.D}`;
            break;
        }
        dispPosts.push(
          <TimeMarker key={`TimeMarker${i}_${timeLabel}`} type="List" label={timeLabel} style={style.timeMarker.self} />
        );
      }

      dispPosts.push(
        <Post
          key={`${post._id}_${i}`}
          id={post._id}
          post={post}
          app={app}
          childLayerCnt={post.layer - thread.layer}
          style={style.post}
          onClickPost={this.handleOnClickPost}
        />
      );
    }
    return dispPosts;
  }
}
