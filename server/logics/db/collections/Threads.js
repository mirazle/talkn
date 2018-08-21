import Thread from '~/common/schemas/state/Thread'
import User from '~/common/schemas/state/User'
import MongoDB from '~/server/listens/db/MongoDB';
import Logics from '~/server/logics';
import Favicon from '~/server/logics/Favicon';

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

  async findMenuIndex( requestState, setting ){
    const { connection, layer } = requestState.thread;
    const regexConnection = connection.replace(/\//, '\/');
    const regex = new RegExp( `^${regexConnection}` );
    const condition = {
      connection: regex,
      "lastPost.connection": regex,
      "$or": [{layer: layer}, {layer: layer + 1}],
    };
    const selector = {lastPost: 1, watchCnt: 1};
    const option = {sort: {layer: 1, watchCnt: 1, postCnt: 1}, limit: setting.server.getThreadChildrenCnt};

    let {error, response} = await this.collection.find( condition, selector, option );
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

    return response.map( ( res ) => {
      return {...res.lastPost,
        watchCnt: res.lastPost.connection === connection ?
          res.watchCnt + 1 : res.watchCnt
      }
    });
  }

  async save( thread ){
    thread.updateTime = new Date();
    const {response: resThread} =  await this.collection.save( thread );
    return resThread;
  }

  async resetWatchCnt(){
    const condition = { watchCnt:{ $exists: true, $ne: 0 } };
    const set =  { $set:{ watchCnt: 0 } };
    const option = { upsert:false, multi: true };
    return await this.collection.update( condition, set, option );
  }

  async saveOnWatchCnt( thread, watchCnt, update = false ){
    const { connection } = thread;
    if( thread.save ){
      thread.watchCnt = update ? watchCnt : thread.watchCnt + watchCnt;
      return await Logics.db.threads.save( thread );
    }else{
      const {response: resThread} = await Logics.db.threads.findOne( connection );
      resThread.watchCnt = update ? watchCnt : resThread.watchCnt + watchCnt;
      return await Logics.db.threads.save( resThread );
    }
  }

  async update( connection, upset ){
    const condition = {connection};
    const set = {connection, ...upset, updateTime: new Date()}
    const option = {upsert:true};
    return this.collection.update( condition, set, option );
  }

  /******************/
  /* COLUMN LOGIC   */
  /******************/

  async getBuiltinSchema( connection, response = [] ){
    let schema = this.collection.getSchema({connection});
    schema.connections = Thread.getConnections( connection );
    schema.host = Thread.getHost( connection );
    schema.layer = Thread.getLayer( connection );
    schema.lastPost.connection = connection;
    schema.lastPost.connections = Thread.getConnections( connection );
    response.unshift( schema );
    return response;
  }

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
    thread = MongoDB.getBuiltinObjToSchema( thread, htmlParams );

    if( thread.favicon === Favicon.defaultFaviconPath ){
      const faviconParams = await Logics.favicon.fetch( thread );

      thread = MongoDB.getBuiltinObjToSchema(
        thread, {...faviconParams, favicon: faviconParams.faviconName }
      );
    }

    if( thread.favicon !== Favicon.defaultFaviconPath && thread.lastPost.favicon === Favicon.defaultFaviconPath ){
      thread.lastPost.favicon = thread.favicon;
      console.log("UPDATE LAST_POST FAVICON " + thread.lastPost.favicon);
    }else{
      console.log("NO UPDATE LAST_POST FAVICON " + thread.lastPost.favicon);
    }

    return thread;
  }

  /******************/
  /* STATUS LOGIC   */
  /******************/

  getStatus( thread, user, setting ){

    let status = {isSchema: false, isRequireUpsert: false};

    /*******************************************************/
    /* threadが空のSchemaかどうか(DBにデータが存在しない)        */
    /*******************************************************/

    const threadCreateTime = thread.createTime.getTime();
    const threadUpdateTime = thread.updateTime.getTime();

    if( threadCreateTime === threadUpdateTime ){

      const lastPostCreateTime = thread.lastPost.createTime.getTime();
      const lastPostUpdateTime = thread.lastPost.updateTime.getTime();

      if( lastPostCreateTime === lastPostUpdateTime ){
        status.isSchema = true;
      }
    }

    /*******************************************************/
    /* 更新が必要なthreadかどうか                             */
    /*******************************************************/

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
