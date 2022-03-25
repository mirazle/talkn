import * as React from 'react';
import styled from 'styled-components';

import conf from 'common/conf';

import H from 'cover/components/atoms/H';
import styles from 'cover/styles';
import { SelectContentMenuType } from 'cover/talkn.cover';

type Props = {
  ch: string;
  openMenu: boolean;
  storiesIndexPointer: number;
  selectContentMenu: SelectContentMenuType;
  menuOrderRef: React.MutableRefObject<HTMLElement>;
};

const Component: React.FC<Props> = ({ ch, openMenu, storiesIndexPointer, menuOrderRef }) => {
  return (
    <Container className="SideMenuOrder" ref={menuOrderRef} openMenu={openMenu} focusMenuNo={storiesIndexPointer}>
      {window.talknConfig.storiesIndex.length > 0 &&
        window.talknConfig.storiesIndex.map((contents, index) => {
          return (
            <H.Five key={`Index${index}`} id="Index" className={`MenuList MenuList-${contents.no}`}>
              <AnchorRow href={`https://${conf.coverURL}${ch}story/${contents.no}`}>
                <span className="number">#{contents.no}&nbsp;</span>
                <span className="resume">{contents.title}</span>
              </AnchorRow>
            </H.Five>
          );
        })}
    </Container>
  );
};

export default Component;

type ContainerPropsType = {
  ref: any;
  openMenu: boolean;
  focusMenuNo: number;
};

const Container = styled.div<ContainerPropsType>`
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
