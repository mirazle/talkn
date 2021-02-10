import React from "react";
import TalknComponent from "client/components/TalknComponent";
import App from "api/store/App";
import Ui from "client/store/Ui";
import DateHelper from "client/container/util/DateHelper";
import ContainerStyle from "client/style/Container";
import Icon from "client/components/common/Icon";
import Post from "client/components/Thread/Post";
import TimeMarker from "client/components/Thread/TimeMarker";
import Board from "client/components/Thread/Board";
import Media from "client/components/Thread/Media";
import Marquee from "client/container/util/Marquee";
import IconStyle from "client/style/Icon";


type PostsProps = {
  state: any;
  scrollThread?: any;
  closeNewPost?: any;
  crollThread?: any;
  componentDidUpdates?: any;
  nowDate: {};
  updateUiTimeMarker: (uiTimeMarker) => void;
}

type PostsState = {
  scrollHeight: number;
  scrollTop: number;
  isAnimateScrolling: boolean;
  posts: any;
}

const todayLabel = 'Today';
const yesterdayLabel = 'Yesterday';

export default class Posts extends TalknComponent<PostsProps, PostsState> {
  constructor(props) {
    super(props);
    this.componentName = 'Posts';
    this.renderNewPost = this.renderNewPost.bind(this);
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
    if (ui.screenSize === Ui.screenSizeLargeLabel) {
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

  UNSAFE_componentWillReceiveProps(props) {
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
    if (ui.extensionMode === Ui.extensionModeBottom || ui.extensionMode === Ui.extensionModeModal) {
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
    const NewPost = this.renderNewPost(this.props);
    const LinkLabel = this.renderLinkLabel(this.props);
    const FixMarker = this.renderFixMarker(this.props);
    return (
      <>
        <ol
          data-component-name={this.componentName}
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
        <Media {...this.props} />
        <Board {...this.props} />
        {LinkLabel}
        {NewPost}
        {FixMarker}
      </>
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
              timeLabel = todayLabel;
              break;
            case 1:
              timeLabel = yesterdayLabel;
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

  renderNewPost(props): React.ReactNode {
    const { style, app, ui } = props.state;

    const log = false;
    let dispNewPost = false;

    // 実際に目視できるスレッドの高さ
    const frameHeight = ContainerStyle.getBlockSize({ app, ui }) * 2;
    const postsFrameHeight = window.innerHeight - frameHeight;

    // 実際のスレッドの高さ
    // const postsRealHeight = window.talknWindow.dom.getPostsClientHeight();
    const PostsComponent = document.querySelector("[data-component-name=Posts]");

    if (log) console.log("フレーム枠の縦幅： " + postsFrameHeight);
    if (log) console.log("実際の投稿縦幅： " + window.talknWindow.dom.scrollHeight);
    if (log) console.log("最下位スクロール：　" + window.talknWindow.dom.isScrollBottom);

    // フレーム縦幅よりも、実際の投稿縦幅のほうが小さい場合
    if (PostsComponent) {
      if (window.talknWindow.dom.scrollHeight < postsFrameHeight) {
        // フレーム縦幅よりも、実際の投稿縦幅のほうが大きい場合
      } else {
        // 一番下までスクロールしている場合
        if (window.talknWindow.dom.isScrollBottom) {
          // 一番下までスクロールしていない場合
        } else {
          dispNewPost = true;
        }
      }
    }

    if (dispNewPost) {
      //    if( postsFrameHeight < postsRealHeight ){
      return (
        <div data-component-name="newPost" style={style.container.newPost}>
          NEW POST
        </div>
      );
    } else {
      return null;
    }
  }

  renderFixMarker(props): React.ReactNode {
    const { app, thread, ui, uiTimeMarker, style } = this.props.state;
    if (app.isMediaCh) {
      return undefined;
    } else {
      if (ui.isLoading) {
        const loading = Icon.getLoading(IconStyle.getLoading({ app, ui }));
        return <TimeMarker type={"Fix"} label={loading} style={style.timeMarker.fixTimeMarker} />;
      } else if (thread.postCnt > 0 && uiTimeMarker.now && uiTimeMarker.now.label) {
        return <TimeMarker type={"Fix"} label={uiTimeMarker.now.label} style={style.timeMarker.fixTimeMarker} />;
      }
    }
    return undefined;
  }

  renderLinkLabel(props): React.ReactNode {
    const { style, app, thread } = this.props.state;
    if (app.isLinkCh) {
      return (
        <div data-component-name={"linkLabel"} style={style.container.linkLabel}>
          <Marquee text={`Link: ${thread.title}`} loop={true} hoverToStop={false} trailing={0} leading={0} />
        </div>
      );
    } else {
      return null;
    }
  }
}
