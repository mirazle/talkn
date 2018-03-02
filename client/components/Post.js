import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

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
      childCnt,
      _id,
     } = this.props;
    const timeId = this.getTimeId();
    const childLabel = childCnt > 0 ? `( ${childCnt} child )` : '' ;
    return (
      <li style={style.self}>
        <div style={style.upper}>
          <div style={style.upperLeft}>{childLabel}</div>
          <time style={style.upperRight} ref={timeId} className={'timeAgo'} dateTime={ createTime }>{createTime}</time>
        </div>

        <div style={style.bottom}>
          <div style={{...style.bottomLeft, backgroundImage: `url( ${thum} )`}} />
          <div style={style.bottomRight} dangerouslySetInnerHTML={{__html: post}} />
        </div>
      </li>
		);
 	}
}
