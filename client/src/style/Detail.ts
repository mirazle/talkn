import { CSSProperties } from 'react';

import Ui from 'common/clientState/store/Ui';

import Container from './Container';
import DetailModal from './DetailModal';
import DetailRight from './DetailRight';
import Menu from './Menu';
import Style from './index';

import detailImg from 'assets/png/talkn_logo1.png';

export default class Detail {
  static get detailRightSelfKey() {
    return 'Right';
  }
  static get detailModalSelfKey() {
    return 'Modal';
  }
  static get screenSizeOfRightDetail() {
    return Ui.screenSizeLargeLabel;
  }
  static get padding() {
    return 20;
  }
  static get margin() {
    return 5;
  }
  static getDetailClass({ app, ui }) {
    return Detail.isRightDetail({ app, ui }) ? DetailRight : DetailModal;
  }
  static isRightDetail({ app, ui }) {
    return ui.screenSize === Detail.screenSizeOfRightDetail;
  }

  self: CSSProperties;
  selfRight: CSSProperties;
  selfModal: CSSProperties;
  header: CSSProperties;
  headerP: CSSProperties;
  body: CSSProperties;
  meta: CSSProperties;
  img: CSSProperties;
  description: CSSProperties;
  descriptionAnchor: CSSProperties;
  metaContentTypeWrap: CSSProperties;
  metaContentType: CSSProperties;
  ch: CSSProperties;
  analyze: CSSProperties;
  analyzeRow: CSSProperties;
  analyzeCol: CSSProperties;
  analyzeLabel: CSSProperties;
  analyzeValue: CSSProperties;
  analyzeHr: CSSProperties;
  h1s: CSSProperties;
  h1sLi: CSSProperties;
  footer: CSSProperties;
  footerChild: CSSProperties;
  footerChildLike: CSSProperties;
  footerChildMoney: CSSProperties;
  footerChildShare: CSSProperties;
  metaItems: CSSProperties;
  updateWrap: CSSProperties;
  update: CSSProperties;
  space: CSSProperties;
  constructor(params) {
    const { app, ui } = params;

    const styles: any = {};
    const DetailClass = Detail.getDetailClass({ app, ui });

    styles[`self${Detail.detailRightSelfKey}`] = Detail.getDetailRightSelf(params);
    styles[`self${Detail.detailModalSelfKey}`] = Detail.getDetailModalSelf(params);
    styles.header = DetailClass.getHeader(params);
    styles.headerP = DetailClass.getHeaderP(params);
    styles.body = DetailClass.getBody(params);
    styles.meta = DetailClass.getMeta(params);
    styles.img = DetailClass.getImg(params);
    styles.description = DetailClass.getDescription(params);
    styles.descriptionAnchor = DetailClass.getDescriptionAnchor(params);
    styles.metaContentTypeWrap = DetailClass.getMetaContentTypeWrap(params);
    styles.metaContentType = DetailClass.getMetaContentType(params);
    styles.ch = DetailClass.getCh(params);
    styles.analyze = DetailClass.getAnalyze(params);
    styles.analyzeRow = DetailClass.getAnalyzeRow(params);
    styles.analyzeCol = DetailClass.getAnalyzeCol(params);
    styles.analyzeLabel = DetailClass.getAnalyzeLabel(params);
    styles.analyzeValue = DetailClass.getAnalyzeValue(params);
    styles.analyzeHr = DetailClass.getAnalyzeHr(params);
    styles.h1s = DetailClass.getH1s(params);
    styles.h1sLi = DetailClass.getH1sLi(params);
    styles.footer = DetailClass.getFooter(params);
    styles.footerChild = DetailClass.getFooterChild(params);
    styles.footerChildLike = DetailClass.getFooterChildLike(params);
    styles.footerChildMoney = DetailClass.getFooterChildMoney(params);
    styles.footerChildShare = DetailClass.getFooterChildShare(params);
    styles.metaItems = DetailClass.getMetaItems(params);
    styles.updateWrap = DetailClass.getUpdateWrap(params);
    styles.update = DetailClass.getUpdate(params);
    styles.space = DetailClass.getSpace(params);
    return styles;
  }

  static getDetailModalSelf({ app, ui }) {
    const screenSize = Ui.getScreenSize(ui.width);
    const display = screenSize === Ui.screenSizeLargeLabel ? 'none' : 'block';
    const left = screenSize === Ui.screenSizeSmallLabel ? '0px' : Menu.baseWidth;
    const height = DetailModal.getHeight({ app, ui });
    const borderRadius = ui.extensionMode === Ui.extensionModeLiveMedia ? '0' : Container.radiuses;
    const borders = {
      borderTop: Container.border,
      borderRight: Container.border,
      borderLeft: Container.border,
    };
    const layout = Style.getLayoutBlock({
      display,
      position: 'fixed',
      top: '100%',
      left,
      width: DetailModal.getWidth({ app, ui }, false),
      height,
      margin: DetailModal.getMargin({ app, ui }),
      border: `1px solid ${Container.borderRGB}`,
      //     ...borders,
      borderRadius,
      WebkitOverflowScrolling: 'touch',
      zIndex: 9,
      //      boxShadow: `${Container.lineShadow}`,
    });
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase({
      transform: DetailModal.getTransform({ app, ui }),
      transition: Container.getTransition({ app, ui }),
    });
    return Style.get({ layout, content, animation });
  }

  static getDetailRightSelf({ app, ui }) {
    const layout = Style.getLayoutBlock({
      position: 'fixed',
      top: '0px',
      right: '0px',
      width: DetailRight.getWidth({ app, ui }),
      minWidth: DetailRight.getWidth({ app, ui }),
      height: `calc( 100% - ${Container.getBlockSize({ app, ui })}px )`,
      WebkitOverflowScrolling: 'touch',
      overflow: 'hidden',
      margin: `${Container.getBlockSize({ app, ui })}px 0px 0px 0px`,
      zIndex: 0,
    });
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase({
      transition: '0ms',
    });
    return Style.get({ layout, content, animation });
  }

  static getFooterBorders({ app, ui }) {
    switch (ui.screenSize) {
      case Ui.screenSizeSmallLabel:
      case Ui.screenSizeMiddleLabel:
        return { borderTop: Container.border };
      case Ui.screenSizeLargeLabel:
        return { border: Container.border };
    }
  }

  static getFooterPositions({ app, ui }) {
    switch (ui.screenSize) {
      case Ui.screenSizeSmallLabel:
        return {};
      case Ui.screenSizeMiddleLabel:
      case Ui.screenSizeLargeLabel:
        return {
          position: 'absolute',
          right: '0px',
          bottom: '0px',
        };
    }
  }

  static getWidth({ app, ui }, addUnit = false): any {
    let width = '100%';
    switch (ui.screenSize) {
      case Ui.screenSizeLargeLabel:
        width = '30%';
    }
    return addUnit ? width : Style.trimUnit(width);
  }

  static getTransform({ app, ui }) {
    return Detail.getDetailClass({ app, ui }).getTransform({ app, ui });
  }

  static getHeader({ app, ui }) {
    const display = ui.extensionMode === Ui.extensionModeLiveMedia ? 'none' : 'flex';
    const layout = Style.getLayoutFlex({
      display,
      width: '100%',
      height: `${Container.getBlockSize({ app, ui })}px`,
      maxHeight: `${Container.getBlockSize({ app, ui })}px`,
      borderBottom: `1px solid ${Container.borderRGB}`,
      background: Container.whiteRGBA,
      padding: '0px 20px',
    });
    const content = Style.getContentBase({
      fontSize: '1.2em',
    });
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getHeaderP({ app, ui }) {
    const layout = Style.getLayoutFlex({
      width: '100%',
      height: '100%',
      maxHeight: Container.getBlockSize({ app, ui }),
    });
    const content = Style.getContentBase({
      textOverflow: 'ellipsis',
    });
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getBody({ app, ui }) {
    const height =
      ui.extensionMode === Ui.extensionModeLiveMedia
        ? `calc( 100% - ${Container.getLiveMediaBlockSize({ app, ui })}px )`
        : `calc( 100% - ${Container.getBlockSize({ app, ui }) * 2}px )`;
    const layout = Style.getLayoutGrid({
      overflowX: 'hidden',
      overflowY: 'scroll',
      width: '100%',
      height,
      zIndex: 0,
    });
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getMeta({ app, ui }) {
    const layout = Style.getLayoutBlock({
      width: '100%',
      height: 'max-content',
      background: Container.lightRGBA,
      borderBottom: Container.border,
    });
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase({
      transition: Container.getTransition({ app, ui }),
    });
    return Style.get({ layout, content, animation });
  }

  static getImg({ app, ui }) {
    const layout = Style.getLayoutBlock({
      width: '100%',
      height: '30vh',
      maxHeight: '400px',
      backgroundImage: `url(${detailImg})`,
      backgroundPosition: 'center center',
      // backgroundSize: "60%",
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    });
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getDescription({ app, ui }) {
    const layout = Style.getLayoutBlock({
      width: '90%',
      height: 'initial',
      margin: `7%`,
    });
    const content = Style.getContentBase({
      lineHeight: '2em',
      fontSize: '1.1em',
      textAlign: 'left',
    });
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getDescriptionAnchor({ app, ui }) {
    const layout = Style.getLayoutInlineFlex({
      width: 'auto',
    });
    const content = Style.getContentBase({
      textDecoration: 'none',
    });
    const animation = Style.getAnimationBase({
      transform: 'translate3d(0px, 0px, 0px) scale(0.9)',
    });
    return Style.get({ layout, content, animation });
  }

  static getMetaContentTypeWrap({ app, ui }) {
    const layout = Style.getLayoutFlex({
      flexDirection: 'column',
      alignItems: 'flex-end',
      width: 'initial',
      height: 'initial',
      borderRadius: '10px',
      margin: `${Detail.margin * 2}% ${Detail.margin}%`,
    });
    const content = Style.getContentBase({
      textAlign: 'right',
    });
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getMetaContentType({ app, ui }) {
    const layout = Style.getLayoutBlock({
      background: Container.reliefRGB,
      width: 'initial',
      height: 'initial',
      margin: '10px 0px',
      padding: '10px 20px 10px 20px',
      justifyContent: 'flex-end',
      borderRadius: '30px',
    });
    const content = Style.getContentBase({
      color: Container.whiteRGB,
      textAlign: 'right',
    });
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getCh({ app, ui }) {
    const layout = Style.getLayoutBlock({
      width: '100%',
      height: 'max-content',
      background: Container.lightRGBA,
      borderTop: Container.border,
      borderBottom: Container.border,
      padding: '15px',
    });
    const content = Style.getContentBase({
      textAlign: 'left',
      lineHeight: '30px',
      wordBreak: 'break-word',
    });
    const animation = Style.getAnimationBase({
      transition: Container.getTransition({ app, ui }),
    });
    return Style.get({ layout, content, animation });
  }

  static getAnalyze({ app, ui }) {
    const layout = Style.getLayoutTable({
      width: '100%',
      height: 'initial',
      background: Container.whiteRGB,
      borderTop: Container.border,
      borderBottom: Container.border,
    });
    const content = Style.getContentBase({
      textAlign: 'center',
    });
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getAnalyzeRow({ app, ui }) {
    const layout = Style.getLayoutTableRow({});
    const content = Style.getContentBase({});
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getAnalyzeCol({ app, ui }) {
    const layout = Style.getLayoutTableCol({
      width: '33.3%',
      height: '120px',
      verticalAlign: 'middle',
      margin: '40px auto 40px auto',
    });
    const content = Style.getContentBase({});
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getAnalyzeLabel({ app, ui }) {
    const layout = Style.getLayoutBlock({
      width: 'initial',
      height: 'initial',
      marginBottom: '20px',
    });
    const content = Style.getContentBase({
      lineHeight: '14px',
      fontSize: '0.8em',
    });
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getAnalyzeValue({ app, ui }) {
    const layout = Style.getLayoutBlock({
      margin: '0 auto',
      width: 'initial',
      height: 'initial',
    });
    const content = Style.getContentBase({
      fontSize: '1.8em',
      color: Container.themeRGBA,
    });
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getAnalyzeHr({ app, ui }) {
    const layout = Style.getLayoutBlock({
      width: '70%',
      height: 'initial',
      margin: '10px auto 10px auto',
      borderTop: `1px solid ${Container.borderRGB}`,
    });
    const content = Style.getContentBase({});
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getH1s({ app, ui }) {
    const layout = Style.getLayoutBlock({
      width: '100%',
      height: 'initial',
      margin: `${Detail.margin}px auto`,
      background: Container.whiteRGB,
      borderTop: Container.border,
      borderBottom: Container.border,
    });
    const content = Style.getContentBase({
      textAlign: 'left',
    });
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getH1sLi({ app, ui }) {
    const layout = Style.getLayoutBlock({
      width: '90%',
      height: 'initial',
      margin: `5px ${Detail.margin}% 5px ${Detail.margin}%`,
    });
    const content = Style.getContentBase({
      lineHeight: 2,
      textAlign: 'left',
    });
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getFooter({ app, ui }) {
    const positions = Detail.getFooterPositions({ app, ui });
    const borders = Detail.getFooterBorders({ app, ui });
    const layout = Style.getLayoutFlex({
      width: '100%',
      background: Container.lightRGBA,
      height: Container.getBlockSize({ app, ui }),
      boxShadow: Container.lineShadow,
      zÎndex: '1px',
      ...positions,
      ...borders,
    });
    const content = Style.getContentBase({
      fontSize: '0.7em',
    });
    const animation = Style.getAnimationBase({
      transform: 'translate3d(0px, 0px, 0px)',
    });
    return Style.get({ layout, content, animation });
  }

  static getFooterChild({ app, ui }) {
    const layout = Style.getLayoutBlock({
      flexGrow: 1,
      height: '100%',
    });
    const content = Style.getContentBase({
      cursor: 'pointer',
    });
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getFooterChildLike({ app, ui }) {
    const layout = Style.getLayoutFlex({
      flexFlow: 'column wrap',
      alignItems: 'center',
      justifyContent: 'center',
      flexGrow: 1,
      height: '100%',
    });
    const content = Style.getContentBase({
      color: 'rgba(172, 172, 172, 1)',
      cursor: 'pointer',
    });
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getFooterChildMoney({ app, ui }) {
    const layout = Style.getLayoutFlex({
      flexFlow: 'column wrap',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
    });
    const content = Style.getContentBase({
      color: 'rgba(172, 172, 172, 1)',
      cursor: 'pointer',
    });
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getFooterChildShare({ app, ui }) {
    const layout = Style.getLayoutFlex({
      flexFlow: 'column wrap',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
    });
    const content = Style.getContentBase({
      color: 'rgba(172, 172, 172, 1)',
      cursor: 'pointer',
    });
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getMetaItems({ app, ui }) {
    const layout = Style.getLayoutFlex({
      width: '90%',
      margin: `${Detail.margin}%`,
    });
    const content = Style.getContentBase({});
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getUpdateWrap({ app, ui }) {
    const layout = Style.getLayoutFlex({
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      margin: '0px 0px 30px 0px',
    });
    const content = Style.getContentBase({});
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getUpdate({ app, ui }) {
    const layout = Style.getLayoutFlex({
      width: '160px',
      borderRadius: '30px',
      background: Container.themeRGBA,
    });
    const content = Style.getContentBase({
      textIndent: '15px',
      cursor: 'pointer',
      color: Container.whiteRGB,
    });
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getSpace({ app, ui }) {
    const layout = Style.getLayoutFlex({
      width: '100%',
      height: '100px',
      background: Container.silverRGBA,
    });
    const content = Style.getContentBase({});
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }
}
