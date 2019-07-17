import App from '../../../common/schemas/state/App';
import Style from '../index';
import Container from '../Container';
import Header from '../Header';
import Detail from '../Detail';
import Menu from '../Menu';
import Board from '../Board';

export default class List{
  static get marginBase(){ return 5 };
  static get marginLeftMag(){ return 1 }
  static get marginRightMag(){ return 0 }
  static get marginLeft(){ return List.marginBase * List.marginLeftMag }
  static get marginRight(){ return List.marginBase * List.marginRightMag }

  constructor( params ){
    const self = List.getSelf( params );
    return {
      self
    }
  }

  static getSelfTop(app){
    return Board.getSelfTop(app);
  }

  static getSelfWidth(app){
    let width = 0;
    if( app.isOpenMediaList ){
      const reduce = ( List.marginLeftMag ) + ( List.marginRightMag );
      switch( app.screenMode ){
      case App.screenModeSmallLabel :
        width = `calc( ${ 100 - reduce}% )`;
        break;
      case App.screenModeMiddleLabel :
        width = `calc( ${ 100 - reduce }% - ${ Menu.getWidth( app, true ) } )`
        break;
      case App.screenModeLargeLabel :
        width = `calc( ${ 100 - Detail.getWidth( app, false ) - reduce }% - ${ Menu.getWidth( app, true ) + reduce }px )`;
        break;
      }
    }
    return width;
  }

  static getSelfHeight(app){
    return Board.getSelfHeight(app);
  }

  static getSelfRight(app){
    let right = "0px";
    switch( app.screenMode ){
    case App.screenModeSmallLabel :
      right = "0px";
      break;
    case App.screenModeMiddleLabel :
    case App.screenModeLargeLabel :
      right = Board.getSelfRight(app, true);
      break;
    }
    return right;
  }

  static getSelf( {app} ){
    const top = List.getSelfTop( app );
    const width = List.getSelfWidth( app );
    const height = List.getSelfHeight( app );
    const right = List.getSelfRight( app );
    const layout = Style.getLayoutFlex({
      position: 'fixed',
      background: Container.whiteRGBA,
      top,
      right,
      margin: `0px ${List.marginRightMag}% 0px ${List.marginLeftMag}%`,
      width,
      zIndex: 1,
      height,
      outline: "none",
      borderRadius: "10px 0px 0px 10px",
      boxShadow: "rgb(220, 220, 220) 0px 0px 5px"
    });
    const content = {};
    const animation = Style.getAnimationBase({
      transition: Container.getTransition( app ),
    });
    return Style.get({layout, content, animation});
  }
}
