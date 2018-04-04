import fs from 'fs';

const PRODUCTION = 'production';
const DEVELOPMENT = 'development';
const env = process.env.HOSTNAME ? PRODUCTION : DEVELOPMENT ;

const proxySllKeyPem = env === PRODUCTION ? '/etc/letsencrypt/live/talkn.io-0001/privkey.pem' : ''; 
const proxySllCertPem = env === PRODUCTION ? '/etc/letsencrypt/live/talkn.io-0001/cert.pem' : ''; 
const proxySllPems = env === PRODUCTION ? 
  {key:  fs.readFileSync( proxySllKeyPem ), cert: fs.readFileSync( proxySllCertPem )} :
  {key:  fs.readFileSync( proxySllKeyPem ), cert: fs.readFileSync( proxySllCertPem )} ;


const sllKeyPem = env === PRODUCTION ? '/etc/letsencrypt/live/talkn.io/privkey.pem' : ''; 
const sllCertPem = env === PRODUCTION ? '/etc/letsencrypt/live/talkn.io/cert.pem' : ''; 
const sllPems = env === PRODUCTION ? 
  {key:  fs.readFileSync( sllKeyPem ), cert: fs.readFileSync( sllCertPem )} :
  {key:  fs.readFileSync( sllKeyPem ), cert: fs.readFileSync( sllCertPem )} ;

export default {
  env,
  sllOptions:{ pems: sllPems, port: 443 },
  proxySllOptions:{ pems: proxySllPems, port: 443 },
  user: {},
  client: {sync_time: 500, stream_sync_term: 12,stream_sync_term_cnt: 12},
  ssl: { key: '/etc/letsencrypt/live/discovery-plus.com/cert.pem', cert: '/etc/letsencrypt/live/discovery-plus.com/privkey.pem' },
  socket_io: { host: 'localhost', http_port: 10001, https_port: 10443 },
  redis: { host: 'localhost', port: 6379 },
  mongoDB: { host: 'localhost', port: 27017, dbName: 'talkn', option: { server: { auto_reconnect: true } } },
  localMap:{ jp: 'ja', cn: 'zh', de: 'de', fr: 'fr', gb: 'gb', br: 'br', us: 'en'}
}

