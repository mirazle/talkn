import methods from './methods';

const functions = {
  ...methods
}

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