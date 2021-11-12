import React, { useCallback, useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';

import conf from 'common/conf';

import AppStore from 'api/store/App';

import handles from 'client/actions/handles';
import mapToStateToProps from 'client/mapToStateToProps/';

import Flex from 'cover/components/atoms/Flex';
import Node, { Props as NodeProps } from 'cover/components/atoms/Node';
import P from 'cover/components/atoms/P';
import Title from 'cover/components/atoms/Title';
import { ArticleType } from 'cover/components/molecules/Article';
import Section from 'cover/components/molecules/Section';
import SnsLinks from 'cover/components/molecules/SnsLinks';
import ArticleOrder from 'cover/components/organisms/ArticleOrder';
import Footer from 'cover/components/organisms/Footer';
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

type InterviewIndexContentsType = {
  no?: number;
  title: string;
  eyeCatch: string;
  interview: string;
};

type InterviewIndexType = {
  version: string;
  contents: InterviewIndexContentsType[];
};

type InterviewSectionType = {
  title: string;
  resume: string;
  flow: string;
  nodes: NodeProps[];
};

type InterviewType = {
  version: string;
  createTime: string;
  css: string;
  head: string;
  sections: InterviewSectionType[] | [];
};

const interviewInit: InterviewType = {
  version: '',
  createTime: '',
  css: '',
  head: '',
  sections: [],
};

const InterviewIndexContentsInit: InterviewIndexContentsType[] = [];
const interviewIndexLimit = 10;
const interviewVerticalInitial = { offsetTop: 0, offsetBottom: 0 };
const getScrollWidth = () => (window.innerWidth > styles.appWidth ? styles.appWidth : window.innerWidth);
let interviewVerticalDatas: InterviewVerticalDatas[] = [];
const TalknContainer: React.FC<Props> = (props) => {
  const { api, state } = props;
  const [dataMount, setMountData] = useState(false);
  const [interview, setInterview] = useState<InterviewType>(interviewInit);
  const [interviewEyeCatchs, setInterviewEyeCatchs] = useState<InterviewIndexContentsType[]>(InterviewIndexContentsInit);
  const [eyeCatchScrollIndex, setEyeCatchScrollIndex] = useState(0);

  const [interviewIndex, setInterviewIndex] = useState<InterviewIndexContentsType[]>(InterviewIndexContentsInit);
  const [interviewIndexPointer, setInterviewIndexPointer] = useState<number | undefined>();
  const [openMenu, setOpenMenu] = useState(false);
  const [interviewPointer, setInterviewPointer] = useState<number | undefined>();
  const [navigationLayout, setNavigationLayout] = useState<NavigationLayout | undefined>();

  const headerSideMenuRef = useRef<HTMLElement>();
  const headEyeCatchOrderRef = useRef<HTMLElement>();
  const menuOrderRef = useRef<HTMLElement>();
  const interviewRef = useRef<HTMLElement>();
  const resumeRef = useRef<HTMLElement>();
  const { app, ranks: articles, thread } = state;
  const { ch, favicon, serverMetas } = thread;

  const handleOnClickNav = (chapterIndex: number) => {
    if (interviewRef.current) {
      const scrollToElm = interviewRef.current.children[chapterIndex] as HTMLElement;
      const scrollToTop = scrollToElm.offsetTop - styles.appHeaderHeight - styles.baseSize;
      window.scrollTo({ top: scrollToTop, behavior: 'smooth' });
    }
  };

  const handleOnClickMenu = () => {
    setOpenMenu(!openMenu);
  };

  const handleOnScrollHeadEyeCatch = (e) => {
    const scrollWidth = getScrollWidth();
    const scrollIndex = e.target.scrollLeft / scrollWidth;
    if (Number.isInteger(scrollIndex)) {
      setEyeCatchScrollIndex(scrollIndex);
    }
  };

  const handleOnClickCircle = (e) => {
    if (headEyeCatchOrderRef.current) {
      headEyeCatchOrderRef.current.scrollTo({
        left: getScrollWidth() * e.target.dataset.index,
        behavior: 'smooth',
      });
    }
  };

  const handleOnClickMenuOut = (e) => {
    if (e.target !== menuOrderRef.current && e.target !== headerSideMenuRef.current) {
      setOpenMenu(false);
    }
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
    if (headEyeCatchOrderRef.current) {
      const scrollIndex = Array.from(headEyeCatchOrderRef.current.children).findIndex((child) => {
        return Number(child.getAttribute('data-no')) === window.talknInterviewPointer;
      });

      if (scrollIndex >= 0) {
        headEyeCatchOrderRef.current.scrollLeft = getScrollWidth() * scrollIndex;
        setEyeCatchScrollIndex(scrollIndex);
      }
    }
  }, [headEyeCatchOrderRef.current, window.talknInterviewPointer]);

  useEffect(() => {
    if (menuOrderRef.current) {
      menuOrderRef.current.scrollTop = -menuOrderRef.current.clientHeight;
    }
  }, [menuOrderRef.current]);

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
    if (resumeRef.current && interview.sections.length > 0) {
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
  }, [window.innerWidth, interview && interview.sections.length]);

  useEffect(() => {
    const _offset = window.talknInterviewPointer - interviewIndexLimit / 2;
    const offset = 0 <= _offset ? _offset : 0;
    const limit = interviewIndexLimit;
    const _interviewIndex = [...window.talknInterviewIndex.contents].reverse();
    let _interviewEyeCatchs = [...window.talknInterviewIndex.contents]
      .map((interviewIndex: InterviewIndexContentsType, index) => {
        interviewIndex.no = index + 1;
        return interviewIndex;
      })
      .splice(offset, limit);
    _interviewEyeCatchs = _interviewEyeCatchs.reverse();
    setInterviewIndex(_interviewIndex);
    setInterviewEyeCatchs(_interviewEyeCatchs);
  }, [window.talknInterviewIndex]);

  useEffect(() => {
    setInterviewIndexPointer(window.talknInterviewPointer);
  }, [window.talknInterviewPointer]);

  useEffect(() => {
    setInterview(window.talknInterview);
  }, [window.talknInterview]);

  useEffect(() => {
    window.addEventListener('scroll', useCallbackScroll);
  }, []);

  return (
    <>
      <style type="text/css">{interview.css}</style>
      <Container onClick={handleOnClickMenuOut}>
        <MenuOrder className="MenuOrder" ref={menuOrderRef} openMenu={openMenu} focusMenuNo={interviewIndexPointer}>
          {interviewIndex.map((contents, index) => (
            <Title key={`Index${index}`} type="Index" className={`MenuList MenuList-${contents.no}`}>
              <AnchorRow href={`https://${conf.coverURL}${ch}${contents.no}`}>
                <span className="number">#{contents.no}&nbsp;</span>
                <span className="resume">{contents.title}</span>
              </AnchorRow>
            </Title>
          ))}
        </MenuOrder>
        <Header>
          <HeaderSide></HeaderSide>
          {app.tuned !== '' && (
            <A href={`https:/${ch}`}>
              {<Img src={favicon} width={30} height={30} />}
              {<Title type={'AppHeader'}>{ch === '/' ? 'talkn' : ch}</Title>}
            </A>
          )}
          <HeaderSideMenu className={openMenu && 'open'} ref={headerSideMenuRef} onClick={handleOnClickMenu}>
            <div className="HeaderMenuLine" />
            <div className="HeaderMenuLine" />
            <div className="HeaderMenuLine" />
          </HeaderSideMenu>
        </Header>
        <HeadEyeCatchOrder ref={headEyeCatchOrderRef} onScroll={handleOnScrollHeadEyeCatch}>
          {interviewIndex.map((index, i) => (
            <HeadEyeCatchList key={`HeadEyeCatchList${i}`} className="HeadEyeCatchList" data-no={index.no} bg={index.eyeCatch}>
              <ViewAnchor href={`https://${conf.coverURL}${ch}${index.no}`}></ViewAnchor>
            </HeadEyeCatchList>
          ))}
        </HeadEyeCatchOrder>

        <HeadEyeCatchSelectOrder interviewIndexCnt={interviewIndex.length} eyeCatchScrollIndex={eyeCatchScrollIndex}>
          {interviewIndex.map((circle, index) => (
            <li key={circle.no} data-index={index} onClick={handleOnClickCircle} />
          ))}
        </HeadEyeCatchSelectOrder>
        <BaseBoard>
          <ArticleOrderBg>
            <ArticleOrder ch={ch} title={'製品のご紹介'} articles={articles} />
          </ArticleOrderBg>
        </BaseBoard>
        <WhiteBoard>
          <Main navigationLayout={navigationLayout}>
            <Interview className={'Interview'} ref={interviewRef}>
              {interview.sections.map(({ title, flow, nodes }, index) => {
                return (
                  <Section key={`Section${index}`} number={index + 1} title={title} flow={flow}>
                    {nodes.map((node: NodeProps, index) => (
                      <Node key={`${node.type}${index}`} type={node.type} props={node.props} nodes={node.nodes} />
                    ))}
                  </Section>
                );
              })}
            </Interview>
            <Navigation ref={resumeRef} navigationLayout={navigationLayout}>
              <Title type={'Resume'}>- 目次 -</Title>
              {interview.sections.length > 0 && (
                <NavigationOrder interviewPointer={interviewPointer}>
                  {interview.sections.map(({ resume }, index) => {
                    const number = index < 9 ? `0${index + 1}` : index + 1;
                    return (
                      <li key={`${resume}${index}`}>
                        <AnchorRow onClick={() => handleOnClickNav(index)}>
                          <span className="number">{number}.</span>
                          <span className="resume">{resume}</span>
                        </AnchorRow>
                      </li>
                    );
                  })}
                </NavigationOrder>
              )}
            </Navigation>
          </Main>

          <DomainProfile>
            <DomainProfileTitle className={'DomainProfileTitle'} type={'Section'} underline>
              Domain Profile
            </DomainProfileTitle>
            <FlexProfile className="FlexProfile">
              <DomainProfileImage src={serverMetas['og:image']} />
              <Description>
                <Title className="DomainProfileDescTitle" type="DomainProfileDescTitle">
                  {serverMetas['title']}
                </Title>
                <P className="description">{serverMetas['description']}</P>
              </Description>
            </FlexProfile>
            <Tags>
              {serverMetas.keywords &&
                serverMetas.keywords.split(',').map((tag: string, index: number) => tag !== '' && <Tag key={`Tag${index}`}>{tag}</Tag>)}
            </Tags>
            <SnsLinksWrap>
              <SnsLinks serverMetas={serverMetas} />
            </SnsLinksWrap>
          </DomainProfile>

          <SnsShare>
            <Twitter className="twitter">
              <a
                href="https://twitter.com/share?ref_src=twsrc%5Etfw&url=https://cover.talkn.io/www.sunbridge.com/"
                className="twitter-share-button"
                data-show-count="false">
                <TwitterIcon />
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
          </SnsShare>
        </WhiteBoard>
        <Footer ch={ch} />
      </Container>
    </>
  );
};

// prettier-ignore
const Container = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  font-size: 16px;

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
    text-decoration: none;
    cursor: pointer;
    user-select: none;
  }
`;

const MenuOrder = styled.div<{ ref: any; openMenu: boolean; focusMenuNo: number }>`
  position: fixed;
  z-index: 99;
  top: ${styles.appHeaderHeight}px;
  right: 0;
  overflow-x: hidden;
  overflow-y: scroll;
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  justify-content: flex-start;
  background: ${styles.componentBgColor};
  color: ${styles.fontColor};
  width: ${styles.menuPcWidth}px;
  height: calc(100% - ${styles.appHeaderHeight}px);
  min-height: calc(100% - ${styles.appHeaderHeight}px);
  max-height: calc(100% - ${styles.appHeaderHeight}px);
  padding: ${styles.basePadding}px;
  box-shadow: ${(props) => (props.openMenu ? styles.baseBoxShadow : 'none')};
  transition: ${styles.transitionDuration};
  transform: translate(${(props) => (props.openMenu ? 0 : `${styles.menuPcWidth}px`)}, 0px);
  a,
  a:visited,
  a:hover,
  a:active {
    color: ${styles.fontColor};
  }
  @media (max-width: ${styles.spLayoutWidth}px) {
    width: ${styles.menuTabWidth}px;
    transform: translate(${(props) => (props.openMenu ? 0 : `${styles.menuTabWidth}px`)}, 0px);
  }
  @media (max-width: ${styles.spLayoutStrictWidth}px) {
    width: 100%;
    transform: translate(${(props) => (props.openMenu ? 0 : '100%')}, 0px);
  }
  .MenuList-${(props) => props.focusMenuNo} {
    font-weight: 300;
    line-height: 40px;
  }
`;

const AnchorRow = styled.a`
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
  justify-content: flex-start;
  line-height: 40px;
  :hover {
    font-weight: 300;
    .resume {
      text-decoration: underline;
    }
  }
  .number {
    width: 35px;
    min-width: 35px;
  }
`;

const Header = styled.header`
  box-sizing: border-box;
  z-index: 100;
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: ${styles.appHeaderHeight}px;
  background: rgba(255, 255, 255, 0.96);
  border-bottom: 1px solid ${styles.borderColor};

  a {
    display: flex;
    flex-flow: row wrap;
    color: ${styles.fontColor};
  }
`;

const HeaderSide = styled.div`
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
`;

const HeaderSideMenu = styled.div<{ ref: any }>`
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  margin-right: 10px;
  transition: ${styles.transitionDuration};
  cursor: pointer;
  .HeaderMenuLine {
    width: 70%;
    height: 1px;
    margin: 5px;
    background: ${styles.fontColor};
    transition: ${styles.transitionDuration};
  }
  &.open {
    .HeaderMenuLine:nth-child(1) {
      transform: rotate(45deg) translate(8px, 8px);
    }
    .HeaderMenuLine:nth-child(2) {
      transform: rotate(45deg) translate(0px, 0px);
    }
    .HeaderMenuLine:nth-child(3) {
      transform: rotate(-45deg) translate(7px, -8px);
    }
  }
`;

const HeadEyeCatchOrder = styled.ol<{ ref: any }>`
  overflow: scroll hidden;
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  max-width: ${styles.appWidth}px;
  height: 100%;
  padding: 0;
  margin: 0 auto;
  scroll-snap-type: x mandatory;
`;

const HeadEyeCatchList = styled.li<{ bg: string }>`
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-end;
  justify-content: flex-end;
  width: 100%;
  min-width: 100%;
  max-width: ${styles.appWidth}px;
  height: 630px;
  overflow: hidden;
  text-align: right;
  scroll-snap-align: start;
  background-size: 100%;
  background-image: url('${(props) => props.bg}');
  background-position: 50%;
  background-repeat: no-repeat;
  list-style: none;
  transition: ${styles.transitionDuration};
  cursor: pointer;
  :hover {
    transform: scale(1.02);
    opacity: 0.8;
  }
  @media (max-width: ${styles.spLayoutWidth}px) {
    height: 400px;
  }
  @media (max-width: ${styles.spLayoutStrictWidth}px) {
    height: 300px;
  }
`;

const ViewAnchor = styled.a`
  width: 100%;
  height: 100%;
`;

type HeadEyeCatchSelectOrderType = {
  interviewIndexCnt: number;
  eyeCatchScrollIndex: number;
};

const HeadEyeCatchSelectOrder = styled.ol<HeadEyeCatchSelectOrderType>`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-around;
  width: calc(${(props) => getHeadEyeCatchSelectOrderWidth(props.interviewIndexCnt)}% - ${styles.doubleMargin}px);
  margin: ${styles.baseMargin}px;
  padding: 0;
  li {
    width: ${styles.baseSize}px;
    height: ${styles.baseSize}px;
    margin: ${styles.baseSize}px;
    background: ${styles.borderColor};
    border-radius: ${styles.baseSize}px;
    list-style: none;
    cursor: pointer;
  }
  li[data-index='${(props) => props.eyeCatchScrollIndex}'] {
    background: ${styles.fontColor};
  }
  @media (max-width: ${styles.spLayoutWidth}px) {
    li {
      margin: ${styles.baseSize / 2}px;
    }
  }
  @media (max-width: ${styles.spLayoutStrictWidth}px) {
    li {
      width: ${styles.baseSize / 2}px;
      height: ${styles.baseSize / 2}px;
      margin: ${styles.baseSize / 3}px;
    }
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
  border-top: 1px solid ${styles.borderColor};
  border-right: 1px solid ${styles.borderColor};
  border-left: 1px solid ${styles.borderColor};
`;

const Img = styled.img`
  margin-right: 15px;
  margin-left: -15px;
  user-select: none;
`;

const WhiteBoard = styled.div`
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: auto;
  border-top: 1px solid ${styles.borderColor};
  background: rgba(255, 255, 255, 0.96);
  @media (max-width: ${styles.spLayoutWidth}px) {
    align-items: normal;
  }
`;

type MainPropsType = {
  navigationLayout: NavigationLayout;
};

const Main = styled.main<MainPropsType>`
  display: flex;
  flex-flow: ${(props) => (props.navigationLayout ? 'row nowrap' : 'column nowrap')};
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  max-width: ${styles.appWidth}px;
  height: auto;
  @media (max-width: ${styles.spLayoutWidth}px) {
    flex-flow: column-reverse;
  }
`;

const layoutPaddingLeft = styles.doublePadding;
const Interview = styled.div<{ ref: any }>`
  flex: 1 1 auto;
  overflow: hidden;
  height: auto;
  padding-right: 0;
  padding-left: ${layoutPaddingLeft}px;
  @media (max-width: ${styles.spLayoutWidth}px) {
    padding-right: ${styles.basePadding}px;
    padding-left: ${styles.basePadding}px;
  }
  @media (max-width: ${styles.spLayoutStrictWidth}px) {
    padding-right: 0;
    padding-left: 0;
  }
`;

const Navigation = styled.nav<{ navigationLayout: NavigationLayout }>`
  flex: 1 1 auto;
  z-index: 0;
  position: sticky;
  top: ${styles.appHeaderHeight + styles.baseMargin}px;
  width: 100%;
  min-width: 320px;
  max-width: 320px;
  padding-top: ${styles.basePadding}px;
  padding-right: ${styles.basePadding}px;
  padding-bottom: ${styles.doublePadding}px;
  padding-left: ${styles.basePadding}px;
  margin: ${styles.quadMargin}px ${styles.baseMargin}px ${styles.baseMargin}px ${styles.baseMargin}px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid ${styles.borderColor};
  border-radius: 15px;
  ol,
  li {
    list-style: none;
  }
  li {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 20px;
    font-weight: 200;
    line-height: 24px;
  }
  a {
    display: flex;
    flex-flow: row nowrap;
    align-items: flex-start;
    justify-content: flex-start;
    line-height: 40px;
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
`;

type NavigationOrderPropsType = {
  interviewPointer: number;
};

const NavigationOrder = styled.ol<NavigationOrderPropsType>`
  padding: 0;
  margin: 0 auto;
  li:nth-child(${(props) => props.interviewPointer + 1}) a {
    font-weight: 400;
    letter-spacing: 1.5px;
  }
`;

const A = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DomainProfile = styled.div`
  overflow: hidden;
  width: 100%;
  max-width: ${styles.appWidth}px;
  height: auto;
  padding: ${styles.doublePadding}px;
  margin-top: ${styles.quadMargin}px;
  margin-left: ${styles.doubleMargin}px;
  margin-right: ${styles.baseMargin}px;
  margin-bottom: ${styles.quadMargin}px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid ${styles.borderColor};
  border-radius: ${styles.doubleSize}px;
  .DomainProfileDescTitle {
    padding-bottom: ${styles.doublePadding}px;
  }
  @media (max-width: ${styles.spLayoutWidth}px) {
    padding: ${styles.sectionPadding}px ${styles.sectionPadding / 2}px;
    margin-top: 0;
    margin-left: 0;
    margin-right: 0;
    border-radius: 0;
  }
`;

const FlexProfile = styled(Flex)`
  padding-top: ${styles.doublePadding}px;
  @media (max-width: ${styles.spLayoutStrictWidth}px) {
    flex-flow: column nowrap;
  }
`;

const DomainProfileTitle = styled(Title)`
  padding-bottom: ${styles.basePadding}px;
  line-height: 60px;
  border-bottom: 1px solid ${styles.borderColor};
  font-weight: 400;
`;

const DomainProfileImage = styled.img`
  width: ${styles.imageWidth}px;
  min-width: ${styles.imageWidth}px;
  height: min-content;
  @media (max-width: ${styles.spLayoutStrictWidth}px) {
    width: 100%;
    height: auto;
  }
`;

const Description = styled.div`
  width: calc(100% - ${styles.imageWidth}px);
  padding-left: ${styles.basePadding}px;
  p.description {
    padding-top: ${styles.doublePadding}px;
  }
  @media (max-width: ${styles.spLayoutStrictWidth}px) {
    padding-top: ${styles.doublePadding}px;
    width: 100%;
  }
`;

const Tags = styled.section`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: flex-start;
`;

const Tag = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: ${styles.basePadding}px ${styles.doublePadding}px;
  margin: ${styles.baseMargin}px;
  border-radius: ${styles.doubleSize}px;
  background: ${styles.tagBgColor};
  color: #fff;
  white-space: nowrap;
`;

const SnsLinksWrap = styled.section`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: flex-start;
  max-width: 375px;
  padding: ${styles.basePadding}px ${styles.doublePadding}px;
  @media (max-width: ${styles.spLayoutStrictWidth}px) {
    width: 100%;
  }
`;

const SnsShare = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: ${styles.doubleMargin}px ${styles.doubleMargin}px ${styles.sepMargin}px;
`;

const Twitter = styled.div`
  padding: 5px 10px;
  margin-right: 10px;
  background: #1da1f2;
  border-radius: 5px;
  font-size: 13px;
  color: #fff;
  i {
    margin-top: 2px;
    margin-right: 5px;
  }
  a {
    display: flex;
    color: #fff;
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

const getHeadEyeCatchSelectOrderWidth = (interviewIndexCnt): number => {
  if (interviewIndexCnt < 10) return Number(`${interviewIndexCnt}0`);
  return 100;
};

/*
const getLayoutWidth = (props: LayoutPropsType) => {
  if (props.navigationLayout) {
    const calcedWidth = props.navigationLayout.width + props.navigationLayout.paddingRight + props.navigationLayout.paddingLeft;
    return `calc(${styles.appWidth}px - ${calcedWidth}px)`;
  } else {
    return '100%';
  }
};
*/

export default connect(mapToStateToProps, { ...handles })(TalknContainer);
