/*
import Style from "client/style/index";
export default (state: any = {}, action: any) => {
  return action.style ? new Style(action) : state;
};
*/
export default (state: any = {}, action: any) => {
  return action.style ? { ...action.style } : state;
};
