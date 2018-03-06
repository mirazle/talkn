import Style from './index';
import Container from './Container';

export default class Icon {

  static get defaultSize(){ return 28 };

  constructor( params ){
    const { bootOption } = params;
    const headTab = Icon.getHeadTab( bootOption );
    const menu = Icon.getMenu( bootOption );
    const detail = Icon.getDetail( bootOption );
    return {
      headTab,
      menu,
      detail,
    }
  }

  static getDetail( bootOption = {}){
    const border = {...Container.border, }
    const div = Style.get({
      layout: Style.getLayoutInlineBlock({
        width: Icon.defaultSize,
        height: Icon.defaultSize,
        border: '2px solid rgb(240, 240, 240)',
        borderRadius: '5px',
        paddingTop: '1px',
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase(),
    });

    const commonSpan = Style.get({
      layout: Style.getLayoutBlock({
        width: '18px',
        height: '3px',
        margin: '3px auto 3px',
        borderRadius: '6px',
        background: Container.calmRGB,
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase(),
    });

    const top = Style.get({
      layout: commonSpan,
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transform: `translate3d( 0px, 0px, 0px )`,
      }),
    });

    const middle = Style.get({
      layout: commonSpan,
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transform: `translate3d( 0px, 0px, 0px )`,
      }),
    });

    const bottom = Style.get({
      layout: commonSpan,
      content: Style.getContentBase(),
      animation: Style.getAnimationBase({
        transform: `translate3d( 0px, 0px, 0px )`,
      }),
    });
    return {div, top, middle, bottom, ...bootOption};
  }

  static getMenu( bootOption = {}){
    const div = Style.get({
      layout: Style.getLayoutInlineBlock({
        width: Icon.defaultSize,
        height: Icon.defaultSize,
        margin: '0 auto',
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase(),
    });

    const span = Style.get({
      layout: Style.getLayoutBlock({
        width: '6px',
        height: '6px',
        margin: '0px auto 4px',
        borderRadius: '6px',
        background: Container.calmRGB,
      }),
      content: Style.getContentBase(),
      animation: Style.getAnimationBase(),
    });
    return {div, span, ...bootOption};
  }

  static get getHeadTabLeftOpenTransform(){return 'rotate( 65deg ) translate3d(-3px, 5px, 0px)'};
  static get getHeadTabLeftCloseTransform(){return 'rotate( 90deg ) translate3d(-3px, 5px, 0px)'};
  static get getHeadTabRightOpenTransform(){return 'rotate( -65deg ) translate3d(3px, 5px, 0px)'};
  static get getHeadTabRightCloseTransform(){return 'rotate( -90deg ) translate3d(3px, 5px, 0px)'};
  static getHeadTab( bootOption = {}){

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
    return {div,left,right, ...bootOption};
  }
}
