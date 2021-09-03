import Analyze from 'api/store/Analyze';

export default (state = new Analyze(), action) => {
  return action.analyze ? state.merge(action.analyze) : state;
};
