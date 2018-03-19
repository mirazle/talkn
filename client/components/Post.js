import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import Sequence from 'common/Sequence';

export default class Post extends Component {

  constructor(props) {
    const {style} = props;
    super(props);
    this.state = {style}
    this.getDecolationProps = this.getDecolationProps.bind(this);
  }

  getDecolationProps(){
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
  }

  getTimeId(){
    return `timeAgo:${this.props._id}`;
  }

  getHrefProps(){
    const { thread } = this.props;
    const { protocol, connection } = thread;
    const href = protocol === Sequence.TALKN_PROTOCOL ? `//talkn.io${connection}` : `/${connection}` ;
    return { href: href };
  }

  componentDidMount(){
    const { _id, timeago } = this.props;
    const timeId = this.getTimeId();
    timeago.render( this.refs[ timeId ] );
  }

 	render() {
		const{
      talknAPI,
      thread,
      connection,
      connections,
      createTime,
      dispFlg,
      post,
      thum,
      uid,
      updateTime,
      utype,
      childLayerCnt,
      _id,
     } = this.props;
    const timeId = this.getTimeId();
    const childLabel = childLayerCnt > 0 ? `( ${childLayerCnt} child )` : '' ;
    const { style } = this.state;
    const { protocol } = thread;
    return (
      <li style={style.self} {...this.getDecolationProps()}>
        <div style={style.upper}>
          <span style={style.upperSpace} />

          <span style={style.upperRight}>
            <div style={style.upperChild}>{childLabel}</div>
            <time style={style.upperTimeago} ref={timeId} className={'timeAgo'} dateTime={ createTime }>{createTime}</time>
          </span>
        </div>

        <a style={style.bottom} {...this.getHrefProps()}>
          <span style={{...style.bottomIcon, backgroundImage: `url( ${thum} )`}} />
          <span style={style.bottomPost} dangerouslySetInnerHTML={{__html: post}} />
        </a>
      </li>
		);
 	}
}
