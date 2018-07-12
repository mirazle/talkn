import define from '../../common/define';
import conf from '../../common/conf';
import fs from 'fs';
import os from 'os';

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
conf.mongoDB = { host: 'localhost', port: PORTS.MONGO, dbName: 'talkn', option: { server: { auto_reconnect: true } } };
conf.serverPortalPath = env === PRODUCTION ? '/usr/share/app/talkn/server/listens/express/portal/' : `${homeDir}/talkn/server/listens/express/portal/` ;
conf.serverClientPath = env === PRODUCTION ? '/usr/share/app/talkn/server/listens/express/client/talkn.client.js' : `${homeDir}/talkn/server/listens/express/client/talkn.client.js` ;
conf.serverAssetsPath = env === PRODUCTION ? '/usr/share/app/talkn/server/listens/express/assets/' : `${homeDir}/talkn/server/listens/express/assets/` ;
conf.sslOptions = {key: fs.readFileSync( sslKey ), cert: fs.readFileSync( sslCrt ) };

export default conf;
