export default (state = {}, action: any) => {
  return action.bootOption ? { ...action.bootOption } : state;
};
