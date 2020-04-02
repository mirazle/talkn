import conf from "common/conf";
import util from "common/util";
import define from "common/define";
import Sequence from "api/Sequence";
import App from "api/store/App";
import Ui from "client/store/Ui";
import storage from "api/mapToStateToProps/storage";
import Container from "client/style/Container";

export default {
  updateAction: store => next => action => {
    const clientState = store.getState();
    if (action) {
      action.ui = action.ui ? { ...clientState.ui, ...action.ui } : clientState.ui;
    }

    if (functions[action.type]) {
      action = functions[action.type](clientState, action);
    }

    if (action) {
      next(action);
    }
  }
};

const functions = {
  "API_TO_CLIENT[REQUEST]:getMore": (clientState, action) => {
    action.ui.isLoading = true;
    return action;
  },
  "API_TO_CLIENT[EMIT]:getMore": (clientState, action) => {
    action.ui.isLoading = false;
    return action;
  },
  "API_TO_CLIENT[REQUEST]:find": (clientState, action) => {
    action.ui.isLoading = true;
    return action;
  },
  "API_TO_CLIENT[REQUEST]:changeThread": (clientState, action) => {
    action.ui.isLoading = true;
    return action;
  },
  "API_TO_CLIENT[EMIT]:find": (clientState, action) => {
    action.ui.isLoading = false;
    action.ui.detailCh = action.thread.ch;
    if (!action.app.isLinkCh) {
      switch (action.ui.extensionMode) {
        case Ui.extensionModeExtBottomLabel:
          if (!action.ui.isOpenPosts && !action.ui.isDispPosts) {
            const transition = Container.transitionNotif * 4 + Container.transitionNotifDisp;
            window.talknWindow.parentExtTo("openNotif", { transition });
          }
          break;
        case Ui.extensionModeExtModalLabel:
          if (!action.app.isMediaCh && action.posts.length > 0) {
            const id = action.posts[action.posts.length - 1]["_id"];
            const post = action.posts[action.posts.length - 1]["post"];
            const stampId = action.posts[action.posts.length - 1]["stampId"];
            let favicon = action.posts[action.posts.length - 1]["favicon"];
            favicon = Sequence.HTTPS_PROTOCOL + "//" + conf.assetsIconPath + util.getSaveFaviconName(favicon);

            window.talknWindow.parentExtTo("openNotif", {
              id,
              post,
              stampId,
              favicon,
              addUnreadCnt: action.posts.length
            });
          }
          break;
      }
    }
    return action;
  },
  "API_TO_CLIENT[BROADCAST]:post": (clientState, action) => {
    const postLength = action.posts.length - 1;
    switch (action.ui.extensionMode) {
      case Ui.extensionModeExtBottomLabel:
        if (!action.ui.isOpenPosts && !action.ui.isDispPosts) {
          const transition = Container.transitionNotif * 4 + Container.transitionNotifDisp;
          window.talknWindow.parentExtTo("openNotif", { transition });
        }
        break;
      case Ui.extensionModeExtModalLabel:
        if (action.posts.length > 0) {
          const id = action.posts[postLength]["_id"];
          const post = action.posts[postLength]["post"];
          const stampId = action.posts[postLength]["stampId"];
          let favicon = action.posts[postLength]["favicon"];
          favicon = Sequence.HTTPS_PROTOCOL + "//" + conf.assetsIconPath + util.getSaveFaviconName(favicon);
          window.talknWindow.parentExtTo("openNotif", {
            id,
            post,
            stampId,
            favicon,
            addUnreadCnt: action.posts.length
          });
        }
        break;
    }
    return action;
  },
  "CLIENT_TO_API[EMIT]:getMore": (clientState, action) => {
    action.ui.isLoading = true;
    return action;
  },
  NEXT_POSTS_TIMELINE: (clientState, action) => {
    const { ui } = clientState;
    switch (ui.extensionMode) {
      case Ui.extensionModeExtBottomLabel:
        if (!ui.isOpenPosts && !ui.isDispPosts) {
          const transition = Container.transitionNotif * 4 + Container.transitionNotifDisp;
          window.talknWindow.parentExtTo("openNotif", { transition });
        }
        break;
      case Ui.extensionModeExtModalLabel:
        const postsTimelineLength = action.postsTimeline.length;
        if (postsTimelineLength > 0) {
          const id = action.postsTimeline[postsTimelineLength - 1]["_id"];
          const post = action.postsTimeline[postsTimelineLength - 1]["post"];
          const stampId = action.postsTimeline[postsTimelineLength - 1]["stampId"];
          let favicon = action.postsTimeline[postsTimelineLength - 1]["favicon"];
          favicon = Sequence.HTTPS_PROTOCOL + "//" + conf.assetsIconPath + util.getSaveFaviconName(favicon);
          window.talknWindow.parentExtTo("openNotif", {
            id,
            post,
            stampId,
            favicon,
            addUnreadCnt: postsTimelineLength
          });
        }
        break;
    }
    return action;
  },
  TOGGLE_DISP_POSTS_SUPPORTER: (clientState, action) => {
    clientState.ui.isOpenPostsSupporter = !clientState.ui.isOpenPostsSupporter;
    return action;
  },
  TOGGLE_LINKS: (clientState, action) => {
    action.ui.isOpenLinks = !clientState.ui.isOpenLinks;
    return action;
  },
  ON_CLICK_TOGGLE_POSTS: (clientState, action) => {
    action.ui.isOpenPosts = action.ui.isOpenPosts ? action.ui.isOpenPosts : Ui.getIsOpenPosts(action.ui);
    return action;
  },
  OFF_TRANSITION: (clientState, action) => {
    action.ui.height = App.getHeight();
    action.ui.isOpenPosts = action.ui.isOpenPosts ? action.ui.isOpenPosts : Ui.getIsOpenPosts(action.ui);
    return action;
  },
  ON_TRANSITION_END: (clientState, action) => {
    action.ui.height = Ui.getHeight();
    action.ui.isOpenPosts = Ui.getIsOpenPosts(action.ui);
    return action;
  },
  RESIZE_END_WINDOW: (clientState, action) => {
    action.ui.isOpenPosts = Ui.getIsOpenPosts(action.ui);
    return action;
  },
  ON_CLICK_TO_MULTI_THREAD: (clientState, action) => {
    action.ui.isLoading = !action.ui.isLoading;
    return action;
  },
  ON_CLICK_TOGGLE_DISP_MENU: (clientState, action) => {
    action.ui.isOpenMenu = !action.ui.isOpenMenu;
    return action;
  },
  TOGGLE_DISP_BOARD: (clientState, action) => {
    action.ui.isOpenBoard = !clientState.ui.isOpenBoard;
    return action;
  },
  OPEN_NEW_POST: (clientState, action) => {
    action.ui.isOpenNewPost = true;
    return action;
  },
  TOGGLE_BUBBLE_POST: (clientState, action) => {
    action.ui.isBubblePost = !clientState.ui.isBubblePost;
    return action;
  },
  CLOSE_NEW_POST: (clientState, action) => {
    action.ui.isOpenNewPost = false;
    return action;
  },
  OPEN_INNER_NOTIF: (clientState, action) => {
    action.ui.openInnerNotif = action.ui.openInnerNotif === "" ? define.noInnerNotif : action.ui.openInnerNotif;
    return action;
  },
  GET_CLIENT_METAS: (clientState, action) => {
    let updateFlg = false;
    let { clientMetas } = action;
    let { serverMetas } = clientState.thread;
    action.thread = {};

    // Metas
    Object.keys(clientMetas).forEach((key, i) => {
      if (clientMetas[key] && clientMetas[key] !== "" && serverMetas[key] !== clientMetas[key]) {
        if (!action.thread.serverMetas) {
          action.thread.serverMetas = {};
        }
        updateFlg = true;
        action.thread.serverMetas[key] = clientMetas[key];
      }
    });

    if (updateFlg) {
      action.threadDetail = { ...clientState.threadDetail };
      action.threadDetail.serverMetas = {
        ...action.threadDetail.serverMetas,
        ...action.thread.serverMetas
      };
      return action;
    }
  }
};
