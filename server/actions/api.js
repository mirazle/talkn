import Sequence from '~/../common/Sequence'
import Logics from '~/logics';
import Actions from '~/actions';

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
  },
}
