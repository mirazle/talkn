import { HookProps, actions } from 'components/container/Thread/GlobalContext';
import { Type as BoolsType } from 'components/container/Thread/GlobalContext/hooks/bools';
import UiTimeMarker from 'components/container/Thread/UiTimeMarker';
import { layouts } from 'components/styles';

export type Type = number;
export const init: Type = 0;

export default ({ action, bools, doms, uiTimeMarker, state, setAction, setBools, setUiTimeMarker }: HookProps) => {
  const { app } = state;

  if (doms.posts) {
    const { scrollTop } = doms.posts;

    if (!app.isMediaCh && scrollTop === 0 && action === actions.neutral) {
      setAction(actions.apiRequestGetMore);
    } else {
      if (bools.finnishFetch) {
        // timeマーカーを更新する
        const reduceTop = -layouts.appHeaderHeight;
        const updateUiTimeMarker = UiTimeMarker.update(scrollTop - reduceTop, uiTimeMarker);
        setUiTimeMarker(updateUiTimeMarker);
      }
      // 最下位スクロール位置かを保持する
      // (Post時のnewPost表示か、最下位に慣性スクロールするかの判定に利用する)
      const isScrollBottom = getIsScrollBottom(doms.posts, bools);
      setBools({ ...bools, openNewPost: false, postsScrollBottom: isScrollBottom });
    }
  }
};

const getIsScrollBottom = (postsElm: HTMLElement, bools: BoolsType) => {
  if (bools.postsScrollingBottom) {
    return true;
  }

  if (postsElm) {
    const bufferHeight = postsElm.lastChild ? (postsElm.lastChild as HTMLElement).clientHeight : 0;

    // MEMO: スクロール中にPOSTを受信すると、Postsの高さが変化しているため、正しいIsScrollBottomを返せない。
    return postsElm.scrollTop + postsElm.clientHeight >= postsElm.scrollHeight - bufferHeight;
  }

  return false;
};
