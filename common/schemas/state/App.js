import Schema from '../Schema';
export default class App extends Schema{
  constructor( params = {} ){
    super();
    const name = params.name ? params.name : 'talkn';
    const type = params.type ? params.type : '';
    const talknIndex = params.talknIndex ? params.talknIndex : 0;
    const screenMode = params.screenMode ? params.screenMode : '';
    return this.create({
      name,
      type,
      talknIndex,
      screenMode,
    });
  }
}
