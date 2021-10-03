import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import conf from 'common/conf';

import AppStore from 'api/store/App';

import handles from 'client/actions/handles';
import mapToStateToProps from 'client/mapToStateToProps/';

import P from 'top/components/atoms/P';
import Title from 'top/components/atoms/Title';
import { ArticleType } from 'top/components/molecules/Article';
import ArticleOrder from 'top/components/organisms/ArticleOrder';
import * as styles from 'top/styles';

type StateType = {
  ranks: ArticleType[];
  app: AppStore;
};

type Props = {
  api: any;
  state: StateType;
};

type ResumeLayout = {
  width: number;
  marginTop: number;
  marginRight: number;
  marginBottom: number;
  marginLeft: number;
  paddingTop: number;
  paddingRight: number;
  paddingBottom: number;
  paddingLeft: number;
};

const TalknContainer: React.FC<Props> = (props) => {
  const { api, state } = props;
  const [dataMount, setMountData] = useState(false);
  const [resumeLayout, setResumeLayout] = useState<ResumeLayout | undefined>();

  const interviewRef = useRef<HTMLElement>();
  const resumeRef = useRef<HTMLElement>();
  const { ranks: articles } = state;

  const handleOnClickNav = (chapterIndex: number) => {
    if (interviewRef.current) {
      const scrollToElm = interviewRef.current.children[chapterIndex] as HTMLElement;
      const scrollToTop = scrollToElm.offsetTop - styles.appHeaderHeight - styles.baseSize;
      window.scrollTo({ top: scrollToTop, behavior: 'smooth' });
    }
  };

  const handleOnClickToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (articles.length > 0 && !dataMount) {
      setMountData(true);
      for (let index in articles) {
        api('onResponseChAPI', articles[index].ch);
      }
    }
  }, [articles.length]);

  useEffect(() => {
    if (resumeRef.current) {
      const resumeElm = resumeRef.current;
      const resumeStyle = getComputedStyle(resumeElm);
      const width = styles.getTrimUnitNumber(resumeStyle.width);
      const marginTop = styles.getTrimUnitNumber(resumeStyle.marginTop);
      const marginRight = styles.getTrimUnitNumber(resumeStyle.marginRight);
      const marginBottom = styles.getTrimUnitNumber(resumeStyle.marginBottom);
      const marginLeft = styles.getTrimUnitNumber(resumeStyle.marginLeft);
      const paddingTop = styles.getTrimUnitNumber(resumeStyle.paddingTop);
      const paddingRight = styles.getTrimUnitNumber(resumeStyle.paddingRight);
      const paddingBottom = styles.getTrimUnitNumber(resumeStyle.paddingBottom);
      const paddingLeft = styles.getTrimUnitNumber(resumeStyle.paddingLeft);
      setResumeLayout({ width, marginTop, marginRight, marginBottom, marginLeft, paddingTop, paddingRight, paddingBottom, paddingLeft });
    }
  }, []);

  return (
    <>
      <FixedBackground />
      <Container>
        <Header>
          <a href="https://www.tradeworks.co.jp/">
            <Img src="https://www.tradeworks.co.jp/favicon.ico" alt="www.tradeworks.co.jp" width={30} />
            <Title lv={1}>www.tradeworks.co.jp</Title>
          </a>
        </Header>

        <BaseBoard>
          <TopSection>
            <Title lv={2} shadow>
              ものつくりを通して
              <br />
              人にも環境にもやさしい
              <br />
              社会づくりに貢献しますー。
            </Title>
            <Company>By 株式会社トレードワークス</Company>
            <CreatorName>○○ ○○氏</CreatorName>
          </TopSection>
          <ArticleOrderBg>
            <ArticleOrder ch={'/music'} title={'製品のご紹介'} articles={articles} />
          </ArticleOrderBg>
        </BaseBoard>
        <WhiteBoard>
          <Main resumeLayout={resumeLayout}>
            <Interview ref={interviewRef} resumeLayout={resumeLayout}>
              <Section>
                <Title lv={5}>1.サービスの概要</Title>
                <P>
                  トレードワークスは、主にセールスプロモーション市場に向けた
                  様々なオリジナル雑貨製品を企画・製造・販売している総合メーカーです。
                </P>
                <P>
                  自社内に企画・設計、仕入、品質管理、物流管理を行う部門を有しているだけでなく、
                  グループのデザイン会社や海外の生産管理拠点と連携を取ることで、
                  高品質でオリジナル性の高い製品を最適なコストパフォーマンスで提供しております。
                </P>
                <P>
                  近年においては、このような事業背景を水平展開することで、 セールスプロモーション業界のみならず販売用のオリジナルグッズや
                  資材・備品関連商品といった分野への商品供給を行っており、 「総合雑貨メーカー」としてのポジションを確立しております。
                </P>
              </Section>
              <Section>
                <Title lv={5}>2.市場規模や課題</Title>
                <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />{' '}
                <br />
                <br /> <br /> <br /> <br /> <br /> <br />
              </Section>
              <Section>
                <Title lv={5}>3.課題解決方法</Title>
                <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />{' '}
                <br />
                <br /> <br /> <br /> <br /> <br /> <br />
              </Section>
              <Section>
                <Title lv={5}>4.こだわった点</Title>
                <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />{' '}
                <br />
                <br /> <br /> <br /> <br /> <br /> <br />
              </Section>
              <Section>
                <Title lv={5}>5.未来へのビジョン</Title>
                <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />{' '}
                <br />
                <br /> <br /> <br /> <br /> <br /> <br />
              </Section>
            </Interview>
            <Resume ref={resumeRef} resumeLayout={resumeLayout}>
              <Title lv={6}>- 目次 -</Title>
              <ol>
                <li>
                  <a onClick={() => handleOnClickNav(0)}>1.サービスの概要</a>
                </li>
                <li>
                  <a onClick={() => handleOnClickNav(1)}>2.市場規模や課題</a>
                </li>
                <li>
                  <a onClick={() => handleOnClickNav(2)}>3.解決したい課題</a>
                </li>
                <li>
                  <a onClick={() => handleOnClickNav(3)}>4.こだわった点</a>
                </li>
                <li>
                  <a onClick={() => handleOnClickNav(4)}>5.未来へのビジョン</a>
                </li>
              </ol>
            </Resume>
          </Main>
        </WhiteBoard>

        <Footer>
          <ToTopLayout>
            <ToTop onClick={handleOnClickToTop}>TOP</ToTop>
          </ToTopLayout>
          <Sns>
            <Twitter className="twitter">
              <a
                href="https://twitter.com/intent/tweet?screen_name=TwitterDev&ref_src=twsrc%5Etfw"
                className="twitter-mention-button"
                data-show-count="false">
                <TwitterIcon />
                Tweet
              </a>
              <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
            </Twitter>
            <div className="facebook">
              <div className="fb-share-button" data-href="https://www.talkn.io" data-layout="button_count" data-size="large">
                <a
                  target="_blank"
                  href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.talkn.io%2F&amp;src=sdkpreparse"
                  className="fb-xfbml-parse-ignore">
                  Share
                </a>
              </div>
            </div>
          </Sns>
          <CopyrightLayout>
            <Copyright>talkn.io</Copyright>
          </CopyrightLayout>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </Footer>
      </Container>
    </>
  );
};

// prettier-ignore
const Container = styled.div`
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
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
  a,
  a:visited,
  a:hover,
  a:active {
    color: inherit;
    text-decoration: none;
    cursor: pointer;
    user-select: none;
  }
`;

const FixedBackground = styled.div`
  z-index: -1;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: url('//${conf.assetsURL}/top/sample.jpg') 50% 0% / cover no-repeat;
  @media (max-width: ${styles.spLayoutWidth}px) {
    background: url('//${conf.assetsURL}/top/sample.jpg') 65% 0% / cover no-repeat;
  }
`;

const Header = styled.header`
  box-sizing: border-box;
  z-index: 20;
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: ${styles.appHeaderHeight}px;
  background: rgba(255, 255, 255, 0.96);
  border-bottom: 1px solid #eee;
  a {
    display: flex;
    flex-flow: row wrap;
  }
`;

const BaseBoard = styled.div`
  display: flex;
  flex-flow: column wrap;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  max-width: ${styles.appWidth}px;
  margin: 0 auto;
`;

const ArticleOrderBg = styled.div`
  z-index: 10;
  width: 100%;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 15px 15px 0 0;
`;

const TopSection = styled.section`
  display: flex;
  flex-flow: column wrap;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  max-width: ${styles.appWidth}px;
  height: 600px;
  min-height: 400px;
  padding-left: 150px;
  color: #fff;
  h2 {
    margin-bottom: 150px;
  }
  @media (max-width: ${styles.spLayoutWidth}px) {
    padding-left: 5%;
    h2 {
      margin-top: 220px;
      margin-bottom: 130px;
    }
  }
  @media (max-width: ${styles.spLayoutStrictWidth}px) {
    h2 {
      margin-top: 180px;
      margin-bottom: 70px;
    }
  }
`;

const Company = styled.div`
  font-size: 18px;
  line-height: 30px;
  user-select: none;
  text-shadow: ${styles.baseTextShadow};
  @media (max-width: ${styles.spLayoutStrictWidth}px) {
    font-size: 16px;
    line-height: 26px;
  }
`;

const CreatorName = styled.div`
  font-size: 18px;
  text-indent: 32px;
  line-height: 30px;
  user-select: none;
  text-shadow: ${styles.baseTextShadow};
  @media (max-width: ${styles.spLayoutStrictWidth}px) {
    font-size: 16px;
    line-height: 26px;
  }
`;

const Img = styled.img`
  margin-right: 15px;
  margin-left: -15px;
  user-select: none;
`;

const WhiteBoard = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  height: auto;
  background: rgba(255, 255, 255, 0.96);
`;

type MainPropsType = {
  resumeLayout: ResumeLayout;
};

const Main = styled.main<MainPropsType>`
  display: flex;
  flex-flow: ${(props) => (props.resumeLayout ? 'row nowrap' : 'column wrap')};
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  max-width: ${styles.appWidth}px;
  height: auto;
  @media (max-width: ${styles.spLayoutWidth}px) {
    flex-flow: column-reverse;
  }
`;

type InterviewPropsType = {
  ref: any;
  resumeLayout: ResumeLayout;
};

const InterviewPaddingLeft = styles.doublePadding;
const Interview = styled.div<InterviewPropsType>`
  overflow: hidden;
  width: 100%;
  max-width: ${(props) => getInterviewWidth(props, InterviewPaddingLeft)};
  height: auto;
  padding-left: ${InterviewPaddingLeft}px;
`;

const Section = styled.section``;

type ResumePropsType = InterviewPropsType;

const Resume = styled.nav<ResumePropsType>`
  z-index: 0;
  position: sticky;
  top: ${styles.appHeaderHeight + styles.baseMargin}px;
  width: ${(props) => (props.resumeLayout ? `${props.resumeLayout.width}px` : 'auto')};
  min-width: ${(props) => (props.resumeLayout ? `${props.resumeLayout.width}px` : 'auto')};
  max-width: ${(props) => (props.resumeLayout ? `${props.resumeLayout.width}px` : 'auto')};
  padding-top: ${styles.basePadding}px;
  padding-right: ${styles.basePadding}px;
  padding-bottom: ${styles.doublePadding}px;
  padding-left: ${styles.basePadding}px;
  margin: ${styles.baseMargin}px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid #eee;
  border-radius: 15px;
  ol,
  li {
    list-style: none;
  }
  li {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 45px;
    font-size: 20px;
    font-weight: 200;
    line-height: 24px;
    text-indent: ${styles.baseSize}px;
  }
  @media (max-width: ${styles.spLayoutWidth}px) {
    z-index: auto;
    position: relative;
    top: 0;
    width: calc(100% - ${styles.doubleMargin}px);
    min-width: calc(100% - ${styles.doubleMargin}px);
    background: none;
    padding: 0;
    text-align: center;
    li {
      justify-content: center;
    }
  }
`;

const Footer = styled.footer`
  box-sizing: border-box;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: ${styles.quadSize}px;
  background: #000;
  color: #fff;
`;

const ToTopLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  max-width: ${styles.appWidth}px;
  @media (max-width: ${styles.spLayoutStrictWidth}px) {
    justify-content: center;
  }
`;

const CopyrightLayout = styled.div`
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: ${styles.appWidth}px;
  height: 400px;
`;

const ToTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${styles.quadSize}px;
  height: ${styles.quadSize}px;
  padding: ${styles.baseSize * 3}px;
  margin-right: ${styles.doubleSize * 3}px;
  background: transparent;
  color: #fff;
  border: 1px solid #fff;
  border-radius: ${styles.baseSize}px;
  transition: ${styles.transitionDuration};
  :hover {
    background: #fff;
    color: #000;
  }
  @media (max-width: ${styles.spLayoutStrictWidth}px) {
    margin-right: 0;
  }
`;

const Copyright = styled.div``;

const Sns = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
`;

const Twitter = styled.div`
  padding: 5px 10px;
  margin-right: 10px;
  background: #1da1f2;
  border-radius: 5px;
  font-size: 13px;
  color: #fff;
`;

const TwitterIcon = styled.i`
  display: inline-flex;
  background: url(data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2072%2072%22%3E%3Cpath%20fill%3D%22none%22%20d%3D%22M0%200h72v72H0z%22%2F%3E%3Cpath%20class%3D%22icon%22%20fill%3D%22%23fff%22%20d%3D%22M68.812%2015.14c-2.348%201.04-4.87%201.744-7.52%202.06%202.704-1.62%204.78-4.186%205.757-7.243-2.53%201.5-5.33%202.592-8.314%203.176C56.35%2010.59%2052.948%209%2049.182%209c-7.23%200-13.092%205.86-13.092%2013.093%200%201.026.118%202.02.338%202.98C25.543%2024.527%2015.9%2019.318%209.44%2011.396c-1.125%201.936-1.77%204.184-1.77%206.58%200%204.543%202.312%208.552%205.824%2010.9-2.146-.07-4.165-.658-5.93-1.64-.002.056-.002.11-.002.163%200%206.345%204.513%2011.638%2010.504%2012.84-1.1.298-2.256.457-3.45.457-.845%200-1.666-.078-2.464-.23%201.667%205.2%206.5%208.985%2012.23%209.09-4.482%203.51-10.13%205.605-16.26%205.605-1.055%200-2.096-.06-3.122-.184%205.794%203.717%2012.676%205.882%2020.067%205.882%2024.083%200%2037.25-19.95%2037.25-37.25%200-.565-.013-1.133-.038-1.693%202.558-1.847%204.778-4.15%206.532-6.774z%22%2F%3E%3C%2Fsvg%3E);
  min-width: 14px;
  min-height: 14px;
  width: 14px;
  height: 14px;
`;

const getInterviewWidth = (props: InterviewPropsType, InterviewPaddingLeft) => {
  if (props.resumeLayout) {
    const calcedWidth = props.resumeLayout.width + props.resumeLayout.paddingRight + props.resumeLayout.paddingLeft;
    return `calc(${styles.appWidth}px - ${calcedWidth}px)`;
  } else {
    return '100%';
  }
};

export default connect(mapToStateToProps, { ...handles })(TalknContainer);
