
export default class Sequence {

  static get PREFIX_REQUEST(){
    return 'REQUEST:';
  }

  static get PREFIX_RESPONSE(){
    return 'RESPONSE:';
  }

  static get REDUX_ACTION_KEY(){
    return 'type';
  }

  static get map(){
    return {
      initClientState: {
        requestPrivateState: {},
        requestPublicState: {},
        responseEmitState: { 'user': ['id']},
        responseBroadcastState: {},
      },
      find: {
        requestPrivateState: {'user': ['protocol']},
        requestPublicState: {'user': ['connection']},
        responseEmitState: {'index': [], 'posts': [], 'thread': [], 'meta': []},
        responseBroadcastState: {'analyze': ['watchCnt']},
      },
      post: {
        requestPrivateState: {},
        requestPublicState: {},
        responseEmitState: {'index': [], 'posts': [], 'thread': [], 'meta': []},
        responseBroadcastState: {'analyze': ['watchCnt']},
      },
      disconnect: {
        requestPrivateState: {},
        requestPublicState: {},
        responseEmitState: {'index': [], 'posts': [], 'thread': [], 'meta': []},
        responseBroadcastState: {'analyze': ['watchCnt']},
      }
    };
  }

  static getRequestState( endpointKey, state, requestParams ){

    let requestState = {[ Sequence.REDUX_ACTION_KEY ]: endpointKey};

    const { requestPublicState, requestPrivateState } = Sequence.map[ endpointKey ];

    if( Object.keys( requestPrivateState ).length > 0 ){

      Object.keys( requestPrivateState ).forEach( ( stateKey ) => {

        const columnNames = requestPrivateState[ stateKey ];

        switch( typeof columnNames ){
        case 'string':
          stateKey = seqReqKey;
          requestState = { ...state[ stateKey ] };
          break;
        case 'object':
          columnNames.forEach( ( columnName ) => {
            requestState = {...requestState,
              [ columnName ] : state[ stateKey ][ columnName ]
            };
          });
          break;
        }
      });
    }

    if( Object.keys( requestPublicState ).length > 0 ){

      Object.keys( requestPublicState ).forEach( ( stateKey ) => {

        const columnNames = requestPublicState[ stateKey ];

        switch( typeof requestParams ){
        case 'undefined':

          switch( typeof columnNames ){
          case 'string':
            requestState = { ...requestState,
              [ columnNames ]: state[ stateKey ][ columnNames ]
            };
            break;
          case 'object':
            columnNames.forEach( ( columnName ) => {
              requestState = {...requestState,
                [ columnName ] : state[ stateKey ][ columnName ]
              };
            });
            break;
          }
          break;
        case 'string':
          requestState = { ...requestState,
            [ columnNames ]: requestParams
          };
          break;
        case 'object':
          requestState = {...requestParams, ...requestState};
          break;
        }
      });
    }

    return requestState;
  }

  static getResponseState( responseType, requestState, updateState ){

    const endpointKey = requestState.type;
    const responseSchema = Sequence.map[ endpointKey ][ `response${responseType}State` ];
    let responseState = {[ Sequence.REDUX_ACTION_KEY ]: endpointKey};

    Object.keys( responseSchema ).forEach( ( stateKey ) => {
      Object.keys( responseSchema[ stateKey ] ).forEach( ( i ) => {
        const columnName = responseSchema[ stateKey ][ i ];
        responseState = {...responseState,
          [ stateKey ]: {...responseState[ stateKey ],
            [ columnName ]: updateState,
          }
        }
      });
    });
    return responseState;
  }

  static getActionState( actionName, state, requestState ){
    return {...state, ...requestState, type: actionName };
  }


  // 同名のメソッドでサーバーでレスポンス生成して返すようにする
  static _getResponseState( state, response ){
    return {
      ...state,
      ...response,
        type: Sequence.PREFIX_RESPONSE + response.type
      };
  }
}
