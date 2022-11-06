import Ui from 'common/clientState/store/Ui';
import conf from 'common/conf';

import Container from '../../Container';
import Style from '../../index';

export default class Ch {
  static get tuneRGB() {
    return Container.themeRGB;
  }
  static get rank1RGB() {
    return 'rgb(255, 10, 78)';
  }
  static get rank2RGB() {
    return 'rgb(255, 127, 0)';
  }
  static get rank3RGB() {
    return 'rgb(0, 142, 255)';
  }
  static get rankOtherRGB() {
    return Container.downreliefRGB;
  }
  static get oneDigitWidth() {
    return '17%';
  }
  static get twoDigitWidth() {
    return '18%';
  }
  static get thirdDigitWidth() {
    return '19%';
  }
  static get iconSize() {
    return 24;
  }
  static get activeLiSelfLabel() {
    return 'activeLiSelf';
  }
  static get unactiveLiSelfLabel() {
    return 'unactiveLiSelf';
  }

  static get activeLiSelfBackground() {
    return Container.whiteRGBA;
  }
  static get activeLiSelfMouseOverBackground() {
    return Container.whiteRGBA;
  }
  static get activeLiSelfMouseDownBackground() {
    return Container.whiteRGBA;
  }
  static get unactiveLiSelfBackground() {
    return Container.calmRGBA;
  }
  static get unactiveLiSelfMouseOverBackground() {
    return Container.whiteRGBA;
  }
  static get unactiveLiSelfMouseDownBackground() {
    return Container.whiteRGBA;
  }

  static get activeLiSelfBorderRightColor() {
    return `1px solid ${Container.whiteRGB}`;
  }
  static get unactiveLiSelfBorderRightColor() {
    return Container.border;
  }

  static getUnactiveLiBorder({ app, ui }): React.CSSProperties {
    if (ui.extensionMode === Ui.extensionModeBottom) {
      return {
        borderTop: 0,
        borderRight: 0,
        borderBottom: Container.border,
        borderLeft: 0,
      };
    } else {
      return ui.screenSize === Ui.screenSizeSmallLabel
        ? {
            borderTop: 0,
            borderRight: 0,
            borderBottom: Container.border,
            borderLeft: 0,
          }
        : {
            borderTop: 0,
            borderRight: Container.border,
            borderBottom: Container.border,
            borderLeft: 0,
          };
    }
  }

  static getDispRankBackground(rank = 0) {
    switch (rank) {
      case 0:
        return Ch.tuneRGB;
      case 1:
        return Ch.rank1RGB;
      case 2:
        return Ch.rank2RGB;
      case 3:
        return Ch.rank3RGB;
      default:
        return Ch.rankOtherRGB;
    }
  }

  static getDispRankWidth(rank = 0) {
    switch (String(rank).length) {
      case 0:
        return Ch.oneDigitWidth;
      case 1:
        return Ch.oneDigitWidth;
      case 2:
        return Ch.twoDigitWidth;
      case 3:
        return Ch.thirdDigitWidth;
      default:
        return Ch.thirdDigitWidth;
    }
  }

  activeLiSelf: React.CSSProperties;
  unactiveLiSelf: React.CSSProperties;
  space: React.CSSProperties;
  upper: React.CSSProperties;
  upperSpace: React.CSSProperties;
  upperRankWrap: React.CSSProperties;
  upperRank: React.CSSProperties;
  upperRight: React.CSSProperties;
  bottom: React.CSSProperties;
  bottomIcon: React.CSSProperties;
  bottomPost: React.CSSProperties;
  ext: React.CSSProperties;
  extMusic: React.CSSProperties;
  extVideo: React.CSSProperties;
  constructor(params) {
    const activeLiSelf = Ch.getActiveLiSelf(params);
    const unactiveLiSelf = Ch.getUnactiveLiSelf(params);
    const space = Ch.getSpace(params);
    const upper = Ch.getUpper();
    const upperSpace = Ch.getUpperSpace();
    const upperRankWrap = Ch.getUpperRankWrap(params);
    const upperRank = Ch.getUpperRank();
    const upperRight = Ch.getUpperRight();
    const bottom = Ch.getBottom(params);
    const bottomIcon = Ch.getBottomIcon(params);
    const bottomPost = Ch.getBottomPost();
    const ext = Ch.getExt();
    const extMusic = Ch.getExtMusic();
    const extVideo = Ch.getExtVideo();
    return {
      activeLiSelf,
      unactiveLiSelf,
      space,
      upper,
      upperSpace,
      upperRankWrap,
      upperRank,
      upperRight,
      bottom,
      bottomIcon,
      bottomPost,
      ext,
      extMusic,
      extVideo,
    };
  }

  static getActiveLiSelf({ app, ui }): React.CSSProperties {
    const height = Container.getBlockSize({ app, ui }) * 2;
    const padding = ui.screenSize === Ui.screenSizeSmallLabel ? '8px' : '16px';
    const layout = Style.getLayoutBlock({
      width: 'initial',
      height: `${height}px`,
      minHeight: `${height}px`,
      padding,
      borderTop: 0,
      borderRight: `1px solid ${Container.whiteRGB}`,
      borderBottom: Container.border,
      borderLeft: 0,
      background: Ch.activeLiSelfBackground,
      boxShadow: '0px 0px 0px rgba(255,255,255,1), 0px 0px 0px rgba(${Container.themeRGBString}, 0.2) inset ',
      cursor: 'pointer',
    });
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase({
      transition: `${Container.transitionOn}ms`,
    });
    return Style.get({ layout, content, animation });
  }

  static getUnactiveLiSelf({ app, ui }): React.CSSProperties {
    const borders = Ch.getUnactiveLiBorder({ app, ui });
    const height = Container.getBlockSize({ app, ui }) * 2;
    const padding = ui.screenSize === Ui.screenSizeSmallLabel ? '8px' : '16px';
    const layout = Style.getLayoutBlock({
      boxShadow: `${Container.lineShadow}, 0px 0px 0px rgba(${Container.themeSuperLightRGBString}, 1) inset`,
      width: 'initial',
      height: `${height}px`,
      minHeight: `${height}px`,
      padding,
      ...borders,
      background: Ch.unactiveLiSelfBackground,
      cursor: 'pointer',
    });
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase({
      transition: `${Container.transitionOn}ms`,
    });

    return Style.get({ layout, content, animation });
  }

  static getSpace({ app, ui }): React.CSSProperties {
    const layout = Style.getLayoutBlock({
      height: '100%',
      background: Container.silverRGBA,
    });
    const content = Style.getContentBase({});
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getUpper(): React.CSSProperties {
    const layout = Style.getLayoutBlock({
      width: '100%',
      height: '20px',
    });
    const content = Style.getContentBase({});
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getUpperSpace(): React.CSSProperties {
    const layout = Style.getLayoutInlineBlock({
      width: '18%',
      margin: '0px 2% 0px 0px',
    });
    const content = Style.getContentBase({});
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getUpperRankWrap({ app, ui }): React.CSSProperties {
    const top = ui.screenSize === Ui.screenSizeSmallLabel ? '8px' : '16px';
    const layout = Style.getLayoutInlineFlex({
      position: 'absolute',
      left: '14px',
      top,
      width: Ch.thirdDigitWidth,
      height: '20px',
      background: Ch.rankOtherRGB,
      borderRadius: '10px',
      margin: '0',
    });
    const content = Style.getContentBase({});
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getUpperRank(): React.CSSProperties {
    const layout = Style.getLayoutFlex({
      width: '100%',
    });
    const content = Style.getContentBase({
      fontSize: '0.7em',
      fontWeight: 'bold',
      color: Container.whiteRGB,
      lineHeight: '1.5',
    });
    const animation = Style.getAnimationBase({
      transform: 'scale(0.8)',
    });
    return Style.get({ layout, content, animation });
  }

  static getUpperRight(): React.CSSProperties {
    const layout = Style.getLayoutInlineBlock({
      width: '80%',
    });
    const content = Style.getContentBase({
      lineHeight: '1.5',
      textIndent: '4px',
      textAlign: 'left',
    });
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getBottom({ app, ui }): React.CSSProperties {
    const height = ui.screenSize === Ui.screenSizeSmallLabel ? '50%' : '63%';
    const layout = Style.getLayoutFlex({
      justifyContent: 'flex-start',
      alignItems: 'center',
      width: '100%',
      height,
    });
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getBottomIcon({ app, ui }): React.CSSProperties {
    const layout = Style.getLayoutInlineBlock({
      width: '20%',
      height: '100%',
      backgroundImage: `url("${conf.assetsURL}/favicon.ico")`,
      backgroundPosition: '30% 50%',
      backgroundSize: `${Container.getFaviconSize({ app, ui })}px`,
      backgroundRepeat: 'no-repeat',
    });
    const content = Style.getContentBase();
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getBottomPost(): React.CSSProperties {
    const layout = Style.getLayoutInlineFlex({
      width: '65%',
      height: '100%',
      justifyContent: 'flex-start',
    });
    const content = Style.getContentBase({
      textIndent: '3%',
      textAlign: 'left',
      whiteSpace: 'nowrap',
    });
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getExt(): React.CSSProperties {
    const layout = Style.getLayoutFlex({
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
      bottom: '0px',
      right: '10px',
      width: '70px',
      height: '20px',
      background: Container.lightGrayRGBA,
      borderRadius: '3px 3px 0px 0px',
    });
    const content = Style.getContentBase({
      textIndent: '3px',
      textAlign: 'center',
      fontSize: '0.6em',
      color: Container.whiteRGB,
    });
    const animation = Style.getAnimationBase();
    return Style.get({ layout, content, animation });
  }

  static getExtMusic(): React.CSSProperties {
    let ext: any = Ch.getExt();
    //    ext.background = "rgba(143,198,143, 1)";
    ext.background = 'rgba(143,198,143, 1)';
    return ext;
  }

  static getExtVideo(): React.CSSProperties {
    let ext: any = Ch.getExt();
    ext.background = 'rgba(105, 70, 255, 1)';
    return ext;
  }
}
