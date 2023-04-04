import { css } from '@emotion/react';
import React, { useEffect, useState } from 'react';

import Emotions from 'common/emotions';

import TalknComponent from 'client/components/TalknComponent';

import { useGlobalContext, actions, dataset } from 'components/container/Thread/GlobalContext';
import { animations, layouts } from 'components/styles';
import colors from 'components/styles/colors';

import Icon from '../Icon';
import handleOnPayment from '../handleOnPayment';

type ListType = {
  onClick: () => void;
  menu?: string;
  stampId?: number;
};

const List: React.FC<ListType> = ({ onClick, menu, stampId }) => {
  const [isMouseOver, setIsMouseOver] = useState(false);
  const isBack = !menu && !stampId;
  return (
    <li
      key={stampId}
      css={styles.li(isMouseOver)}
      onClick={onClick}
      onMouseOver={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}>
      <div className={`pictogram ${isBack ? 'back' : menu} `}>{Emotions.map[stampId]}</div>
      {menu && <label className="menu">{menu}</label>}
    </li>
  );
};

type Props = {
  api: any;
};

const Component: React.FC<Props> = ({ api }) => {
  const { doms, bools, setAction } = useGlobalContext();
  const [menu, setMenu] = useState('');
  const [isShow, setIsShow] = useState(false);
  const [isAnimation, setIsAnimations] = useState(false);
  const handleOnClickPost = (stampId: number) => {
    const exePost = () => {
      const postTextarea = doms.postTextarea as HTMLTextAreaElement;
      postTextarea.dataset[dataset['stamp-id']] = String(stampId);
      setMenu('');
      setAction(actions.apiRequestPost);
    };

    if (stampId === 100) {
      handleOnPayment(exePost);
    } else {
      exePost();
    }
  };
  const handleOnTransitionEnd = () => setIsAnimations(false);

  useEffect(() => {
    if (isShow !== bools.openPictograms) {
      setIsShow(bools.openPictograms);
      setIsAnimations(true);
    }
  }, [bools.openPictograms]);

  const getLis = (menu = '') => {
    let display = [];
    switch (menu) {
      case '':
        display = Object.keys(Emotions.inputs).map((menu) => {
          return <List key={menu} stampId={Emotions.inputs[menu][0]} menu={menu} onClick={() => setMenu(menu)} />;
        });
        break;
      default:
        display = Emotions.inputs[menu].map((stampId) => {
          return <List key={`${menu}_${stampId}`} stampId={stampId} menu={''} onClick={() => handleOnClickPost(stampId)} />;
        });
        display.unshift(<List key={`${menu}_backCover`} onClick={() => setMenu('')} />);
        break;
    }
    return display;
  };

  const lis = getLis(menu);
  return (
    <ul className="PostsSupporter" css={styles.ul(bools.openPictograms, isShow, isAnimation)} onTransitionEnd={handleOnTransitionEnd}>
      {lis}
    </ul>
  );
};

export default Component;

const styles = {
  ul: (isOpen: boolean, isShow: boolean, isAnimation: boolean) => css`
    position: fixed;
    top: 100%;
    left: 0;
    display: ${!isOpen && !isShow && !isAnimation ? 'none' : 'flex'};
    flex-flow: column wrap;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    height: ${layouts.pictogramHeight}px;
    padding: 0;
    margin: 0;
    background: ${colors.darkColor};
    color: ${colors.whiteColor};
    list-style: none;
    transition: transform ${animations.transitionDuration}ms;
    transform: translate(0px, ${isOpen && isShow ? -layouts.pictogramHeight - layouts.blockHeight : 0}px);
  `,
  li: (isMouseOver: boolean) => css`
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    width: 25%;
    height: 50%;
    transform: scale(${isMouseOver ? 1.1 : 1});
    transition: transform ${animations.transitionDuration}ms;
    .pictogram {
      font-size: 250%;
      cursor: pointer;
    }
    .menu {
      margin: ${layouts.baseMargin}px;
      font-size: 50%;
    }
    .back {
      width: 8px;
      height: 8px;
      min-width: 8px;
      min-height: 8px;
      padding: 0
      margin: 0px 0px 0px -20px;
      border-collapse: collapse;
      border-spacing: 0px;
      border-width: 8px;
      border-style: solid;
      border-color: transparent rgba(200, 200, 200, 0.8) transparent transparent;
      border-image: initial;
      border-radius: 0px;
    }
  `,
};
