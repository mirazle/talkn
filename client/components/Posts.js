import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import Post from 'client/components/Post';

export default class Posts extends Component {

  constructor(props){
    super(props);
    this.handleOnScroll = this.handleOnScroll.bind(this);
    this.handleOnClickGetMore = this.handleOnClickGetMore.bind(this);
    this.animateScrollTo = this.animateScrollTo.bind(this);
    this.state = {
      scrollHeight: 0,
      isAnimateScrolling: false,
      isScrollBottom: true,
    };
  }

  componentDidMount(){
    this.setState({scrollHeight: this.refs.thread.scrollHeight});
    this.animateScrollTo( this.refs.thread, 9999999, 400 );
  }

  componentDidUpdate(){
    const { actionLog } = this.props.state;

    switch( actionLog[ 0 ] ){
    case 'SERVER_TO_CLIENT[BROADCAST]:post':
      const { isScrollBottom } = this.state;
      if( isScrollBottom ){
        this.props.startAnimateScrollTo();
      }else{
        this.props.openNotif();
      }
      break;
    case 'START_ANIMATE_SCROLL_TO':
      this.animateScrollTo(
        this.refs.thread,
        this.refs.thread.scrollHeight,
        400,
        this.props.endAnimateScrollTo
      );
      break;
    case 'SERVER_TO_CLIENT[EMIT]:find':
      this.refs.thread.scrollTop = this.refs.thread.scrollHeight - this.state.scrollHeight;
      break;
    default:
      break;
    }
  }

  animateScrollTo( element, to, duration, callback = ()=>{}) {
    if( !this.state.isAnimateScrolling ){
      let start = element.scrollTop;
      let change = to - start;
      let currentTime = 0;
      let increment = 20;

      const animateScroll = ()　=>　{
        currentTime += increment;
        let scrollTop = Math.easeInOutQuad(currentTime, start, change, duration);
        element.scrollTop = scrollTop;
        if(currentTime < duration){
          this.setState({isAnimateScrolling: true});
          setTimeout(animateScroll, increment);
        }else{
          this.setState({isAnimateScrolling: false});
          callback();
        }
      };
      animateScroll();
    }
  }

  handleOnScroll( e ){
		const{ user } = this.props.state;

    if( user.isOpenNotif ){
      this.props.closeNotif();
    }

    const { clientHeight, scrollTop, scrollHeight } = e.target;
    const isScrollBottom = ( scrollHeight === ( scrollTop + clientHeight ) );
    this.setState({isScrollBottom});
    this.props.scrollThread();
  }

  handleOnClickGetMore( e ){
    const{ thread } = this.props.state;
    this.setState({scrollHeight: this.refs.thread.scrollHeight});
    talknAPI.find( thread.connection );
  }

  renderGetMore(){
		const{ state, talknAPI, timeago } = this.props;
    const{ style, posts, thread, user      } = state;

    if( Object.keys( posts ).length > 0 ){

      if( Object.keys( posts ).length < thread.postCnt ){
        return (
          <li
            style={style.posts.more}
            onClick={this.handleOnClickGetMore}
          >
            GET MORE
          </li>
        )
      }
    }
    return null;
  }

  renderPostList(){
		const{ state, talknAPI, timeago } = this.props;
    const{ style, posts } = state;
    let postList = [];
    if( Object.keys( posts ).length > 0 ){
      postList = Object.keys( posts ).map( ( index ) => {
        const post = posts[ index ];
        return (
          <Post
            key={post._id}
            {...post}
            style={style.post}
            talknAPI={talknAPI}
            timeago={timeago}
          />
        )
      });
    }
    return postList;
  }

 	render() {
    const { style } = this.props.state;
		return (
      <ol
        ref="thread"
        style={ style.posts.self }
        onScroll={this.handleOnScroll}
      >
        {this.renderGetMore()}
        {this.renderPostList()}
      </ol>
		);
 	}
}
