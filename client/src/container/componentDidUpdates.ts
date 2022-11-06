import React from 'react';

import Sequence from 'common/Sequence';
import Ui from 'common/clientState/store/Ui';
import Emotions from 'common/emotions/index';

export default (self, constructorName) => {
  const { props } = self;
  const { clientLog } = props.state;
  const actionName = clientLog[0];
  if (componentDidUpdates[constructorName]) {
    if (componentDidUpdates[constructorName][actionName]) {
      componentDidUpdates[constructorName][actionName](self);
    }
  }
};

const componentDidUpdates = {
  Container: {
    'API_TO_CLIENT[EMIT]:tune': (self) => {
      const { ui } = self.props.state;
      if (ui.extensionMode === Ui.extensionModeLiveMedia) {
        const inputs = JSON.stringify(Emotions.inputs);
        const map = JSON.stringify(Emotions.map);
        window.talknWindow.ext.to('sendStampData', Sequence.UNKNOWN, { inputs, map });
      }
    },
    'API_TO_CLIENT[EMIT]:fetchPosts': (self) => {
      const { app, ui } = self.props.state;
      const Posts = document.querySelector('[data-component-name=Posts]');

      ui.postsHeight += window.talknWindow.dom.getPostsHeight();
      self.props.updatePostsHeight(ui.postsHeight);
      switch (ui.screenSize) {
        case Ui.screenSizeLargeLabel:
        case Ui.screenSizeSmallLabel:
          if (Posts) {
            Posts.scrollTop = 99999999;
          }
          break;
        case Ui.screenSizeMiddleLabel:
          window.scrollTo(0, 99999999);
          break;
      }
      if (Posts) {
        window.talknWindow.dom.srollHeight = Posts.clientHeight;
        switch (ui.screenSize) {
          case Ui.screenSizeLargeLabel:
          case Ui.screenSizeSmallLabel:
            if (Posts && Posts.scrollHeight) {
              window.talknWindow.dom.updateUiTimeMarker(Posts.scrollHeight - Posts.clientHeight, { app, ui });
            }
            break;
          case Ui.screenSizeMiddleLabel:
            window.talknWindow.dom.updateUiTimeMarker(window.scrollY - window.innerHeight, { app, ui });
            break;
        }

        if (!ui.isOpenLinks) {
          self.clientAction('CLOSE_LINKS');
        }

        window.talknWindow.dom.resizeEndWindow();
      }
    },
    'API_TO_CLIENT[EMIT]:changeThread': (self) => {
      const { ui } = self.props.state;
      if (ui.screenSize === Ui.screenSizeSmallLabel) {
        if (ui.clicked !== 'Links' && ui.clicked !== 'BackToRootCh' && ui.clicked !== 'ToMedia') {
          self.clientAction('ON_CLICK_TOGGLE_DISP_MENU');
        }
      }
    },
    'API_TO_CLIENT[EMIT]:changeThreadDetail': (self) => {
      const { threadDetail, ui } = self.props.state;
      if (!ui.isOpenDetail) {
        ui.isOpenDetail = true;
        self.clientAction('ON_CLICK_TOGGLE_DISP_DETAIL', { threadDetail, app: { detailCh: threadDetail.ch }, ui });
      }
    },
    'ON_CLICK_MULTISTREAM': (self) => {
      const { app, ui } = self.props.state;
      const Posts = document.querySelector('[data-component-name=Posts]');
      if (ui.extensionMode === Ui.extensionModeNone) {
        switch (ui.screenSize) {
          case Ui.screenSizeLargeLabel:
          case Ui.screenSizeSmallLabel:
            window.talknWindow.dom.updateUiTimeMarker(Posts.scrollHeight - Posts.clientHeight, { app, ui });
            break;
          case Ui.screenSizeMiddleLabel:
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
    'ON_TRANSITION_END': (self) => {
      const { ui } = self.props.state;
      ui.postsHeight += window.talknWindow.dom.getPostsHeight();
      self.props.updatePostsHeight(ui.postsHeight);
    },
    'ON_CHANGE_FIND_TYPE': (self) => {
      const { app, thread } = self.props.state;
      self.api('rank', { thread, app });
    },
    'DELEGATE_POST': (self) => {
      self.api('post');
      self.api('onChangeInputPost');
      self.clientAction('CLOSE_DISP_POSTS_SUPPORTER');
    },
    'GET_CLIENT_METAS': (self) => {
      const { app, thread } = self.props.state;
      const { serverMetas } = thread;
      if (!app.isLinkCh) {
        self.api('updateThreadServerMetas', serverMetas);
        //        self.parentCoreApi('updateThreadServerMetas', serverMetas);
      }
    },
    'ON_CLICK_TOGGLE_DISP_DETAIL': (self) => {
      const { ui, thread } = self.props.state;
      const host = location.href.replace('https:/', '').replace('http:/', '');
      if (host === thread.ch) {
        if (ui.extensionMode === Ui.extensionModeModal || ui.extensionMode === Ui.extensionModeEmbed) {
          window.talknWindow.ext.to('getClientMetas', Sequence.UNKNOWN);
        }
      }
    },
    'TOGGLE_BUBBLE_POST': (self) => {
      const { app, ui } = self.props.state;
      const Posts = document.querySelector('[data-component-name=Posts]');
      if (ui.extensionMode === Ui.extensionModeNone) {
        switch (ui.screenSize) {
          case Ui.screenSizeLargeLabel:
          case Ui.screenSizeSmallLabel:
            Posts.scrollTop = Posts.scrollHeight - Posts.clientHeight;
            window.talknWindow.dom.updateUiTimeMarker(Posts.scrollTop, { app, ui });
            break;
          case Ui.screenSizeMiddleLabel:
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
    'RESIZE_END_WINDOW': (self) => {},
  },
  Posts: {
    'API_TO_CLIENT[BROADCAST]:fetchPosts': (self) => {
      // changeLockMode(self, "Posts");
    },
    'SCROLL_THREAD': (self) => {},
    'NEXT_POSTS_TIMELINE': post,
    'API_TO_CLIENT[BROADCAST]:post': post,
    'API_TO_CLIENT[EMIT]:getMore': (self) => {
      const { app, ui } = self.props.state;
      const Posts = document.querySelector('[data-component-name=Posts]');
      self.scrollToDidUpdateGetMore();

      switch (ui.screenSize) {
        case Ui.screenSizeLargeLabel:
        case Ui.screenSizeSmallLabel:
          window.talknWindow.dom.updateUiTimeMarker(Posts.scrollTop, { app, ui });
          break;
        case Ui.screenSizeMiddleLabel:
          window.talknWindow.dom.updateUiTimeMarker(window.scrollY, { app, ui });
          break;
      }
    },
  },
};

function post(self) {
  const { ui } = self.props.state;
  const Posts = document.querySelector('[data-component-name=Posts]');
  // ui.postsHeight += TalknWindow.getLastPostHeight();
  const postsScrollFunc = () => {
    if (ui.isOpenPosts && window.talknWindow.dom.isScrollBottom) {
      self.animateScrollTo(Posts, Posts.scrollHeight, 400, self.props.endAnimateScrollTo);
    }
    if (ui.isOpenPosts) {
      self.props.openNewPost();
    }
  };

  switch (ui.screenSize) {
    case Ui.screenSizeLargeLabel:
    case Ui.screenSizeSmallLabel:
      postsScrollFunc();
      break;
    case Ui.screenSizeMiddleLabel:
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
