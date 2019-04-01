import storage from './storage';
import ui from './ui';

export default ( _state, _props ) => {

  let state = _state
  let props = _props;
  let uiResults = {};
  let storageResults = {};

  if( ui[ _state.actionLog[ 0 ] ] ){
    uiResults = ui[ _state.actionLog[ 0 ] ]( _state, _props );
    state = uiResults.state;
    props = uiResults.props;
  }

  if( storage[ _state.actionLog[ 0 ] ] ){
    storageResults = storage[ _state.actionLog[ 0 ] ]( state, props );
    state = storageResults.state;
    props = storageResults.props;
  }
  return {state, talknAPI: props.talknAPI};
}