import BootOption from 'common/BootOption';

export type PublicApiMethodsType = {
  [key: string]: Function | string;
};

export class PublicApi {
  constructor(_win) {
    const { api, store } = _win;
    const publicApiMethods: PublicApiMethodsType = {
      ver: '2021/02/01',
      on: (ch: string) => api('onResponseChAPI', ch),
      useIo: (id: string) => api('use', id),
      tune: (bootOption: BootOption, callback?: Function) => api('tune', bootOption, callback),
      untune: (id) => api('untune', { id }),
      rank: (ch: string) => api('rank', { thread: { ch } }),
      fetchPosts: (ch: string) => api('fetchPosts', { thread: { ch } }),
      post: (params = {}) => api('post', { app: { ...params } }),
      getState: () => store.getState(),
    };
    return publicApiMethods;
  }
}
