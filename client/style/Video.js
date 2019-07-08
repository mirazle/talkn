import App from '../../common/schemas/state/App';
import Style from './index';
import Container from './Container';
import Header from './Header';
import Posts from './Posts';

export default class Video{

  static getSelfWidth(app){
    let width = Posts.getWidth(app);
    return width;
  }

  constructor( params ){
    const self = Video.getSelf( params );
    return {
      self
    }
  }

  static getSelf( {app} ){
    const width = Video.getSelfWidth( app );
    const left = 0;
    const layout = Style.getLayoutBlock({
      position: 'fixed',
      top: ( Header.selfHeight + 5 ) + "px",
      left,
      width
    });
    const content = {};
    const animation = {};
    return Style.get({layout, content, animation});
  }
}
