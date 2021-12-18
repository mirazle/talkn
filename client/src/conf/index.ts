import process from 'process';

import conf from 'common/conf';
import define from 'common/define';

if (process.title === 'browser') {
  const { SUB_DOMAINS, DEVELOPMENT } = define;
  const { env, domain } = conf;
  conf.mediaSecondInterval = 200;
  conf.screenSize = {
    small: 600,
    middle: 960,
  };
  conf.defaultFavicon = `//${SUB_DOMAINS.ASSETS}.${domain}/favicon.ico`;
  conf.portalPath = env === DEVELOPMENT ? `//${SUB_DOMAINS.CLIENT}.${domain}/` : `//${SUB_DOMAINS.PORTAL}.${domain}/`;
  conf.clientPath = `//${SUB_DOMAINS.CLIENT}.${domain}/`;
  conf.assetsPath = `//${SUB_DOMAINS.ASSETS}.${domain}/`;
  conf.sessionPath = `//${SUB_DOMAINS.SESSION}.${domain}/`;
  conf.cacheKey = { index: 'talknIndexList', setting: 'talknSettingParams' };
}

export default conf;
