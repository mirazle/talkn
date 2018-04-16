import App from '../../common/schemas/state/App';
import Style from './index';
import Container from './Container';
import Main from './Main';

export default class DetailRight {

  static getWidth( app, addUnit = false ){
    let width = 0;
    switch( app.screenMode ){
    case App.screenModeSmallLabel : width = '100%';break;
    case App.screenModeMiddleLabel :width = '30%';break;
    case App.screenModeLargeLabel :width = '30%';break;
    }
    return addUnit ? Style.trimUnit( width ) : width ;
  }

  static get margin(){ return 5}

  constructor( params ){
    const self = DetailRight.getSelf( params );
    const header = DetailRight.getHeader( params );
    const meta = DetailRight.getMeta( params );
    const img = DetailRight.getImg( params );
    const description = DetailRight.getDescription( params );
    const contentType = DetailRight.getContentType( params );
    const analyze = DetailRight.getAnalyze( params );
    const analyzeRow = DetailRight.getAnalyzeRow( params );
    const analyzeCol = DetailRight.getAnalyzeCol( params );
    const analyzeLabel = DetailRight.getAnalyzeLabel( params );
    const analyzeValue = DetailRight.getAnalyzeValue( params );
    const analyzeHr = DetailRight.getAnalyzeHr( params );
    const body = DetailRight.getBody( params );
    const h1s = DetailRight.getH1s( params );
    const h1sLi = DetailRight.getH1sLi( params );
    const footer = DetailRight.getFooter( params );
    const footerChild = DetailRight.getFooterChild( params );
    const footerChildLike = DetailRight.getFooterChildLike( params );
    const footerChildMoney = DetailRight.getFooterChildMoney( params );
    const footerChildShare = DetailRight.getFooterChildShare( params );
    return {
      self,
      header,
      meta,
      img,
      description,
      contentType,
      analyze,
      analyzeRow,
      analyzeCol,
      analyzeLabel,
      analyzeValue,
      analyzeHr,
      body,
      h1s,
      h1sLi,
      footer,
      footerChild,
      footerChildLike,
      footerChildMoney,
      footerChildShare,
    }
  }

  static get padding(){ return 20 };

  static getSelfTramsform( app ){
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
  // 横に閉じる
  static get closeSelfTransform(){ return `translate3d(0%, calc( 100% + ${ DetailRight.padding * 2 }px ), 0px)` };
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
      transition: '600ms',
    });
    return Style.get({layout, content, animation});
  }

  static getHeader(){
    const layout = Style.getLayoutFlex({
      width: '100%',
      height: Main.headerHeight,
      borderBottom: Container.border,
      background: Container.whiteRGB,
      padding: '0px 20px 0px 20px',
    });
    const content = Style.getContentBase({
      lineHeight: '1.3',
    });
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getBody(){
    const layout = Style.getLayoutBlock({
      overflow: 'scroll',
      width: '100%',
      height: `calc( 100% - ${ Main.headerHeight * 2 }px )`,
      background: Container.offWhiteRGBA,
    });
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getMeta(){
    const layout = Style.getLayoutBlock({
      width: '100%',
      height: 'initial',
      background: Container.whiteRGB,
      borderBottom: Container.border,
    });
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getImg(){
    const layout = Style.getLayoutBlock({
      width: '100%',
      height: '200px',
      backgroundColor: Container.reliefRGB,
      backgroundImage: 'url()',
      backgroundPosition: 'center center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    });
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getDescription(){
    const layout = Style.getLayoutBlock({
      width: '90%',
      height: 'initial',
      margin: `${DetailRight.margin}% auto`,
    });
    const content = Style.getContentBase({
      lineHeight: 2,
      textAlign: 'left',
    });
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getContentType(){
    const layout = Style.getLayoutBlock({
      width: '90%',
      height: 'initial',
      margin: `${DetailRight.margin}% auto`,
    });
    const content = Style.getContentBase({
      lineHeight: 2,
      textAlign: 'right',
    });
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getAnalyze(){
    const layout = Style.getLayoutTable({
      width: '100%',
      height: 'initial',
      background: Container.whiteRGB,
      borderTop: Container.border,
      borderBottom: Container.border,
    });
    const content = Style.getContentBase({
      textAlign: 'center',
    });
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getAnalyzeRow(){
    const layout = Style.getLayoutTableRow({});
    const content = Style.getContentBase({});
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getAnalyzeCol(){
    const layout = Style.getLayoutTableCol({
      width: '33.3%',
      height: '120px',
      verticalAlign: 'middle',
      margin: '40px auto 40px auto',
    });
    const content = Style.getContentBase({});
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getAnalyzeLabel(){
    const layout = Style.getLayoutBlock({
      width: 'initial',
      height: 'initial',
    });
    const content = Style.getContentBase({
      lineHeight: '14px',
    });
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getAnalyzeValue(){
    const layout = Style.getLayoutBlock({
      margin: '0 auto',
      width: 'initial',
      height: 'initial',
    });
    const content = Style.getContentBase({
      fontSize: '2em',
      color: Container.themeRGBA,
    });
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getAnalyzeHr(){
    const layout = Style.getLayoutBlock({
      width: '70%',
      height: 'initial',
      margin: "10px auto 10px auto",
      borderTop: `1px solid ${Container.borderRGB}`,
    });
    const content = Style.getContentBase({});
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getH1s(){
    const layout = Style.getLayoutBlock({
      width: '100%',
      height: 'initial',
      margin: `${DetailRight.margin}px auto`,
      background: Container.whiteRGB,
      borderTop: Container.border,
      borderBottom: Container.border,
    });
    const content = Style.getContentBase({
      textAlign: 'left',
    });
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getH1sLi(){
    const layout = Style.getLayoutBlock({
      width: '90%',
      height: 'initial',
      margin: `5px ${DetailRight.margin}% 5px ${DetailRight.margin}%`,
    });
    const content = Style.getContentBase({
      lineHeight: 2,
      textAlign: 'left',
    });
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getFooter(){
    const layout = Style.getLayoutFlex({
      width: '100%',
      background: Container.offWhiteRGB,
      height: Main.headerHeight,
//      borderTop: Container.border,
    });
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getFooterChild(){
    const layout = Style.getLayoutBlock({
      flexGrow: 1,
      height: '100%',
    });
    const content = Style.getContentBase({
      fontSize: '0.5em',
    });
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getFooterChildLike(){
    const layout = Style.getLayoutBlock({
      flexGrow: 1,
      height: '100%',
    });
    const content = Style.getContentBase({
      fontSize: '0.5em',
    });
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getFooterChildMoney(){
    const layout = Style.getLayoutBlock({
      flexGrow: 1,
      height: '100%',
    });
    const content = Style.getContentBase({
      fontSize: '0.5em',
    });
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getFooterChildShare(){
    const layout = Style.getLayoutBlock({
      flexGrow: 1,
      height: '100%',
    });
    const content = Style.getContentBase({
      fontSize: '0.5em',
    });
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }
}
