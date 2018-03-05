import Style from './index';
import Container from './Container';

export default class Icon {
  constructor( params ){
    const { bootOption } = params;
    const headTab = Icon.getHeadTab( bootOption );
    const menu = Icon.getMenu( bootOption );
    return {
      headTab,
      menu,
    }
  }

  static getMenu( bootOption ){
    const div = Style.get({
      layout: Style.getLayoutBlock(),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase(),
    });

    const span = Style.get({
      layout: Style.getLayoutBlock({
        width: '6px',
        height: '6px',
        margin: '3px 70% 3px',
        borderRadius: '6px',
        background: Container.calmRGB,
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase(),
    });
    return {div, span};
  }

  static get getHeadTabLeftOpenTransform(){return 'rotate( 65deg ) translate3d(-3px, 5px, 0px)'};
  static get getHeadTabLeftCloseTransform(){return 'rotate( 90deg ) translate3d(-3px, 5px, 0px)'};
  static get getHeadTabRightOpenTransform(){return 'rotate( -65deg ) translate3d(3px, 5px, 0px)'};
  static get getHeadTabRightCloseTransform(){return 'rotate( -90deg ) translate3d(3px, 5px, 0px)'};
  static getHeadTab( bootOption ){

    const commonLayout = Style.getLayoutInlineBlock({
      width: '4px',
      height: '20px',
      borderRadius: '10px',
      background: Container. calmRGB,
    });

    const div = Style.get({
      layout: Style.getLayoutBlock(),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase(),
    });

    const left = Style.get({
      layout: commonLayout,
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transition: '1500ms',
        transform: Icon.getHeadTabLeftCloseTransform,
      }),
    });

    const right = Style.get({
      layout: commonLayout,
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transition: '1500ms',
        transform: Icon.getHeadTabRightCloseTransform,
      }),
    });
    return {div,left,right};
  }
}
