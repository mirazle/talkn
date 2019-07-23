import React, { Component } from "react"
import Sequence from 'common/Sequence';
import MenuIndexListStyle from 'client/style/Menu/MenuIndexList';
import BoardStyle from 'client/style/Board';
import Link from 'client/components/Link';

export default class Links extends Component {

  static getConnection( str, thread ){
    const isIncludeProtocol = Links.isIncludeProtocol( str );
    if( isIncludeProtocol ){
      return Links.removeProtocol( str );
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
    const { thread } = this.props.state;
    this.state = {
      connection: thread.connection,
      linkContents: {
        html: [],
        music: [],
        movie: []
      },
      linkContentsKey: "html"
    };
    this.renderLinkTabs = this.renderLinkTabs.bind( this );
    this.handleOnClickLinkTabs = this.handleOnClickLinkTabs.bind( this );
  }

  componentDidMount(){
    const { state, handleOnClickConnection } = this.props;
    const { app, thread, style } = state;
    const displayLinks = !( BoardStyle.getLinksDisplay(app) === "none" );
    const linkContents = this.state.linkContents;
    let isTuneActive = false;

    if( app.isRootConnection ){
      isTuneActive = true;
    }

    const tuneLi = (
      <Link 
        key={`linkTune`}
        isMainConnection={true}
        isActive={isTuneActive}
        text={thread.title}
        handleOnClick={() => {
          talknAPI.toggleLinks();
          talknAPI.toggleDispBoard();
          handleOnClickConnection( thread.connection, "toLinks" )
        } }
        {...this.props}
      />
    );
    const getLi = ( connectionKey, textKey ) => ( obj, i) => {
      const connection = Links.getConnection( obj[ connectionKey ], thread );
      const isActive = thread.connection === connection;
      console.log( thread.connection + " === " + connection + " " + isActive );
      return (
        <Link 
          key={`${connectionKey}${i}`}
          isMainConnection={false}
          isActive={isActive}
          text={obj[ textKey ]}
          handleOnClick={() => {
            talknAPI.toggleLinks();
            talknAPI.toggleDispBoard();
            handleOnClickConnection( connection, "toLinks" )
          } }
          {...this.props}
        />
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

  handleOnClickLinkTabs(e){
    this.setState({
      linkContentsKey: e.target.innerText
    } );
  }

  renderLinkTabs(){
    const { style, app } = this.props.state;
    const { linkContents, linkContentsKey } = this.state;
    const activeStyle = BoardStyle.getLinksTabActive({app});
    const lastStyle = BoardStyle.getLinksTabLast({app});
    const linkContentKeys = Object.keys( linkContents );
    const lastIndex = linkContentKeys.length - 1;

    return linkContentKeys.map( ( linkKey, index ) => {
      let liStyle = style.links.linksTabUnactive;
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

 	render() {
    const { displayLinks } = this.props; 
    const { style } = this.props.state;
    const contents = this.state.linkContents[ this.state.linkContentsKey ];

    if( displayLinks ){
      return (
        <div
          data-componet-name={"Links"}
          style={style.links.self}
        >
          <ul
            data-componet-name={"LinksUl"}
            style={style.links.linksUl}
          >
            { contents }
          </ul>
          <ul
            data-componet-name={"LinkMenuUl"}
            style={style.links.linkMenuUl}
          >
            { this.renderLinkTabs() }
          </ul>
        </div>
      )
    }else{
      return (
        <div
          data-componet-name={"Links"}
          style={style.links.links}
        >
          <ul
            data-componet-name={"LinksUl"}
            style={style.links.linksUl}
          />
        </div>
      );
    }
 	}
}