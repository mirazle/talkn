import MongoDB from 'server/listens/db/MongoDB';

export default class Threads {
  collection: any;
  constructor(dbConnection) {
    this.collection = MongoDB.getCollection(dbConnection, Threads.name);
    return this;
  }

  getSchema(params = {}) {
    return new this.collection(params);
  }

  save(thread) {
    return new Promise((resolve) => {
      thread.save((error, response) => {
        if (error) console.warn(error);
        resolve({ response, error });
      });
    });
  }

  update(condition = {}, set = {}, option = {}) {
    return new Promise((resolve) => {
      this.collection.updateMany(condition, set, option, (error, response) => {
        if (error) console.warn(error);
        if (response) {
          resolve({ response, error, ch: response.ch });
        } else {
          console.warn('Bad Thread updadte');
        }
      });
    });
  }

  findOne(condition = {}, selector = {}, option = {}, called) {
    return new Promise((resolve) => {
      this.collection.findOne(condition, selector, option, (error, response) => {
        if (error) console.warn(error);
        resolve({ error, response });
      });
    });
  }

  find(condition = {}, selector = {}, option = {}) {
    return new Promise((resolve) => {
      this.collection.find(condition, selector, option, (error, response) => {
        if (error) console.warn(error);
        resolve({ error, response });
      });
    });
  }
}
