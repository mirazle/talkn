import React, { Component } from "react"
import App from 'common/schemas/state/App';
import Icon from 'client/components/Icon';
import { default as IconStyle } from 'client/style/Icon';

export default class Board extends Component {

  constructor(props) {
    super(props);
    this.state = { displayMediaList: false };
    this.renderMediaListUl = this.renderMediaListUl.bind( this );
    this.renderLiChild = this.renderLiChild.bind( this );
    this.handleOnTransitionEnd = this.handleOnTransitionEnd.bind( this );
    this.handleOnClickToggleBoard = this.handleOnClickToggleBoard.bind( this );
    this.handleOnClickToggleBubblePost = this.handleOnClickToggleBubblePost.bind( this );
    this.handleOnClickMediaList = this.handleOnClickMediaList.bind( this );
  }

  handleOnClickToggleBoard(){
    const { app } = this.props.state;
    if( app.isOpenMediaList ){
      talknAPI.toggleMediaList();
    }else{
      talknAPI.toggleDispBoard();
    }
  }

  handleOnClickToggleBubblePost(){
    talknAPI.toggleBubblePost();
  }

  handleOnClickMediaList(){
    talknAPI.toggleMediaList();
  }

  handleOnTransitionEnd(){
    const { app } = this.props.state;
    if( app.isOpenMediaList ){
      this.setState({ displayMediaList: !this.state.displayMediaList } )
    }else{
      this.setState({ displayMediaList: false } )
    }
  }

  renderLiChild(){
    const { state, handleOnClickMultistream } = this.props;
    const { app, style } = state;
    let onClick = app.isRootConnection && !app.isMediaConnection ?
      handleOnClickMultistream : () => {};

    const ThunderIcon = Icon.getThunder( IconStyle.getThunder(state) );
    return(
      <li
        onClick={onClick}
        style={style.board.menuLi}
      >
        { ThunderIcon }
        <div style={style.board.menuLiChild}>
          CHILD
        </div>
      </li>
    );
  }

  renderMediaListUl(){
    const { thread } = this.props.state;
    const { displayMediaList } = this.state;
    console.log( thread.audios );
    console.log( thread.videos );
    if( displayMediaList ){
      return (
        <ul>
          <li>
            HI!
          </li>
        </ul>
      )
    }else{
      return null;
    }
  }

 	render() {
    const { state } = this.props;
    const { style, app } = state;
    const BubbleIcon = Icon.getBubble( IconStyle.getBubble(state) );
    const PlayIcon = Icon.getPlay( IconStyle.getPlay(state) );
    const mediaListUl = this.renderMediaListUl();
    return (
      <div
        data-componet-name={"Board"}
        style={style.board.self}
        onTransitionEnd={ this.handleOnTransitionEnd }
      >
        <div style={style.board.mediaList}>
          { mediaListUl } 
        </div>
        <div style={style.board.menu}>
          <ul style={style.board.menuUl}>
            <li style={style.board.menuLi} onClick={this.handleOnClickToggleBubblePost}>
              <div>
                { BubbleIcon }
              </div>
              <div style={style.board.menuLiBubble}>
                BUBBLE
              </div>
            </li>
            { this.renderLiChild() }
            <li
              onClick={this.handleOnClickMediaList}
              style={style.board.menuLi}
            >
              <div>
                { PlayIcon }
              </div>
              <div style={style.board.menuLiPlay}>
                MEDIA
              </div>
            </li>
          </ul>
          <div onClick={this.handleOnClickToggleBoard} style={style.board.menuToggle}>
            { app.isOpenBoard ? "▲" : "▼" }
          </div>
        </div>
      </div>
    );
 	}
}