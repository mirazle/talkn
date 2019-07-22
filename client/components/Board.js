import React, { Component } from "react"
import App from 'common/schemas/state/App';
import Icon from 'client/components/Icon';
import { default as IconStyle } from 'client/style/Icon';
import { default as BoardStyle } from 'client/style/Board';

export default class Board extends Component {

  constructor(props) {
    super(props);
    this.state = {
      displayLinks: false,
      exeTransitionEnd: false,
      linkContents: {
        html: [],
        music: [],
        movie: []
      },
      linkContentsKey: "html"
    };
    this.renderLinks = this.renderLinks.bind( this );
    this.renderLiChild = this.renderLiChild.bind( this );
    this.renderLinkTabs = this.renderLinkTabs.bind( this );
    this.handleOnTransitionEnd = this.handleOnTransitionEnd.bind( this );
    this.handleOnClickToggleBoard = this.handleOnClickToggleBoard.bind( this );
    this.handleOnClickToggleBubblePost = this.handleOnClickToggleBubblePost.bind( this );
    this.handleOnClickLinks = this.handleOnClickLinks.bind( this );
    this.handleOnClickLinkTabs = this.handleOnClickLinkTabs.bind( this );
  }

  componentDidMount(){
    const { app, thread, style } = this.props.state;
    const displayLinks = !( BoardStyle.getLinksDisplay(app) === "none" );
    const linkContents = this.state.linkContents;
    linkContents.html = thread.links.map( (link, i) => {
      return (
        <li key={`link${i}`} style={style.board.linksLi}>
          {link.text}
        </li>
      );
    } );
    linkContents.music = thread.audios.map( (audio) => {
      return (
        <li key={`audio${i}`} style={style.board.linksLi}>
          {audio.src}
        </li>
      );
    } );
    linkContents.movie = thread.videos.map( (video) => {
      return (
        <li key={`video${i}`} style={style.board.linksLi}>
          {video.src}
        </li>
      );
    } );

    this.setState({
      linkContents,
      displayLinks
    })
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
    const { exeTransitionEnd } = this.state;
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

  renderLinkTabs(){
    const { style, app } = this.props.state;
    const { linkContents, linkContentsKey } = this.state;
    const activeStyle = BoardStyle.getLinkMenuLiActive({app});
    const lastStyle = BoardStyle.getLinkMenuLiLast({app});
    const linkContentKeys = Object.keys( linkContents );
    const lastIndex = linkContentKeys.length - 1;
    return linkContentKeys.map( ( linkKey, index ) => {
      let liStyle = style.board.linkMenuLi;
      if( lastIndex === index ){
        liStyle = {...liStyle, ...lastStyle};
      }
      if( linkContentsKey === linkKey ){
        liStyle = {...liStyle, ...activeStyle};
      }
      return (
        <li
          key={linkKey}
          style={liStyle}
          onClick={this.handleOnClickLinkTabs}
        >
          { linkKey }
        </li>
      )
    });
  }

  renderLinks(){
    const { style } = this.props.state;
    const { displayLinks } = this.state;
    const contents = this.state.linkContents[ this.state.linkContentsKey ];

    if( displayLinks ){
      return (
        <div
          data-componet-name={"Links"}
          style={style.board.links}
        >
          <ul
            data-componet-name={"LinksUl"}
            style={style.board.linksUl}
          >
            { contents }
          </ul>
          <ul
            data-componet-name={"LinkMenuUl"}
            style={style.board.linkMenuUl}
          >
            { this.renderLinkTabs() }
          </ul>
        </div>
      )
    }else{
      return (
        <div
          data-componet-name={"Links"}
          style={style.board.links}
        >
          <ul
            data-componet-name={"LinksUl"}
            style={style.board.linksUl}
          />
        </div>
      );
    }
  }

 	render() {
    const { state } = this.props;
    const { style, app } = state;
    const BubbleIcon = Icon.getBubble( IconStyle.getBubble(state) );
    const PlayIcon = Icon.getPlay( IconStyle.getPlay(state) );
    const links = this.renderLinks();
    return (
      <div
        ref="Board"
        data-componet-name={"Board"}
        style={style.board.self}
        onTransitionEnd={ this.handleOnTransitionEnd }
      >
        { links } 
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