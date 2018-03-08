import Style from './index';
import Container from './Container';
import Main from './Main';

export default class Detail {

  static get margin(){ return 10}

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
    const analyzeLabel = Detail.getAnalyzeLabel( bootOption );
    const analyzeHr = Detail.getAnalyzeHr( bootOption );
    const body = Detail.getBody( bootOption );
    const h1s = Detail.getH1s( bootOption );
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
      analyzeLabel,
      analyzeHr,
      body,
      h1s,
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
      background: Container.lightRGBA,
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
    });
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getMeta( bootOption ){
    const layout = Style.getLayoutInline({
      height: 'inherit',
    });
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getImg( bootOption ){
    const layout = Style.getLayoutBlock({
      width: '100%',
      minheight: '200px',
      maxHeight: '300px',
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
      margin: `${Detail.margin}px auto`,
    });
    const content = Style.getContentBase({
      textAlign: 'left',
    });
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getAnalyze( bootOption ){
    const layout = Style.getLayoutTable({
      width: '90%',
      height: 'initial',
      margin: `${Detail.margin}px auto`,
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
      height: '70px',
      verticalAlign: 'middle',
      margin: '10px auto 10px auto',
    });
    const content = Style.getContentBase({});
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getAnalyzeLabel( bootOption ){
    const layout = Style.getLayoutBlock({
      width: '90%',
      height: 'initial',
      borderTop: '5px solid rgb( 240, 240, 240)',
      padding: '10px 10px 0px 10px',
      margin: '10px auto auto auto',
    });
    const content = Style.getContentBase({});
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getAnalyzeHr( bootOption ){
    const layout = Style.getLayoutBlock({
      width: '90%',
      height: 'initial',
      margin: "10px auto 10px auto",
      borderTop: `3px solid ${Container.calmRGB}`,
    });
    const content = Style.getContentBase({});
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getBody( bootOption ){
    const layout = Style.getLayoutBlock({
      overflow: 'scroll',
      width: '100%',
      height: `calc( 100% - ${ Main.headerHeight * 2 }px )`,
    });
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getH1s( bootOption ){
    const layout = Style.getLayoutBlock({
      margin: `${Detail.margin}px`,
      height: 'initial',
    });
    const content = Style.getContentBase({
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
