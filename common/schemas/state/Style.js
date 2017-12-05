export default class Style{
  constructor( bootOption ){
    const container = Style.Container( bootOption );
    return {
      Container: Style.setStyle( container ),
    };
  }

  static setStyle( style ){
    return Style.baseStyle( style );
  }

  static baseStyle( style ){
    const reset = {
      boxSizing: "initial",
      display: 'block',
      background: '#efefef',
      color: '#777',
      margin: '0',
      padding: '0',
      border: '0',
      font: 'inherit',
      fontSize: '100%',
      fontFamily: '"Hiragino Kaku Gothic Pro", "ヒラギノ角ゴ Pro W3", メイリオ, Meiryo, "ＭＳ Ｐゴシック", "Helvetica Neue", Helvetica, Arial, sans-serif',
      verticalAlign: 'baseline',
      lineHeight: 1,
      listStyle: 'none',
      quotes: 'none',
      content: 'none',
      borderCollapse: 'collapse',
      borderSpacing: 0,
      userSelect: "none",
      transition: "0ms",
    };
    return { ...reset, ...style };
  }

  static Container( bootOption ){
    return {
      ...{
        position: 'fixed',
        bottom: '0px',
        right: '0px',
        width: '320px',
        height: '30px',
      }, ...bootOption
    }
  }
}
