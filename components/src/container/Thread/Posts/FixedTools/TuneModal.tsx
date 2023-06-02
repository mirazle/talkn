import { css } from '@emotion/react';
import React, { useEffect, useState } from 'react';

import BootOption from 'common/BootOption';
import conf from 'common/conf';

import Thread from 'api/store/Thread';

import SymbolCh from 'components/atomicDesign/atoms/SymbolCh';
import { Props as AppProps } from 'components/container/Thread/App';
import { useGlobalContext, actions } from 'components/container/Thread/GlobalContext';
import { MenuModeType } from 'components/container/Thread/GlobalContext/hooks/menu/mode';
import Flex from 'components/flexes';
import { animations, emotions, colors, dropFilter, layouts } from 'components/styles';
import shadow from 'components/styles/shadow';

import close from '../../../../../public/close.svg';
import Label from '../../Menu/Label';

export const Input: React.FC<AppProps> = ({ root }) => {
  const { doms, bootOption, setAction, setIsTune, setBootOption } = useGlobalContext();
  const [inputCh, setInputCh] = useState(bootOption.ch);
  const [inputFindType, setInputFindType] = useState(String(Thread.findTypeAll));

  const handleOnSubmit = () => {
    const ch = BootOption.getCh(inputCh);
    if (bootOption.isFullscreen) {
      window.location.href = `https://${conf.domain}${ch}`;
    } else {
      const className = root.className;

      const inputElm = doms.tuneInput as HTMLInputElement;
      inputElm.value = ch;
      root.dataset.ch = ch;
      setIsTune(false);
      setAction(actions.apiRequestChangeTuning, { className, ch, findType: inputFindType });
      setBootOption({ ...bootOption, ch });
    }
  };
  const handleOnChangeFindType = ({ target: { value } }: React.ChangeEvent<HTMLSelectElement>) => setInputFindType(value);
  const handleOnChangeCh = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => setInputCh(value);
  const handleOnKeyPressCh = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') handleOnSubmit();
  };

  useEffect(() => {
    setInputCh(bootOption.ch);
  }, [bootOption.ch]);

  return (
    <span css={styles.inputWrap}>
      <Flex alt={'Input Favorite Url'}>
        <SymbolCh />
      </Flex>

      <input
        className="tuneInput"
        css={styles.input('TuneModel')}
        value={inputCh}
        placeholder="Input Favorite Url"
        onChange={handleOnChangeCh}
        onKeyPress={handleOnKeyPressCh}
      />
      <select css={styles.findType} value={inputFindType} onChange={handleOnChangeFindType}>
        <option value={Thread.findTypeAll}>ALL</option>
        <option value={Thread.findTypeHtml}>HTML</option>
        <option value={Thread.findTypeMusic}>MUSIC</option>
        <option value={Thread.findTypeVideo}>MOVIE</option>
        <option value={Thread.findTypeOther}>OTHER</option>
      </select>
    </span>
  );
};

type Props = AppProps & {
  ch: string;
  menuMode: MenuModeType;
  screenRef: any;
  postsRef: any;
  postTextareaRef: any;
};

const Component: React.FC<Props> = ({ state, api, ch, root, menuMode, postTextareaRef, screenRef, postsRef }: Props) => {
  const { thread, ranks } = state;
  const { bools, bootOption, doms, setAction, setIsTune, setBootOption } = useGlobalContext();
  const screenElm = doms.screen;
  const screenHeight = screenElm ? screenElm.clientHeight : 0;

  const [tuneLabel, setTuneLabel] = useState<'TUNE' | number>('TUNE');
  const [inputCh, setInputCh] = useState(ch);
  const [inputFindType, setInputFindType] = useState(String(Thread.findTypeAll));
  const [isShow, setIsOpen] = useState(false);
  const [isAnimation, setIsAnimations] = useState(false);

  const handleOnTransitionEnd = () => setIsAnimations(false);
  const handleOnChangeFindType = ({ target: { value } }: React.ChangeEvent<HTMLSelectElement>) => setInputFindType(value);
  const handleOnChangeCh = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => setInputCh(value);
  const handleOnKeyPressCh = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') handleOnSubmit();
  };
  const handleOnSubmit = () => {
    const className = root.className;
    const ch = BootOption.getCh(inputCh);

    const inputElm = doms.tuneInput as HTMLInputElement;

    inputElm.value = ch;
    root.dataset.ch = ch;
    postTextareaRef.current = null;
    screenRef.current = null;
    postsRef.current = null;

    setIsTune(false);
    setAction(actions.apiRequestChangeTuning, { className, ch, findType: inputFindType });
    setBootOption({ ...bootOption, ch });
    //setAction(actions.reset);

    // window.postMessage({ ...bootOption, action: 'load' });
  };

  useEffect(() => {
    setInputCh(ch);
  }, [ch]);

  useEffect(() => {
    if (isShow !== bools.openTuneModal) {
      setIsOpen(bools.openTuneModal);
      setIsAnimations(true);
    }
  }, [bools.openTuneModal]);

  useEffect(() => {
    const index = ranks.findIndex((rank) => rank.ch === thread.ch, []);
    setTuneLabel(index !== -1 ? index + 1 : 'TUNE');
  }, [thread.ch, ranks]);

  return (
    <section css={styles.section(bools.openTuneModal, isShow, isAnimation, screenHeight)} onTransitionEnd={handleOnTransitionEnd}>
      <header css={styles.header}>
        <Label menuMode={menuMode} label={String(tuneLabel)} radius />
        <div className="closeWrap">
          <img src={close} alt="close" width="32px" onClick={() => setAction(actions.closeTuneModal)} />
        </div>
      </header>
      <Flex width="100%" flow="row nowrap" alignItems="center" upperMargin bottomMargin>
        <Input root={root} state={state} bootOption={bootOption} api={api} />
      </Flex>
      <Flex width="100%" flow="row nowrap" justifyContent="flex-end">
        <button type="submit" css={styles.button} onClick={handleOnSubmit}>
          TUNE
        </button>
      </Flex>
    </section>
  );
};

export default Component;

const height = 140;
const styles = {
  section: (isOpen: boolean, isShow: boolean, isAnimation: boolean, screenHeight: number) => css`
    position: fixed;
    top: 100%;
    left: unset;
    display: ${!isOpen && !isShow && !isAnimation ? 'none' : 'flex'};
    flex-flow: column nowrap;
    align-items: flex-start;
    justify-content: center;
    width: calc(100% - 48px);
    min-width: 300px;
    max-width: 480px;
    height: auto;
    padding: ${layouts.doublePadding}px;
    margin: 0 auto;
    border: 1px solid ${colors.borderColor};
    border-radius: ${layouts.borderRadius}px;
    ${dropFilter.alphaBgSet};
    transition: ${animations.transitionDuration}ms;
    transform: translate(0px, ${isOpen && isShow ? -(screenHeight / 2 + height / 2) : 0}px);
  `,
  header: css`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    .closeWrap {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: ${layouts.basePadding / 2}px;
      border-radius: 50%;
      background: ${colors.whiteColor};
      cursor: pointer;
      transition: box-shadow ${animations.transitionDuration}ms;
      :hover {
        box-shadow: ${shadow.shadowCircleBrighter};
      }
    }
  `,
  inputWrap: css`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    width: 100%;
    transform: translate(0px, 0px);
  `,
  findType: css`
    position: absolute;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 38px;
    border: 0;
    border-radius: 0 5px 5px 0;
    text-indent: 10px;
    color: rgba(255, 255, 255, 1);
    background: ${colors.notifTipColor};
    transition: background ${animations.transitionDuration}ms;
    outline: none;
    cursor: pointer;
    -webkit-appearance: none;
    appearance: none;
    &::-ms-expand {
      display: none;
    }
    :hover {
      background: ${colors.baseColor};
    }
    :focus {
      background: ${colors.baseColor};
    }
  `,
  input: (type: string) => css`
    ${emotions.inputEffect(type)};
    padding-right: 88px;
  `,
  button: css`
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    padding: 10px ${layouts.quadPadding}px;
    background: ${colors.themeColor};
    outline: none;
    border: 0;
    border-radius: ${layouts.borderRadius * 2}px;
    color: ${colors.whiteColor};
    letter-spacing: 2px;
    cursor: pointer;
    transition: ${animations.transitionDuration}ms;
    :hover {
      background: ${colors.themeColor};
      box-shadow: 0 3px 3px 0px ${colors.brightColor};
    }
    :focus-within {
      background: ${colors.themeDarkColor};
      box-shadow: 0 6px 6px 0px ${colors.brightColor};
    }
  `,
};
