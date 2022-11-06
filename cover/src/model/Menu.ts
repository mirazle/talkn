export type MenusType = {
  key: string;
  label: string;
};

export const AccountMenusMyMenu = 'myMenu';
export const AccountMenusSelectAccount = 'selectAccount';
export const AccountMenusLogout = 'logout';
export const AccountMenus: MenusType[] = [
  { key: AccountMenusMyMenu, label: 'MY PAGE' },
  { key: AccountMenusSelectAccount, label: 'ACCOUNTS' },
  { key: AccountMenusLogout, label: 'LOGOUT' },
];
