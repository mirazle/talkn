const PRODUCTION = 'production';
const DEVELOPMENT = 'development';
const env = process.env.HOSTNAME ? PRODUCTION : DEVELOPMENT ;
const proxySllKeyPem = env === PRODUCTION ? '/etc/letsencrypt/live/talkn.io-0001/privkey.pem' : ''; 
const proxySllCertPem = env === PRODUCTION ? '/etc/letsencrypt/live/talkn.io-0001/cert.pem' : ''; 


export default {
  env,
  proxySllPort: 443,
  proxySllKeyPem,
  proxySllCertPem,
  user: {},
  client: {sync_time: 500, stream_sync_term: 12,stream_sync_term_cnt: 12},
  ssl: { key: '/etc/letsencrypt/live/discovery-plus.com/cert.pem', cert: '/etc/letsencrypt/live/discovery-plus.com/privkey.pem' },
  socket_io: { host: 'localhost', http_port: 10001, https_port: 10443 },
  redis: { host: 'localhost', port: 6379 },
  mongoDB: { host: 'localhost', port: 27017, dbName: 'talkn', option: { server: { auto_reconnect: true } } },
  localMap:{ jp: 'ja', cn: 'zh', de: 'de', fr: 'fr', gb: 'gb', br: 'br', us: 'en'}
}

