import fs from 'fs';
import os from 'os';
import define from '~/common/define';
import conf from '~/common/conf';

const homeDir = os.homedir();
const { PRODUCTION, SUB_DOMAINS, PORTS } = define;
const { env, domain } = conf;
const localhostPemKey = `${homeDir}/talkn/common/pems/localhost.key`;
const localhostPemCrt = `${homeDir}/talkn/common/pems/localhost.crt`;
const productPemKey = '/etc/letsencrypt/live/talkn.io/privkey.pem';
const productPemCrt = '/etc/letsencrypt/live/talkn.io/cert.pem';
const sslKey = env === PRODUCTION ? productPemKey :  localhostPemKey;
const sslCrt = env === PRODUCTION ? productPemCrt:  localhostPemCrt;

conf.socketIO = { host: 'localhost', port: PORTS.SOCKET_IO };
conf.redis = { host: 'localhost', port: PORTS.REDIS };
conf.mongoDB = { host: 'localhost', port: PORTS.MONGO, dbName: 'talkn', option: { useNewUrlParser: true } };
conf.serverPath = env === PRODUCTION ? '/usr/share/app/talkn/server/listens/express/' : `${homeDir}/talkn/server/listens/express/` ;
conf.serverPortalPath = env === PRODUCTION ? '/usr/share/app/talkn/server/listens/express/portal/' : `${homeDir}/talkn/server/listens/express/portal/` ;
conf.serverClientPath = env === PRODUCTION ? '/usr/share/app/talkn/server/listens/express/client/talkn.client.js' : `${homeDir}/talkn/server/listens/express/client/talkn.client.js` ;
conf.serverAssetsPath = env === PRODUCTION ? '/usr/share/app/talkn/server/listens/express/assets/' : `${homeDir}/talkn/server/listens/express/assets/` ;
conf.serverWwwPath = env === PRODUCTION ? '/usr/share/app/talkn/server/listens/express/www/' : `${homeDir}/talkn/server/listens/express/www/` ;
conf.serverAutoPath = env === PRODUCTION ? '/usr/share/app/talkn/server/listens/express/auto/' : `${homeDir}/talkn/server/listens/express/auto/` ;
conf.sslOptions = {key: fs.readFileSync( sslKey ), cert: fs.readFileSync( sslCrt ) };

export default conf;
