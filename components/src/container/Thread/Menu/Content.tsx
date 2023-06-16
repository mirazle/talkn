import { css } from '@emotion/react';
import React, { useEffect, useState } from 'react';

import Thread from 'api/store/Thread';

import Favicon from 'components/atomicDesign/atoms/Favicon';
import LiveCnt from 'components/atomicDesign/atoms/LiveCnt';
import { getStampLabel } from 'components/container/Thread/Posts/Post';
import { animations, colors } from 'components/styles';
import layouts from 'components/styles/layouts';

import Label from './Label';

import { menuModeBar, menuModeInclude, menuModeNormal, menuModeSmall, MenuModeType } from '../GlobalContext/hooks/menu/mode';

type Props = {
  data: any;
  api: any;
  isHighlight: boolean;
  menuMode: MenuModeType;
  transitionEndMenuMode: MenuModeType;
  handleOnClickMenu: (ch: string) => void;
  label?: string;
};

const Component: React.FC<Props> = ({ label = 'TUNE', api, isHighlight, menuMode, transitionEndMenuMode, handleOnClickMenu, data }) => {
  const [isMouseOver, setIsMouseOver] = useState(false);
  const handleOnMouseDown = () => setIsMouseOver(true);
  const handleOnMouseUp = () => setIsMouseOver(false);
  const handleOnMouseLeave = () => setIsMouseOver(false);

  useEffect(() => {}, [data.liveCnt]);

  useEffect(() => {
    api('onResponseChAPI', data.ch);
    return () => api('offResponseChAPI', data.ch);
  }, [data.ch]);

  return (
    <div
      css={styles.container(isHighlight, isMouseOver)}
      onClick={() => handleOnClickMenu(data.ch)}
      onMouseUp={handleOnMouseUp}
      onMouseDown={handleOnMouseDown}
      onMouseLeave={handleOnMouseLeave}>
      <header css={styles.header(menuMode, transitionEndMenuMode, label)}>
        <Label menuMode={menuMode} label={label} radius />
        <span className="title">Title</span>
      </header>
      <div css={styles.body(menuMode, transitionEndMenuMode)}>
        <div className="faviconWrap">
          <Favicon src={data.favicon} />
        </div>
        <div className="postWrap">
          <span>{data.post}</span>
          {data.stampId !== 0 && <label>{getStampLabel(data.stampId)}</label>}
        </div>
        <div className="liveCntWrap">
          <LiveCnt bgAlpha>{data.liveCnt}</LiveCnt>
        </div>
      </div>
      <footer css={styles.footer(menuMode, data.findType)}>
        <div className="findTypeWrap">{data.findType}</div>
      </footer>
    </div>
  );
};

export default Component;

const minDuration = 100;
const duration = animations.transitionDuration;
const styles = {
  container: (isHighlight: boolean, isMouseOver: boolean) => css`
    overflow: hidden;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: inherit;
    padding: 0 16px 0 0;
    cursor: pointer;
    background: ${isHighlight || isMouseOver ? 'rgba(255, 255, 255, 1)' : 'rgba(230, 230, 230, 1)'};
    border-bottom: 1px solid rgba(220, 220, 220, 1);
    transition: background ${duration}ms;
    transform: translate(0, 0);
    user-select: none;
    :hover {
      background: ${isHighlight || isMouseOver ? 'rgba(255, 255, 255, 1)' : 'rgba(242, 242, 242, 1)'};
    }
  `,
  header: (menuMode: MenuModeType, transitionEndMenuMode: MenuModeType, label: string) => css`
    display: flex;
    flex-flow: row nowrap;
    align-items: flex-end;
    justify-content: flex-start;
    width: 100%;
    height: 25px;
    min-height: 25px;
    padding-left: ${menuMode === menuModeSmall ? 4 : 8}px;
    transition: padding-left ${animations.transitionDuration}ms;
    user-select: none;
    .title {
      ${getTitleCss(menuMode, transitionEndMenuMode)};
      font-size: 90%;
      user-select: none;
    }
  `,
  body: (menuMode: MenuModeType, transitionEndMenuMode: MenuModeType) => css`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 40px;
    min-height: 40px;
    user-select: none;
    .faviconWrap {
      user-select: none;
      i {
        user-select: none;www
        ${getFaviconSize(menuMode, transitionEndMenuMode)};
      }
    }
    .postWrap {
      flex: 1 1 auto;
      padding-bottom: 4px;
      ${getPostCss(menuMode, transitionEndMenuMode)};
      color: ${colors.fontColor};
      user-select: none;
      label {
        padding: 4px 12px 6px;
        margin-left: 16px;
        background: ${colors.brightColor};
        border-radius: 16px;
        font-size: 75%;
        color: ${colors.whiteColor};
        cursor: pointer;
      }
    }
    .liveCntWrap {
      user-select: none;
    }
  `,
  footer: (menuMode: MenuModeType, findType: FindType) => css`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    height: 25px;
    min-height: 25px;
    user-select: none;
    .findTypeWrap {
      user-select: none;
      ${getFindTypeCss(menuMode, findType)};
      padding: 4px 16px 4px;
      border-radius: 6px 6px 0 0;
      color: #fff;
      font-size: 75%;
    }
  `,
};

const ranks = [colors.rank1Color, colors.rank2Color, colors.rank3Color];
const getLabelCss = (menuMode: MenuModeType, label: string) => {
  const labelNumber = Number(label);
  let background;
  if (labelNumber >= 1 && labelNumber <= 3) {
    background = ranks[labelNumber - 1];
  } else if (label === 'TUNE') {
    background = colors.themeColor;
  } else {
    background = colors.otherRankColor;
  }

  switch (menuMode) {
    case menuModeNormal:
    case menuModeInclude:
      return css`
        margin-right: 8px;
        background: ${background};
        transition: 0ms;
      `;
    default:
      return css`
        margin-right: 0;
        background: ${background};
        transition: 0ms;
      `;
  }
};

const getTitleCss = (menuMode: MenuModeType, transitionEndMenuMode: MenuModeType) => {
  const commonCss = css`
    opacity: 0;
    color: ${colors.fontColor};
    transition: width 0ms, opacity ${minDuration}ms, text-indent ${duration}ms;
  `;
  let transformCss = css``;
  switch (menuMode) {
    case menuModeNormal:
      transformCss = css`
        opacity: 1;
        width: 100%;
        text-indent: 12px;
      `;
      break;
    case menuModeBar:
    case menuModeInclude:
      switch (transitionEndMenuMode) {
        case menuModeBar:
          transformCss = css`
            opacity: 1;
            width: 100%;
            text-indent: 11px;
          `;
          break;
        default:
          transformCss = css`
            opacity: 0;
            width: 0;
            text-indent: 11px;
          `;
          break;
      }
  }

  return [commonCss, transformCss];
};

const getFaviconSize = (menuMode: MenuModeType, transitionEndMenuMode: MenuModeType) => {
  const commonCss = css`
    transition: width ${duration}ms, min-width ${duration}ms, max-width ${duration}ms, margin ${duration}ms;
  `;

  let transformCss = css`
    width: 40px;
    min-width: 40px;
    max-width: 40px;
    height: 40px;
    min-height: 40px;
    max-height: 40px;
    margin: 0 4px;
  `;

  switch (menuMode) {
    case menuModeNormal:
    case menuModeInclude:
      transformCss = css`
        width: 48px;
        min-width: 48px;
        max-width: 48px;
        height: 48px;
        min-height: 48px;
        max-height: 48px;
        margin: 0 20px 0 8px;
      `;
      break;
    case menuModeBar:
      transformCss = css`
        width: 40px;
        min-width: 40px;
        max-width: 40px;
        height: 40px;
        min-height: 40px;
        max-height: 40px;
        margin: 0 20px 0 8px;
      `;
  }

  return [commonCss, transformCss];
};

const getPostCss = (menuMode: MenuModeType, transitionEndMenuMode: MenuModeType) => {
  const commonCss = css`
    transition: width 0ms, opacity ${minDuration}ms;
  `;
  let transformCss = css`
    width: 0;
    opacity: 0;
  `;

  switch (menuMode) {
    case menuModeBar:
    case menuModeNormal:
    case menuModeInclude:
      switch (transitionEndMenuMode) {
        case menuModeBar:
        case menuModeNormal:
        case menuModeInclude:
        case menuModeSmall:
          transformCss = css`
            width: 100%;
            opacity: 1;
          `;
      }
  }
  return [commonCss, transformCss];
};

type FindType =
  | typeof Thread.findTypeAll
  | typeof Thread.findTypeHtml
  | typeof Thread.findTypeMusic
  | typeof Thread.findTypeVideo
  | typeof Thread.findTypeOther;

const getFindTypeCss = (menuMode: MenuModeType, findType: FindType) => {
  switch (menuMode) {
    case menuModeNormal:
    case menuModeInclude:
      switch (findType) {
        case Thread.findTypeAll:
        case Thread.findTypeHtml:
        default:
          return css`
            display: none;
          `;
        case Thread.findTypeMusic:
          return css`
            display: flex;
            background: rgba(0, 180, 0, 0.8);
          `;
        case Thread.findTypeVideo:
          return css`
            display: flex;
            background: rgba(255, 0, 0, 0.8);
          `;
      }
    default:
      return css`
        display: none;
      `;
  }
};
