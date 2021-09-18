import React from 'react';
import styled from 'styled-components';

import Title from 'top/components/atoms/Title';
import ArticleList, { ArticleType } from 'top/components/molecules/ArticleList';

type ArticleOrderType = {
  title: string;
  articles: ArticleType[];
};

// const NoData: React.FC = () => <div>No Data</div>;

const Component: React.FC<ArticleOrderType> = ({ title, articles }) => {
  return (
    <Container>
      <Title lv={2}>{title}</Title>
      <ArticleOrder>
        {articles.map((article, index) => (
          <ArticleList key={index} article={article} />
        ))}
      </ArticleOrder>
    </Container>
  );
};

export default Component;

const Container = styled.div`
  display: flex;
  flex-flow: column wrap;
`;

const ArticleOrder = styled.ol`
  display: flex;
  flex-flow: row nowrap;
  width: 100vw;
  overflow: scroll;
`;
