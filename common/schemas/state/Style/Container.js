import Style from './index';

export default class Container{
  constructor( params ){
    const { thread, bootOption } = params;
    const self = Container.getSelf( bootOption );
    return {
      self,
    }
  }

  static getSelf( bootOption ){
    const layoutBlock = Style.getLayoutBlock({
      position: 'fixed',
      bottom: '0px',
      right: '10px',
      width: '320px',
      height: '35px',
      boxShadow: 'rgb(230, 230, 230) 0px 0px 5px 0px',
      borderTop: '1px solid rgb(220, 220, 220)',
      borderRight: '1px solid rgb(220, 220, 220)',
      borderLeft: '1px solid rgb(220, 220, 220)',
      borderRadius: '3px 3px 0px 0px',
    });
    const layout = {...layoutBlock, ...bootOption};
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase();
    return Style.get({layout, content, animation});
  }
}
