export const PREFIX_REQUEST = 'REQUEST:';
export const PREFIX_RESPONSE = 'RESPONSE:';

export const sequenceMap = {
  initClientState: {
    requestStateKeys: ['user'],
    responseStateKeys: ['user'],
  },
  find: {
    requestStateKeys: ['user'],
    responseStateKeys: ['user', 'index', 'thread', 'meta'],
  },
  disconnect: {
    requestStateKeys: ['user'],
    responseStateKeys: ['user', 'analyze'],
  }
};

export function getRequestState( actionState ){

  if( actionState.type ){
    const actionType = actionState.type.replace( PREFIX_REQUEST, '' );
    let requestState = {type: actionType};
    sequenceMap[ actionType ].requestStateKeys.forEach( ( key ) => {
      requestState[ key ] = actionState[ key ];
    });
    return requestState;
  }else{
    console.warn("Please set 'type' property in action ");
  }
}

export function getResponseState( state, response ){
  return {
    ...state,
    ...response,
      type: PREFIX_RESPONSE + response.type
    };
}
