import React, { FC, useState } from 'react';
import { UsersList } from '../UsersList/UsersList';
import { GithubUsers } from '../../types';
import { useSearchParams } from 'react-router-dom';

export const UsersSearchPage: FC = () => {
  const [users, setUsers] = useState<GithubUsers[] | null>(null);
  const [searchParams] = useSearchParams();

  const searchUser = searchParams.get('query');

  React.useEffect(() => {
    fetch(`https://api.github.com/search/users?q=${searchUser}`)
      .then((response) => response.json())
      .then((response) => {
        setUsers(response.items);
      });
  }, [searchUser]);

  return (
    <main>
      <div className="container">
        <h1 className="title">Пользователи по запросу {searchUser}</h1>
        <UsersList users={users} />
      </div>
    </main>
  );
};
