import { css } from '@emotion/react';
import React, { useRef, useState } from 'react';

import { Props as AppProps } from 'components/container/Thread/App';
import { Input } from 'components/container/Thread/FixedTools/TuneModal';
import { useGlobalContext, actions } from 'components/container/Thread/GlobalContext';
import Account from 'components/container/common/Account';
import User, { userInit } from 'components/model/User';
import { layouts, dropFilter, colors } from 'components/styles';
import animations from 'components/styles/animations';
import { getFixValuesEmpty } from 'components/utils/userTags';

import Content from './Content';

import { menuModeBar, menuModeNormal, menuModeSmall, menuModeInclude, MenuModeType } from '../GlobalContext/hooks/menu/mode';

type Props = AppProps & {
  myUser: User;
  isMyPage: boolean;
  transitionEndMenuMode: MenuModeType;
  setShowUserMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setMyUser: React.Dispatch<React.SetStateAction<User>>;
  setIsMyPage: React.Dispatch<React.SetStateAction<boolean>>;
  handleOnClickToggleTuneModal: () => void;
};

const Component: React.FC<Props> = ({
  api,
  state,
  root,
  myUser,
  transitionEndMenuMode,
  setShowUserMenu,
  setMyUser,
  setIsMyPage,
  handleOnClickToggleTuneModal,
}) => {
  const { bools, bootOption, menuMode, setAction } = useGlobalContext();
  const menuRef = useRef(null);

  const handleOnClickMenu = (ch: string) => {
    if (state.thread.ch !== ch) {
      setAction(actions.apiRequestChangeThread, { ch });
    }
  };

  return (
    <>
      <section className={'Menu'} css={styles.container(bools.openFooter, menuMode)}>
        <div css={styles.ch(bools.openFooter, menuMode)}>
          <Input api={api} state={state} bootOption={bootOption} root={root} handleOnClickToggleTuneModal={handleOnClickToggleTuneModal} />
        </div>
        <ol css={styles.ol(bools.openFooter, menuMode)} ref={menuRef}>
          <li className="MenuLi" css={styles.li}>
            {state.thread && (
              <Content
                key={`Tune`}
                isHighlight={state.thread.ch === state.tuneCh.ch}
                api={api}
                data={state.tuneCh}
                menuMode={menuMode}
                transitionEndMenuMode={transitionEndMenuMode}
                label="TUNE"
                handleOnClickMenu={handleOnClickMenu}
              />
            )}
          </li>
          {state.ranks.map((rank, i) => (
            <li className="MenuLi" key={`MenuList${i}`} css={styles.li}>
              <Content
                isHighlight={rank.ch === state.thread.ch}
                api={api}
                data={rank}
                menuMode={menuMode}
                transitionEndMenuMode={transitionEndMenuMode}
                label={String(i + 1)}
                handleOnClickMenu={handleOnClickMenu}
              />
            </li>
          ))}
        </ol>
      </section>
      <footer css={styles.footer(menuMode, transitionEndMenuMode)}>
        <Account myUser={myUser} setShowUserMenu={setShowUserMenu} setMyUser={setMyUser} setIsMyPage={setIsMyPage} />
        <div className="name">{myUser.name}</div>
      </footer>
    </>
  );
};

export default Component;

const styles = {
  container: (isOpenFooter: boolean, menuMode: MenuModeType) => css`
    overflow-x: hidden;
    overflow-y: scroll;
    display: flex;
    flex-flow: column nowrap;
    width: 320px;
    min-width: 320px;
    max-width: 320px;
    height: inherit;
    padding: ${layouts.blockHeight - 1}px 0 0;
    margin: 0;
    background: rgba(220, 220, 220, 1);
    border: 0;
    list-style: none;
    transform: translate(0px, 0px);
    @media (max-width: ${layouts.breakSpWidth}px) {
      width: 82px;
      min-width: 82px;
      max-width: 82px;
    }
  `,
  ch: (isOpenFooter: boolean, menuMode: MenuModeType) => css`
    overflow: hidden;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    ${getChHeight(menuMode)};
    padding: 0 16px 0 12px;
    background: rgb(245, 245, 245);
    transition: height ${animations.transitionDuration}ms, min-height ${animations.transitionDuration}ms,
      max-height ${animations.transitionDuration}ms;
  `,
  ol: (isOpenFooter: boolean, menuMode: MenuModeType) => css`
    padding: 0;
    margin: 0 0 ${layouts.blockHeight}px 0;
  `,
  li: css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  `,
  footer: (menuMode: MenuModeType, transitionEndMenuMode: MenuModeType) => css`
    position: fixed;
    bottom: 0px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 320px;
    min-width: 320px;
    max-width: 320px;
    height: ${layouts.blockHeight}px;
    gap: ${layouts.doubleSize}px;
    padding: ${layouts.basePadding}px ${layouts.basePadding}px ${layouts.basePadding}px ${layouts.doublePadding}px;
    border-top: 1px solid ${colors.borderColor};
    ${dropFilter.alphaBgSet};
    color: ${colors.fontColor};
    .name {
      display: ${getAccountNameDisplay(menuMode)};
      letter-spacing: 1px;
    }
    @media (max-width: ${layouts.breakSpWidth}px) {
      width: 82px;
      min-width: 82px;
      max-width: 82px;
      .name {
        display: none;
      }
    }
  `,
};

const getAccountNameDisplay = (menuMode: MenuModeType) => {
  switch (menuMode) {
    case menuModeNormal:
      return `flex`;
    case menuModeSmall:
    case menuModeBar:
    case menuModeInclude:
      return `none`;
  }
};

const getChHeight = (menuMode: MenuModeType) => {
  switch (menuMode) {
    case menuModeNormal:
      return css`
        height: 54px;
        min-height: 54px;
        max-height: 54px;
      `;
    case menuModeBar:
    case menuModeSmall:
      return css`
        height: 0;
        min-height: 0;
        max-height: 0;
      `;
  }
};
