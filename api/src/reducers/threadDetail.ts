import Thread from 'api/store/Thread';

export default (state = new Thread({}, {}), action) => {
  return action.threadDetail ? state.merge(action.threadDetail) : state;
};
