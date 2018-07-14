import mongoose from 'mongoose';
import conf from '~/server/conf';
import Schemas from '~/server/schemas';
import Threads from '~/server/listens/db/Threads';
import Posts from '~/server/listens/db/Posts';
import Users from '~/server/listens//db/Users';
import Setting from '~/server/listens/db/Setting';

class MongoDB {
  constructor(){
    mongoose.Promise	= global.Promise;
    const {host, port, dbName, option} = conf.mongoDB;
    const address = `mongodb://${host}:${port}/${dbName}`;
    const con	= mongoose.createConnection( address, option );

    console.log( `MONGO DB RUN : ${conf.mongoDB.port}`);

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
