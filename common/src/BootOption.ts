import Sequence from 'common/Sequence';
import conf from 'common/conf';
import define from 'common/define';

export type ExtensionModeType =
  | typeof BootOption.extensionModeModal
  | typeof BootOption.extensionModeBottom
  | typeof BootOption.extensionModeOutWindow
  | typeof BootOption.extensionModeLiveMedia;

export type EnvType = typeof define.DEVELOPMENT | typeof define.LOCALHOST | typeof define.PRODUCTION;
export type BootType = typeof define.APP_TYPES.API | typeof define.APP_TYPES.PORTAL | typeof define.APP_TYPES.EXTENSION;
export type BootProtocolType = typeof Sequence.HTTPS_PROTOCOL | typeof Sequence.HTTP_PROTOCOL | typeof Sequence.TALKN_PROTOCOL;
export type BootOptionParamsType = {
  ch: string;
  hasSlash: boolean;
  protocol: BootProtocolType;
  host: string;
  mode: ExtensionModeType;
};
export type BootOptionType = {
  id: string;
  params?: BootOptionParamsType;
};

export default class BootOption {
  env: EnvType = define.PRODUCTION;
  type: BootType = define.APP_TYPES.PORTAL;
  id: string;
  ch: string = '/';
  hasSlash: boolean = true;
  protocol: BootProtocolType = Sequence.HTTPS_PROTOCOL;
  host: string = location.host;
  extensionMode: ExtensionModeType = BootOption.extensionModeNone;
  defaultProps: BootOptionType = {
    id: '',
    params: {
      ch: '/',
      hasSlash: true,
      protocol: Sequence.HTTPS_PROTOCOL,
      host: location.host,
      mode: BootOption.extensionModeNone,
    },
  };
  constructor(id: string, params?: BootOptionParamsType) {
    const initialRootCh = BootOption.getInitialRootCh(conf.env);
    const firstHasSlash = BootOption.getFirstHasSlach(initialRootCh);
    this.env = conf.env;
    this.id = id;
    this.hasSlash = params && params.hasSlash !== undefined ? params.hasSlash : BootOption.getLastHasSlach(initialRootCh);
    this.ch = params && params.ch ? params.ch : BootOption.getCh(initialRootCh, firstHasSlash, this.hasSlash);
    this.protocol = params && params.protocol ? params.protocol : BootOption.getProtocol();
    this.host = params && params.host ? params.host : location.host;
    this.extensionMode = params && params.mode ? params.mode : BootOption.extensionModeNone;
  }
  static get extensionModeModal() {
    return 'Modal';
  }
  static get extensionModeBottom() {
    return 'Bottom';
  }
  static get extensionModeEmbed() {
    return 'Embed';
  }
  static get extensionModeLiveMedia() {
    return 'LiveMedia';
  }
  static get extensionModeOutWindow() {
    return 'OutWindow';
  }
  static get extensionModeNone() {
    return 'None';
  }
  static getInitialRootCh(env: EnvType): string {
    let initialRootCh: string = location.href;
    initialRootCh = initialRootCh.replace(`${Sequence.HTTPS_PROTOCOL}/`, '').replace(`${Sequence.HTTP_PROTOCOL}/`, '');
    switch (env) {
      case define.PRODUCTION:
        if (initialRootCh.indexOf(conf.topURL) >= 0) {
          initialRootCh = initialRootCh.replace(`/${conf.topURL}/`, '/');
        } else {
          initialRootCh = initialRootCh.replace(`/${define.PRODUCTION_DOMAIN}`, '/');
        }
        break;
      case define.LOCALHOST:
        if (initialRootCh.indexOf(conf.topURL) >= 0) {
          initialRootCh = initialRootCh.replace(`/${conf.topURL}/`, '/');
        } else {
          initialRootCh = initialRootCh.replace(`/${define.DEVELOPMENT_DOMAIN}`, '/');
        }

        break;
      case define.DEVELOPMENT:
        initialRootCh = initialRootCh
          .replace(`:${define.PORTS.DEVELOPMENT_CLIENT}`, '')
          .replace(`:${define.PORTS.DEVELOPMENT_API}`, '')
          .replace(`:${define.PORTS.DEVELOPMENT_TOP}`, '')
          .replace(`:${define.PORTS.DEVELOPMENT_RANK}`, '');
        if (initialRootCh.indexOf(`/${define.DEVELOPMENT_DOMAIN}/`) === 0) {
          initialRootCh = initialRootCh.replace(`/${define.DEVELOPMENT_DOMAIN}`, '');
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
    return ch.startsWith('/');
  }

  static getLastHasSlach(ch): boolean {
    return ch.endsWith('/');
  }

  static getCh(initialRootCh, firstHasSlash, lastHasSlash): string {
    let ch = initialRootCh;
    ch = firstHasSlash ? ch : `/${ch}`;
    ch = lastHasSlash ? ch : `${ch}/`;
    ch = ch.replace(/^\/\//, '/');
    return ch;
  }
}
