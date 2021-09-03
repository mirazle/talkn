import Setting from 'api/store/Setting';

export default (state = new Setting(), action) => {
  return action.setting ? state.merge(action.setting) : state;
};
