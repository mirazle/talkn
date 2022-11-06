import Ui from 'common/clientState/store/Ui';

import Container from './Container';
import PostsFooter from './PostsFooter';
import Style from './index';

export default class PostsSupporter {
  static get selfHeight() {
    return 172;
  }
  static getTransform({ app, ui }) {
    return ui.isOpenPostsSupporter
      ? `translate3d( 0px, -${PostsSupporter.selfHeight + Container.getBlockSize({ app, ui })}px, 0px )`
      : 'translate3d( 0px, 0px, 0px )';
  }

  self: Object;
  emoji: Object;
  emojiLabel: Object;
  constructor(params) {
    const self = PostsSupporter.getSelf(params);
    const emoji = PostsSupporter.getEmoji(params);
    const emojiLabel = PostsSupporter.getEmojiLabel(params);
    return {
      self,
      emoji,
      emojiLabel,
    };
  }

  static getSelf({ app, ui }) {
    const layout = Style.getLayoutFlex({
      display: 'flex',
      position: 'fixed',
      bottom: `-${PostsSupporter.selfHeight}px`,
      left: PostsFooter.getLeft({ app, ui }),
      height: PostsSupporter.selfHeight,
      width: PostsFooter.getWidth({ app, ui }),
      maxWidth: PostsFooter.getWidth({ app, ui }),
      color: Container.whiteRGB,
      flexFlow: 'column wrap',
      alignItems: 'center',
      justifyContent: 'flex-start',
      background: Container.darkRGBA,
      whiteSpace: 'nowrap',
      overflowScrolling: 'touch',
      WebkitOverflowScrolling: 'touch',
      overflow: 'hidden',
      zIndex: 2,
    });
    const content = {
      overflow: 'scroll hidden',
    };
    const animation = Style.getAnimationBase({
      transition: Container.getTransitionFirstOn({ app, ui }),
      transform: PostsSupporter.getTransform({ app, ui }),
    });
    return Style.get({ layout, content, animation });
  }

  static getEmoji({ app, ui }) {
    const fontSize = Ui.screenSizeSmallLabel === ui.screenSize ? '35px' : '40px';
    const layout = Style.getLayoutFlex({
      width: '20%',
      minWidth: 'auto',
      maxWidth: 'auto',
      height: '86px',
      flexFlow: 'column wrap',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '5px',
    });
    const content = Style.getContentBase({
      fontSize,
      cursor: 'pointer',
    });
    const animation = Style.getAnimationBase({
      transition: Container.getTransition({ app, ui }),
      transform: 'scale(1.0)',
    });
    return Style.get({ layout, content, animation });
  }

  static getEmojiLabel({ app, ui }) {
    const margin = Ui.screenSizeSmallLabel === ui.screenSize ? '0px' : '0px';
    const fontSize = Ui.screenSizeSmallLabel === ui.screenSize ? '8px' : '10px';
    const layout = Style.getLayoutFlex({
      width: 'auto',
      minWidth: 'auto',
      maxWidth: 'auto',
      height: '30px',
      margin,
    });
    const content = Style.getContentBase({
      wordBreak: 'break-word',
      fontSize,
      color: Container.whiteRGB,
    });
    const animation = Style.getAnimationBase({});
    return Style.get({ layout, content, animation });
  }
}
