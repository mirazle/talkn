import Style from './index';
import Container from './Container';
import Main from './Main';

export default class Detail {

  static get margin(){ return 5}

  constructor( params ){
    const { bootOption } = params;
    const self = Detail.getSelf( bootOption );
    const header = Detail.getHeader( bootOption );
    const meta = Detail.getMeta( bootOption );
    const img = Detail.getImg( bootOption );
    const description = Detail.getDescription( bootOption );
    const analyze = Detail.getAnalyze( bootOption );
    const analyzeRow = Detail.getAnalyzeRow( bootOption );
    const analyzeCol = Detail.getAnalyzeCol( bootOption );
    const analyzeValue = Detail.getAnalyzeValue( bootOption );
    const analyzeHr = Detail.getAnalyzeHr( bootOption );
    const body = Detail.getBody( bootOption );
    const h1s = Detail.getH1s( bootOption );
    const h1sLi = Detail.getH1sLi( bootOption );
    const footer = Detail.getFooter( bootOption );
    const footerChild = Detail.getFooterChild( bootOption );
    return {
      self,
      header,
      meta,
      img,
      description,
      analyze,
      analyzeRow,
      analyzeCol,
      analyzeValue,
      analyzeHr,
      body,
      h1s,
      h1sLi,
      footer,
      footerChild,
    }
  }

  static get padding(){ return 20 };
  static get closeTransform(){ return `translate3d(0%, calc( 100% + ${ Detail.padding * 2 }px ), 0px)` };
  static get openTransform(){ return `translate3d(0%, 0%, 0px)` };

  static getSelf( bootOption ){
    const width = ( Main.widthRatio * 100 );
    const margin = ( ( ( 1 - Main.widthRatio ) * 100 ) / 2 );
    const heightBase = 100 - margin;
    const layout = Style.getLayoutBlock({
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: width + '%',
      height: `calc( ${heightBase}% - ${ Main.headerHeight * 1 }px )`,
      margin: `0% ${margin}% 0% ${margin}%`,
      border: Container.border,
      borderBottom: 0,
      borderRadius: '12px 12px 0px 0px',
      WebkitOverflowScrolling: 'touch',
    });
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase({
      transform: Detail.closeTransform,
      transition: '600ms',
    });
    return Style.get({layout, content, animation});
  }

  static getHeader( bootOption ){
    const layout = Style.getLayoutFlex({
      width: '100%',
      height: Main.headerHeight,
      borderBottom: Container.border,
      background: Container.lightRGBA,
    });
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getBody( bootOption ){
    const layout = Style.getLayoutBlock({
      overflow: 'scroll',
      width: '100%',
      height: `calc( 100% - ${ Main.headerHeight * 2 }px )`,
      background: Container.calmRGBA,
    });
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getMeta( bootOption ){
    const layout = Style.getLayoutBlock({
      width: '100%',
      height: 'initial',
      background: Container.lightRGBA,
    });
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getImg( bootOption ){
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

  static getDescription( bootOption ){
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

  static getAnalyze( bootOption ){
    const layout = Style.getLayoutTable({
      width: '100%',
      height: 'initial',
      background: Container.lightRGBA,
    });
    const content = Style.getContentBase({
      textAlign: 'center',
    });
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getAnalyzeRow( bootOption ){
    const layout = Style.getLayoutTableRow({});
    const content = Style.getContentBase({});
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getAnalyzeCol( bootOption ){
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

  static getAnalyzeValue( bootOption ){
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

  static getAnalyzeHr( bootOption ){
    const layout = Style.getLayoutBlock({
      width: '80%',
      height: 'initial',
      margin: "10px auto 10px auto",
      borderTop: `2px solid ${Container.calmRGB}`,
    });
    const content = Style.getContentBase({});
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getH1s( bootOption ){
    const layout = Style.getLayoutBlock({
      width: '100%',
      height: 'initial',
      margin: `${Detail.margin}px auto`,
      background: Container.lightRGBA,
    });
    const content = Style.getContentBase({
      textAlign: 'left',
    });
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getH1sLi( bootOption ){
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

  static getFooter( bootOption ){
    const layout = Style.getLayoutFlex({
      width: '100%',
      background: Container.calmRGBA,
      height: Main.headerHeight,
      borderTop: Container.border,
    });
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getFooterChild( bootOption ){
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
