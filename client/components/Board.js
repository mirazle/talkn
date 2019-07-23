import React, { Component } from "react"
import App from 'common/schemas/state/App';
import Sequence from 'common/Sequence';
import Icon from 'client/components/Icon';
import MenuIndexListStyle from 'client/style/Menu/MenuIndexList';
import IconStyle from 'client/style/Icon';
import BoardStyle from 'client/style/Board';

export default class Board extends Component {

  static getConnection( str, thread ){
    const isIncludeProtocol = Board.isIncludeProtocol( str );
    if( isIncludeProtocol ){
      return Board.removeProtocol( str );
    }else{
      if( str.indexOf( "/" ) === 0 ){
        return "/" + thread.host + str;
      }else{
        return "/" + thread.host + "/" + str;
      }
    }
  }

  static isIncludeProtocol( str ){
    if( str.indexOf( Sequence.HTTP_PROTOCOL ) >= 0 ){
      return true;
    }
    if( str.indexOf( Sequence.HTTPS_PROTOCOL ) >= 0 ){
      return true;
    }
    return false;
  }

  static removeProtocol( str ){
    return str.replace(`${Sequence.HTTP_PROTOCOL}/`, "").replace(`${Sequence.HTTPS_PROTOCOL}/`, "");
  }

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
    //this.handleOnClickLink = this.handleOnClickLink.bind( this );
  }

  componentDidMount(){
    const { state, handleOnClickConnection } = this.props;
    const { app, thread, style } = state;
    let { upperRankWrap, upperRank } = style.menuIndexList;
    const background = MenuIndexListStyle.getDispRankBackground( 0 );
    const width = BoardStyle.tuneSize;
    const displayLinks = !( BoardStyle.getLinksDisplay(app) === "none" );
    const linkContents = this.state.linkContents;
    const tuneLi = (
      <li
        key={`linkTune`}
        style={style.board.linksTuneLi}
        onClick={() => { handleOnClickConnection( thread.connection ) } }
      >
        <span style={{...upperRankWrap, background, width}}>
          <span style={upperRank}>
            TUNE
          </span>
        </span>
        <span>
          {thread.title}
        </span>
      </li>
    );
    const getLi = ( connectionKey, textKey ) => ( obj, i) => {
      const connection = Board.getConnection( obj[ connectionKey ], thread );
      return (
        <li
          key={`${connectionKey}${i}`}
          style={style.board.linksLi}
          onClick={() => { handleOnClickConnection( connection ) } }
        >
          ∟{obj[ textKey ]}
        </li>
      );
    };

    linkContents.html = thread.links.map( getLi("href", "text") );
    linkContents.music = thread.audios.map( getLi("src", "src") );
    linkContents.movie = thread.videos.map( getLi("src", "src") );
    linkContents.html.unshift( tuneLi );
    linkContents.music.unshift( tuneLi );
    linkContents.movie.unshift( tuneLi );

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