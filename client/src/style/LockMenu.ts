import { CSSProperties } from 'react';

import Ui from 'common/clientState/store/Ui';

import Container from './Container';
import Style from './index';

export default class LockMenu {
  static getHeadTabUpdate({ app, ui }) {
    const top = ui.screenSize === Ui.screenSizeSmallLabel ? '15px' : '20px';
    return {
      div: {
        position: 'absolute',
        top,
        right: '15px',
        transform: 'scale(0.7)',
      },
    };
  }

  static getCommonLayout({ app, ui }) {
    const layout: any = {
      position: 'fixed',
      width: '90%',
      height: 'fit-content',
      minHeight: 'fit-content',
      maxHeight: 'fit-content',
      top: `calc( 100% + ${Container.getBlockSize({ app, ui })}px)`,
      left: '5%',
      flexFlow: 'column',
      border: Container.border,
      borderRadius: '5px',
      boxShadow: `${Container.lineShadow}`,
    };
    switch (ui.screenSize) {
      case Ui.screenSizeSmallLabel:
        layout.width = `${100 * Container.widthRatio}`;
        layout.left = (100 - layout.width) / 2;
        layout.width = layout.width + '%';
        layout.left = layout.left + '%';
        layout.zIndex = 0;
        break;
      case Ui.screenSizeMiddleLabel:
        layout.width = `${100 * Container.widthRatio}`;
        layout.left = (100 - layout.width) / 2;
        layout.width = layout.width + '%';
        layout.left = layout.left + '%';
        layout.zIndex = 0;
        break;
      case Ui.screenSizeLargeLabel:
        layout.width = `33.3%`;
        layout.left = `33.3%`;
        layout.zIndex = 3;
        break;
    }
    return layout;
  }

  static getCommonTransform({ app, ui }) {
    return ui.openLockMenu === Ui.openLockMenuLabelNo ? 'translate3d(0px, 0px, 0px)' : `translate3d(0px, -75vh, 0px)`;
  }

  static getPaddingLi({ app, ui }) {
    switch (ui.screenSize) {
      case Ui.screenSizeSmallLabel:
        return '15px';
      case Ui.screenSizeMiddleLabel:
      case Ui.screenSizeLargeLabel:
        return '15px 15px 15px 20px';
    }
  }

  menuShare: Object;
  header: Object;
  ul: Object;
  liGoWeb: Object;
  liTwitter: Object;
  liFacebook: Object;
  liEmbed: Object;
  liEmbedInput: Object;
  shareLabel: Object;
  label: Object;
  constructor(params) {
    const menuShare = LockMenu.getMenuShare(params);
    const header = LockMenu.getHeader(params);
    const ul = LockMenu.getUl(params);
    const liGoWeb = LockMenu.getLiGoWeb(params);
    const liTwitter = LockMenu.getLiTwitter(params);
    const liFacebook = LockMenu.getLiFacebook(params);
    const liEmbed = LockMenu.getLiEmbed(params);
    const liEmbedInput = LockMenu.getLiEmbedInput(params);
    const shareLabel = LockMenu.getShareLabel(params);
    const label = LockMenu.getLabel(params);
    return {
      menuShare,
      header,
      ul,
      liGoWeb,
      liTwitter,
      liFacebook,
      liEmbed,
      liEmbedInput,
      shareLabel,
      label,
    };
  }

  static getMenuShare({ app, ui }) {
    const commonLayout = LockMenu.getCommonLayout({ app, ui });
    const layout = Style.getLayoutFlex(commonLayout);
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase({
      transition: Container.getTransition({ app, ui }),
      transform: LockMenu.getCommonTransform({ app, ui }),
    });
    return Style.get({ layout, content, animation });
  }

  static getHeader({ app, ui }) {
    const layout = Style.getLayoutFlex({
      width: '100%',
      height: Container.getBlockSize({ app, ui }),
      maxHeight: Container.getBlockSize({ app, ui }),
      background: Container.whiteRGBA,
      boxShadow: Container.lineShadow,
      padding: '0px 20px',
      zIndex: 2,
    });
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getUl({ app, ui }) {
    const layout = Style.getLayoutBlock({
      width: '100%',
    });
    const content = Style.getContentBase({});
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getLiGoWeb({ app, ui }) {
    const layout = Style.getLayoutFlex({
      width: '100%',
      height: `${Container.getBlockSize({ app, ui })}px`,
      padding: LockMenu.getPaddingLi({ app, ui }),
    });
    const content = Style.getContentBase({
      cursor: 'pointer',
    });
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getLiTwitter({ app, ui }) {
    const layout = Style.getLayoutFlex({
      width: '100%',
      height: `${Container.getBlockSize({ app, ui })}px`,
      padding: LockMenu.getPaddingLi({ app, ui }),
      background: Container.whiteRGBA,
      boxShadow: Container.lineShadow,
    });
    const content = Style.getContentBase({
      cursor: 'pointer',
    });
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getLiFacebook({ app, ui }) {
    const layout = Style.getLayoutFlex({
      width: '100%',
      height: `${Container.getBlockSize({ app, ui })}px`,
      padding: LockMenu.getPaddingLi({ app, ui }),
      background: Container.whiteRGBA,
      boxShadow: Container.lineShadow,
    });
    const content = Style.getContentBase({
      cursor: 'pointer',
    });
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getLiEmbed({ app, ui }) {
    const layout = Style.getLayoutFlex({
      width: '100%',
      height: `${Container.getBlockSize({ app, ui })}px`,
      padding: LockMenu.getPaddingLi({ app, ui }),
      background: Container.whiteRGBA,
      boxShadow: Container.lineShadow,
    });
    const content = Style.getContentBase({
      cursor: 'pointer',
    });
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getLiEmbedInput({ app, ui }) {
    const layout = Style.getLayoutFlex({
      width: '98%',
      height: '25px',
      margin: '0px 0px 0px 20px',
      border: Container.border,
      borderRadius: '5px',
      padding: '5px',
    });
    const content = Style.getContentBase({
      outline: 0,
      cursor: 'pointer',
    });
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getShareLabel({ app, ui }) {
    const layout = Style.getLayoutFlex({
      flexGrow: '1',
    });
    const content = Style.getContentBase({
      color: 'inherit',
      justifyContent: 'flex-start',
      textIndent: '20px',
      textAlign: 'left',
    });
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getLabel({ app, ui }) {
    const layout = Style.getLayoutFlex({
      width: '100%',
    });
    const content = Style.getContentBase({});
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }
}
