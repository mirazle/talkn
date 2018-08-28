import App from '../../common/schemas/state/App';
import Style from './index';
import Container from './Container';
import Main from './Main';
import DetailRight from './DetailRight';
import DetailModal from './DetailModal';
import conf from '../conf';

export default class Detail {

  static getDetailClass( app ){
    return app.screenMode === App.screenModeSmallLabel ? DetailModal : DetailRight ;
  }
  static get padding(){ return 20 };
  static get margin(){ return 5 }

  constructor( params ){
    const { app } = params;
    const DetailClass = Detail.getDetailClass( app );

    const self = DetailClass.getSelf( params );
    const header = DetailClass.getHeader( params );
    const headerP = DetailClass.getHeaderP( params );
    const meta = DetailClass.getMeta( params );
    const img = DetailClass.getImg( params );
    const description = DetailClass.getDescription( params );
    const contentType = DetailClass.getContentType( params );
    const analyze = DetailClass.getAnalyze( params );
    const analyzeRow = DetailClass.getAnalyzeRow( params );
    const analyzeCol = DetailClass.getAnalyzeCol( params );
    const analyzeLabel = DetailClass.getAnalyzeLabel( params );
    const analyzeValue = DetailClass.getAnalyzeValue( params );
    const analyzeHr = DetailClass.getAnalyzeHr( params );
    const body = DetailClass.getBody( params );
    const h1s = DetailClass.getH1s( params );
    const h1sLi = DetailClass.getH1sLi( params );
    const footer = DetailClass.getFooter( params );
    const footerChild = DetailClass.getFooterChild( params );
    const footerChildLike = DetailClass.getFooterChildLike( params );
    const footerChildMoney = DetailClass.getFooterChildMoney( params );
    const footerChildShare = DetailClass.getFooterChildShare( params );

    return {
      self,
      header,
      headerP,
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

  static getWidth( app, addUnit = false ){
    return Detail.getDetailClass( app ).getWidth( app, addUnit );
  }

  static getTransform( app ){
    return Detail.getDetailClass( app ).getTransform( app );
  }

  static getHeader(){
    const layout = Style.getLayoutFlex({
      width: '100%',
      height: Main.headerHeight,
      maxHeight: Main.headerHeight,
      borderBottom: Container.border,
      background: Container.whiteRGB,
      padding: '0px 20px',
    });
    const content = Style.getContentBase({
    });
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getHeaderP(){
    const layout = Style.getLayoutBlock({
      width: '100%',
      height: 'auto',
      maxHeight: Main.headerHeight,
    });
    const content = Style.getContentBase({
      lineHeight: '1.8',
      textOverflow: 'ellipsis',
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
      height: '30vh',
      backgroundColor: Container.whiteRGB,
      backgroundImage: `url(//${conf.assetsImgPath}talkn_logo1.png)`,
      backgroundPosition: 'center center',
      backgroundSize: '60%',
      backgroundRepeat: 'no-repeat',
    });
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

//
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
      borderTop: Container.border,
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
