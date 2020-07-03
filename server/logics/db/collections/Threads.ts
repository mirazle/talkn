import Thread from "api/store/Thread";
import MongoDB from "server/listens/db/MongoDB";
import Logics from "server/logics";
import Favicon from "server/logics/Favicon";

type ThreadFindOneType = {
  selector?: {};
  option?: {};
  buildinSchema?: boolean;
};

const ThreadFindOneInit = {
  selector: {},
  option: {},
  buildinSchema: true,
};

export default class Threads {
  collection: any;
  constructor(collection) {
    this.collection = collection;
    return this;
  }

  /******************/
  /* MONGO DB       */
  /******************/

  async findOne(ch, params: ThreadFindOneType = ThreadFindOneInit, called = "Default") {
    const { selector, option, buildinSchema } = params;
    const condition = { ch };
    let { error, response } = await this.collection.findOne(condition, selector, option);
    const isExist = Boolean(response);
    if (buildinSchema) {
      if (!isExist) {
        const anyChResponse = await this.getUnshifAnyChResponse(ch, []);
        response = anyChResponse[0];
      }
    }
    return { error, response, isExist };
  }

  async findOneWatchCnt(ch) {
    const condition = { ch };
    const selector = { watchCnt: 1 };
    const option = {};
    const { error, response } = await this.collection.findOne(
      condition,
      { selector, option, buildinSchema: false },
      "finedMenuIndex"
    );
    return response.watchCnt < 0 ? 0 : response.watchCnt;
  }

  async rank(requestState, setting) {
    const { app } = requestState;
    const { rootCh: ch } = app;
    const layer = Thread.getLayer(ch);

    let condition: any = {};
    condition.chs = ch;
    condition.postCnt = { $ne: 0 };
    condition.layer = { $gt: layer };

    if (app.findType !== Thread.findTypeAll) {
      condition.findType = app.findType;
    }

    const selector = { "serverMetas.title": 1, lastPost: 1, watchCnt: 1 };
    const option = {
      sort: { watchCnt: -1, layer: -1 },
      limit: setting.server.getThreadChildrenCnt,
    };

    let { response } = await this.collection.find(condition, selector, option);
    const responseLength = response.length;
    let existMainCh = false;
    if (responseLength === 0) {
      response = await this.getUnshifAnyChResponse(ch, response);
    } else {
      for (let i = 0; i < responseLength; i++) {
        if (response[i].lastPost.ch === ch) {
          existMainCh = true;
          break;
        }
      }

      if (!existMainCh) {
        const { response: mainThread } = await this.findOne(ch, {
          selector: { lastPost: 1 },
          option: {},
          buildinSchema: true,
        });
        response.unshift(mainThread);
      }
    }

    response = response.map((res) => {
      return {
        ...res.lastPost,
        title: res.serverMetas.title,
        watchCnt: res.lastPost.ch === ch ? res.watchCnt + 1 : res.watchCnt,
      };
    });

    // TODO delete this proccess.
    if (response[0] && isNaN(response[0].watchCnt)) {
      response[0].watchCnt = 1;
    }

    // Response structure is Post Schema Base.
    return response;
  }

  async save(thread) {
    thread.findType = Thread.getContentTypeFromFindType(thread.contentType);
    thread.updateTime = new Date();
    thread.watchCnt = thread.watchCnt < 0 ? 0 : thread.watchCnt;
    thread.hasSlash = thread.hasSlash === null ? false : thread.hasSlash;
    //thread.title = thread.serverMetas.title ? thread.serverMetas.title : thread.serverMetas["og:title"];
    const { response: resThread } = await this.collection.save(thread);
    return resThread;
  }

  async resetWatchCnt() {
    const condition = { watchCnt: { $exists: true, $ne: 0 } };
    const set = { $set: { watchCnt: 0 } };
    const option = { upsert: false, multi: true };
    return await this.collection.update(condition, set, option);
  }

  async tune(thread, watchCnt, update = false) {
    const { ch } = thread;
    if (thread.save) {
      thread.watchCnt = update ? watchCnt : thread.watchCnt + watchCnt;
      thread = await Logics.db.threads.save(thread);
      return { thread, isExist: true };
    } else {
      let { response: resThread, isExist } = await Logics.db.threads.findOne(ch);

      if (update) {
        resThread.watchCnt = watchCnt;
      } else {
        resThread.watchCnt = resThread.watchCnt + watchCnt;
      }

      const thread = await Logics.db.threads.save(resThread);
      return { thread, isExist };
    }
  }

  async update(ch, upset) {
    const condition = { ch };
    const set = { ch, ...upset, updateTime: new Date() };
    const option = { upsert: true };
    return await this.collection.update(condition, set, option);
  }

  async updateServerMetas(ch, baseThread, updateThread) {
    const condition = { ch };
    const serverMetas = {
      ...baseThread.serverMetas,
      ...updateThread.serverMetas,
    };
    const set = { ch, serverMetas, updateTime: new Date() };
    const option = { upsert: true };
    await this.collection.update(condition, set, option);
    return serverMetas;
  }

  /******************/
  /* COLUMN LOGIC   */
  /******************/

  async getUnshifAnyChResponse(ch, response = []) {
    let schema = this.collection.getSchema({ ch });
    schema.title = Thread.getDefaultTitle();
    schema.chs = Thread.getChs(ch);
    schema.host = Thread.getHost(ch);
    schema.layer = Thread.getLayer(ch);
    schema.lastPost.ch = ch;
    schema.lastPost.chs = Thread.getChs(ch);
    schema.lastPost.stampId = 0;
    response.unshift(schema);
    return response;
  }

  merge(obj, mergeObj) {
    return { ...obj, ...mergeObj };
  }

  getCh(param) {
    return Thread.getCh(param, null);
  }

  /******************/
  /* HTML LOGIC     */
  /******************/

  async requestHtmlParams(thread, requestState) {
    const { response: htmlParams, iconHrefs } = await Logics.html.fetch(thread, requestState);
    thread = MongoDB.getBuiltinObjToSchema(thread, htmlParams);
    if (thread.favicon === Favicon.defaultFaviconPath) {
      const faviconParams: any = await Logics.favicon.fetch(thread, iconHrefs);
      thread = MongoDB.getBuiltinObjToSchema(thread, {
        ...faviconParams,
        favicon: faviconParams.faviconName,
      });
    }

    if (thread.favicon !== Favicon.defaultFaviconPath && thread.lastPost.favicon === Favicon.defaultFaviconPath) {
      thread.lastPost.favicon = thread.favicon;
    }

    return thread;
  }

  /**********************/
  /* EMOTIONS LOGIC     */
  /**********************/
}
