import fs from "fs";
import os from "os";
import define from "common/define";
import conf from "common/conf";

const homeDir = os.homedir();
const { PRODUCTION, SUB_DOMAINS, PORTS } = define;
const { env, domain } = conf;
const localhostPemKey = `${homeDir}/talkn/common/pems/localhost.key`;
const localhostPemCrt = `${homeDir}/talkn/common/pems/localhost.crt`;
const productPemKey = "/etc/letsencrypt/live/talkn.io/privkey.pem";
const productPemCrt = "/etc/letsencrypt/live/talkn.io/cert.pem";
const productPemChain = "/etc/letsencrypt/live/talkn.io/chain.pem";
const sslKey = env === PRODUCTION ? productPemKey : localhostPemKey;
const sslCrt = env === PRODUCTION ? productPemCrt : localhostPemCrt;
const sslChain = env === PRODUCTION ? productPemChain : null;

conf.socketIO = { host: "localhost", port: PORTS.SOCKET_IO };
conf.redis = { host: "localhost", port: PORTS.REDIS };
conf.mongoDB = {
  host: "localhost",
  port: PORTS.MONGO,
  dbName: "talkn",
  option: { useNewUrlParser: true }
};
conf.serverPath =
  env === PRODUCTION ? "/usr/share/app/talkn/server/listens/express/" : `${homeDir}/talkn/server/listens/express/`;
conf.serverPortalPath =
  env === PRODUCTION
    ? "/usr/share/app/talkn/server/listens/express/portal/"
    : `${homeDir}/talkn/server/listens/express/portal/`;
conf.serverClientPath =
  env === PRODUCTION
    ? "/usr/share/app/talkn/server/listens/express/client/talkn.client.js"
    : `${homeDir}/talkn/server/listens/express/client/talkn.client.js`;
conf.serverApiPath =
  env === PRODUCTION
    ? "/usr/share/app/talkn/server/listens/express/api/talkn.api.js"
    : `${homeDir}/talkn/server/listens/express/api/talkn.api.js`;
conf.serverAssetsPath =
  env === PRODUCTION
    ? "/usr/share/app/talkn/server/listens/express/assets/"
    : `${homeDir}/talkn/server/listens/express/assets/`;
conf.serverWwwPath =
  env === PRODUCTION
    ? "/usr/share/app/talkn/server/listens/express/www/"
    : `${homeDir}/talkn/server/listens/express/www/`;
conf.serverExtPath =
  env === PRODUCTION
    ? "/usr/share/app/talkn/server/listens/express/ext/"
    : `${homeDir}/talkn/server/listens/express/ext/`;
conf.serverAutoPath =
  env === PRODUCTION
    ? "/usr/share/app/talkn/server/listens/express/auto/"
    : `${homeDir}/talkn/server/listens/express/auto/`;
conf.sslOptions =
  env === PRODUCTION
    ? {
        key: fs.readFileSync(sslKey),
        cert: fs.readFileSync(sslCrt),
        ca: fs.readFileSync(sslChain)
      }
    : { key: fs.readFileSync(sslKey), cert: fs.readFileSync(sslCrt) };
conf.transactionSecretKey =
  env === PRODUCTION
    ? "sk_live_2eedbf7e396bc5ecd7b7d6d64245539a63d04f4b0051b683c60c2263"
    : "sk_test_077fecb899eb9307d9f51a2f";
conf.transactionPublicKey =
  env === PRODUCTION ? "pk_live_5798d265c8573ae59dae624f" : "pk_test_6b2b80fa9812d8b45ee3b822";

export default conf;
