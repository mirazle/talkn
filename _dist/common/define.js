"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const define = {
    PRODUCTION: "production",
    LOCALHOST: "localhost",
    DEVELOPMENT: "development",
    PRODUCTION_IP: "ip-172-31-27-3",
    PRODUCTION_DOMAIN: "talkn.io",
    DEVELOPMENT_DOMAIN: "localhost",
    PORTS: {
        HTTP: 80,
        HTTPS: 443,
        DEVELOPMENT: 8080,
        DEVELOPMENT_API: 8081,
        REDIS: 6379,
        MONGO: 27017,
        SOCKET_IO: 10443
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
        TRANSACTION: "transaction"
    },
    APP_TYPES: {
        PORTAL: "portal",
        EXTENSION: "extension"
    },
    URL: {
        twitter: "https://twitter.com/",
        facebook: "https://www.facebook.com/",
        appstore: "https://itunes.apple.com/app/id",
        playstore: "https://play.google.com/store/apps/details?id="
    },
    talknClientJs: "talkn.client.js",
    noInnerNotif: "Sorry, No Function.",
    storageKey: {
        baseKey: "@talkn@",
        postsTimelineZero: "postsTimelineZero",
        postsTimeline: "postsTimeline",
        postsSingle: "postsSingle",
        postsMulti: "postsMulti",
        postsChild: "postsChild",
        postsLogs: "postsLogs",
        threads: "threads"
    }
};
exports.default = define;
//# sourceMappingURL=define.js.map