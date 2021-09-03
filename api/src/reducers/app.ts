import App from 'api/store/App';

export default (state = new App(), action) => {
  return action.app ? new App(action.app) : state;
};
