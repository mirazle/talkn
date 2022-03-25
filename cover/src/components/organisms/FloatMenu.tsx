import React, { useRef } from 'react';
import type { FunctionComponent } from 'react';
import styled from 'styled-components';

import Flex, { FlexLayoutPropsType, flexLayoutPropsInit } from 'cover/components/atoms/Flex';
import Label from 'cover/components/atoms/Label';
import Li from 'cover/components/atoms/Li';
import { LayoutPropsType, layoutPropsInit } from 'cover/nodes/Layout';
import styles from 'cover/styles';

export type MenusType = {
  key: string;
  label: string;
};

type Props = {
  menus: MenusType[];
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  onClick: (menu: string) => void;
  fitRight?: boolean;
  label?: React.ReactNode;
} & LayoutPropsType &
  FlexLayoutPropsType;

const modalContainerClassName = 'FloatMenuContainer';

const Component: FunctionComponent<Props> = (props: Props) => {
  const menuRef = useRef(<ol />);
  const p: Props = { ...layoutPropsInit, ...flexLayoutPropsInit, fitRight: false, ...props };

  return (
    <>
      <Background show={p.show} onClick={() => p.setShow(false)} />
      <Flex flow="column nowrap" className={modalContainerClassName}>
        {p.label && <Label onClick={() => p.setShow(true)}>{p.label}</Label>}
        {p.show && (
          <MenuOl ref={menuRef} show={p.show} fitRight={p.fitRight} className="MenuOl">
            {p.menus.map((menu: MenusType) => (
              <Li key={menu.key} onClick={() => p.onClick(menu.key)} lineHeight="36px" sidePadding pointer hover>
                {menu.label}
              </Li>
            ))}
          </MenuOl>
        )}
      </Flex>
    </>
  );
};

export default Component;

type BackgroundTypeProps = {
  show: boolean;
};

const Background = styled.div<BackgroundTypeProps>`
  position: fixed;
  top: 0;
  left: 0;
  display: ${(props) => (props.show ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  z-index: ${(props) => (props.show ? 1000 : -1)};
  opacity: ${(props) => (props.show ? 1 : 0)};
`;

type MenuOlProps = {
  ref: any;
  show: boolean;
  fitRight: boolean;
};

const MenuOl = styled.ol<MenuOlProps>`
  position: absolute;
  ${(props) => (props.show && props.fitRight ? 'right: 0' : '')};
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  width: fit-content;
  height: fit-content;
  padding: ${styles.doublePadding}px ${styles.basePadding}px;
  margin: ${styles.doubleMargin}px;
  ${styles.alphaBgSet};
  border: 1px solid ${styles.borderColor};
  border-radius: ${styles.borderRadius}px;
  box-shadow: ${styles.shadowHorizonBright};
  transition: transform ${styles.transitionDuration}ms;
  z-index: ${(props) => (props.show ? 1001 : -1)};
  opacity: ${(props) => (props.show ? 1 : 0)};
  transform: translateY(${(props) => (props.show ? 0 : `${styles.baseSize * 2}px`)});
  @media (max-width: ${styles.spLayoutStrictWidth}px) {
    width: 100vw;
    height: 100vh;
    border-radius: 0;
  }
`;
