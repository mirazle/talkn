import React from "react";
import App from "common/schemas/state/App";
import UiTimeMarker from "common/schemas/state/UiTimeMarker";
import TalknWindow from "client/operations/TalknWindow";
import TalknMedia from "client/operations/TalknMedia";
import storage from "client/mapToStateToProps/storage";

export default (self, constructorName) => {
  const { props } = self;
  const { actionLog } = props.state;
  const actionName = actionLog[0];

  if (componentDidUpdates[constructorName]) {
    if (componentDidUpdates[constructorName][actionName]) {
      componentDidUpdates[constructorName][actionName](self);
    }
  }
};

const componentDidUpdates = {
  Container: {
    "SERVER_TO_CLIENT[EMIT]:find": self => {
      const { app, thread } = self.props.state;
      const Posts = document.querySelector("[data-component-name=Posts]");

      const ch = thread.ch;
      app.postsHeight += TalknWindow.getPostsHeight();
      self.props.updatePostsHeight(app.postsHeight);

      if (app.extensionMode === "NONE" && Posts) {
        window.scrollTo(0, 99999999);
        window.talknWindow.threadHeight = Posts.clientHeight;

        if (app.dispThreadType === App.dispThreadTypeTimeline) {
          TalknMedia.init("FIND");
          const timeline = storage.getStoragePostsTimeline(ch);
          const media = TalknMedia.getMedia(thread);
          window.talknMedia = new TalknMedia();
          window.talknMedia.setTimeline(timeline);
          window.talknMedia.startMedia(media);
        }
      }

      if (app.extensionMode === App.extensionModeExtNoneLabel) {
        switch (app.screenMode) {
          case App.screenModeLargeLabel:
            window.talknWindow.updateUiTimeMarker(Posts.scrollHeight - Posts.clientHeight);
            break;
          case App.screenModeMiddleLabel:
          case App.screenModeSmallLabel:
            window.talknWindow.updateUiTimeMarker(window.scrollY - window.innerHeight);
            break;
        }
      } else {
        window.talknWindow.updateUiTimeMarker(Posts.scrollHeight - Posts.clientHeight);
      }

      if (!app.isOpenLinks) {
        window.talknAPI.closeLinks();
      }

      window.talknWindow.parentTo("find", self.props.state);
      window.talknWindow.resizeEndWindow();
    },
    "SERVER_TO_CLIENT[EMIT]:changeThreadDetail": self => {
      const { app, threadDetail, thread } = self.props.state;
      if (!app.isOpenDetail) {
        app.isOpenDetail = true;
        window.talknAPI.onClickToggleDispDetail({ threadDetail, thread, app });
      }
    },
    ON_CLICK_MULTISTREAM: self => {
      const { app } = self.props.state;
      const Posts = document.querySelector("[data-component-name=Posts]");
      if (app.extensionMode === App.extensionModeExtNoneLabel) {
        switch (app.screenMode) {
          case App.screenModeLargeLabel:
            window.talknWindow.updateUiTimeMarker(Posts.scrollHeight - Posts.clientHeight);
            break;
          case App.screenModeMiddleLabel:
          case App.screenModeSmallLabel:
            window.talknWindow.updateUiTimeMarker(window.scrollY - window.innerHeight);
            break;
        }
      } else {
        window.talknWindow.updateUiTimeMarker(Posts.scrollHeight - Posts.clientHeight);
      }
    },
    ON_TRANSITION: self => {
      const { app } = self.props.state;
    },
    ON_TRANSITION_END: self => {
      const { app } = self.props.state;
      app.postsHeight += TalknWindow.getPostsHeight();
      self.props.updatePostsHeight(app.postsHeight);
    },
    OPEN_NOTIF: self => {
      const { app } = self.props.state;
      if (
        app.extensionMode === App.extensionModeExtBottomLabel ||
        app.extensionMode === App.extensionModeExtIncludeLabel ||
        app.extensionMode === App.extensionModeExtModalLabel
      ) {
        let { handleOnClickToggleMain, props } = self;
        const { style, thread } = props.state;
        const posts = props.state[`posts${app.dispThreadType}`];
        let lastPost: any = posts[posts.length - 1];

        if (lastPost && !app.isOpenPosts) {
          self.props.createNotif();
          /*
          self.setState({
            notifs: self.state.notifs.concat(
              <Notif
                key={lastPost._id}
                app={app}
                style={style}
                thread={thread}
                post={lastPost}
                handleOnClickToggleMain={handleOnClickToggleMain}
              />
            )
          });
          */
        }
      }
    },
    ON_CHANGE_FIND_TYPE: self => {
      const { ch } = self.props.state.thread;
      window.talknAPI.findMenuIndex(ch);
    },
    CLOSE_NOTIF: self => {
      if (self.state.notifs.length > 0) {
        self.setState({ notifs: [] });
      }
    },
    DELEGATE_POST: self => {
      window.talknAPI.post();
      window.talknAPI.onChangeInputPost("");
      window.talknAPI.closeDispPostsSupporter();
    },
    GET_CLIENT_METAS: self => {
      const { app, thread } = self.props.state;
      const { serverMetas } = thread;
      if (!app.isLinkCh) {
        window.talknAPI.updateThreadServerMetas(serverMetas);
      }
    },
    ON_CLICK_TOGGLE_DISP_DETAIL: self => {
      const { app } = self.props.state;
      if (
        app.extensionMode === App.extensionModeExtModalLabel ||
        app.extensionMode === App.extensionModeExtIncludeLabel
      ) {
        window.talknWindow.parentTo("getClientMetas");
      }
    },
    TOGGLE_BUBBLE_POST: self => {
      const { app } = self.props.state;
      const Posts = document.querySelector("[data-component-name=Posts]");
      if (app.extensionMode === App.extensionModeExtNoneLabel) {
        switch (app.screenMode) {
          case App.screenModeLargeLabel:
            Posts.scrollTop = Posts.scrollHeight - Posts.clientHeight;
            window.talknWindow.updateUiTimeMarker(Posts.scrollTop);
            break;
          case App.screenModeMiddleLabel:
          case App.screenModeSmallLabel:
            const wndowScrollY = window.scrollY - window.innerHeight;
            window.scrollTo(0, wndowScrollY);
            window.talknWindow.updateUiTimeMarker(wndowScrollY);
            break;
        }
      } else {
        Posts.scrollTop = Posts.scrollHeight - Posts.clientHeight;
        window.talknWindow.updateUiTimeMarker(Posts.scrollTop);
      }
    },
    RESIZE_END_WINDOW: self => {
      const { app } = self.props.state;
      const Posts = document.querySelector("[data-component-name=Posts]");
      if (Posts) {
        window.talknWindow.threadHeight = Posts.clientHeight;
        changeLockMode(self, "Container");
      }

      if (app.extensionMode === App.extensionModeExtNoneLabel) {
        switch (app.screenMode) {
          case App.screenModeLargeLabel:
            window.talknWindow.updateUiTimeMarker(Posts.scrollHeight - Posts.clientHeight);
            break;
          case App.screenModeMiddleLabel:
          case App.screenModeSmallLabel:
            window.talknWindow.updateUiTimeMarker(window.scrollY - window.innerHeight);
            break;
        }
      } else {
        window.talknWindow.updateUiTimeMarker(Posts.scrollHeight - Posts.clientHeight);
      }
    }
  },
  Posts: {
    "SERVER_TO_CLIENT[EMIT]:find": self => {
      const { app } = self.props.state;
    },
    "SERVER_TO_CLIENT[BROADCAST]:find": self => {
      changeLockMode(self, "Posts");
    },
    RESIZE_END_WINDOW: self => {
      changeLockMode(self, "Posts");
    },
    SCROLL_THREAD: self => {},
    NEXT_POSTS_TIMELINE: post,
    "SERVER_TO_CLIENT[BROADCAST]:post": post,
    "SERVER_TO_CLIENT[EMIT]:getMore": self => {
      const { app } = self.props.state;
      const Posts = document.querySelector("[data-component-name=Posts]");

      // ADJUSTMENT GET MORE SCROLL VOLUME
      if (
        app.extensionMode === App.extensionModeExtBottomLabel ||
        app.extensionMode === App.extensionModeExtIncludeLabel ||
        app.extensionMode === App.extensionModeExtModalLabel
      ) {
        Posts.scrollTop = Posts.scrollHeight - self.state.scrollHeight;
      } else {
        if (app.screenMode === App.screenModeLargeLabel) {
          Posts.scrollTop = Posts.scrollHeight - self.state.scrollHeight;
        } else {
          const scrollTo = Posts.clientHeight - window.talknWindow.threadHeight;
          window.scrollTo(0, scrollTo);
          window.talknWindow.threadHeight = Posts.clientHeight;
        }
      }

      switch (app.screenMode) {
        case App.screenModeLargeLabel:
          window.talknWindow.updateUiTimeMarker(Posts.scrollTop);
          break;
        case App.screenModeMiddleLabel:
        case App.screenModeSmallLabel:
          window.talknWindow.updateUiTimeMarker(window.scrollY);
          break;
      }
    }
  }
};

function changeLockMode(self, called) {
  const { app, actionLog } = self.props.state;
  if (app.extensionMode === App.extensionModeExtNoneLabel) {
    if (app.screenMode === App.screenModeLargeLabel) {
      if (called === "Posts") {
        if (actionLog[0] === "SERVER_TO_CLIENT[BROADCAST]:find") {
          self.refs.thread.scrollTop = 999999;
        } else {
        }
      } else {
        if (actionLog[0] === "SERVER_TO_CLIENT[EMIT]:find") {
        } else {
        }
      }
      /*
            self.props.animateScrollTo(
                9999999,
                0
            );
*/
      window.talknWindow.lockWindow({});
    } else {
      //window.scrollTo(0, 9999999);
      window.talknWindow.unlockWindow({});
    }
  }
}

function post(self) {
  const { app } = self.props.state;
  const Posts = document.querySelector("[data-component-name=Posts]");
  app.postsHeight += TalknWindow.getLastPostHeight();

  const postsScrollFunc = () => {
    if (app.isOpenPosts && window.talknWindow.isScrollBottom) {
      self.animateScrollTo(Posts, Posts.scrollHeight, 400, self.props.endAnimateScrollTo);
    }
    if (app.isOpenPosts) {
      self.props.openNewPost();
    }
  };

  if (app.extensionMode === "NONE") {
    if (app.screenMode === App.screenModeLargeLabel) {
      postsScrollFunc();
    } else {
      window.talknWindow.threadHeight = Posts.clientHeight;
      if (app.isOpenPosts && window.talknWindow.isScrollBottom) {
        window.talknWindow.animateScrollTo(window.talknWindow.threadHeight, 400, self.props.endAnimateScrollTo);
      }
      if (app.isOpenPosts) {
        self.props.openNewPost();
      }
    }
  } else {
    postsScrollFunc();
  }
}
