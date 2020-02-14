import Posts from "common/schemas/state/Posts";

export default (state: any = new Posts(), action) => {
  return action.postsSingle ? [...action.postsSingle] : state;
};
