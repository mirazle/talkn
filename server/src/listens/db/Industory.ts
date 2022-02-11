import MongoDB from 'server/listens/db/MongoDB';

export default class Industory {
  collection: any;
  constructor(dbConnection) {
    this.collection = MongoDB.getCollection(dbConnection, Industory.name);
    return this;
  }

  getSchema(params = {}) {
    return new this.collection(params);
  }

  find(condition = {}, selector = {}, option = {}) {
    return new Promise((resolve) => {
      this.collection.find((error, response) => {
        if (error) throw error;
        resolve(response);
      });
    });
  }

  insertMany(set = [], option = {}) {
    return new Promise((resolve) => {
      this.collection.insertMany(set, (error, response) => {
        if (error) throw error;
        resolve(response);
      });
    });
  }

  removeAll() {
    return new Promise((resolve) => {
      this.collection.deleteMany({}, (error, response) => {
        if (error) console.warn(error);
        resolve({ response, error });
      });
    });
  }
}
