import React, { CSSProperties } from 'react';

import Ui from 'common/clientState/store/Ui';
import conf from 'common/conf';
import util from 'common/util';

import App from 'api/store/App';

import TalknComponent from 'client/components/TalknComponent';
import { Label } from 'client/components/common';

import defaultFavicon from 'assets/favicon.png';

const regex = /^\s*$/;

type PostsFooterProps = {
  mode: string;
  state: any;
  handleOnClickFooterIcon?: any;
  handleOnClickToggleMain?: any;
};

type PostsFooterState = {
  focusSetIntervalId: any;
};

export default class PostsFooter extends TalknComponent<PostsFooterProps, PostsFooterState> {
  constructor(props: PostsFooterProps) {
    super(props);
    this.componentName = 'PostsFooter';
    this.state = { focusSetIntervalId: 0 };
    this.getIconStyle = this.getIconStyle.bind(this);
    this.renderButton = this.renderButton.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnKeyPress = this.handleOnKeyPress.bind(this);
  }

  componentDidMount() {
    this.clientAction('COMPONENT_DID_MOUNTS', 'PostsFooter');
  }

  handleOnClick(e) {
    const { ui } = this.clientState;
    const postArea: HTMLElement = this.refs.postArea as HTMLElement;
    const value = postArea.innerHTML;

    if (value !== '' && !App.validInputPost(value)) {
      this.api('post', { app: { inputPost: ui.inputPost, inputStampId: 0 } });
      this.clientAction('ON_CHANGE_INPUT_POST', { ui: { inputPost: '' } });
    }
  }

  handleOnChange(e) {
    if (!App.validInputPost(e.target.value)) {
      this.clientAction('ON_CHANGE_INPUT_POST', { ui: { inputPost: e.target.value } });
    }
  }

  handleOnKeyPress(e) {
    clearInterval(this.state.focusSetIntervalId);
    if (e.nativeEvent.keyCode === 13) {
      if (e.nativeEvent.shiftKey) {
        this.clientAction('ON_CHANGE_INPUT_POST', { ui: { inputPost: e.target.value + '\n' } });
      } else {
        if (!regex.test(e.target.value)) {
          this.api('post', { app: { inputPost: e.target.value, inputStampId: 0 } });
          this.clientAction('ON_CHANGE_INPUT_POST', { ui: { inputPost: '' } });
        }
      }
    }
  }

  getIconStyle(): CSSProperties {
    const { style, app, thread } = this.props.state;
    const favicon = app.tunedCh === '' ? defaultFavicon : `https://${conf.assetsIconPath}${util.getSaveFaviconName(thread.favicon)}`;
    return thread.favicon ? { ...style.postsFooter.icon, backgroundImage: `url(${favicon})` } : style.postsFooter.icon;
  }

  render() {
    const { state, handleOnClickFooterIcon } = this.props;
    const { style, ui } = state;
    return (
      <footer data-component-name={this.componentName} style={style.postsFooter.self}>
        <div style={this.getIconStyle()} onClick={handleOnClickFooterIcon} />
        <textarea
          id="post"
          data-component-name={'postArea'}
          style={style.postsFooter.textarea}
          ref={'postArea'}
          rows={1}
          onChange={this.handleOnChange}
          onKeyPress={this.handleOnKeyPress}
          value={ui.inputPost}
          placeholder="Comment to web"
        />
        {/* TODO: Lighthouse accecibility */}
        <Label htmlFor="post" />
        {this.renderButton()}
      </footer>
    );
  }

  renderButton(): React.ReactNode {
    const { style, ui } = this.props.state;
    if (ui.extensionMode === Ui.extensionModeModal) {
      return undefined;
    }
    return <button aria-label="post" style={style.postsFooter.button} onClick={this.handleOnClick} />;
  }
}
