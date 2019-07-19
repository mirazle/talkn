import React, { Component } from 'react'
import Sequence from 'common/Sequence';
import util from 'common/util';
import conf from 'common/conf';
import App from 'common/schemas/state/App';
import PostStyle from 'client/style/Post';
import Marquee from 'client/container/util/Marquee';

export default class Post extends Component {

  constructor(props) {
    const {style, app} = props;
    super(props);
    this.state = {
      active: true,
      style, 
      timeId: this.getTimeId(),
      isBubblePost: app.isBubblePost
    }
    this.mountTimeago = this.mountTimeago.bind(this);
    this.renderUpper = this.renderUpper.bind(this);
    this.renderTime = this.renderTime.bind(this);
    this.getDecolationProps = this.getDecolationProps.bind(this);
    this.handleOnClickPost = this.handleOnClickPost.bind(this);
  }
  
  componentWillReceiveProps(props){
    const { actionLog, dispFlg } = props;
    const { style, isBubblePost} = this.state;
    if( !dispFlg ){
      this.setState({active: false});
    }else{
      const beforeIsBubblePost = isBubblePost;
      const afterIsBubblePost = props.app.isBubblePost;
      if( beforeIsBubblePost !== afterIsBubblePost ){
        if( !beforeIsBubblePost && afterIsBubblePost ){
          this.mountTimeago();
        }
  
        this.setState({
          style: {...style,
            self: {...props.style.self},
            upper: {...style.upper,
              display: props.style.upper.display
            },
            bottomPost: {...props.style.bottomPost}
          },
          isBubblePost: afterIsBubblePost
        });
      }
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
    this.mountTimeago();
  }

  componentWillUnmount(){
    const {_id} = this.props;
    this.setState({active: false});
  }


  shouldComponentUpdate(props){
    const {app, actionLog } = props;
    if( app.isMediaConnection ){
      return true;
/*
      return [
        "NEXT_POSTS_TIMELINE",
        "CLEAR_POSTS_TIMELINE",
        "PREV_POSTS_TIMELINE"
      ].includes( actionLog[0] );
*/
    }else{
      return true;
    }
  }

  mountTimeago(){
    const { app, timeago } = this.props;
    if( !app.isMediaConnection ){
      if( this.refs[ this.state.timeId ] ){
        timeago.render( this.refs[ this.state.timeId ] );
      }
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
      return(
        <time
          style={style.upperTimeago}
          ref={this.state.timeId}
          className={'timeAgo'} 
          dateTime={ createTime }
        >
          {createTime}
        </time>
      );
    }
  }

  renderUpper(){
    const { childLayerCnt, thread } = this.props;
    const { style } = this.state;
    const childLabel = childLayerCnt > 0 ? `${childLayerCnt}child` : '' ;
    return (
      <div style={ style.upper }>
        <div style={style.upperChild}>{childLabel}</div>
        <div style={style.upperTitle}>
          <Marquee
            text={thread.title}
            loop={true}
            hoverToStop={false}
            trailing={0}
            leading={0}
          />
        </div>
        { this.renderTime() }
      </div>
    );
  }

  renderPost( post, app ){
    if( !app.isBubblePost ){
      if( post.indexOf( '<div class="talknStamps"' ) === 0 ){
        if( post.indexOf( `scale(${PostStyle.bubbleStampScale})` ) ){
          return post.replace( `scale(${PostStyle.bubbleStampScale})`, `scale(${PostStyle.stampScale})` )
                    .replace( `height: 100%`, `height:60px` )
                    .replace( `height:100%`, `height:60px` )
                    .replace( `justify-content: center`, "justify-content: flex-start" )
                    .replace( `justify-content:center`, "justify-content: flex-start" );
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
      _id,
     } = this.props;
    const { active, style } = this.state;
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

    if( active ){
      return (
        <li data-component-name={"Post"} id={_id} style={style.self} {...this.getDecolationProps()}>
  
          {this.renderUpper()}
  
          <div onClick={this.handleOnClickPost} style={style.bottom}>
            <span style={{...style.bottomIcon, backgroundImage: `url( ${dispFavicon} )`}} />
            <span style={style.bottomPost} dangerouslySetInnerHTML={{__html: this.renderPost( post, app ) }} />
          </div>
        </li>
      );
    }else{
      return null;
    }
 	}
}
