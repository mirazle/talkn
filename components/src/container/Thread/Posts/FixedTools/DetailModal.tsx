import { css } from '@emotion/react';
import React, { useEffect, useState } from 'react';

import { Props as AppProps } from 'components/container/Thread/App';
import Detail from 'components/container/Thread/Detail';
import { useGlobalContext } from 'components/container/Thread/GlobalContext';
import { animations, colors, dropFilter, layouts, zIndex } from 'components/styles';

type Props = {
  handleOnClickToggleTuneModal: () => void;
} & AppProps;

const Component: React.FC<Props> = (props: Props) => {
  const { bools, layout } = useGlobalContext();
  const [isShow, setIsOpen] = useState(false);
  const [isAnimation, setIsAnimations] = useState(false);
  const height = layout.innerHeight - layouts.appHeaderHeight;

  const handleOnTransitionEnd = () => {
    setIsAnimations(false);
  };

  useEffect(() => {
    if (isShow !== bools.openDetail && !isAnimation) {
      setIsOpen(bools.openDetail);
      setIsAnimations(true);
    }
  }, [bools.openDetail]);

  return (
    <section
      className="DetailModal"
      css={styles.container(bools.openDetail, isShow, isAnimation, height)}
      onTransitionEnd={handleOnTransitionEnd}>
      <Detail isModal {...props} handleOnClickToggleTuneModal={props.handleOnClickToggleTuneModal} />
    </section>
  );
};

export default Component;

const styles = {
  container: (isOpen: boolean, isShow: boolean, isAnimation: boolean, height: number) => css`
    box-sizing: content-box;
    z-index: ${zIndex.detailModal};
    position: fixed;
    top: ${layouts.appHeaderHeight}px;
    left: unset;
    display: ${!isOpen && !isShow && !isAnimation ? 'none' : 'flex'};
    flex-flow: column nowrap;
    align-items: flex-start;
    justify-content: flex-start;
    width: 90%;
    min-width: 320px;
    height: ${height}px;
    margin: 0 auto;
    border: 1px solid ${colors.borderColor};
    border-radius: 0;
    ${dropFilter.alphaBgSet};
    transition: ${animations.transitionDuration}ms;
    transform: translate(0px, ${isShow ? 0 : height}px);
  `,
};
