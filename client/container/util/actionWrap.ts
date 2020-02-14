import Schema from "common/schemas/Schema";
import App from "common/schemas/state/App";
import Thread from "common/schemas/state/Thread";
import handles from "client/actions/handles";

export default {
  onClickCh: (toCh, overWriteHasSlash, called) => {
    let actionState = {};
    let { app, thread, menuIndex, setting } = window.talknWindow.apiState.getState();

    const beforeCh = thread.ch;
    thread.ch = toCh;
    if (Schema.isSet(overWriteHasSlash)) {
      thread.hasSlash = overWriteHasSlash;
    }
    const isLinkCh = app.isLinkCh;
    const threadStatus = Thread.getStatus(thread, app, setting);
    let { app: updatedApp, stepTo } = App.getStepToDispThreadType({ app, menuIndex }, threadStatus, toCh, called);
    if (!isLinkCh && updatedApp.isLinkCh) {
      window.talknWindow.parentCoreApi("onCatchChAPI", toCh);
    }

    if (isLinkCh && !updatedApp.isLinkCh) {
      window.talknWindow.parentCoreApi("offCatchChAPI", beforeCh);
    }

    app = updatedApp;

    switch (stepTo) {
      case `${App.dispThreadTypeTimeline} to ${App.dispThreadTypeChild}`:
      case `${App.dispThreadTypeMulti} to ${App.dispThreadTypeChild}`:
      case `${App.dispThreadTypeSingle} to ${App.dispThreadTypeChild}`:
      case `${App.dispThreadTypeChild} to ${App.dispThreadTypeChild}`:
        window.talknWindow.parentCoreApi("onClickToChildThread", { app, thread });
        window.talknWindow.parentCoreApi("changeThread", toCh, { app, thread });
        break;
      case `${App.dispThreadTypeTimeline} to ${App.dispThreadTypeMulti}`:
      case `${App.dispThreadTypeChild} to ${App.dispThreadTypeMulti}`:
        window.talknWindow.parentCoreApi("onClickToMultiThread", { app, thread });
        window.talknWindow.parentCoreApi("changeThread", toCh, { app, thread });
        break;
      case `${App.dispThreadTypeTimeline} to ${App.dispThreadTypeSingle}`:
      case `${App.dispThreadTypeChild} to ${App.dispThreadTypeSingle}`:
        window.talknWindow.parentCoreApi("onClickToSingleThread", { app, thread });
        window.talknWindow.parentCoreApi("changeThread", toCh, { app, thread });
        break;
      case `${App.dispThreadTypeMulti} to ${App.dispThreadTypeTimeline}`:
      case `${App.dispThreadTypeSingle} to ${App.dispThreadTypeTimeline}`:
      case `${App.dispThreadTypeChild} to ${App.dispThreadTypeTimeline}`:
      case `${App.dispThreadTypeTimeline} to ${App.dispThreadTypeTimeline}`:
        window.talknWindow.parentCoreApi("onClickToTimelineThread", { app, thread });
        window.talknWindow.parentCoreApi("changeThread", toCh, { app, thread });
        break;
    }
  }
};
