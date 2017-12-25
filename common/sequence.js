
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
        requestPublicState: {},
        requestPrivateState: {},
        responseEmitState: { 'user': ['id']},
        responseBroadcastState: {},
      },
      find: {
        requestPublicState: {'thread': ['connection']},
        requestPrivateState: {'thread': ['protocol', 'host']},
        responseEmitState: {'posts': '*', 'thread': '*'},
        responseBroadcastState: {'analyze': ['watchCnt']},
      },
      post: {
        requestPublicState: {'user': ['inputPost']},
        requestPrivateState: {'user':['id', 'inputPost']},
        responseEmitState: {'posts': []},
        responseBroadcastState: {'analyze': ['postCnt']},
      },
      disconnect: {
        requestPublicState: {},
        requestPrivateState: {},
        responseEmitState: {'posts': [], 'thread': []},
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
    Object.keys( responseSchema ).forEach( ( updateStateKey ) => {

      if( updateState[ updateStateKey ] ){

        const columnNames = responseSchema[ updateStateKey ];
        let updateStateValue = updateState[ updateStateKey ];

        switch( updateStateValue.constructor.name ){
        case 'model':
          updateStateValue = updateStateValue.toJSON()
          delete updateStateValue._id;
          delete updateStateValue.__v;
          break;
        }

        if( columnNames === '*' ){
          responseState = {...responseState,
            [ updateStateKey ]: updateStateValue,
          }
        }else{

          columnNames.forEach( ( columnName ) => {
            if( updateState[ updateStateKey ][ columnName ] ){
              responseState = {...responseState,
                [ updateStateKey ]: {...responseState[ updateStateKey ],
                  [ columnName ]: updateState[ updateStateKey ][ columnName ],
                }
              }
            }else{
              throw `NO_UPDATE_STATE_COLUMN_NAME: ${columnName}`;
            }
          });
        }
      }else{
        throw `NO_UPDATE_STATE_KEY: ${updateStateKey}`;
      }
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
