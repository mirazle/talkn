"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const conf_1 = __importDefault(require("common/conf"));
const define_1 = __importDefault(require("common/define"));
const Sequence_1 = __importDefault(require("api/Sequence"));
class BootOption {
    constructor(id, params) {
        this.env = define_1.default.PRODUCTION;
        this.type = define_1.default.APP_TYPES.PORTAL;
        this.ch = "/";
        this.hasSlash = true;
        this.protocol = Sequence_1.default.HTTPS_PROTOCOL;
        this.host = location.host;
        this.defaultProps = {
            id: "",
            params: {
                ch: "/",
                hasSlash: true,
                protocol: Sequence_1.default.HTTPS_PROTOCOL,
                host: location.host,
            },
        };
        const initialRootCh = BootOption.getInitialRootCh(conf_1.default.env);
        const firstHasSlash = BootOption.getFirstHasSlach(initialRootCh);
        this.env = conf_1.default.env;
        this.id = id;
        this.hasSlash = params ? params.hasSlash : BootOption.getLastHasSlach(initialRootCh);
        this.ch = params ? params.ch : BootOption.getCh(initialRootCh, firstHasSlash, this.hasSlash);
        this.protocol = params ? params.protocol : BootOption.getProtocol();
        this.host = params ? params.host : location.host;
    }
    static getInitialRootCh(env) {
        let initialRootCh = location.href;
        initialRootCh = initialRootCh.replace(`${Sequence_1.default.HTTPS_PROTOCOL}/`, "").replace(`${Sequence_1.default.HTTP_PROTOCOL}/`, "");
        switch (env) {
            case define_1.default.PRODUCTION:
                initialRootCh = initialRootCh.replace(`/${define_1.default.PRODUCTION_DOMAIN}`, "/");
                break;
            case define_1.default.LOCALHOST:
                initialRootCh = initialRootCh.replace(`/${define_1.default.DEVELOPMENT_DOMAIN}`, "/");
                break;
            case define_1.default.DEVELOPMENT:
                initialRootCh = initialRootCh
                    .replace(`:${define_1.default.PORTS.DEVELOPMENT}`, "")
                    .replace(`:${define_1.default.PORTS.DEVELOPMENT_API}`, "");
                if (initialRootCh.indexOf(`/${define_1.default.DEVELOPMENT_DOMAIN}/`) === 0) {
                    initialRootCh = initialRootCh.replace(`/${define_1.default.DEVELOPMENT_DOMAIN}`, "");
                }
                break;
        }
        return initialRootCh;
    }
    static getType(extScript, clientScript) {
        let type = define_1.default.APP_TYPES.API;
        if (extScript)
            return define_1.default.APP_TYPES.EXTENSION;
        if (clientScript)
            return define_1.default.APP_TYPES.PORTAL;
        return type;
    }
    static getProtocol() {
        if (location.protocol === Sequence_1.default.HTTPS_PROTOCOL)
            return Sequence_1.default.HTTPS_PROTOCOL;
        if (location.protocol === Sequence_1.default.HTTP_PROTOCOL)
            return Sequence_1.default.HTTP_PROTOCOL;
        return Sequence_1.default.TALKN_PROTOCOL;
    }
    static getFirstHasSlach(ch) {
        return ch.startsWith("/");
    }
    static getLastHasSlach(ch) {
        return ch.endsWith("/");
    }
    static getCh(initialRootCh, firstHasSlash, lastHasSlash) {
        let ch = initialRootCh;
        ch = firstHasSlash ? ch : `/${ch}`;
        ch = lastHasSlash ? ch : `${ch}/`;
        ch = ch.replace(/^\/\//, "/");
        return ch;
    }
}
exports.default = BootOption;
//# sourceMappingURL=BootOption.js.map