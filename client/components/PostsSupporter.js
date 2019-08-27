import React, { Component } from "react"
import Icon from './Icon';
import PostStyle from 'client/style/Post';

export default class PostsSupporter extends Component {

  static get Cover(){
    return [
      {menu: "Emojis", emojiId: 1, dispKey: "Like", "label": "LIKE"},
      {menu: "Emojis", emojiId: 100, dispKey: "Money", "label": "MONEY"},
      {menu: "Emojis", emojiId: 1001, dispKey: "Posi1", "label": "EXCITE"},
      {menu: "Emojis", emojiId: 1201, dispKey: "Posi2", "label": "HAPPY"},
      {menu: "Emojis", emojiId: 1401, dispKey: "Posi3", "label": "JOY"},
      {menu: "Emojis", emojiId: 1601, dispKey: "Posi4", "label": "RELAX"},

      {menu: "Emojis", emojiId: 2001, dispKey: "Nega4", "label": "SLACK"},
      {menu: "Emojis", emojiId: 2401, dispKey: "Nega3", "label": "MELANCHOLY"},
      {menu: "Emojis", emojiId: 2601, dispKey: "Nega2", "label": "DISSAT"},
      {menu: "Emojis", emojiId: 2801, dispKey: "Nega1", "label": "ANGRY&FEAR"},
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
      1007: 'money',

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

  static get EmotionMap(){
    return {

      // Flat like
      1: { emoji: '👍', balance: [{ 1001: 1 }]},
      2: { emoji: '😉', balance: [{ 1001: 1 }]},
      3: { emoji: '💡', balance: [{ 1003: 1 }]},
      4: { emoji: '✌️', balance: [{ 1001: 1 }]},
      5: { emoji: '👀', balance: [{ 1002: 1 }]},
      6: { emoji: '💪', balance: [{ 1006: 1 }]},

      100: { emoji: '💵', balance: [{ 1007: 1 }]},

      // Suprise(Posi1)
      1001: { emoji: '😳', balance: [{ 10001: 1 }]},
      1002: { emoji: '😵', balance: [{ 10001: 1 }]},

      // Excite(Posi1)
      1101: { emoji: '🤣', balance: [{ 10002: 1 }]},
      1102: { emoji: '😆', balance: [{ 10002: 1 }]},
      1103: { emoji: '🤩', balance: [{ 10002: 1 }]},

      // Happy(Posi2)
      1201: { emoji: '💓', balance: [{ 10003: 1 }]},
      1202: { emoji: '🥰', balance: [{ 10003: 1 }]},
      1203: { emoji: '😍', balance: [{ 10003: 1 }]},
      1204: { emoji: '😻', balance: [{ 10003: 1 }]},

      // Joy(Posi2)
      1301: { emoji: '😄', balance: [{ 10004: 1 }]},
      1302: { emoji: '✨', balance: [{ 10004: 1 }]},
      1303: { emoji: '😁', balance: [{ 10004: 1 }]},
      1304: { emoji: '🍺', balance: [{ 10004: 1 }]},
      1305: { emoji: '😊', balance: [{ 10004: 1 }]},
      1306: { emoji: '😘', balance: [{ 10004: 1 }]},
      1307: { emoji: '🌟', balance: [{ 10004: 1 }]},

      // Glad(Posi3)
      1401: { emoji: '🥳', balance: [{ 20001: 1 }]},
      1402: { emoji: '😃', balance: [{ 20002: 1 }]},

      // Satisfaction(Posi3)
      1501: { emoji: '😋', balance: [{ 20003: 1 }]},
      1502: { emoji: '🎂', balance: [{ 20003: 1 }]},
      1503: { emoji: '🍰', balance: [{ 20003: 1 }]},
      1504: { emoji: '🧁', balance: [{ 20003: 1 }]},

      // Comfort(Posi4)
      1601: { emoji: '😌', balance: [{ 30001: 1 }]},
      1602: { emoji: '🤤', balance: [{ 30001: 1 }]},

      // Relax(Posi4)
      1701: { emoji: '🙂', balance: [{ 30002: 1 }]},

      // Tired(Posi4)
      1801: { emoji: '😐', balance: [{ 30003: 1 }]},
      1802: { emoji: '😮', balance: [{ 30003: 1 }]},
      1803: { emoji: '😯', balance: [{ 30003: 1 }]},

      // Slack(Nega4)
      2001: { emoji: '😅', balance: [{ 60001: 1 }]},
      2002: { emoji: '💦', balance: [{ 60001: 1 }]},
      2003: { emoji: '😲', balance: [{ 60001: 1 }]},
      2004: { emoji: '🙄', balance: [{ 60001: 1 }]},

      // Boring(Nega4)
      2101: { emoji: '😒', balance: [{ 60002: 1 }]},
      2102: { emoji: '😑', balance: [{ 60002: 1 }]},
      2103: { emoji: '😕', balance: [{ 60002: 1 }]},

      // Melancholy(Nega4)
      2201: { emoji: '😩', balance: [{ 70001: 1 }]},
      2202: { emoji: '😞', balance: [{ 70001: 1 }]},
      2203: { emoji: '😔', balance: [{ 70001: 1 }]},
      2204: { emoji: '😟', balance: [{ 70001: 1 }]},
      2205: { emoji: '🤢', balance: [{ 70001: 1 }]},

      // Sad(Nega3)
      2301: { emoji: '😭', balance: [{ 70002: 1 }]},
      2302: { emoji: '😥', balance: [{ 70002: 1 }]},

      // Unpleasant(Nega3)
      2401: { emoji: '🤮', balance: [{ 70003: 1 }]},
      2402: { emoji: '🤕', balance: [{ 70003: 1 }]},
      2403: { emoji: '🤒', balance: [{ 70003: 1 }]},
      2404: { emoji: '😷', balance: [{ 70003: 1 }]},
      2405: { emoji: '🤧', balance: [{ 70003: 1 }]},

      // frustrated(Nega3)
      2501: { emoji: '🧐', balance: [{ 70004: 1 }]},
      2502: { emoji: '🤔', balance: [{ 70004: 1 }]},
      2503: { emoji: '🤨', balance: [{ 70004: 1 }]},

      // dissatisfied(Nega2)
      2601: { emoji: '😠', balance: [{ 80001: 1 }]},
      2602: { emoji: '😾', balance: [{ 80001: 1 }]},
 
      // Anger(Nega2)
      2701: { emoji: '😡', balance: [{ 80002: 1 }]},
      2702: { emoji: '🤬', balance: [{ 80002: 1 }]},
      2703: { emoji: '💔', balance: [{ 80002: 1 }]},
      2704: { emoji: '💢', balance: [{ 80002: 1 }]},
      2705: { emoji: '😤', balance: [{ 80002: 1 }]},
      2706: { emoji: '👿', balance: [{ 80002: 1 }]},

      // Worry(Nega1)
      2801: { emoji: '😣', balance: [{ 80003: 1 }]},
      2802: { emoji: '🥺', balance: [{ 80003: 1 }]},
      2803: { emoji: '😫', balance: [{ 80003: 1 }]},
      2804: { emoji: '😓', balance: [{ 80003: 1 }]},
      2805: { emoji: '😖', balance: [{ 80003: 1 }]},
      2806: { emoji: '😨', balance: [{ 80003: 1 }]},
      2807: { emoji: '😰', balance: [{ 80003: 1 }]},
      2808: { emoji: '😿', balance: [{ 80003: 1 }]},

      // Fear(Nega1)
      2901: { emoji: '🥶', balance: [{ 80004: 1 }]},
      2902: { emoji: '🥵', balance: [{ 80004: 1 }]},
      2903: { emoji: '😱', balance: [{ 80004: 1 }]},
      2904: { emoji: '🙀', balance: [{ 80004: 1 }]},
      2905: { emoji: '💀', balance: [{ 80004: 1 }]}
    }
  }

  static get Emojis(){
    return {
      Like: [ 1, 2, 3, 4, 5, 6 ],
      Money: [ 100 ],
      Posi1: [ 1001, 1002, 1101, 1102, 1103 ],
      Posi2: [ 1201, 1202, 1203, 1204, 1301, 1302, 1303, 1304, 1305, 1306, 1307 ],
      Posi3: [ 1401, 1402, 1501, 1502, 1503, 1504 ],
      Posi4: [ 1601, 1602, 1701, 1801, 1802, 1803 ],

      Nega4: [ 2001, 2002, 2003, 2004, 2101, 2102, 2103, 2201, 2202, 2203, 2204, 2205, 2301, 2302 ],
      Nega3: [ 2401, 2402, 2403, 2404, 2405, 2501, 2502, 2503 ],
      Nega2: [ 2601, 2602, 2701, 2702, 2703, 2704, 2705, 2706 ],
      Nega1: [ 2801, 2802, 2803, 2804, 2805, 2806, 2807, 2808, 2901, 2902, 2903, 2904, 2905 ]
    }
  }

  constructor(props) {
    super(props);
    let style = {Cover: [], Emojis: {}};
    PostsSupporter.Cover.forEach( ( obj ) => {
      style.Cover[ obj.dispKey ] = {...props.state.style.postsSupporter.emoji };
    });
    Object.keys( PostsSupporter.Emojis ).forEach( ( dispKey ) => {
      PostsSupporter.Emojis[ dispKey ].forEach( ( emojiId, i ) => {
        if( !style.Emojis[ dispKey ] ) style.Emojis[ dispKey ] = [];
        style.Emojis[ dispKey ][ emojiId ] = {...props.state.style.postsSupporter.emoji };
      });
    });

    this.state = {
      style,
      menu: "Cover",
      dispKey: "",
    };
    this.getDisplay = this.getDisplay.bind( this );
  }

  getEvents(menu, toMenu, toLabel, emojiId ){

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
                  [ emojiId ]: {...this.state.style[ menu ][ toLabel ][ emojiId ],
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
                  [ emojiId ]: {...this.state.style[ menu ][ toLabel ][ emojiId ],
                    transform: "scale(1.0)"
                  }
                }
              }
            }
          });
        },
        onClick: ( e ) => {

          if( emojiId !== 0 ){
            const post = PostsSupporter.EmotionMap[ emojiId ].emoji;
            talknAPI.delegatePost( {
              inputPost: `<div class="talknStamps" data-component-name="${toLabel}" style="${PostStyle.stampStyle}">${post}</div>`,
              inputStampId: true,
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
              <div>{ PostsSupporter.EmotionMap[ obj.emojiId ].emoji }</div>
              <div style={ propsStyle.postsSupporter.emojiLabel }>
                { menu === "Cover" && IconOpenEmoji }
                { obj.label }
              </div>
            </li>
          );
        });
        break;
    default:
      display = PostsSupporter[ menu ][ dispKey ].map( ( emojiId, i) => {
        const index = i ;
        return ( 
          <li
            key={ menu + dispKey + "_" + emojiId }
            style={ style[ menu ][ dispKey ][ emojiId ] }
            {...this.getEvents( menu, menu, dispKey, emojiId ) }
          >
            { PostsSupporter.EmotionMap[ emojiId ].emoji }
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
