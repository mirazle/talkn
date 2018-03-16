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
    const { posts, thread, control, actionLog } = this.props.state;
    switch( actionLog[ 0 ] ){
    case 'SERVER_TO_CLIENT[BROADCAST]:post':
      const { isScrollBottom } = this.state;
      if( isScrollBottom ){
        this.props.startAnimateScrollTo();
      }else{
        const lastPost = posts[ posts.length - 1 ];
        const childLayerCnt = lastPost.connections.length - thread.connections.length;

        if( control.childrenThreadView ){
            this.props.openNotif();
        }else{

          if( childLayerCnt === 0){
            this.props.openNotif();
          }
        }
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

      if(thread.isSelfConnection){
        if( Object.keys( thread.serverMetas ).length !== document.querySelectorAll('meta').length ){

          console.log( Object.keys( thread.serverMetas ).length + " !== " + document.querySelectorAll('meta').length );
          console.log(document.querySelectorAll('meta'));
          talknAPI.updateThreadServerMetas(document.querySelectorAll('meta'));
        }
      }
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
		const{ control } = this.props.state;

    if( control.isOpenNotif ){
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
    const{ style, posts, thread, control } = state;
    const dispPostCnt = Object.keys( posts ).length;
    let isDisp = false;

    if( dispPostCnt > 0 ){
      if( control.childrenThreadView ){
        if( dispPostCnt < thread.multiPostCnt ){
          isDisp = true;
        }
      }else{
        if( dispPostCnt < thread.postCnt ){
          isDisp = true;
        }
      }
    }

    if( isDisp ){
      return (
        <li style={style.posts.more} onClick={this.handleOnClickGetMore}>
          GET MORE
        </li>
      )
    }
    return null;
  }

  renderPostList(){
		const{ state, talknAPI, timeago } = this.props;
    const{ style, thread, control, posts } = state;
    let postList = [];
    if( Object.keys( posts ).length > 0 ){
      postList = Object.keys( posts ).map( ( index ) => {
        const post = posts[ index ];
        const childLayerCnt = post.connections.length - thread.connections.length;

        if( !control.childrenThreadView && childLayerCnt !== 0){
          return null;
        }

        return (
          <Post
            key={post._id}
            {...post}
            thread={thread}
            childLayerCnt={childLayerCnt}
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
      <div style={ style.posts.self } >
        <ol ref="thread" onScroll={this.handleOnScroll} style={ style.posts.ol }>
          {this.renderGetMore()}
          {this.renderPostList()}
        </ol>
        <div style={style.main.notif}>NEW POST</div>
      </div>
		);
 	}
}
