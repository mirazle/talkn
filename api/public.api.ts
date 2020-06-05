export default class PublicApi {
  constructor(coreApi) {
    // tuneをしたら基本的にchをws.onした状態になり、chで更新(Broadcast)があれば、自動で設定した関数が呼ばれるようにする
    // find, postはEmit, Broadcastの完了を待ってcallbackを実行する
    return {
      version: "2020/06/04",
      isTune: false,
      tune: (ch: string, broadcastBack: Function) => coreApi.tune({ thread: { ch } }, broadcastBack),
      find: (ch: string, callback: Function) => coreApi.find({ thread: { ch } }, callback),
      post: (params = {}, callback: Function) => coreApi.post(params, callback),
      getState: () => coreApi.apiStore.getState(),
    };
  }
}
