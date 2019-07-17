import React, { Component } from "react"
import App from 'common/schemas/state/App';
import Icon from 'client/components/Icon';
import { default as IconStyle } from 'client/style/Icon';

export default class Board extends Component {

  constructor(props) {
    super(props);
    this.renderLiChild = this.renderLiChild.bind( this );
    this.handleOnClickToggleBoard = this.handleOnClickToggleBoard.bind( this );
    this.handleOnClickToggleBubblePost = this.handleOnClickToggleBubblePost.bind( this );
    this.handleOnClickMediaList = this.handleOnClickMediaList.bind( this );
  }

  handleOnClickToggleBoard(){
    talknAPI.toggleDispBoard();
  }

  handleOnClickToggleBubblePost(){
    talknAPI.toggleBubblePost();
  }

  handleOnClickMediaList(){
    talknAPI.toggleMediaList();
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
        style={style.board.li}
      >
        { ThunderIcon }
        <div style={style.board.liChild}>
          CHILD
        </div>
      </li>
    );
  }

 	render() {
    const { state } = this.props;
    const { style, app } = state;
    const BubbleIcon = Icon.getBubble( IconStyle.getBubble(state) );
    const PlayIcon = Icon.getPlay( IconStyle.getPlay(state) );
    return (
      <div data-componet-name={"Board"} style={style.board.self}>
        <ul style={style.board.ul}>
          <li style={style.board.li} onClick={this.handleOnClickToggleBubblePost}>
            <div>
              { BubbleIcon }
            </div>
            <div style={style.board.liBubble}>
              BUBBLE
            </div>
          </li>
          { this.renderLiChild() }
          <li
            onClick={this.handleOnClickMediaList}
            style={style.board.li}
          >
            <div>
              { PlayIcon }
            </div>
            <div style={style.board.liPlay}>
              LIST
            </div>
          </li>
        </ul>
        <div onClick={this.handleOnClickToggleBoard} style={style.board.toggle}>
          { app.isOpenBoard ? "▲" : "▼" }
        </div>
      </div>
    );
 	}
}