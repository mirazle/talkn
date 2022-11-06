import Ui from 'common/clientState/store/Ui';
import conf from 'common/conf';

import Container from '../Container';
import Style from '../index';

export default class SetChModal {
  self: Object;
  modalWrap: Object;
  modal: Object;
  logo: Object;
  input: Object;
  recommend: Object;
  recommendTitle: Object;
  recommendLi: Object;
  example: Object;
  constructor(params: any) {
    const self = SetChModal.getSelf(params);
    const modalWrap = SetChModal.getModalWrap(params);
    const modal = SetChModal.getModal(params);
    const logo = SetChModal.getLogo(params);
    const input = SetChModal.getInput(params);
    const recommend = SetChModal.getRecommend(params);
    const recommendTitle = SetChModal.getRecommendTitle(params);
    const recommendLi = SetChModal.getRecommendLi(params);
    const example = SetChModal.getExample(params);
    return {
      self,
      modalWrap,
      modal,
      logo,
      input,
      recommend,
      recommendTitle,
      recommendLi,
      example,
    };
  }

  static getSelf({ app, ui }) {
    const display = ui.isOpenSetChModal ? 'flex' : 'none';
    const layout = Style.getLayoutFlex({
      display,
      position: 'fixed',
      top: '0',
      left: '0',
      zIndex: '1001',
      flexFlow: 'row wrap',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100vw',
      height: '100vh',
      margin: '0 auto',
      background: Container.darkRGBA,
    });
    const content = Style.getContentBase({});
    const animation = Style.getAnimationBase({
      transition: Container.getTransition({ app, ui }),
    });
    return Style.get({ layout, content, animation });
  }

  static getModalWrap({ app, ui }) {
    const layout = Style.getLayoutFlex({
      position: 'absolute',
      flexFlow: 'column wrap',
      alignItems: 'center',
      justifyContent: 'center',
      width: 'calc( 100% - 40px )',
      maxWidth: '850px',
      minWidth: '320px',
    });
    const content = Style.getContentBase({});
    const animation = Style.getAnimationBase({});
    return Style.get({ layout, content, animation });
  }

  static getModal({ app, ui }) {
    const layout = Style.getLayoutFlex({
      position: 'absolute',
      flexFlow: 'column wrap',
      alignItems: 'flex-start',
      justifyContent: 'center',
      width: '100%',
      maxWidth: '800px',
      height: 'auto',
      padding: '20px',
      margin: '20px',
      background: Container.lightRGB,
    });
    const content = Style.getContentBase({
      borderRadius: '10px',
      boxShadow: '0px 0px 10px rgb(100, 100, 100, 1)',
    });
    const animation = Style.getAnimationBase({});
    return Style.get({ layout, content, animation });
  }

  static getLogo({ app, ui }) {
    const layout = Style.getLayoutFlex({
      width: '200px',
      height: '200px',
      margin: '70px 0 60px',
      background: `url(${conf.assetsPath}logo1.png) center / 128px no-repeat`,
    });
    const content = Style.getContentBase({});
    const animation = Style.getAnimationBase({});
    return Style.get({ layout, content, animation });
  }

  static getInput({ app, ui }) {
    const fontSize = ui.screenSize === Ui.screenSizeSmallLabel ? '0.9em' : '1em';
    const lineHeight = ui.screenSize === Ui.screenSizeSmallLabel ? '0.8em' : '1.4em';
    const layout = Style.getLayoutInlineBlock({
      width: '80%',
      height: '46px',
      padding: '6px',
      background: Container.whiteRGB,
      outline: 'none',
      resize: 'none',
      border: Container.border,
      borderRadius: '6px',
      WebkitAppearance: 'none',
    });
    const content = Style.getContentBase({
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      fontSize,
      lineHeight,
      textAlign: 'left',
      textIndent: '3%',
      color: Container.downreliefRGB,
    });
    const animation = Style.getAnimationBase();

    return Style.get({ layout, content, animation });
  }

  static getRecommendTitle({ app, ui }) {
    const layout = Style.getLayoutFlex({
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      padding: '0',
      margin: '20px 0 0',
    });
    const content = Style.getContentBase({
      textIndent: '30px',
    });
    const animation = Style.getAnimationBase({});
    return Style.get({ layout, content, animation });
  }

  static getRecommend({ app, ui }) {
    const layout = Style.getLayoutFlex({
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      padding: '0',
      margin: '0',
    });
    const content = Style.getContentBase({});
    const animation = Style.getAnimationBase({});
    return Style.get({ layout, content, animation });
  }

  static getRecommendLi({ app, ui }) {
    const layout = Style.getLayoutFlex({});
    const content = Style.getContentBase({
      lineHeight: '28px',
      textDecoration: 'list',
    });
    const animation = Style.getAnimationBase({});
    return Style.get({ layout, content, animation });
  }
  static getExample({ app, ui }) {
    const layout = Style.getLayoutFlex({
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: '0',
      margin: '0',
    });
    const content = Style.getContentBase({
      textIndent: '66px',
    });
    const animation = Style.getAnimationBase({});
    return Style.get({ layout, content, animation });
  }
}
