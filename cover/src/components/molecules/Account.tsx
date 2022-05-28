import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import conf from 'common/conf';
import commonUtil from 'common/util';

import env from 'cover/../env.json';
import api from 'cover/api';
import Svg from 'cover/components/atoms/svg';
import FloatMenu from 'cover/components/organisms/FloatMenu';
import Flex from 'cover/flexes';
import { AccountMenusLogout, AccountMenus, AccountMenusMyMenu, AccountMenusSelectAccount } from 'cover/model/Menu';
import User from 'cover/model/User';
import { myUserKey, googleAccountCookieKey } from 'cover/utils/constants/storage';

type Props = {
  myUser: User;
  setMyUser: React.Dispatch<React.SetStateAction<User>>;
  setIsMyPage: React.Dispatch<React.SetStateAction<boolean>>;
};

const getMyUserFromSession = () => {
  const item = localStorage.getItem(myUserKey);
  return new User(JSON.parse(item));
};

const Component: React.FC<Props> = ({ myUser, setMyUser }: Props) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleOnClickLogin = () => {
    document.cookie = googleAccountCookieKey;
    const myUserSession = getMyUserFromSession();
    if (myUserSession === null) {
      window.google.accounts.id.prompt();
    } else {
      setShowMenu(true);
    }
    if (myUserSession) {
      setMyUser(myUserSession);
    }
  };

  const handleGoolgeCredentialResponse = async (goolgeCredentialResponse) => {
    const googleResponse = commonUtil.parseJwt(goolgeCredentialResponse.credential);
    const snsIcon = googleResponse.picture;
    const request = commonUtil.deepCopy(googleResponse);
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
      const _user = await api.json('login', request);
      const user = new User({ ..._user, snsIcon });
      localStorage.setItem(myUserKey, JSON.stringify(user));
    }
    window.location.reload();
  };

  useEffect(() => {}, [myUser]);

  useEffect(() => {
    const myUserSession = getMyUserFromSession();

    if (myUserSession) {
      setMyUser(myUserSession);
    }
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: env.clientId,
        cancel_on_tap_outside: true,
        callback: handleGoolgeCredentialResponse,
      });

      if (myUserSession === null) {
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
      <Container className="Account" onClick={handleOnClickLogin} alt={{ label: myUser.name, type: 'bottom right' }}>
        {myUser.snsIcon === '' ? (
          <Login alignItems="center" justifyContent="center" width="48px" height="48px" border borderRadius="circle">
            <Svg.Google />
          </Login>
        ) : (
          <MyAccount className="MyAccount" backgroundImage={myUser.snsIcon} />
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
              console.log(myUser.id);
              //              window.location.replace(`//${conf.coverURL}/${page}/${userId}`);
              break;
            case AccountMenusSelectAccount:
              window.google.accounts.id.prompt();
              break;
            case AccountMenusLogout:
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
    </>
  );
};

export default Component;

const deleteRequest = (request) => {
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
  return request;
};

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
