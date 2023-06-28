import { css } from '@emotion/react';
import React, { useState, useRef } from 'react';

import layouts from 'components/styles/layouts';

export type Props = unknown;

const Component: React.FC<Props> = () => {
  return <span css={styles.container}>PREMIUM</span>;
};

export default Component;

const styles = {
  container: css`
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    background: deeppink;
    border-radius: 20px;
    height: 28px;
    padding: 0 16px;
    font-size: 50%;
  `,
};
