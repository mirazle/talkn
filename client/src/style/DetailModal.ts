import Ui from 'common/clientState/store/Ui';

import Container from './Container';
import Detail from './Detail';
import Menu from './Menu';
import Posts from './Posts';
import Style from './index';

export default class DetailModal {
  static getWidth({ app, ui }, addUnit = false) {
    let width = '0';
    if (ui.extensionMode === Ui.extensionModeLiveMedia) {
      width = '100%';
    } else {
      width =
        ui.screenSize === Ui.screenSizeSmallLabel
          ? String(Math.floor(ui.width * Container.widthRatio)) + 'px'
          : `calc( ${100 * Container.widthRatio}% - ${Menu.getWidth({ app, ui })} )`;
    }
    return addUnit ? Style.trimUnit(width) : width;
  }

  static getBaseMarginRate({ app, ui }, addUnit = false) {
    return Math.floor(((1 - Container.widthRatio) / 2) * 100);
  }

  static getBaseMargin({ app, ui }, addUnit = false) {
    return Posts.getWidth({ app, ui }, true) * (DetailModal.getBaseMarginRate({ app, ui }) / 100);
  }

  static getMargin({ app, ui }, addUnit = false) {
    if (ui.extensionMode === Ui.extensionModeLiveMedia) {
      return '0';
    } else if (ui.extensionMode === Ui.extensionModeBottom) {
      return '0% 8%';
    } else {
      switch (ui.screenSize) {
        case Ui.screenSizeSmallLabel:
        case Ui.screenSizeMiddleLabel:
        case Ui.screenSizeLargeLabel:
          const marginRate = DetailModal.getBaseMarginRate({ app, ui });
          return `0% ${marginRate}% 0% ${marginRate}%`;
      }
    }
  }

  static getHeight({ app, ui }, addUnit = false) {
    const marginRate = DetailModal.getBaseMarginRate({ app, ui });
    const blockSize = Container.getBlockSize({ app, ui });
    if (ui.extensionMode === Ui.extensionModeLiveMedia) {
      return `calc(100% - ${Container.getBlockSize({ app, ui })}px)`;
    } else {
      switch (ui.screenSize) {
        case Ui.screenSizeSmallLabel:
          return `calc( ${100 - marginRate}% - ${blockSize * 2}px )`;
        case Ui.screenSizeMiddleLabel:
          return `calc( ${100 - marginRate}% - ${blockSize * 2}px )`;
        case Ui.screenSizeLargeLabel:
          const baseMargin = DetailModal.getBaseMargin({ app, ui });
          return `calc( 100% - ${blockSize * 2 + baseMargin}px )`;
      }
    }
  }

  static getTransform({ app, ui }) {
    return ui.isOpenDetail ? DetailModal.getOpenSelfTransform({ app, ui }) : DetailModal.getCloseSelfTransform({ app, ui });
  }
  static getCloseSelfTransform({ app, ui }) {
    return `translate3d(0%, 0px, 0px)`;
  }
  static getOpenSelfTransform({ app, ui }) {
    if (ui.extensionMode === Ui.extensionModeLiveMedia) {
      return `translate3d(0%, calc( -100% - ${Container.getBlockSize({ app, ui })}px ), 0px)`;
    } else {
      return `translate3d(0%, calc( -100% - ${Container.getBlockSize({ app, ui })}px ), 0px)`;
    }
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
