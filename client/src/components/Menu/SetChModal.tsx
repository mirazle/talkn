import React from 'react';

import SearchBar from 'client/components/Menu/SearchBar';
import TalknComponent from 'client/components/TalknComponent';
import Icon from 'client/components/common/Icon';
import IconStyle from 'client/style/Icon';

type SetChModalProps = {
  state: any;
  mode?: string;
};

type SetChModalState = unknown;

export default class SetChModal extends TalknComponent<SetChModalProps, SetChModalState> {
  constructor(props) {
    super(props);
    this.componentName = 'SetChModal';
    this.state = { visible: true };
  }

  render() {
    const { state } = this.props;
    const { style, app, ui } = state;
    const IconClose = Icon.getClose(IconStyle.getCloseOptionModal({ app, ui }), { app, ui });
    return (
      <div data-component-name={this.componentName} style={style.setChModal.self}>
        <div data-component-name={`${this.componentName}.modalWrap`} style={style.setChModal.modalWrap}>
          <div data-component-name={`${this.componentName}.modal`} style={style.setChModal.modal}>
            <SearchBar editMode {...this.props} visibleTune />
            <br />
            <div style={style.setChModal.example}>example: https://www.talkn.io/</div>
            {/*
            <div style={style.setChModal.recommendTitle}>(Recommend)</div>
            <div style={style.setChModal.recommend}>
              <ul>
                <li style={style.setChModal.recommendLi}>https://www.talkn.io/</li>
                <li style={style.setChModal.recommendLi}>https://www.talkn.io/</li>
                <li style={style.setChModal.recommendLi}>https://www.talkn.io/</li>
                <li style={style.setChModal.recommendLi}>https://www.talkn.io/</li>
                <li style={style.setChModal.recommendLi}>https://www.talkn.io/</li>
              </ul>
            </div>
  */}
          </div>
          <div onClick={() => this.clientAction('TOGGLE_DISP_SET_CH_MODAL')}>{IconClose}</div>
        </div>
      </div>
    );
  }
}
