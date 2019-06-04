import App from '../../common/schemas/state/App';
import Style from './index';
import Detail from './Detail';

export default class DetailRight {

  static get widthRate(){ return 0.3};
  static get otherWidthRate(){ return 1 - DetailRight.widthRate};
  static getWidth( app, addUnit = false ){
    let width = 0;
    switch( app.screenMode ){
    case App.screenModeSmallLabel : width = '0%';break;
    case App.screenModeMiddleLabel :width = '0%';break;
    case App.screenModeLargeLabel :width =  '30%';break;
    }
    return addUnit ? Style.trimUnit( width ) : width ;
  }

  static getMinWidth( app, addUnit = false ){
    let width = 0;
    switch( app.screenMode ){
    case App.screenModeSmallLabel : width = '0%';break;
    case App.screenModeMiddleLabel :width = '320px';break;
    case App.screenModeLargeLabel :width =  '320px';break;
    }
    return addUnit ? Style.trimUnit( width ) : width ;
  }

  static getTransform( app ){
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

  static getHeader(params){return Detail.getHeader(params)}
  static getHeaderP(params){return Detail.getHeaderP(params)}
  static getBody(params){return Detail.getBody(params)}
  static getMeta(params){return Detail.getMeta(params)}
  static getImg(params){return Detail.getImg(params)}
  static getDescription(params){return Detail.getDescription(params)}
  static getMetaContentTypeWrap(params){return Detail.getMetaContentTypeWrap(params)}
  static getMetaContentType(params){return Detail.getMetaContentType(params)}
  static getConnection(params){return Detail.getConnection(params)}
  static getAnalyze(params){return Detail.getAnalyze(params)}
  static getAnalyzeRow(params){return Detail.getAnalyzeRow(params)}
  static getAnalyzeCol(params){return Detail.getAnalyzeCol(params)}
  static getAnalyzeLabel(params){return Detail.getAnalyzeLabel(params)}
  static getAnalyzeValue(params){return Detail.getAnalyzeValue(params)}
  static getAnalyzeHr(params){return Detail.getAnalyzeHr(params)}
  static getH1s(params){return Detail.getH1s(params)}
  static getH1sLi(params){return Detail.getH1sLi(params)}
  static getFooter(params){return Detail.getFooter(params)}
  static getFooterChild(params){return Detail.getFooterChild(params)}
  static getFooterChildLike(params){return Detail.getFooterChildLike(params)}
  static getFooterChildMoney(params){return Detail.getFooterChildMoney(params)}
  static getFooterChildShare(params){return Detail.getFooterChildShare(params)}
  static getMetaItems(params){return Detail.getMetaItems(params)}
}
