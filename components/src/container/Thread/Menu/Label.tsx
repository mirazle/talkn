import { css } from '@emotion/react';
import React from 'react';

import { colors } from 'components/styles';

import { menuModeInclude, menuModeNormal, MenuModeType } from '../GlobalContext/hooks/menu/mode';

type Props = {
  menuMode: MenuModeType;
  radius?: boolean;
  label?: string;
};

const Component: React.FC<Props> = ({ menuMode, radius = false, label = 'TUNE' }) => {
  return <label css={styles.container(menuMode, radius, label)}>{label === 'TUNE' ? 'TUNE' : `RANK${label}`}</label>;
};

export default Component;

const styles = {
  container: (menuMode: MenuModeType, radius: boolean, label: string) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    min-width: 56px;
    max-width: 56px;
    padding: 4px 8px;
    ${getLabelCss(menuMode, label)};
    border-radius: ${radius ? '20px' : '0 20px 20px 0'};
    font-size: 50%;
    color: ${colors.whiteColor};
    text-indent: ${radius ? '2px' : '0px'};
    user-select: none;
  `,
};

const ranks = [colors.rank1Color, colors.rank2Color, colors.rank3Color];
const getLabelCss = (menuMode: MenuModeType, label: string) => {
  const labelNumber = Number(label);
  let background;
  if (labelNumber >= 1 && labelNumber <= 3) {
    background = ranks[labelNumber - 1];
  } else if (label === 'TUNE') {
    background = colors.themeColor;
  } else {
    background = colors.otherRankColor;
  }

  switch (menuMode) {
    case menuModeNormal:
    case menuModeInclude:
      return css`
        margin-right: 0;
        background: ${background};
        transition: 0ms;
      `;
    default:
      return css`
        margin-right: 0;
        background: ${background};
        transition: 0ms;
      `;
  }
};
