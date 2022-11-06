export default (state = [], action) => {
  return action.type !== 'COMPONENT_DID_MOUNTS' ? [action.type, ...state] : state;
};
