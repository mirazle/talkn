import { combineReducers } from 'redux';

import { reducerFiles } from 'api/reducers';

import uiTimeMarker from 'client/reducers/uiTimeMarker';

import actionLog from './actionLog';
import componentDidMounts from './componentDidMounts';
import setting from './setting';
import style from './style';
import ui from './ui';

const apiReducers = {};
const someReudcer =
  (key: string) =>
  (state: any = {}, action: any) => {
    if (action[key]) {
      if (action[key].constructor.name === 'Array') {
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
