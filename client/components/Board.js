import React, { Component } from "react"
import App from 'common/schemas/state/App';
import Icon from 'client/components/Icon';
import Links from 'client/components/Links';
import IconStyle from 'client/style/Icon';
import BoardStyle from 'client/style/Board';
import Marquee from 'client/container/util/Marquee';

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
    const { actioned, isLinkConnection, isOpenLinks } = props.state.app;
    let updateState = {};

    if( !isOpenLinks ){
      updateState.displayLinks = false;
    }

    if( Object.keys( updateState ).length > 0 ){
      this.setState(updateState);
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
    const { handleOnClickConnection } = this.props;
    const { app, thread } = this.props.state;

    switch( app.dispThreadType ){
    case App.dispThreadTypeMulti :
    case App.dispThreadTypeSingle :
      this.setState({exeTransitionEnd: true});
      talknAPI.toggleLinks();
      break;
    case App.dispThreadTypeChild :
    case App.dispThreadTypeTimeline :
      if( app.isLinkConnection ){
        handleOnClickConnection( app.rootConnection, null,  "backToRootConnection" );
      }
    }
  }

  handleOnTransitionEnd(e){
    const { exeTransitionEnd, displayLinks } = this.state;
    const { app } = this.props.state;
    let updateState = {};

    if( exeTransitionEnd ){
      if( app.isOpenLinks ){
        updateState = { displayLinks: true };
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

    console.log( IconStyle.getLinks(state) );

    const BubbleIcon = Icon.getBubble( IconStyle.getBubble(state) );
    const LinksIcon = Icon.getLinks( IconStyle.getLinks(state) );
    const linksLabel = app.isLinkConnection ? "BACK" : "LINKS";
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
                { LinksIcon }
              </div>
              <div style={style.board.menuLiLinks}>
                { linksLabel }
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