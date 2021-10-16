import React, { useCallback, useEffect, useState, useRef } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import styled from 'styled-components';

import conf from 'common/conf';

import AppStore from 'api/store/App';

import handles from 'client/actions/handles';
import mapToStateToProps from 'client/mapToStateToProps/';

import FlexRow from 'cover/components/atoms/FlexRow';
import Head from 'cover/components/atoms/Head';
import P from 'cover/components/atoms/P';
import Title from 'cover/components/atoms/Title';
import { ArticleType } from 'cover/components/molecules/Article';
import Section from 'cover/components/molecules/Section';
import ArticleOrder from 'cover/components/organisms/ArticleOrder';
import * as styles from 'cover/styles';

type InterviewVerticalDatas = {
  offsetTop: number;
  offsetBottom: number;
};

type StateType = {
  ranks: ArticleType[];
  app: AppStore;
  thread: any;
};

type Props = {
  api: any;
  state: StateType;
};

type NavigationLayout = {
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

const interviewVerticalInitial = { offsetTop: 0, offsetBottom: 0 };
let interviewVerticalDatas: InterviewVerticalDatas[] = [];
const TalknContainer: React.FC<Props> = (props) => {
  const { api, state } = props;
  const [dataMount, setMountData] = useState(false);
  const [interviewPointer, setInterviewPointer] = useState<number | undefined>();
  const [navigationLayout, setNavigationLayout] = useState<NavigationLayout | undefined>();

  const interviewRef = useRef<HTMLElement>();
  const resumeRef = useRef<HTMLElement>();
  const { ranks: articles, thread } = state;
  const { ch, host, favicon, serverMetas } = thread;

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

  const useCallbackScroll = useCallback(() => {
    const _interviewPointer = interviewVerticalDatas.findIndex(
      (obj) => obj.offsetTop <= window.scrollY && window.scrollY < obj.offsetBottom
    );

    setInterviewPointer(_interviewPointer);
  }, [interviewVerticalDatas]);

  useEffect(() => {
    if (articles.length > 0 && !dataMount) {
      setMountData(true);
      for (let index in articles) {
        api('onResponseChAPI', articles[index].ch);
      }
    }
  }, [articles.length]);

  useEffect(() => {
    if (interviewRef.current) {
      Array.from(interviewRef.current.children).forEach((child: HTMLElement, index) => {
        if (!interviewVerticalDatas[index]) {
          interviewVerticalDatas[index] = interviewVerticalInitial;
        }
        const offsetTop = child.offsetTop - styles.appHeaderHeight - styles.baseSize;
        const offsetBottom = offsetTop + child.clientHeight;
        interviewVerticalDatas[index] = { offsetTop, offsetBottom };
        if (index > 0) {
          interviewVerticalDatas[index - 1].offsetBottom = offsetTop - 1;
        }
      });
    }
  }, [interviewRef.current && interviewRef.current.clientHeight]);

  useEffect(() => {
    if (resumeRef.current) {
      if (styles.spLayoutWidth < window.innerWidth) {
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
        setNavigationLayout({
          width,
          marginTop,
          marginRight,
          marginBottom,
          marginLeft,
          paddingTop,
          paddingRight,
          paddingBottom,
          paddingLeft,
        });
      }
    }
  }, [window.innerWidth]);

  useEffect(() => {
    window.addEventListener('scroll', useCallbackScroll);
  }, []);

  return (
    <>
      <Head thread={thread} serverMetas={serverMetas} />
      <FixedBackground host={host} />
      <Container>
        <Header>
          <A href={`https:/${ch}`}>
            <Img src="https://www.sunbridge.com/favicon.ico" alt={ch} width={30} height={30} />
            <Title lv={1}>{ch}</Title>
          </A>
        </Header>

        <BaseBoard>
          <TopSection>
            <TitleBoard>
              <Title lv={2}>
                ユーザーの声で生まれ変わる！
                <br />
                自社プロダクト「SmartVisca」
                <br />
                リニューアル開発の裏側に迫りました。
              </Title>
              <time>On 2021/10/15</time>
            </TitleBoard>
          </TopSection>
          <ArticleOrderBg>
            <ArticleOrder ch={'/music'} title={'製品のご紹介'} articles={articles} />
          </ArticleOrderBg>
        </BaseBoard>
        <WhiteBoard>
          <Main navigationLayout={navigationLayout}>
            <Interview className={'Interview'} ref={interviewRef} navigationLayout={navigationLayout}>
              <Section number={1} title={'プロダクト本部　アーキテクト 澤野 弘幸 (Hiroyuki Sawano)'}>
                <FlexRow>
                  <img src={`//${conf.assetsURL}/top/${ch}/human01.webp`} width={'100%'} />
                  <P>
                    <br />
                    2012年6月にサンブリッジに入社。 Salesforce一体型名刺管理ソリューション「SmartVisca」の Salesforce
                    AppExchangeへの公開に尽力する。以降、自社プロダクト事業の開発にあたり、新規プロダクトのリリース、バージョンアップに務める。
                  </P>
                </FlexRow>
              </Section>
              <Section number={2} title={'まずは澤野さんの現在の業務内容を教えてください。'}>
                <P>
                  サンブリッジのプロダクト本部に所属し、主力の自社プロダクトである「SmartVisca」の開発を担っており、アーキテクト/プログラマーを主な業務としています。
                </P>
              </Section>
              <Section
                number={3}
                title={
                  '澤野さんはプロダクト本部の中でも特に社歴の長いメンバーだと聞いています。サンブリッジに入社するまでの経緯を教えてください。'
                }>
                <P>
                  前職でエンジニアとしてSalesforceに関連する仕事をしていたため、サンブリッジのことは知っていました。セールスフォース・ドットコムの展示会に参加した際、出店していたサンブリッジ社員がお揃いのTシャツを着ていたことから、自由で楽しそうな会社だと感じ、興味を持ちました。その後、サンブリッジに業務委託として関わり始め、正社員として2012年に入社しました。
                  入社前のイメージ通り、良い意味で仕事とプライベートの垣根なく、メンバーの裁量に任せられていることも多いため、働きやすさを感じています。
                </P>
              </Section>
              <Section number={4} title={'10年弱、SmartViscaを見続けてきた澤野さんから、改めて「SmartVisca」の説明をお願いします。'}>
                <P>
                  SmartViscaは、名刺をスキャナーやスマートフォンで読み取るだけで、高速かつ正確にデジタル化するSalesforce一体型名刺管理ソリューションです。
                </P>
                <img src={`//${conf.assetsURL}/top/${ch}/desc01.webp`} width={'75%'} />
                <P>
                  2018年には、最も売れたAppExchangeアプリのランキングで中小企業部門と大企業部門でそれぞれ第2位と第1位を獲得しました。他名刺管理ツールと異なる点は、Salesforce
                  Platform上で構築されていることです。Salesforceを活用する上で、不可欠な顧客データベースを整備するための機能が全て備わっています。そのため、外出先や在宅勤務でも手軽に正確な顧客データを用いて、営業やマーケティングをはじめあらゆる企業活動に活用できます。個人的に、昔からネットワーク上で情報を収集検索できるサービスに関心があったので、ネットワークで人の情報が集積される面白さをSmartViscaに見出しています。
                </P>
              </Section>
              <Section number={5} title={'2021年冬のタイミングで、SmartViscaをバージョンアップするに至った理由を教えてください。'}>
                <P>
                  コロナ禍前には新しいプロダクトの開発を検討しており、既存のSmartViscaのバージョンアップの予定はありませんでした。しかし、コロナ禍で対面での名刺交換をする機会が減ったことから、それに代わるような、オンライン上で名刺交換が完了できるツールの開発を検討し始めました。そこで、既存製品のSmartViscaにその機能を持たせることに決めたのです。
                  <b>私含めチームメンバーはSmartViscaそのものに愛着があるので、嬉しい意思決定でした。</b>
                </P>
              </Section>
              <Section number={6} title={'開発を進める上で、困難なことを教えてください。'}>
                <P>
                  最初のリリースから10年ほど経過して相当の数のお客様にインストールされて使われています。製品仕様にもその時々の要件があって取り入れています。そういった仕様の経緯を新しく参加されたメンバーにも漏れなく継承していくことには腐心しています。幸い、Github、JIRA、CircleCIなど、継続的な開発を支援するツールが利用できるようになって、それらのことも自動化されて容易になってきています。
                </P>
              </Section>
              <Section number={7} title={'開発を進める上で、大切にしていることがあれば教えてください。'}>
                <P>
                  顧客視点に立った開発を大切にしています。プロダクト本部の統括である矢野は特に顧客意識が強く、ユーザーヒアリングの結果をもとにSmartViscaのあり方について、フロントメンバーだけでなく開発メンバーも含め議論する機会が多くあります。
                  私はサンブリッジに入社するまでパッケージ開発の経験がほとんどで、エンドユーザーの声を直接聞く機会があまりありませんでした。だからこそ、ユーザーの声が聞ける今、お客様の要望をどのようにプロダクトにフィードバックしていくかを、一層大切にしながら開発を進めています。
                  今回のバージョンアップの内容も、SmartViscaのユーザーヒアリングをした結果、要件として項目に上がってきたものをベースにしています。
                </P>
                <P>
                  例えば、名刺を取り込んだ後すぐにデジタル化して欲しいという要望がユーザーからありました。これまでは名刺をOCR（※2）で取り込んだ後、役職や部署名に誤りがないか、人が目視で確認してからデジタル化する必要があり、長い時には約1日かかっていました。今回のバージョンアップで精度が高いOCRを入れたことで、人の目視確認が不要となり、OCRにかけた直後にデジタル化することが可能になりました。また、OCRだけの納品をオプションとしたこともユーザーの声がきっかけです。
                  一方でお客様の要望を言葉通りに受け取ったり、拡大解釈したりしないように気をつけています。
                  <b>
                    「お客様は何を本当に求めているのか、それは何故なのか。」言葉を咀嚼し、その裏にある「なぜ」を考えることで、顧客の本質的な課題解決を目指しています。
                  </b>
                </P>
                <Annotation>
                  　　※2.Optical Character Recognition
                  <br />
                  活字、手書きテキストの画像を文字コードの列に変換するソフトウェアのこと
                </Annotation>
              </Section>

              <Section number={8} title={'最後にバージョンアップしたSmartViscaリリースに向けての意気込みをお願いします！'}>
                <P>
                  「名刺管理」ではなく「プロフィール管理」ツールとして活用いただくために、SFA（Sales Force
                  Automation）との連携を強化しています。この機能は多くのお客様に利用いただけると考えられるので、既存のお客様だけでなく、ターゲットユーザーを広げていきたいと思っています。新しい類似製品を提供するベンダーも台頭してきている中で、
                  <b>
                    今回のバージョンアップによってニューノーマル時代に適応したプロダクトとして新規・既存のユーザ様にも共感・評価いただけるものと確信しています。
                  </b>
                </P>
              </Section>
            </Interview>
            <Navigation ref={resumeRef} navigationLayout={navigationLayout}>
              <Title lv={6}>- 目次 -</Title>
              <NavigationOrder interviewPointer={interviewPointer}>
                <li>
                  <a onClick={() => handleOnClickNav(0)}>01.人物紹介</a>
                </li>
                <li>
                  <a onClick={() => handleOnClickNav(1)}>02.業務内容</a>
                </li>
                <li>
                  <a onClick={() => handleOnClickNav(2)}>03.入社の経緯</a>
                </li>
                <li>
                  <a onClick={() => handleOnClickNav(3)}>04.Smart Viscaとは</a>
                </li>
                <li>
                  <a onClick={() => handleOnClickNav(4)}>05.バージョンアップの理由</a>
                </li>
                <li>
                  <a onClick={() => handleOnClickNav(5)}>06.開発で困難なこと</a>
                </li>
                <li>
                  <a onClick={() => handleOnClickNav(6)}>07.開発ポリシー</a>
                </li>
                <li>
                  <a onClick={() => handleOnClickNav(7)}>08.リリースへの意気込み</a>
                </li>
              </NavigationOrder>
            </Navigation>
          </Main>
        </WhiteBoard>

        <Footer>
          <ToTopLayout>
            <ToTop onClick={handleOnClickToTop}>
              <div className={'ToTopArrow'} />
            </ToTop>
          </ToTopLayout>
          <Sns>
            <Twitter className="twitter">
              <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" className="twitter-share-button" data-show-count="false">
                Tweet
              </a>
              <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
            </Twitter>
            <div className="facebook">
              <div className="fb-share-button" data-href={`https://cover.talkn.io${ch}`} data-layout="button_count" data-size="large">
                <a
                  target="_blank"
                  href={`https://www.facebook.com/sharer/sharer.php?u=https://cover.talkn.io${ch};src=sdkpreparse`}
                  className="fb-xfbml-parse-ignore">
                  Share
                </a>
              </div>
            </div>
          </Sns>
          <CopyrightLayout>
            <Copyright>Copyright ©talkn</Copyright>
            <br />
            Update the internet for creators.
          </CopyrightLayout>
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
  font-size: 16px;
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

type FixedBackgroundPropsType = {
  host: string;
};

const FixedBackground = styled.div<FixedBackgroundPropsType>`
  z-index: -1;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: url('//${(props) => props.host}/wp-content/uploads/slide_01.png') 50% 50% / cover no-repeat;
  @media (max-width: ${styles.spLayoutWidth}px) {
    background: url('//${(props) => props.host}/wp-content/uploads/18f7011e3272d51933d82b9c23d61669.png') 50% 50% / cover no-repeat;
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
  border-top: 1px solid #eee;
  border-right: 1px solid #eee;
  border-left: 1px solid #eee;
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
  color: #fff;
`;

const TitleBoard = styled.div`
  padding-top: ${styles.basePadding}px;
  padding-right: ${styles.basePadding}px;
  padding-bottom: ${styles.basePadding}px;
  padding-left: ${styles.doublePadding}px;
  margin-left: ${styles.doubleMargin}px;
  background: rgba(255, 255, 255, 0.9);
  border: 2px solid #e60012;
  @media (max-width: ${styles.spLayoutStrictWidth}px) {
    padding-left: ${styles.basePadding}px;
    h2 {
      letter-spacing: 1px;
    }
  }
  time {
    display: block;
    text-align: right;
    font-style: italic;
    font-size: 12px;
    color: #888;
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
  border-top: 1px solid #eee;
  background: rgba(255, 255, 255, 0.96);
`;

type MainPropsType = {
  navigationLayout: NavigationLayout;
};

const Main = styled.main<MainPropsType>`
  display: flex;
  flex-flow: ${(props) => (props.navigationLayout ? 'row nowrap' : 'column wrap')};
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
  navigationLayout: NavigationLayout;
};

const InterviewPaddingLeft = styles.doublePadding;
const Interview = styled.div<InterviewPropsType>`
  overflow: hidden;
  width: 100%;
  max-width: ${(props) => getInterviewWidth(props, InterviewPaddingLeft)};
  height: auto;
  padding-right: 0;
  padding-left: ${InterviewPaddingLeft}px;
  @media (max-width: ${styles.spLayoutWidth}px) {
    padding-right: ${styles.basePadding}px;
    padding-left: ${styles.basePadding}px;
  }
  @media (max-width: ${styles.spLayoutStrictWidth}px) {
    padding-right: 0;
    padding-left: 0;
  }
`;

type NavigationPropsType = InterviewPropsType;

const Navigation = styled.nav<NavigationPropsType>`
  z-index: 0;
  position: sticky;
  top: ${styles.appHeaderHeight + styles.baseMargin}px;
  width: ${(props) => (props.navigationLayout ? `${props.navigationLayout.width}px` : 'auto')};
  min-width: ${(props) => (props.navigationLayout ? `${props.navigationLayout.width}px` : 'auto')};
  max-width: ${(props) => (props.navigationLayout ? `${props.navigationLayout.width}px` : 'auto')};
  padding-top: ${styles.basePadding}px;
  padding-right: ${styles.basePadding}px;
  padding-bottom: ${styles.doublePadding}px;
  padding-left: ${styles.basePadding}px;
  margin: ${styles.quadMargin}px ${styles.baseMargin}px ${styles.baseMargin}px ${styles.baseMargin}px;
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
    padding: 0;
    text-align: center;
    li {
      justify-content: center;
    }
  }

  @media (max-width: ${styles.spLayoutWidth}px) {
    border-radius: 0;
  }
`;

type NavigationOrderPropsType = {
  interviewPointer: number;
};

const NavigationOrder = styled.nav<NavigationOrderPropsType>`
  li:nth-child(${(props) => props.interviewPointer + 1}) a {
    font-weight: 400;
    letter-spacing: 1.5px;
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

const A = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Annotation = styled.span``;

const CopyrightLayout = styled.div`
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: ${styles.appWidth}px;
  height: 400px;
`;

const Copyright = styled.div``;

const Sns = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  margin: ${styles.doubleMargin}px;
`;

const Twitter = styled.div`
  padding: 5px 10px;
  margin-right: 10px;
  background: #1da1f2;
  border-radius: 5px;
  font-size: 13px;
  color: #fff;
  a {
  }
`;

const TwitterIcon = styled.i`
  display: inline-flex;
  background: url(data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2072%2072%22%3E%3Cpath%20fill%3D%22none%22%20d%3D%22M0%200h72v72H0z%22%2F%3E%3Cpath%20class%3D%22icon%22%20fill%3D%22%23fff%22%20d%3D%22M68.812%2015.14c-2.348%201.04-4.87%201.744-7.52%202.06%202.704-1.62%204.78-4.186%205.757-7.243-2.53%201.5-5.33%202.592-8.314%203.176C56.35%2010.59%2052.948%209%2049.182%209c-7.23%200-13.092%205.86-13.092%2013.093%200%201.026.118%202.02.338%202.98C25.543%2024.527%2015.9%2019.318%209.44%2011.396c-1.125%201.936-1.77%204.184-1.77%206.58%200%204.543%202.312%208.552%205.824%2010.9-2.146-.07-4.165-.658-5.93-1.64-.002.056-.002.11-.002.163%200%206.345%204.513%2011.638%2010.504%2012.84-1.1.298-2.256.457-3.45.457-.845%200-1.666-.078-2.464-.23%201.667%205.2%206.5%208.985%2012.23%209.09-4.482%203.51-10.13%205.605-16.26%205.605-1.055%200-2.096-.06-3.122-.184%205.794%203.717%2012.676%205.882%2020.067%205.882%2024.083%200%2037.25-19.95%2037.25-37.25%200-.565-.013-1.133-.038-1.693%202.558-1.847%204.778-4.15%206.532-6.774z%22%2F%3E%3C%2Fsvg%3E);
  min-width: 14px;
  min-height: 14px;
  width: 14px;
  height: 14px;
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
  div.ToTopArrow {
    position: relative;
    top: -3px;
    border-right: 15px solid transparent;
    border-bottom: 25px solid #fff;
    border-left: 15px solid transparent;
  }
  :hover {
    background: #fff;
    border: 1px solid #000;
    div.ToTopArrow {
      border-bottom: 25px solid #000;
    }
  }
  @media (max-width: ${styles.spLayoutStrictWidth}px) {
    margin-right: 0;
  }
`;

const getInterviewWidth = (props: InterviewPropsType, InterviewPaddingLeft) => {
  if (props.navigationLayout) {
    const calcedWidth = props.navigationLayout.width + props.navigationLayout.paddingRight + props.navigationLayout.paddingLeft;
    return `calc(${styles.appWidth}px - ${calcedWidth}px)`;
  } else {
    return '100%';
  }
};

export default connect(mapToStateToProps, { ...handles })(TalknContainer);
