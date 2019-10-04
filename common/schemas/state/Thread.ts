import conf from "client/conf";
import Schema from "common/schemas/Schema";
import App from "common/schemas/state/App";
import User from "common/schemas/state/User";

export default class Thread extends Schema {
  static get findTypeAll() {
    return "All";
  }
  static get findTypeHtml() {
    return "Html";
  }
  static get findTypeMusic() {
    return "Music";
  }
  static get findTypeVideo() {
    return "Video";
  }
  static get findTypeOther() {
    return "Other";
  }
  static get findTypes() {
    return {
      [Thread.findTypeHtml]: ["text/html"],
      [Thread.findTypeMusic]: [
        "audio",
        "audio/mpeg",
        "audio/mp4",
        "audio/x-wav",
        "audio/midi",
        "application/x-smaf"
      ],
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

  protocol: any;
  connection: any;
  constructor(params: any = {}, bootOption: any = {}, cache: any = {}) {
    super();
    const thread = Thread.isWindowObj(params)
      ? Thread.constructorFromWindow(params, bootOption, cache)
      : params;
    return this.create(thread);
  }

  static constructorFromWindow(params, bootOption, cache) {
    const bootConnection = bootOption.connection
      ? bootOption.connection
      : false;
    const connection = Thread.getConnection(bootOption, bootConnection);

    if (cache.connection && cache.connection === connection) {
      return cache;
    } else {
      let thread: any = {};
      thread.location = {};
      thread.href = "";
      thread.connection = connection;
      thread.connections = ["/"];
      thread.hasSlash = bootOption.hasslash
        ? Schema.getBool(bootOption.hasslash)
        : false;
      thread.protocol = "talkn:";
      thread.contentType = "";
      thread.charset = "UTF-8";
      thread.host = "";
      thread.favicon = Thread.getDefaultFavicon();
      thread.findType = Thread.findTypeAll;

      if (bootConnection) {
        // URLのコネクション文字列からではPROTOCOLは判別できない。
        thread.protocol = Thread.getProtocol(bootConnection);
        thread.host = Thread.getHost(bootConnection);
        thread.connections =
          bootConnection.connections && bootConnection.connections.length > 0
            ? bootConnection.connections
            : Thread.getConnections(connection);
      } else {
        thread.protocol = location.protocol ? location.protocol : "????:";
        thread.connections =
          params.connections && params.connections.length > 0
            ? params.connections
            : Thread.getConnections(connection);
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
      thread.layer = Thread.getLayer(thread.connection);
      thread.mediaIndex = [];
      thread.postCnt = 0;
      thread.multiPostCnt = 0;
      thread.isSelfConnection = Thread.getIsSelfConnection(
        thread.href,
        thread.connection
      );
      thread.createTime = "";
      thread.updateTime = "";
      return thread;
    }
  }

  static getConnection(bootOption: any, bootConnection: any) {
    if (bootConnection) {
      return bootConnection;
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

  static getConnectionTop(connection) {
    if (connection !== "") {
      return "/" + connection.split("/")[1];
    } else {
      return "";
    }
  }

  static getConnections(_connection) {
    let connections = ["/"];

    if (_connection !== "") {
      //connection = connection.replace(/\u002f$/g, '');
      const connection =
        _connection.slice(-1) === "/" ? _connection : _connection + "/";

      if (connection !== "/") {
        const connectionArr = connection.split("/");
        const connectionLength = connectionArr.length;
        let newConnection = "";
        let noSlashConnection = "";
        for (var i = 1; i < connectionLength; i++) {
          if (connectionArr[i] !== "") {
            newConnection += connectionArr[i];

            // 一番最後が/の場合
            newConnection =
              newConnection.slice(-1) === "/"
                ? newConnection
                : newConnection + "/";

            // 一番最初が/の場合
            newConnection =
              newConnection.slice(0, 1) === "/"
                ? newConnection
                : "/" + newConnection;

            // 最後が/無しのコネクションを生成
            //noSlashConnection = newConnection.slice(0, -1);

            //connections.push( noSlashConnection );
            connections.push(newConnection);
          }
        }
      }
    }
    return connections;
  }

  static getHost(connection) {
    if (connection.indexOf(".") >= 0) {
      connection = connection.replace("https://", "").replace("http://", "");
      return connection.replace(/^\//, "").replace(/\/.*$/, "");
    } else {
      return conf.domain;
    }
  }

  static getProtocol(href) {
    if (href.indexOf("http:") >= 0) return "http:";
    if (href.indexOf("https:") >= 0) return "https:";
    return "????:";
  }

  static getIsSelfConnection(href, connection) {
    const replacedHref = href
      .replace("http:/", "")
      .replace("https:/", "")
      .replace(/\u002f$/, "");
    return replacedHref === connection;
  }

  static getLayer(connection) {
    return connection.split("/").length - 1;
  }

  getMediaSrc() {
    return App.getMediaSrc(this.protocol, this.connection);
  }

  getMediaTagType() {
    const src = this.getMediaSrc();
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
      isMediaConnection: false,
      isToggleMultistream: false
    };

    /*******************************************************/
    /* threadが空のSchemaかどうか(DBにデータが存在しない)        */
    /*******************************************************/

    status.isSchema = Thread.getStatusIsSchema(thread);

    /*******************************************************/
    /* 更新が必要なthreadかどうか                             */
    /*******************************************************/

    status.isRequireUpsert = Thread.getStatusIsRequireUpsert(
      thread,
      setting,
      status.isSchema
    );

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

    status.isMediaConnection = Thread.getStatusIsMediaConnection(
      thread.connection
    );

    return status;
  }

  static getStatusIsSchema(thread) {
    const threadCreateTime = thread.createTime.getTime
      ? thread.createTime.getTime()
      : thread.createTime;
    const threadUpdateTime = thread.updateTime.getTime
      ? thread.updateTime.getTime()
      : thread.updateTime;

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
    const threadUpdateTime = thread.updateTime.getTime
      ? thread.updateTime.getTime()
      : thread.updateTime;

    // 現在時刻を取得
    const now = new Date();
    const nowYear = now.getFullYear();
    const nowMonth = now.getMonth();
    const nowDay = now.getDate();
    const nowHour = now.getHours();
    const nowMinutes = now.getMinutes();
    const activeDate = new Date(
      nowYear,
      nowMonth,
      nowDay,
      nowHour - setting.server.findOneThreadActiveHour
    );
    const activeTime = activeDate.getTime();

    // スレッドの更新時間と、現在時間 - n を比較して、スレッドの更新時間が古かったらtrueを返す
    return isSchema ? true : threadUpdateTime < activeTime;
  }

  static getStatusIsMultistream(app) {
    return app.dispThreadType === App.dispThreadTypeMulti && app.multistream;
  }

  static getStatusIsMediaConnection(connection) {
    return App.getIsMediaConnection(connection);
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