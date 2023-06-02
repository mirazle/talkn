import { css } from 'styled-components';

import Edit from './Edit';
import Google from './Google';
import Reset from './Reset';
import User from './User';

export type IconType = 'Checkmark' | 'Edit' | 'Google' | 'Reset' | 'Tag' | 'User' | 'Story' | 'Notif' | 'Close' | 'Loarding';

export const svgCss = css`
  width: 32px;
  height: 32px;
`;

export default {
  Edit,
  Google,
  Reset,
  User,
};
