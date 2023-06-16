import { css } from '@emotion/react';
import React, { useEffect, useState } from 'react';

import conf from 'common/conf';

import { useGlobalContext, actions, dataset } from 'components/container/Thread/GlobalContext';
import { animations, emotions, shadow, colors, dropFilter, layouts } from 'components/styles';

import Favicon from '../../Favicon';

type Props = {
  api: any;
  icon: string;
  postTextareaRef: any;
};

const regex = /^\s*$/;

const Component: React.FC<Props> = ({ icon, postTextareaRef }: Props) => {
  const { doms, bools, setAction } = useGlobalContext();
  const textareaElm = doms.postTextarea;

  const [isShow, setIsShow] = useState(false);
  const [isAnimation, setIsAnimations] = useState(false);
  const [isHoverButton, setIsHoverButton] = useState(false);

  const executePost = () => {
    if (textareaElm) {
      if (!regex.test(textareaElm.value)) {
        setAction(actions.apiRequestPost);
      }
    }
  };

  const handleOnKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      if (e.nativeEvent.shiftKey) {
        textareaElm.textContent = textareaElm.value + '\n';
      } else {
        executePost();
      }
    }
  };

  const handleOnClickFavicon = () => {
    if (bools.openTuneModal) {
      setAction(actions.reset);
    } else {
      setAction(actions.openTuneModal);
    }
  };
  const handleOnClickPictogram = () => {
    if (bools.openPictograms) {
      setAction(actions.reset);
    } else {
      setAction(actions.openPictogram);
    }
  };

  const handleOnClickButton = () => {
    if (bools.openFooter && textareaElm.value !== '') {
      executePost();
    } else {
      setAction(bools.openFooter ? actions.closeFooterThread : actions.openFooterThread);
    }
  };

  const handleOnTransitionEnd = () => setIsAnimations(false);
  const handleOnMouseDown = () => setIsHoverButton(true);
  const handleOnMouseUp = () => setIsHoverButton(false);

  useEffect(() => {
    if (isShow !== bools.openFooter) {
      setIsShow(bools.openFooter);
      setIsAnimations(true);
    }
  }, [bools.openFooter]);

  return (
    <>
      <footer css={styles.container(bools.openFooter, isShow, isAnimation)} onTransitionEnd={handleOnTransitionEnd}>
        <Favicon icon={icon} onClick={handleOnClickFavicon} />
        <div css={styles.inputWrap}>
          <div css={styles.pictogram} onClick={handleOnClickPictogram}>
            😀
          </div>
          {bools.openPostsTextarea && (
            <textarea
              className="postTextarea"
              ref={postTextareaRef}
              css={styles.textarea('Footer')}
              placeholder="Comment to web"
              onKeyPress={handleOnKeyPress}
              {...{ [`data-${dataset['stamp-id']}`]: 0 }}
            />
          )}
        </div>
      </footer>
      <button
        css={styles.button(isHoverButton)}
        onClick={handleOnClickButton}
        onMouseDown={handleOnMouseDown}
        onMouseUp={handleOnMouseUp}
      />
    </>
  );
};

export default Component;

const partSize = layouts.blockHeight;
const spaceSize = layouts.basePadding;
export const inputCalcWidthPx = `calc(100% - ${partSize * 2 + spaceSize}px)`;
const styles = {
  container: (isOpen: boolean, isShow: boolean, isAnimation: boolean) => css`
    position: fixed;
    bottom: -${partSize}px;
    display: ${!isOpen && !isShow && !isAnimation ? 'none' : 'flex'};
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: ${partSize}px;
    padding: ${layouts.basePadding}px ${layouts.basePadding * 2}px ${layouts.basePadding}px ${layouts.basePadding}px;
    border-top: 1px solid ${colors.borderColor};
    ${dropFilter.alphaBgSet};
    transition: ${animations.transitionDuration}ms;
    transform: translate(0px, ${isOpen && isShow ? -partSize : 0}px);
  `,
  inputWrap: css`
    width: ${inputCalcWidthPx};
    height: 80%;
    transform: translate(0px, 0px);
  `,
  pictogram: css`
    position: absolute;
    top: 5px;
    left: 30px;
    font-size: 24px;
    cursor: pointer;
    user-select: none;
  `,
  textarea: (type: string) => css`
    ${emotions.inputEffect(type)};
    &::placeholder {
      white-space: nowrap;
    }
  `,
  button: (isHoverButton: boolean) => css`
    position: fixed;
    right: ${spaceSize / 2}px;
    bottom: ${spaceSize}px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 64px;
    min-width: 64px;
    max-width: 64px;
    height: 64px;
    min-height: 64px;
    max-height: 64px;
    padding: 0;
    margin: 0;
    border: 1px solid ${colors.borderColor};
    border-radius: 50%;
    background: url('https://${conf.assetsURL}/airplane.svg') 50% / 50px no-repeat rgba(255, 255, 255, 0.96);
    cursor: pointer;
    outline: none;
    transition: ${animations.transitionDuration}ms;
    :active {
    }
    :focus {
    }

    :target {
    }
    :hover {
      ${getButtonHover(isHoverButton)}
    }
    :visited {
    }
    :focus-visible {
    }
  `,
};

const getButtonHover = (isHoverButton: boolean) => {
  if (isHoverButton) {
    return css``;
  } else {
    return css`
      box-shadow: ${shadow.shadowCircleBrighter};
      background-size: 54px;
      transform: scale(1.1);
    `;
  }
};
