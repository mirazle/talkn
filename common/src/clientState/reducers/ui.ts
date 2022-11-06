import Ui from 'common/clientState/store/Ui';

export default (state = new Ui(), action) => {
  return action.ui ? state.merge(action.ui) : state;
};
