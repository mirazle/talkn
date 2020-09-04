import BootOption from "common/BootOption";
export default class PublicApi {
  constructor(_win) {
    const { api, store } = _win;
    return {
      ver: "2020/06/04",
      use: (id: string) => {
        api("use", id);
      },
      tune: (bootOption: BootOption, broadcastCallback: Function) => {
        api("tune", bootOption);
        return true;
      },
      untune: (id, broadcastCallback: Function) => {
        api("untune", { id });
        return true;
      },
      rank: (ch: string, emitCallback: Function) => {
        api("rank", { thread: { ch } }, emitCallback);
        return true;
      },
      fetchPosts: (ch: string, emitCallback: Function) => {
        api("fetchPosts", { thread: { ch } }, emitCallback);
        return true;
      },
      post: (params = {}, emitCallback: Function) => {
        api("post", params, emitCallback);
        return true;
      },
      getState: () => store.getState(),
    };
  }
}
