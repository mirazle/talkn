import Schema from "common/schemas/Schema";

export default class Threads extends Schema {
  constructor(params: any = {}) {
    super();
    return this.create(params);
  }

  static getMergedThreads(baseThreads, mergeThread) {
    baseThreads[mergeThread.connection] = { ...mergeThread };
    return baseThreads;
  }
}
