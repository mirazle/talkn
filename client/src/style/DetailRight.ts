import Ui from 'common/clientState/store/Ui';

import Detail from './Detail';
import Style from './index';

export default class DetailRight {
  static get widthDecimalRate() {
    return 0.3;
  }
  static get widthRate() {
    return 100 * DetailRight.widthDecimalRate;
  }
  static get otherWidthDecimalRate() {
    return 1 - DetailRight.widthDecimalRate;
  }
  static get otherWidthRate() {
    return 100 * DetailRight.otherWidthDecimalRate;
  }
  static getWidth({ app, ui }, addUnit = false) {
    let width = '0';
    switch (ui.screenSize) {
      case Ui.screenSizeSmallLabel:
        width = '0%';
        break;
      case Ui.screenSizeMiddleLabel:
        width = '0%';
        break;
      case Ui.screenSizeLargeLabel:
        width = '30%';
        break;
    }
    return addUnit ? Style.trimUnit(width) : width;
  }
  static getMinWidth({ app, ui }, addUnit = false) {
    let width = '0';
    switch (ui.screenSize) {
      case Ui.screenSizeSmallLabel:
        width = '0%';
        break;
      case Ui.screenSizeMiddleLabel:
        width = '320px';
        break;
      case Ui.screenSizeLargeLabel:
        width = '320px';
        break;
    }
    return addUnit ? Style.trimUnit(width) : width;
  }

  static getTransform({ app, ui }) {
    let transform = DetailRight.closeSelfTransform;
    switch (ui.screenSize) {
      case Ui.screenSizeSmallLabel:
        transform = DetailRight.closeSelfTransform;
        break;
      case Ui.screenSizeMiddleLabel:
        transform = DetailRight.closeSelfTransform;
        break;
      case Ui.screenSizeLargeLabel:
        transform = `translate3d(0px, 0px, 0px)`;
        /*
        if (ui.isOpenDetail) {
          console.log("C");
          transform = `translate3d(0px, 0px, 0px)`;
        } else {
          console.log("D");
          transform = DetailRight.closeSelfTransform;
        }
        */
        break;
    }
    return transform;
  }

  static get closeSelfTransform() {
    return `translate3d(0%, calc( 100% + ${Detail.padding * 2}px ), 0px)`;
  }
  static get openSelfTransform() {
    return `translate3d(0%, 0%, 0px)`;
  }

  static getHeader(params) {
    return Detail.getHeader(params);
  }
  static getHeaderP(params) {
    return Detail.getHeaderP(params);
  }
  static getBody(params) {
    return Detail.getBody(params);
  }
  static getMeta(params) {
    return Detail.getMeta(params);
  }
  static getImg(params) {
    return Detail.getImg(params);
  }
  static getDescription(params) {
    return Detail.getDescription(params);
  }
  static getDescriptionAnchor(params) {
    return Detail.getDescriptionAnchor(params);
  }
  static getMetaContentTypeWrap(params) {
    return Detail.getMetaContentTypeWrap(params);
  }
  static getMetaContentType(params) {
    return Detail.getMetaContentType(params);
  }
  static getCh(params) {
    return Detail.getCh(params);
  }
  static getAnalyze(params) {
    return Detail.getAnalyze(params);
  }
  static getAnalyzeRow(params) {
    return Detail.getAnalyzeRow(params);
  }
  static getAnalyzeCol(params) {
    return Detail.getAnalyzeCol(params);
  }
  static getAnalyzeLabel(params) {
    return Detail.getAnalyzeLabel(params);
  }
  static getAnalyzeValue(params) {
    return Detail.getAnalyzeValue(params);
  }
  static getAnalyzeHr(params) {
    return Detail.getAnalyzeHr(params);
  }
  static getH1s(params) {
    return Detail.getH1s(params);
  }
  static getH1sLi(params) {
    return Detail.getH1sLi(params);
  }
  static getFooter(params) {
    return Detail.getFooter(params);
  }
  static getFooterChild(params) {
    return Detail.getFooterChild(params);
  }
  static getFooterChildLike(params) {
    return Detail.getFooterChildLike(params);
  }
  static getFooterChildMoney(params) {
    return Detail.getFooterChildMoney(params);
  }
  static getFooterChildShare(params) {
    return Detail.getFooterChildShare(params);
  }
  static getMetaItems(params) {
    return Detail.getMetaItems(params);
  }
  static getUpdateWrap(params) {
    return Detail.getUpdateWrap(params);
  }
  static getUpdate(params) {
    return Detail.getUpdate(params);
  }
  static getSpace(params) {
    return Detail.getSpace(params);
  }
}
