import Schema from 'common/Schema';

export default class BootOption extends Schema {
  constructor(bootOption: any = {}) {
    super();
    return this.create({ ...bootOption });
  }

  static rebuildAttributes(attributes) {
    let rebuildAttributesObj: any = {};
    Object.keys(attributes).forEach((i) => {
      rebuildAttributesObj[attributes[i].name] = attributes[i].value;
    });
    return rebuildAttributesObj;
  }
}
