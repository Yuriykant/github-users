import React, { FC, useState } from 'react';
import { UsersList } from '../UsersList/UsersList';
import { GithubUsers } from '../../types';
import { GITHUB_API } from '../../api/gitHub';

export const UsersPage: FC = () => {
  const [users, setUsers] = useState<GithubUsers[] | null>(null);

  React.useEffect(() => {
    fetch(' https://api.github.com/users', GITHUB_API)
      .then((response) => response.json())
      .then((response) => {
        setUsers(response);
      });
  }, []);

  return (
    <main>
      <div className="container">
        <UsersList users={users} />
      </div>
    </main>
  );
};
