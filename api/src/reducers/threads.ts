import Threads from 'api/store/Threads';

export default (state = new Threads(), action) => {
  return action.threads ? state.merge(action.threads) : state;
};
