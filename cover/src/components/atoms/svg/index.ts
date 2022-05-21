import { css } from 'styled-components';

import Checkmark from './Checkmark';
import Close from './Close';
import Edit from './Edit';
import Google from './Google';
import Loarding from './Loarding';
import Notif from './Notif';
import Reset from './Reset';
import Story from './Story';
import Tag from './Tag';
import User from './User';

export type IconType = 'Checkmark' | 'Edit' | 'Google' | 'Reset' | 'Tag' | 'User' | 'Story' | 'Notif' | 'Close' | 'Loarding';

export const svgCss = css`
  width: 32px;
  height: 32px;
`;

export default {
  Checkmark,
  Edit,
  Google,
  Reset,
  Tag,
  User,
  Story,
  Notif,
  Close,
  Loarding,
};
