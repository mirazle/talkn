import React, { Component } from "react"
import Icon from './Icon';
import PostStyle from 'client/style/Post';

export default class PostsSupporter extends Component {

  static get Cover(){
    return [
      {menu: "Emojis", display: '😀', label: "Love"},
      {menu: "Emojis", display: '🤔', label: "Smile"},
      {menu: "Emojis", display: '🙁', label: "Delicious"},
      {menu: "Emojis", display: '😷', label: "Neutral"},
      {menu: "Emojis", display: '😇', label: "Angry"},
      {menu: "Emojis", display: '😺', label: "Role"},
      {menu: "Emojis", display: '🙈', label: "Monkey"},
      {menu: "Emojis", display: '😈', label: "Creature"}
    ];
  }

  static get Emojis(){
    return {
      Love: ['😍','😘','🥰','💗', '💓', '💕',	'💖',	'💞',	'💘',	'💌',	'💋'],
      Smile: [ '😀','😁','😃','😄','😉','😊','😎','😗','😙','😚','☺','🙂','🤗','🤩'],
      FlatSmile: [],
      Laugh: ['😂','🤣','😆'], 
      Delicious: ['😋','🤤', '🍴', '🍕','🍔','🍟','🍗','🍖','🍝','🍛','🍤','🍱','🍣','🍥','🍙','🍘','🍚','🍜','🍲','🍢','🍡','🍳','🍞','🍩','🍮','🍦','🍨','🍧','🎂','🍰','🍪','🍫','🍬','🍭','🍯','🍎','🍏','🍊','🍋','🍒','🍇','🍉','🍓','🍑','🍈','🍌','🍐','🍍','🍠','🍆','🍅','🌽'	],
      Like: ['👍', '💪'],
      Doubt:['🤔','🤨','🙄'],
      Neutral: ['😐','😑','😶','😏','😣','😥','😮','🤐','😯','😫','😌','😛','😜','😝','😒','😔','😕','🙃','🤑','😲'],
      Subtle: ['😅','😓', '💧'],
      Negative: ['🙁','☹','😖','😞','😟','😢','😦','😧','😨','😩','🤯','😬','😰','😱','🥵','🥶','🤪','😵'],
      Sad: [],
      Cry: ['😭'],
      Surprise: ['😳'],
      Sleepy: ['😪' ,'😴'],
      Pain:[],
      Disappointed: [],
      Angry:['😤','😾','😡','😠','🤬'],
      Sick:['😷','🤒','🤕','🤢','🤮','🤧'],
      Cat: ['😺','😸','😹','😻','😼','😽','🙀','😿',],
      Role: ['😇','🤠','🥳','🥴','🥺','🤥','🤫','🤭','🧐','🤓'],
      Monkey: ['🙈','🙉','🙊'],
      Creature: ['😈','👿','🤡','👹','👺','💀','☠','👻','👽','👾','🤖','💩']
    }
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
            const post = PostsSupporter[ menu ][ toLabel ][ i - 1 ];
            talknAPI.delegatePost( {
              inputPost: `<div class="talknStamps" style="${PostStyle.stampStyle}">${post}</div>`,
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
        const index = i + 1;
        return ( 
          <li
            key={ menu + label + "_" + index }
            style={ style[ menu ][ label ][ index ] }
            {...this.getEvents( menu, menu, label, index ) }
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
