import React from "react";
import Ui from "client/store/Ui";
import TalknWindow from "client/operations/TalknWindow";

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
    "API_TO_CLIENT[BROADCAST]:tune": (self) => {
      window.talknWindow.ext.to("tune", self.props.state);
    },
    "API_TO_CLIENT[BROADCAST]:disconnect": (self) => {
      window.talknWindow.ext.to("disconnect", self.props.state);
    },
    "API_TO_CLIENT[EMIT]:fetchPosts": (self) => {
      const { app, ui } = self.props.state;
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
        window.talknWindow.dom.srollHeight = Posts.clientHeight;
        switch (ui.screenMode) {
          case Ui.screenModeLargeLabel:
            if (Posts && Posts.scrollHeight) {
              window.talknWindow.dom.updateUiTimeMarker(Posts.scrollHeight - Posts.clientHeight, { app, ui });
            }
            break;
          case Ui.screenModeMiddleLabel:
          case Ui.screenModeSmallLabel:
            window.talknWindow.dom.updateUiTimeMarker(window.scrollY - window.innerHeight, { app, ui });
            break;
        }

        if (!ui.isOpenLinks) {
          self.clientAction("CLOSE_LINKS");
        }

        window.talknWindow.dom.resizeEndWindow();
      }
    },
    "API_TO_CLIENT[EMIT]:changeThread": (self) => {
      const { ui } = self.props.state;
      if (ui.screenMode === Ui.screenModeSmallLabel) {
        self.clientAction("ON_CLICK_TOGGLE_DISP_MENU");
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
      const { app, ui } = self.props.state;
      const Posts = document.querySelector("[data-component-name=Posts]");
      if (ui.extensionMode === Ui.extensionModeExtNoneLabel) {
        switch (ui.screenMode) {
          case Ui.screenModeLargeLabel:
            window.talknWindow.dom.updateUiTimeMarker(Posts.scrollHeight - Posts.clientHeight, { app, ui });
            break;
          case Ui.screenModeMiddleLabel:
          case Ui.screenModeSmallLabel:
            window.talknWindow.dom.updateUiTimeMarker(window.scrollY - window.innerHeight, { app, ui });
            break;
        }
      } else {
        window.talknWindow.dom.updateUiTimeMarker(Posts.scrollHeight - Posts.clientHeight, { app, ui });
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
      const { app, thread } = self.props.state;
      self.api("rank", { thread, app });
    },
    DELEGATE_POST: (self) => {
      self.api("post");
      self.api("onChangeInputPost");
      self.clientAction("CLOSE_DISP_POSTS_SUPPORTER");
    },
    GET_CLIENT_METAS: (self) => {
      const { app, thread } = self.props.state;
      const { serverMetas } = thread;
      if (!app.isLinkCh) {
        self.parentCoreApi("updateThreadServerMetas", serverMetas);
      }
    },
    ON_CLICK_TOGGLE_DISP_DETAIL: (self) => {
      const { ui } = self.props.state;
      if (ui.extensionMode === Ui.extensionModeExtModalLabel || ui.extensionMode === Ui.extensionModeExtEmbedLabel) {
        window.talknWindow.ext.to("getClientMetas");
      }
    },
    TOGGLE_BUBBLE_POST: (self) => {
      const { app, ui } = self.props.state;
      const Posts = document.querySelector("[data-component-name=Posts]");
      if (ui.extensionMode === Ui.extensionModeExtNoneLabel) {
        switch (ui.screenMode) {
          case Ui.screenModeLargeLabel:
            Posts.scrollTop = Posts.scrollHeight - Posts.clientHeight;
            window.talknWindow.dom.updateUiTimeMarker(Posts.scrollTop, { app, ui });
            break;
          case Ui.screenModeMiddleLabel:
          case Ui.screenModeSmallLabel:
            const wndowScrollY = 9999999;
            window.scrollTo(0, wndowScrollY);
            window.talknWindow.dom.updateUiTimeMarker(wndowScrollY, { app, ui });
            break;
        }
      } else {
        Posts.scrollTop = Posts.scrollHeight - Posts.clientHeight;
        window.talknWindow.dom.updateUiTimeMarker(Posts.scrollTop, { app, ui });
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
      const { app, ui } = self.props.state;
      const Posts = document.querySelector("[data-component-name=Posts]");
      self.scrollToDidUpdateGetMore();

      switch (ui.screenMode) {
        case Ui.screenModeLargeLabel:
          window.talknWindow.dom.updateUiTimeMarker(Posts.scrollTop, { app, ui });
          break;
        case Ui.screenModeMiddleLabel:
        case Ui.screenModeSmallLabel:
          window.talknWindow.dom.updateUiTimeMarker(window.scrollY, { app, ui });
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
    if (ui.isOpenPosts && window.talknWindow.dom.isScrollBottom) {
      self.animateScrollTo(Posts, Posts.scrollHeight, 400, self.props.endAnimateScrollTo);
    }
    if (ui.isOpenPosts) {
      self.props.openNewPost();
    }
  };

  if (ui.screenMode === Ui.screenModeLargeLabel) {
    postsScrollFunc();
  } else {
    window.talknWindow.dom.scrollHeight = Posts.clientHeight;

    if (ui.isOpenPosts) {
      if (window.talknWindow.dom.isScrollBottom) {
        window.talknWindow.dom.animateScrollTo(window.talknWindow.dom.scrollHeight, 400, self.props.endAnimateScrollTo);
      } else {
        self.props.openNewPost();
      }
    }
  }
}
