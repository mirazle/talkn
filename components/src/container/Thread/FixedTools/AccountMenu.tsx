import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import FloatMenu from 'components/atomicDesign/molecules/FloatMenu';
import { accountMenusLogout, accountMenus, accountMenusMyMenu, accountMenusSelectAccount } from 'components/model/Menu';
import User from 'components/model/User';
import { myUserKey, googleAccountCookieKey } from 'components/utils/constants/storage';

type Props = {
  myUser: User;
  setMyUser: React.Dispatch<React.SetStateAction<User>>;
  setIsMyPage: React.Dispatch<React.SetStateAction<boolean>>;
};

const Component: React.FC<Props> = ({ myUser, setMyUser }: Props) => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <FloatMenu
      show={showMenu}
      setShow={setShowMenu}
      menus={accountMenus}
      onClick={(menu) => {
        const page = location.pathname.split('/')[1];
        switch (menu) {
          case accountMenusMyMenu:
            console.log(myUser.id);
            //window.location.replace(`//${conf.coverURL}/${page}/${userId}`);
            break;
          case accountMenusSelectAccount:
            window.google.accounts.id.prompt();
            break;
          case accountMenusLogout:
            window.google.accounts.id.disableAutoSelect();
            document.cookie = googleAccountCookieKey;
            localStorage.removeItem(myUserKey);
            window.location.reload();
            break;
        }
        setShowMenu(false);
      }}
      fitRight
    />
  );
};
export default Component;
