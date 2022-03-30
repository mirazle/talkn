import Plain from 'common/emotions/model/Plain';
import Russell from 'common/emotions/model/Russell';
import RussellSimple from 'common/emotions/model/RussellSimple';

import Favicon from 'server/logics/Favicon';
import Html from 'server/schemas/logics/html';

import Thread from 'api/store/Thread';

import Posts from './Posts';

const html: Html = new Html({});
const plain = Plain.getSchemas();
const russell = Russell.getSchemas();
const russellSimple = RussellSimple.getSchemas();
const data = new Date();
export default {
  ch: { type: String, default: '/' },
  chs: { type: [String], default: ['/'] },
  findType: { type: String, default: Thread.findTypeHtml },
  hasSlash: { type: Boolean, default: false },
  host: { type: String, default: '' },
  layer: { type: Number, default: 0 },
  title: { type: String, default: 'talkn' },
  favicon: { type: String, default: Favicon.defaultFaviconPath },
  faviconType: {
    type: String,
    default: Favicon.defaultFaviconData.faviconType,
  },

  // Analyze
  postCnt: { type: Number, default: 0 },
  multiPostCnt: { type: Number, default: 0 },
  liveCnt: { type: Number, default: 0, min: 0 },

  // html(serverMetas)
  ...html,

  // Post
  lastPost: Posts,

  // Emotions
  like: { type: Number, default: 0 },

  // Emotions
  emotions: {
    plain,
    russell,
    russellSimple,
  },

  // LivePages
  categoryChs: [],

  // Config
  creatorsCnt: { type: Number, default: 0 },
  updateCreatorsTime: { type: Date },

  iamTags: { type: [], default: [] },
  searchTags: { type: [], default: [] },

  // Time
  createTime: { type: Date, default: Date },
  updateTime: { type: Date, default: Date },
};
