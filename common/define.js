export default {
  PRODUCTION:'production',
  DEVELOPMENT: 'development',
  PRODUCTION_IP: 'ip-172-31-27-3',
  PRODUCTION_DOMAIN: 'talkn.io',
  DEVELOPMENT_DOMAIN: 'localhost',
  PORTS: {
    HTTP: 80,
    HTTPS: 443,
    DEVELOPMENT: 8080,
    REDIS: 6379,
    MONGO: 27017,
    SOCKET_IO: 10443,
  },
  SUB_DOMAINS: {
    PORTAL: 'portal',
    CLIENT: 'client',
    ASSETS: 'assets',
    SESSION: 'session',
    AUTO: 'auto',
    EXT: 'ext',
  },
  APP_TYPES: {
    PORTAL: 'portal',
    EXTENSION: 'extension',
    IFRAME: 'iframe'
  },
  noInnerNotif: "Sorry, No Function.",
  storageKey: {
    baseKey: '@talkn@',
    postsSingle: 'postsSingle',
    postsMulti: 'postsMulti',
    postsChild: 'postsChild',
    postsLogs: 'postsLogs',
    threads: 'threads'
  }
}
