import 'normalize.css';
import React, { useState } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import Account from 'cover/components/molecules/Account';
import Top from 'cover/components/pages/Top/';
import UsersIndex from 'cover/components/pages/Users';
import Dashboard from 'cover/components/pages/Users/Dashboard';
import { FlexesContext, getFlexesValue } from 'cover/flexes';
import User, { userInit } from 'cover/model/User';

export type PageProps = {
  isMyPage: boolean;
  myUser: User;
  setMyUser: React.Dispatch<React.SetStateAction<User>>;
  account: React.ReactNode;
};

const Container: React.FC = () => {
  const [isMyPage, setIsMyPage] = useState(false);
  const [myUser, setMyUser] = useState<User>(userInit);
  const commonProps: PageProps = {
    isMyPage,
    myUser,
    setMyUser,
    account: <Account myUser={myUser} setMyUser={setMyUser} setIsMyPage={setIsMyPage} />,
  };

  return (
    <FlexesContext.Provider value={getFlexesValue()}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Top {...commonProps} />} />
          <Route path="/users" element={<UsersIndex {...commonProps} />} />
          <Route path="/users/:userId" element={<Dashboard {...commonProps} />} />
          <Route path="/*/" element={<Top {...commonProps} />} />
        </Routes>
      </BrowserRouter>
    </FlexesContext.Provider>
  );
};

export default Container;
