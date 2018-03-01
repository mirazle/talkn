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
      connection,
      connections,
      createTime,
      dispFlg,
      post,
      thum,
      uid,
      updateTime,
      utype,
      _id,
     } = this.props;
    const timeId = this.getTimeId();
    return (
      <li style={style.self}>
        <div style={style.upper}>
          <div style={style.upperLeft}/>
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
