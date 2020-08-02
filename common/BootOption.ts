import conf from "common/conf";
import define from "common/define";
import Sequence from "api/Sequence";

type EnvType = typeof define.DEVELOPMENT | typeof define.LOCALHOST | typeof define.PRODUCTION;
type BootType = typeof define.APP_TYPES.API | typeof define.APP_TYPES.PORTAL | typeof define.APP_TYPES.EXTENSION;
type BootProtocolType = typeof Sequence.HTTPS_PROTOCOL | typeof Sequence.HTTP_PROTOCOL | typeof Sequence.TALKN_PROTOCOL;
type BootOptionParamsType = {
  ch: string;
  hasSlash: boolean;
  protocol: BootProtocolType;
  host: string;
};
type BootOptionType = {
  id: string;
  params?: BootOptionParamsType;
};

export default class BootOption {
  env: EnvType = define.PRODUCTION;
  type: BootType = define.APP_TYPES.PORTAL;
  id: string;
  ch: string = "/";
  hasSlash: boolean = true;
  protocol: BootProtocolType = Sequence.HTTPS_PROTOCOL;
  host: string = location.host;
  defaultProps: BootOptionType = {
    id: "",
    params: {
      ch: "/",
      hasSlash: true,
      protocol: Sequence.HTTPS_PROTOCOL,
      host: location.host,
    },
  };
  constructor(id: string, params?: BootOptionParamsType) {
    const initialRootCh = BootOption.getInitialRootCh(conf.env);
    const firstHasSlash = BootOption.getFirstHasSlach(initialRootCh);
    this.env = conf.env;
    this.id = id;
    this.hasSlash = params ? params.hasSlash : BootOption.getLastHasSlach(initialRootCh);
    this.ch = params ? params.ch : BootOption.getCh(initialRootCh, firstHasSlash, this.hasSlash);
    this.protocol = params ? params.protocol : BootOption.getProtocol();
    this.host = params ? params.host : location.host;
  }
  static getInitialRootCh(env: EnvType): string {
    let initialRootCh: string = location.href;
    initialRootCh = initialRootCh.replace(`${Sequence.HTTPS_PROTOCOL}/`, "").replace(`${Sequence.HTTP_PROTOCOL}/`, "");
    switch (env) {
      case define.PRODUCTION:
        initialRootCh = initialRootCh.replace(`/${define.PRODUCTION_DOMAIN}`, "/");
        break;
      case define.LOCALHOST:
        initialRootCh = initialRootCh.replace(`/${define.DEVELOPMENT_DOMAIN}`, "/");
        break;
      case define.DEVELOPMENT:
        initialRootCh = initialRootCh
          .replace(`:${define.PORTS.DEVELOPMENT}`, "")
          .replace(`:${define.PORTS.DEVELOPMENT_API}`, "");
        if (initialRootCh.indexOf(`/${define.DEVELOPMENT_DOMAIN}/`) === 0) {
          initialRootCh = initialRootCh.replace(`/${define.DEVELOPMENT_DOMAIN}`, "");
        }
        break;
    }
    return initialRootCh;
  }

  static getType(extScript, clientScript): BootType {
    let type = define.APP_TYPES.API;
    if (extScript) return define.APP_TYPES.EXTENSION;
    if (clientScript) return define.APP_TYPES.PORTAL;
    return type;
  }

  static getProtocol(): BootProtocolType {
    if (location.protocol === Sequence.HTTPS_PROTOCOL) return Sequence.HTTPS_PROTOCOL;
    if (location.protocol === Sequence.HTTP_PROTOCOL) return Sequence.HTTP_PROTOCOL;
    return Sequence.TALKN_PROTOCOL;
  }

  static getFirstHasSlach(ch): boolean {
    return ch.startsWith("/");
  }

  static getLastHasSlach(ch): boolean {
    return ch.endsWith("/");
  }

  static getCh(initialRootCh, firstHasSlash, lastHasSlash): string {
    let ch = initialRootCh;
    ch = firstHasSlash ? ch : `/${ch}`;
    ch = lastHasSlash ? ch : `${ch}/`;
    ch = ch.replace(/^\/\//, "/");
    return ch;
  }
}
