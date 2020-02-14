export default (state = {}, action) => {
  return action.threadDetail ? { ...action.threadDetail } : state;
};
