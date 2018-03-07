
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
  openNotif: () => {
    return {
      type: 'OPEN_NOTIF',
      control: {isOpenNotif: true}
    };
  },
  closeNotif: () => {
    return {
      type: 'CLOSE_NOTIF',
      control: {isOpenNotif: false}
    };
  },
}
