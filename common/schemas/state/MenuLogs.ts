import Schema from "common/schemas/Schema";

export default class MenuLogs extends Schema {
  constructor(params: any = []) {
    super();
    params = params ? params : [];
    return this.create(params);
  }
}
