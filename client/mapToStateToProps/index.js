import define from 'common/define';
import TalknSession from 'client/operations/TalknSession';

export default ( _state, _props ) => {

  let state = _state
  let props = _props;

  if( functions[ _state.actionLog[ 0 ] ] ){
    const results = functions[ _state.actionLog[ 0 ] ]( _state, _props );
    state = results.state;
    props = results.props;
  }
  return {state, talknAPI: props.talknAPI};
}

const functions = {
  "SERVER_TO_CLIENT[EMIT]:find": ( state, props ) => {
    const { setting } = state;
    const { storageKey } = define;
    const getPostKey = setting.multistream ? storageKey.postMulti : storageKey.postSingle ;
    TalknSession.setStorage( define.storageKey.menuLogs, state.menuLogs.toJSON() );
    TalknSession.setStorage( define.storageKey[ getPostKey ], state.posts );
    return {state, props};
  },
  "UPDATE_SETTING": ( state, props ) => {
    TalknSession.setStorage( define.storageKey.updateSetting, state.setting.toJSON() );
    return {state, props};
  },
  "ON_CLICK_MENU": ( state, props ) => {
    TalknSession.setStorage( define.storageKey.selectMenu, state.app.menuComponent );
    return {state, props};
  },
}
