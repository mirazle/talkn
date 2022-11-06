import { css } from '@emotion/react';
import React from 'react';

import { layouts } from 'components/styles';
import colors from 'components/styles/colors';

type Props = {
  children: React.ReactNode;
  className?: string;
  bgAlpha?: boolean;
};

const Component: React.FC<Props> = ({ className = 'LiveCnt', bgAlpha = false, children }) => {
  return <div css={styles.liveCnt}>{children}</div>;
};

export default Component;

const size = layouts.articleHeaderSideSize;
const styles = {
  liveCnt: css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    min-width: 30px;
    max-width: 30px;
    height: 30px;
    min-height: 30px;
    max-height: 30px;
    background: ${colors.themeColor};
    color: #fff;
    font-size: 12px;
    border-radius: 50%;
  `,
};
