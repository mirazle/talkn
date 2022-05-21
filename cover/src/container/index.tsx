import 'normalize.css';
import React, { useEffect, useState } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import commonUtil from 'common/util';

import env from 'cover/../env.json';
import api from 'cover/api';
import Top from 'cover/components/pages/Top/';
import UsersIndex from 'cover/components/pages/Users';
import Dashboard from 'cover/components/pages/Users/Dashboard';
import { FlexesContext, getFlexesValue } from 'cover/flexes';
import { GoogleSessionType, googleSessionInit } from 'cover/model/Google';
import User from 'cover/model/User';
import { sessionKey } from 'cover/utils/constants/storage';
import { getSessionValues } from 'cover/utils/constants/user';

const Container: React.FC = () => {
  const [session, setSession] = useState<GoogleSessionType>(googleSessionInit);

  const fetchUser = async () => {};

  const handleGoolgeCredentialResponse = async (goolgeCredentialResponse) => {
    const parsesSession = commonUtil.parseJwt(goolgeCredentialResponse.credential);
    setSession(parsesSession);
    let request = commonUtil.deepCopy(parsesSession);
    request = deleteRequest(request);
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
  }, []);

  return (
    <FlexesContext.Provider value={getFlexesValue()}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Top session={session} setSession={setSession} />} />
          <Route path="/users" element={<UsersIndex session={session} setSession={setSession} />} />
          <Route path="/users/:userId" element={<Dashboard session={session} setSession={setSession} />} />
          <Route path="/*/" element={<Top session={session} setSession={setSession} />} />
        </Routes>
      </BrowserRouter>
    </FlexesContext.Provider>
  );
};

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

export default Container;
