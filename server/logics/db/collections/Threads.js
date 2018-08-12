import Thread from '~/common/schemas/state/Thread'
import MongoDB from '~/server/listens/db/MongoDB';


import Logics from '~/server/logics';

export default class Threads {

  constructor( collection ){
    this.collection = collection;
    return this;
  }

  /******************/
  /* MONGO DB       */
  /******************/

  async findOne( connection, selector = {}, option = {}, buildinSchema = false ){
    const condition = {connection};
    let responses = await this.collection.findOne( condition, selector, option );

    if( buildinSchema ){
      if( !responses.response ){
        const builtinSchema = await this.getBuiltinSchema( connection );
        responses = {...responses, response: builtinSchema[ 0 ] };
      }
    }
    return responses;
  }

  async findOneWatchCnt( connection ){
    const condition = {connection};
    const selector = {watchCnt: 1};
    const option = {};
    const { error, response } = await this.collection.findOne( condition, selector, option );
    return response.watchCnt < 0 ? 0 : response.watchCnt ;
  }

  async getBuiltinSchema( connection, response = [] ){
    let schema = this.collection.getSchema({connection});
    schema.connections = Thread.getConnections( connection );
    schema.host = Thread.getHost( connection );
    schema.lastPost.connection = connection;
    schema.lastPost.connections = Thread.getConnections( connection );
    response.unshift( schema );
    return response;
  }

  async findMenuIndex( connection, setting ){
    connection = connection.replace(/\//, '\/');
    const regex = new RegExp( `^${connection}` );
    const condition = {connection: regex, "lastPost.connection": regex};
    const selector = {lastPost: 1};
    const option = {sort: {layer: 1, watchCnt: 1}, limit: setting.server.getThreadChildrenCnt};

    let {error, response} = await this.collection.find( condition, selector, option, true );
    let mainConnectionExist = false;

    if( response.length === 0 ){
      response = await this.getBuiltinSchema( connection, response );
    }else{

      response.forEach( ( res ) => {
        if( res.lastPost.connection === connection ) mainConnectionExist = true;
      });

      if( !mainConnectionExist ){
        response = await this.getBuiltinSchema( connection, response );
      }
    }
    return response.map( res => res.lastPost );
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

  /******************/
  /* COLUMN LOGIC   */
  /******************/

  merge( obj, mergeObj ){
    return {...obj, ...mergeObj };
  }

  getConnection( param ){
    return Thread.getConnection( param );
  }

  /******************/
  /* HTML LOGIC     */
  /******************/

  async requestHtmlParams( thread ){
    const htmlParams = await Logics.html.fetch( thread );
    const faviconParams = await Logics.favicon.fetch( thread );
    const htmlBuiltinedThread = MongoDB.getBuiltinObjToSchema( thread, htmlParams );
  }

  /******************/
  /* STATUS LOGIC   */
  /******************/

  getStatus( thread, setting ){

    let status = {isSchema: false, isRequireUpsert: false};

    const threadCreateTime = thread.createTime.getTime();
    const threadUpdateTime = thread.updateTime.getTime();

    // 空のSchemaの場合(DBにデータが存在しない)
    if( threadCreateTime === threadUpdateTime ){

      const lastPostCreateTime = thread.lastPost.createTime.getTime();
      const lastPostUpdateTime = thread.lastPost.updateTime.getTime();

      if( lastPostCreateTime === lastPostUpdateTime ){
        status.isSchema = true;
      }
    }

    // 現在時刻を取得
    const now = new Date();
    const nowYear = now.getFullYear();
    const nowMonth = now.getMonth();
    const nowDay = now.getDate();
    const nowHour = now.getHours();
    const nowMinutes = now.getMinutes();
    const activeDate = new Date(nowYear, nowMonth, nowDay, ( nowHour - setting.server.findOneThreadActiveHour ) );
    const activeTime = activeDate.getTime();

    // スレッドの更新時間と、現在時間 - n を比較して、スレッドの更新時間が古かったらtrueを返す
    status.isRequireUpsert = status.isSchema ?
      true : threadUpdateTime < activeTime;

    return status;
  }
}
