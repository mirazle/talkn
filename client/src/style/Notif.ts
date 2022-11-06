import Ui from 'common/clientState/store/Ui';
import define from 'common/define';

import Container from './Container';
import Posts from './Posts';
import Style from './index';

export default class Notif {
  static get selfHeight() {
    return 40;
  }

  static getNotifsDisplay({ app, ui }) {
    if (ui.extensionMode === Ui.extensionModeBottom) {
      return 'block';
    } else {
      return 'none';
    }
  }

  static getNotifsHeight({ app, ui }) {
    if (ui.extensionMode === Ui.extensionModeBottom) {
      if (ui.isOpenPosts) {
        return '0px';
      } else {
        if (ui.isOpenNotif) {
          return `${Container.getBlockSize({ app, ui }) + Notif.selfHeight}px`;
        } else {
          return `${Notif.selfHeight}px`;
        }
      }
    } else {
      return '0px';
    }
  }

  notifs: Object;
  self: Object;
  bottom: Object;
  bottomIcon: Object;
  bottomPost: Object;
  constructor(params) {
    const notifs = Notif.getNotifs(params);
    const self = Notif.getSelf(params);
    const bottom = Notif.getBottom(params);
    const bottomIcon = Notif.getBottomIcon(params);
    const bottomPost = Notif.getBottomPost(params);
    return {
      notifs,
      self,
      bottom,
      bottomIcon,
      bottomPost,
    };
  }

  static getNotifs({ app, ui }) {
    const display = Notif.getNotifsDisplay({ app, ui });
    const height = Notif.getNotifsHeight({ app, ui });
    const layout = Style.getLayoutBlock({
      display,
      position: 'absolute',
      top: '0px',
      width: '100%',
      height,
      overflow: 'visible',
    });
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getSelf({ app, ui }) {
    const display = Notif.getNotifsDisplay({ app, ui });
    const width = Posts.getOlWidth({ app, ui }, true);
    const merginLeft = (100 - width) / 2;
    const layout = Style.getLayoutBlock({
      display,
      position: 'absolute',
      top: 0,
      width: `${width}%`,
      height: Notif.selfHeight + 'px',
      background: Container.whiteRGBA,
      //      background: "red",
      marginLeft: `${merginLeft}%`,
      borderTop: Container.border,
      borderLeft: Container.border,
      borderRight: Container.border,
      borderRadius: '3px 3px 0px 0px',
    });
    const content = Style.getContentBase({
      textAlign: 'left',
    });
    const animation = Style.getAnimationBase({
      transform: 'translate3d(0px, 40px, 0px)',
      transition: `${Container.transitionNotif}ms`,
    });
    return Style.get({ layout, content, animation });
  }

  static getBottom({ app, ui }) {
    const layout = {
      width: '100%',
    };
    const content = {};
    const animation = {};
    return Style.get({ layout, content, animation });
  }

  static getBottomIcon({ app, ui }) {
    const layout = {};
    const content = {};
    const animation = {};
    return Style.get({ layout, content, animation });
  }

  static getBottomPost({ app, ui }) {
    const layout = {
      overflow: 'hidden',
      padding: '15px 15px 15px 0px',
      background: 'none',
    };
    const content = {
      lineHeight: '0.8',
      whiteSpace: 'nowrap',
      color: Style.fontBaseRGB,
    };
    const animation = {};
    return Style.get({ layout, content, animation });
  }
}
