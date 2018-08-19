import App from './schemas/state/App';
import State from './schemas/state/';
const state = new State();

export default class Sequence {

  static get TALKN_PROTOCOL(){return 'talkn:'}
  static get HTTP_PROTOCOL(){return 'http:'}
  static get HTTPS_PROTOCOL(){return 'https:'}
  static get UNKNOWN_PROTOCOL(){return '????:'}
  static get CATCH_ME_KEY(){return '@CATCH_ME'}
  static get CLIENT_TO_SERVER_EMIT(){return 'CLIENT_TO_SERVER[EMIT]:'}
  static get SERVER_TO_CLIENT_EMIT(){return 'SERVER_TO_CLIENT[EMIT]:'}
  static get SERVER_TO_CLIENT_BROADCAST(){return 'SERVER_TO_CLIENT[BROADCAST]:'}
  static get CLIENT_TO_CLIENT_EMIT(){return 'CLIENT_TO_CLIENT[EMIT]:'}
  static get PREFIX_REQUEST(){return 'REQUEST:'}
  static get PREFIX_RESPONSE(){return 'RESPONSE:'}
  static get REDUX_ACTION_KEY(){return 'type';}
  static get map(){
    return {
      initClientState: {
        requestPublicState: {},
        requestPrivateState: {
          'thread': [{columnName: 'connection'}]
        },
        responseEmitState: { 'user': ['uid'], 'setting': '*'},
        responseBroadcastState: {},
      },
      find: {
        requestPublicState: {'thread': [{columnName: 'connection'}]},
        requestPrivateState: {
          'thread': [{columnName: 'protocol'}, {columnName: 'host'}],
          'user': '*',
        },
        responseEmitState: {'posts': '*', 'thread': '*', 'user': ['offsetFindId', 'connectioned']},
        responseBroadcastState: {'thread': ['watchCnt', 'connection']},
      },
      getMore: {
        requestPublicState: {},
        requestPrivateState: {
          'thread': [{columnName: 'connection'}],
          'user': [{columnName: 'offsetFindId'}],
        },
        responseEmitState: {'thread': ['connection'], 'user': ['offsetFindId'], 'posts': '*'},
        responseBroadcastState: {},
      },
      changeThread: {
        requestPublicState: {'thread': [{columnName: 'connection'}]},
        requestPrivateState: {
          'thread': [{columnName: 'protocol'}, {columnName: 'host'}],
          'user': '*',
        },
        responseEmitState: {'user': ['offsetFindId', 'connectioned']},
        responseBroadcastState: {'thread': ['watchCnt', 'connection']},
      },
      findMenuIndex: {
        requestPublicState: {'thread': [{columnName: 'connection'}]},
        requestPrivateState: {
          'thread': [{columnName: 'layer'}],
        },
        responseEmitState: {'menuIndex': '*'},
        responseBroadcastState: {},
      },
      post: {
        requestPublicState: {},
        requestPrivateState: {
          'app':[ {columnName: 'inputPost', valid: App.validPost}],
          'user':[ {columnName: 'uid'},{columnName: 'utype'}],
          'thread': [{columnName: 'protocol'}, {columnName: 'connection'},{columnName: 'connections'}, {columnName: 'favicon'}]
        },
        responseEmitState: {},
        responseBroadcastState: {'posts': '*', 'thread': ['postCnt', 'connection'], 'menuIndex': '*'},
      },
      updateThreadServerMetas: {
        requestPublicState: {'thread': [{columnName: 'serverMetas'}]},
        requestPrivateState: {
          'thread': [{columnName: 'host'}, {columnName: 'protocol'}, {columnName: 'connection'}],
          'user': '*',
        },
        responseEmitState: {'thread': '*'},
        responseBroadcastState: {},
      },
      login: {
        requestPublicState: {'app': [{columnName: 'requestLoginType'}]},
        requestPrivateState: {
          'user': [{columnName: 'uid', columnName: 'href'}],
        },
        responseEmitState: {'user': '*'},
        responseBroadcastState: {},
      },
      disconnect: {
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

        if( columnDatas === '*' ){
          requestState = {...requestState,
            [ stateKey ]: reduxState[ stateKey ].toJSON(),
          }
        }else{

          columnDatas.forEach( ( columnData ) => {
            const {columnName, valid} = columnData;
            let value = reduxState[ stateKey ][ columnName ];
            const validError = valid ? valid( value ) : false ;

            if(!validError){

              if( !requestState[ stateKey ][ columnName ] ){

                let value = reduxState[ stateKey ][ columnName ];
                if( !reduxState[ stateKey ][ columnName ] &&
                    requestParams && requestParams[ stateKey ] && requestParams[ stateKey ][ columnName ] ){
                  value = requestParams[ stateKey ][ columnName ];
                }
                requestState[ stateKey ][ columnName ] = value;
              }
            }else{
              throw `VALID PRIVATE SEQUENCE: ${stateKey}.${columnName}=${value} [${validError}]` ;
            }
          });
        }
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
              throw `VALID PUBLIC SEQUENCE: ${stateKey}.${columnName}=${requestParams} [${validError}]` ;
            }
          }else{
            throw `VALID PUBLIC STATE: ${stateKey}.${columnName}=${requestParams}` ;
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
              throw `SEQUENCE ERROR: NO_UPDATE_STATE_COLUMN_NAME: ${updateStateKey}.${columnName}`;
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
