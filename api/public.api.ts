export default class PublicApi {
  constructor(coreApi) {
    return {
      ver: "2020/06/04",
      tune: (ch: string, broadcastCallback: Function) => coreApi.tune({ thread: { ch } }, broadcastCallback),
      rank: (ch: string, emitCallback: Function) => coreApi.rank({ thread: { ch } }, emitCallback),
      fetchPosts: (ch: string, emitCallback: Function) => coreApi.fetchPosts({ thread: { ch } }, emitCallback),
      post: (params = {}, emitCallback: Function) => coreApi.post(params, emitCallback),
      getState: () => coreApi.apiStore.getState(),
    };
  }
}
