import App from '../../common/schemas/state/App';
import Style from './index';
import Container from './Container';
import Footer from './Footer';
import Menu from './Menu';
import DetailRight from './DetailRight';

export default class Animation {

  constructor( params ){
    const detailModalSelf =  Animation.getDetailModalSelf( params );
    const detailRightSelf = Animation.getDetailRightSelf( params );
    const iconUserBottom = Animation.getIconUserBottom( params );
    const iconDetailBottom = Animation.getIconDetailBottom( params );
    const iconMenuDiv = Animation.getIconMenuDiv( params );
    const mainSelf = Animation.getMainSelf( params );
    const mainNotif = Animation.getMainNotif( params );
    const postsOl = Animation.getPostsOl( params );
    const screenSelf = Animation.getScreenSelf( params );

    return {
      detailModalSelf,
      detailRightSelf,
      iconUserBottom,
      iconDetailBottom,
      iconMenuDiv,
      mainSelf,
      mainNotif,
      postsOl,
      screenSelf,
    }
  }

  static getDetailModalSelf( {app} ){
    return Style.getAnimationBase();
  }

  static getDetailRightSelf( {app} ){
    return Style.getAnimationBase();
  }

  static getIconUserBottom( {app} ){
    return Style.getAnimationBase();
  }

  static getIconDetailBottom( {app} ){
    return Style.getAnimationBase();
  }

  static getIconMenuDiv( {app} ){
    return Style.getAnimationBase();
  }

  static getMainSelf( {app} ){
    return Style.getAnimationBase();
  }

  static getMainNotif( {app} ){
    return Style.getAnimationBase();
  }

  static getPostsOl( {app} ){
    return Style.getAnimationBase();
  }

  static getScreenSelf( {app} ){
    return Style.getAnimationBase();
  }
}
