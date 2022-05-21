import React from 'react';

import { boxLayoutPropsInit } from './entity/BoxLayout';
import { contentPropsInit } from './entity/Content';
import { Props } from './types';

export const flexLayoutPropsInit = {
  display: 'flex',
  flow: 'row nowrap',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
};

export const flexLayoutCenterPropsInit = {
  display: 'flex',
  flow: 'row nowrap',
  alignItems: 'center',
  justifyContent: 'center',
};

export const flexesPropsInit: Props = {
  children: <></>,
  ...boxLayoutPropsInit,
  ...flexLayoutPropsInit,
  ...contentPropsInit,
};
