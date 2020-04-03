import { combineReducers } from "redux";
import ui from "./ui";
import setting from "./setting";
import uiTimeMarker from "client/reducers/uiTimeMarker";
import style from "./style";
import componentDidMounts from "./componentDidMounts";
import actionLog from "./actionLog";

const reducers = combineReducers({
  ui,
  uiTimeMarker,
  style,
  componentDidMounts,
  actionLog,
  setting
});

export default reducers;
