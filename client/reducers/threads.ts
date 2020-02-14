export default (state = {}, action: any) => {
  return action.threads ? { ...action.threads } : state;
};
