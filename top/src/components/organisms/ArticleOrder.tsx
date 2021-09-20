import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

import Title from 'top/components/atoms/Title';
import Article, { ArticleType } from 'top/components/molecules/Article';
import { articleOrderHeight, articleTotalWidth, articleOpenScale, baseMargin, basePadding } from 'top/styles';

type ArticleOrderType = {
  title: string;
  articles: ArticleType[];
  api: (method: any, params?: {}) => void;
};

// const NoData: React.FC = () => <div>No Data</div>;
const Component: React.FC<ArticleOrderType> = ({ title, articles, api }) => {
  const orderRef = useRef(null);
  const [focusIndex, setFocusIndex] = useState<undefined | number>(undefined);
  const [scrolling, setScrolling] = useState<boolean>(false);
  const [articleLefts, setArticleLefts] = useState<number[]>([0]);
  const [articleHeights, setArticleHeights] = useState<number[]>([0]);
  const [scrollIndex, setScrollIndex] = useState<number>(0);
  const [userMoving, setUserMoving] = useState<boolean>(false);
  const [userClientX, setUserClientX] = useState<number>(0);
  let userMovingTimeId: number = 0;

  const handleOnScroll = (e) => {
    setScrolling(true);
    if (articleLefts.includes(e.target.scrollLeft)) {
      setScrolling(false);
      const _scrollIndex = articleLefts.findIndex((scrollIndexLeft) => scrollIndexLeft === e.target.scrollLeft);
      console.log('SCROLL END', userClientX, _scrollIndex, articleLefts);
    }
  };
  const handleOnUserMove = (e) => {
    setUserClientX(e.clientX);
    setUserMoving(true);
    clearTimeout(userMovingTimeId);
    userMovingTimeId = window.setTimeout(() => {
      setUserMoving(false);
    }, 500);
  };
  const handleOnMouseLeave = () => {
    setFocusIndex(undefined);
  };

  useEffect(() => {
    if (orderRef.current) {
      const { clientWidth, scrollWidth } = orderRef.current;
      const lastScrollIndexLeft = scrollWidth - clientWidth;
      let _articleLefts = [];
      let _articleHeights = [];
      for (let index = 0; index < articles.length; index++) {
        if (index * articleTotalWidth < lastScrollIndexLeft) {
          _articleLefts.push(index * articleTotalWidth);
        }
        const articleLi = orderRef.current.children[index] as HTMLOListElement;
        _articleHeights.push(articleLi.querySelector('article').scrollHeight * articleOpenScale);
      }
      _articleLefts.push(lastScrollIndexLeft);
      setArticleLefts(_articleLefts);
      setArticleHeights(_articleHeights);
    }
  }, [articles.length, window.innerWidth]);

  return (
    <Container focusHeight={articleHeights[focusIndex]}>
      <Title lv={2}>{title}</Title>
      <ArticleOrder
        ref={orderRef}
        focusHeight={articleHeights[focusIndex]}
        onScroll={handleOnScroll}
        onMouseMove={handleOnUserMove}
        onTouchStart={handleOnUserMove}
        onTouchMove={handleOnUserMove}
        onMouseLeave={handleOnMouseLeave}>
        {articles.map((article, index) => (
          <ArticleList key={`${article.ch}.${index}`}>
            <Article
              api={api}
              article={article}
              scrolling={scrolling}
              index={index}
              focusIndex={focusIndex}
              setFocusIndex={setFocusIndex}
            />
          </ArticleList>
        ))}
      </ArticleOrder>
    </Container>
  );
};

export default Component;

type ContainerPropeType = {
  focusHeight?: number;
};

const Container = styled.div<ContainerPropeType>`
  display: flex;
  flex-flow: column wrap;
  margin-top: ${baseMargin}px;
  margin-right: 0;
  margin-bottom: ${(props) => (props.focusHeight === undefined ? '0' : `-${props.focusHeight + baseMargin * 2 - articleOrderHeight}px`)};
  margin-left: ${baseMargin}px;
  z-index: ${(props) => (props.focusHeight === undefined ? 'auto' : 4)};
  overflow-y: visible;
`;

type ArticleOrderPropeType = {
  focusHeight?: number;
};

const ArticleOrder = styled.ol<ArticleOrderPropeType>`
  display: flex;
  flex-flow: row nowrap;
  width: 100vw;
  height: ${(props) => (props.focusHeight === undefined ? `${articleOrderHeight}` : `${props.focusHeight + baseMargin * 2}`)}px;
  scroll-snap-type: x mandatory;
  overflow-x: scroll;
  overflow-y: hidden;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const ArticleList = styled.li`
  padding: ${basePadding}px;
  scroll-snap-align: start;
  list-style: none;
  transform: translate(0px, 0px);
`;
