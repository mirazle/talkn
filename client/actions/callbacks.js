
export default {
  scrollThread: () => {
    return {type: 'SCROLL_THREAD'};
  },
  startAnimateScrollTo: () => {
    return {type: 'START_ANIMATE_SCROLL_TO'};
  },
  endAnimateScrollTo: () => {
    return {type: 'END_ANIMATE_SCROLL_TO'};
  },
  openNotifInThread: () => {
    return {
      type: 'OPEN_NOTIF_IN_THREAD',
      app: {isOpenNotifInThread: true}
    };
  },
  closeNotifInThread: () => {
    return {
      type: 'CLOSE_NOTIF_IN_THREAD',
      app: {isOpenNotifInThread: false}
    };
  },
  openNotif: () => {
    return {
      type: 'OPEN_NOTIF',
      app: {isOpenNotif: true}
    };
  },
  closeNotif: () => {
    return {
      type: 'CLOSE_NOTIF',
      app: {isOpenNotif: false}
    };
  },
}
