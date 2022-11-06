export default class TalknSetupJs {
  constructor() {
    TalknSetupJs.setupMath();
  }
  static setupMath() {
    Math.easeInOutQuad = (t, b, c, d) => {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    };
  }
  static setupLog() {
    /*
    if (conf.env === define.PRODUCTION && window.talknWindow) {
      window.log = (params) => {
        const { ui } = window.talknWindow.store.getState();
        console.log(ui.iFrameId);
      };
    }
    */
  }
}
