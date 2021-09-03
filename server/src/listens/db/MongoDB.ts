import Mongoose from 'mongoose';

import conf from 'server/conf';
import Users from 'server/listens//db/Users';
import Posts from 'server/listens/db/Posts';
import Setting from 'server/listens/db/Setting';
import Threads from 'server/listens/db/Threads';
import Schemas from 'server/schemas';

class MongoDB {
  constructor() {
    Mongoose.set('useFindAndModify', false);
    Mongoose.set('useUnifiedTopology', true);
    Mongoose.set('useCreateIndex', true);
    Mongoose.Promise = global.Promise;
    const { host, port, dbName, option } = conf.mongoDB;
    const address = `mongodb://${host}:${port}/${dbName}`;
    const dbConnection = Mongoose.createConnection(address, option);

    console.log(`MONGO DB RUN : ${conf.mongoDB.port}`);

    // collections.
    return {
      Setting: new Setting(dbConnection),
      Threads: new Threads(dbConnection),
      Posts: new Posts(dbConnection),
      Users: new Users(dbConnection),
    };
  }

  static getSchema(collectionName) {
    return new Mongoose.Schema(Schemas.db.collections[collectionName], {
      collection: collectionName,
    });
  }

  static getCollection(con, collectionName) {
    const schema = MongoDB.getSchema(collectionName);
    return con.model(collectionName, schema);
  }

  // _idが変更されないようにmongoSchemaにビルトインして返す
  static getBuiltinObjToSchema(schema, builtinObj) {
    Object.keys(schema.toJSON()).forEach((key) => {
      if (builtinObj[key]) {
        let builtinValue = builtinObj[key];

        if (builtinValue.constructor.name === 'Object') {
          builtinValue = MongoDB.getBuiltinObjToSchema(schema[key], builtinValue);
        } else {
          schema[key] = builtinValue;
        }
      }
    });
    return schema;
  }

  static getDefineSchemaObj(obj) {
    Object.keys(obj).forEach((key) => {
      let values = obj[key];
      if (typeof values === 'object') {
        if (!values.type && !values.default) {
          values = MongoDB.getDefineSchemaObj(values);
        } else if (values.default || values.default === '' || values.default === 0) {
          obj[key] = values.default;
        } else {
          obj[key] = values;
        }
      }
    });
    return obj;
  }
}

export default MongoDB;
