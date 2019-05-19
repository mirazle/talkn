import define from '../../common/define';
import Style from './index';
import Container from './Container';
import Footer from './Footer';
import Posts from './Posts';

export default class Notif {

  static get selfHeight(){ return 40 };
  
  static getNotifsDisplay(app){
    if(define.APP_TYPES.EXTENSION === app.type ){
      return "block";
    }else{
      return 'none';
    }
  }

  static getNotifsHeight(app){
    if(define.APP_TYPES.EXTENSION === app.type ){
      return `${Notif.selfHeight}px`;
    }else{
      return '0px';
    }
  }

  constructor( params ){
    const notifs = Notif.getNotifs(params);
    const self = Notif.getSelf(params);
    const bottom = Notif.getBottom(params);
    const bottomIcon = Notif.getBottomIcon(params);
    const bottomPost = Notif.getBottomPost(params);
    return {
      notifs,
      self,
      bottom,
      bottomIcon,
      bottomPost
    }
  }

  static getNotifs({app}){
    const display = Notif.getNotifsDisplay(app);
    const height = Notif.getNotifsHeight(app);
    const layout = Style.getLayoutBlock({
      display,
      position: "absolute",
      top: "0px",
      width: '100%',
      height,
      overflow: 'visible',
    });
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getSelf({app}){
    const display = Notif.getNotifsDisplay(app);
    const width = Posts.getOlWidth({app}, true);
    const merginLeft = ( 100 - width ) / 2;
    const layout = Style.getLayoutBlock({
      display,
      position: 'absolute',
      top: 0,
      width: `${width}%`,
      height: Notif.selfHeight + "px",
      background: Container.whiteRGBA,
      marginLeft: `${merginLeft}%`,
      borderTop: Container.border,
      borderLeft: Container.border,
      borderRight: Container.border,
      borderRadius: '3px 3px 0px 0px',
    });
    const content = Style.getContentBase({
      textAlign: 'left'
    });
    const animation = Style.getAnimationBase({
      transform: 'translate3d(0px, 40px, 0px)',
      transition: `${Container.transitionNotif}ms`
    });
    return Style.get({layout, content, animation});
  }

  static getBottom({app}){
    const layout = {
      width: '100%'
    };
    const content = {};
    const animation = {};
    return Style.get({layout, content, animation});
  }

  static getBottomIcon({app}){
    const layout = {};
    const content = {};
    const animation = {};
    return Style.get({layout, content, animation});
  }

  static getBottomPost({app}){
    const layout = {
      overflow: "hidden",
      padding: '15px 15px 15px 0px',
      background: 'none'
    };
    const content = {
      lineHeight: '0.8',
      whiteSpace: "nowrap",
      color: Style.fontBaseRGB
    }
    const animation = {};
    return Style.get({layout, content, animation});
  }
}