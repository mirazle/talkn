import Sequence from 'common/Sequence';
import Emotions from 'common/emotions/index';

const emotions = new Emotions();
let actions = {};

Object.keys(Sequence.map).forEach((endpoint) => {
  const type = `${Sequence.API_TO_SERVER_REQUEST}${endpoint}`;
  actions[type] = (reduxState, requestState, actionState) => {
    if (beforeFunctions[requestState.type]) {
      return beforeFunctions[requestState.type](reduxState, requestState, actionState);
    }
    return { requestState, actionState };
  };
});

const beforeFunctions = {
  post: (reduxState, requestState, actionState) => {
    const { app } = requestState;

    if (app.isMediaCh) {
      //      if (window.talknMedia && window.talknMedia.currentTime) {
      if (app.currentTime) {
        requestState.app.inputCurrentTime = window.talknMedia.currentTime;
      } else {
        requestState.app.inputCurrentTime = 0;
      }
    }

    requestState.thread.emotions = {};

    if (app.inputStampId) {
      Object.keys(emotions.balances).forEach((balanceKey) => {
        if (emotions.balances[balanceKey] && reduxState.thread.emotions[balanceKey]) {
          const balance = emotions.balances[balanceKey](app.inputStampId);

          if (balance) {
            balance.forEach((b) => {
              const typeId = Object.keys(b)[0];
              const typeLabel = emotions.idKeyTypes[typeId];

              if (!requestState.thread.emotions[balanceKey]) requestState.thread.emotions[balanceKey] = {};
              if (!requestState.thread.emotions[balanceKey][typeLabel]) requestState.thread.emotions[balanceKey][typeLabel] = 0;

              requestState.thread.emotions[balanceKey][typeLabel] = b[typeId];
            });
          }
        }
      });
    } else {
      actionState.app = { ...app };
      actionState.app.inputStampId = 0;
      requestState.app.inputStampId = 0;
    }

    return { requestState, actionState };
  },
};

export default actions;
