export default (state: any = [], action: any) => {
  return action.menuIndex ? action.menuIndex : state;
};
