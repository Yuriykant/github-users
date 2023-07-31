import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GithubUsers } from '../../types';
import { fetchData } from '../../utils/fetchData';

import './UsersList.css';

interface Props {
  users: GithubUsers[] | null;
}

export const UsersList: FC<Props> = ({ users }) => {
  const [repos, setRepos] = useState<number[]>([]);
  const [company, setCompany] = useState<string[]>([]);

  const arrLogin = users?.map((user) => {
    return user.login;
  });

  useEffect(() => {
    async function fetchUsersData() {
      const arrFetchUsers = arrLogin?.map((login) => fetchData(`https://api.github.com/users/${login}`));

      if (arrFetchUsers?.length) {
        const responses = await Promise.all(arrFetchUsers);
        const arrCompany = responses.map((item) => item.company);
        const arrReposNumber = responses.map((item) => item.public_repos);
        setCompany(arrCompany);
        setRepos(arrReposNumber);
      }
    }

    fetchUsersData();
  }, [users]);

  const pluralization = (number: number, txt: any[], cases = [2, 0, 1, 1, 1, 2]) =>
    txt[number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]];

  return (
    <div className="users-list">
      {users?.map((user) => (
        <section className="users-list__item" key={user.id}>
          <div className="users-list__image-container">
            <img className="users-list__image" src={user.avatar_url} alt={user.login + 'profile photo'} />
          </div>
          <div className="users-list__content">
            <h2 className="users-list__title">
              <Link to={`/users/${user.login}`} className="link">
                {user.login}
              </Link>
              ,{' '}
              <div>
                {repos[users.indexOf(user)]}{' '}
                {pluralization(repos[users.indexOf(user)], ['репозиторий', 'репозитория', 'репозиториев'])}{' '}
              </div>
            </h2>
            <p className="users-list__text">{company[users.indexOf(user)]}</p>
          </div>
        </section>
      ))}
    </div>
  );
};
