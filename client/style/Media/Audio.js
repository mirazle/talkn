import App from '../../../common/schemas/state/App';
import Style from '../index';
import Container from '../Container';
import Header from '../Header';
import Detail from '../Detail';
import Menu from '../Menu';
import Board from '../Board';

export default class Audio{
  static get marginBase(){ return 5 };
  static get marginLeftMag(){ return 5 }
  static get marginRightMag(){ return 1 }
  static get marginLeft(){ return ( Math.floor( window.innerWidth * 0.05 ) ) }
  static get marginRight(){ return Audio.marginBase * Audio.marginRightMag }
  static get height(){ return 50 }
  constructor( params ){
    const self = Audio.getSelf( params );
    return {
      self
    }
  }

  static getSelfWidth(app){
    let width = 0;
    const reduceMargin = ( Audio.marginLeft ) + ( Audio.marginRight );
    const reduceWidth = Board.getTotalWidth(app);
    const reduce = reduceMargin + reduceWidth;
    switch( app.screenMode ){
    case App.screenModeSmallLabel :
      width = `calc( 100% - ${reduce}px )`;
      break;
    case App.screenModeMiddleLabel :
      width = `calc( 100% - ${ Menu.getWidth( app, true ) + reduce }px )`
      break;
    case App.screenModeLargeLabel :
      width = `calc( ${ 100 - Detail.getWidth( app, false ) }% - ${ Menu.getWidth( app, true ) + reduce }px )`;
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
    const width = Audio.getSelfWidth( app );
    const left = Audio.getSelfLeft( app );
    const layout = Style.getLayoutBlock({
      display,
      position: 'fixed',
      top: ( Header.headerHeight + 15 ) + "px",
      left,
      margin: `0px ${Audio.marginRight}px 0px ${Audio.marginLeft}px`,
      width,
      height: `${Audio.height}px`
    });
    const content = {};
    const animation = {};
    return Style.get({layout, content, animation});
  }
}
