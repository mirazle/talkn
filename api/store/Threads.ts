import Schema from "api/store/Schema";

export default class Threads extends Schema {
    constructor(params: any = {}) {
    super();
    return this.create(params);
  }

  static getMergedThreads(baseThreads, mergeThread) {
    baseThreads[mergeThread.ch] = { ...mergeThread };
    return baseThreads;
  }
}
