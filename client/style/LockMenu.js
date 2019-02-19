import Style from './index';
import App from '../../common/schemas/state/App';
import Container from './Container';
import Main from './Main';
import Menu from './Menu';
import Posts from './Posts';

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

  static getPaddingLi(app){
    switch( app.screenMode ){
    case App.screenModeSmallLabel :
      return '14px';
    case App.screenModeMiddleLabel :
    case App.screenModeLargeLabel :
      return '14px';
    }
  }

  constructor( params ){
    const menuWeb = LockMenu.getMenuWeb( params );
    const menuShare = LockMenu.getMenuShare( params );
    const header = LockMenu.getHeader( params );
    const ul = LockMenu.getUl( params );
    const liGoWeb = LockMenu.getLiGoWeb( params );
    const liTwitter = LockMenu.getLiTwitter( params );
    const liFacebook = LockMenu.getLiFacebook( params );
    const liEmbed = LockMenu.getLiEmbed( params );
    const liEmbedInput = LockMenu.getLiEmbedInput( params );
    const shareLabel = LockMenu.getShareLabel( params );
    return {
      menuWeb,
      menuShare,
      header,
      ul,
      liGoWeb,
      liTwitter,
      liFacebook,
      liEmbed,
      liEmbedInput,
      shareLabel
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
    const layout = Style.getLayoutFlex({...commonLayout, top: '32%'});
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
  
  static getLiGoWeb({app}){
    const layout = Style.getLayoutFlex({
      width: "100%",
      height: "45px",
      padding: LockMenu.getPaddingLi(app),
    });
    const content = Style.getContentBase({
      cursor: "pointer"
    });
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getLiTwitter({app}){
    const layout = Style.getLayoutFlex({
      width: "100%",
      height: "45px",
      padding: LockMenu.getPaddingLi(app),
      borderBottom: Container.border
    });
    const content = Style.getContentBase({
      cursor: "pointer"
    });
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getLiFacebook({app}){
    const layout = Style.getLayoutFlex({
      width: "100%",
      height: "45px",
      padding: LockMenu.getPaddingLi(app),
      borderBottom: Container.border
    });
    const content = Style.getContentBase({
      cursor: "pointer"
    });
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getLiEmbed({app}){
    const layout = Style.getLayoutFlex({
      width: "100%",
      height: "45px",
      padding: LockMenu.getPaddingLi(app)
    });
    const content = Style.getContentBase({
      cursor: "pointer"
    });
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getLiEmbedInput({app}){
    const layout = Style.getLayoutFlex({
      width: "100%",
      height: "25px",
      border: Container.border,
      borderRadius: '5px',
      padding: '5px'
    });
    const content = Style.getContentBase({
      fontSize: "12px",
      outline: 0,
      cursor: "pointer"
    });
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getShareLabel({app}){
    const layout = Style.getLayoutFlex({
      flexGrow: "1"
    });
    const content = Style.getContentBase({
      color: "inherit",
      justifyContent: "flex-start",
      textIndent: "10px",
      textAlign: "left"
    });
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }
}