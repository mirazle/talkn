import Ui from 'client/store/Ui';

export default (state = new Ui(), action) => {
  return action.ui ? state.merge(action.ui) : state;
};
