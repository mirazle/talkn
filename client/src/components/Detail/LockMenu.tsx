import React from 'react';

import Sequence from 'common/Sequence';
import Ui from 'common/clientState/store/Ui';
import conf from 'common/conf';

import TalknComponent from 'client/components/TalknComponent';
import Icon from 'client/components/common/Icon';
import Container from 'client/style/Container';
import { default as LockMenuStyle } from 'client/style/LockMenu';
import Style from 'client/style/index';

type LockMenuProps = {
  state: any;
  onClickOpenLockMenu?: any;
};

type LockMenuState = {
  style: any;
};
const icon = new Icon();

export default class LockMenu extends TalknComponent<LockMenuProps, LockMenuState> {
  getDecolationProps1(type) {
    return {
      onMouseOver: () => {
        if (type === 'liEmbed') {
          const input = document.getElementById('Id') as HTMLInputElement;
          if (input) {
            input.select();
          }
        }
        this.setState({
          style: {
            ...this.state.style,
            [type]: {
              ...this.state.style[type],
              color: Container.whiteRGBA,
              background: Container.getLightThemeRGBA(0.96),
            },
          },
        });
      },
      onMouseLeave: () => {
        if (type === 'liEmbed') {
          document.getSelection().empty();
        }
        this.setState({
          style: {
            ...this.state.style,
            [type]: {
              ...this.state.style[type],
              color: Style.fontBaseRGB,
              background: Container.whiteRGBA,
              transform: 'scale( 1 )',
            },
          },
        });
      },
      onMouseDown: () => {
        this.setState({
          style: {
            ...this.state.style,
            [type]: {
              ...this.state.style[type],
              transition: '200ms',
              transform: 'scale( 1.05 )',
            },
          },
        });
      },
      onMouseUp: () => {
        this.setState({
          style: {
            ...this.state.style,
            [type]: {
              ...this.state.style[type],
              transition: '200ms',
              transform: 'scale( 1 )',
            },
          },
        });
      },
    };
  }

  getDecolationPropsEmbed() {
    return {
      onMouseOver: () => {
        this.setState({
          style: {
            ...this.state.style,
            liEmbed: {
              ...this.state.style.liEmbed,
              color: Container.whiteRGBA,
              background: Container.themeRGBA,
            },
          },
        });
      },
      onMouseLeave: () => {
        this.setState({
          style: {
            ...this.state.style,
            liEmbed: {
              ...this.state.style.liEmebed,
              color: Style.fontBaseRGB,
              background: Container.whiteRGBA,
              transform: 'scale( 1 )',
            },
          },
        });
      },
      onMouseDown: () => {
        this.setState({
          style: {
            ...this.state.style,
            liEmbed: {
              ...this.state.style.liEmbed,
              transition: '200ms',
              transform: 'scale( 1.05 )',
            },
          },
        });
      },
      onMouseUp: () => {
        this.setState({
          style: {
            ...this.state.style,
            liEmbed: {
              ...this.state.style.liEmbed,
              transition: '200ms',
              transform: 'scale( 1 )',
            },
          },
        });
      },
    };
  }

  constructor(props) {
    super(props);
    this.componentName = 'LockMenu';
    const { lockMenu: style } = props.state.style;
    this.state = { style };
    this.getDecolationProps1 = this.getDecolationProps1.bind(this);
    this.handleOnClickToWeb = this.handleOnClickToWeb.bind(this);
    this.handleOnClickToTalkn = this.handleOnClickToTalkn.bind(this);
  }

  handleOnClickToWeb() {
    const { threadDetail } = this.props.state;
    if (threadDetail.protocol === Sequence.TALKN_PROTOCOL) {
      // @ts-ignore.
      location.href = threadDetail.ch;
    } else {
      // @ts-ignore.
      location.href = threadDetail.protocol + '/' + threadDetail.ch;
    }
  }

  handleOnClickToTalkn() {
    const { threadDetail } = this.props.state;
    // @ts-ignore.
    location.href = `//${conf.domain}${threadDetail.ch}`;
  }

  render() {
    const { state } = this;
    const { style: stateStyle } = state;
    const { onClickOpenLockMenu } = this.props;
    const { app, ui, style, threadDetail } = this.props.state;
    const sizePx = Icon.middleSize;

    const IconHeadTab = Icon.getHeadTab(LockMenuStyle.getHeadTabUpdate({ app, ui }), this.props.state);
    const IconTwitter = Icon.getTwitter(state, {}, { sizePx });
    const IconFacebook = Icon.getFacebook(state, {}, { sizePx });
    const IconTalkn = Icon.getTalkn({}, state, { sizePx });
    return (
      <div data-component-name={'LockMenu'} style={style.lockMenu.menuShare}>
        <header style={style.lockMenu.header} onClick={() => onClickOpenLockMenu(Ui.openLockMenuLabelNo)}>
          SHARE
          {IconHeadTab}
        </header>
        <ul style={style.lockMenu.ul}>
          <li style={stateStyle.liTwitter} onClick={() => this.clientAction('OPEN_INNER_NOTIF')} {...this.getDecolationProps1('liTwitter')}>
            {IconTwitter}
            <div style={style.lockMenu.shareLabel}>Twitter</div>
          </li>
          <li
            style={stateStyle.liFacebook}
            onClick={() => this.clientAction('OPEN_INNER_NOTIF')}
            {...this.getDecolationProps1('liFacebook')}>
            {IconFacebook}
            <div style={style.lockMenu.shareLabel}>Facebook</div>
          </li>
          <li
            style={stateStyle.liEmbed}
            onClick={() => {
              const Input = document.querySelector('[data-component-share-input]') as HTMLInputElement;
              Input.select();
              document.execCommand('copy');
              this.clientAction('OPEN_INNER_NOTIF', { ui: { openInnerNotif: 'Success copy script tag.' } });
            }}
            {...this.getDecolationProps1('liEmbed')}>
            {IconTalkn}
            <div style={style.lockMenu.shareLabel}>
              <label style={style.lockMenu.label}>
                <input
                  data-component-share-input
                  type="text"
                  style={stateStyle.liEmbedInput}
                  readOnly={true}
                  value={`<script type="text/javascript" async src='//${conf.extURL}${threadDetail.ch}'></script>`}
                />
              </label>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}
