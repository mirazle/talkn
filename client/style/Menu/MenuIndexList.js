import define from '../../../common/define';
import App from '../../../common/schemas/state/App';
import conf from '../../../common/conf';
import Style from '../index';
import Container from '../Container';

export default class MenuIndexList {

  static get tuneRGB(){ return Container.themeRGB };
  static get rank1RGB(){ return 'rgb(255, 100, 78)' };
  static get rank2RGB(){ return 'rgb(255, 147, 0)' };
  static get rank3RGB(){ return 'rgb(0, 162, 255)' };
  static get rankOtherRGB(){ return Container.silverRGB };
  static get oneDigitWidth(){ return "17%" };
  static get twoDigitWidth(){ return "18%" };
  static get thirdDigitWidth(){ return "19%" };

  static get fontSize(){ return 14 };
  static get iconSize(){ return 24 };
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
    if( app.extensionMode === App.extensionModeExtBottomLabel){
      return {borderBottom: Container.border};
    }else{
    return app.screenMode === App.screenModeUndispLabel || app.screenMode === App.screenModeSmallLabel ?
      {borderBottom: Container.border, borderLeft: 0} :
      {borderRight: Container.border, borderBottom: Container.border, borderLeft: 0} ;
    }
  }

  static getDispRankBackground( rank ){
    switch( rank ){
    case 0: return MenuIndexList.tuneRGB;
    case 1: return MenuIndexList.rank1RGB;
    case 2: return MenuIndexList.rank2RGB;
    case 3: return MenuIndexList.rank3RGB;
    default : return MenuIndexList.rankOtherRGB;
    }
  }

  static getDispRankWidth( rank ){
    switch( String(rank).length ){
    case 0: return MenuIndexList.oneDigitWidth;
    case 1: return MenuIndexList.oneDigitWidth;
    case 2: return MenuIndexList.twoDigitWidth;
    case 3: return MenuIndexList.thirdDigitWidth;
    default : return MenuIndexList.thirdDigitWidth;
    }
  }

  constructor( params ){
    const activeLiSelf = MenuIndexList.getActiveLiSelf( params );
    const unactiveLiSelf = MenuIndexList.getUnactiveLiSelf( params );
    const upper = MenuIndexList.getUpper();
    const upperSpace = MenuIndexList.getUpperSpace();
    const upperRankWrap = MenuIndexList.getUpperRankWrap();
    const upperRank = MenuIndexList.getUpperRank();
    const upperRight = MenuIndexList.getUpperRight();
    const bottom = MenuIndexList.getBottom();
    const bottomIcon = MenuIndexList.getBottomIcon();
    const bottomPost = MenuIndexList.getBottomPost();
    const bottomWatchCnt = MenuIndexList.getBottomWatchCnt();
    const bottomWatchCntWrap = MenuIndexList.getBottomWatchCntWrap();
    const ext = MenuIndexList.getExt();
    const extMusic = MenuIndexList.getExtMusic();
    const extMovie = MenuIndexList.getExtMovie();
    return {
      activeLiSelf,
      unactiveLiSelf,
      upper,
      upperSpace,
      upperRankWrap,
      upperRank,
      upperRight,
      bottom,
      bottomIcon,
      bottomPost,
      bottomWatchCnt,
      bottomWatchCntWrap,
      ext,
      extMusic,
      extMovie
    }
  }

  static getActiveLiSelf(){
    const layout = Style.getLayoutBlock({
      width: 'initial',
      height: `${MenuIndexList.liHeight}px`,
      padding: '5px',
      borderBottom: Container.border,
      borderRight: `1px solid ${Container.whiteRGB}`,
      background: MenuIndexList.activeLiSelfBackground,
      cursor: 'pointer',
    });
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase({
      transition: `${Container.transitionFirstOn}ms`
    });
    return Style.get({layout, content, animation});
  }

  static getUnactiveLiSelf({app}){
    const borders = MenuIndexList.getUnactiveLiBorder(app);
    const layout = Style.getLayoutBlock({
      width: 'initial',
      height: `${MenuIndexList.liHeight}px`,
      padding: '5px',
      ...borders,
      background: MenuIndexList.unactiveLiSelfBackground,
      cursor: 'pointer',
    });
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase({
      transition: `${Container.transitionFirstOn}ms`
    });

    return Style.get({layout, content, animation});
  }

  static getUpper(){
    const layout = Style.getLayoutBlock({
      width: '100%',
      height: '20px',
    });
    const content = Style.getContentBase({
      fontSize: `${MenuIndexList.fontSize}px`,
    });
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getUpperSpace(){
    const layout = Style.getLayoutInlineBlock({
      width: '18%',
      margin: "0px 2% 0px 0px"
    });
    const content = Style.getContentBase({});
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getUpperRankWrap(){
    const layout = Style.getLayoutInlineFlex({
      position: "absolute",
      left: "5px",
      top: "7px",
      width: MenuIndexList.thirdDigitWidth,
      height: "20px",
      background: MenuIndexList.rankOtherRGB,
      borderRadius: "10px",
      margin: "0"
    });
    const content = Style.getContentBase({});
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getUpperRank(){
    const layout = Style.getLayoutFlex({
      width: "100%"
    });
    const content = Style.getContentBase({
      fontSize: "10px",
      fontWeight: "bold",
      color: Container.whiteRGB,
      lineHeight: "1.5"
    });
    const animation = Style.getAnimationBase({
      transform: "scale(0.8)"
    });
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
      backgroundPosition: '50% 30%',
      backgroundSize: '24px 24px',
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
      fontSize: `${MenuIndexList.fontSize}px`,
      lineHeight: 2.8,
      textAlign: 'left',
      whiteSpace: 'nowrap'

    });
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getBottomWatchCnt(){
    const layout = Style.getLayoutInlineFlex({
      width: "20%",
    });
    const content = Style.getContentBase({
      textAlign: 'center',
    });
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getBottomWatchCntWrap(){
    const layout = Style.getLayoutInlineFlex({
      position: "relative",
      top: "-6px",
      width: "26px",
      height: "26px",
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

  static getExt(){
    const layout = Style.getLayoutFlex({
      position: "absolute",
      alignItems: "center",
      justifyContent: "center",
      bottom: "0px",
      right: "10px",
      width: "50px",
      height: "15px",
      background: Container.lightGrayRGBA,
      borderRadius: "2px 2px 0px 0px"
    });
    const content = Style.getContentBase({
      textIndent: "3px",
      fontSize: "8px",
      textAlign: 'center',
      lineHeight: "1.5px",
      color: Container.whiteRGB
    });
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getExtMusic(){
    let ext = MenuIndexList.getExt();
//    ext.background = "rgba(143,198,143, 1)";
    ext.background = "rgba(143,198,143, 1)";
    return ext;
  }

  static getExtMovie(){
    let ext = MenuIndexList.getExt();
    ext.background = "rgba(200, 10, 100, 1)";
    return ext;
  }
}
