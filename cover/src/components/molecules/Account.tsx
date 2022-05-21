import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import conf from 'common/conf';
import commonUtil from 'common/util';

import env from 'cover/../env.json';
import api from 'cover/api';
import Svg from 'cover/components/atoms/svg';
import FloatMenu from 'cover/components/organisms/FloatMenu';
import Flex from 'cover/flexes';
import { GoogleSessionType } from 'cover/model/Google';
import { AccountMenusLogout, AccountMenus, AccountMenusMyMenu, AccountMenusSelectAccount } from 'cover/model/Menu';
import { sessionKey, googleAccountCookieKey, idSeparator } from 'cover/utils/constants/storage';

type Props = {
  session: GoogleSessionType;
  setSession: React.Dispatch<React.SetStateAction<GoogleSessionType>>;
};

const getSessionValues = () => {
  let sessionStr = null;
  let _userId = null;
  const talknCoverSessionValues = localStorage.getItem(sessionKey);
  if (talknCoverSessionValues) {
    [sessionStr, _userId] = talknCoverSessionValues.split(idSeparator);
  }
  return { sessionStr, _userId };
};

const Component: React.FC<Props> = ({ session, setSession }: Props) => {
  const [showMenu, setShowMenu] = useState(false);
  const [userId, setUserId] = useState('');
  const handleOnClickLogin = () => {
    document.cookie = googleAccountCookieKey;
    const { sessionStr, _userId } = getSessionValues();
    if (sessionStr === null) {
      window.google.accounts.id.prompt();
    } else {
      setShowMenu(true);
    }
    if (_userId) {
      setUserId(_userId);
    }
  };

  const handleGoolgeCredentialResponse = async (goolgeCredentialResponse) => {
    const session = commonUtil.parseJwt(goolgeCredentialResponse.credential);
    setSession(session);
    const request = commonUtil.deepCopy(session);
    delete request.iss;
    delete request.nbf;
    delete request.aud;
    delete request.sub;
    delete request.azp;
    delete request.picture; // 値に:が含まれてJSON.parseが失敗する
    delete request.iat;
    delete request.exp;
    delete request.jti;
    delete request.given_name;
    delete request.family_name;
    if (request.email_verified) {
      delete request.email_verified;
      const user = await api.json('login', request);
      localStorage.setItem(sessionKey, `${goolgeCredentialResponse.credential}@${user._id}`);
    }
    window.location.reload();
  };

  useEffect(() => {
    const { sessionStr, _userId } = getSessionValues();
    let parsedSession = null;
    if (sessionStr) {
      parsedSession = commonUtil.parseJwt(sessionStr);
      setSession(parsedSession);
    }
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: env.clientId,
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
    if (_userId) {
      setUserId(_userId);
    }
  }, []);

  return (
    <>
      <Container className="Account" onClick={handleOnClickLogin} alt={{ label: session.name, type: 'bottom right' }}>
        {session.picture === '' ? (
          <Login alignItems="center" justifyContent="center" width="48px" height="48px" border borderRadius="circle">
            <Svg.Google />
          </Login>
        ) : (
          <MyAccount className="MyAccount" backgroundImage={session.picture} />
        )}
      </Container>

      <FloatMenu
        show={showMenu}
        setShow={setShowMenu}
        menus={AccountMenus}
        onClick={(menu) => {
          const page = location.pathname.split('/')[1];
          switch (menu) {
            case AccountMenusMyMenu:
              console.log(userId);
              //              window.location.replace(`//${conf.coverURL}/${page}/${userId}`);
              break;
            case AccountMenusSelectAccount:
              window.google.accounts.id.prompt();
              break;
            case AccountMenusLogout:
              window.google.accounts.id.disableAutoSelect();
              document.cookie = googleAccountCookieKey;
              localStorage.removeItem(sessionKey);
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
  background-position: center;
  background-image: url(${(props) => props.backgroundImage});
  background-size: 38px;
  background-repeat: no-repeat;
  border-radius: 50%;
`;
