import Sequence from '~/../common/Sequence'
import Logics from '~/logics';
import Actions from '~/actions';
import tests from '~/utils/testRequestState';

export default {
  setUpAPI: async () => {
    const io = await Logics.io.get();
    return io.on( 'connection', Actions.attachAPI );
  },

  attachAPI: async ( ioUser ) => {
    const setting = await Actions.setUpUser();

    Object.keys( Sequence.map ).forEach( endpoint => {
      const oneSequence = Sequence.map[ endpoint ];
      ioUser.on( endpoint, ( requestState ) => {
        console.log("========== START " + endpoint );
        Actions[ endpoint ]( ioUser, requestState, setting );
      });
    });

    //Actions.testAPI( ioUser, setting );
  },

  testAPI: ( ioUser, setting ) => {
    if( Object.keys( tests ).length > 0 ){

      let {connections, state} = tests.find();

      connections.forEach( ( connection, index ) => {
        const requestState = {...state,
          thread: {...state.thread,
            connection
          }
        }
        Actions[ 'find' ]( ioUser, requestState, setting );
      });
    }
  }
}
