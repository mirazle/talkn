import { css } from '@emotion/react';

import Premium from 'components/container/common/Premium';

const styles = {
  myPage: css`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-start;
    gap: 16px;
  `,
};

export type MenusType = {
  key: string;
  label: React.ReactNode;
};

export const accountMenusMyMenu = 'myMenu';
export const accountMenusSelectAccount = 'selectAccount';
export const accountMenusLogout = 'logout';
export const accountMenus: MenusType[] = [
  {
    key: accountMenusMyMenu,
    label: (
      <div css={styles.myPage}>
        <span>MY PAGE</span>
        <Premium />
      </div>
    ),
  },
  { key: accountMenusSelectAccount, label: 'ACCOUNTS' },
  { key: accountMenusLogout, label: 'LOGOUT' },
];

export const articleOrderMenusMyBuild = 'build';
export const articleOrderMenusSelectTalk = 'talk';
export const articleOrderMenusLink = 'link';
export const articleOrderMenus: MenusType[] = [
  { key: articleOrderMenusMyBuild, label: 'build' },
  { key: articleOrderMenusSelectTalk, label: 'talkn' },
  { key: articleOrderMenusLink, label: 'site' },
];
