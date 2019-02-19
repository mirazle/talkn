import define from '../../common/define';
import Style from './index';
import Container from './Container';
import Header from './Header';
import Posts from './Posts';

export default class InnerNotif {

  static get selfHeight(){ return Header.headerHeight };

  constructor( params ){
    const self = InnerNotif.getSelf(params);
    return {
      self
    }
  }

  static getSelf({app}){
    const width = Posts.getOlWidth({app}, true);
    const marginOne = ( 100 - width ) / 2; 
    const height = app.isOpenInnerNotif ? Header.headerHeight : 0;
    const layout = Style.getLayoutFlex({
      position: 'fixed',
      top: Header.headerHeight + "px",
      alignItems: "center",
      justifyContent: "center",
      width: `calc( ${width}% - 2px )`,
      margin: `0px calc( ${marginOne}% + 1px ) 0px calc( ${marginOne}% + 1px )`,
      height,
      background: Container.themeRGBA
    });
    const content = Style.getContentBase({
      color: Container.whiteRGB,
    });
    const animation = Style.getAnimationBase({
      transition: `${Container.transitionNotif}ms`
    });
    return Style.get({layout, content, animation});
  }
}