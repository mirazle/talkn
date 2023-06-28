import React, { useEffect, useState } from 'react';
import type { FunctionComponent } from 'react';
import styled from 'styled-components';

import Flex, { Label, Li, FlexBoxLayoutPropsType, flexLayoutPropsInit, BoxLayoutPropsType, boxLayoutPropsInit } from 'components/flexes';
import { MenusType } from 'components/model/Menu';
import { animations, blocks, colors, layouts, dropFilter, shadow } from 'components/styles';

type Props = {
  menus: MenusType[];
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  onClick: (menu: string) => void;
  fitRight?: boolean;
  label?: React.ReactNode;
  showBackground?: boolean;
} & BoxLayoutPropsType &
  FlexBoxLayoutPropsType;

const modalContainerClassName = 'FloatMenuContainer';

const Component: FunctionComponent<Props> = (props: Props) => {
  const [didMount, setDidMount] = useState(false);
  const p: Props = { ...boxLayoutPropsInit, ...flexLayoutPropsInit, fitRight: false, showBackground: false, ...props };

  useEffect(() => {
    setDidMount(p.show);
  }, [p.show]);

  return (
    <>
      <Background show={p.show} showBackground={p.showBackground} onClick={() => p.setShow(false)} />
      <Flex flow="column nowrap" className={modalContainerClassName}>
        {p.label && <Label onClick={() => p.setShow(true)}>{p.label}</Label>}
        {p.show && (
          <MenuOl show={p.show} fitRight={p.fitRight} didMount={didMount} className="MenuOl">
            {p.menus.map((menu: MenusType) => (
              <Li key={menu.key} alignItems="center" onClick={() => p.onClick(menu.key)} lineHeight="36px" sidePadding pointer hover>
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
  showBackground: boolean;
};

const Background = styled.div<BackgroundTypeProps>`
  position: fixed;
  top: 0;
  left: 0;
  display: ${(props) => (props.show ? 'flex' : 'flex')};
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: ${(props) => (props.showBackground ? colors.fullBackgroundColor : 'none')};
  z-index: ${(props) => (props.show ? 1000 : -1)};
  opacity: ${(props) => (props.show ? 1 : 0)};
  transition: opacity ${animations.transitionDuration}ms;
`;

type MenuOlProps = {
  show: boolean;
  didMount: boolean;
  fitRight: boolean;
};

const MenuOl = styled.ol<MenuOlProps>`
  position: absolute;
  bottom: ${layouts.blockHeight}px;
  ${(props) => (props.show && props.fitRight ? 'left: 0' : 'left: 0')};
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  width: fit-content;
  height: fit-content;
  padding: ${layouts.doublePadding}px ${layouts.basePadding}px;
  margin: 0;
  ${dropFilter.alphaBgSet};
  color: rgba(80, 80, 80, 1);
  font-size: 75%;
  border: 1px solid ${colors.borderColor};
  border-radius: ${blocks.borderRadius}px;
  box-shadow: ${shadow.shadowHorizonBase};
  z-index: ${(props) => (props.show ? 1001 : -1)};
  opacity: ${(props) => (props.show ? 1 : 0)};
  transition: transform ${animations.transitionDuration}ms;
  transform: translateY(${(props) => (props.show && !props.didMount ? 0 : `-${layouts.baseSize * 2}px`)});
`;
