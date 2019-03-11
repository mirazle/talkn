import define from '../../common/define';
import App from '../../common/schemas/state/App';
import Style from './index';
import Container from './Container';
import Main from './Main';
import DetailRight from './DetailRight';
import DetailModal from './DetailModal';
import DetailFooter from './DetailFooter';
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
    const metaContentTypeWrap = DetailClass.getMetaContentTypeWrap( params );
    const metaContentType = DetailClass.getMetaContentType( params );
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

    const metaItems = DetailClass.getMetaItems( params );
    return {
      self,
      header,
      headerP,
      meta,
      img,
      description,
      metaContentTypeWrap,
      metaContentType,
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
      metaItems
    }
  }

  static getFooterBorders( app ){
    if( define.APP_TYPES.EXTENSION === app.type ){
      return app.isOpenMain ? 
        {borderTop: Container.border} :
        {};
    }else{
      return app.screenMode === App.screenModeSmallLabel ?
        {borderTop: Container.border} :
        {borderTop: Container.border, borderRight: Container.border, borderLeft: Container.border} ;
    }
  }

  static getFooterPositions( app ){
    switch( app.screenMode ){
    case App.screenModeSmallLabel :
      return {

      };
    case App.screenModeMiddleLabel : 
    case App.screenModeLargeLabel : 
      return {
        position: 'absolute',
        right: "0px",
        bottom: "0px"
      };
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
      fontSize: '14px',
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
      background: Container.chromeOffTabRGB,
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

  static getDescription(){
    const layout = Style.getLayoutBlock({
      width: '90%',
      height: 'initial',
      margin: `${Detail.margin}% auto`,
    });
    const content = Style.getContentBase({
      lineHeight: 2,
      fontSize: '14px',
      textAlign: 'left',
    });
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  } 

  static getMetaContentTypeWrap(){
    const layout = Style.getLayoutFlex({
      flexDirection: "column",
      alignItems: "flex-end",
      width: 'initial',
      height: 'initial',
      borderRadius: "10px",
      margin: `${Detail.margin * 2 }% ${Detail.margin}%`,
    });
    const content = Style.getContentBase({
      textAlign: "right"
    });
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getMetaContentType(){ 
    const layout = Style.getLayoutBlock({
      background: Container.chromeOffTabRGBA,
      width: 'initial',
      height: 'initial',
      margin: "10px 0px",
      padding: "10px 20px 10px 20px",
      justifyContent: "flex-end",
      borderRadius: "30px"
    });
    const content = Style.getContentBase({
      fontSize: "12px",
      color: Container.whiteRGB,
      textAlign: "right"
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
      marginBottom: '20px',
    });
    const content = Style.getContentBase({
      lineHeight: '14px',
      fontSize: '12px',
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
      fontSize: '1.8em',
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
      fontSize: "14px",
      lineHeight: 2,
      textAlign: 'left',
    });
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getFooter({app}){
    const positions = Detail.getFooterPositions(app);
    const borders = Detail.getFooterBorders(app);
    const layout = Style.getLayoutFlex({
      width: DetailFooter.getWidth(app),
      background: Container.offWhiteRGB,
      height: Main.headerHeight,
      ...positions,
      ...borders
    });
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase({
      transform: "translate3d(0px, 0px, 10px)"
    });
    return Style.get({layout, content, animation});
  }

  static getFooterChild(){
    const layout = Style.getLayoutBlock({
      flexGrow: 1,
      height: '100%',
    });
    const content = Style.getContentBase({
      fontSize: '0.5em',
      cursor: "pointer"
    });
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getFooterChildLike({app}){
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

  static getFooterChildMoney({app}){
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

  static getFooterChildShare({app}){
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

  static getMetaItems({app}){
    const layout = Style.getLayoutFlex({
      width: '90%',
      margin: `${Detail.margin}%`
    });
    const content = Style.getContentBase({
    });
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }
}
