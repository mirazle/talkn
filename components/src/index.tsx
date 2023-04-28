import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

// import MediaServer from 'worker-loader?inline=fallback&publicPath=/&filename=mediaServer.js!./MediaServer';
import BootOption from 'common/BootOption';
import PostMessage, { MessageClientAndExtType } from 'common/PostMessage';
import define from 'common/define';

import Window from 'components/Window';
import Cover from 'components/container/Cover';
import RankOgps from 'components/container/RankOgps';
import Thread from 'components/container/Thread/App';

import MediaClient from './MediaClient';
import MediaServer from './MediaServerTs';

const Components = {
  talknCover: Cover,
  talknRankOgps: RankOgps,
  talknThread: Thread,
};

export default Components;

const appType = define.APP_TYPES.COMPONENTS;
const publicClassNames = ['.talkn', '.talknThread', '.talknRankOgps', '.talknRank', '.talknBanner'];
const bootOptionCustom = {
  talknRankOgps: { isRankDetailMode: true },
  talknRank: {},
  talknThread: { isRankDetailMode: true },
  talknBanner: {},
};

window.talknComponents = {};
window.talknMediaClients = {};
window.talknMediaServer = new MediaServer();

window.onload = () => {
  window.onmessage = (e) => {
    const { id, type }: MessageClientAndExtType = e.data;
    if ((id && type === PostMessage.EXT_TO_CLIENT_TYPE) || type === PostMessage.MEDIA_SERVER_TO_MEDIA_CLIENT_TYPE) {
      if (window.talknComponents[id]) {
        window.talknComponents[id].onMessage(e);
      }
    }
  };
  window.onmessageerror = (e) => {
    const { id }: MessageClientAndExtType = e.data;

    window.talknComponents[id].onMessageError(e);
  };
};

export const Load = (publicClassName?: string, ch?: string) => {
  const reactRoots = getReactRoots(publicClassName, ch);

  if (reactRoots.length > 0) {
    reactRoots.forEach((reactRoot, index) => {
      let className = publicClassNames[0].replace('.', '');
      const rootClassNames = reactRoot.className.split(' ');
      publicClassNames.forEach((publicClassName) => {
        rootClassNames.forEach((rootClassName) => {
          if (publicClassName === `.${rootClassName}`) {
            className = publicClassName;
            return false;
          }
        });
      });

      const componentType = className.replace(/^\./, '');
      const ch = reactRoot.dataset && reactRoot.dataset.ch ? reactRoot.dataset.ch : '/';

      renderDom(reactRoot, index + 1, componentType, ch);
    });
  } else {
    console.warn('No Talkn Root Components.');
  }
};

const getReactRoots = (publicClassName?: string, ch?: string): HTMLElement[] => {
  let reactRoots;
  if (publicClassName && ch) {
    if (Components[publicClassName]) {
      reactRoots = document.querySelectorAll(`.${publicClassName}[data-ch="${ch}"]`);
    }
  } else {
    reactRoots = document.querySelectorAll(publicClassNames.join(','));
  }
  return reactRoots ? reactRoots : [];
};

const renderDom = async (reactRoot, index, componentType, ch) => {
  let component: React.ReactNode;
  if (ch) {
    const appId = `${index}:${componentType}:${ch}`;
    const isFullscreen = reactRoot.clientWidth === window.innerWidth && reactRoot.clientHeight === window.innerHeight;
    const bootOption = new BootOption(appId, appType, { ...bootOptionCustom[componentType], ch });
    if (!window.talknComponents[appId]) {
      if (!window.talknComponents[appId]) {
        window.talknComponents[appId] = new Window(appId, appType, bootOption);
        window.talknMediaClients[appId] = new MediaClient(window.talknComponents[appId]);
        await window.talknComponents[appId].boot();
      }
    }

    switch (componentType) {
      case 'talknRankOgps':
        component = (
          <Components.talknRankOgps
            bootOption={bootOption}
            api={window.talknComponents[appId].api}
            root={reactRoot}
            state={window.talknComponents[appId].state}
          />
        );
        break;
      case 'talknThread':
        component = (
          <Components.talknThread
            bootOption={bootOption}
            api={window.talknComponents[appId].api}
            root={reactRoot}
            state={window.talknComponents[appId].state}
          />
        );
        break;
    }

    if (component) {
      const root = createRoot(reactRoot);
      root.render(<Provider store={window.talknComponents[appId].store}>{component}</Provider>);
    } else {
      console.warn(`No Component ${componentType}`);
    }
  } else {
    const root = createRoot(reactRoot);
    root.render(<Components.talknCover root={reactRoot} />);
  }
};
