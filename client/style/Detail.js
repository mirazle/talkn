import define from '../../common/define';
import App from '../../common/schemas/state/App';
import Style from './index';
import Container from './Container';
import Menu from './Menu';
import DetailRight from './DetailRight';
import DetailModal from './DetailModal';
import Header from './Header';
import conf from '../conf';

export default class Detail {

  static get detailRightSelfKey(){ return "Right" };
  static get detailModalSelfKey(){ return "Modal" };
  static get screenModeOfRightDetail(){ return App.screenModeLargeLabel };
  static get padding(){ return 20 };
  static get margin(){ return 5 };
  static getDetailClass( app ){ return Detail.isRightDetail( app ) ? DetailRight : DetailModal;}
  static isRightDetail( app ){ return app.screenMode === Detail.screenModeOfRightDetail }

  constructor( params ){
    const { app } = params;

    const styles = {};
    const DetailClass = Detail.getDetailClass( app );

    styles[ `self${Detail.detailRightSelfKey}` ] = Detail.getDetailRightSelf( params );
    styles[ `self${Detail.detailModalSelfKey}` ] = Detail.getDetailModalSelf( params );
    styles.header = DetailClass.getHeader( params );
    styles.headerP = DetailClass.getHeaderP( params );
    styles.meta = DetailClass.getMeta( params );
    styles.img = DetailClass.getImg( params );
    styles.description = DetailClass.getDescription( params );
    styles.metaContentTypeWrap = DetailClass.getMetaContentTypeWrap( params );
    styles.metaContentType = DetailClass.getMetaContentType( params );
    styles.analyze = DetailClass.getAnalyze( params );
    styles.analyzeRow = DetailClass.getAnalyzeRow( params );
    styles.analyzeCol = DetailClass.getAnalyzeCol( params );
    styles.analyzeLabel = DetailClass.getAnalyzeLabel( params );
    styles.analyzeValue = DetailClass.getAnalyzeValue( params );
    styles.analyzeHr = DetailClass.getAnalyzeHr( params );
    styles.body = DetailClass.getBody( params );
    styles.h1s = DetailClass.getH1s( params );
    styles.h1sLi = DetailClass.getH1sLi( params );
    styles.footer = DetailClass.getFooter( params );
    styles.footerChild = DetailClass.getFooterChild( params );
    styles.footerChildLike = DetailClass.getFooterChildLike( params );
    styles.footerChildMoney = DetailClass.getFooterChildMoney( params );
    styles.footerChildShare = DetailClass.getFooterChildShare( params );
    styles.metaItems = DetailClass.getMetaItems( params );

    return styles;
  }

  static getDetailModalSelf( {app} ){
    const screenMode = App.getScreenMode(app.width);
    const display = screenMode === App.screenModeLargeLabel ? "none" : "block";
    const left = screenMode === App.screenModeSmallLabel ? "0px" : Menu.baseWidth;
    const background = app.type === define.APP_TYPES.EXTENSION ?
      Container.reliefRGB : Container.reliefRGB;
    const height = DetailModal.getHeight(app);
    const layout = Style.getLayoutBlock({
      display,
      position: 'fixed',
      top: "100%",
      left,
      width: DetailModal.getWidth( app ),
      height,
      margin: DetailModal.getMargin(app),
      background,
      border: Container.border,
      borderBottom: 0,
      borderRadius: Container.radiuses,
      WebkitOverflowScrolling: 'touch',
      zIndex: 100
    });
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase({
      transform: DetailModal.getTransform( app ),
      transition: Container.getTransition( app ),
    });

    return Style.get({layout, content, animation});
  }

  static getDetailRightSelf( {app} ){
    const layout = Style.getLayoutBlock({
      position: "fixed",
      top: "0px",
      right: "0px",
      width: DetailRight.getWidth( app ),
      minWidth: DetailRight.getWidth( app ),
      height: `calc( 100% - ${Header.headerHeight}px )`,
      WebkitOverflowScrolling: 'touch',
      background: Container.calmRGB,
      overflow: 'scroll',
      margin: `${Header.headerHeight}px 0px 0px 0px`,
      borderLeft: Container.border,
      zIndex: 0
    });
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase({
      transition: "0ms"
    });
    return Style.get({layout, content, animation});
  }

  static getFooterBorders( app ){
    if( define.APP_TYPES.EXTENSION === app.type ){
      return {borderTop: Container.border} ;
    }else{
      return app.screenMode === App.screenModeSmallLabel ?
        {borderTop: Container.border} :
        {borderTop: Container.border} ;
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
    let width = '100%';
    switch( app.screenMode ){
    case App.screenModeLargeLabel :
      width = '30%';
    }
    return addUnit ? width : Style.trimUnit( width ) ;
  }

  static getTransform( app ){
    return Detail.getDetailClass( app ).getTransform( app );
  }

  static getHeader(){
    const layout = Style.getLayoutFlex({
      width: '100%',
      height: Header.headerHeight,
      maxHeight: Header.headerHeight,
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
      maxHeight: Header.headerHeight,
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
      height: `calc( 100% - ${ Header.headerHeight * 2 }px )`,
      background: Container.lightGrayRGBA,
      zIndex: 0
    });
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getMeta(){
    const layout = Style.getLayoutBlock({
      width: '100%',
      height: 'initial',
      background: Container.whiteRGBA,
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
      margin: `${Detail.margin}% ${Detail.margin}% 7% ${Detail.margin}%`,
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
      background: Container.reliefRGB,
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
      width: "100%",
      background: Container.offWhiteRGB,
      height: Header.headerHeight,
      zÎndex: "1px",
      ...positions,
      ...borders
    });
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase({
      transform: "translate3d(0px, 0px, 0px)"
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
