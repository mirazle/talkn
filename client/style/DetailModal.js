import Style from './index';
import Container from './Container';
import Main from './Main';
import Detail from './Detail';
import Footer from './Footer';

export default class DetailModal {

  static getWidth( app, addUnit = false ){
    const width = Math.floor( 100 * Main.widthRatio ) + '%';
    return addUnit ? Style.trimUnit( width ) : width ;
  }

  static getTransform( app ){
    return app.isOpenDetail ? DetailModal.openSelfTransform : DetailModal.closeSelfTransform;
  }
  static get closeSelfTransform(){ return `translate3d(0%, 0px, 0px)` };
  static get openSelfTransform(){ return `translate3d(0%, calc( -100% - ${ Footer.selfHeight }px ), 0px)` };

  static getSelf( {app} ){
    const width = ( Main.widthRatio * 100 );
    const margin = ( ( ( 1 - Main.widthRatio ) * 100 ) / 2 ).toString().substr( 0, 3 );
    const heightBase = 100 - margin;
    const layout = Style.getLayoutBlock({
      width: DetailModal.getWidth( app ),
      height: `calc( ${heightBase}% - ${ Main.headerHeight * 1 }px )`,
      margin: `0% ${margin}% 0% ${margin}%`,
      border: Container.border,
      borderBottom: 0,
      borderRadius: '12px 12px 0px 0px',
      WebkitOverflowScrolling: 'touch',
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
