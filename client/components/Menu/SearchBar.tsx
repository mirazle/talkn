import React from "react";
import Thread from "api/store/Thread";
import conf from "client/conf";
import TalknComponent from "client/components/TalknComponent";
import { Label } from "client/components/common";
import Icon from "client/components/common/Icon";

type Props = {
  state: any;
  onChangeFindType?: any;
  openMenuTransitionEnd?: any;
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
    if (nextProps.state.actionLog[0] === "API_TO_CLIENT[EMIT]:fetchPosts") {
      if (this.state.inputValue !== nextProps.state.thread.ch) {
        this.setState({ inputValue: nextProps.state.thread.ch });
      }
    }
  }
  
  render() {
    const { inputValue } = this.state;
    const { style, app, thread } = this.props.state;
    const { onChangeFindType, editMode = false, visibleTune = false, visibleExt = false} = this.props;
    const { icon } = style;
    const IconCh = Icon.getCh(icon.ch);
    const handleOnClick = () => {
      this.clientAction("TOGGLE_DISP_SET_CH_MODAL")
    };
    const tuneCh = (inputValue?: string) => {
      const _href = inputValue ? inputValue : this.state.inputValue;
      const href = _href.replace("https:/", "").replace("http:/", "");
      window.document.location.href = href;
    };
    const inputNode = editMode ? (
      <input
        type="text"
        value={inputValue}
        size={40}
        style={style.setChModal.input}
        placeholder="Input URL or Phrase"
        onChange={(e) => this.setState({ inputValue: e.target.value })}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            tuneCh();
          }
        }}
      ></input>
    ) : (
       <div onClick={handleOnClick} style={style.ranks.headerInput}>{inputValue}</div>
    );

    return (
      <header style={style.ranks.header}>
        <div onClick={handleOnClick} style={style.ranks.headerSearchIcon}>{IconCh}</div>
        {inputNode}
        {visibleTune && <a href={inputValue} style={style.ranks.tuneAnchor}><button onClick={() => tuneCh()} style={style.ranks.tuneButton}>TUNE</button></a>}
        {visibleExt &&
          <div style={style.ranks.headerUpdateIcon}>
            <select id="ch" onChange={onChangeFindType} style={style.ranks.headerFindSelect}>
              <option>{Thread.findTypeAll}</option>
              <option>{Thread.findTypeHtml}</option>
              <option>{Thread.findTypeMusic}</option>
              <option>{Thread.findTypeVideo}</option>
              <option>{Thread.findTypeOther}</option>
            </select>
            <Label htmlFor={"ch"} />
          </div>
        }
      </header>
    );
  }
};