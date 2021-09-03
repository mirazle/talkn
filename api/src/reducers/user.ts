import User from 'api/store/User';

export default (state = new User(), action) => {
  return action.user ? state.merge(action.user) : state;
};
