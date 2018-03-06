import Style from './index';
import Container from './Container';

export default class Setting {

  static get width(){ return 300 };

  constructor( params ){
    const { bootOption } = params;
    const self = Setting.getSelf( bootOption );
    const columns = Setting.getColumns( bootOption );
    const column = Setting.getColumn( bootOption );
    const columnLast = Setting.getColumnLast( bootOption );
    return {
      self,
      columns,
      column,
      columnLast
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

  static getColumns( bootOption ){
    const layout = Style.getLayoutBlock({
      width: '100%',
      height: 'auto',
      borderTop: Container.border,
      borderBottom: Container.border,
      background: Container.lightRGB,
      overflow: 'scroll',
    });
    const content = Style.getContentBase({});
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
    });
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }
}
