import User from './schemas/state/User';
import State from './schemas/state/';
const state = new State();

export default class Sequence {

  static get CATCH_ME_KEY(){
    return '@CATCH_ME';
  }

  static get CLIENT_TO_SERVER_EMIT(){
    return 'CLIENT_TO_SERVER[EMIT]:';
  }

  static get SERVER_TO_CLIENT_EMIT(){
    return 'SERVER_TO_CLIENT[EMIT]:';
  }

  static get SERVER_TO_CLIENT_BROADCAST(){
    return 'SERVER_TO_CLIENT[BROADCAST]:';
  }

  static get CLIENT_TO_CLIENT_EMIT(){
    return 'CLIENT_TO_CLIENT[EMIT]:';
  }

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
        toSelfEmit: true,
        requestPublicState: {},
        requestPrivateState: {},
        responseEmitState: { 'user': ['uid'], 'setting': '*'},
        responseBroadcastState: {},
      },
      find: {
        toSelfEmit: true,
        requestPublicState: {'thread': [{columnName: 'connection'}]},
        requestPrivateState: {'thread': [{columnName: 'protocol'}, {columnName: 'host'}], 'user': [{columnName: 'offsetFindId'}, {columnName: 'connectioned'}]},
        responseEmitState: {'posts': '*', 'thread': '*', 'user': ['offsetFindId', 'connectioned']},
        responseBroadcastState: {'thread': ['watchCnt', 'connection']},
      },
      post: {
        toSelfEmit: false,
        requestPublicState: {'user': [{columnName: 'post', valid: User.validPost }]},
        requestPrivateState: {'user':[{columnName: 'uid'},{columnName: 'utype'}], 'thread': [{columnName: 'connection'}, {columnName: 'thum'}]},
        responseEmitState: {},
        responseBroadcastState: {'posts': '*'},
      },
      disconnect: {
        onConnection: true,
        requestPublicState: {},
        requestPrivateState: {},
        responseEmitState: {},
        responseBroadcastState: {'thread': ['watchCnt', 'connection']},
      }
    };
  }

  static getRequestState( actionName, reduxState, requestParams ){

    const endpointKey = actionName.replace( Sequence.CLIENT_TO_SERVER_EMIT, '' );
    const { requestPublicState, requestPrivateState } = Sequence.map[ endpointKey ];
    let requestState = {[ Sequence.REDUX_ACTION_KEY ]: endpointKey};

    if( Object.keys( requestPrivateState ).length > 0 ){
      Object.keys( requestPrivateState ).forEach( ( stateKey ) => {
        const columnDatas = requestPrivateState[ stateKey ];

        if( !requestState[ stateKey ] ){
          requestState[ stateKey ] = {}
        }

        columnDatas.forEach( ( columnData ) => {
          const {columnName, valid} = columnData;
          const value = reduxState[ stateKey ][ columnName ];

          if( !valid || !valid( value ) ){

            if( !requestState[ stateKey ][ columnName ] ){
              requestState[ stateKey ][ columnName ] = reduxState[ stateKey ][ columnName ];
            }
          }
        });
      });
    }

    if( Object.keys( requestPublicState ).length > 0 ){
      Object.keys( requestPublicState ).forEach( ( stateKey ) => {
        const columnDatas = requestPublicState[ stateKey ];

        if( !requestState[ stateKey ] ){
          requestState[ stateKey ] = {}
        }

        columnDatas.forEach( ( columnData ) => {
          const {columnName, valid} = columnData;
          if( reduxState[ stateKey ].canSet( columnName, requestParams ) ){
            const validError = valid ? valid( requestParams ) : false ;
            if(!validError){
              if( !requestState[ stateKey ][ columnName ] ){
                requestState[ stateKey ][ columnName ] = requestParams;
              }
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
            if( updateState[ updateStateKey ][ columnName ] !== undefined ){
              responseState = {...responseState,
                [ updateStateKey ]: {...responseState[ updateStateKey ],
                  [ columnName ]: updateState[ updateStateKey ][ columnName ],
                }
              }
            }else{
              console.warn( updateStateKey );
              console.warn( updateState );
              throw `SEQUENCE ERROR: NO_UPDATE_STATE_COLUMN_NAME: ${columnName}`;
            }
          });
        }
      }else{
        throw `SEQUENCE ERROR: NO_UPDATE_STATE_KEY: ${updateStateKey}`;
      }
    });
    return responseState;
  }

  static getRequestActionState( actionName, requestParams ){
    return {...requestParams, type: actionName };
  }
}
