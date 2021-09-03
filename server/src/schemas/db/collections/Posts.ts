import mongoose from 'mongoose';

import Favicon from 'server/logics/Favicon';

const SchemaTypes = mongoose.Schema.Types;

export const defaultTitle = 'talkn';
export default {
  protocol: { type: String, default: 'talkn:' },
  ch: { type: String, default: '' },
  chs: { type: [String], default: [] },
  layer: { type: Number, default: 0 },
  uid: { type: String, default: '' },
  utype: { type: String, default: '' },
  favicon: { type: String, default: Favicon.defaultFaviconPath },
  title: { type: String, default: defaultTitle },
  post: { type: String, default: '' },
  stampId: { type: Number, default: 0 },
  data: { type: Object, default: {} },
  findType: { type: String, default: '' },
  currentTime: { type: Number, default: 0.0 },
  // Time
  createTime: { type: Date, default: Date },
  updateTime: { type: Date, default: Date },
  dispFlg: { type: Boolean, default: true },
};
