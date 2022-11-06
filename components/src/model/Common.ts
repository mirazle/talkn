export default class CommonModel {
  toJson() {
    return JSON.parse(JSON.stringify(this));
  }
  isFilled() {
    return Boolean(Object.values(this).findIndex((value) => value === undefined || value === ''));
  }
}
