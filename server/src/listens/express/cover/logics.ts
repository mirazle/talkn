import Mongoose from 'mongoose';

import { ConfigType, configInit } from 'common/talknConfig';

import conf from 'server/conf';
import MongoDB from 'server/listens/db/MongoDB';
import Logics from 'server/logics';
import Favicon from 'server/logics/Favicon';
import Fs from 'server/logics/Fs';
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

export const build = async ({ ch }, req, res) => {
  if (!fetchingRootCh.includes(ch)) {
    fetchingRootCh.push(ch);

    let { response: thread } = await Logics.db.threads.findOne(ch, { buildinSchema: true });
    const html = new Html();
    html.depthLimit = 3;
    html.allChLayers = html.getMergedChLayersFromLinks(ch, ch, thread.categoryChs);

    html.fetchChRecurrent(ch).then(async (results: any) => {
      let categoryChs = [];

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

export const login = async (requestJson, req, res) => {
  const resultFind = await Logics.db.users.findOne({ email: requestJson.email });
  let resultUpdate;

  if (resultFind.response === null) {
    resultUpdate = await Logics.db.users.findOneAndUpdate(
      { email: requestJson.email },
      {
        email: requestJson.email,
        name: requestJson.name,
        bg: Fs.names.assetsCoverDefaultBg,
        icon: Fs.names.assetsCoverDefaultIcon,
      },
      { new: true, upsert: true }
    );

    Logics.fs.mkdirAssetsCover(resultUpdate.response._id, () => Logics.fs.copyDefaultFile(resultUpdate.response._id));
  } else {
    resultUpdate = await Logics.db.users.findOneAndUpdate(
      { email: requestJson.email },
      { name: requestJson.name },
      { new: true, upsert: true }
    );
  }

  res.send(resultUpdate);
};

export const search = async (req, _, res) => {
  const tagType = req.tagType;
  const columnType = tagType === 'member' ? 'jobId' : 'startupSeriesId';
  const optionalCondition = { [columnType]: req[columnType] };
  const tagConditions = {
    //    email: { $ne: req.email },
    tagParentType: 'self',
    tagType,
    industoryId: req.industoryId,
    ...optionalCondition,
    sexes: { $in: req.sexes },
    languages: { $in: req.languages },
    birthday: { $gte: req.birthday }, // new Date(685238400000) 1991/09/19  // new Date(613353600000) 1989/06/09 ..
    year: { $gte: req.year },
  };

  // UserTag
  const resultTags = await Logics.db.userTags.find(tagConditions, { userId: 1 });

  if (resultTags.response.length > 0) {
    const userIds = resultTags.response.map((res) => res.userId);

    const userConditions = { _id: { $in: userIds } };
    // User
    const resultUser = await Logics.db.users.find(userConditions);

    res.send(resultUser);
  } else {
    res.send({ error: null, response: [] });
  }
};

export const saveUser = async (requestJson, req, res) => {
  await Logics.db.users.update({ _id: requestJson._id }, requestJson);
  await Logics.db.userTags.update(
    { userId: requestJson._id },
    { sexes: requestJson.sexes, birthday: requestJson.birthday, languages: requestJson.languages }
  );

  res.send({ messages: 'OK' });
};

export const removeUserTag = async (requestJson, req, res) => {
  const { userTags, user } = requestJson;
  const userTagsConditions = { _id: userTags._id };
  const userConditions = { _id: user._id };
  const userTagsResult = await Logics.db.userTags.remove(userTagsConditions);
  const userResult = await Logics.db.users.update(userConditions, user);
  res.send(userTagsResult);
};

export const upsertUserTag = async (requestJson, req, res) => {
  const { userTags, user } = requestJson;
  const userConditions = { _id: user._id };
  let userTagsConditions = {};

  // update
  if (userTags._id && userTags._id !== '') {
    userTagsConditions['_id'] = userTags._id;

    // new
  } else {
    delete userTags._id;
    userTagsConditions['userId'] = userTags.userId;
    userTagsConditions['tagParentType'] = userTags.tagParentType;
    userTagsConditions['tagType'] = userTags.tagType;
    userTagsConditions['index'] = userTags.index;
  }
  const userTagsResult = await Logics.db.userTags.update(userTagsConditions, userTags);
  const userResult = await Logics.db.users.update(userConditions, user);
  res.send(userTagsResult);
};

export const saveUserBg = async (_id, path, req, res) => {
  Logics.fs.writeImage(_id, path, 'bg');
  res.send({ message: 'OK' });
};

export const saveUserIcon = async (_id, path, req, res) => {
  Logics.fs.writeImage(_id, path, 'icon');
  res.send({ message: 'OK' });
};

export const exeFetchConfig = async (req, res, ch, protocol = 'https'): Promise<ConfigType> => {
  let config = await Logics.html.exeFetchConfig(protocol, ch);

  if (config === null) {
    config = await Logics.fs.getConfig(ch);
    if (config === null) {
      config = { ...configInit };
    }
  }

  if (config) {
    if (config.stories.length > 0) {
      return {
        ...config,
        stories: config.stories.map((creatorIndex, index) => {
          return ch === '/' ? { ...creatorIndex, ch, no: config.stories.length } : { ...creatorIndex, ch, no: index + 1 };
        }),
      };
    } else {
      return config;
    }
  } else {
    return null;
  }
};

export const fetchConfig = async (req, res, ch, protocol) => {
  const config = await exeFetchConfig(req, res, ch, protocol);
  await Logics.db.threads.update(ch, { categoryChs: config.categoryChs });
};

export const getStaticTags = async (): Promise<any> => {
  const industoryParent = await Logics.db.industoryParent.find();
  const industory = await Logics.db.industory.find();
  const jobTerm = await Logics.db.jobTerm.find();
  const jobTitle = await Logics.db.jobTitle.find();
  const jobParents = await Logics.db.jobParents.find();
  const jobCategory = await Logics.db.jobCategory.find();
  const jobs = await Logics.db.jobs.find();
  const startupSeries = await Logics.db.startupSeries.find();
  const story = await Logics.db.story.find();
  return { industoryParent, industory, startupSeries, jobTerm, jobTitle, jobParents, jobCategory, jobs, story };
};

export const getUsers = async (conditios = {}): Promise<any> => {
  const users = await Logics.db.users.find(conditios);
  return users.response;
};

export const getUser = async (_id): Promise<any> => {
  const user = await Logics.db.users.findOne({ _id }, true);
  return user.response;
};

export const getUserTags = async (_id): Promise<any> => {
  const userTags = await Logics.db.userTags.find({ userId: _id });
  return userTags.response;
};

export const top = async (params, json = false, req, res) => {};

export const users = async (params, json = false, req, res) => {
  const method = 'users';
  const [userId] = params;
  const responseMethod = json ? 'json' : 'render';
  const config = await exeFetchConfig(req, res, userId);

  let language = 'en';
  let storiesIndexParam = 0;

  if (userId) {
    const staticTags = await getStaticTags();
    const user = await getUser(userId);
    const users = [];
    const userTags = await getUserTags(userId);

    const stories = Logics.fs.getStories(userId, storiesIndexParam, config);
    const response = {
      language,
      method,
      stories,
      config,
      staticTags,
      user,
      users,
      userTags,
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

    if (responseMethod === 'render') {
      res.render('cover/', response);
    } else {
      res.json(response);
    }
  } else {
    const users = await getUsers();
    const response = {
      language,
      method,
      users,
      stories: [],
      config,
      staticTags: {},
      user: {},
      userTags: [],
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
    if (responseMethod === 'render') {
      res.render('cover/', response);
    } else {
      res.json(response);
    }
  }

  res.end();
};

export const getDomainProfile = async (req, res, protocol, ch, language, storiesIndexParam?: number, isGetTags = false): Promise<any> => {
  const id = ch.replace(/^\/|\/$/g, '');
  const staticTags = isGetTags ? await getStaticTags() : {};
  const user = await getUser(id);
  const userTags = isGetTags ? await getUserTags(id) : [];
  let config = await exeFetchConfig(req, res, id, protocol);

  const stories = Logics.fs.getStories(id, storiesIndexParam, config);

  let { response: thread, isExist }: any = await Logics.db.threads.findOne(id, { buildinSchema: true });
  const isRequireUpsert = Thread.getStatusIsRequireUpsert(thread, isExist);
  let isAddStoriesConfig = false;
  if (ch === '/') {
    const promiseAll = [];
    const chObj = await Logics.db.threads.coverTopStoriesIndex();

    chObj.reverse().forEach(async (obj) => {
      promiseAll.push(exeFetchConfig(req, res, obj.protocol, obj.ch));
    });

    const stories = await Promise.all(promiseAll);

    config.stories = stories.filter((obj) => obj.stories && obj.stories.length > 0).map((obj) => obj.stories[obj.stories.length - 1]);
  } else {
    isAddStoriesConfig = config.stories.length > thread.storiesCnt;

    if (isAddStoriesConfig) {
      thread.storiesCnt = config.stories.length;
      thread.updateStoriesTime = new Date();
    }
  }

  // 作成・更新が必要なスレッドの場合
  if (isRequireUpsert) {
    thread = await Logics.db.threads.requestHtmlParams(thread, { protocol, ch, hasSlash: true });
  }

  // スレッド新規作成
  if (!isExist || isAddStoriesConfig) {
    thread = await Logics.db.threads.save(thread);
  }

  // ドメイン非保有ユーザー用の処理
  if (thread.favicon === Thread.getDefaultFavicon() && config.favicon && config.favicon !== '') {
    thread.favicon = `//${conf.coverURL}${ch}${config.favicon}`;
  }
  if (thread.serverMetas['og:image'] === conf.ogpImages.Html && config.ogpImage && config.ogpImage !== '') {
    thread.serverMetas['og:image'] = `//${conf.coverURL}${ch}${config.ogpImage}`;
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
  config.categoryChs = config.categoryChs.length > 0 ? config.categoryChs : thread.categoryChs;

  return {
    language,
    stories,
    config,
    staticTags,
    user,
    userTags,
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
    payload: {},
  };
};
