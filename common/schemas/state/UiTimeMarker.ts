import Schema from "common/schemas/Schema";
import TimeMarker, { default as TimeMarkerStyle } from "client/style/TimeMarker";
import ui from "client/reducers/ui";

type uiTimeMarkerObject = {
  index: number;
  offsetTop: number;
  label: string;
};

const initUiTimeMarkerObject: uiTimeMarkerObject = {
  index: 0,
  offsetTop: 0,
  label: ""
};

export default class UiTimeMarker extends Schema {
  public list: [uiTimeMarkerObject] | [] = [];
  public now: uiTimeMarkerObject = { ...initUiTimeMarkerObject };
  public before: uiTimeMarkerObject = { ...initUiTimeMarkerObject };
  public after: uiTimeMarkerObject = { ...initUiTimeMarkerObject };
  constructor(params: any = {}) {
    super();
    const list = params && params.list ? params.list : [];
    const now = params && params.now ? params.now : { ...initUiTimeMarkerObject };
    const before = params && params.before ? params.before : { ...initUiTimeMarkerObject };
    const after = params && params.after ? params.after : { ...initUiTimeMarkerObject };
    return this.create({
      list,
      now,
      before,
      after
    });
  }

  public static generate(scrollTop = 0, timeMarkers) {
    const timeMarkerSize = timeMarkers.length;
    let list = [];
    let now = { ...initUiTimeMarkerObject };
    let before = { ...initUiTimeMarkerObject };
    let after = { ...initUiTimeMarkerObject };
    if (timeMarkerSize > 0) {
      const scrollBaseTop = TimeMarkerStyle.getSelfMarginTop() + scrollTop;

      timeMarkers.forEach((timeMarker, index) => {
        if (now.label === "" && scrollBaseTop <= timeMarker.offsetTop) {
          now.index = index;
          now.label = timeMarker.textContent;
          now.offsetTop = timeMarker.offsetTop;
          if (timeMarkers[index - 1]) {
            before.index = now.index - 1;
            before.label = timeMarkers[index - 1].textContent;
            before.offsetTop = timeMarkers[index - 1].offsetTop;
          } else {
            before = { ...now };
          }
          if (timeMarkers[index + 1]) {
            after.index = now.index + 1;
            after.label = timeMarkers[index + 1].textContent;
            after.offsetTop = timeMarkers[index + 1].offsetTop;
          } else {
            after = { ...now };
          }
        }
        const addList: uiTimeMarkerObject = {
          index,
          offsetTop: timeMarker.offsetTop,
          label: timeMarker.textContent
        };
        list.push(addList);
      });

      if (now.label === "") {
        now.index = timeMarkerSize - 1;
        now.label = timeMarkers[now.index].textContent;
        now.offsetTop = timeMarkers[now.index].offsetTop;
        before = { ...now };
        after = { ...now };
        if (timeMarkers[now.index - 1]) {
          before.index = timeMarkers[now.index - 1] ? now.index - 1 : now.index;
          before.label = timeMarkers[now.index - 1] ? timeMarkers[now.index - 1].textContent : now.label;
          before.offsetTop = timeMarkers[now.index - 1] ? timeMarkers[now.index - 1].offsetTop : now.offsetTop;
        }
        if (timeMarkers[now.index + 1]) {
          after.index = timeMarkers[now.index + 1] ? now.index + 1 : now.index;
          after.label = timeMarkers[now.index + 1] ? timeMarkers[now.index + 1].textContent : now.label;
          after.offsetTop = timeMarkers[now.index + 1] ? timeMarkers[now.index + 1].offsetTop : now.offsetTop;
        }
      }
    }
    return { list, now, before, after };
  }

  public static update(scrollTop = 0, uiTimeMarker) {
    let list = uiTimeMarker.list;
    let now = uiTimeMarker.now;
    let before = uiTimeMarker.before;
    let after = uiTimeMarker.after;
    const listCnt = list.length;

    if (listCnt > 0) {
      const scrollBaseTop = TimeMarkerStyle.getSelfMarginTop() + scrollTop;

      // Most bottom scroll area.
      if (now.index === listCnt - 1) {
        // 一つ上のスクロール領域に移動
        if (scrollBaseTop < now.offsetTop) {
          after = now;
          now = before;
          before = list[before["index"] - 1] ? list[before["index"] - 1] : before;
        }

        // Most top scroll area.
      } else if (now.index === 0) {
        // 一つ下のスクロール領域に移動
        if (after.offsetTop <= scrollBaseTop) {
          before = list[now.index];
          now = list[now.index + 1];
          after = list[after.index + 1] ? list[after.index + 1] : after;
        }
        //一番後方、一番前方ではないスクロール領域
      } else {
        // 通常スクロール
        if (now.offsetTop <= scrollBaseTop && scrollBaseTop < after.offsetTop) {
        } else {
          // 一つ上のスクロール領域に移動
          if (scrollBaseTop < now.offsetTop) {
            before = list[before.index - 1] ? list[before.index - 1] : before;
            now = list[now.index - 1] ? list[now.index - 1] : now;
            after = list[after.index - 1];
          }
          // 一つ下のスクロール領域に移動
          if (after.offsetTop <= scrollBaseTop) {
            before = list[before.index + 1];
            now = list[now.index + 1] ? list[now.index + 1] : now;
            after = list[after.index + 1] ? list[after.index + 1] : after;
          }
        }
      }
    }
    return { list, now, before, after };
  }
}
