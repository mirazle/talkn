import conf from "client/conf";

import Sequence from "common/Sequence";
import Schema from "common/schemas/Schema";
import App from "common/schemas/state/App";
import BootOption from "common/schemas/state/BootOption";

export default class Thread extends Schema {
  static get findTypeAll(): "All" {
    return "All";
  }
  static get findTypeHtml(): "Html" {
    return "Html";
  }
  static get findTypeMusic(): "Music" {
    return "Music";
  }
  static get findTypeVideo(): "Video" {
    return "Video";
  }
  static get findTypeOther(): "Other" {
    return "Other";
  }
  static get findTypes() {
    return {
      [Thread.findTypeHtml]: ["text/html"],
      [Thread.findTypeMusic]: ["audio", "audio/mpeg", "audio/mp4", "audio/x-wav", "audio/midi", "application/x-smaf"],
      [Thread.findTypeVideo]: [
        "video",
        "video/mpeg",
        "video/mp4",
        "video/x-ms-wmv",
        "application/x-shockwave-flash",
        "video/3gpp2"
      ]
    };
  }
  static getDefaultTitle() {
    return "talkn";
  }

  static getDefaultFavicon() {
    return "user.png";
  }

  static isWindowObj(params) {
    return params.alert ? true : false;
  }

  href: string;
  ch: string;
  chs: [string] = ["/"];
  hasSlash: boolean;
  protocol: string = Sequence.TALKN_PROTOCOL;
  contentType: string;
  charset: string = "UTF-8";
  host: string = "";
  favicon: string = Thread.getDefaultFavicon();
  findType: "All" | "Html" | "Music" | "Video" = Thread.findTypeAll;
  title: string = Thread.getDefaultTitle();
  metas: any = [];
  serverMetas: any = {};
  clientMetas: any = {};
  links: any = [];
  h1s: any = [];
  audios: any = [];
  videos: any = [];
  layer: number = Thread.getLayer();
  mediaIndex: any = [];
  postCnt: number = 0;
  multiPostCnt: number = 0;
  isSelfCh: boolean = false;
  createTime: string = "";
  updateTime: string = "";
  constructor(params: any = {}, bootOption: BootOption | {}, cache: any = {}) {
    super();
    const thread = Thread.isWindowObj(params) ? Thread.constructorFromWindow(params, bootOption, cache) : params;
    return this.create(thread);
  }

  static constructorFromWindow(params, bootOption, cache) {
    const bootCh = bootOption.ch ? bootOption.ch : false;
    const ch = Thread.getCh(bootOption, bootCh);

    if (cache.ch && cache.ch === ch) {
      return cache;
    } else {
      let thread: any = {};
      thread.href = "";
      thread.ch = ch;
      thread.chs = ["/"];
      thread.hasSlash = bootOption.hasslash ? Schema.getBool(bootOption.hasslash) : false;
      thread.protocol = "talkn:";
      thread.contentType = "";
      thread.charset = "UTF-8";
      thread.host = "";
      thread.favicon = Thread.getDefaultFavicon();
      thread.findType = Thread.findTypeAll;

      if (bootCh) {
        // URLのコネクション文字列からではPROTOCOLは判別できない。
        thread.protocol = Thread.getProtocol(bootCh);
        thread.host = Thread.getHost(bootCh);
        thread.chs = bootCh.chs && bootCh.chs.length > 0 ? bootCh.chs : Thread.getChs(ch);
      } else {
        thread.protocol = location.protocol ? location.protocol : "????:";
        thread.chs = params.chs && params.chs.length > 0 ? params.chs : Thread.getChs(ch);
        thread.contentType = document.contentType ? document.contentType : "";
        thread.charset = document.charset ? document.charset : "";

        thread.host = location.host ? location.host : "";
        thread.favicon = Thread.getFaviconFromWindow(window);
      }

      thread.title = Thread.getDefaultTitle();
      thread.metas = [];
      thread.serverMetas = {};
      thread.clientMetas = {};
      thread.links = [];
      thread.h1s = [];
      thread.audios = [];
      thread.videos = [];
      thread.layer = Thread.getLayer(thread.ch);
      thread.mediaIndex = [];
      thread.postCnt = 0;
      thread.multiPostCnt = 0;
      thread.isSelfCh = Thread.getIsSelfCh(thread.href, thread.ch);
      thread.createTime = "";
      thread.updateTime = "";
      return thread;
    }
  }

  static getCh(bootOption: any, bootCh: any) {
    if (bootCh) {
      return bootCh;
    } else {
      const location: any = window.location ? window.location : {};
      let href = location.href ? location.href : "";
      if (href !== "") {
        href = href.slice(-1) === "/" ? href.slice(0, -1) : href;
        href = href.replace("http:/", "");
        href = href.replace("https:/", "");
        return href;
      } else {
        return "/";
      }
    }
  }

  static getChTop(ch) {
    if (ch !== "") {
      return "/" + ch.split("/")[1];
    } else {
      return "";
    }
  }

  static getChs(_ch) {
    let chs = ["/"];

    if (_ch !== "") {
      //ch = ch.replace(/\u002f$/g, '');
      const ch = _ch.slice(-1) === "/" ? _ch : _ch + "/";

      if (ch !== "/") {
        const chArr = ch.split("/");
        const chLength = chArr.length;
        let newCh = "";
        let noSlashCh = "";
        for (var i = 1; i < chLength; i++) {
          if (chArr[i] !== "") {
            newCh += chArr[i];

            // 一番最後が/の場合
            newCh = newCh.slice(-1) === "/" ? newCh : newCh + "/";

            // 一番最初が/の場合
            newCh = newCh.slice(0, 1) === "/" ? newCh : "/" + newCh;

            // 最後が/無しのコネクションを生成
            //noSlashCh = newCh.slice(0, -1);

            //chs.push( noSlashCh );
            chs.push(newCh);
          }
        }
      }
    }
    return chs;
  }

  static getHost(ch) {
    if (ch.indexOf(".") >= 0) {
      ch = ch.replace("https://", "").replace("http://", "");
      return ch.replace(/^\//, "").replace(/\/.*$/, "");
    } else {
      return conf.domain;
    }
  }

  static getProtocol(href) {
    if (href.indexOf("http:") >= 0) return "http:";
    if (href.indexOf("https:") >= 0) return "https:";
    if (location && location.protocol) return location.protocol;
    return "????:";
  }

  static getIsSelfCh(href, ch) {
    const replacedHref = href
      .replace("http:/", "")
      .replace("https:/", "")
      .replace(/\u002f$/, "");
    return replacedHref === ch;
  }

  static getLayer(ch = "/") {
    return ch.split("/").length - 1;
  }

  static getMediaSrc(thread) {
    return App.getMediaSrc(thread.protocol, thread.ch);
  }

  static getMediaTagType(thread) {
    const src = Thread.getMediaSrc(thread);
    return App.getMediaType(src, null);
  }

  static getFaviconFromWindow(window) {
    if (window && window.document) {
      const u = window.document.evaluate(
        "//link[contains(@rel,'icon')or(contains(@rel,'ICON'))][1]/@href",
        window.document,
        null,
        2,
        null
      ).stringValue;
      const h = "http://";
      const hs = "https://";
      const l = location.host;
      if (u.indexOf(h) || u.indexOf(hs)) {
        const url = h + l + (u || "/favicon.ico");
        const strCnt = url.split("//").length - 1;
        if (strCnt === 1) {
          return url;
        } else {
          return u;
        }
      } else {
        return u;
      }
    } else {
      return "";
    }
  }

  static getStatus(thread, app, setting = {}) {
    let status = {
      dispType: "", // TIMELINE, MULTI, SINGLE, CHILD, LOGS
      isSchema: false,
      isRequireUpsert: false,
      isMultistream: false,
      isMediaCh: false,
      isToggleMultistream: false
    };

    /*******************************************************/
    /* threadが空のSchemaかどうか(DBにデータが存在しない)        */
    /*******************************************************/

    status.isSchema = Thread.getStatusIsSchema(thread);

    /*******************************************************/
    /* 更新が必要なthreadかどうか                             */
    /*******************************************************/

    status.isRequireUpsert = Thread.getStatusIsRequireUpsert(thread, setting, status.isSchema);

    /*******************************************************/
    /* Multistream形式かどうか                               */
    /*******************************************************/

    status.isMultistream = Thread.getStatusIsMultistream(app);

    /*******************************************************/
    /* Multistreamのボタンを押したか                          */
    /*******************************************************/

    status.isToggleMultistream = Thread.getStatusIsToggleMultistream(app);

    /*******************************************************/
    /* threadが空のSchemaかどうか(DBにデータが存在しない)        */
    /*******************************************************/

    status.isMediaCh = Thread.getStatusIsMediaCh(thread.ch);

    return status;
  }

  static getStatusIsSchema(thread) {
    const threadCreateTime = thread.createTime.getTime ? thread.createTime.getTime() : thread.createTime;
    const threadUpdateTime = thread.updateTime.getTime ? thread.updateTime.getTime() : thread.updateTime;

    if (threadCreateTime === threadUpdateTime) {
      const lastPostCreateTime = thread.lastPost.createTime.getTime();
      const lastPostUpdateTime = thread.lastPost.updateTime.getTime();

      if (lastPostCreateTime === lastPostUpdateTime) {
        return true;
      }
    }
    return false;
  }

  static getStatusIsRequireUpsert(thread, setting, isSchema = false) {
    const threadUpdateTime = thread.updateTime.getTime ? thread.updateTime.getTime() : thread.updateTime;

    // 現在時刻を取得
    const now = new Date();
    const nowYear = now.getFullYear();
    const nowMonth = now.getMonth();
    const nowDay = now.getDate();
    const nowHour = now.getHours();
    const nowMinutes = now.getMinutes();
    const activeDate = new Date(nowYear, nowMonth, nowDay, nowHour - setting.server.findOneThreadActiveHour);
    const activeTime = activeDate.getTime();

    // スレッドの更新時間と、現在時間 - n を比較して、スレッドの更新時間が古かったらtrueを返す
    return isSchema ? true : threadUpdateTime < activeTime;
  }

  static getStatusIsMultistream(app) {
    return app.dispThreadType === App.dispThreadTypeMulti && app.multistream;
  }

  static getStatusIsMediaCh(ch) {
    return App.getIsMediaCh(ch);
  }

  static getStatusIsToggleMultistream(app) {
    return app.actioned === "ON_CLICK_MULTISTREAM";
  }

  static getContentTypeFromFindType(contentType) {
    const findTypeHtml = Thread.findTypes[Thread.findTypeHtml];
    const findTypeMusic = Thread.findTypes[Thread.findTypeMusic];
    const findTypeVideo = Thread.findTypes[Thread.findTypeVideo];

    let findType = "";
    let splitedContentType = "";
    if (contentType.indexOf(";") > 0) {
      splitedContentType = contentType.split(";")[0];
    }
    if (contentType.indexOf("/") > 0) {
      splitedContentType = contentType.split("/")[0];
    }

    findType = Thread.findTypeHtml;
    if (findTypeHtml.includes(splitedContentType)) {
      findType = Thread.findTypeHtml;
    }
    if (findTypeMusic.includes(splitedContentType)) {
      findType = Thread.findTypeMusic;
    }
    if (findTypeVideo.includes(splitedContentType)) {
      findType = Thread.findTypeVideo;
    }
    return findType;
  }

  static getFindTypeFromSrc(src) {
    const str = App.getMediaTypeFromSrc(src);
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
