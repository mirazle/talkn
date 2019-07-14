import App from '../../../common/schemas/state/App';
import Style from '../index';
import Container from '../Container';
import Header from '../Header';
import Detail from '../Detail';
import Menu from '../Menu';
import Board from '../Board';

export default class Video{
  static get marginBase(){ return 5 };
  static get marginLeftMag(){ return 1 }
  static get marginRightMag(){ return 1 }
  static get marginLeft(){ return Video.marginBase * Video.marginLeftMag }
  static get marginRight(){ return Video.marginBase * Video.marginRightMag }
  static get height(){ return 237 }
  constructor( params ){
    const self = Video.getSelf( params );
    return {
      self
    }
  }

  static getSelfWidth(app){
    let width = 0;
    const reduce = ( Video.marginLeftMag ) + ( Video.marginRightMag );
    switch( app.screenMode ){
    case App.screenModeSmallLabel :
      width = `${ 100 - reduce}%`;
      break;
    case App.screenModeMiddleLabel :
      width = `calc( 100% - ${ Menu.getWidth( app, true ) + reduce }px )`
      break;
    case App.screenModeLargeLabel :
      width = `calc( ${ 100 - Detail.getWidth( app, false ) - reduce }% - ${ Menu.getWidth( app, true ) + reduce }px )`;
      break;
    }
    return width;
  }

  static getSelfLeft(app){
    let left = "0px";
    switch( app.screenMode ){
    case App.screenModeSmallLabel :
      left = "0px";
      break;
    case App.screenModeMiddleLabel :
    case App.screenModeLargeLabel :
      left = Menu.getWidth(app, true);
      break;
    }
    return left;
  }

  static getSelf( {app} ){
    const display = app.isMediaConnection ? "block" : "none";
    const width = Video.getSelfWidth( app );
    const left = Video.getSelfLeft( app );
    const layout = Style.getLayoutBlock({
      display,
      position: 'fixed',
      background: "black",
      top: ( Header.headerHeight + 10 ) + "px",
      left,
      margin: `0px ${Video.marginRightMag}% 0px ${Video.marginLeftMag}%`,
      width,
      zIndex: 1,
      height: `${Video.height}px`,
      boxShadow: "rgba(0, 0, 0, 0.75) 0px 0px 5px 0px"
    });
    const content = {};
    const animation = {};
    return Style.get({layout, content, animation});
  }
}
