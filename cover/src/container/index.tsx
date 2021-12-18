import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import styled from 'styled-components';

import { CreatorsIndexType } from 'common/Config';
import conf from 'common/conf';

import Flex from 'cover/components/atoms/Flex';
import Node, { Props as NodeProps } from 'cover/components/atoms/Node';
import P from 'cover/components/atoms/P';
import Spinner from 'cover/components/atoms/Spinner';
import Title from 'cover/components/atoms/Title';
import Section from 'cover/components/molecules/Section';
import SnsLinks from 'cover/components/molecules/SnsLinks';
import Footer from 'cover/components/organisms/Footer';
import * as styles from 'cover/styles';
import {
  SelectContentMenuType,
  selectContentMenuLivePages,
  selectContentMenuCreators,
  selectContentMenuAnalytics,
  selectContentMenuDefault,
} from 'cover/talkn.cover';

type CreatorsVerticalDatas = {
  offsetTop: number;
  offsetBottom: number;
};

type Props = unknown;

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

type CreatorsIndexContentsType = {
  no?: number;
  title: string;
  eyeCatch: string;
  creators: string;
};

type CreatorsSectionType = {
  title: string;
  resume: string;
  flow: string;
  nodes: NodeProps[];
};

type CreatorsType = {
  version: string;
  createTime: string;
  css: string;
  head: string;
  sections: CreatorsSectionType[] | [];
};

const creatorsInit: CreatorsType = {
  version: '',
  createTime: '',
  css: '',
  head: '',
  sections: [],
};

const CreatorsIndexContentsInit: CreatorsIndexType[] = [];
const creatorsIndexLimit = 10;
const creatorsVerticalInitial = { offsetTop: 0, offsetBottom: 0 };
const getScrollWidth = () => (window.innerWidth > styles.appWidth ? styles.appWidth : window.innerWidth);
let creatorsVerticalDatas: CreatorsVerticalDatas[] = [];
const TalknContainer: React.FC<Props> = (props) => {
  const [dataMount, setMountData] = React.useState(false);
  const [config, setConfig] = useState<any>({});
  const [thread, setThread] = useState<any>({});
  const [serverMetas, setServerMetas] = useState<any>({});
  const [creators, setCreators] = useState<CreatorsType>(creatorsInit);

  const [creatorsEyeCatchs, setCreatorsEyeCatchs] = useState<CreatorsIndexType[]>(CreatorsIndexContentsInit);
  const [eyeCatchScrollIndex, setEyeCatchScrollIndex] = useState(0);

  const [creatorsIndex, setCreatorsIndex] = useState<CreatorsIndexType[]>(CreatorsIndexContentsInit);
  const [creatorsIndexPointer, setCreatorsIndexPointer] = useState<number | undefined>();
  const [openMenu, setOpenMenu] = useState(false);
  const [eyeCatchHeight, setEyeCatchHeight] = useState(0);
  const [eyeCatchWidth, setEyeCatchWidth] = useState(0);
  const [selectContentMenu, setSelectContentMenu] = useState<SelectContentMenuType>();
  const [creatorsPointer, setCreatorsPointer] = useState<number | undefined>();
  const [navigationLayout, setNavigationLayout] = useState<NavigationLayout | undefined>();

  const headerSideMenuRef = useRef<HTMLElement>();
  const creatorEyeCatchOrderRef = useRef<HTMLElement>();
  const menuOrderRef = useRef<HTMLElement>();
  const creatorsRef = useRef<HTMLElement>();
  const resumeRef = useRef<HTMLElement>();
  const contentMenuRef = useRef<HTMLElement>();
  const talknFrameRef = useRef<HTMLElement>();
  const ogpImageRef = useRef<HTMLElement>();

  const handleOnClickNav = (chapterIndex: number) => {
    if (creatorsRef.current) {
      const scrollToElm = creatorsRef.current.children[chapterIndex] as HTMLElement;
      const scrollToTop = scrollToElm.offsetTop - styles.appHeaderHeight * 2 - styles.baseSize;
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
    if (creatorEyeCatchOrderRef.current) {
      creatorEyeCatchOrderRef.current.scrollTo({
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
    const _creatorsPointer = creatorsVerticalDatas.findIndex((obj) => obj.offsetTop <= window.scrollY && window.scrollY < obj.offsetBottom);
    setCreatorsPointer(_creatorsPointer);
  }, [creatorsVerticalDatas]);

  useEffect(() => {
    if (creatorEyeCatchOrderRef.current) {
      const scrollIndex = Array.from(creatorEyeCatchOrderRef.current.children).findIndex((child) => {
        const childElement = child as HTMLElement;
        return Number(childElement.getAttribute('data-no')) === window.talknCreatorsPointer;
      });

      if (scrollIndex >= 0) {
        console.log(scrollIndex);
        console.log(window.talknCreatorsPointer);
        console.log(getScrollWidth() * scrollIndex);
        creatorEyeCatchOrderRef.current.scrollLeft = getScrollWidth() * scrollIndex;
        setEyeCatchScrollIndex(scrollIndex);
      }
    }
  }, [creatorEyeCatchOrderRef.current, window.talknCreatorsPointer]);

  useEffect(() => {
    if (menuOrderRef.current) {
      menuOrderRef.current.scrollTop = -menuOrderRef.current.clientHeight;
    }
  }, [menuOrderRef.current]);

  useEffect(() => {
    if (creatorsRef.current) {
      Array.from(creatorsRef.current.children).forEach((child: HTMLElement, index) => {
        if (!creatorsVerticalDatas[index]) {
          creatorsVerticalDatas[index] = creatorsVerticalInitial;
        }
        const offsetTop = child.offsetTop - styles.appHeaderHeight - styles.baseSize;
        const offsetBottom = offsetTop + child.clientHeight;
        creatorsVerticalDatas[index] = { offsetTop, offsetBottom };
        if (index > 0) {
          creatorsVerticalDatas[index - 1].offsetBottom = offsetTop - 1;
        }
      });
    }
  }, [creatorsRef.current && creatorsRef.current.clientHeight]);

  useEffect(() => {
    if (resumeRef.current && window.talknCreators && window.talknCreators.sections.length > 0) {
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
  }, [window.innerWidth, creators && creators.sections.length]);

  useEffect(() => {
    const _offset = window.talknCreatorsPointer - creatorsIndexLimit / 2;
    const offset = 0 <= _offset ? _offset : 0;
    const limit = creatorsIndexLimit;
    const _creatorsIndex = [...window.talknConfig.creatorsIndex].reverse();
    let _creatorsEyeCatchs = [...window.talknConfig.creatorsIndex]
      .map((creatorsIndex, index) => {
        creatorsIndex.no = index + 1;
        return creatorsIndex;
      })
      .splice(offset, limit);
    _creatorsEyeCatchs = _creatorsEyeCatchs.reverse();

    setCreatorsIndex(_creatorsIndex);
    setCreatorsEyeCatchs(_creatorsEyeCatchs);
  }, [window.talknConfig.creatorsIndex]);

  useEffect(() => {
    if (ogpImageRef.current) {
      const image = new Image();
      image.src = serverMetas['og:image'];
      setEyeCatchWidth(image.width);
      setEyeCatchHeight(image.height);
    }
  }, [ogpImageRef.current]);

  useEffect(() => {
    setMountData(true);
    setConfig(window.talknConfig);
    setThread(window.talknThread);
    setServerMetas(window.talknServerMetas);
    setCreators(window.talknCreators);
    setCreatorsIndexPointer(window.talknCreatorsPointer);
    setSelectContentMenu(window.talknSelectContentMenu);

    window.addEventListener('scroll', useCallbackScroll);
  }, []);

  const getContentNode = () => {
    switch (selectContentMenu) {
      case selectContentMenuLivePages:
        return (
          <TalknFrameWrap>
            {window.talknConfig.userCategoryChs.map((categoryCh: any, index) => {
              return (
                <TalknFrame key={`${categoryCh}:${index}`} ref={talknFrameRef} className="talknFrame" data-ch={categoryCh}>
                  <Spinner size="50" />
                </TalknFrame>
              );
            })}
          </TalknFrameWrap>
        );
      case selectContentMenuCreators:
        if (window.talknCreators && window.talknCreators.sections.length > 0) {
          return (
            <CreatorsWrap navigationLayout={navigationLayout}>
              <Creators className={'Creators'} ref={creatorsRef}>
                {window.talknCreators.sections.map(({ title, flow, nodes }, i) => {
                  return (
                    <Section key={`Section${i}`} number={i + 1} title={title} flow={flow}>
                      {nodes.map((node: NodeProps, j) => (
                        <Node key={`${node.type}-${i}-${j}`} type={node.type} props={node.props} nodes={node.nodes} />
                      ))}
                    </Section>
                  );
                })}
              </Creators>
              <Navigation ref={resumeRef} navigationLayout={navigationLayout}>
                <Title type={'Resume'}>- 目次 -</Title>
                {window.talknCreators && window.talknCreators.sections.length > 0 && (
                  <NavigationOrder creatorsPointer={creatorsPointer}>
                    {window.talknCreators.sections.map(({ resume }, index) => {
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
            </CreatorsWrap>
          );
        } else {
          return (
            <CommingSoon>
              <P>{`Update your site that`}</P>
              <P>{`/${thread.ch}talkn.config.json`}</P>
            </CommingSoon>
          );
        }
      case selectContentMenuAnalytics:
        return (
          <CommingSoon>
            <P>..Comming soon</P>
          </CommingSoon>
        );
    }
  };

  return (
    <Container onClick={handleOnClickMenuOut}>
      {/* サイドメニュー */}
      <SideMenuOrder className="SideMenuOrder" ref={menuOrderRef} openMenu={openMenu} focusMenuNo={creatorsIndexPointer}>
        {window.talknConfig.creatorsIndex.length > 0 &&
          window.talknConfig.creatorsIndex.map((contents, index) => {
            return (
              <Title key={`Index${index}`} type="Index" className={`MenuList MenuList-${contents.no}`}>
                <AnchorRow href={`https://${conf.coverURL}${thread.ch}creators/${contents.no}`}>
                  <span className="number">#{contents.no}&nbsp;</span>
                  <span className="resume">{contents.title}</span>
                </AnchorRow>
              </Title>
            );
          })}
      </SideMenuOrder>

      {/* ヘッダー */}
      <Header>
        <HeaderSide></HeaderSide>
        <A href={`https:/${thread.ch}`}>
          {<Img src={thread.favicon} width={30} height={30} />}
          {<Title type={'AppHeader'}>{thread.ch === '/' ? 'talkn' : thread.ch}</Title>}
        </A>
        <HeaderInSideMenu className={openMenu && 'open'} ref={headerSideMenuRef} onClick={handleOnClickMenu}>
          <div className="HeaderMenuLine" />
          <div className="HeaderMenuLine" />
          <div className="HeaderMenuLine" />
        </HeaderInSideMenu>
      </Header>

      {/* ドメインのog:imageをアイキャッチとして表示 */}
      <EyeCatchBackGround ogpImageHeight={eyeCatchHeight}>
        <ViewAnchor href={`/${thread.ch}`}>
          <OgpImage ref={ogpImageRef} src={serverMetas['og:image']} maxWidth={eyeCatchWidth} maxHeight={eyeCatchHeight} />
        </ViewAnchor>
      </EyeCatchBackGround>

      {/* クリエイターのインタビューのアイキャッチをslideで表示 */}
      {creatorsEyeCatchs && creatorsEyeCatchs.length > 0 && (
        <CreatorsEyeCatchOrder
          ref={creatorEyeCatchOrderRef}
          onScroll={handleOnScrollHeadEyeCatch}
          creatorsIndexCnt={window.talknConfig.creatorsIndex.length}>
          {creatorsEyeCatchs.map((index, i) => (
            <HeadEyeCatchList
              key={`HeadEyeCatchList${i}`}
              className="HeadEyeCatchList"
              data-no={index.no}
              ch={thread.ch}
              eyeCatch={index.eyeCatch}
              creatorsIndexCnt={window.talknConfig.creatorsIndex.length}>
              <ViewAnchor href={`https://${conf.coverURL}${thread.ch}creators/${index.no}`} />
            </HeadEyeCatchList>
          ))}
        </CreatorsEyeCatchOrder>
      )}

      {/* クリエイターのインタビューの選択(●)アイコンを表示 */}
      {window.talknConfig && window.talknConfig.creatorsIndex.length > 0 && (
        <HeadEyeCatchSelectOrder creatorsIndexCnt={window.talknConfig.creatorsIndex.length} eyeCatchScrollIndex={eyeCatchScrollIndex}>
          {window.talknConfig &&
            window.talknConfig.creatorsIndex.map((circle, index) => (
              <li key={`${circle.no}-${index}`} data-index={index} onClick={handleOnClickCircle} />
            ))}
        </HeadEyeCatchSelectOrder>
      )}

      {/* メインコンテンツ */}
      <MainContents>
        {/* コンテンツメニュー */}
        <ContentsMenuOrderWrap ref={contentMenuRef}>
          <ContentMenuOrder>
            <ContentMenuList className={selectContentMenu === selectContentMenuLivePages && 'active'}>
              <a href={`//${conf.coverURL}${thread.ch}`}>
                <div>LIVE PAGES</div>
                <div className="underBar" />
              </a>
            </ContentMenuList>
            <ContentMenuList className={selectContentMenu === selectContentMenuCreators && 'active'}>
              <a href={`//${conf.coverURL}${thread.ch}creators`}>
                <div>CREATORS</div>
                <div className="underBar" />
              </a>
            </ContentMenuList>
            <ContentMenuList className={selectContentMenu === selectContentMenuAnalytics && 'active'}>
              <a href={`//${conf.coverURL}${thread.ch}analytics`}>
                <div>ANALYTICS</div>
                <div className="underBar" />
              </a>
            </ContentMenuList>
          </ContentMenuOrder>
        </ContentsMenuOrderWrap>
        {useMemo(getContentNode, [selectContentMenu, navigationLayout])}
      </MainContents>

      <WhiteBoard>
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
              <TagsSection>
                <P>I'am Tags</P>
                <Tags>
                  {serverMetas.keywords &&
                    serverMetas.keywords.split(',').map((tag: string, index: number) => tag !== '' && <Tag key={`Tag${index}`}>{tag}</Tag>)}
                </Tags>
                <P>Relation Tags</P>
                <Tags>
                  {window.talknConfig.relationTags.map((tag: string, index: number) => tag !== '' && <Tag key={`Tag${index}`}>{tag}</Tag>)}
                </Tags>
              </TagsSection>
              <SnsLinksWrap>
                <SnsLinks serverMetas={serverMetas} />
              </SnsLinksWrap>
            </Description>
          </FlexProfile>
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
            <div className="fb-share-button" data-href={`https://cover.talkn.io${thread.ch}`} data-layout="button_count" data-size="large">
              <a
                target="_blank"
                href={`https://www.facebook.com/sharer/sharer.php?u=https://cover.talkn.io${thread.ch};src=sdkpreparse`}
                className="fb-xfbml-parse-ignore">
                Share
              </a>
            </div>
          </div>
        </SnsShare>
      </WhiteBoard>
      <Footer ch={thread.ch} />
    </Container>
  );
};

export default TalknContainer;

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

const EyeCatchBackGround = styled.div<{ ogpImageHeight: number }>`
  overflow: hidden;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: ${styles.appWidth}px;
  height: auto;
  min-height: 400px;
`;

const BackLeftImage = styled.img<{ ogpImageHeight: number }>`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${(props) => props.ogpImageHeight}px;
  background-color: #fff;
  filter: blur(10px);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transform: scale(1.2);
`;

const BackRightImage = styled.img<{ ogpImageHeight: number }>`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${(props) => props.ogpImageHeight}px;
  background-color: #fff;
  filter: blur(10px);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transform: scale(1.2);
`;

const OgpImage = styled.img<{ ref: any; maxWidth: number; maxHeight: number }>`
  width: 100%;
  max-width: ${(props) => (props.maxWidth > 0 ? `${props.maxWidth}px` : 'fit-content')};
  height: auto;
  max-height: ${(props) => (props.maxHeight > 0 ? `${props.maxHeight}px` : 'fit-content')};
  transition: ${styles.transitionDuration}ms;
  opacity: 1;
  cursor: pointer;
  :hover {
    opacity: 0.9;
    transform: scale(1.05);
  }
`;

const SideMenuOrder = styled.div<{ ref: any; openMenu: boolean; focusMenuNo: number }>`
  position: fixed;
  z-index: ${styles.zIndex.sideMenu};
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
  border-left: 1px solid ${styles.borderColor};
  transition: ${styles.transitionDuration}ms;
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
  z-index: ${styles.zIndex.header};
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

const HeaderInSideMenu = styled.div<{ ref: any }>`
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  margin-right: 10px;
  transition: ${styles.transitionDuration}ms;
  cursor: pointer;
  .HeaderMenuLine {
    width: 70%;
    height: 1px;
    margin: 5px;
    background: #bbb;
    transition: ${styles.transitionDuration}ms;
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

const CreatorsEyeCatchOrder = styled.ol<{ ref: any; creatorsIndexCnt: number }>`
  overflow: scroll hidden;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: ${(props) => (props.creatorsIndexCnt <= 3 ? 'center' : 'flex-start')};
  width: 100%;
  max-width: ${styles.appWidth}px;
  height: 100%;
  padding: 0 0 ${styles.quadPadding}px 0;
  margin: 0 auto;
  scroll-snap-type: x mandatory;
  @media (max-width: ${styles.spLayoutWidth}px) {
    justify-content: flex-start;
  }
  @media (max-width: ${styles.spLayoutStrictWidth}px) {
    justify-content: flex-start;
  }
`;

const HeadEyeCatchList = styled.li<{ ch: string; eyeCatch: string; creatorsIndexCnt: number }>`
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-end;
  justify-content: flex-end;
  width: 33.33%;
  min-width: 33.33%;
  height: 180px;
  padding: 10px;
  overflow: hidden;
  text-align: right;
  scroll-snap-align: start;
  list-style: none;
  a {
    display: block;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-image: url('${(props) => `https://${conf.coverURL}/${props.ch}${props.eyeCatch}`}');
    background-position: 50%;
    background-repeat: no-repeat;
    border: 1px solid ${styles.borderColor};
    border-radius: ${styles.baseSize}px;
    transition: ${styles.transitionDuration}ms;
    cursor: pointer;
    :hover {
      transform: scale(1.02);
      opacity: 0.8;
    }
  }

  @media (max-width: ${styles.spLayoutWidth}px) {
    width: 50%;
    min-width: 50%;
  }
  @media (max-width: ${styles.spLayoutStrictWidth}px) {
    width: 100%;
    min-width: 100%;
  }
`;

const ViewAnchor = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;
  height: 100%;
`;

type HeadEyeCatchSelectOrderType = {
  creatorsIndexCnt: number;
  eyeCatchScrollIndex: number;
};

const HeadEyeCatchSelectOrder = styled.ol<HeadEyeCatchSelectOrderType>`
  display: none;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-around;
  width: calc(${(props) => getHeadEyeCatchSelectOrderWidth(props.creatorsIndexCnt)}% - ${styles.doubleMargin}px);
  margin: ${styles.baseMargin}px;
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
    display: flex;
    li {
      width: 10px;
      min-width: 10px;
      height: 10px;
      min-height: 10px;
      margin: 10px;
    }
  }
`;

const MainContents = styled.main`
  width: 100%;
`;

const TagsSection = styled.section`
  margin-bottom: ${styles.baseMargin}px;
  p {
    margin: ${styles.baseMargin}px 0;
  }
`;

const ContentsMenuOrderWrap = styled.div<{ ref: any }>`
  position: sticky;
  top: ${styles.baseHeight}px;
  z-index: ${styles.zIndex.contentsMenu};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: ${styles.baseHeight}px;
  margin-bottom: ${styles.baseMargin}px;
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 0 0 1px #eee;
`;

const ContentMenuOrder = styled.ul`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: inherit;
  max-width: ${styles.appWidth}px;
  padding: 0;
  margin: 0;
  color: ${styles.fontColor};
  font-size: 19px;
  font-weight: 200;
  letter-spacing: 5px;
  list-style: none;
`;

const ContentMenuList = styled.li`
  display: flex;
  flex-flow: column nowrap;
  flex: 1 1 auto;
  align-items: center;
  justify-content: center;
  height: inherit;
  border-right: 1px solid #eee;
  border-left: 1px solid #eee;
  cursor: pointer;
  &:first-child {
    border-right: 0;
    border-left: 1px solid #eee;
  }
  &:last-child {
    border-right: 1px solid #eee;
    border-left: 0;
  }
  .underBar {
    width: 20%;
    min-width: 60px;
    height: 8px;
    margin-top: 8px;
    background: rgba(0, 0, 0, 0.25);
    border-radius: 15px;
    transition: ${styles.transitionDuration * 2}ms;
  }

  :hover {
    .underBar {
      background: rgba(0, 0, 0, 0.45);
    }
  }
  &.active {
    .underBar {
      background: ${styles.themeColor};
      color: #fff;
    }
  }
  a {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: #666;
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

type CreatorsPropsType = {
  navigationLayout: NavigationLayout;
};

const TalknFrameWrap = styled.div``;

const CreatorsWrap = styled.div<CreatorsPropsType>`
  display: flex;
  flex-flow: ${(props) => (props.navigationLayout ? 'row nowrap' : 'column nowrap')};
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  max-width: ${styles.appWidth}px;
  height: auto;
  margin: 0 auto;
  @media (max-width: ${styles.spLayoutWidth}px) {
    flex-flow: column-reverse;
  }
`;

const TalknFrame = styled.div<{ 'data-ch': string; 'ref': any }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 340px;
`;

const CommingSoon = styled.div`
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: center;
  height: 340px;
`;

const layoutPaddingLeft = styles.doublePadding;
const Creators = styled.div<{ ref: any }>`
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
  top: ${styles.appHeaderHeight * 2 + styles.baseMargin}px;
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
  creatorsPointer: number;
};

const NavigationOrder = styled.ol<NavigationOrderPropsType>`
  padding: 0;
  margin: 0 auto;
  li:nth-child(${(props) => props.creatorsPointer + 1}) a {
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
  margin-right: ${styles.doubleMargin}px;
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
  padding: 12px 20px;
  margin: 10px;
  border-radius: ${styles.doubleSize}px;
  background: ${styles.fontColor};
  color: #fff;
  white-space: nowrap;
  transition: ${styles.transitionDuration}ms;
  cursor: pointer;
  :hover {
    background: ${styles.themeColor};
  }
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

const getHeadEyeCatchSelectOrderWidth = (creatorsIndexCnt): number => {
  if (creatorsIndexCnt < 10) return Number(`${creatorsIndexCnt}0`);
  return 100;
};

const getHeadEyeCatchSelectListWidth = (creatorsIndexCnt): number => {
  return 33.33;
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

const getCreatorsEyeCatchOrderJustifyContent = () => {};
