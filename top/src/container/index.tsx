import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import handles from 'client/actions/handles';
import TalknComponent from 'client/components/TalknComponent';
import mapToStateToProps from 'client/mapToStateToProps/';

import Title from 'top/components/atoms/Title';
import ArticleOrder from 'top/components/organisms/ArticleOrder';
import { appHeaderHeight, baseShadow } from 'top/styles';

type ContainerProps = {
  state: any;
};

type ContainerState = {};
class TalknContainer extends TalknComponent<ContainerProps, ContainerState> {
  constructor(props: ContainerProps) {
    super(props);
  }

  render() {
    const { ranks: articles } = this.props.state;
    return (
      <Container>
        <Header>
          <Title lv={1}>talkn</Title>
        </Header>
        <Main>
          <ArticleOrder title={'全体'} api={this.api} articles={articles} />
          <ArticleOrder title={'/news.yahoo.co.jp/'} api={this.api} articles={articles} />
          <ArticleOrder title={'/mangekyo.sakura.ne.jp/'} api={this.api} articles={articles} />
        </Main>
        <Footer>talkn.io</Footer>
      </Container>
    );
  }
}

const Container = styled.div`
  display: flex;
  flex-flow: column wrap;
  align-item: flex-start;
  justify-content: flex-start;
  width: 100vw;

  ol {
    padding: 0;
    margin: 0;
  }

  * {
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Hiragino Sans', 'Noto Sans CJK JP', 'Original Yu Gothic',
      'Yu Gothic', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Sans Emoji';
    letter-spacing: 2px;
  }
`;

const Header = styled.header`
  z-index: 10;
  position: fixed;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: ${appHeaderHeight}px;
  background: #fff;
  box-shadow: 0px 0px ${baseShadow}px 0px #ccc;
`;

const Main = styled.main`
  display: flex;
  flex-flow: column wrap;
  align-items: flex-start;
  justify-content: flex-start;
  margin-top: ${appHeaderHeight}px;
`;

const Footer = styled.footer`
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: center;
  height: 600px;
  background: #222;
  color: #fff;
`;

export default connect(mapToStateToProps, { ...handles })(TalknContainer);
