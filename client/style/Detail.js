import App from '../../common/schemas/state/App';
import Style from './index';
import Container from './Container';
import Main from './Main';
import DetailRight from './DetailRight';
import DetailModal from './DetailModal';

export default class Detail {

  static getWidth( app, addUnit = false ){
    return app.screenMode === App.screenModeSmallLabel ?
      DetailModal.getWidth( app, addUnit ) : DetailRight.getWidth( app, addUnit ) ;
  }

  static get margin(){ return 5}

  constructor( params ){
    const { app } = params;
    let self, header, meta, img, description, contentType,
      analyze, analyzeRow, analyzeCol, analyzeLabel, analyzeValue, analyzeHr,
      body, h1s, h1sLi, footer, footerChild, footerChildLike, footerChildMoney, footerChildShare;

    if( app.screenMode === App.screenModeSmallLabel ){
      self = DetailModal.getSelf( params );
      header = DetailModal.getHeader( params );
      meta = DetailModal.getMeta( params );
      img = DetailModal.getImg( params );
      description = DetailModal.getDescription( params );
      contentType = DetailModal.getContentType( params );
      analyze = DetailModal.getAnalyze( params );
      analyzeRow = DetailModal.getAnalyzeRow( params );
      analyzeCol = DetailModal.getAnalyzeCol( params );
      analyzeLabel = DetailModal.getAnalyzeLabel( params );
      analyzeValue = DetailModal.getAnalyzeValue( params );
      analyzeHr = DetailModal.getAnalyzeHr( params );
      body = DetailModal.getBody( params );
      h1s = DetailModal.getH1s( params );
      h1sLi = DetailModal.getH1sLi( params );
      footer = DetailModal.getFooter( params );
      footerChild = DetailModal.getFooterChild( params );
      footerChildLike = DetailModal.getFooterChildLike( params );
      footerChildMoney = DetailModal.getFooterChildMoney( params );
      footerChildShare = DetailModal.getFooterChildShare( params );
    }else{
      self = DetailRight.getSelf( params );
      header = DetailRight.getHeader( params );
      meta = DetailRight.getMeta( params );
      img = DetailRight.getImg( params );
      description = DetailRight.getDescription( params );
      contentType = DetailRight.getContentType( params );
      analyze = DetailRight.getAnalyze( params );
      analyzeRow = DetailRight.getAnalyzeRow( params );
      analyzeCol = DetailRight.getAnalyzeCol( params );
      analyzeLabel = DetailRight.getAnalyzeLabel( params );
      analyzeValue = DetailRight.getAnalyzeValue( params );
      analyzeHr = DetailRight.getAnalyzeHr( params );
      body = DetailRight.getBody( params );
      h1s = DetailRight.getH1s( params );
      h1sLi = DetailRight.getH1sLi( params );
      footer = DetailRight.getFooter( params );
      footerChild = DetailRight.getFooterChild( params );
      footerChildLike = DetailRight.getFooterChildLike( params );
      footerChildMoney = DetailRight.getFooterChildMoney( params );
      footerChildShare = DetailRight.getFooterChildShare( params );
    }
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
    let transform = Detail.closeTransform;
    switch( app.screenMode ){
    case App.screenModeSmallLabel : transform = Detail.closeTransform; break;
    case App.screenModeMiddleLabel : transform = Detail.closeTransform; break;
    case App.screenModeLargeLabel :
      if( app.isOpenDetail ){
        transform = Detail.closeTransform;
      }
      break;
    }
    return transform;
  }
  // 横に閉じる
  static get closeSelfTransform(){ return `translate3d(0%, calc( 100% + ${ Detail.padding * 2 }px ), 0px)` };
  static get openSelfTransform(){ return `translate3d(0%, 0%, 0px)` };

  static getSelf( {app} ){
    const width = ( Main.widthRatio * 100 );
    const margin = ( ( ( 1 - Main.widthRatio ) * 100 ) / 2 );
    const heightBase = 100 - margin;
    const layout = Style.getLayoutBlock({
      width: Detail.getWidth( app ),
      minWidth: Detail.getWidth( app ),
      WebkitOverflowScrolling: 'touch',
      background: Container.calmRGB,
      overflow: 'scroll',
      borderLeft: Container.border,
    });
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase({
      transform: Detail.openSelfTransform,
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
      margin: `${Detail.margin}% auto`,
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
      margin: `${Detail.margin}% auto`,
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
      margin: `${Detail.margin}px auto`,
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
      margin: `5px ${Detail.margin}% 5px ${Detail.margin}%`,
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
