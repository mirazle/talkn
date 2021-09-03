export default (state = [], action) => {
  if (action.componentDidMounts && typeof action.componentDidMounts === 'string') {
    state.push(action.componentDidMounts);
  }
  return state;
};
