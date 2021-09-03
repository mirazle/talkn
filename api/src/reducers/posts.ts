import Post from 'api/store/Post';
import Posts from 'api/store/Posts';

export default (state: Post[] = [], action) => {
  return action.posts ? new Posts(action.posts) : state;
};
