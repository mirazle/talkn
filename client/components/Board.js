import React, { Component } from "react"
import App from 'common/schemas/state/App';
import Icon from 'client/components/Icon';
import { default as IconStyle } from 'client/style/Icon';
import { default as BoardStyle } from 'client/style/Board';

export default class Board extends Component {

  constructor(props) {
    super(props);
    this.state = { displayLinks: false };
    this.renderLinksUl = this.renderLinksUl.bind( this );
    this.renderLiChild = this.renderLiChild.bind( this );
    this.handleOnTransitionEnd = this.handleOnTransitionEnd.bind( this );
    this.handleOnClickToggleBoard = this.handleOnClickToggleBoard.bind( this );
    this.handleOnClickToggleBubblePost = this.handleOnClickToggleBubblePost.bind( this );
    this.handleOnClickLinks = this.handleOnClickLinks.bind( this );
  }

  componentDidMount(){
    const { app } = this.props.state;
    const displayLinks = !( BoardStyle.getLinksDisplay(app) === "none" );
    this.setState({ displayLinks } )
  }

  handleOnClickToggleBoard(){
    const { app } = this.props.state;
    if( app.isOpenLinks ){
      talknAPI.toggleLinks();
    }else{
      talknAPI.toggleDispBoard();
    }
  }

  handleOnClickToggleBubblePost(){
    talknAPI.toggleBubblePost();
  }

  handleOnClickLinks(){
    talknAPI.toggleLinks();
  }

  handleOnTransitionEnd(e){
    const { app } = this.props.state;
    if( app.isOpenLinks ){
      this.setState({ displayLinks: !this.state.displayLinks } )
    }else{
      this.setState({ displayLinks: false } )
    }
  }

  handleOnClickLinkLi(){
    const { app } = this.props.state;
    const { stepTo } = App.getStepToDispThreadType( {app}, {}, connection );
    switch(stepTo){
    case `${App.dispThreadTypeMulti} to ${App.dispThreadTypeChild}`:
    case `${App.dispThreadTypeSingle} to ${App.dispThreadTypeChild}`:
    case `${App.dispThreadTypeChild} to ${App.dispThreadTypeChild}`:
      onClickToChildThread( connection, {app} );
      talknAPI.changeThread( connection );
      break;
    case `${App.dispThreadTypeChild} to ${App.dispThreadTypeMulti}`:
      onClickToMultiThread( connection, {app} );
      talknAPI.changeThread( connection );
      break;
    case `${App.dispThreadTypeChild} to ${App.dispThreadTypeSingle}`:
      onClickToSingleThread( connection, {app} );
      talknAPI.changeThread( connection );
      break;
    }
  }

  renderLiChild(){
    const { state, handleOnClickMultistream } = this.props;
    const { app, style } = state;
    let onClick = app.isRootConnection && !app.isMediaConnection ?
      handleOnClickMultistream : () => {};
    console.log( "app.isRootConnection = " + app.isRootConnection  );
    console.log( "app.isMediaConnection = " + app.isMediaConnection  );
    console.log( App.isActiveMultistream( app ) );
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

  renderLinksUl(){
    const { style, thread } = this.props.state;
    const { displayLinks } = this.state;
    const audios = thread.audios.map( (audio) => {
      return (
        <li style={style.board.linksLi}>
          {audio.src}
        </li>
      );
    } );

    if( displayLinks ){
      return (
        <ul
          data-componet-name={"LinksUl"}
          style={style.board.linksUl}
        >
          { audios }
        </ul>
      )
    }else{
      return (
        <ul
          data-componet-name={"LinksUl"}
          style={style.board.linksUl}
        />
      );
    }
  }

 	render() {
    const { state } = this.props;
    const { style, app } = state;
    const BubbleIcon = Icon.getBubble( IconStyle.getBubble(state) );
    const PlayIcon = Icon.getPlay( IconStyle.getPlay(state) );
    const linksUl = this.renderLinksUl();
    return (
      <div
        ref="Board"
        data-componet-name={"Board"}
        style={style.board.self}
        onTransitionEnd={ this.handleOnTransitionEnd }
      >
        <div
          data-componet-name={"Links"}
          style={style.board.links}
        >
          { linksUl } 
        </div>
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