import React, { Component, PropTypes } from 'react'

export default class Post extends Component {

  componentDidUpdate(){
    const { timeago } = this.props;
    timeago.render(document.querySelectorAll( '.timeAgo' ) );
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
		return (
      <li>

        <div style={{}}>
          <div style={{}}>
          </div>

          <time
            className={'timeAgo'}
            dateTime={ createTime }
            style={{}}
          >
            {createTime}
          </time>
        </div>

        <div>
          <div style={{}} />
          <div style={{}} dangerouslySetInnerHTML={{__html: post}} />
        </div>

      </li>
		);
 	}
}
