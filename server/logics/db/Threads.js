import Thread from '~/common/schemas/state/Thread'

export default class Threads {

  constructor( collection ){
    this.collection = collection;
    return this;
  }

  merge( obj, mergeObj ){
    return {...obj, ...mergeObj };
  }

  async findOne( connection, selector = {}, option = {} ){
    const condition = {connection};
    const response = await this.collection.findOne( condition, selector, option );
    return response;
  }

  async findOneWatchCnt( connection ){
    const condition = {connection};
    const selector = {watchCnt: 1};
    const option = {};
    const { error, response } = await this.collection.findOne( condition, selector, option );
    return response.watchCnt < 0 ? 0 : response.watchCnt ;
  }

  async findMenuIndex( connection, setting ){
    connection = connection.replace(/\//, '\/');
    const regex = new RegExp( `^${connection}` );
    const condition = {connection: regex, "lastPost.connection": regex};
    const selector = {lastPost: 1};
    const option = {sort: {layer: 1, watchCnt: 1}, limit: setting.server.getThreadChildrenCnt};
    let {error, response} = await this.collection.find( condition, selector, option, true );

    if( response.length === 0 ){
      response = [ this.collection.getSchema({connection}) ];
    }
    return response.map( res => res.lastPost );
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

  async save( connection, thread ){
    const set = {connection, ...thread};
    const option = {upsert:true};
    return this.collection.save( set, option );
  }

  async update( connection, thread ){
    const condition = {connection};
    const set = {connection, ...thread, updateTime: new Date()}
    const option = {upsert:true};
    return this.collection.update( condition, set, option );
  }

  async resetWatchCnt(){
    const condition = { watchCnt:{ $exists: true, $ne: 0 } };
    const set =  { $set:{ watchCnt: 0 } };
    const option = { upsert:false, multi: true };
    return await this.collection.update( condition, set, option );
  }

  async updateWatchCnt( connection, watchCnt ){
    const condition = {connection};
    const set = { $inc: { watchCnt } };
    const option = {upsert:true};
    return await this.collection.update( condition, set, option );
  }
}
