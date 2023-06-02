export type MenusType = {
  key: string;
  label: string;
};

export const accountMenusMyMenu = 'myMenu';
export const accountMenusSelectAccount = 'selectAccount';
export const accountMenusLogout = 'logout';
export const accountMenus: MenusType[] = [
  { key: accountMenusMyMenu, label: 'MY PAGE' },
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
