import fs from 'fs';
import os from 'os';

import conf from 'common/conf';
import define from 'common/define';

const { PRODUCTION, PORTS } = define;
const { env } = conf;
const homeDir = os.homedir();
const localhostPemKey = `${homeDir}/talkn/common/pems/localhost.key`;
const localhostPemCrt = `${homeDir}/talkn/common/pems/localhost.crt`;
const productPemKey = '/etc/letsencrypt/live/talkn.io/privkey.pem';
const productPemCrt = '/etc/letsencrypt/live/talkn.io/cert.pem';
const productPemChain = '/etc/letsencrypt/live/talkn.io/chain.pem';
const sslKey = env === PRODUCTION ? productPemKey : localhostPemKey;
const sslCrt = env === PRODUCTION ? productPemCrt : localhostPemCrt;
const sslChain = env === PRODUCTION ? productPemChain : null;

conf.socketIO = { host: 'localhost', port: PORTS.SOCKET_IO };
conf.redis = { host: 'localhost', port: PORTS.REDIS };
conf.mongoDB = {
  host: '0.0.0.0',
  port: PORTS.MONGO,
  dbName: 'talkn',
  option: {
    useNewUrlParser: true,
    //    useFindAndModify: false,
    useUnifiedTopology: true,
    //    useCreateIndex: true,
  },
};
conf.serverPath = `${homeDir}/talkn/server/src/listens/express/`;
conf.serverPortalPath = `${homeDir}/talkn/server/src/listens/express/portal/`;
conf.serverClientJsPath = `${homeDir}/talkn/server/src/listens/express/client/talkn.client.js`;
conf.serverClientPath = `${homeDir}/talkn/server/src/listens/express/client/`;
conf.serverApiPath = `${homeDir}/talkn/server/src/listens/express/api/`;
conf.serverOwnPath = `${homeDir}/talkn/server/src/listens/express/own/`;
conf.serverNewsPath = `${homeDir}/talkn/server/src/listens/express/news/`;
conf.serverAssetsPath = `${homeDir}/talkn/server/src/listens/express/assets/`;
conf.serverTunePath = `${homeDir}/talkn/server/src/listens/express/tune/`;
conf.serverCoverPath = `${homeDir}/talkn/server/src/listens/express/cover/`;
conf.serverComponentsPath = `${homeDir}/talkn/server/src/listens/express/components/`;
conf.serverWwwPath = `${homeDir}/talkn/server/src/listens/express/www/`;
conf.serverExtPath = `${homeDir}/talkn/server/src/listens/express/extension/`;
conf.serverAutoPath = `${homeDir}/talkn/server/src/listens/express/auto/`;
conf.sslOptions =
  env === PRODUCTION
    ? {
        key: fs.readFileSync(sslKey),
        cert: fs.readFileSync(sslCrt),
        ca: fs.readFileSync(sslChain),
        maxVersion: 'TLSv1.3',
        minVersion: 'TLSv1.3',
      }
    : { key: fs.readFileSync(sslKey), cert: fs.readFileSync(sslCrt) };
conf.transactionSecretKey =
  env === PRODUCTION ? 'sk_live_2eedbf7e396bc5ecd7b7d6d64245539a63d04f4b0051b683c60c2263' : 'sk_test_077fecb899eb9307d9f51a2f';
conf.transactionPublicKey = env === PRODUCTION ? 'pk_live_5798d265c8573ae59dae624f' : 'pk_test_6b2b80fa9812d8b45ee3b822';

export default conf;
