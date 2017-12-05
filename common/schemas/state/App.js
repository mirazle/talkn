export default class App{
  constructor( appType, talknIndex ){
    return {
      name: 'talkn',
      type: appType,
      talknIndex: talknIndex,
      screenMode: 'screen1',
    };
  }
}
