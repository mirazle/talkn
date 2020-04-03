import Ui from "client/store/Ui";
import Detail from "./Detail";
import DetailRight from "./DetailRight";
import DetailModal from "./DetailModal";

export default class DetailFooter {
  static getDetailClass({ app, ui }) {
    return ui.screenMode === Ui.screenModeSmallLabel ? DetailModal : DetailRight;
  }
  static get padding() {
    return 20;
  }
  static get margin() {
    return 5;
  }
  static getWidth({ app, ui }, addUnit = false) {
    switch (ui.screenMode) {
      case Ui.screenModeSmallLabel:
        return "100%";
      case Ui.screenModeMiddleLabel:
      case Ui.screenModeLargeLabel:
        return Detail.getDetailClass({ app, ui }).getWidth({ app, ui }, addUnit);
    }
  }

  self: Object;
  child: Object;
  childLike: Object;
  childMoney: Object;
  childShare: Object;
  constructor(params) {
    const { app, ui } = params;
    const DetailClass = Detail.getDetailClass({ app, ui });
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
