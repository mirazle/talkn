import React, { Component } from "react";
import Sequence from "common/Sequence";
import BoardStyle from "client/style/Board";
import Link from "client/components/Link";

interface Props {
  displayLinks: any;
  state: any;
  handleOnClickCh?: any;
}

interface State {
  ch: any;
  linkContents: any;
  linkContentsKey: any;
  displayLinks: any;
}

export default class Links extends Component<Props, State> {
  static getCh(str, thread) {
    let ch = "";
    const isIncludeProtocol = Links.isIncludeProtocol(str);

    if (isIncludeProtocol) {
      ch = Links.removeProtocol(str);
    } else {
      if (str && typeof str === "string" && str.indexOf("/") === 0) {
        ch = "/" + thread.host + str;
      } else {
        const splitedCh = thread.ch.split("/");
        const splitedChLength = splitedCh.length - 2;
        let chPart = "";
        for (let i = 0; i < splitedChLength; i++) {
          chPart = chPart + splitedCh[i] + "/";
        }
        ch = chPart + str + "/";
        if (ch.indexOf(thread.host) === -1) {
          ch = "/" + thread.host + ch;
        }
      }
    }

    if (ch.lastIndexOf("/") !== ch.length - 1) {
      ch = ch + "/";
    }
    return ch;
  }

  static isIncludeProtocol(str) {
    if (str && typeof str === "string") {
      if (str.indexOf(Sequence.HTTP_PROTOCOL) >= 0) {
        return true;
      }
      if (str.indexOf(Sequence.HTTPS_PROTOCOL) >= 0) {
        return true;
      }
    }
    return false;
  }

  static removeProtocol(str) {
    return str.replace(`${Sequence.HTTP_PROTOCOL}/`, "").replace(`${Sequence.HTTPS_PROTOCOL}/`, "");
  }

  constructor(props) {
    super(props);
    const { thread } = this.props.state;
    this.state = {
      ch: thread.ch,
      linkContents: {
        html: [],
        music: [],
        movie: []
      },
      displayLinks: false,
      linkContentsKey: "html"
    };
    this.renderLinkTabs = this.renderLinkTabs.bind(this);
    this.handleOnClickLinkTabs = this.handleOnClickLinkTabs.bind(this);
  }

  componentDidMount() {
    const { state, handleOnClickCh } = this.props;
    const { app, thread, style } = state;
    const displayLinks = !(BoardStyle.getLinksDisplay(app) === "none");
    const linkContents = this.state.linkContents;
    let isTuneActive = false;
    if (app.isRootCh) {
      isTuneActive = true;
    }

    const tuneLi = (
      <Link
        key={`linkTune`}
        isMainCh={true}
        isActive={isTuneActive}
        text={thread.title}
        ch={thread.ch}
        handleOnClick={() => {
          window.talknAPI.toggleLinks();
          handleOnClickCh(thread.ch, "toLinks");
        }}
        {...this.props}
      />
    );
    const getLi = (chKey, textKey) => (obj, i) => {
      const ch = Links.getCh(obj[chKey], thread);
      console.log(obj[chKey]);
      const hasSlash = obj[chKey].lastIndexOf("/") === ch.length - 1 ? true : false;

      return (
        <Link
          key={`${chKey}${i}`}
          isMainCh={false}
          isActive={false}
          text={obj[textKey]}
          ch={ch}
          handleOnClick={() => {
            window.talknAPI.toggleLinks();
            handleOnClickCh(ch, hasSlash, "toLinks");
          }}
          {...this.props}
        />
      );
    };

    linkContents.html = thread.links.map(getLi("href", "text"));
    linkContents.music = thread.audios.map(getLi("src", "src"));
    linkContents.movie = thread.videos.map(getLi("src", "src"));
    linkContents.html.unshift(tuneLi);
    linkContents.music.unshift(tuneLi);
    linkContents.movie.unshift(tuneLi);

    this.setState({
      linkContents,
      displayLinks
    });
  }

  handleOnClickLinkTabs(e) {
    this.setState({
      linkContentsKey: e.target.innerText
    });
  }

  renderLinkTabs() {
    const { style, app } = this.props.state;
    const { linkContents, linkContentsKey } = this.state;
    const activeStyle = BoardStyle.getLinksTabActive({ app });
    const lastStyle = BoardStyle.getLinksTabLast({ app });
    const linkContentKeys = Object.keys(linkContents);
    const lastIndex = linkContentKeys.length - 1;

    return linkContentKeys.map((linkKey, index) => {
      let liStyle = style.links.linksTabUnactive;
      if (lastIndex === index) {
        liStyle = { ...liStyle, ...lastStyle };
      }

      if (linkContentsKey === linkKey) {
        liStyle = { ...liStyle, ...activeStyle };
      }

      return (
        <li key={linkKey} style={liStyle} onClick={this.handleOnClickLinkTabs}>
          {linkKey}
        </li>
      );
    });
  }

  render() {
    const { displayLinks } = this.props;
    const { style } = this.props.state;
    const contents = this.state.linkContents[this.state.linkContentsKey];
    if (displayLinks) {
      return (
        <div data-componet-name={"Links"} style={style.links.self}>
          <ul data-componet-name={"LinksUl"} style={style.links.linksUl}>
            {contents}
          </ul>
          <ul data-componet-name={"LinkMenuUl"} style={style.links.linkMenuUl}>
            {this.renderLinkTabs()}
          </ul>
        </div>
      );
    } else {
      return (
        <div data-componet-name={"Links"} style={style.links.links}>
          <ul data-componet-name={"LinksUl"} style={style.links.linksUl} />
        </div>
      );
    }
  }
}
