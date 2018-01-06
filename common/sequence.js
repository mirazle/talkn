import User from './schemas/state/User';
import State from './schemas/state/';
const state = new State();

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
        requestPublicState: {'thread': [{columnName: 'connection'}]},
        requestPrivateState: {'thread': [{columnName: 'protocol'}, {columnName: 'host'}]},
        responseEmitState: {'posts': '*', 'thread': '*'},
        responseBroadcastState: {'analyze': ['watchCnt']},
      },
      post: {
        requestPublicState: {'user': [{columnName: 'inputPost', valid: User.validPost }]},
        requestPrivateState: {'user':['id']},
        responseEmitState: {'posts': '*'},
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

  static getRequestState( actionName, reduxState, requestParams ){

    const endpointKey = actionName.replace( Sequence.PREFIX_REQUEST, '' );
    const { requestPublicState, requestPrivateState } = Sequence.map[ endpointKey ];
    let requestState = {[ Sequence.REDUX_ACTION_KEY ]: endpointKey};

    if( Object.keys( requestPrivateState ).length > 0 ){
      Object.keys( requestPrivateState ).forEach( ( stateKey ) => {
        const columnDatas = requestPrivateState[ stateKey ];

        columnDatas.forEach( ( columnData ) => {
          const {columnName, valid} = columnData;
          const value = reduxState[ stateKey ][ columnName ];
          if( !valid || !valid( value ) ){
            requestState = {...requestState,
              [ columnName ] : reduxState[ stateKey ][ columnName ]
            };
          }
        });

      });
    }

    if( Object.keys( requestPublicState ).length > 0 ){
      Object.keys( requestPublicState ).forEach( ( stateKey ) => {
        const columnDatas = requestPublicState[ stateKey ];
        columnDatas.forEach( ( columnData ) => {
          const {columnName, valid} = columnData;
          if( reduxState[ stateKey ].canSet( columnName, requestParams ) ){
            const validError = valid ? valid( requestParams ) : false ;
            if(!validError){
              requestState = {...requestState,
                [ columnName ] : requestParams,
              };
            }else{
              throw `VALID SEQUENCE: ${stateKey}_${columnName}_${requestParams} [${validError}]` ;
            }
          }else{
            throw `VALID STATE: ${stateKey}_${columnName}_${requestParams}` ;
          }
        });
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

  static getRequestActionState( actionName, requestParams ){
    return {...requestParams, type: actionName };
  }
}
