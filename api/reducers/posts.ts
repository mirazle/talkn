import Posts from "api/store/Posts";

export default (state = new Posts(), action) => {
  return action.posts ? new Posts(action.posts) : state;
};
