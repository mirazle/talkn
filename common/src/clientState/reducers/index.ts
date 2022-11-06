import { combineReducers } from 'common/node_modules/redux';

import uiTimeMarker from 'common/clientState/reducers/uiTimeMarker';

import { reducerFiles } from 'api/reducers';

import clientLog from './clientLog';
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
  ...apiReducers,
  ui,
  uiTimeMarker,
  style,
  componentDidMounts,
  clientLog,
  setting,
  /*
  postsTimeline,
  postsTimelineStock,
  postsTimelineZero,
  postsTimelineZeroAfter,
  */
});

export default reducers;
