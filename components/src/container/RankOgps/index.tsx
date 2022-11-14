import React, { useEffect, useState, useRef, memo } from 'react';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';

import BootOption from 'common/BootOption';
import mapToStateToProps from 'common/clientState/mapToStateToProps/';

import AppStore from 'api/store/App';

import handles from 'client/actions/handles';

import Title, { H3Height } from 'components/atomicDesign/atoms/Title';
import FloatMenu from 'components/atomicDesign/molecules/FloatMenu';
import Article, { ArticleType } from 'components/container/RankOgps/Article';
import Flex from 'components/flexes';
import { articleOrderMenus } from 'components/model/Menu';
import { animations, blocks, colors, layouts, dropFilter, shadow } from 'components/styles';

export type StateType = {
  actionLog: string[];
  ranks: any; //ArticleType[];
  app: AppStore;
  thread: any;
  posts: any;
  ui: any;
  uiTimeMarker: any;
  tuneCh: any;
};

export type Props = {
  bootOption: BootOption;
  api: any;
  state: StateType;
  root: HTMLElement;
};
// const NoData: React.FC = () => <div>No Data</div>;
const Component: React.FC<Props> = (props) => {
  const { state, api, bootOption, root } = props;
  const { app, ranks: articles, thread, tuneCh } = state;
  const { ch, title } = tuneCh;
  const containerRef = useRef(null);
  const orderRef = useRef(null);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);
  const [focusIndex, setFocusIndex] = useState<undefined | number>(undefined);
  const [articleHeights, setArticleHeights] = useState<number[]>([0]);

  const handleOnClickNav = () => {
    setOpenMenu(!openMenu);
  };

  const handleOnScroll = () => {
    setActive(true);
  };

  const handleOnMouseOverContainer = () => {
    const rootElm = root as HTMLElement;
    rootElm.style.zIndex = '10';
  };
  const handleOnMouseOver = () => {
    setActive(true);
  };
  const handleOnMouseMove = () => {
    setActive(true);
  };
  const handleOnMouseLeave = () => {
    const rootElm = root as HTMLElement;
    rootElm.style.zIndex = 'auto';
    setFocusIndex(undefined);
    setActive(false);
  };

  const handleOnMouseLeaveArrowButton = () => {
    setActive(false);
  };

  const handleOnButtonClick = (direction: 'left' | 'right') => {
    const orderElm = orderRef.current;
    const listElm = orderElm.children[0];
    const currentLeft = orderRef.current.scrollLeft;
    const addScrollLeft = direction === 'left' ? -listElm.clientWidth : listElm.clientWidth;

    orderRef.current.scrollTo({
      left: currentLeft + addScrollLeft,
      behavior: 'smooth',
    });
  };

  const activeOnEvents = { onMouseMove: handleOnMouseMove, onMouseOver: handleOnMouseOver, onTouchStart: handleOnMouseOver };

  useEffect(() => {
    if (containerRef.current) {
      const rootElm = root as HTMLElement;
      rootElm.style.position = 'relative';
      rootElm.style.width = '100%';
    }
  }, [containerRef.current]);

  useEffect(() => {
    if (orderRef.current) {
      let _articleHeights = [];
      for (let index = 0; index < articles.length; index++) {
        const articleLi = orderRef.current.children[index];
        _articleHeights.push(articleLi.querySelector('article').scrollHeight * layouts.articleOpenScale);
      }
      setArticleHeights(_articleHeights);
    }
  }, [articles.length, window.innerWidth]);

  useEffect(() => {
    if (state.app.isTune) {
      api('rank', app.rootCh);
    }
  }, [state.app.isTune]);

  useEffect(() => {
    api('tune', bootOption);
  }, []);

  return (
    <Container
      ref={containerRef}
      focusHeight={articleHeights[focusIndex]}
      onMouseOver={handleOnMouseOverContainer}
      onMouseLeave={handleOnMouseLeave}>
      <UpperFlex className="UpperFlex" alignItems="center" justifyContent={'flex-start'} openMenu={openMenu}>
        <div className="Menu" onClick={handleOnClickNav}>
          <FloatMenu
            show={openMenu}
            setShow={setOpenMenu}
            menus={articleOrderMenus}
            onClick={(menu) => {
              api.json(menu, { ch });
              setOpenMenu(false);
            }}
          />
        </div>
        <TitleCustom type={'ArticleOrder'}>
          {getCategory(ch)}&nbsp;(&nbsp;{title}&nbsp;)
        </TitleCustom>
      </UpperFlex>
      <ArrowRightButton
        highlight={active}
        openMenu={openMenu}
        {...activeOnEvents}
        onClick={() => handleOnButtonClick('left')}
        onMouseLeave={handleOnMouseLeaveArrowButton}
      />
      <ArticleOrder
        ref={orderRef}
        focusHeight={articleHeights[focusIndex]}
        onScroll={handleOnScroll}
        onMouseLeave={handleOnMouseLeave}
        {...activeOnEvents}>
        {articles.map((article, index) => (
          <ArticleList key={`${article.ch}.${index}`}>
            <Article article={article} index={index} focusIndex={focusIndex} setFocusIndex={setFocusIndex} />
          </ArticleList>
        ))}
      </ArticleOrder>
      <ArrowLeftButton
        highlight={active}
        openMenu={openMenu}
        {...activeOnEvents}
        onClick={() => handleOnButtonClick('right')}
        onMouseLeave={handleOnMouseLeaveArrowButton}
      />
    </Container>
  );
};

export default connect(mapToStateToProps, { ...handles })(Component);

type ContainerPropeType = {
  focusHeight?: number;
};

const getCategory = (ch = '/') => {
  const splited = ch.split('/');
  if (splited.length >= 3) {
    let _category = splited.reduce((prev, cur, i) => {
      if (i < 2) {
        return '';
      } else if (i === 2) {
        return prev + cur;
      } else {
        return prev + '/' + cur;
      }
    }, '');
    _category = _category.endsWith('/') ? _category.replace(/\/$/, '') : _category;
    return _category.charAt(0).toUpperCase() + _category.slice(1);
  } else {
    return ch;
  }
};

const ContainerMarginTop = layouts.baseMargin;
const Container = styled.section<ContainerPropeType>`
  display: flex;
  flex-flow: column wrap;
  min-width: 100%;
  width: 100%;
  max-width: 100vw;
  margin-top: 0;
  margin-right: 0;
  margin-bottom: ${(props) =>
    props.focusHeight === undefined ? 0 : `-${props.focusHeight + layouts.doubleMargin - layouts.articleOrderHeight}px`};
  margin-left: 0;
  border-radius: 15px 15px 0 0;
  border-top: 0 solid ${colors.borderColor};
  border-right: ${(props) => (props.focusHeight ? '0' : '0')} solid ${colors.borderColor};
  border-bottom: ${(props) => (props.focusHeight ? '0' : '0')} solid ${colors.borderColor};
  border-left: ${(props) => (props.focusHeight ? '0' : '0')} solid ${colors.borderColor};
  overflow-y: visible;
  transform: translate(0px, 0px);
  * {
    text-decoration: none;
  }
`;

type ArticleOrderPropeType = {
  focusHeight?: number;
};

const ArticleOrder = styled.ol<ArticleOrderPropeType>`
  display: flex;
  flex-flow: row nowrap;
  width: inherit;
  max-width: inherit;
  height: ${(props) =>
    props.focusHeight === undefined ? `${layouts.articleOrderHeight}` : `${props.focusHeight + layouts.doubleMargin}`}px;
  margin: 0;
  border: 0;
  overflow-x: scroll;
  overflow-y: hidden;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const menuActiveColor = '#bbb';

const UpperFlex = styled(Flex)<{ openMenu: boolean }>`
  .Menu {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    width: 34px;
    min-width: 34px;
    height: 34px;
    margin: 10px;
    border-radius: 25%;
    margin: 10px;
    background-color: rgba(0, 0, 0, ${(props) => (props.openMenu ? '0.6' : '0.3')});
    transition: ${animations.transitionDuration}ms;
    cursor: pointer;
    &:before {
      content: '';
      width: 50%;
      height: 2px;
      margin: 2px;
      background: #fff;
      transition: ${animations.transitionDuration}ms;
      transform: ${(props) => (props.openMenu ? 'rotate(45deg) translate(2px, 3px)' : '')};
    }
    &:after {
      content: '';
      width: 50%;
      height: 2px;
      margin: 2px;
      background: #fff;
      transition: ${animations.transitionDuration}ms;
      transform: ${(props) => (props.openMenu ? 'rotate(-45deg) translate(1px, -2px)' : '')};
    }
  }
  :hover {
    nav.Menu {
      background: ${colors.fontColor};
    }
  }
`;

const TitleCustom = styled(Title)`
  display: flex;
  align-items: center;
  height: 40px;
  padding-left: ${layouts.basePadding}px;
  text-indent: 0;
`;

const ArticleList = styled.li`
  padding: ${layouts.basePadding}px;
  scroll-snap-align: start;
  list-style: none;
  transform: translate(0px, 0px);
`;

type ArrowButtonPropsType = {
  highlight: boolean;
  openMenu: boolean;
};

const ArrowCommonCss = css<ArrowButtonPropsType>`
  z-index: 1;
  position: absolute;
  top: ${H3Height + layouts.basePadding / 2}px;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  width: ${(props) => (props.openMenu ? `${layouts.quintSize}px` : `${layouts.quintSize}px`)};
  height: ${layouts.articleCloseHeight + layouts.basePadding}px;
  padding: 0;
  margin: 0;
  background-color: rgba(0, 0, 0, ${(props) => (props.highlight || props.openMenu ? '0.6' : '0.3')});
  background-position: 50%;
  background-repeat: no-repeat;
  color: transparent;
  border: 0;
  outline: 0 none;
  transition: border-radius ${animations.transitionDuration * 2}ms ease, width ${animations.transitionDuration}ms ease,
    background-color ${animations.transitionDuration * 2}ms ease;
`;

const ArrowRightButton = styled.button<ArrowButtonPropsType>`
  ${ArrowCommonCss};
  border-radius: 0 20px 20px 0;
  left: 0;
  background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMzIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTMuMjM3IDE3LjIzN3YtMi40NzRsMTQgMTRjLjY4NC42ODMuNjg0IDEuNzkgMCAyLjQ3NGExLjc0OCAxLjc0OCAwIDAxLTIuNDc0IDBsLTE0LTE0YTEuNzQ4IDEuNzQ4IDAgMDEwLTIuNDc0bDE0LTE0YTEuNzQ4IDEuNzQ4IDAgMDEyLjQ3NCAwYy42ODQuNjgzLjY4NCAxLjc5IDAgMi40NzRsLTE0IDE0eiIgZmlsbD0iI0VGRjFGMSIvPjwvc3ZnPg==);
`;

const ArrowLeftButton = styled.button<ArrowButtonPropsType>`
  ${ArrowCommonCss};
  border-radius: 20px 0 0 20px;
  right: 0;
  background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMzIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTE0Ljc2MyAxNy4yMzd2LTIuNDc0bC0xNCAxNGExLjc0OCAxLjc0OCAwIDAwMCAyLjQ3NGMuNjgzLjY4NCAxLjc5LjY4NCAyLjQ3NCAwbDE0LTE0YTEuNzQ4IDEuNzQ4IDAgMDAwLTIuNDc0bC0xNC0xNEExLjc1IDEuNzUgMCAwMC43NjMgMy4yMzdsMTQgMTR6IiBmaWxsPSIjRUZGMUYxIi8+PC9zdmc+);
`;

const Nav = styled.nav<{ openMenu: boolean }>`
  position: absolute;
  top: ${H3Height + layouts.basePadding}px;
  z-index: ${(props) => (props.openMenu ? 1 : -1)};
  width: 100%;
  min-height: ${layouts.articleCloseHeight}px;
  max-height: ${layouts.articleCloseHeight}px;
  background: rgba(0, 0, 0, 0.6);
  opacity: ${(props) => (props.openMenu ? 1 : 0)};
  transition: ${animations.transitionDuration}ms;
`;
