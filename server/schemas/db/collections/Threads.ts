import Posts from "./Posts";
import Thread from "api/store/Thread";
import Plain from "common/emotions/model/Plain";
import Russell from "common/emotions/model/Russell";
import RussellSimple from "common/emotions/model/RussellSimple";
import Html from "server/schemas/logics/html";
import Favicon from "server/logics/Favicon";

const html: Html = new Html({});
const plain = Plain.getSchemas();
const russell = Russell.getSchemas();
const russellSimple = RussellSimple.getSchemas();
const data = new Date();
export default {
  ch: { type: String, default: "/" },
  chs: { type: [String], default: ["/"] },
  findType: { type: String, default: Thread.findTypeHtml },
  hasSlash: { type: Boolean, default: false },
  host: { type: String, default: "" },
  layer: { type: Number, default: 0 },
  title: { type: String, default: "talkn" },
  favicon: { type: String, default: Favicon.defaultFaviconPath },
  faviconType: {
    type: String,
    default: Favicon.defaultFaviconData.faviconType,
  },

  // Analyze
  postCnt: { type: Number, default: 0 },
  multiPostCnt: { type: Number, default: 0 },
  watchCnt: { type: Number, default: 1, min: 0 },

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

  // Time
  createTime: { type: Date, default: Date },
  updateTime: { type: Date, default: Date },
};
