import Thread from 'api/store/Thread';

export default (state = new Thread({}, {}), action) => {
  switch (action.type) {
    case 'SETUPED_API_STORE':
    case 'SERVER_TO_API[EMIT]:tune':
    case 'SERVER_TO_API[EMIT]:changeThread':
    case 'SERVER_TO_API[EMIT]:fetchPosts':
    case 'SERVER_TO_API[EMIT]:updateThreadServerMetas':
      return new Thread(action.thread);
    case 'SERVER_TO_API[BROADCAST]:tune':
    case 'SERVER_TO_API[BROADCAST]:changeThread':
    case 'SERVER_TO_API[BROADCAST]:disconnect':
      // ユーザーが今現在、閲覧しているthreadの場合
      if (state.ch === action.thread.ch) {
        return action.thread ? state.merge(action.thread) : state;
      }
    case 'SERVER_TO_API[BROADCAST]:post':
      // ユーザーが今現在、閲覧しているthreadの場合
      if (state.ch === action.thread.ch) {
        return action.thread ? state.merge(action.thread) : state;
      }
  }
  return state;
};
