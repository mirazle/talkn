import Style from './index';
import Container from './Container';
import App from '../../common/schemas/state/App';

export default class Menu {

  static getWidth( app, addUnit = false ){
    let width = 0;
    switch( app.screenMode ){
    case App.screenModeSmallLabel : width = '50.0%';break;
    case App.screenModeMiddleLabel : width = '300px';break;
    case App.screenModeLargeLabel : width = '300px';break;
    }

    return addUnit ? Style.trimUnit( width ) : width ;
  }

  constructor( params ){
    const self = Menu.getSelf( params );
    const scroll = Menu.getScroll( params );
    const columns = Menu.getColumns( params );
    const column = Menu.getColumn( params );
    const columnLast = Menu.getColumnLast( params );
    const img = Menu.getImg( params );
    const wrap = Menu.getWrap( params );
    const imgWrap = Menu.getImgWrap( params );
    const names = Menu.getNames( params );
    const namesAddConnection = Menu.getNamesAddConnection( params );
    return {
      self,
      scroll,
      columns,
      column,
      columnLast,
      img,
      imgWrap,
      wrap,
      names,
      namesAddConnection,
    }
  }

  static getSelf( {app} ){
    const layout = Style.getLayoutInlineBlock({
      width: Menu.getWidth( app ),
      minWidth: Menu.getWidth( app ),
      maxWidth: 'inherit',
      WebkitOverflowScrolling: 'touch',
      background: Container.calmRGB,
      overflow: 'scroll',
      borderRight: Container.border,
    });
    const content = {};
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getScroll( {app} ){
    const layout = Style.getLayoutBlock({
      overflow: 'scroll',
      width: 'inherit',
      minWidth: 'inherit',
      maxWidth: 'inherit',
    });
    const content = {};
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getColumns(){
    const layout = Style.getLayoutBlock({
      width: 'inherit',
      minWidth: 'inherit',
      maxWidth: 'inherit',
      height: 'auto',
      borderTop: Container.border,
      borderBottom: Container.border,
      background: Container.whiteRGB,
      overflow: 'scroll',
    });
    const content = Style.getContentBase({
      whiteSpace: 'nowrap',
    });
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getColumn(){
    const layout = Style.getLayoutBlock({
      width: 'inherit',
      minWidth: 'inherit',
      maxWidth: 'inherit',
      marginLeft: '20px',
      borderBottom: Container.border,
    });
    const content = Style.getContentBase({
      letterSpacing: '2px',
      textAlign: 'left',
      lineHeight: '60px',
      whiteSpace: 'nowrap',
    });
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getColumnLast(){
    const layout = Style.getLayoutBlock({
      width: 'inherit',
      minWidth: 'inherit',
      maxWidth: 'inherit',
      marginLeft: '20px',
    });
    const content = Style.getContentBase({
      letterSpacing: '2px',
      textAlign: 'left',
      lineHeight: '60px',
      whiteSpace: 'nowrap',
    });
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getWrap(){
    const layout = Style.getLayoutBase({
      width: 'initial',
      height: '60px',
      minWidth: 'initial',
      minHeight: 'initial',
    });
    const content = Style.getContentBase({
      textAlign: 'left',
    });
    const animation = Style.getAnimationBase({});
    return Style.get({layout, content, animation});
  }

  static getImgWrap(){
    const layout = Style.getLayoutInlineBlock({
      width: '60px',
      height: '60px',
    });
    const content = Style.getContentBase({});
    const animation = Style.getAnimationBase({});
    return Style.get({layout, content, animation});
  }

  static getImg(){
    const layout = Style.getLayoutInlineBlock({
      borderRadius: '50%',
      width: '34px',
      height: '34px',
      margin: '0px 15px 0px 0px',
    });
    const content = Style.getContentBase({});
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getNamesAddConnection(){
    const layout = Style.getLayoutInlineBlock({
      padding: '5px',
    });
    const content = Style.getContentBase({
      textAlign: 'left',
      lineHeight: '2',
    });
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getNames(){
    const layout = Style.getLayoutInlineBlock({});
    const content = Style.getContentBase({
      textAlign: 'left',
      lineHeight: '1.7',
    });
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }
}
