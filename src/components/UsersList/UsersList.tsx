import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GithubUsers } from '../../types';
import { GITHUB_API } from '../../api/gitHub';

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
    const arrFetchUsers = arrLogin?.map((login) =>
      fetch(`https://api.github.com/users/${login}`, GITHUB_API).then((response) => response.json())
    );

    if (arrFetchUsers)
      Promise.all(arrFetchUsers).then((responses) => {
        const arrCompany = responses.map((item) => item.company);
        const arrReposNumber = responses.map((item) => item.public_repos);
        setCompany(arrCompany);
        setRepos(arrReposNumber);
      });
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
