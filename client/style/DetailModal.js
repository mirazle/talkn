import define from '../../common/define';
import Style from './index';
import Container from './Container';
import App from '../../common/schemas/state/App';
import Header from './Header';
import Posts from './Posts';
import Detail from './Detail';
import PostsFooter from './PostsFooter';
import Menu from './Menu';

export default class DetailModal {

  static getWidth( app, addUnit = false ){
    let width = 0;
    if(
      app.extensionMode === App.extensionModeExtBottomLabel ||
      app.extensionMode === App.extensionModeExtModalLabel     
    ){
      return "84%";
    }else{
      width = app.screenMode === App.screenModeSmallLabel ?
        Math.floor( app.width * Container.widthRatio ) :
        `calc( ${100 * Container.widthRatio }% - ${Menu.getWidth(app)} )`;
    }
    return addUnit ? Style.trimUnit( width ) : width ;
  }

  static getBaseMarginRate( app, addUnit = false ){
    return Math.floor( ( ( 1 - Container.widthRatio ) / 2 ) * 100 );
  }

  static getBaseMargin( app, addUnit = false ){
    return Posts.getWidth( app, true ) * ( DetailModal.getBaseMarginRate() / 100 );
  }

  static getMargin( app, addUnit = false ){
    if( app.extensionMode === App.extensionModeExtBottomLabel ){
      return "0% 8%";
    }else{
      switch( app.screenMode ){
      case App.screenModeSmallLabel :
      case App.screenModeMiddleLabel :
      case App.screenModeLargeLabel :
        const marginRate = DetailModal.getBaseMarginRate();
        return `0% ${marginRate}% 0% ${marginRate}%`;
      }
    }
  }

  static getHeight( app, addUnit = false){
    const marginRate = DetailModal.getBaseMarginRate();
    switch( app.screenMode ){
    case App.screenModeSmallLabel :
      return `calc( ${100 - marginRate}% - ${Header.headerHeight * 2}px )`;
    case App.screenModeMiddleLabel :
      return `calc( ${100 - marginRate}% - ${Header.headerHeight * 2}px )`;
    case App.screenModeLargeLabel :
      const baseMargin = DetailModal.getBaseMargin(app);
      return `calc( 100% - ${ ( Header.headerHeight * 2 ) + baseMargin }px )`
    }
  }

  static getTransform( app ){
    return app.isOpenDetail ?
      DetailModal.getOpenSelfTransform( app ) : DetailModal.getCloseSelfTransform( app );
  }
  static getCloseSelfTransform( app ){ return `translate3d(0%, 0px, 0px)` };
  static getOpenSelfTransform( app ){
    return `translate3d(0%, calc( -100% - ${PostsFooter.selfHeight}px ), 0px)`;
  };

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
