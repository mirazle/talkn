import App from '~/common/schemas/state/App';
import Thread from '~/common/schemas/state/Thread';
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
        const builtinSchema = await this.getUnshiftBaseConnectionResponse( connection );
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
    const { app } = requestState;
    const { rootConnection: connection } = app;
    const layer = Thread.getLayer( connection );

    //    const regexConnection = connection.replace(/\//, '\/');
//    const regex = new RegExp( `^${regexConnection}` );
    let condition = {};
    condition.connections = connection;
    condition.postCnt = {'$ne': 0};
    condition.layer = { $gt : layer  };

 
    if( app.findType !== Thread.findTypeAll ){
      condition.findType = app.findType;
    }

    const selector = {"serverMetas.title": 1, lastPost: 1, watchCnt: 1};
    const option = {sort: {watchCnt: -1, layer: -1}, limit: setting.server.getThreadChildrenCnt};
    let {error, response} = await this.collection.find( condition, selector, option );
    const responseLength = response.length;
    let mainConnectionExist = false;

    if( responseLength === 0 ){
      response = await this.getUnshiftBaseConnectionResponse( connection, response );
    }else{

      for( let i = 0; i < responseLength; i++ ){
        if( response[ i ].lastPost.connection === connection ){
          mainConnectionExist = true;
          break;
        }
      }

      if( !mainConnectionExist ){
        response = await this.getUnshiftBaseConnectionResponse( connection, response );
      }
    }

    // Response structure is Post Schema Base.
    return response.map( ( res ) => {
      return {...res.lastPost,
        title: res.serverMetas.title,
        watchCnt: res.lastPost.connection === connection ? res.watchCnt + 1 : res.watchCnt
      }
    });
  }

  async save( thread ){
    thread.findType = Thread.getContentTypeFromFindType( thread.contentType );
    thread.updateTime = new Date();
    thread.watchCnt = thread.watchCnt < 0 ? 0 : thread.watchCnt ;
    //thread.title = thread.serverMetas.title ? thread.serverMetas.title : thread.serverMetas["og:title"];
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

      if( update ){
        resThread.watchCnt = watchCnt;

      }else{
        resThread.watchCnt = resThread.watchCnt + watchCnt;
      }

      return await Logics.db.threads.save( resThread );
    }
  }

  async update( connection, upset ){
    const condition = {connection};
    const set = {connection, ...upset, updateTime: new Date()}
    const option = {upsert:true};
    return await this.collection.update( condition, set, option );
  }

  async updateServerMetas( connection, baseThread, updateThread ){
    const condition = {connection};
    const serverMetas = {...baseThread.serverMetas, ...updateThread.serverMetas};
    const set = {connection, serverMetas, updateTime: new Date()};
    const option = {upsert:true};
    await this.collection.update( condition, set, option );
    return serverMetas;
  }

  /******************/
  /* COLUMN LOGIC   */
  /******************/

  async getUnshiftBaseConnectionResponse( connection, response = [] ){
    let schema = this.collection.getSchema({connection});
    schema.title = Thread.getDefaultTitle();
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

  async requestHtmlParams( thread, requestState ){
    const { response: htmlParams, iconHrefs } = await Logics.html.fetch( thread, requestState );
    thread = MongoDB.getBuiltinObjToSchema( thread, htmlParams );

    if( thread.favicon === Favicon.defaultFaviconPath ){
      const faviconParams = await Logics.favicon.fetch( thread, iconHrefs );
      thread = MongoDB.getBuiltinObjToSchema(
        thread, {...faviconParams, favicon: faviconParams.faviconName }
      );
    }

    if( thread.favicon !== Favicon.defaultFaviconPath && thread.lastPost.favicon === Favicon.defaultFaviconPath ){
      thread.lastPost.favicon = thread.favicon;
    }

    return thread;
  }
}
