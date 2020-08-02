import Schema from "api/store/Schema";

export default class Analyze extends Schema {
  constructor(params: any = {}) {
    super();
    const liveCnt = 0;
    return this.create({ liveCnt });
  }
}
