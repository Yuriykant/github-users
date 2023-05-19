import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Header } from '../Header/Header';
import { UserProfilePage } from '../UserProfilePage/UserProfilePage';
import { UsersPage } from '../UsersPage/UsersPage';
import { UsersSearchPage } from '../UsersSearchPage/UsersSearchPage';

export const App: FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<UsersPage />} />
          <Route path="search" element={<UsersSearchPage />} />
          <Route path="users/:login" element={<UserProfilePage />} />
          <Route path="*" element={<UsersPage />} />
        </Route>
      </Routes>
    </>
  );
};
