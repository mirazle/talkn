import Schema from "common/schemas/Schema";

export default class MenuIndex extends Schema {
  constructor(params: any = []) {
    super();
    return this.create(params);
  }
}
