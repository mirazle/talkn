import React, { Component } from 'react'
import Sequence from 'common/Sequence';
import util from 'common/util';
import conf from 'common/conf';
import App from 'common/schemas/state/App';
import PostStyle from 'client/style/Post';

export default class Post extends Component {

  constructor(props) {
    const {style} = props;
    super(props);
    this.state = {style}
    this.renderTime = this.renderTime.bind(this);
    this.getDecolationProps = this.getDecolationProps.bind(this);
    this.handleOnClickPost = this.handleOnClickPost.bind(this);
  }

  componentWillReceiveProps(props){
    const {style} = this.state;
    const {transform: beforeTransform} = style.self;
    const {transform: afterTransform} = props.style.self;    
    if(beforeTransform !== afterTransform){
      this.setState({
        style: {...style,
          self: {...style.self,
            transform: afterTransform
          }
        }
      });
    }

    const {color: beforeColor} = style.bottomPost;
    const {color: afterColor} = props.style.bottomPost;
    if(beforeColor !== afterColor){
      this.setState({
        style: {...style,
          self: {...props.style.self},
          bottomPost: {...props.style.bottomPost}
        }
      });
    }
  }

  getDecolationProps(){
    const{ app } = this.props;
    return {
      onMouseOver: () => {
        if( app.isBubblePost ){
          this.setState(
            { style:
              {...this.state.style,
                self: { ...this.state.style.self,
                  transition: '200ms',
                  transform: 'scale( 1.05 )',
                  cursor: 'pointer',
                }
              }
            }
          );
        }
      },
      onMouseLeave: () => {
        if( app.isBubblePost ){
          this.setState( {style:
            {...this.state.style,
              self: { ...this.state.style.self,
                transition: '600ms',
                transform: 'scale( 1 )',
                cursor: 'default',
              }
            }
          });
        }
      },
      onMouseDown: () => {
        if( app.isBubblePost ){
          this.setState( {style:
            {...this.state.style,
              self: { ...this.state.style.self,
                transform: 'scale( 1 )',
                cursor: 'pointer',
              }
            }
          });
        }
      },
      onMouseUp: () => {
        if( app.isBubblePost ){
          this.setState( {style:
            {...this.state.style,
              self: { ...this.state.style.self,
                transform: 'scale( 1.05 )',
                cursor: 'pointer',
              }
            }
          });
        }
      }
    }
  }

  getTimeId(){
    return `timeAgo:${this.props._id}`;
  }

  componentDidMount(){
    const { timeago, app } = this.props;
    const timeId = this.getTimeId();
    if( !app.isMediaConnection )
      if( timeago ){
        timeago.render( this.refs[ timeId ] );
      }
  }  

  handleOnClickPost(){
    const { threads } = this.props;
    let { app, connection } = this.props;
    if( threads[ connection ] ){
      app = App.getAppUpdatedOpenFlgs({app}, "post");
      talknAPI.onClickToggleDispDetail( {threadDetail: threads[ connection ], app} );
    }else{
      talknAPI.changeThreadDetail(connection);
    }
  }

  renderTime(){
    const { style } = this.state;
    const{
      app,
      createTime,
      currentTime
    } = this.props;

    if( app.isMediaConnection ){
      const dispCurrentTime = String( currentTime ).split( "." )[ 0 ];
      return( 
        <time style={style.upperTimeago}>{dispCurrentTime} Second.</time>
      );
    }else{
      const timeId = this.getTimeId();
      return( <time style={style.upperTimeago} ref={timeId} className={'timeAgo'} dateTime={ createTime }>{createTime}</time> );
    }
  }

  renderPost( post, app ){
    if( !app.isBubblePost ){
      if( post.indexOf( '<div class="talknStamps"' ) === 0 ){
        if( post.indexOf( `scale(${PostStyle.bubbleStampScale})` ) ){
          return post.replace( `scale(${PostStyle.bubbleStampScale})`, `scale(${PostStyle.stampScale})` )
                    .replace( `height: 100%`, `height:60px` )
                    .replace( `height:100%`, `height:60px` );
        }
      }
    }
    return post;
  }

 	render() {
		const{
      app,
      thread,
      post,
      favicon,
      childLayerCnt,
      _id,
     } = this.props;
    const childLabel = childLayerCnt > 0 ? `( ${childLayerCnt} child )` : '' ;
    const { style } = this.state;
    
    let dispFavicon = conf.assetsIconPath + util.getSaveFaviconName( favicon );

    if(
      dispFavicon.indexOf(Sequence.HTTPS_PROTOCOL) !== 0 && 
      dispFavicon.indexOf(Sequence.HTTP_PROTOCOL) !== 0
    ){
      if(thread.protocol === Sequence.TALKN_PROTOCOL){
        dispFavicon = `${Sequence.HTTPS_PROTOCOL}//${dispFavicon}`;
      }else{
        dispFavicon = `${thread.protocol}//${dispFavicon}`;
      }
    }

    return (
      <li data-component-name={"Post"} id={_id} style={style.self} {...this.getDecolationProps()}>
        <div style={style.upper}>
          <span style={style.upperSpace} />

          <span style={style.upperRight}>
            <div style={style.upperChild}>{childLabel}</div>
            { this.renderTime() }
          </span>
        </div>

        <div onClick={this.handleOnClickPost} style={style.bottom}>
          <span style={{...style.bottomIcon, backgroundImage: `url( ${dispFavicon} )`}} />
          <span style={style.bottomPost} dangerouslySetInnerHTML={{__html: this.renderPost( post, app ) }} />
        </div>
      </li>
    );
 	}
}
