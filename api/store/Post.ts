import Schema from "api/store/Schema";
export default class Post extends Schema {
  static get defaultFindId() {
    return "000000000000000000000000";
  }

  constructor(params: any = {}) {
    super();
    return this.create({});
  }
}
