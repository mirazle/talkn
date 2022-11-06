import { css } from '@emotion/react';
import React from 'react';

import { layouts } from 'components/styles';

type Props = {
  icon: string;
  onClick?: () => void;
};

const Component: React.FC<Props> = ({ icon, onClick }: Props) => <span css={styles.container(icon)} onClick={onClick && onClick} />;

export default Component;

const partSize = layouts.blockHeight;
const styles = {
  container: (icon: string) => css`
    display: block;
    width: ${partSize}px;
    min-width: ${partSize}px;
    max-width: ${partSize}px;
    height: ${partSize}px;
    min-height: ${partSize}px;
    background-image: url(${icon});
    background-position: center center;
    background-size: 32px;
    background-repeat: no-repeat;
    cursor: pointer;
  `,
};
