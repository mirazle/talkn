import MenuLogs from 'api/store/MenuLogs';

export default (state = new MenuLogs(), action) => {
  switch (action.type) {
    case 'SERVER_TO_API[EMIT]:fetchPosts':
      const isFetch = state.find((s) => s.ch === action.thread.lastPost.ch);
      return isFetch ? state : state.unshift(action.thread.lastPost);
    default:
      return action.menuLogs ? state.merge(action.menuLogs) : state;
  }
};
