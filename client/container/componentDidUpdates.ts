import React from "react";
import Ui from "client/store/Ui";
import TalknWindow from "client/operations/TalknWindow";
import thread from "api/reducers/thread";

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
    "API_TO_CLIENT[EMIT]:fetchPosts": (self) => {
      const { ui } = self.props.state;
      const Posts = document.querySelector("[data-component-name=Posts]");
      ui.postsHeight += TalknWindow.getPostsHeight();
      self.props.updatePostsHeight(ui.postsHeight);
      switch (ui.screenMode) {
        case Ui.screenModeLargeLabel:
          Posts.scrollTop = 99999999;
          break;
        default:
          window.scrollTo(0, 99999999);
          break;
      }
      if (Posts) {
        window.talknWindow.srollHeight = Posts.clientHeight;
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

        if (!ui.isOpenLinks) {
          self.clientAction("CLOSE_LINKS");
        }

        window.talknWindow.parentExtTo("fetchPosts", self.props.state);
        window.talknWindow.resizeEndWindow();
        window.talknWindow.removeTalknBg();
      }
    },
    "API_TO_CLIENT[EMIT]:changeThreadDetail": (self) => {
      const { threadDetail, ui } = self.props.state;
      if (!ui.isOpenDetail) {
        ui.isOpenDetail = true;
        self.clientAction("ON_CLICK_TOGGLE_DISP_DETAIL", { threadDetail, app: { detailCh: threadDetail.ch }, ui });
      }
    },
    ON_CLICK_MULTISTREAM: (self) => {
      const { ui } = self.props.state;
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
    ON_TRANSITION_END: (self) => {
      const { ui } = self.props.state;
      ui.postsHeight += TalknWindow.getPostsHeight();
      self.props.updatePostsHeight(ui.postsHeight);
    },
    ON_CHANGE_FIND_TYPE: (self) => {
      const { ch } = self.props.state.thread;
      self.coreApi("rank", { thread: ch });
    },
    DELEGATE_POST: (self) => {
      self.coreApi("post");
      self.coreApi("onChangeInputPost");
      self.clientAction("CLOSE_DISP_POSTS_SUPPORTER");
    },
    GET_CLIENT_METAS: (self) => {
      const { app, thread } = self.props.state;
      const { serverMetas } = thread;
      if (!app.isLinkCh) {
        window.talknWindow.parentCoreApi("updateThreadServerMetas", serverMetas);
      }
    },
    ON_CLICK_TOGGLE_DISP_DETAIL: (self) => {
      const { ui } = self.props.state;
      if (ui.extensionMode === Ui.extensionModeExtModalLabel || ui.extensionMode === Ui.extensionModeExtIncludeLabel) {
        window.talknWindow.parentExtTo("getClientMetas");
      }
    },
    TOGGLE_BUBBLE_POST: (self) => {
      const { ui } = self.props.state;
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
    RESIZE_END_WINDOW: (self) => {},
  },
  Posts: {
    "API_TO_CLIENT[BROADCAST]:fetchPosts": (self) => {
      // changeLockMode(self, "Posts");
    },
    SCROLL_THREAD: (self) => {},
    NEXT_POSTS_TIMELINE: post,
    "API_TO_CLIENT[BROADCAST]:post": post,
    "API_TO_CLIENT[EMIT]:getMore": (self) => {
      const { ui } = self.props.state;
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
    },
  },
};

function post(self) {
  const { ui } = self.props.state;
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

  if (ui.screenMode === Ui.screenModeLargeLabel) {
    postsScrollFunc();
  } else {
    window.talknWindow.scrollHeight = Posts.clientHeight;

    if (ui.isOpenPosts) {
      if (window.talknWindow.isScrollBottom) {
        window.talknWindow.animateScrollTo(window.talknWindow.scrollHeight, 400, self.props.endAnimateScrollTo);
      } else {
        self.props.openNewPost();
      }
    }
  }
}
