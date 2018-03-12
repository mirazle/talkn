import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import Sequence from 'common/Sequence';

export default class Post extends Component {

  getTimeId(){
    return `timeAgo:${this.props._id}`;
  }

  componentDidMount(){
    const { _id, timeago } = this.props;
    const timeId = this.getTimeId();
    timeago.render( this.refs[ timeId ] );
  }

 	render() {
		const{
      style,
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
    return (
      <li style={style.self}>
        <div style={style.upper}>
          <span style={style.upperSpace} />

          <span style={style.upperRight}>
            <div style={style.upperChild}>{childLabel}</div>
            <time style={style.upperTimeago} ref={timeId} className={'timeAgo'} dateTime={ createTime }>{createTime}</time>
          </span>
        </div>

        <div style={style.bottom}>
          <span style={{...style.bottomIcon, backgroundImage: `url( ${thum} )`}} />
          <span style={style.bottomPost} dangerouslySetInnerHTML={{__html: post}} />
        </div>
      </li>
		);
 	}
}
