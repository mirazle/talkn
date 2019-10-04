import React, { Component } from "react";
import App from "common/schemas/state/App";
import util from "common/util";
import conf from "common/conf";

const regex = /^\s*$/;

interface Props {
  mode?: string;
  state: any;
  handleOnClickFooterIcon?: any;
  handleOnClickToggleMain?: any;
}

interface State {
  focusSetIntervalId: any;
}

export default class PostsFooter extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { focusSetIntervalId: 0 };
    this.renderButton = this.renderButton.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnKeyPress = this.handleOnKeyPress.bind(this);
  }

  componentDidMount() {
    window.talknAPI.componentDidMounts("PostsFooter");
  }

  handleOnClick(e) {
    const postArea: HTMLElement = this.refs.postArea as HTMLElement;
    const value = postArea.innerHTML;

    if (value !== "" && !App.validInputPost(value)) {
      window.talknAPI.post();
      window.talknAPI.onChangeInputPost("");
    }
  }

  handleOnChange(e) {
    if (!App.validInputPost(e.target.value)) {
      window.talknAPI.onChangeInputPost(e.target.value);
    }
  }

  handleOnKeyPress(e) {
    clearInterval(this.state.focusSetIntervalId);

    const { app } = this.props.state;
    if (e.nativeEvent.keyCode === 13) {
      if (e.nativeEvent.shiftKey) {
        window.talknAPI.onChangeInputPost(e.target.value + "\n");
      } else {
        if (!regex.test(e.target.value)) {
          window.talknAPI.post();
          window.talknAPI.onChangeInputPost("");
        }
      }
    }
  }

  getIconStyle() {
    const { thread, style } = this.props.state;
    const favicon = `https://${conf.assetsIconPath}${util.getSaveFaviconName(
      thread.favicon
    )}`;
    return thread.favicon
      ? { ...style.postsFooter.icon, backgroundImage: `url(${favicon})` }
      : style.postsFooter.icon;
  }

  renderButton() {
    const { style, app } = this.props.state;

    if (
      app.extensionMode === App.extensionModeExtModalLabel ||
      app.extensionMode === App.extensionModeExtBottomLabel
    ) {
      return null;
    } else {
      return (
        <button style={style.postsFooter.button} onClick={this.handleOnClick}>
          talkn
        </button>
      );
    }
  }

  render() {
    const { state, handleOnClickFooterIcon } = this.props;
    const { style, app } = state;
    const value = app.inputPost;
    const readOnly =
      app.extensionMode === App.extensionModeExtModalLabel ||
      app.extensionMode === App.extensionModeExtBottomLabel;
    return (
      <div data-component-name={"PostsFooter"} style={style.postsFooter.self}>
        <div style={this.getIconStyle()} onClick={handleOnClickFooterIcon} />
        <textarea
          data-component-name={"postArea"}
          style={style.postsFooter.textarea}
          ref={"postArea"}
          rows={1}
          readOnly={readOnly}
          onChange={this.handleOnChange}
          onKeyPress={this.handleOnKeyPress}
          value={value}
          placeholder="Comment to web"
        />
        {this.renderButton()}
      </div>
    );
  }
}
