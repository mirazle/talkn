export type MenusType = {
  key: string;
  label: string;
};

export const articleOrderMenusMyBuild = 'build';
export const articleOrderMenusSelectTalk = 'talk';
export const articleOrderMenusLink = 'link';
export const articleOrderMenus: MenusType[] = [
  { key: articleOrderMenusMyBuild, label: 'build' },
  { key: articleOrderMenusSelectTalk, label: 'talkn' },
  { key: articleOrderMenusLink, label: 'site' },
];
