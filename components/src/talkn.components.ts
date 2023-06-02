import define from 'common/define';

import Window from 'components/Window';
import { Load } from 'components/index';

const appId = define.APP_TYPES.COMPONENTS;

declare global {
  interface Window {
    talknComponents: any;
    talknWindow: any;
    talknMediaClients: any;
    talknMediaServer: any;
    google: any;
    createPaymentRequest: any;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
  interface Math {
    easeInOutQuad: any;
  }
}

window.onmessage = ({ data: { appName, appType, action, className, ch } }) => {
  if (appName === define.APP_NAME && appType === define.APP_TYPES.COMPONENTS) {
    switch (action) {
      case 'load':
        Load(className, ch);
    }
  }
};

window.postMessage({ appName: define.APP_NAME, appType: define.APP_TYPES.COMPONENTS, action: 'load' });
