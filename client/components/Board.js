import React, { Component } from "react"
import App from 'common/schemas/state/App';
import Sequence from 'common/Sequence';
import Icon from 'client/components/Icon';
import Links from 'client/components/Links';
import MenuIndexListStyle from 'client/style/Menu/MenuIndexList';
import IconStyle from 'client/style/Icon';
import BoardStyle from 'client/style/Board';

export default class Board extends Component {

  constructor(props) {
    super(props);
    this.state = {
      displayLinks: false
    };
    this.renderLiChild = this.renderLiChild.bind( this );
    this.handleOnTransitionEnd = this.handleOnTransitionEnd.bind( this );
    this.handleOnClickToggleBoard = this.handleOnClickToggleBoard.bind( this );
    this.handleOnClickToggleBubblePost = this.handleOnClickToggleBubblePost.bind( this );
    this.handleOnClickLinks = this.handleOnClickLinks.bind( this );
    this.handleOnClickLinkTabs = this.handleOnClickLinkTabs.bind( this );
  }

  componentDidMount(){
    const { state } = this.props;
    const { app } = state;
    const displayLinks = !( BoardStyle.getLinksDisplay(app) === "none" );
    this.setState({
      exeTransitionEnd: false,
      displayLinks
    })
  }

  componentWillReceiveProps(props){
    const { actioned, isOpenLinks } = props.state.app;
    if( actioned === "TOGGLE_DISP_BOARD" ){
      this.setState({displayLinks: isOpenLinks});
    }
  }

  handleOnClickToggleBoard(){
    const { app } = this.props.state;
    if( app.isOpenLinks ){
      this.setState({exeTransitionEnd: true});
      talknAPI.toggleLinks();
    }else{
      talknAPI.toggleDispBoard();
    }
  }

  handleOnClickToggleBubblePost(){
    talknAPI.toggleBubblePost();
  }

  handleOnClickLinks(){
    this.setState({exeTransitionEnd: true});
    talknAPI.toggleLinks();
  }

  handleOnTransitionEnd(e){
    const { exeTransitionEnd, displayLinks } = this.state;
    const { app } = this.props.state;
    let updateState = {};

    if( exeTransitionEnd ){

      if( app.isOpenLinks ){
        updateState = { displayLinks: !this.state.displayLinks };
      }else{
        updateState = { displayLinks: false };
      }

      this.setState({
        ...updateState,
        exeTransitionEnd: false
      });
    }
  }

  handleOnClickLinkTabs(e){
    this.setState({
      linkContentsKey: e.target.innerText
    } );
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

 	render() {
    const { state } = this.props;
    const { style, app } = state;
    const BubbleIcon = Icon.getBubble( IconStyle.getBubble(state) );
    const PlayIcon = Icon.getPlay( IconStyle.getPlay(state) );
    return (
      <div
        ref="Board"
        data-componet-name={"Board"}
        style={style.board.self}
        onTransitionEnd={ this.handleOnTransitionEnd }
      >
        <Links { ...this.props } displayLinks={ this.state.displayLinks } />
        <div
          data-componet-name={"BoardMenu"}
          style={style.board.menu}
        >
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
              onClick={this.handleOnClickLinks}
              style={style.board.menuLi}
            >
              <div>
                { PlayIcon }
              </div>
              <div style={style.board.menuLiLinks}>
                LINKS
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