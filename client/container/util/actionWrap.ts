import Schema from "common/schemas/Schema";
import App from "common/schemas/state/App";
import Thread from "common/schemas/state/Thread";
import handles from "client/actions/handles";

export default {
  onClickCh: (toCh, overWriteHasSlash, called) => {
    let actionState = {};
    let { app, thread, menuIndex, setting } = window.talknAPI.store.getState();

    const beforeCh = thread.ch;
    thread.ch = toCh;
    if (Schema.isSet(overWriteHasSlash)) {
      thread.hasSlash = overWriteHasSlash;
    }
    const isLinkCh = app.isLinkCh;
    const threadStatus = Thread.getStatus(thread, app, setting);
    let { app: updatedApp, stepTo } = App.getStepToDispThreadType({ app, menuIndex }, threadStatus, toCh, called);
    if (!isLinkCh && updatedApp.isLinkCh) {
      window.talknAPI.onCatchChAPI(toCh);
    }

    if (isLinkCh && !updatedApp.isLinkCh) {
      window.talknAPI.offCatchChAPI(beforeCh);
    }

    app = updatedApp;

    switch (stepTo) {
      case `${App.dispThreadTypeTimeline} to ${App.dispThreadTypeChild}`:
      case `${App.dispThreadTypeMulti} to ${App.dispThreadTypeChild}`:
      case `${App.dispThreadTypeSingle} to ${App.dispThreadTypeChild}`:
      case `${App.dispThreadTypeChild} to ${App.dispThreadTypeChild}`:
        actionState = handles.onClickToChildThread(toCh, {
          app,
          thread
        });
        window.talknAPI.store.dispatch(actionState);
        window.talknAPI.changeThread(toCh, { app, thread });
        break;
      case `${App.dispThreadTypeTimeline} to ${App.dispThreadTypeMulti}`:
      case `${App.dispThreadTypeChild} to ${App.dispThreadTypeMulti}`:
        actionState = handles.onClickToMultiThread(toCh, {
          app,
          thread
        });
        window.talknAPI.store.dispatch(actionState);
        window.talknAPI.changeThread(toCh, { app, thread });
        break;
      case `${App.dispThreadTypeTimeline} to ${App.dispThreadTypeSingle}`:
      case `${App.dispThreadTypeChild} to ${App.dispThreadTypeSingle}`:
        actionState = handles.onClickToSingleThread(toCh, {
          app,
          thread
        });
        window.talknAPI.store.dispatch(actionState);
        window.talknAPI.changeThread(toCh, { app, thread });
        break;
      case `${App.dispThreadTypeMulti} to ${App.dispThreadTypeTimeline}`:
      case `${App.dispThreadTypeSingle} to ${App.dispThreadTypeTimeline}`:
      case `${App.dispThreadTypeChild} to ${App.dispThreadTypeTimeline}`:
      case `${App.dispThreadTypeTimeline} to ${App.dispThreadTypeTimeline}`:
        actionState = handles.onClickToTimelineThread(toCh, {
          app,
          thread
        });
        window.talknAPI.store.dispatch(actionState);
        window.talknAPI.changeThread(toCh, { app, thread });
        break;
    }
  }
};
