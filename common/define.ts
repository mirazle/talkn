import process from "process";
const hostName = process.env.HOSTNAME ? process.env.HOSTNAME : "localhost";
const define: any = {
  PRODUCTION: "PRODUCTION",
  LOCALHOST: "LOCALHOST",
  DEVELOPMENT: "DEVELOPMENT",
  PRODUCTION_IP: hostName,
  PRODUCTION_DOMAIN: "talkn.io",
  DEVELOPMENT_DOMAIN: "localhost",
  PORTS: {
    HTTP: 80,
    HTTPS: 443,
    DEVELOPMENT: 8080,
    DEVELOPMENT_API: 8081,
    REDIS: 6379,
    MONGO: 27017,
    SOCKET_IO: 10443,
  },
  SUB_DOMAINS: {
    WWW: "www",
    API: "api",
    DESC: "desc",
    PORTAL: "portal",
    CLIENT: "client",
    ASSETS: "assets",
    SESSION: "session",
    AUTO: "auto",
    EXT: "ext",
    TRANSACTION: "transaction",
  },
  APP_TYPES: {
    PORTAL: "PORTAL",
    EXTENSION: "EXTENSION",
    API: "API",
  },
  URL: {
    twitter: "https://twitter.com/",
    facebook: "https://www.facebook.com/",
    appstore: "https://itunes.apple.com/app/id",
    playstore: "https://play.google.com/store/apps/details?id=",
  },
  talknClientJs: "talkn.client.js",
  talknApiJs: "talkn.api.js",
  noInnerNotif: "Sorry, No Function.",
  storageKey: {
    baseKey: "@talkn@",
    postsTimelineZero: "postsTimelineZero",
    postsTimeline: "postsTimeline",
    postsSingle: "postsSingle",
    postsMulti: "postsMulti",
    postsChild: "postsChild",
    postsLogs: "postsLogs",
    threads: "threads",
  },
};

export default define;
