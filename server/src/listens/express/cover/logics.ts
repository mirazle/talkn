import { ConfigType, configInit } from 'common/Config';

import conf from 'server/conf';
import MongoDB from 'server/listens/db/MongoDB';
import Logics from 'server/logics';
import Favicon from 'server/logics/Favicon';
import Html from 'server/logics/Html';

import Thread from 'api/store/Thread';

let fetchingRootCh = [];

export const assets = (req, res) => {
  // CORSを許可する
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.sendFile(conf.serverCoverPath + req.originalUrl.replace('/', ''));
  return true;
};

export const build = async (req, res, ch) => {
  if (!fetchingRootCh.includes(ch)) {
    fetchingRootCh.push(ch);

    let { response: thread } = await Logics.db.threads.findOne(ch, { buildinSchema: true });
    const html = new Html();
    html.depthLimit = 3;
    html.allChLayers = html.getMergedChLayersFromLinks(ch, ch, thread.userCategoryChs);

    html.fetchChRecurrent(ch).then(async (results: any) => {
      let categoryChs = [];
      fetchingRootCh = fetchingRootCh.filter((innerCh) => innerCh !== ch);
      console.log('ALL RESULTS', results.length);
      html.successCh.forEach((ch) => {
        if (Thread.getLayer(ch) >= 3) {
          const splitedCh = ch.split('/');
          const rootCh = splitedCh[1];
          const category = splitedCh[2];
          const categotyCh = `/${rootCh}/${category}/`;
          if (!categoryChs.includes(categotyCh)) {
            categoryChs.push(categotyCh);
          }
        }
      });

      thread.categoryChs = categoryChs;

      // TODO: 共通化(Threads.requestHtmlParams)
      const faviconParams: any = await Logics.favicon.fetch(thread, results[0].iconHrefs);
      thread = MongoDB.getBuiltinObjToSchema(thread, {
        ...faviconParams,
        favicon: faviconParams.faviconName,
      });

      if (thread.favicon !== Favicon.defaultFaviconPath && thread.lastPost.favicon === Favicon.defaultFaviconPath) {
        thread.lastPost.favicon = thread.favicon;
      }

      Logics.db.threads.save(thread);

      results.forEach((result: any) => {
        Logics.db.threads.update(result.ch, { ...result.response, ...faviconParams, favicon: faviconParams.faviconName });
      });
    });
  } else {
    res.send('now proccess');
  }
};

export const exeFetchConfig = async (req, res, protocol, ch): Promise<ConfigType> => {
  let config = await Logics.html.exeFetchConfig(protocol, ch);
  if (config === null) {
    config = await Logics.fs.getConfig(ch);

    if (config === null) {
      config = { ...configInit };
    }
  }
  return config;
};

export const fetchConfig = async (req, res, protocol, ch) => {
  const config = await exeFetchConfig(req, res, protocol, ch);
  await Logics.db.threads.update(ch, { userCategoryChs: config.userCategoryChs });
};

export const getDomainProfile = async (req, res, protocol, ch, language, creatorsIndexParam?: number): Promise<any> => {
  let config = await exeFetchConfig(req, res, protocol, ch);
  const creators = Logics.fs.getCreators(ch, creatorsIndexParam, config);
  let { response: thread, isExist }: any = await Logics.db.threads.findOne(ch, { buildinSchema: true });
  const isRequireUpsert = Thread.getStatusIsRequireUpsert(thread, isExist);

  // 作成・更新が必要なスレッドの場合
  if (isRequireUpsert) {
    thread = await Logics.db.threads.requestHtmlParams(thread, { protocol, ch, hasSlash: true });
    // スレッド新規作成
    if (!isExist) {
      thread = await Logics.db.threads.save(thread);
    }
  }
  const serverMetas = { ...thread.serverMetas };
  thread.serverMetas = undefined;
  thread.lastPost = undefined;
  thread.links = undefined;
  thread.emotions = undefined;
  thread.h1s = undefined;
  thread.h2s = undefined;
  thread.h3s = undefined;
  thread.h4s = undefined;
  thread.h5s = undefined;
  config.userCategoryChs = config.userCategoryChs.length > 0 ? config.userCategoryChs : thread.categoryChs;

  return {
    language,
    creators,
    config,
    thread,
    serverMetas,
    domain: conf.domain,
    apiURL: conf.apiURL,
    wwwURL: conf.wwwURL,
    coverURL: conf.coverURL,
    tuneURL: conf.tuneURL,
    extURL: conf.extURL,
    componentsURL: conf.componentsURL,
    assetsURL: conf.assetsURL,
    clientURL: conf.clientURL,
    apiAccessURL: conf.apiAccessURL,
  };
};