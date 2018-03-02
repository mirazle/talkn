import mongoose from 'mongoose';
import Schemas from '../schemas';
import conf from '~/conf';
import Threads from '~/db/Threads';
import Posts from '~/db/Posts';
import Users from '~/db/Users';
import Setting from '~/db/Setting';

class MongoDB {
  constructor(){
    console.log("MONGO DB RUN");
    mongoose.Promise	= global.Promise;
    const setting = conf.mongoDB;
    const address = `mongodb://${setting.host}:${setting.port}/${setting.dbName}`;
    const con	= mongoose.createConnection( address, setting.option );

    return {
      Setting: new Setting( con ),
      Threads: new Threads( con ),
      Posts: new Posts( con ),
      Users: new Users( con ),
    }
  }

  static getCollection(con, collectionName){
    const schema = mongoose.Schema( Schemas.db[ collectionName ], {collection: collectionName} );
    return con.model( collectionName, schema );
  }
}

export default MongoDB;
