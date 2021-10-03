import process from 'process';

const hostName = process.env.HOSTNAME ? process.env.HOSTNAME : 'localhost';
const define: any = {
  APP_NAME: 'talkn',
  PRODUCTION: 'PRODUCTION',
  LOCALHOST: 'LOCALHOST',
  DEVELOPMENT: 'DEVELOPMENT',
  PRODUCTION_IP: hostName,
  PRODUCTION_DOMAIN: 'talkn.io',
  DEVELOPMENT_DOMAIN: 'localhost',
  AWS_HOST_KEY: 'ec2.internal',
  PORTS: {
    HTTP: 80,
    HTTPS: 443,
    DEVELOPMENT_TOP: 8000,
    DEVELOPMENT_API: 8001,
    DEVELOPMENT_RANK: 8002,
    DEVELOPMENT_CLIENT: 8080,
    REDIS: 6379,
    MONGO: 27017,
    SOCKET_IO: 10443,
  },
  SUB_DOMAINS: {
    WWW: 'www',
    API: 'api',
    DESC: 'desc',
    PORTAL: 'portal',
    CLIENT: 'client',
    ASSETS: 'assets',
    SESSION: 'session',
    AUTO: 'auto',
    OWN: 'own',
    NEWS: 'news',
    BANNER: 'banner',
    TOP: 'top',
    RANK: 'rank',
    EXT: 'ext',
    TRANSACTION: 'transaction',
  },
  APP_TYPES: {
    PORTAL: 'PORTAL',
    EXTENSION: 'EXTENSION',
    API: 'API',
    TOP: 'TOP',
    RANK: 'RANK',
  },
  URL: {
    twitter: 'https://twitter.com/',
    facebook: 'https://www.facebook.com/',
    appstore: 'https://itunes.apple.com/app/id',
    playstore: 'https://play.google.com/store/apps/details?id=',
    chromeExtension: 'https://chrome.google.com/webstore/detail/talkn-for-chrome/dkngnmdlcofambpfaccepbnjgfholgbo?hl=en',
  },
  talknClientJs: 'talkn.client.js',
  talknApiJs: 'talkn.api.js',
  talknRankJs: 'talkn.rank.js',
  noInnerNotif: 'Sorry, No Function.',
  bannerClass: 'talkn_banner',
  storageKey: {
    baseKey: '@talkn@',
    postsTimelineZero: 'postsTimelineZero',
    postsTimeline: 'postsTimeline',
    postsSingle: 'postsSingle',
    postsMulti: 'postsMulti',
    postsChild: 'postsChild',
    postsLogs: 'postsLogs',
    threads: 'threads',
  },
};

export default define;
