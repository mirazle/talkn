import BootOption from 'api/store/BootOption';

export default (state = new BootOption(), action) => {
  return action.bootOption ? state.merge(action.bootOption) : state;
};
