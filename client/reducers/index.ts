import { combineReducers } from "redux";
import ui from "./ui";
import setting from "./setting";
import { reducerFiles } from "api/reducers";
import uiTimeMarker from "client/reducers/uiTimeMarker";
import style from "./style";
import componentDidMounts from "./componentDidMounts";
import actionLog from "./actionLog";

const apiReducers = {};
const someReudcer = (key: string) => (state: any = {}, action: any) => {
  if (action[key]) {
    if (action[key].constructor.name === "Array") {
      return [...action[key]];
    } else {
      return { ...action[key] };
    }
  } else {
    return state;
  }
};
Object.keys(reducerFiles).forEach((key) => {
  apiReducers[key] = someReudcer(key);
});

const reducers = combineReducers({
  ui,
  uiTimeMarker,
  style,
  componentDidMounts,
  actionLog,
  setting,
  ...apiReducers,
});

export default reducers;
