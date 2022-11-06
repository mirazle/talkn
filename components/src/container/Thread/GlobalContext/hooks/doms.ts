import { HookProps, actions } from 'components/container/Thread/GlobalContext';
import { generateUiTimeMarker } from 'components/container/Thread/GlobalContext/func';
import { Type as RefsType, init as refsInit } from 'components/container/Thread/GlobalContext/hooks/refs';

export type Type = { [key in keyof RefsType]: HTMLElement | null };

let preInit: Type | {} = {};
Object.keys(refsInit).forEach((key) => {
  preInit[key] = null;
});

export const init = preInit as Type;

export default (props: HookProps) => {
  const { action, bools, doms, scrollHeight, setAction, setBools } = props;
  const { screen, posts } = doms;

  if (posts) {
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
          if (!bools.postsScrollingBottom) {
            posts.scrollTo({ left: 0, top: Number.MAX_SAFE_INTEGER, behavior: 'smooth' });
            setBools({ ...bools, postsScrollingBottom: true });
            setTimeout(() => {
              setBools({ ...bools, postsScrollingBottom: false });
              setAction(actions.neutral);
            }, 400);
          }
        } else {
          if (bools.openNewPost === false) {
            setBools({ ...bools, openNewPost: true });
          }
        }
        break;
    }
  }
};
