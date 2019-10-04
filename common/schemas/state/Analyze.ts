import Schema from "common/schemas/Schema";

export default class Analyze extends Schema {
  constructor(params: any = {}) {
    super();
    const watchCnt = 0;
    return this.create({ watchCnt });
  }
}
