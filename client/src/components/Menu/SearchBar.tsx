import React from 'react';

import Sequence from 'common/Sequence';
import Ui from 'common/clientState/store/Ui';

import Thread from 'api/store/Thread';

import TalknComponent from 'client/components/TalknComponent';
import { Label } from 'client/components/common';
import Icon from 'client/components/common/Icon';
import conf from 'client/conf';

type Props = {
  state: any;
  onChangeFindType?: any;
  theme?: 'gray' | 'transparent';
  borderRadius?: boolean;
  editMode?: boolean;
  visibleTune?: boolean;
  visibleExt?: boolean;
};

type State = {
  inputValue: string;
};

export default class SearchBar extends TalknComponent<Props, State> {
  constructor(props) {
    super(props);
    const { tuneCh } = props.state;
    this.componentName = 'SetChModal';
    this.state = { inputValue: tuneCh.ch };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.state.clientLog[0] === 'API_TO_CLIENT[EMIT]:fetchPosts') {
      if (this.state.inputValue !== nextProps.state.thread.ch) {
        this.setState({ inputValue: nextProps.state.thread.ch });
      }
    }
  }

  render() {
    const {
      state: propsState,
      onChangeFindType,
      theme = 'gray',
      borderRadius = false,
      editMode = false,
      visibleTune = false,
      visibleExt = false,
    } = this.props;
    const { inputValue } = this.state;
    const { style, ui, app } = propsState;
    const { icon } = style;
    const IconCh = Icon.getCh(icon.ch);
    const handleOnClick = () => {
      if (Ui.extensionModeNone === ui.extensionMode) {
        this.clientAction('TOGGLE_DISP_SET_CH_MODAL');
      }
    };
    const tuneCh = (inputValue?: string) => {
      let linkTo = inputValue ? inputValue : this.state.inputValue;
      console.log(linkTo);
      linkTo = linkTo.replace('https:/', '').replace('http:/', '');
      linkTo = linkTo.indexOf('/') === 0 ? linkTo : `/${linkTo}`;
      linkTo = `${Sequence.HTTPS_PROTOCOL}//${conf.domain}${linkTo}`;
      window.document.location.href = linkTo;
    };

    const inputNode = editMode ? (
      <input
        type="text"
        value={inputValue ? decodeURI(inputValue) : ''}
        size={40}
        style={style.setChModal.input}
        placeholder="Input URL or Phrase"
        onChange={(e) => this.setState({ inputValue: e.target.value })}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            tuneCh();
          }
        }}></input>
    ) : (
      <div onClick={handleOnClick} style={style.ranks.headerInput}>
        {inputValue && decodeURI(inputValue)}
      </div>
    );

    return (
      <header style={style.ranks.header}>
        <div onClick={handleOnClick} style={style.ranks.headerSearchIcon}>
          {IconCh}
        </div>
        {inputNode}
        {visibleTune && (
          <button onClick={() => tuneCh()} style={style.ranks.tuneButton}>
            TUNE
          </button>
        )}
        {visibleExt && (
          <div style={style.ranks.headerUpdateIcon}>
            <select id="ch" onChange={onChangeFindType} style={style.ranks.headerFindSelect}>
              <option>{Thread.findTypeAll}</option>
              <option>{Thread.findTypeHtml}</option>
              <option>{Thread.findTypeMusic}</option>
              <option>{Thread.findTypeVideo}</option>
              <option>{Thread.findTypeOther}</option>
            </select>
            <Label htmlFor={'ch'} />
          </div>
        )}
      </header>
    );
  }
}
