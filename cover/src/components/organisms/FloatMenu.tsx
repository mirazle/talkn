import React, { useEffect, useState } from 'react';
import type { FunctionComponent } from 'react';
import styled from 'styled-components';

import Flex, { Label, Li, FlexBoxLayoutPropsType, flexLayoutPropsInit, BoxLayoutPropsType, boxLayoutPropsInit } from 'cover/flexes';
import { MenusType } from 'cover/model/Menu';
import styles from 'cover/styles';

type Props = {
  menus: MenusType[];
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  onClick: (menu: string) => void;
  fitRight?: boolean;
  label?: React.ReactNode;
} & BoxLayoutPropsType &
  FlexBoxLayoutPropsType;

const modalContainerClassName = 'FloatMenuContainer';

const Component: FunctionComponent<Props> = (props: Props) => {
  const [didMount, setDidMount] = useState(false);
  const p: Props = { ...boxLayoutPropsInit, ...flexLayoutPropsInit, fitRight: false, ...props };

  useEffect(() => {
    setDidMount(p.show);
  }, [p.show]);

  return (
    <>
      <Background show={p.show} onClick={() => p.setShow(false)} />
      <Flex flow="column nowrap" className={modalContainerClassName}>
        {p.label && <Label onClick={() => p.setShow(true)}>{p.label}</Label>}
        {p.show && (
          <MenuOl show={p.show} fitRight={p.fitRight} didMount={didMount} className="MenuOl">
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

// TODO: life ganadorでアカウント生成＆タグ生成で動作確認

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
  show: boolean;
  didMount: boolean;
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
  box-shadow: ${styles.shadowHorizonBase};
  transition: transform ${styles.transitionDuration}ms;
  z-index: ${(props) => (props.show ? 1001 : -1)};
  opacity: ${(props) => (props.show ? 1 : 0)};
  transform: translateY(${(props) => (props.show && !props.didMount ? 0 : `${styles.baseSize * 2}px`)});
`;
