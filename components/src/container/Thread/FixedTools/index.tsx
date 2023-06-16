import React, { useEffect, useState } from 'react';

import { Props as AppProps } from 'components/container/Thread/App';
import { useGlobalContext } from 'components/container/Thread/GlobalContext';
import { MenuModeType } from 'components/container/Thread/GlobalContext/hooks/menu/mode';
import User from 'components/model/User';

import AccountMenu from './AccountMenu';
import TuneModal from './TuneModal';

import { menuMode } from '../GlobalContext/hooks';

type Props = {
  ch: string;
  screenRef: any;
  postsRef: any;
  postTextareaRef: any;
  myUser: User;
  showUserMenu: boolean;
  setShowUserMenu: React.Dispatch<React.SetStateAction<boolean>>;
} & AppProps;

const Component: React.FC<Props> = ({
  ch,
  screenRef,
  postsRef,
  postTextareaRef,
  api,
  state,
  root,
  bootOption,
  myUser,
  showUserMenu,
  setShowUserMenu,
}) => {
  const { uiTimeMarker, bools, menuMode, layout } = useGlobalContext();
  return (
    <>
      <AccountMenu myUser={myUser} showUserMenu={showUserMenu} setShowUserMenu={setShowUserMenu} />
      <TuneModal
        ch={ch}
        menuMode={menuMode}
        screenRef={screenRef}
        postsRef={postsRef}
        postTextareaRef={postTextareaRef}
        api={api}
        state={state}
        root={root}
        bootOption={bootOption}
      />
    </>
  );
};

export default Component;
