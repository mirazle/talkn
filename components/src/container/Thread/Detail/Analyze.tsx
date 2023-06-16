import { css } from '@emotion/react';
import React from 'react';

import { DetailModeType, detailModeBar } from 'components/container/Thread//GlobalContext/hooks/detail/mode';
import { layouts } from 'components/styles';
import colors from 'components/styles/colors';

import { getBodyPaddingSide } from './';

import analyze from '../../../../public/analyze.svg';

type Props = {
  isModal: boolean;
  detailMode: DetailModeType;
};

const Component: React.FC<Props> = ({ isModal, detailMode }: Props) => {
  return (
    <div css={styles.container(isModal, detailMode)}>
      <img src={analyze} width="50%" />
      <span>Application Premium Plan.</span>
    </div>
  );
};

export default Component;
const styles = {
  container: (isModal: boolean, detailMode: DetailModeType) => css`
    overflow: hidden;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: ${getBodyPaddingSide(isModal, detailMode)}px ${detailMode === detailModeBar ? layouts.basePadding : layouts.doublePadding}px;
    gap: 24px;
    color: ${colors.fontColor};
    letter-spacing: 1px;

    span {
      display: ${detailMode === 'Bar' ? 'none' : 'block'};
    }
  `,
};
