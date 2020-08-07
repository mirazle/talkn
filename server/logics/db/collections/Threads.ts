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
    const selector = { liveCnt: 1 };
    const option = {};
    const { error, response } = await this.collection.findOne(
      condition,
      { selector, option, buildinSchema: false },
      "finedMenuIndex"
    );
    return response.liveCnt < 0 ? 0 : response.liveCnt;
  }

  async rank(requestState, setting) {
    const { app } = requestState;
    const { rootCh: ch } = app;
    const layer = Thread.getLayer(ch);

    let condition: any = {};
    condition.chs = ch;
    condition.ch = { $ne: ch };
    condition.postCnt = { $ne: 0 };
    condition.layer = { $gt: layer };

    if (app.findType === Thread.findTypeAll) {
    } else if (app.findType === Thread.findTypeOther) {
      condition["$and"] = [
        { ["lastPost.findType"]: { $ne: Thread.findTypeHtml } },
        { ["lastPost.findType"]: { $ne: Thread.findTypeVideo } },
        { ["lastPost.findType"]: { $ne: Thread.findTypeMusic } },
      ];
    } else {
      condition["lastPost.findType"] = app.findType;
    }

    const selector = { "serverMetas.title": 1, lastPost: 1, liveCnt: 1 };
    const option = {
      sort: { liveCnt: -1, layer: -1 },
      limit: setting.server.getThreadChildrenCnt,
    };
    const { response } = await this.collection.find(condition, selector, option);
    return response.map((res) => ({
      ...res.lastPost,
      title: res.serverMetas.title,
      liveCnt: res.liveCnt,
    }));
  }

  async save(thread) {
    thread.findType = Thread.getContentTypeFromFindType(thread.contentType);
    thread.updateTime = new Date();
    thread.liveCnt = thread.liveCnt < 0 ? 0 : thread.liveCnt;
    thread.hasSlash = thread.hasSlash === null ? false : thread.hasSlash;
    //thread.title = thread.serverMetas.title ? thread.serverMetas.title : thread.serverMetas["og:title"];
    const { response: resThread } = await this.collection.save(thread);
    return resThread;
  }

  async resetWatchCnt() {
    const condition = { liveCnt: { $exists: true, $ne: 0 } };
    const set = { $set: { liveCnt: 0 } };
    const option = { upsert: false, multi: true };
    return await this.collection.update(condition, set, option);
  }

  async tune(thread, liveCnt, update = false) {
    const { ch } = thread;
    if (thread.save) {
      thread.liveCnt = update ? liveCnt : thread.liveCnt + liveCnt;
      thread = await Logics.db.threads.save(thread);
      return { thread, isExist: true };
    } else {
      let { response: resThread, isExist } = await Logics.db.threads.findOne(ch);

      if (update) {
        resThread.liveCnt = liveCnt;
      } else {
        resThread.liveCnt = resThread.liveCnt + liveCnt;
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
