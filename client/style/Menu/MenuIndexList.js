import define from '../../../common/define';
import App from '../../../common/schemas/state/App';
import conf from '../../../common/conf';
import Style from '../index';
import Container from '../Container';

export default class MenuIndexList {

  static get iconSize(){ return '25px' };
  static get liHeight(){ return 90 };

  static get activeLiSelfLabel(){ return "activeLiSelf" };
  static get unactiveLiSelfLabel(){ return "unactiveLiSelf" };

  static get activeLiSelfBackground(){ return Container.whiteRGB };
  static get activeLiSelfMouseOverBackground(){ return Container.whiteRGB };
  static get activeLiSelfMouseDownBackground(){ return Container.whiteRGB };
  static get unactiveLiSelfBackground(){ return Container.lightRGB };
  static get unactiveLiSelfMouseOverBackground(){ return Container.offWhitePlusRGB };
  static get unactiveLiSelfMouseDownBackground(){ return Container.whiteRGB };

  static get activeLiSelfBorderRightColor(){ return `1px solid ${Container.whiteRGB}` };
  static get unactiveLiSelfBorderRightColor(){ return Container.border };

  static getUnactiveLiBorder(app){
    if( app.type ===  define.APP_TYPES.EXTENSION){
      return {borderBottom: Container.border};
    }else{
    return app.screenMode === App.screenModeSmallLabel ?
      {borderBottom: Container.border, borderLeft: 0} :
      {borderRight: Container.border, borderBottom: Container.border, borderLeft: 0} ;
    }
  }

  constructor( params ){
    const activeLiSelf = MenuIndexList.getActiveLiSelf( params );
    const unactiveLiSelf = MenuIndexList.getUnactiveLiSelf( params );
    const upper = MenuIndexList.getUpper();
    const upperSpace = MenuIndexList.getUpperSpace();
    const upperRight = MenuIndexList.getUpperRight();
    const bottom = MenuIndexList.getBottom();
    const bottomIcon = MenuIndexList.getBottomIcon();
    const bottomPost = MenuIndexList.getBottomPost();
    const bottomWatchCnt = MenuIndexList.getBottomWatchCnt();
    const bottomWatchCntWrap = MenuIndexList.getBottomWatchCntWrap();
    return {
      activeLiSelf,
      unactiveLiSelf,
      upper,
      upperSpace,
      upperRight,
      bottom,
      bottomIcon,
      bottomPost,
      bottomWatchCnt,
      bottomWatchCntWrap
    }
  }

  static getActiveLiSelf(){
    const layout = Style.getLayoutBlock({
      width: 'initial',
      height: `${MenuIndexList.liHeight}px`,
      padding: '10px',
      borderBottom: Container.border,
      borderRight: `1px solid ${Container.whiteRGB}`,
      background: MenuIndexList.activeLiSelfBackground,
      cursor: 'pointer',
    });
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getUnactiveLiSelf({app}){
    const borders = MenuIndexList.getUnactiveLiBorder(app);
    const layout = Style.getLayoutBlock({
      width: 'initial',
      height: `${MenuIndexList.liHeight}px`,
      padding: '10px',
      ...borders,
      background: MenuIndexList.unactiveLiSelfBackground,
      cursor: 'pointer',
    });
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase({
      transition: Container.transitionFirstOn,
    });

    return Style.get({layout, content, animation});
  }

  static getUpper(){
    const layout = Style.getLayoutBlock({
      width: '100%',
      height: '20px',
    });
    const content = Style.getContentBase({
      fontSize: '13px',
    });
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getUpperSpace(){
    const layout = Style.getLayoutInlineBlock({
      width: '20%',
    });
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getUpperRight(){
    const layout = Style.getLayoutInlineBlock({
      width: '80%',
    });
    const content = Style.getContentBase({
      lineHeight: '1.5',
      textAlign: 'left',
    });
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getBottom(){
    const layout = Style.getLayoutBlock({
      width: '100%',
      height: '50px',
    });
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getBottomIcon(){
    const layout = Style.getLayoutInlineBlock({
      width: "20%",
      height: '50px',
      backgroundImage: `url("${conf.assetsURL}/favicon.ico")`,
      backgroundPosition: '50% 15%',
      backgroundSize: '20px 20px',
      backgroundRepeat: 'no-repeat',
    });
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getBottomPost(){
    const layout = Style.getLayoutInlineBlock({
      width: "60%",
    });
    const content = Style.getContentBase({
      fontSize: '13px',
      lineHeight: 2.2,
      textAlign: 'left',
    });
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getBottomWatchCnt(){
    const layout = Style.getLayoutInlineBlock({
      width: "20%",
    });
    const content = Style.getContentBase({
      lineHeight: 1.8,
      textAlign: 'center',
    });
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getBottomWatchCntWrap(){
    const layout = Style.getLayoutInlineBlock({
      width: "20px",
      height: "20px",
      background: Container.themeRGBA,
      borderRadius: "20px",
    });
    const content = Style.getContentBase({
      fontSize: "10px",
      lineHeight: 2,
      textAlign: 'center',
      color: Container.whiteRGB,
    });
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }
}
