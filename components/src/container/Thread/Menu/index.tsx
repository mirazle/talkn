import { css } from '@emotion/react';
import React, { useRef } from 'react';

import { Props as AppProps } from 'components/container/Thread/App';
import { useGlobalContext, actions } from 'components/container/Thread/GlobalContext';
import { Input } from 'components/container/Thread/Posts/FixedTools/TuneModal';
import { layouts } from 'components/styles';
import animations from 'components/styles/animations';

import Content from './Content';

import { menuModeBar, menuModeNormal, menuModeSmall, MenuModeType } from '../GlobalContext/hooks/menu/mode';

type Props = AppProps & {
  transitionEndMenuMode: MenuModeType;
};

const Component: React.FC<Props> = ({ api, state, bootOption, root, transitionEndMenuMode }) => {
  const { bools, menuMode, setAction } = useGlobalContext();
  const menuRef = useRef(null);

  const handleOnClickMenu = (ch: string) => {
    if (state.thread.ch !== ch) {
      setAction(actions.apiRequestChangeThread, { ch });
    }
  };

  return (
    <section className={'Menu'} css={styles.container(bools.openFooter, menuMode)}>
      <div css={styles.ch(bools.openFooter, menuMode)}>
        <Input api={api} state={state} bootOption={bootOption} root={root} />
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
    margin: 0;
  `,
  li: css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  `,
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