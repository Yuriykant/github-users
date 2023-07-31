import React, { FC, useEffect, useState } from 'react';
import { UsersList } from '../UsersList/UsersList';
import { GithubUsers } from '../../types';
import { fetchData } from '../../utils/fetchData';

export const UsersPage: FC = () => {
  const [users, setUsers] = useState<GithubUsers[] | null>(null);

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const response = await fetchData('https://api.github.com/users');
        setUsers(response);
      } catch (error) {
        // Обработка ошибки, если не удалось получить данные
      }
    };
    fetchUsersData();
  }, []);

  return (
    <main>
      <div className="container">
        <UsersList users={users} />
      </div>
    </main>
  );
};
