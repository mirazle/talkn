import Posts from "common/schemas/state/Posts";
import conf from "common/conf";

export default (state: any = new Posts(), action) => {
  return action.postsMulti ? [...action.postsMulti] : state;
};
