import Style from './index';
import App from '../../common/schemas/state/App';
import Container from './Container';
import Main from './Main';
import Menu from './Menu';
import Posts from './Posts';
import Detail from './Detail';

export default class LockMenu {

  static getCommonLayout(app){
    const layout = {
      position: 'fixed',
      width: '80%',
      height: 'fit-content',
      top: '30%',
      left: '10%',
      flexFlow: "column",
      background: Container.whiteRGBA,
      border: Container.border,
      borderRadius: "5px",
      boxShadow: "rgba(50, 50, 50, 0.1) 3px 3px 3px" 
    }
    switch( app.screenMode ){
    case App.screenModeSmallLabel :
      layout.width = '80%';
      layout.left = '10%';
      break;
    case App.screenModeMiddleLabel :
      layout.width = '50%';
      layout.left = '25%';
      break;
    case App.screenModeLargeLabel :
      layout.width = `calc( ( ${Posts.getWidth(app)} ) - 10% )`;
      layout.left = `calc( 5% + ${Menu.getWidth(app)} )`;
      break;
    }
    return layout;
  }

  constructor( params ){
    const menuWeb = LockMenu.getMenuWeb( params );
    const menuShare = LockMenu.getMenuShare( params );
    const header = LockMenu.getHeader( params );
    const ul = LockMenu.getUl( params );
    const li = LockMenu.getLi( params );
    const liLast = LockMenu.getLiLast( params );
    return {
      menuWeb,
      menuShare,
      header,
      ul,
      li,
      liLast
    }
  }

  static getMenuWeb({app}){
    const commonLayout = LockMenu.getCommonLayout(app);
    const layout = Style.getLayoutFlex({...commonLayout, top: '37%'});
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getMenuShare({app}){
    const commonLayout = LockMenu.getCommonLayout(app);
    const layout = Style.getLayoutFlex({...commonLayout, top: '33%'});
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getHeader({app}){
    const layout = Style.getLayoutFlex({
      width: '100%',
      height: Main.headerHeight,
      maxHeight: Main.headerHeight,
      borderBottom: Container.border,
      background: Container.whiteRGB,
      padding: '0px 20px',
    });
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getUl({app}){
    const layout = Style.getLayoutBlock({
      width: "100%",
    });
    const content = Style.getContentBase({});
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }
  
  static getLi({app}){
    const layout = Style.getLayoutFlex({
      width: "100%",
      padding: '20px',
      borderBottom: Container.border
    });
    const content = Style.getContentBase({
      cursor: "pointer"
    });
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getLiLast({app}){
    const layout = Style.getLayoutFlex({
      width: "100%",
      padding: '20px',
    });
    const content = Style.getContentBase({
      cursor: "pointer"
    });
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }
}