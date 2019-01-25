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
    EXT: 'ext',
  },
  APP_TYPES: {
    PORTAL: 'portal',
    EXTENSION: 'extension'
  },
  storageKey: {
    baseKey: '@talkn@',
    postSingle: 'Single',
    postMulti: 'Multi',
    postChild: 'Child',
    postLogs: 'Logs',
    thread: 'therad',
    menuLogs: 'menuLogs',
    setting: 'setting',
    app: 'app'
  }
}
