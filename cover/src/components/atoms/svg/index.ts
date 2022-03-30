import { css } from 'styled-components';

import Checkmark from './Checkmark';
import Edit from './Edit';
import Reset from './Reset';
import Story from './Story';
import Tag from './Tag';
import User from './User';

export type IconType = 'Checkmark' | 'Edit' | 'Reset' | 'Tag' | 'User' | 'Story';

export const svgCss = css`
  width: 32px;
  height: 32px;
`;

export default {
  Checkmark,
  Edit,
  Reset,
  Tag,
  User,
  Story,
};
