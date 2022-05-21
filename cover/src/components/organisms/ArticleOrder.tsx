import React, { useEffect, useState, useRef } from 'react';
import styled, { css } from 'styled-components';

import AppStore from 'api/store/App';

import Article, { ArticleType } from 'cover/components/molecules/Article';
import { H5 } from 'cover/flexes';
import styles from 'cover/styles';

type StateType = {
  ranks: ArticleType[];
  app: AppStore;
  thread: any;
};

type ArticleOrderType = {
  api: any;
  state: StateType;
  root: Element;
};

// const NoData: React.FC = () => <div>No Data</div>;
const Component: React.FC<ArticleOrderType> = (props) => {
  const { state, root } = props;
  const { ranks: articles, thread } = state;
  const { ch, title } = thread;
  const orderRef = useRef(null);
  const [active, setActive] = useState<boolean>(false);
  const [focusIndex, setFocusIndex] = useState<undefined | number>(undefined);
  const [articleHeights, setArticleHeights] = useState<number[]>([0]);

  const handleOnScroll = () => {
    setActive(true);
  };

  const handleOnMouseOverContainer = () => {
    const rootElm = root as HTMLElement;
    rootElm.style.zIndex = String(Number.MAX_SAFE_INTEGER);
    rootElm.style.position = 'relative';
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
    if (orderRef.current) {
      let _articleHeights = [];
      for (let index = 0; index < articles.length; index++) {
        const articleLi = orderRef.current.children[index];
        _articleHeights.push(articleLi.querySelector('article').scrollHeight * styles.articleOpenScale);
      }
      setArticleHeights(_articleHeights);
    }
  }, [articles.length, window.innerWidth]);

  return (
    <Container focusHeight={articleHeights[focusIndex]} onMouseOver={handleOnMouseOverContainer} onMouseLeave={handleOnMouseLeave}>
      <TitleCustom id={'ArticleOrder'}>
        {getCategory(ch)}&nbsp;(&nbsp;{title}&nbsp;)
      </TitleCustom>
      <ArrowRightButton
        active={active}
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
        active={active}
        {...activeOnEvents}
        onClick={() => handleOnButtonClick('right')}
        onMouseLeave={handleOnMouseLeaveArrowButton}
      />
    </Container>
  );
};

export default Component;

type ContainerPropeType = {
  focusHeight?: number;
};

const getCategory = (ch) => {
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

const ContainerMarginTop = styles.baseMargin;
const Container = styled.div<ContainerPropeType>`
  display: flex;
  flex-flow: column wrap;
  width: 100%;
  margin-top: 0;
  margin-right: 0;
  margin-bottom: ${(props) =>
    props.focusHeight === undefined ? '0' : `-${props.focusHeight + styles.doubleMargin - styles.articleOrderHeight}px`};
  margin-left: 0;
  border: 0;
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
  height: ${(props) => (props.focusHeight === undefined ? `${styles.articleOrderHeight}` : `${props.focusHeight + styles.doubleMargin}`)}px;
  border: 0;
  overflow-x: scroll;
  overflow-y: hidden;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const TitleCustom = styled(H5)`
  padding: 0 ${styles.doublePadding}px;
  text-indent: 0;
`;

const ArticleList = styled.li`
  padding: ${styles.basePadding}px;
  scroll-snap-align: start;
  list-style: none;
  transform: translate(0px, 0px);
`;

type ArrowButtonPropsType = {
  active: boolean;
};
const H3LineHeight = styles.doubleMargin;
const H3Margin = styles.baseMargin;
const H3Height = H3LineHeight + H3Margin * 2;
const ArrowCommonCss = css<ArrowButtonPropsType>`
  z-index: 1;
  position: absolute;
  top: ${H3Height}px;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  width: ${styles.quadSize}px;
  height: ${styles.articleOrderHeight}px;
  padding: 0;
  margin: 0;
  background-color: rgba(0, 0, 0, ${(props) => (props.active ? '0.6' : '0.3')});
  background-position: 50%;
  background-repeat: no-repeat;
  color: transparent;
  border: 0;
  outline: 0 none;
  transition: opacity 300ms ease, background-color 300ms ease;
`;

const ArrowRightButton = styled.button<ArrowButtonPropsType>`
  ${ArrowCommonCss};
  border-radius: 0 10px 10px 0;
  left: 0;
  background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMzIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTMuMjM3IDE3LjIzN3YtMi40NzRsMTQgMTRjLjY4NC42ODMuNjg0IDEuNzkgMCAyLjQ3NGExLjc0OCAxLjc0OCAwIDAxLTIuNDc0IDBsLTE0LTE0YTEuNzQ4IDEuNzQ4IDAgMDEwLTIuNDc0bDE0LTE0YTEuNzQ4IDEuNzQ4IDAgMDEyLjQ3NCAwYy42ODQuNjgzLjY4NCAxLjc5IDAgMi40NzRsLTE0IDE0eiIgZmlsbD0iI0VGRjFGMSIvPjwvc3ZnPg==);
`;

const ArrowLeftButton = styled.button<ArrowButtonPropsType>`
  ${ArrowCommonCss};
  border-radius: 10px 0 0 10px;
  right: 0;
  background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMzIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTE0Ljc2MyAxNy4yMzd2LTIuNDc0bC0xNCAxNGExLjc0OCAxLjc0OCAwIDAwMCAyLjQ3NGMuNjgzLjY4NCAxLjc5LjY4NCAyLjQ3NCAwbDE0LTE0YTEuNzQ4IDEuNzQ4IDAgMDAwLTIuNDc0bC0xNC0xNEExLjc1IDEuNzUgMCAwMC43NjMgMy4yMzdsMTQgMTR6IiBmaWxsPSIjRUZGMUYxIi8+PC9zdmc+);
`;
