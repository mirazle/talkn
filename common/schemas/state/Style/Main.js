import Style from './index';

export default class Main{
  constructor(){
    const self = Main.getSelf();
    return {
      self,
    }
  }

  static getSelf(){
    const layout = {display: 'none'};
    const content = {};
    const animation = {};
    return Style.get({layout, content, animation});
  }
}
