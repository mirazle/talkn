import BootOption from "common/BootOption";
export default class PublicApi {
  constructor(_win) {
    const { api, store } = _win;
    return {
      ver: "2020/09/05",
      useIo: (id: string) => api("use", id),
      tune: (bootOption: BootOption, callback?: Function) => api("tune", bootOption, callback),
      untune: (id) => api("untune", { id }),
      rank: (ch: string) => api("rank", { thread: { ch } }),
      fetchPosts: (ch: string) => api("fetchPosts", { thread: { ch } }),
      post: (params = {}) => api("post", { app: { ...params } }),
      getState: () => store.getState(),
    };
  }
}
