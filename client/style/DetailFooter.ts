import App from "../../common/schemas/state/App";
import Detail from "./Detail";
import DetailRight from "./DetailRight";
import DetailModal from "./DetailModal";

export default class DetailFooter {
  static getDetailClass(app) {
    return app.screenMode === App.screenModeSmallLabel ? DetailModal : DetailRight;
  }
  static get padding() {
    return 20;
  }
  static get margin() {
    return 5;
  }
  static getWidth(app, addUnit = false) {
    switch (app.screenMode) {
      case App.screenModeSmallLabel:
        return "100%";
      case App.screenModeMiddleLabel:
      case App.screenModeLargeLabel:
        return Detail.getDetailClass(app).getWidth(app, addUnit);
    }
  }

  self: Object;
  child: Object;
  childLike: Object;
  childMoney: Object;
  childShare: Object;
  constructor(params) {
    const { app } = params;
    const DetailClass = Detail.getDetailClass(app);
    const self = DetailClass.getFooter(params);
    const child = DetailClass.getFooterChild(params);
    const childLike = DetailClass.getFooterChildLike(params);
    const childMoney = DetailClass.getFooterChildMoney(params);
    const childShare = DetailClass.getFooterChildShare(params);

    return {
      self,
      child,
      childLike,
      childMoney,
      childShare
    };
  }
}
