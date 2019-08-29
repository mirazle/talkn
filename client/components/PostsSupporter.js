import React, { Component } from "react"
import Emotions from 'common/emotions/index';
import Icon from './Icon';
import PostStyle from 'client/style/Post';

export default class PostsSupporter extends Component {
  static get COVER(){return "Cover"};
  constructor(props) {
    super(props);
    let style = {[ PostsSupporter.COVER ]: {}, Emojis: {}};

    Object.keys( Emotions.covers ).forEach( ( menu ) => {
      const coverStampId = Emotions.covers[ menu ][ 0 ] ;
      style[ PostsSupporter.COVER ][ coverStampId ] = {...props.state.style.postsSupporter.emoji };
      style.Emojis[ menu ] = {};
      style.Emojis[ menu ][ 0 ] = {...props.state.style.postsSupporter.emoji };
      Emotions.covers[ menu ].forEach( ( stampId ) => {
        style.Emojis[ menu ][ stampId ] = {...props.state.style.postsSupporter.emoji };
      });
    });

    this.state = {
      style,
      menu: PostsSupporter.COVER
    };
    this.getDisplay = this.getDisplay.bind( this );
  }

  getEvents(menu, toMenu, stampId ){

    switch( menu ){
    case PostsSupporter.COVER:
      return {
        onMouseOver: ( e ) => {
          this.setState( {
            style: {...this.state.style,
              [ PostsSupporter.COVER ]: {...this.state.style[ PostsSupporter.COVER ],
                [ stampId ]: { ...this.state.style[ PostsSupporter.COVER ][ stampId ],
                  transform: "scale(1.1)"
                }
              }
            }
          });
        },
        onMouseOut: ( e ) => {
          this.setState( {
            style: {...this.state.style,
              [ PostsSupporter.COVER ]: {...this.state.style[ PostsSupporter.COVER ],
                [ stampId ]: { ...this.state.style[ PostsSupporter.COVER ][ stampId ],
                  transform: "scale(1.0)"
                }
              }
            }
          });
        },
        onClick: ( e ) => {
          this.setState( {  menu: toMenu } );
        }
      }
    default:
      return {
        onMouseOver: ( e ) => {
          this.setState( {
            style: {...this.state.style,
              Emojis: {...this.state.style.Emojis,
                [ menu ]: { ...this.state.style.Emojis[ menu ],
                  [ stampId ]: {...this.state.style.Emojis[ menu ][ stampId ],
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
                [ menu ]: { ...this.state.style.Emojis[ menu ],
                  [ stampId ]: {...this.state.style.Emojis[ menu ][ stampId ],
                    transform: "scale(1.0)"
                  }
                }
              }
            }
          });
        },
        onClick: ( e ) => {
          if( stampId !== 0 ){
            const post = Emotions.map[ stampId ];
            talknAPI.delegatePost( {
              inputPost: `<div class="talknStamps" style="${PostStyle.stampStyle}">${post}</div>`,
              inputStampId: stampId,
              inputCurrentTime: 0
            } );
          }
          this.setState( {  menu: toMenu } );
        }
      }
    }
  }

  getDisplay( menu ){
    const { state } = this.props;
    const { style: propsStyle } = state;
    const IconOpenEmoji = Icon.getOpenEmoji( {}, state );
    const IconCloseEmoji = Icon.getCloseEmoji();
    const { style } = this.state;
    let display = [];
    switch( menu ){
    case PostsSupporter.COVER:
        display = Object.keys( Emotions.covers ).map( ( label ) => {
          const coverStampId = Emotions.covers[ label ][ 0 ];
          return ( 
            <li
              key={ menu + "_" + coverStampId }
              style={ style[ PostsSupporter.COVER ][ coverStampId ] }
              {...this.getEvents( menu, label, coverStampId ) }
            >
              <div>{ Emotions.map[ coverStampId ] }</div>
              <div style={ propsStyle.postsSupporter.emojiLabel }>
                { menu === PostsSupporter.COVER && IconOpenEmoji }
                { label }
              </div>
            </li>
          );
        });
        break;
    default:
      display = Emotions.covers[ menu ].map( ( stampId ) => {
        return ( 
          <li
            key={ menu + "_" + stampId }
            style={ style.Emojis[ menu ][ stampId ] }
            {...this.getEvents( menu, PostsSupporter.COVER, stampId ) }
          >
            { Emotions.map[ stampId ] }
          </li>
        );
      });

      display.unshift(
        <li
          key={"backCover"}
          style={ style[ "Emojis" ][ menu ][ 0 ] }
          {...this.getEvents( menu, PostsSupporter.COVER, 0 ) }
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
    const { menu } = this.state;
    const lis = this.getDisplay( menu );
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
