import React, { useEffect } from 'react';
import styled from 'styled-components';

import conf from 'common/conf';
import commonUtil from 'common/util';

import api from 'components/api';
import Svg from 'components/atomicDesign/atoms/svg';
import Flex from 'components/flexes';
import User from 'components/model/User';
import { myUserKey, googleAccountCookieKey } from 'components/utils/constants/storage';

import env from '../../../env.json';

type Props = {
  myUser: User;
  setShowUserMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setMyUser: React.Dispatch<React.SetStateAction<User>>;
  setIsMyPage: React.Dispatch<React.SetStateAction<boolean>>;
};

const getMyUserFromSession = () => {
  const item = localStorage.getItem(myUserKey);
  return new User(JSON.parse(item));
};

const Component: React.FC<Props> = ({ myUser, setShowUserMenu, setMyUser, setIsMyPage }: Props) => {
  const handleOnClickLogin = () => {
    document.cookie = googleAccountCookieKey;
    const myUserSession = getMyUserFromSession();
    if (myUserSession === null || myUserSession.id === '') {
      window.google.accounts.id.prompt();
    } else {
      setShowUserMenu(true);
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
        client_id: env.googleClientId,
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
    <Container className="Account" onClick={handleOnClickLogin}>
      {myUser.snsIcon === '' ? (
        <Login alignItems="center" justifyContent="center" width="48px" height="48px" border borderRadius="circle">
          <Svg.Google />
        </Login>
      ) : (
        <MyAccountIcon className="MyAccount" backgroundImage={myUser.snsIcon} />
      )}
    </Container>
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

const MyAccountIcon = styled.div<MyAccountType>`
  width: 38px;
  height: 38px;
  background-position: center;
  background-image: url(${(props) => props.backgroundImage});
  background-size: 38px;
  background-repeat: no-repeat;
  border-radius: 50%;
`;
