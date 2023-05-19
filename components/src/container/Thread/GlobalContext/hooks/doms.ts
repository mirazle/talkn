import { HookProps, actions } from 'components/container/Thread/GlobalContext';
import { generateUiTimeMarker } from 'components/container/Thread/GlobalContext/func';

export const dataset = {
  'stamp-id': 'stampid',
} as const;

export type Type = {
  screen: HTMLElement | null;
  footer: HTMLElement | null;
  posts: HTMLElement | null;
  postTextarea: HTMLTextAreaElement | null;
  tuneInput: HTMLInputElement | null;
  timelines: { [key: string]: HTMLElement };
  menu: HTMLElement | null;
  detail: HTMLElement | null;
};

export const init: Type = {
  screen: null,
  footer: null,
  posts: null,
  postTextarea: null,
  tuneInput: null,
  timelines: {},
  menu: null,
  detail: null,
};

export default (props: HookProps) => {
  const { state, action, bools, doms, scrollHeight, setAction, setBools } = props;
  const { screen, posts } = doms;
  // console.log('doms', action);
  // if (screen && posts) {
  switch (action) {
    case actions.apiResponseFetch:
      posts.scrollTo(0, posts.scrollHeight);
      screen.scrollTo(screen.scrollWidth, 0);
      generateUiTimeMarker(props);
      setAction(actions.neutral);

      break;
    case actions.apiResponseGetMore:
      const top = posts.scrollHeight - scrollHeight;
      posts.scrollTo({ left: 0, top });
      generateUiTimeMarker(props, actions.neutral);
      break;
    case actions.apiResponsePost:
      if (bools.postsScrollBottom) {
        posts.scrollTo({ left: 0, top: Number.MAX_SAFE_INTEGER, behavior: 'smooth' });
        setBools({ ...bools, postsScrollingBottom: true });
        setTimeout(() => {
          setBools({ ...bools, postsScrollingBottom: false });
          setAction(actions.neutral);
        }, 1000);
      } else {
        if (doms.posts.clientHeight < doms.posts.scrollHeight) {
          setBools({ ...bools, openNewPost: true });
        }
      }
      break;
    case actions.apiResponseChangeThread:
      const bottomTop = Number.MAX_SAFE_INTEGER;

      posts.scrollTo({ left: 0, top: bottomTop });
      generateUiTimeMarker(props);
      setAction(actions.neutral);
      break;
    case actions.nextPostsTimeline:
      if (bools.postsScrollBottom) {
        posts.scrollTo({ left: 0, top: Number.MAX_SAFE_INTEGER, behavior: 'smooth' });
        setBools({ ...bools, postsScrollingBottom: true });
        setTimeout(() => {
          setBools({ ...bools, postsScrollingBottom: false });
          setAction(actions.neutral);
        }, 400);
      } else {
        if (bools.openNewPost === false) {
          setBools({ ...bools, openNewPost: true });
        }
      }
      break;
  }
  // }
};
