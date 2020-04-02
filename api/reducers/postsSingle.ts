import PostsSingle from "api/store/PostsSingle";

export default (state: any = new PostsSingle(), action) => {
  switch (action.type) {
    case "ON_CLICK_MULTISTREAM":
      return action.postsSingle;
    case "API_TO_SERVER[REQUEST]:changeThread":
      return new PostsSingle();
    case "SERVER_TO_API[EMIT]:find":
    case "SERVER_TO_API[BROADCAST]:post":
      if (action.postsSingle && action.postsSingle.length > 0) {
        return [...state, ...action.postsSingle];
      }
      break;
    case "SERVER_TO_API[EMIT]:getMore":
      if (action.postsSingle && action.postsSingle.length > 0) {
        return [...action.postsSingle, ...state];
      }
      break;
  }
  return state;
};
