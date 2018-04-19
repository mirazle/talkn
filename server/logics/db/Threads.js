import Thread from '~/../common/schemas/state/Thread'

export default class Threads {

  constructor( db ){
    this.db = db;
    return this;
  }

  merge( obj, mergeObj ){
    return {...obj, ...mergeObj };
  }

  async findOne( connection, selector = {}, option = {} ){
    const condition = {connection};
    const response = await this.db.findOne( condition, selector, option );
    return response;
  }

  async findOneWatchCnt( connection ){
    const condition = {connection};
    const selector = {watchCnt: 1};
    const option = {};
    const { error, response } = await this.db.findOne( condition, selector, option );
    return response.watchCnt < 0 ? 0 : response.watchCnt ;
  }

  getConnection( param ){
    return Thread.getConnection( param );
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
      const activeDate = new Date(nowYear, nowMonth, nowDay, ( nowHour - setting.server.findOneThreadActiveHour ) );

      const activeTime = activeDate.getTime();
      const threadUpdateTime = thread.updateTime.getTime();

      // スレッドの更新時間と、現在時間 - n を比較して、スレッドの更新時間が古かったらtrueを返す
      return threadUpdateTime < activeTime;
    }
    return false;
  }

  async save( requestState, thread, called ){
    const condition = {connection: requestState.thread.connection};
    const set = {
      connection: requestState.thread.connection,
      ...thread,
    };
    const option = {upsert:true};
    return this.db.save( set, option );
  }

  async update( requestState, thread ){
    const condition = {connection: requestState.thread.connection};
    const set = {
      connection: requestState.thread.connection,
      ...{...thread, updateTime: new Date()}
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

  async updateWatchCnt( connection, watchCnt ){
    const condition = {connection};
    const set = { $inc: { watchCnt } };
    const option = {upsert:true};
    return await this.db.update( condition, set, option );
  }
}
