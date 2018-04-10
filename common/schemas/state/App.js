import Schema from '../Schema';
export default class App extends Schema{

  static get screenModeSmallLabel(){ return 'SMALL' };
  static get screenModeMiddleLabel(){ return 'MIDDLE' };
  static get screenModeLargeLabel(){ return 'LARGE' };
  static getScreenModeDefaultPointer( screenMode ){
    const screenModeDefaultPointers = {
      [ App.screenModeSmallLabel ]: 2,
      [ App.screenModeMiddleLabel ]: 1,
      [ App.screenModeLargeLabel ]: 1
    }
    return screenModeDefaultPointers[ screenMode ];
  };
  static getScreenContentsMap( screenMode, screenModePointer ){
    const screenContentsMap = {
      [ App.screenModeSmallLabel ]: {
        // screenModePointer
        1: [ App.screenModeIndexLabel ],
        2: [ App.screenModeThreadLabel ],
        3: [ App.screenModeThreadLabel ]
      },
      [ App.screenModeMiddleLabel ]: {
        1: [ App.screenModeIndexLabel, App.screenModeThreadLabel ],
        2: [ App.screenModeThreadLabel, App.screenModeDetailLabel ]
      },
      [ App.screenModeLargeLabel ]: {
        1: [ App.screenModeIndexLabel, App.screenModeThreadLabel, App.screenModeDetailLabel ]
      },
    }
    return screenContentsMap[ screenMode ][ screenModePointer ];
  }

  static get screenModeIndexLabel(){ return 'INDEX' };
  static get screenModeThreadLabel(){ return 'THREAD' };
  static get screenModeDetailLabel(){ return 'DETAIL' };
  static get screenModeSmallWidthPx(){ return 640 };
  static get screenModeMiddleWidthPx(){ return 960 };

  constructor( params = {} ){
    super();
    const name = params.name ? params.name : 'talkn';
    const type = params.type ? params.type : '';
    const talknIndex = params.talknIndex ? params.talknIndex : 0;
    const width = params.width ? params.width : window.innerWidth;
    const height = params.height ? params.height : window.innerHeight;
    const screenMode = App.getScreenMode( width );
    const screenModePointer = App.getScreenModeDefaultPointer( screenMode );
    const screenContents = App.getScreenContentsMap( screenMode, screenModePointer );
    return this.create({
      name,
      type,
      talknIndex,
      screenModePointer,
      screenContents,
      screenMode,
      width,
      height,
    });
  }

  static getScreenMode( widthPx ){
    if( App.screenModeSmallWidthPx >= widthPx ) return App.screenModeSmallLabel;
    if( App.screenModeSmallWidthPx < widthPx &&　App.screenModeMiddleWidthPx >= widthPx ) return App.screenModeMiddleLabel;
    return App.screenModeLargeLabel;
  }
}
