import React, { Component } from "react"
import Icon from './Icon';
import PostStyle from 'client/style/Post';

export default class PostsSupporter extends Component {

  static get Cover(){
    return [
      {menu: "Emojis", display: '👍', dispKey: "Like", "label": "LIKE"},
      {menu: "Emojis", display: '💰', dispKey: "Money", "label": "MONEY"},
      {menu: "Emojis", display: '😳', dispKey: "Posi1", "label": "EXCITE"},
      {menu: "Emojis", display: '💓', dispKey: "Posi2", "label": "HAPPY"},
      {menu: "Emojis", display: '🥳', dispKey: "Posi3", "label": "JOY"},
      {menu: "Emojis", display: '😌', dispKey: "Posi4", "label": "RELAX"},

      {menu: "Emojis", display: '😅', dispKey: "Nega4", "label": "SLACK"},
      {menu: "Emojis", display: '😭', dispKey: "Nega3", "label": "MELANCHOLY"},
      {menu: "Emojis", display: '🤮', dispKey: "Nega2", "label": "DISSAT"},
      {menu: "Emojis", display: '😡', dispKey: "Nega1", "label": "ANGRY&FEAR"},
    ];
  }

  static get RussellModel(){
    return {
      1: { PosiNega: 1, tensionType: 1, tensionLv: 1, 'has': [1001, 1002 ] }
    }
  }

  static get Emotions(){
    return {

      // Flat like
      1001: 'like',
      1002: 'interest',
      1003: 'discovery',
      1004: 'sunny',
      1005: 'peace',
      1006: 'cheer',

      3000: 'love',

      2002: 'unlike',

      // Positive(high)
      10001: 'surprise',
      10002: 'excite',
      10003: 'happy',
      10004: 'joy',

      // Positive(middle)
      20001: 'glad',
      20002: 'satisfaction',

      // Positive(low)
      30001: 'comfort',
      30002: 'relax',
      30003: 'tired',

      // Negatie(low)
      50001: 'sleepy',
      
      60001: 'slack',
      60002: 'boring',

      // Negatie(middle)
      70001: 'melancholy',
      70002: 'sad',
      70003: 'unpleasant',
      70004: 'frustrated',

      // Negatie(high)
      80001: 'dissatisfied',
      80002: 'anger',
      80003: 'worry',
      80004: 'fear',
    }
  }

  static get EmotionBalance(){
    return {

      // Flat like
      '👍': [{ 1001: 1 }],
      '😉': [{ 1001: 1 }],
      '✌️': [{ 1001: 1 }],
      '👀': [{ 1002: 1 }],
      '💡': [{ 1003: 1 }],
      '💪': [{ 1006: 1 }],

      // Suprise(Posi1)
      '😳': [{ 10001: 1 }],
      '😵': [{ 10001: 1 }],

      // Excite(Posi1)
      '🤣': [{ 10002: 1 }],
      '😆': [{ 10002: 1 }],
      '🤩': [{ 10002: 1 }],

      // Happy(Posi2)
      '💓': [{ 10003: 1 }],
      '🥰': [{ 10003: 1 }],
      '😍': [{ 10003: 1 }],
      '😻': [{ 10003: 1 }],

      // Joy(Posi2)
      '😄': [{ 10004: 1 }],
      '✨': [{ 10004: 1 }],
      '😁': [{ 10004: 1 }],
      '🍺': [{ 10004: 1 }],
      '😊': [{ 10004: 1 }],
      '😘': [{ 10004: 1 }],
      '🌟': [{ 10004: 1 }],

      // Glad(Posi3)
      '🥳': [{ 20001: 1 }],
      '😃': [{ 20002: 1 }],

      // Satisfaction(Posi3)
      '😋': [{ 20003: 1 }],
      '🎂': [{ 20003: 1 }],
      '🍰': [{ 20003: 1 }],
      '🧁': [{ 20003: 1 }],

      // Comfort(Posi4)
      '😌': [{ 30001: 1 }],
      '🤤': [{ 30001: 1 }],

      // Relax(Posi4)
      '🙂': [{ 30002: 1 }],

      // Tired(Posi4)
      '😐': [{ 30003: 1 }],
      '😮': [{ 30003: 1 }],
      '😯': [{ 30003: 1 }],

      // Slack(Nega4)
      '😅': [{ 60001: 1 }],
      '💦': [{ 60001: 1 }],
      '😲': [{ 60001: 1 }],
      '🙄': [{ 60001: 1 }],

      // Boring(Nega4)
      '😒': [{ 60002: 1 }],
      '😑': [{ 60002: 1 }],
      '😕': [{ 60002: 1 }],

      // Melancholy(Nega4)
      '😩': [{ 70001: 1 }],
      '😞': [{ 70001: 1 }],
      '😔': [{ 70001: 1 }],
      '😟': [{ 70001: 1 }],
      '🤢': [{ 70001: 1 }],

      // Sad(Nega3)
      '😭': [{ 70002: 1 }],
      '😥': [{ 70002: 1 }],

      // Unpleasant(Nega3)
      '🤮': [{ 70003: 1 }],
      '🤕': [{ 70003: 1 }],
      '🤒': [{ 70003: 1 }],
      '😷': [{ 70003: 1 }],
      '🤧': [{ 70003: 1 }],

      // frustrated(Nega3)
      '🧐': [{ 70004: 1 }],
      '🤔': [{ 70004: 1 }],
      '🤨': [{ 70004: 1 }],

      // dissatisfied(Nega2)
      '😠': [{ 80001: 1 }],
      '😾': [{ 80001: 1 }],
 
      // Anger(Nega2)
      '😡': [{ 80002: 1 }],
      '🤬': [{ 80002: 1 }],
      '💔': [{ 80002: 1 }],
      '💢': [{ 80002: 1 }],
      '😤': [{ 80002: 1 }],
      '👿': [{ 80002: 1 }],

      // Worry(Nega1)
      '😣': [{ 80003: 1 }],
      '🥺': [{ 80003: 1 }],
      '😫': [{ 80003: 1 }],
      '😓': [{ 80003: 1 }],
      '😖': [{ 80003: 1 }],
      '😨': [{ 80003: 1 }],
      '😰': [{ 80003: 1 }],
      '😿': [{ 80003: 1 }],

      // Fear(Nega1)
      '🥶': [{ 80004: 1 }],
      '🥵': [{ 80004: 1 }],
      '😱': [{ 80004: 1 }],
      '🙀': [{ 80004: 1 }],
      '💀': [{ 80004: 1 }],
    }
  }

  static get Emojis(){
    return {
      Like: ['👍','😉','💡','👀','✌️', '💪', '☀️'],
      Money: [],
      Posi1: ['😳', '😵', '🤣','😆','🤩'],
      Posi2: ['💓','🥰','😍','😻','😄','✨','😁','🍺','😊','😘','🌟'],
      Posi3: ['🥳','😃','😋','🎂','🍰','🧁'],
      Posi4: [ '😌','🤤','🙂','😐','😮','😯'],

      Nega4: ['😅','💦','😲','🙄','😒','😑','😕','😩','😞','😔','😟','🤢'],
      Nega3: ['😭', '😥', '🧐','🤔','🤨'],
      Nega2: ['🤮','🤕','🤒','😷','🤧','😠','😾'],
      Nega1: [ '😡', '🤬','💔','💢','😤','👿','😣','🥺','😫','😓','😖','😨','😰','😿','🥶','🥵','😱','🙀','💀']
    }
  }

  constructor(props) {
    super(props);
    let style = {Cover: [], Emojis: {}};
    PostsSupporter.Cover.forEach( ( obj ) => {
      style.Cover[ obj.dispKey ] = {...props.state.style.postsSupporter.emoji };
    });
    Object.keys( PostsSupporter.Emojis ).forEach( ( dispKey ) => {
      PostsSupporter.Emojis[ dispKey ].forEach( ( display, i ) => {
        if( !style.Emojis[ dispKey ] ) style.Emojis[ dispKey ] = [];
        style.Emojis[ dispKey ][ i ] = {...props.state.style.postsSupporter.emoji };
      });
    });

    this.state = {
      style,
      menu: "Cover",
      dispKey: "",
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
          this.setState( {  menu: toMenu, dispKey: toLabel } );
        }
      }
    default:
      return {
        onMouseOver: ( e ) => {
          this.setState( {
            style: {...this.state.style,
              [ menu ]: {...this.state.style[ menu ],
                [ toLabel ]: { ...this.state.style[ menu ][ toLabel ],
                  [ i - 1 ]: {...this.state.style[ menu ][ toLabel ][ i - 1 ],
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
          this.setState( {  menu: "Cover", dispKey: "" } );
        }
      }
    }
  }

  getDisplay( menu, dispKey ){
    const { state } = this.props;
    const { style: propsStyle } = state;
    const IconOpenEmoji = Icon.getOpenEmoji( {}, state );
    const IconCloseEmoji = Icon.getCloseEmoji();
    const { style } = this.state;
    let display = [];

    switch( menu ){
    case "Cover":
        display = PostsSupporter.Cover.map( (obj, index) => {
          return ( 
            <li
              key={ menu + "_" + index }
              style={ style[ menu ][ obj.dispKey ] }
              {...this.getEvents( menu, obj.menu, obj.dispKey ) }
            >
              <div>{obj.display}</div>
              <div style={ propsStyle.postsSupporter.emojiLabel }>
                { menu === "Cover" && IconOpenEmoji }
                { obj.label }
              </div>
            </li>
          );
        });
        break;
    default:
      display = PostsSupporter[ menu ][ dispKey ].map( (emoji, i) => {
        const index = i ;
        return ( 
          <li
            key={ menu + dispKey + "_" + index }
            style={ style[ menu ][ dispKey ][ index ] }
            {...this.getEvents( menu, menu, dispKey, index + 1) }
          >
            {emoji}
          </li>
        );
      });

      display.unshift(
        <li
          key={"backCover" }
          style={ style[ "Cover" ][ dispKey ] }
          {...this.getEvents( menu, menu, dispKey, 0 ) }
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
    const { menu, dispKey } = this.state;
    const lis = this.getDisplay( menu, dispKey );
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
