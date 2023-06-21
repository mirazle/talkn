import { css } from '@emotion/react';
import React from 'react';

import { DetailModeType, detailModeBar } from 'components/container/Thread//GlobalContext/hooks/detail/transformMode';
import { layouts } from 'components/styles';
import colors from 'components/styles/colors';

import { getBodyPaddingSide } from './';

import config from '../../../../public/config.svg';

type Props = {
  isModal: boolean;
  detailTransformMode: DetailModeType;
};

const Component: React.FC<Props> = ({ isModal, detailTransformMode }: Props) => {
  return (
    <div css={styles.container(isModal, detailTransformMode)}>
      <img src={config} width="50%" alt="Put talkn.config.json in your domain root." />
      <span>
        Put talkn.config.json
        <br /> in your domain root.
      </span>
    </div>
  );
};

export default Component;
const styles = {
  container: (isModal: boolean, detailTransformMode: DetailModeType) => css`
    overflow: hidden;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: ${getBodyPaddingSide(isModal, detailTransformMode)}px
      ${detailTransformMode === detailModeBar ? layouts.basePadding : layouts.doublePadding}px;
    gap: 24px;
    color: ${colors.fontColor};
    letter-spacing: 1px;

    span {
      display: ${detailTransformMode === detailModeBar ? 'none' : 'block'};
    }
  `,
};
