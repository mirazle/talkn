import React, { Component } from 'react'
import Sequence from 'common/Sequence';
import util from 'common/util';
import conf from 'common/conf';
import define from 'common/define';

export default class Post extends Component {

  constructor(props) {
    const {style} = props;
    super(props);
    this.state = {style}
    this.getDecolationProps = this.getDecolationProps.bind(this);
    this.exeLocation = this.exeLocation.bind(this);
  }

  componentDidUpdate(props){
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
  }

  getDecolationProps(){
    const{ mode, onTransitionEnd } = this.props;
    if( mode === 'post'){
      return {
        onMouseOver: () => {
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
        },
        onMouseLeave: () => {
          this.setState( {style:
            {...this.state.style,
              self: { ...this.state.style.self,
                transition: '600ms',
                transform: 'scale( 1 )',
                cursor: 'default',
              }
            }
          });
        },
        onMouseDown: () => {
          this.setState( {style:
            {...this.state.style,
              self: { ...this.state.style.self,
                transform: 'scale( 1 )',
                cursor: 'pointer',
              }
            }
          });
        },
        onMouseUp: () => {
          this.setState( {style:
            {...this.state.style,
              self: { ...this.state.style.self,
                transform: 'scale( 1.05 )',
                cursor: 'pointer',
              }
            }
          });
        },
      }
    }else{
      return {};
    }
  }

  getTimeId(){
    return `timeAgo:${this.props._id}`;
  }

  componentDidMount(){
    const { timeago } = this.props;
    const timeId = this.getTimeId();
    if(timeago){
      timeago.render( this.refs[ timeId ] );
    }
  }  

  exeLocation(){
    const { app, protocol, connection } = this.props;
    const href = protocol === Sequence.TALKN_PROTOCOL ? `https://${conf.domain}${connection}` : `${protocol}/${connection}` ;

    if( app.type === define.APP_TYPES.EXTENSION ){
      talknAPI.extension("location", {protocol, connection});
    }else{
      location.href = href;
    }
  }

 	render() {
		const{
      mode,
      thread,
      createTime,
      post,
      favicon,
      childLayerCnt,
      onTransitionEnd,
      _id,
     } = this.props;
    const timeId = this.getTimeId();
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

    if(mode === 'post'){
      return (
        <li data-component-name={this.constructor.name} id={_id} style={style.self} {...this.getDecolationProps()}>
          <div style={style.upper}>
            <span style={style.upperSpace} />
  
            <span style={style.upperRight}>
              <div style={style.upperChild}>{childLabel}</div>
              <time style={style.upperTimeago} ref={timeId} className={'timeAgo'} dateTime={ createTime }>{createTime}</time>
            </span>
          </div>
  
          <div onClick={this.exeLocation} style={style.bottom}>
            <span style={{...style.bottomIcon, backgroundImage: `url( ${dispFavicon} )`}} />
            <span style={style.bottomPost} dangerouslySetInnerHTML={{__html: post }} />
          </div>
        </li>
      );
    }else{
      return (
        <li
          data-component-name={this.constructor.name}
          id={_id}
          style={style.self}
          onTransitionEnd={onTransitionEnd}
          >  
          <div data-component-name={`${this.constructor.name}-bottom`} style={style.bottom}>
            <span data-component-name={`${this.constructor.name}-image`} style={{...style.bottomIcon, backgroundImage: `url( ${dispFavicon} )`}} />
            <span data-component-name={`${this.constructor.name}-post`} style={style.bottomPost} dangerouslySetInnerHTML={{__html: post }} />
          </div>
        </li>
      );    
    }
 	}
}
