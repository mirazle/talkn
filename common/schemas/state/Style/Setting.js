import Style from './index';
import Container from './Container';

export default class Setting {

  static get width(){ return 300 };

  constructor( params ){
    const { bootOption } = params;
    const self = Setting.getSelf( bootOption );
    const scroll = Setting.getScroll( bootOption );
    const columns = Setting.getColumns( bootOption );
    const column = Setting.getColumn( bootOption );
    const columnLast = Setting.getColumnLast( bootOption );
    const img = Setting.getImg( bootOption );
    const imgWrap = Setting.getImgWrap( bootOption );
    const names = Setting.getNames( bootOption );
    return {
      self,
      scroll,
      columns,
      column,
      columnLast,
      img,
      imgWrap,
      names,
    }
  }

  static getSelf( bootOption ){
    const layout = Style.getLayoutBlock({
      width: Setting.width,
      minWidth: Setting.width,
      maxWidth: Setting.width,
      WebkitOverflowScrolling: 'touch',
      background: Container.calmRGB,
      overflow: 'scroll',
      borderRight: Container.border,
    });
    const content = {};
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getScroll( bootOption ){
    const layout = Style.getLayoutBlock({
      overflow: 'scroll',
    });
    const content = {};
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }

  static getColumns( bootOption ){
    const layout = Style.getLayoutBlock({
      width: '100%',
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

  static getColumn( bootOption ){
    const layout = Style.getLayoutBlock({
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

  static getColumnLast( bootOption ){
    const layout = Style.getLayoutBlock({
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

  static getImgWrap( bootOption ){
    const layout = Style.getLayoutInlineBlock({
      width: '60px',
      height: '60px',
    });
    const content = Style.getContentBase({});
    const animation = Style.getAnimationBase({});
    return Style.get({layout, content, animation});
  }

  static getImg( bootOption ){
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

  static getNames( bootOption ){
    const layout = Style.getLayoutInlineBlock({});
    const content = Style.getContentBase({
      textAlign: 'left',
      lineHeight: '2',
    });
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }
}
