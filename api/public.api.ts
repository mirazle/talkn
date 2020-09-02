export default class PublicApi {
  constructor(win) {
    const { api, store } = win;
    return {
      ver: "2020/06/04",
      tune: (ch: string, broadcastCallback: Function) => {
        console.log(ch);
        api("reconnect", { ch });
        /*
        api("onResponseChAPI", ch);
        api("tune", { thread: { ch } }, broadcastCallback);
        */
      },
      rank: (ch: string, emitCallback: Function) => {
        api("rank", { thread: { ch } }, emitCallback);
      },
      fetchPosts: (ch: string, emitCallback: Function) => {
        api("fetchPosts", { thread: { ch } }, emitCallback);
      },
      post: (params = {}, emitCallback: Function) => {
        api("post", params, emitCallback);
      },
      getState: () => store.getState(),
    };
  }
}
