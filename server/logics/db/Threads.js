export default class Threads {

  constructor( db ){
    this.db = db;
    return this;
  }

  async findOne( connection, selector = {}, option = {} ){
    const condition = {connection};
    return await this.db.findOne( condition, selector, option );
  }

  isUpdatableThread( thread, setting ){

    if( thread ){

      // 現在時刻を取得
      const now = new Date();
      const nowYear = now.getFullYear();
      const nowMonth = now.getMonth();
      const nowDay = now.getDate();
      const nowHour = now.getHours();
      const nowMinutes = now.getMinutes();
      const activeDate = new Date(nowYear, nowMonth, nowDay, nowHour );

      const activeTime = activeDate.getTime();
      const threadUpdateTime = thread.updateTime.getTime();

      // スレッドの更新時間と、現在時間 - n を比較して、スレッドの更新時間が古かったらtrueを返す
      return threadUpdateTime < activeTime;
    }
    return false;
  }

  async save( requestState, thread ){
    const condition = {connection: requestState.thread.connection};
    const set = {
      connection: requestState.thread.connection,
      ...thread,
    };
    const option = {upsert:true};
    return this.db.save( condition, set, option );
  }

  async update( requestState, thread ){
    const condition = {connection: requestState.thread.connection};
    const set = {
      connection: requestState.thread.connection,
      ...thread,
    };
    const option = {upsert:true};
    return this.db.update( condition, set, option );
  }

  async resetWatchCnt(){
    const condition = { watchCnt:{ $exists: true, $ne: 0 } };
    const set =  { $set:{ watchCnt: 0 } };
    const option = { upsert:false, multi: true };
    return await this.db.update( condition, set, option );
  }

  async updateThreadWatchCnt( connection, cnt ){
    const condition = {connection};
    const set = { $inc: { watchCnt: cnt } };
    const option = {upsert:true};
    return await this.db.save( condition, set, option );
  }
}
