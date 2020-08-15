import React from "react";
import TalknComponent from "client/components/TalknComponent";
import App from "api/store/App";
import Ui from "client/store/Ui";
import DateHelper from "client/container/util/DateHelper";
import Post from "client/components/Post";
import TimeMarker from "client/components/TimeMarker";

interface PostsProps {
  state: any;
  scrollThread?: any;
  closeNewPost?: any;
  crollThread?: any;
  componentDidUpdates?: any;
  nowDate: {};
  updateUiTimeMarker: (uiTimeMarker) => void;
}

interface PostsState {
  scrollHeight: number;
  scrollTop: number;
  isAnimateScrolling: boolean;
  posts: any;
}

export default class Posts extends TalknComponent<PostsProps, PostsState> {
  constructor(props) {
    super(props);
    this.handleOnMouseDown = this.handleOnMouseDown.bind(this);
    this.handleOnClickGetMore = this.handleOnClickGetMore.bind(this);
    this.handleOnClickPost = this.handleOnClickPost.bind(this);
    this.state = {
      scrollHeight: 0,
      scrollTop: 0,
      isAnimateScrolling: false,
      posts: [],
    };
  }

  componentDidMount() {
    /*
    const { app, ui } = this.props.state;
    if (ui.screenMode === Ui.screenModeLargeLabel) {
      const Posts = document.querySelector("[data-component-name=Posts]");
      window.talknWindow.dom.updateUiTimeMarker(Posts.scrollHeight - Posts.clientHeight, { app, ui });
      this.setState({ scrollHeight: Posts.scrollHeight });
      this.animateScrollTo(Posts, 9999999, 400);
    } else {
      //talknWindow.threadHeight = document.querySelector("[data-component-name=Posts]").clientHeight;
      //talknWindow.animateScrollTo( talknWindow.threadHeight, 0 );
      window.talknWindow.dom.animateScrollTo(99999999, 0);
    }
    this.clientAction("COMPONENT_DID_MOUNTS", { componentDidMounts: "Posts" });
    */
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
    const { ui } = this.props.state;
    if (ui.extensionMode === Ui.extensionModeExtBottomLabel || ui.extensionMode === Ui.extensionModeExtModalLabel) {
      //      this.refs.thread.scrollTop = this.refs.thread.scrollTop + 1;
    }
  }

  handleOnClickPost(ch: string) {
    let { ui, app, threads } = this.props.state;

    if (threads[ch]) {
      ui = Ui.getUiUpdatedOpenFlgs({ app, ui }, "post");
      this.clientAction("ON_CLICK_TOGGLE_DISP_DETAIL", {
        ui,
        app: { detailCh: ch },
      });
    } else {
      this.api("changeThreadDetail", { thread: { ch } });
    }
  }

  handleOnClickGetMore() {
    const HtmlThread: HTMLElement = this.refs.thread as HTMLElement;
    this.setState({
      ...this.state,
      scrollHeight: HtmlThread.scrollHeight,
    });

    this.api("getMore", {});
  }

  render() {
    const { style } = this.props.state;
    return (
      <ol
        data-component-name={"Posts"}
        style={style.posts.self}
        ref="thread"
        onMouseDown={this.handleOnMouseDown}
        onScroll={(e) => {
          const { scrollTop, clientHeight, scrollHeight }: any = e.target;
          this.onScroll({ scrollTop, clientHeight, scrollHeight });
        }}
      >
        {this.renderPostList()}
      </ol>
    );
  }

  renderPostList() {
    const { state, nowDate } = this.props;
    const { app, thread, ui, style } = state;
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
      if (!app.isMediaCh) {
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
            <TimeMarker
              key={`TimeMarker${i}_${timeLabel}`}
              type="List"
              label={timeLabel}
              style={style.timeMarker.self}
            />
          );
        }
      }

      dispPosts.push(
        <Post
          key={`${post._id}_${i}`}
          id={post._id}
          post={post}
          app={app}
          ui={ui}
          childLayerCnt={post.layer - thread.layer}
          style={style.post}
          onClickPost={this.handleOnClickPost}
        />
      );
    }
    return dispPosts;
  }
}
