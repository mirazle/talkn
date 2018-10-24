import React, { Component, PropTypes } from 'react'
import Sequence from 'common/Sequence';
import util from 'common/util';
import conf from 'common/conf';

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
    const { protocol, connection } = this.props;
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
      thread,
      createTime,
      post,
      favicon,
      childLayerCnt,
      _id,
     } = this.props;
    const timeId = this.getTimeId();
    const childLabel = childLayerCnt > 0 ? `( ${childLayerCnt} child )` : '' ;
    const { style } = this.state;
    const dispFavicon = conf.assetsIconPath + util.getSaveFaviconName( favicon );

    return (
      <li data-component-name={this.constructor.name} id={_id} style={style.self} {...this.getDecolationProps()}>
        <div style={style.upper}>
          <span style={style.upperSpace} />

          <span style={style.upperRight}>
            <div style={style.upperChild}>{childLabel}</div>
            <time style={style.upperTimeago} ref={timeId} className={'timeAgo'} dateTime={ createTime }>{createTime}</time>
          </span>
        </div>

        <a style={style.bottom} {...this.getHrefProps()}>
          <span style={{...style.bottomIcon, backgroundImage: `url( //${dispFavicon} )`}} />
          <span style={style.bottomPost} dangerouslySetInnerHTML={{__html: post }} />
        </a>
      </li>
		);
 	}
}
