import { css } from 'styled-components';

import styles from 'cover/styles';

import Checmmark from './Checmmark';
import Edit from './Edit';
import Reset from './Reset';
import Tag from './Tag';
import User from './User';

export type IconType = 'Checmmark' | 'Edit' | 'Reset' | 'Tag' | 'User';

export const svgCss = css`
  width: 32px;
  height: 32px;
`;

export default {
  Checmmark,
  Edit,
  Reset,
  Tag,
  User,
};
