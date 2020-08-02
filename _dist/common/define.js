"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const process_1 = __importDefault(require("process"));
const hostName = process_1.default.env.HOSTNAME ? process_1.default.env.HOSTNAME : "localhost";
const define = {
    PRODUCTION: "PRODUCTION",
    LOCALHOST: "LOCALHOST",
    DEVELOPMENT: "DEVELOPMENT",
    PRODUCTION_IP: hostName,
    PRODUCTION_DOMAIN: "talkn.io",
    DEVELOPMENT_DOMAIN: "localhost",
    AWS_HOST_KEY: "ec2.internal",
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
exports.default = define;
//# sourceMappingURL=define.js.map