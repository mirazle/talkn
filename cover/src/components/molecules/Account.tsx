import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import conf from 'common/conf';
import commonUtil from 'common/util';

import Flex from 'cover/components/atoms/Flex';
import FloatMenu, { MenusType } from 'cover/components/organisms/FloatMenu';
import { GoogleSessionType } from 'cover/talkn.cover';

const AccountMenusMyMenu = 'myMenu';
const AccountMenusSelectAccount = 'selectAccount';
const AccountMenusLogout = 'logout';
const AccountMenus: MenusType[] = [
  { key: AccountMenusMyMenu, label: 'MY PAGE' },
  { key: AccountMenusSelectAccount, label: 'ACCOUNTS' },
  { key: AccountMenusLogout, label: 'LOGOUT' },
];

type Props = {
  session: GoogleSessionType;
  setSession: React.Dispatch<React.SetStateAction<GoogleSessionType>>;
};

const Component: React.FC<Props> = ({ session, setSession }: Props) => {
  const [showMenu, setShowMenu] = useState(false);
  const handleOnClickLogin = () => {
    document.cookie = "g_state=''";
    const sessionStr = localStorage.getItem('talknCoverSession');
    if (sessionStr === null) {
      window.google.accounts.id.prompt();
    } else {
      setShowMenu(true);
    }
  };

  const handleGoolgeCredentialResponse = async (goolgeCredentialResponse) => {
    localStorage.setItem('talknCoverSession', goolgeCredentialResponse.credential);
    setSession(commonUtil.parseJwt(goolgeCredentialResponse.credential));
    window.location.reload();
  };

  useEffect(() => {
    const sessionStr = localStorage.getItem('talknCoverSession');
    let parsedSession = null;
    if (sessionStr) {
      parsedSession = commonUtil.parseJwt(sessionStr);
      setSession(parsedSession);
    }
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: '429873683760-v2hk18nua5vgf37ae0ovuhfbdrmah42d.apps.googleusercontent.com',
        cancel_on_tap_outside: true,
        callback: handleGoolgeCredentialResponse,
      });

      if (parsedSession === null && sessionStr === null) {
        window.google.accounts.id.prompt((notification) => {
          if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
            // continue with another identity provider.
          }
        });
      }
    }
  }, []);

  return (
    <>
      <Container className="Account" onClick={handleOnClickLogin}>
        {session && session.picture === '' && (
          <Login alignItems="center" justifyContent="center" width="48px" height="48px" border borderRadius="circle">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
              <g>
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                <path
                  fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                <path
                  fill="#FBBC05"
                  d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                <path fill="none" d="M0 0h48v48H0z"></path>
              </g>
            </svg>
          </Login>
        )}

        {session && session.picture !== '' && <MyAccount backgroundImage={session.picture} />}
      </Container>
      <FloatMenu
        show={showMenu}
        setShow={setShowMenu}
        menus={AccountMenus}
        onClick={(menu) => {
          const page = location.pathname.split('/')[2];
          switch (menu) {
            case AccountMenusMyMenu:
              window.location.replace(`//${conf.coverURL}/${session.email}/${page}`);
              break;
            case AccountMenusSelectAccount:
              window.google.accounts.id.prompt();
              break;
            case AccountMenusLogout:
              window.google.accounts.id.disableAutoSelect();
              document.cookie = "g_state=''";
              localStorage.removeItem('talknCoverSession');
              window.location.reload();
              break;
          }
          setShowMenu(false);
        }}
        fitRight
      />
    </>
  );
};

export default Component;

const Container = styled(Flex)`
  width: 38px;
  height: 38px;
  min-width: 38px;
  min-height: 38px;
  cursor: pointer;
`;

const Login = styled(Flex)`
  width: inherit;
  height: inherit;
  min-width: inherit;
  min-height: inherit;
  svg {
    width: 24px;
    height: 24px;
  }
`;

type MyAccountType = {
  backgroundImage: string;
};

const MyAccount = styled.div<MyAccountType>`
  width: 38px;
  height: 38px;
  background-image: url(${(props) => props.backgroundImage});
  background-size: 38px;
  background-repeat: no-repeat;
  border-radius: 50%;
`;
