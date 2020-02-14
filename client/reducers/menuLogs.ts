export default (state: any = [], action: any) => {
  return action.menuLogs ? { ...action.menuLogs } : state;
};
