import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import BootOption from 'common/BootOption';
import define from 'common/define';

import Window from 'components/Window';
import Cover from 'components/container/Cover';
import RankOgps from 'components/container/RankOgps';
import Thread from 'components/container/Thread/App';

const Components = {
  talknCover: Cover,
  talknRankOgps: RankOgps,
  talknThread: Thread,
};

export default Components;

const appId = define.APP_TYPES.COMPONENTS;
const publicClassNames = ['.talkn', '.talknThread', '.talknRankOgps', '.talknRank', '.talknBanner'];
const bootOptionCustom = {
  talknRankOgps: { isRankDetailMode: true },
  talknRank: {},
  talknThread: { isRankDetailMode: true },
  talknBanner: {},
};

window._talknComponents = [];

export const Load = (publicClassName?: string, ch?: string) => {
  const reactRoots = getReactRoots(publicClassName, ch);
  if (reactRoots.length > 0) {
    reactRoots.forEach((reactRoot, index) => {
      const className = reactRoot.className;
      const ch = reactRoot.dataset.ch;
      renderDom(reactRoot, index, className, ch);
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

const renderDom = async (reactRoot, index, className, ch) => {
  let component: React.ReactNode;
  if (ch) {
    const bootOption = new BootOption(appId + index, { ...bootOptionCustom[className], ch });
    if (!window._talknComponents[index]) {
      window._talknComponents[index] = new Window(appId, bootOption);
      await window._talknComponents[index].boot();
    }
    switch (className) {
      case 'talknRankOgps':
        component = (
          <Components.talknRankOgps
            bootOption={bootOption}
            api={window._talknComponents[index].api}
            root={reactRoot}
            state={window._talknComponents[index].state}
          />
        );
        break;
      case 'talknThread':
        component = (
          <Components.talknThread
            bootOption={bootOption}
            api={window._talknComponents[index].api}
            root={reactRoot}
            state={window._talknComponents[index].state}
          />
        );
        break;
    }

    if (component) {
      ReactDOM.render(<Provider store={window._talknComponents[index].store}>{component}</Provider>, reactRoot);
    } else {
      console.warn(`No Component ${className}`);
    }
  } else {
    ReactDOM.render(<Components.talknCover root={reactRoot} />, reactRoot);
  }
};
