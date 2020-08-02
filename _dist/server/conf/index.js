"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const os_1 = __importDefault(require("os"));
const define_1 = __importDefault(require("common/define"));
const conf_1 = __importDefault(require("common/conf"));
const { PRODUCTION, SUB_DOMAINS, PORTS } = define_1.default;
const { env, domain } = conf_1.default;
const homeDir = env === PRODUCTION ? "/usr/share/applications" : os_1.default.homedir();
const localhostPemKey = `${homeDir}/talkn/common/pems/server/localhost.key`;
const localhostPemCrt = `${homeDir}/talkn/common/pems/server/localhost.crt`;
const productPemKey = "/etc/letsencrypt/live/talkn.io/privkey.pem";
const productPemCrt = "/etc/letsencrypt/live/talkn.io/cert.pem";
const productPemChain = "/etc/letsencrypt/live/talkn.io/chain.pem";
const sslKey = env === PRODUCTION ? productPemKey : localhostPemKey;
const sslCrt = env === PRODUCTION ? productPemCrt : localhostPemCrt;
const sslChain = env === PRODUCTION ? productPemChain : null;
conf_1.default.socketIO = { host: "localhost", port: PORTS.SOCKET_IO };
conf_1.default.redis = { host: "localhost", port: PORTS.REDIS };
conf_1.default.mongoDB = {
    host: "localhost",
    port: PORTS.MONGO,
    dbName: "talkn",
    option: { useNewUrlParser: true },
};
conf_1.default.serverPath = `${homeDir}/talkn/server/listens/express/`;
conf_1.default.serverPortalPath = `${homeDir}/talkn/server/listens/express/portal/`;
conf_1.default.serverClientPath = `${homeDir}/talkn/server/listens/express/client/talkn.client.js`;
conf_1.default.serverApiPath = `${homeDir}/talkn/server/listens/express/api/talkn.api.js`;
conf_1.default.serverAssetsPath = `${homeDir}/talkn/server/listens/express/assets/`;
conf_1.default.serverWwwPath = `${homeDir}/talkn/server/listens/express/www/`;
conf_1.default.serverExtPath = `${homeDir}/talkn/server/listens/express/extension/`;
conf_1.default.serverAutoPath = `${homeDir}/talkn/server/listens/express/auto/`;
conf_1.default.sslOptions =
    env === PRODUCTION
        ? {
            key: fs_1.default.readFileSync(sslKey),
            cert: fs_1.default.readFileSync(sslCrt),
            ca: fs_1.default.readFileSync(sslChain),
        }
        : { key: fs_1.default.readFileSync(sslKey), cert: fs_1.default.readFileSync(sslCrt) };
conf_1.default.transactionSecretKey =
    env === PRODUCTION
        ? "sk_live_2eedbf7e396bc5ecd7b7d6d64245539a63d04f4b0051b683c60c2263"
        : "sk_test_077fecb899eb9307d9f51a2f";
conf_1.default.transactionPublicKey =
    env === PRODUCTION ? "pk_live_5798d265c8573ae59dae624f" : "pk_test_6b2b80fa9812d8b45ee3b822";
exports.default = conf_1.default;
//# sourceMappingURL=index.js.map