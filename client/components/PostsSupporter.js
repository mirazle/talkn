import React, { Component } from "react"
import Emotions from 'common/Emotions';
import Icon from './Icon';
import PostStyle from 'client/style/Post';

export default class PostsSupporter extends Component {

  constructor(props) {
    super(props);
    let style = {Cover: [], Emojis: {}};
    Object.keys( Emotions.covers ).forEach( ( stampId ) => {
      style.Cover[ Emotions.covers[ stampId ].dispKey ] = {...props.state.style.postsSupporter.emoji };
    });
    Object.keys( Emotions.emojis ).forEach( ( dispKey ) => {
      Emotions.emojis[ dispKey ].forEach( ( stampId, i ) => {
        if( !style.Emojis[ dispKey ] ) style.Emojis[ dispKey ] = [];
        style.Emojis[ dispKey ][ stampId ] = {...props.state.style.postsSupporter.emoji };
      });
    });

    this.state = {
      style,
      menu: "Cover",
      dispKey: "",
    };
    this.getDisplay = this.getDisplay.bind( this );
  }

  getEvents(menu, toMenu, dispKey, stampId ){

    switch( menu ){
    case "Cover":
      return {
        onMouseOver: ( e ) => {
          this.setState( {
            style: {...this.state.style,
              [ menu ]: {...this.state.style[ menu ],
                [ dispKey ]: { ...this.state.style[ menu ][ dispKey ],
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
                [ dispKey ]: { ...this.state.style[ menu ][ dispKey ],
                  transform: "scale(1.0)"
                }
              }
            }
          });
        },
        onClick: ( e ) => {
          this.setState( {  menu: toMenu, dispKey: toMenu } );
        }
      }
    default:
      return {
        onMouseOver: ( e ) => {
          this.setState( {
            style: {...this.state.style,
              Emojis: {...this.state.style.Emojis,
                [ dispKey ]: { ...this.state.style.Emojis[ dispKey ],
                  [ stampId ]: {...this.state.style.Emojis[ dispKey ][ stampId ],
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
              Emojis: {...this.state.style.Emojis,
                [ dispKey ]: { ...this.state.style.Emojis[ dispKey ],
                  [ stampId ]: {...this.state.style.Emojis[ dispKey ][ stampId ],
                    transform: "scale(1.0)"
                  }
                }
              }
            }
          });
        },
        onClick: ( e ) => {
          if( stampId !== 0 ){
            const post = Emotions.map[ stampId ].emoji;
            talknAPI.delegatePost( {
              inputPost: `<div class="talknStamps" style="${PostStyle.stampStyle}">${post}</div>`,
              inputStampId: stampId,
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
        display = Object.keys( Emotions.covers ).map( (stampId, index) => {
          const obj = Emotions.covers[ stampId ];
          return ( 
            <li
              key={ menu + "_" + index }
              style={ style.Cover[ obj.dispKey ] }
              {...this.getEvents( menu, obj.dispKey, stampId ) }
            >
              <div>{ Emotions.map[ stampId ].emoji }</div>
              <div style={ propsStyle.postsSupporter.emojiLabel }>
                { menu === "Cover" && IconOpenEmoji }
                { obj.dispKey }
              </div>
            </li>
          );
        });
        break;
    default:
      display = Emotions.emojis[ dispKey ].map( ( stampId, i) => {
        return ( 
          <li
            key={ menu + dispKey + "_" + stampId }
            style={ style.Emojis[ dispKey ][ stampId ] }
            {...this.getEvents( menu, menu, dispKey, stampId ) }
          >
            { Emotions.map[ stampId ].emoji }
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
