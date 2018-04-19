import App from '../../common/schemas/state/App';
import Style from './index';
import Container from './Container';
import Main from './Main';
import Detail from './Detail';

export default class DetailRight {

  // TODO 100%をapp.widthにする
  static getWidth( app, addUnit = false ){
    let width = 0;
    switch( app.screenMode ){
    case App.screenModeSmallLabel : width = '100%';break;
    case App.screenModeMiddleLabel :width = '30%';break;
    case App.screenModeLargeLabel :width = '30%';break;
    }
    return addUnit ? Style.trimUnit( width ) : width ;
  }

  static getSelfTransform( app ){
    let transform = DetailRight.closeTransform;
    switch( app.screenMode ){
    case App.screenModeSmallLabel : transform = DetailRight.closeTransform; break;
    case App.screenModeMiddleLabel : transform = DetailRight.closeTransform; break;
    case App.screenModeLargeLabel :
      if( app.isOpenDetail ){
        transform = DetailRight.closeTransform;
      }
      break;
    }
    return transform;
  }

  static get closeSelfTransform(){ return `translate3d(0%, calc( 100% + ${ Detail.padding * 2 }px ), 0px)` };
  static get openSelfTransform(){ return `translate3d(0%, 0%, 0px)` };

  static getSelf( {app} ){
    const width = ( Main.widthRatio * 100 );
    const margin = ( ( ( 1 - Main.widthRatio ) * 100 ) / 2 );
    const heightBase = 100 - margin;
    const layout = Style.getLayoutInlineBlock({
      width: DetailRight.getWidth( app ),
      minWidth: DetailRight.getWidth( app ),
      WebkitOverflowScrolling: 'touch',
      background: Container.calmRGB,
      overflow: 'scroll',
      borderLeft: Container.border,
    });
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase({
      transform: DetailRight.openSelfTransform,
      transition: Container.getTransitionOn( app ),
    });
    return Style.get({layout, content, animation});
  }

  static getHeader(){return Detail.getHeader()}
  static getBody(){return Detail.getBody()}
  static getMeta(){return Detail.getMeta()}
  static getImg(){return Detail.getImg()}
  static getDescription(){return Detail.getDescription()}
  static getContentType(){return Detail.getContentType()}
  static getAnalyze(){return Detail.getAnalyze()}
  static getAnalyzeRow(){return Detail.getAnalyzeRow()}
  static getAnalyzeCol(){return Detail.getAnalyzeCol()}
  static getAnalyzeLabel(){return Detail.getAnalyzeLabel()}
  static getAnalyzeValue(){return Detail.getAnalyzeValue()}
  static getAnalyzeHr(){return Detail.getAnalyzeHr()}
  static getH1s(){return Detail.getH1s()}
  static getH1sLi(){return Detail.getH1sLi()}
  static getFooter(){return Detail.getFooter()}
  static getFooterChild(){return Detail.getFooterChild()}
  static getFooterChildLike(){return Detail.getFooterChildLike()}
  static getFooterChildMoney(){return Detail.getFooterChildMoney()}
  static getFooterChildShare(){return Detail.getFooterChildShare()}
}
