import 'normalize.css';

import conf from 'common/conf';
import define from 'common/define';
import { ConfigType, configInit } from 'common/talknConfig';

import Render from 'cover/App';

export const selectContentMenuLivePages = 'livePages';
export const selectContentMenuCreators = 'stories';
export const selectContentMenuConfig = 'config';
export const selectContentMenuBusiness = 'business';
export const selectContentMenuStory = 'story';
export const selectContentMenuDashboard = 'dashboard';
export const selectContentMenuDefault = selectContentMenuBusiness;
export type SelectContentMenuType =
  | typeof selectContentMenuLivePages
  | typeof selectContentMenuBusiness
  | typeof selectContentMenuStory
  | typeof selectContentMenuDashboard
  | typeof selectContentMenuLivePages
  | typeof selectContentMenuCreators
  | typeof selectContentMenuConfig;

declare global {
  interface Window {
    google: any;
    talknPayload: any;
    talknThread: any;
    talknServerMetas: any;
    talknStaticTags: any;
    talknStaticTagsById: any;
    talknUser: any;
    talknUserTags: any;
    talknConfig: ConfigType;
    talknSelectContentMenu: SelectContentMenuType;
    talknComponents: any;
    talknStories: any;
    talknStoriesPointer: number;
    talknWindow: any;
    talknMedia: any;
    talknAPI: any;
    Youtube: any;
    log: any;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
  interface Math {
    easeInOutQuad: any;
  }
}

export type GoogleSessionType = {
  aud: string;
  azp: string;
  email: string;
  email_verified: boolean;
  exp: number;
  family_name: string;
  given_name: string;
  iat: number;
  iss: string;
  jti: string;
  name: string;
  nbf: number;
  picture: string;
  sub: string;
};

export const googleSessionInit = {
  aud: '',
  azp: '',
  email: '',
  email_verified: false,
  exp: 0,
  family_name: '',
  given_name: '',
  iat: 0,
  iss: '',
  jti: '',
  name: '',
  nbf: 0,
  picture: '',
  sub: '',
};

export type UserType = {
  name: string;
  email: string;
  bg: string;
  icon: string;
  birthday: number;
  languages: string[];
  sexes: string[];
  hasSelfTags: {
    investor: boolean;
    founder: boolean;
    member: boolean;
  };
};

export const userHasSelfTagsInit = {
  investor: false,
  founder: false,
  member: false,
};

export const userInit: UserType = {
  name: '',
  email: '',
  bg: '',
  icon: '',
  birthday: conf.defaultBirthdayUnixtime,
  languages: [],
  sexes: [],
  hasSelfTags: userHasSelfTagsInit,
};

export type UserTagsType = {
  self: { investor: any[]; founder: any[]; member: any[] };
  relation: { investor: any[]; founder: any[]; member: any[] };
  story: { story: any[] };
};

const href = String(window.location.href);
const splitedUrl = href.split('/');
const splitedUrlLength = splitedUrl.length;
let ch = '/';

window.talknStoriesPointer = window.talknConfig && window.talknConfig.storiesIndex ? window.talknConfig.storiesIndex.length : 0;

if (splitedUrl[splitedUrlLength - 1] === '') {
  ch = href;
} else {
  const lastSlash = href.lastIndexOf('/');
  const _talknStoriesPointer = Number(href.substr(lastSlash + 1, lastSlash));
  ch = href.substr(0, lastSlash + 1);

  if (_talknStoriesPointer <= 0) {
    window.talknStoriesPointer = 1;
  }

  if (window.talknStoriesPointer < window.talknConfig.storiesIndex.length) {
    window.talknStoriesPointer = window.talknConfig.storiesIndex.length;
  } else {
    window.talknStoriesPointer = _talknStoriesPointer;
  }
}

if (conf.domain === define.DEVELOPMENT_DOMAIN) {
  if (ch.indexOf(define.PORTS.DEVELOPMENT_COVER) >= 0) {
    ch = ch.replace(`https://${define.DEVELOPMENT_DOMAIN}:${define.PORTS.DEVELOPMENT_COVER}`, '');
  } else {
    ch = ch.replace(`https://${define.SUB_DOMAINS.COVER}.${define.DEVELOPMENT_DOMAIN}`, '');
  }
} else {
  ch = ch.replace(`https://${define.SUB_DOMAINS.COVER}.${define.PRODUCTION_DOMAIN}`, '');
}

Render();
