import { css } from '@emotion/react';
import React, { useEffect, useState } from 'react';

import {
  detailMenuMeta,
  detailMenuAnalyze,
  detailMenuConfig,
  detailMenuIndexList,
  DetailMenuType,
} from 'components/container/Thread//GlobalContext/hooks/detail/menu';
import { detailModeBar, detailModeExpand, DetailModeType } from 'components/container/Thread//GlobalContext/hooks/detail/transformMode';
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

type Props = {
  isModal: boolean;
  detailMenuIndex: number;
  footerRef: React.MutableRefObject<any>;
  setDetailMenuIndex: React.Dispatch<React.SetStateAction<number>>;
};

let scrollTimeout = null;

const Component: React.FC<Props> = ({ isModal, footerRef, detailMenuIndex, setDetailMenuIndex }) => {
  const { detailTransformMode: _detailTransformMode, detailMenu, bools, setDetailMenu } = useGlobalContext();
  const [detailTransformMode, setDetailTransformMode] = useState(_detailTransformMode);

  // alt
  const getAlt = (label) => {
    return detailTransformMode === detailModeExpand ? { ...{ alt: { label, type: 'upper' } } } : {};
  };

  const onScrollEnd = (index: number) => {
    scrollTimeout = null;

    if (!bools.detailTransforming) {
      setDetailMenuIndex(index);
    }
  };

  // HeaderでBarにした際にスクロールが実行される
  const handleOnScrollFooterMenu = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const screenElm = e.target as HTMLDivElement;

    const index = screenElm.scrollLeft / barWidth;

    if (Number.isInteger(index)) {
      setDetailMenu(detailMenuIndexList[index] as DetailMenuType);
    }

    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }

    scrollTimeout = setTimeout(() => onScrollEnd(index), 200);
  };

  const handleOnClickFooterMenu = (_detailMenu) => {
    const _detailMenuIndex = detailMenuIndexList.findIndex((detailMenu) => detailMenu === _detailMenu);

    setDetailMenuIndex(_detailMenuIndex);
    setDetailMenu(_detailMenu);
  };

  useEffect(() => {
    if (_detailTransformMode !== detailTransformMode) {
      setDetailTransformMode(_detailTransformMode);
    }
  }, [_detailTransformMode]);

  return (
    <footer ref={footerRef} css={styles.footer(isModal, detailTransformMode, detailMenu)} onScroll={handleOnScrollFooterMenu}>
      <Flex
        className="meta"
        onClick={() => handleOnClickFooterMenu(detailMenuMeta)}
        {...getAlt('Meta')}
        alignItems="center"
        justifyContent="center">
        <img src={meta} alt={'Meta'} width={32} />
      </Flex>
      <Flex
        className="analyze"
        onClick={() => handleOnClickFooterMenu(detailMenuAnalyze)}
        {...getAlt('Analyze')}
        alignItems="center"
        justifyContent="center">
        <img src={analyze} alt={'Analyze'} width={32} />
      </Flex>
      <Flex
        className="config"
        onClick={() => handleOnClickFooterMenu(detailMenuConfig)}
        {...getAlt('Config')}
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
    overflow-y: ${detailTransformMode === detailModeBar ? 'hidden' : 'visible'};
    width: 100%;
    height: ${layouts.blockHeight}px;
    color: ${colors.fontColor};
    border-top: 1px solid ${colors.borderColor};
    scroll-snap-type: x mandatory;

    ${getFooterMenu('meta', isModal, detailTransformMode, detailMenu)};
    ${getFooterMenu('analyze', isModal, detailTransformMode, detailMenu)};
    ${getFooterMenu('config', isModal, detailTransformMode, detailMenu)};
  `,
};

const getFooterMenu = (menuType, isModal, detailTransformMode, detailMenu) => {
  const widths = isModal
    ? ''
    : `
        width: ${detailTransformMode === detailModeBar ? `${barWidth}px` : 'auto'};
        min-width: ${detailTransformMode === detailModeBar ? `${barWidth}px` : 'auto'};
        max-width: ${detailTransformMode === detailModeBar ? `${barWidth}px` : 'auto'};
      `;

  return `
      .${menuType} {
        flex: 1 1 auto;
        ${widths};
        height: inherit;
        scroll-snap-align: start;

        ${detailMenu === menuType ? dropFilter.alphaBgSet : dropFilter.alphaMenuUnactiveBgSet};
        &:hover {
          box-shadow: ${detailMenu === menuType ? 'none' : shadow.shadowDetailMenu};
        }
      }
  `;
};
