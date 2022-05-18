import Mongoose from 'mongoose';

import conf from 'server/conf';
import Sessions from 'server/listens//db/Sessions';
import Industory from 'server/listens/db/Industory';
import IndustoryParent from 'server/listens/db/IndustoryParent';
import JobCategory from 'server/listens/db/JobCategory';
import JobParents from 'server/listens/db/JobParents';
import JobTerm from 'server/listens/db/JobTerm';
import JobTitle from 'server/listens/db/JobTitle';
import Jobs from 'server/listens/db/Jobs';
import Posts from 'server/listens/db/Posts';
import Setting from 'server/listens/db/Setting';
import StartupSeries from 'server/listens/db/StartupSeries';
import Story from 'server/listens/db/Story';
import Threads from 'server/listens/db/Threads';
import UserTags from 'server/listens/db/UserTags';
import Users from 'server/listens/db/Users';
import Schemas from 'server/schemas';

class MongoDB {
  constructor() {
    /*
    Mongoose.set('useFindAndModify', false);
    Mongoose.set('useUnifiedTopology', true);
    Mongoose.set('useCreateIndex', true);
    */
    Mongoose.Promise = global.Promise;
    const { host, port, dbName, option } = conf.mongoDB;
    const address = `mongodb://${host}:${port}/${dbName}`;
    const dbConnection = Mongoose.createConnection(address, option);

    console.log(`MONGO DB RUN : ${conf.mongoDB.port}`);

    // collections.
    return {
      Users: new Users(dbConnection),
      UserTags: new UserTags(dbConnection),
      Setting: new Setting(dbConnection),
      Threads: new Threads(dbConnection),
      Posts: new Posts(dbConnection),
      Sessions: new Sessions(dbConnection),
      IndustoryParent: new IndustoryParent(dbConnection),
      Industory: new Industory(dbConnection),
      JobTerm: new JobTerm(dbConnection),
      JobTitle: new JobTitle(dbConnection),
      JobParents: new JobParents(dbConnection),
      JobCategory: new JobCategory(dbConnection),
      Jobs: new Jobs(dbConnection),
      StartupSeries: new StartupSeries(dbConnection),
      Story: new Story(dbConnection),
    };
  }

  static getSchema(collectionName) {
    return new Mongoose.Schema(Schemas.db.collections[collectionName], {
      collection: collectionName,
      autoIndex: true,
      autoCreate: true,
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
