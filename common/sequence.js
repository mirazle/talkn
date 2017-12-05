const sequenceMap = {
  initClientState: {
    requestKeys: ['user'],
    responseKeys: ['user'],
  },
  find: {
    requestKeys: ['user'],
    responseKeys: ['thread', 'index', 'meta', 'user'],
  },
  disconnect: {
    requestKeys: ['user'],
    responseKeys: ['user'],
  }
};

function getRequestState( endpoint, state ){
  let requestState = {};
  sequenceMap[ endpoint ].requestKeys.forEach( ( key ) => {
    requestState[ key ] = state[ key ];
  });
  return requestState;
}

function getResponseState( state, response ){
  return {...state, ...response};
}

export default {
  sequenceMap,
  getRequestState,
  getResponseState,
}
