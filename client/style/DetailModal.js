import define from '../../common/define';
import Style from './index';
import Container from './Container';
import Main from './Main';
import Detail from './Detail';
import PostsFooter from './PostsFooter';

export default class DetailModal {

  static getWidth( app, addUnit = false ){
    let width = Math.floor( 100 * Main.widthRatio ) + '%';
    if( app.type === define.APP_TYPES.EXTENSION ){
      return ( Style.trimUnit( width ) - 10 ) + "%";
    }else{
      return addUnit ? Style.trimUnit( width ) : width ;
    }
  }
  static getBaseMargin( app, addUnit = false ){
    return ( ( ( 1 - Main.widthRatio ) * 100 ) / 2 ).toString().substr( 0, 3 );
  }

  static getMargin( app, addUnit = false ){
    let margin = DetailModal.getBaseMargin(app, addUnit);
    if( app.type === define.APP_TYPES.EXTENSION ){
      return "0% 8%";
    }else{
      return `0% ${margin}% 0% ${margin}%`;
    }
  }

  static getTransform( app ){
    return app.isOpenDetail ?
      DetailModal.getOpenSelfTransform( app ) : DetailModal.getCloseSelfTransform( app );
  }
  static getCloseSelfTransform( app ){ return `translate3d(0%, ${PostsFooter.selfHeight}px, -1px)` };
  static getOpenSelfTransform( app ){
    return app.type === define.APP_TYPES.EXTENSION ?
      `translate3d(0%, -100%, 0px)` :
      `translate3d(0%, -100%, -1px)`;
  };

  static getSelf( {app} ){
    const width = ( Main.widthRatio * 100 );
    const baseMargin = DetailModal.getBaseMargin(app);
    const heightBase = 100 - baseMargin;
    const layout = Style.getLayoutBlock({
      position: 'absolute',
      width: DetailModal.getWidth( app ),
      height: `calc( ${heightBase}% - ${ Main.headerHeight * 1 }px )`,
      margin: DetailModal.getMargin(app),
      border: Container.border,
      borderBottom: 0,
      borderRadius: Container.radiuses,
      WebkitOverflowScrolling: 'touch',
      zIndex: 1
    });
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase({
      transform: DetailModal.getTransform( app ),
      transition: Container.getTransitionOn( app ),
    });

    return Style.get({layout, content, animation});
  }

  static getHeader(params){return Detail.getHeader(params)}
  static getHeaderP(params){return Detail.getHeaderP(params)}
  static getBody(params){return Detail.getBody(params)}
  static getMeta(params){return Detail.getMeta(params)}
  static getImg(params){return Detail.getImg(params)}
  static getDescription(params){return Detail.getDescription(params)}
  static getContentType(params){return Detail.getContentType(params)}
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
}
