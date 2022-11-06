export const selectContentMenuLivePages = 'livePages';
export const selectContentMenuCreators = 'stories';
export const selectContentMenuConfig = 'config';
export const selectContentMenuBusiness = 'business';
export const selectContentMenuStories = 'stories';
export const selectContentMenuUsers = 'users';
export const selectContentMenuDefault = selectContentMenuBusiness;
export type SelectContentMenuType =
  | typeof selectContentMenuLivePages
  | typeof selectContentMenuBusiness
  | typeof selectContentMenuStories
  | typeof selectContentMenuUsers
  | typeof selectContentMenuLivePages
  | typeof selectContentMenuCreators
  | typeof selectContentMenuConfig;
