import Post from 'api/store/Post';

import { HookProps } from 'components/container/Thread/GlobalContext';

export type Type = Post;
export const init: Type = new Post();

export default ({}: HookProps) => {};
