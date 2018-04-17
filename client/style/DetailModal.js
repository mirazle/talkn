import Style from './index';
import Container from './Container';
import Main from './Main';
import Detail from './Detail';


export default class DetailModal {

  static getWidth( app, addUnit = false ){
    const width = Math.floor( 100 * Main.widthRatio ) + '%';
    return addUnit ? Style.trimUnit( width ) : width ;
  }

  static getSelfTransform( app ){
    return app.isOpenDetail ? DetailModal.openSelfTransform : DetailModal.closeSelfTransform;
  }
  static get closeSelfTransform(){ return `translate3d(0%, 0px, 0px)` };
  static get openSelfTransform(){ return `translate3d(0%, calc( -100% - ${ Detail.padding * 2 }px ), 0px)` };

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
      transform: DetailModal.closeSelfTransform,
      transition: '600ms',
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
