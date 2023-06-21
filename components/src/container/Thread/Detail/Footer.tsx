import { css } from '@emotion/react';
import React, { useEffect, useState } from 'react';

import {
  detailMenuMeta,
  detailMenuAnalyze,
  detailMenuConfig,
  detailMenuIndexList,
  DetailMenuType,
} from 'components/container/Thread//GlobalContext/hooks/detail/menu';
import { detailModeBar, DetailModeType } from 'components/container/Thread//GlobalContext/hooks/detail/transformMode';
import { useGlobalContext } from 'components/container/Thread/GlobalContext';
import Flex from 'components/flexes';
import shadow from 'components/flexes/styles/shadow';
import { layouts } from 'components/styles';
import colors from 'components/styles/colors';
import dropFilter from 'components/styles/dropFilter';

import analyze from '../../../../public/analyze.svg';
import config from '../../../../public/config.svg';
import meta from '../../../../public/meta.svg';

/****************
 * Footer
 ****************/
const barWidth = layouts.appMinWidth / 4;

console.log(barWidth);
type Props = {
  isModal: boolean;
};

let scrollTimeout = null;

const Component: React.FC<Props> = ({ isModal }) => {
  const { detailTransformMode: _detailTransformMode, detailMenu, setDetailMenu } = useGlobalContext();
  const [detailTransformMode, setDetailTransformMode] = useState(_detailTransformMode);
  const [detailMenuIndex, setDetailMenuIndex] = useState(0);
  const [isStopScroll, setIsStopScroll] = useState(false);

  const onScrollEnd = (index: number, screenElm: HTMLDivElement) => {
    scrollTimeout = null;
    setIsStopScroll(false);
    setDetailMenu(detailMenuIndexList[index] as DetailMenuType);
    setDetailMenuIndex(index);

    if (detailTransformMode === detailModeBar) {
      screenElm.scrollTo(index * barWidth, 0);
    }
  };

  // HeaderでBarにした際にスクロールが実行される
  const handleOnScrollFooterMenu = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const screenElm = e.target as HTMLDivElement;

    if (isStopScroll) {
      setDetailMenu(detailMenuIndexList[detailMenuIndex] as DetailMenuType);
      screenElm.scrollTo(detailMenuIndex * barWidth, 0);
      e.preventDefault();
    } else {
      const index = isStopScroll ? detailMenuIndex : screenElm.scrollLeft / barWidth;

      if (Number.isInteger(index)) {
        // console.log('SCROLL', index, detailMenuIndexList[index]);
        setDetailMenu(detailMenuIndexList[index] as DetailMenuType);
        setDetailMenuIndex(index);
      }

      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      scrollTimeout = setTimeout(() => onScrollEnd(index, screenElm), 200);
    }
  };

  useEffect(() => {
    if (_detailTransformMode !== detailTransformMode) {
      setIsStopScroll(_detailTransformMode === detailModeBar);
      setDetailTransformMode(_detailTransformMode);
    }
  }, [_detailTransformMode]);

  const handleOnClickFooterMenu = (_detailMenu) => {
    const _detailMenuIndex = detailMenuIndexList.findIndex((detailMenu) => detailMenu === _detailMenu);
    setDetailMenuIndex(_detailMenuIndex);
    setDetailMenu(_detailMenu);
  };

  return (
    <footer
      css={styles.footer(isModal, detailTransformMode, detailMenu)}
      onScroll={handleOnScrollFooterMenu}
      onTransitionEnd={() => {
        console.log('FOOTER end');
      }}>
      <Flex
        className="meta"
        onClick={() => handleOnClickFooterMenu(detailMenuMeta)}
        alt={{ label: 'Meta', type: 'upper' }}
        alignItems="center"
        justifyContent="center">
        <img src={meta} alt={'Meta'} width={32} />
      </Flex>
      <Flex
        className="analyze"
        onClick={() => handleOnClickFooterMenu(detailMenuAnalyze)}
        alt={{ label: 'Analyze', type: 'upper' }}
        alignItems="center"
        justifyContent="center">
        <img src={analyze} alt={'Analyze'} width={32} />
      </Flex>
      <Flex
        className="config"
        onClick={() => handleOnClickFooterMenu(detailMenuConfig)}
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
  footer: (isModal: boolean, detailTransformMode: DetailModeType, detailMenu: string) => css`
    position: fixed;
    bottom: 0px;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-start;
    overflow-x: ${detailTransformMode === detailModeBar ? 'scroll' : 'visible'};
    overflow-y: visible;
    width: 100%;
    height: ${layouts.blockHeight}px;
    color: ${colors.fontColor};
    border-top: 1px solid ${colors.borderColor};
    scroll-snap-type: x mandatory;

    ${getFooterMenu('meta', detailMenu, detailTransformMode)};
    ${getFooterMenu('analyze', detailMenu, detailTransformMode)};
    ${getFooterMenu('config', detailMenu, detailTransformMode)};
  `,
};

const getFooterMenu = (menuType, detailMenu, detailTransformMode) => {
  return `
      .${menuType} {
      flex: 1 1 auto;
      width: ${detailTransformMode === detailModeBar ? `${barWidth}px` : 'auto'};
      min-width: ${detailTransformMode === detailModeBar ? `${barWidth}px` : 'auto'};
      max-width: ${detailTransformMode === detailModeBar ? `${barWidth}px` : 'auto'};
      height: inherit;
      scroll-snap-align: start;

      ${detailMenu === menuType ? dropFilter.alphaBgSet : dropFilter.alphaMenuUnactiveBgSet};
      &:hover {
        box-shadow: ${detailMenu === menuType ? 'none' : shadow.shadowDetailMenu};
      }
    }
  `;
};
