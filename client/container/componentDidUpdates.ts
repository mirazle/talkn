import React from "react";
import App from "api/store/App";
import Ui from "client/store/Ui";
import TalknWindow from "client/operations/TalknWindow";

export default (self, constructorName) => {
  const { props } = self;
  const { actionLog } = props.clientState;
  const actionName = actionLog[0];
  if (componentDidUpdates[constructorName]) {
    if (componentDidUpdates[constructorName][actionName]) {
      componentDidUpdates[constructorName][actionName](self);
    }
  }
};

const componentDidUpdates = {
  Container: {
    "API_TO_CLIENT[EMIT]:find": self => {
      const { ui } = self.props.clientState;
      const { app, thread } = self.apiState;
      const Posts = document.querySelector("[data-component-name=Posts]");

      const ch = thread.ch;
      ui.postsHeight += TalknWindow.getPostsHeight();
      self.props.updatePostsHeight(ui.postsHeight);

      if (ui.extensionMode === Ui.extensionModeExtNoneLabel && Posts) {
        switch (ui.screenMode) {
          case Ui.screenModeLargeLabel:
            Posts.scrollTop = 99999999;
            break;
          default:
            window.scrollTo(0, 99999999);
            break;
        }

        window.talknWindow.srollHeight = Posts.clientHeight;

        if (app.dispThreadType === App.dispThreadTypeTimeline) {
          /*
          TalknMedia.init("FIND");
          const timeline = storage.getStoragePostsTimeline(ch);
          const media = TalknMedia.getMedia(thread);
          window.talknMedia = new TalknMedia();
          window.talknMedia.setTimeline(timeline);
          window.talknMedia.startMedia(media);
          */
        }
      }
      if (ui.extensionMode === Ui.extensionModeExtNoneLabel) {
        switch (ui.screenMode) {
          case Ui.screenModeLargeLabel:
            if (Posts && Posts.scrollHeight) {
              window.talknWindow.updateUiTimeMarker(Posts.scrollHeight - Posts.clientHeight);
            }
            break;
          case Ui.screenModeMiddleLabel:
          case Ui.screenModeSmallLabel:
            window.talknWindow.updateUiTimeMarker(window.scrollY - window.innerHeight);
            break;
        }
      } else {
        window.talknWindow.updateUiTimeMarker(Posts.scrollHeight - Posts.clientHeight);
      }

      if (!ui.isOpenLinks) {
        self.clientAction("CLOSE_LINKS");
      }

      window.talknWindow.parentExtTo("find", self.props.state);
      window.talknWindow.resizeEndWindow();
    },
    "API_TO_CLIENT[EMIT]:changeThreadDetail": self => {
      const { ui } = self.props.clientState;
      const { thread, threadDetail } = self.apiState;
      if (!ui.isOpenDetail) {
        ui.isOpenDetail = true;
        self.clientAction("ON_CLICK_TOGGLE_DISP_DETAIL", { threadDetail, thread, ui });
      }
    },
    ON_CLICK_MULTISTREAM: self => {
      const { ui } = self.props.clientState;
      const Posts = document.querySelector("[data-component-name=Posts]");
      if (ui.extensionMode === Ui.extensionModeExtNoneLabel) {
        switch (ui.screenMode) {
          case Ui.screenModeLargeLabel:
            window.talknWindow.updateUiTimeMarker(Posts.scrollHeight - Posts.clientHeight);
            break;
          case Ui.screenModeMiddleLabel:
          case Ui.screenModeSmallLabel:
            window.talknWindow.updateUiTimeMarker(window.scrollY - window.innerHeight);
            break;
        }
      } else {
        window.talknWindow.updateUiTimeMarker(Posts.scrollHeight - Posts.clientHeight);
      }
      const wndowScrollY = 9999999;
      window.scrollTo(0, wndowScrollY);
      Posts.scrollTop = Posts.scrollHeight - Posts.clientHeight;
    },
    ON_TRANSITION_END: self => {
      const { ui } = self.props.clientState;
      ui.postsHeight += TalknWindow.getPostsHeight();
      self.props.updatePostsHeight(ui.postsHeight);
    },
    ON_CHANGE_FIND_TYPE: self => {
      console.log(self);
      const { ch } = self.apiState.thread;
      self.coreApi("findMenuIndex", { thread: ch });
    },
    DELEGATE_POST: self => {
      self.coreApi("post");
      self.coreApi("onChangeInputPost");
      self.clientAction("CLOSE_DISP_POSTS_SUPPORTER");
    },
    GET_CLIENT_METAS: self => {
      const { app, thread } = self.props.clientState;
      const { serverMetas } = thread;
      if (!app.isLinkCh) {
        window.talknWindow.parentCoreApi("updateThreadServerMetas", serverMetas);
      }
    },
    ON_CLICK_TOGGLE_DISP_DETAIL: self => {
      const { ui } = self.props.clientState;
      if (ui.extensionMode === Ui.extensionModeExtModalLabel || ui.extensionMode === Ui.extensionModeExtIncludeLabel) {
        window.talknWindow.parentExtTo("getClientMetas");
      }
    },
    TOGGLE_BUBBLE_POST: self => {
      const { ui } = self.props.clientState;
      const Posts = document.querySelector("[data-component-name=Posts]");
      if (ui.extensionMode === Ui.extensionModeExtNoneLabel) {
        switch (ui.screenMode) {
          case Ui.screenModeLargeLabel:
            Posts.scrollTop = Posts.scrollHeight - Posts.clientHeight;
            window.talknWindow.updateUiTimeMarker(Posts.scrollTop);
            break;
          case Ui.screenModeMiddleLabel:
          case Ui.screenModeSmallLabel:
            const wndowScrollY = 9999999;
            window.scrollTo(0, wndowScrollY);
            window.talknWindow.updateUiTimeMarker(wndowScrollY);
            break;
        }
      } else {
        Posts.scrollTop = Posts.scrollHeight - Posts.clientHeight;
        window.talknWindow.updateUiTimeMarker(Posts.scrollTop);
      }
    },
    RESIZE_END_WINDOW: self => {}
  },
  Posts: {
    "API_TO_CLIENT[BROADCAST]:find": self => {
      // changeLockMode(self, "Posts");
    },
    SCROLL_THREAD: self => {},
    NEXT_POSTS_TIMELINE: post,
    "API_TO_CLIENT[BROADCAST]:post": post,
    "API_TO_CLIENT[EMIT]:getMore": self => {
      const { ui } = self.props.clientState;
      const Posts = document.querySelector("[data-component-name=Posts]");
      self.scrollToDidUpdateGetMore();

      switch (ui.screenMode) {
        case Ui.screenModeLargeLabel:
          window.talknWindow.updateUiTimeMarker(Posts.scrollTop);
          break;
        case Ui.screenModeMiddleLabel:
        case Ui.screenModeSmallLabel:
          window.talknWindow.updateUiTimeMarker(window.scrollY);
          break;
      }
    }
  }
};

function post(self) {
  const { ui } = self.props.clientState;
  const Posts = document.querySelector("[data-component-name=Posts]");
  // ui.postsHeight += TalknWindow.getLastPostHeight();
  const postsScrollFunc = () => {
    if (ui.isOpenPosts && window.talknWindow.isScrollBottom) {
      self.animateScrollTo(Posts, Posts.scrollHeight, 400, self.props.endAnimateScrollTo);
    }
    if (ui.isOpenPosts) {
      self.props.openNewPost();
    }
  };
  if (ui.extensionMode === Ui.extensionModeExtNoneLabel) {
    if (ui.screenMode === Ui.screenModeLargeLabel) {
      postsScrollFunc();
    } else {
      window.talknWindow.scrollHeight = Posts.clientHeight;
      if (ui.isOpenPosts && window.talknWindow.isScrollBottom) {
        window.talknWindow.animateScrollTo(window.talknWindow.scrollHeight, 400, self.props.endAnimateScrollTo);
      }
      if (ui.isOpenPosts) {
        self.props.openNewPost();
      }
    }
  } else {
    postsScrollFunc();
  }
}
