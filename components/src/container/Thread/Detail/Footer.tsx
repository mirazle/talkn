import { css } from '@emotion/react';
import React, { useState } from 'react';

import { detailModeBar, DetailModeType } from 'components/container/Thread//GlobalContext/hooks/detail/mode';
import Flex from 'components/flexes';
import shadow from 'components/flexes/styles/shadow';
import { layouts } from 'components/styles';
import colors from 'components/styles/colors';
import dropFilter from 'components/styles/dropFilter';

import { detailMenuMeta, detailMenuAnalyze, detailMenuConfig } from './';

import analyze from '../../../../public/analyze.svg';
import config from '../../../../public/config.svg';
import meta from '../../../../public/meta.svg';

/****************
 * Footer
 ****************/
const barWidth = layouts.appMinWidth / 4;
type Props = {
  isModal: boolean;
  detailMode: DetailModeType;
  activeMenu: string;
  setActiveMenu: React.Dispatch<React.SetStateAction<string>>;
};

const Component: React.FC<Props> = ({ isModal, detailMode, activeMenu, setActiveMenu }) => {
  const handleOnScrollFooterMenu = ({ target }: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const screenElm = target as HTMLDivElement;
    const index = screenElm.scrollLeft / barWidth;

    if (Number.isInteger(index)) {
      let updateActiveMenu = detailMenuMeta;
      switch (index) {
        case 1:
          updateActiveMenu = detailMenuAnalyze;
          break;
        case 2:
          updateActiveMenu = detailMenuConfig;
          break;
      }
      setActiveMenu(updateActiveMenu);
    }
  };

  const handleOnClickFooterMenu = (_activeMenu) => {
    setActiveMenu(_activeMenu);
  };

  return (
    <footer css={styles.footer(isModal, detailMode, activeMenu)} onScroll={handleOnScrollFooterMenu}>
      <Flex
        className="meta"
        onClick={() => handleOnClickFooterMenu('meta')}
        alt={{ label: 'Meta', type: 'upper' }}
        alignItems="center"
        justifyContent="center">
        <img src={meta} alt={'Meta'} width={32} />
      </Flex>
      <Flex
        className="analyze"
        onClick={() => handleOnClickFooterMenu('analyze')}
        alt={{ label: 'Analyze', type: 'upper' }}
        alignItems="center"
        justifyContent="center">
        <img src={analyze} alt={'Analyze'} width={32} />
      </Flex>
      <Flex
        className="config"
        onClick={() => handleOnClickFooterMenu('config')}
        alt={{ label: 'Config', type: 'upper' }}
        alignItems="center"
        justifyContent="center">
        <img src={config} alt={'Config'} width={32} />
      </Flex>
    </footer>
  );
};

export default Component;

const tipSize = 16;

const styles = {
  footer: (isModal: boolean, detailMode: DetailModeType, activeMenu: string) => css`
    position: fixed;
    bottom: 0px;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-start;
    overflow-x: ${detailMode === detailModeBar ? 'scroll' : 'visible'};
    overflow-y: visible;
    width: 100%;
    height: ${layouts.blockHeight}px;
    color: ${colors.fontColor};
    border-top: 1px solid ${colors.borderColor};
    scroll-snap-type: x mandatory;

    ${getFooterMenu('meta', activeMenu, detailMode)};
    ${getFooterMenu('analyze', activeMenu, detailMode)};
    ${getFooterMenu('config', activeMenu, detailMode)};
  `,
};

const getFooterMenu = (menuType, activeMenu, detailMode) => {
  return `
      .${menuType} {
      flex: 1 1 auto;
      width: ${detailMode === detailModeBar ? `${barWidth}px` : 'auto'};
      min-width: ${detailMode === detailModeBar ? `${barWidth}px` : 'auto'};
      max-width: ${detailMode === detailModeBar ? `${barWidth}px` : 'auto'};
      height: inherit;
      scroll-snap-align: start;

      ${activeMenu === menuType ? dropFilter.alphaBgSet : dropFilter.alphaMenuUnactiveBgSet};
      &:hover {
        box-shadow: ${activeMenu === menuType ? 'none' : shadow.shadowDetailMenu};
      }
    }
  `;
};
