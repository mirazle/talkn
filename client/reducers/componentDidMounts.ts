export default (state = new Array(), action) => {
  return action.componentDidMount ? { ...action.componentDidMount } : state;
};
