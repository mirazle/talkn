import Schema from "api/store/Schema";

export default class Analyze extends Schema {
  constructor(params: any = {}) {
    super();
    const watchCnt = 0;
    return this.create({ watchCnt });
  }
}
