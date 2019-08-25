import React, { Component } from "react"
import Icon from './Icon';
import PostStyle from 'client/style/Post';

export default class PostsSupporter extends Component {

  static get Cover(){
    return [
      {menu: "Emojis", display: '👍', label: "Like"},
      {menu: "Emojis", display: '💓', label: "PosiHigh"},
      {menu: "Emojis", display: '😄', label: "PosiFlat"},
      {menu: "Emojis", display: '😌', label: "PosiLow"},
      {menu: "Emojis", display: '😅', label: "NegaHigh"},
      {menu: "Emojis", display: '😭', label: "NegaFlat"},
      {menu: "Emojis", display: '😡', label: "NegaLow"},
      {menu: "Emojis", display: '💰', label: "Money"}
    ];
  }

  static get RussellModel(){
    return {
      1: { PosiNega: 1, tensionType: 1, tensionLv: 1, 'has': [1001, 1002 ] }
    }
  }

  static get Emotions(){
    return {
      // Positive(high)
      1001: 'surprise',
      1002: 'excite',
      1003: 'happy',
      1004: 'joy',

      // Positive(middle)
      2001: 'glad',
      2002: 'satisfaction',

      // Positive(low)
      3001: 'comfort',
      3002: 'relax',
      3003: 'tired',

      // Negatie(low)
      5001: 'sleepy',
      
      6001: 'slack',
      6002: 'boring',

      // Negatie(middle)
      7001: 'melancholy',
      7002: 'sad',
      7003: 'unpleasant',
      7004: 'frustrated',

      // Negatie(high)
      8001: 'dissatisfied',
      8002: 'anger',
      8003: 'worry',
      8004: 'fear',

      // Flat like
      10001: 'like',
      10002: 'interest',
      10003: 'discovery',
      10004: 'sunny',
      10005: 'peace',
    }
  }

  static get EmotionMap(){
    return {
      '👍': [{ 10001: 1 }],
      '😉': [{ }],
      '💡': {},
      '👀': {},
      '✌️': {},
      '💪': {},
      '☀️': {},

      // Suprise
      '😳': [{ 1001: 1 }],
      '😵': [{ 1001: 1 }],

      // Excite
      '🤣': [{ 1002: 1 }],
      '😆': [{ 1002: 1 }],
      '🤩': [{ 1002: 1 }],

      // Happy
      '💓': [{ 1003: 1 }],
      '🥰': [{ 1003: 1 }],
      '😍': [{ 1003: 1 }],
      '😻': [{ 1003: 1 }],

      // Joy
      '😄': [{ 1004: 1 }],
      '✨': [{ 1004: 1 }],
      '😁': [{ 1004: 1 }],
      '🍺': [{ 1004: 1 }],
      '😊': [{ 1004: 1 }],
      '😘': [{ 1004: 1 }],
      '🌟': [{ 1004: 1 }],

      // Glad
      '🥳': [{ 2001: 1 }],
      '😃': [{ 2002: 1 }],

      // Satisfaction
      '😋': [{ 2003: 1 }],
      '🎂': [{ 2003: 1 }],
      '🍰': [{ 2003: 1 }],
      '🧁': [{ 2003: 1 }],

      // Comfort
      '😌': [{ 3001: 1 }],
      '🤤': [{ 3001: 1 }],

      // Relax
      '🙂': [{ 3002: 1 }],

      // Tired
      '😐': [{ 3003: 1 }],
      '😮': [{ 3003: 1 }],
      '😯': [{ 3003: 1 }],

      // Slack
      '😅': [{ 6001: 1 }],
      '💦': [{ 6001: 1 }],
      '😲': [{ 6001: 1 }],
      '🙄': [{ 6001: 1 }],

      // Boring
      '😒': [{ 6002: 1 }],
      '😑': [{ 6002: 1 }],
      '😕': [{ 6002: 1 }],

      // Melancholy
      '😩': [{ 7001: 1 }],
      '😞': [{ 7001: 1 }],
      '😔': [{ 7001: 1 }],
      '😟': [{ 7001: 1 }],

      // Sad
      '😭': [{ 7002: 1 }],
      '😥': [{ 7002: 1 }],

      '🤢': {},
      '🤮': {},
      '🤕': {},
      '🤒': {},
      '😷': {},
      '🤧': {},
      '🧐': {},
      '🤔': {},
      '🤨': {},







      '😩': {},
      '😞': {},
      '😔': {},
      '😟': {},
      '😡': {},
      '😠': {},
      '😾': {},
      '🤬': {},
      '💔': {},
      '💢': {},
      '😤': {},
      '👿': {},
      '😣': {},
      '🥺': {},
      '😫': {},
      '😓': {},
      '😖': {},
      '😨': {},
      '😰': {},
      '😿': {},
      '🥶': {},
      '🥵': {},
      '😱': {},
      '🙀': {},
      '💀': {}
    }
  }

  static get Emojis(){
    return {
      Like: ['👍','😉','💡','👀','✌️', '💪', '☀️'],
      PosiFlat: [ '😄','✨','😁','🍺','😊','😘','🌟','🥳','😃','😋','🎂','🍰','🧁'],
      PosiHigh: ['💓', '🤣', '😳','😵','😆','🤩','🥰','😍','😻'],
      PosiLow: [ '😌','🤤','🙂','😐','😮','😯'],
      NegaFlat: ['😭','😥','🤢','🤮','🤕','🤒','😷','🤧','🧐','🤔','🤨'],
      NegaHigh: ['😅','💦','😲','🙄','😒','😑','😕','😩','😞','😔','😟','😩','😞','😔','😟'],
      NegaLow: [ '😡', '😠','😾','🤬','💔','💢','😤','👿','😣','🥺','😫','😓','😖','😨','😰','😿','🥶','🥵','😱','🙀','💀'],
      Money: [],
    }
          /*
        記号（良いね）
            👍😉💡👀✌️
            
        プラス

            Surprise(驚き)
              😳😵
            Excite(興奮)
              😆🤣🤩
            Happy(幸福)
              💓🥰😍😻
            Jou(喜び)
              😄✨😁🍺😊😘🌟
            Glad(嬉しい)
              🥳😃
            Satisfaction(満足)
              😋🎂🍰🧁
            Comfort(気楽)
              😌🤤
            Relax(リラックス)
              🙂
            Tired(飽き)
              😐😮😯
        マイナス    Sleepy(😪😴)

            Slack(たるみ)
              😅💦😲🙄
            Boring(退屈)
              😒😑😕
            Melancholy(憂鬱)
              😩😞😔😟
            Sad(悲しみ)
              😥😭
            Unpleasant(不愉快)
              🤢🤮🤕🤒😷🤧
            Frustrated(イライラ)
              🧐🤔🤨
            Dissatisfied(不満)
              😠😾
            Anger(怒り)
              😡🤬💔💢😤👿
            Worry(心配)
              😣🥺😫😓😖😨😰😿
            Fear(恐れ)
              🥶🥵😱🙀💀

*/ 
  }

  constructor(props) {
    super(props);
    let style = {Cover: [], Emojis: {}};
    PostsSupporter.Cover.forEach( ( obj ) => {
      style.Cover[ obj.label ] = {...props.state.style.postsSupporter.emoji };
    });
    Object.keys( PostsSupporter.Emojis ).forEach( ( label ) => {
      PostsSupporter.Emojis[ label ].forEach( ( display, i ) => {
        if( !style.Emojis[ label ] ) style.Emojis[ label ] = [];
        style.Emojis[ label ][ i ] = {...props.state.style.postsSupporter.emoji };
      });
    });

    this.state = {
      style,
      menu: "Cover",
      label: "",
    };
    this.getDisplay = this.getDisplay.bind( this );
  }

  getEvents(menu, toMenu, toLabel, i){

    switch( menu ){
    case "Cover":
      return {
        onMouseOver: ( e ) => {
          this.setState( {
            style: {...this.state.style,
              [ menu ]: {...this.state.style[ menu ],
                [ toLabel ]: { ...this.state.style[ menu ][ toLabel ],
                  transform: "scale(1.1)"
                }
              }
            }
          });
        },
        onMouseOut: ( e ) => {
          this.setState( {
            style: {...this.state.style,
              [ menu ]: {...this.state.style[ menu ],
                [ toLabel ]: { ...this.state.style[ menu ][ toLabel ],
                  transform: "scale(1.0)"
                }
              }
            }
          });
        },
        onClick: ( e ) => {
          this.setState( {  menu: toMenu, label: toLabel } );
        }
      }
    default:
      return {
        onMouseOver: ( e ) => {
          this.setState( {
            style: {...this.state.style,
              [ menu ]: {...this.state.style[ menu ],
                [ toLabel ]: { ...this.state.style[ menu ][ toLabel ],
                  [ i ]: {...this.state.style[ menu ][ toLabel ][ i ],
                    transform: "scale(1.1)"
                  }
                }
              }
            }
          });
        },
        onMouseOut: ( e ) => {
          this.setState( {
            style: {...this.state.style,
              [ menu ]: {...this.state.style[ menu ],
                [ toLabel ]: { ...this.state.style[ menu ][ toLabel ],
                  [ i ]: {...this.state.style[ menu ][ toLabel ][ i ],
                    transform: "scale(1.0)"
                  }
                }
              }
            }
          });
        },
        onClick: ( e ) => {

          if( i !== 0 ){
            console.log( toLabel );
            const post = PostsSupporter[ menu ][ toLabel ][ i - 1 ];

            talknAPI.delegatePost( {
              inputPost: `<div class="talknStamps" data-component-name="${toLabel}" style="${PostStyle.stampStyle}">${post}</div>`,
              inputCurrentTime: 0
            } );
          }
          this.setState( {  menu: "Cover", label: "" } );
        }
      }
    }
  }

  getDisplay( menu, label ){
    const IconOpenEmoji = Icon.getOpenEmoji();
    const IconCloseEmoji = Icon.getCloseEmoji();
    const { style } = this.state;
    let display = [];
    switch( menu ){
    case "Cover":
        display = PostsSupporter.Cover.map( (obj, index) => {
          return ( 
            <li
              key={ menu + "_" + index }
              style={ style[ menu ][ obj.label ] }
              {...this.getEvents( menu, obj.menu, obj.label ) }
            >
              {obj.display}
              { menu === "Cover" && IconOpenEmoji }
            </li>
          );
        });
        break;
    default:
      display = PostsSupporter[ menu ][ label ].map( (emoji, i) => {
        const index = i ;
        return ( 
          <li
            key={ menu + label + "_" + index }
            style={ style[ menu ][ label ][ index ] }
            {...this.getEvents( menu, menu, label, index + 1) }
          >
            {emoji}
          </li>
        );
      });

      display.unshift(
        <li
          key={"backCover" }
          style={ style[ "Cover" ][ label ] }
          {...this.getEvents( menu, menu, label, 0 ) }
        >
          { IconCloseEmoji }
        </li>
      );
      
      break;
    }
    return display;
  }

  render() {
    const { style } = this.props.state;
    const { menu, label } = this.state;
    const lis = this.getDisplay( menu, label );
    return (
      <ul
        data-component-name={"PostsSupporter"}
        style={ style.postsSupporter.self }
      >
        { lis }
      </ul>
    );
  }
}
