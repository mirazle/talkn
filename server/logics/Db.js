export default class Db {

  constructor( mongoDB ){
    this.db = mongoDB;
    return this;
  }

  async saveThread( requestState, thread ){
    const condition = {connection: requestState.connection};
    const set = { connection: requestState.connection, ...thread };
    const option = {upsert:true};
    return this.db.Threads.save( condition, set, option );
  }

  async findOneSetting(){
    return await this.db.Setting.findOne();
  }

  async resetWatchCnt(){
    const condition = { watchCnt:{ $exists: true, $ne: 0 } };
    const set =  { $set:{ watchCnt: 0 } };
    const option = { upsert:false, multi: true };
    return await this.db.Threads.save( condition, set, option );
  }

  async updateThread( connection, cnt ){
    const condition = {connection};
    const set = { $inc: { watchCnt: cnt } };
    const option = {upsert:true};
    return await this.db.Threads.save( condition, set, option );
  }

  async findOneThread( connection ){
    const condition = {connection};
    const selector = { connection: true, watchCnt: true };
    return await this.db.Threads.findOne( condition, selector );
  }
}
