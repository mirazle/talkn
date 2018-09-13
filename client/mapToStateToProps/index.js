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
    TalknSession.setStorage( define.storageKey.menuLogs, state.menuLogs.toJSON() );
    return {state, props};
  },
  "ON_CLICK_MENU": ( state, props ) => {
    TalknSession.setStorage( define.storageKey.selectMenu, state.app.menuComponent );
    return {state, props};
  },
}
