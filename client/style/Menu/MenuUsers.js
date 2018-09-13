import Style from '../index';
import Container from '../Container';
import App from '../../../common/schemas/state/App';
import Main from '../Main';

export default class MenuUsers {

  static getWidth( app, addUnit = false ){
    let width = 0;
    switch( app.screenMode ){
    case App.screenModeSmallLabel : width = '100.0%';break;
    case App.screenModeMiddleLabel : width = '300px';break;
    case App.screenModeLargeLabel : width = '300px';break;
    }

    return addUnit ? Style.trimUnit( width ) : width ;
  }

  static getTransform( app ){
    let transform = 'translate3d( 0px ,0px, 0px )';
    switch( app.screenMode ){
    case App.screenModeSmallLabel : transform = 'translate3d( 0px ,0px, 0px )';break;
    case App.screenModeMiddleLabel :
      transform = app.isOpenDetail ? `translate3d( 0px ,0px, 0px )` : 'translate3d( 0px ,0px, 0px )';
      break;
    case App.screenModeLargeLabel : transform = 'translate3d( 0px ,0px, 0px )';break;
    }
    return transform ;
  }

  constructor( params ){
    const self = MenuUsers.getSelf( params );
    const columns = MenuUsers.getColumns( params );
    const column = MenuUsers.getColumn( params );
    const columnLast = MenuUsers.getColumnLast( params );
    const img = MenuUsers.getImg( params );
    const wrap = MenuUsers.getWrap( params );
    const imgWrap = MenuUsers.getImgWrap( params );
    const names = MenuUsers.getNames( params );
    const namesAddConnection = MenuUsers.getNamesAddConnection( params );
    return {
      self,
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
      position: 'relative',
      width: MenuUsers.getWidth( app ),
      minWidth: MenuUsers.getWidth( app ),
      maxWidth: 'inherit',
      height: '100%',
      WebkitOverflowScrolling: 'touch',
      overflow: 'scroll',
      zIndex: 2,
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
    const layout = Style.getLayoutFlex({
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
    const layout = Style.getLayoutBlock({
      flexGrow: 1,
      margin: '22px 0px 0px 0px',
      width: '60px',
      maxWidth: '60px',
      minWidth: '60px',
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
    const layout = Style.getLayoutBlock({
      padding: '5px',
      flexGrow: 4,
    });
    const content = Style.getContentBase({
      fontSize: "12px",
      textAlign: 'left',
      lineHeight: '2',
    });
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getNames(){
    const layout = Style.getLayoutBlock({
      flexGrow: 4,
    });
    const content = Style.getContentBase({
      fontSize: "12px",
      textAlign: 'left',
      lineHeight: '1.7',
    });
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }
}
