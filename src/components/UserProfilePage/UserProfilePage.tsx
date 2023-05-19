import React, { FC, useState } from 'react';
import './UserProfilePage.css';
import { useParams } from 'react-router-dom';
import { GithubRepo, GithubUser } from '../../types';
import { GITHUB_API } from '../../api/gitHub';

export const UserProfilePage: FC = () => {
  const { login } = useParams();
  const [user, setUser] = useState<GithubUser | null>(null);
  const [repos, setRepos] = useState<GithubRepo[] | null>(null);

  React.useEffect(() => {
    Promise.all([
      fetch(`https://api.github.com/users/${login}`, GITHUB_API).then((response) => response.json()),
      fetch(`https://api.github.com/users/${login}/repos`, GITHUB_API).then((response) => response.json()),
    ]).then((responses) => {
      setUser(responses[0]);
      setRepos(responses[1]);
    });
  }, []);

  const reposUrl = `${user?.html_url}?tab=repositories`;

  return (
    <main>
      <div className="container">
        <section className="user-profile">
          <div className="user-profile__image-container">
            <img className="user-profile__image" src={user?.avatar_url} alt="defunkt profile photo" />
          </div>
          <div className="user-profile__content">
            <h1 className="user-profile__title">
              {user?.name}, <span className="user-profile__accent">{user?.login}</span>
            </h1>
            <p className="user-profile__text">
              {user?.followers ? (
                <>
                  <span className="user-profile__accent">{user?.followers}</span>&nbsp;
                  {user?.followers > 1 ? 'followers' : 'follower'} ·&nbsp;
                </>
              ) : (
                'Нет поклонников '
              )}
              {user?.following ? (
                <>
                  <span className="user-profile__accent">{user?.following}</span>&nbsp;
                  {user?.following > 1 ? 'followings' : 'following'} ·&nbsp;
                </>
              ) : (
                '· Не подписался · '
              )}
              <a href={user?.html_url} className="link" target="_blank" rel="noreferrer">
                {user?.html_url}
              </a>
            </p>
          </div>
        </section>

        <section className="repository-list">
          <div className="repository-list__header">
            <h2 className="repository-list__title">Репозитории</h2>
            <a href={reposUrl} className="link" target="_blank" rel="noreferrer">
              Все репозитории
            </a>
          </div>

          <div className="repository-list__container">
            {repos?.map((item) => (
              <section className="repository-list__item" key={item.id}>
                <h3 className="repository-list__item-title">
                  <a href={item.html_url} className="link" target="_blank" rel="noreferrer">
                    {item.name}
                  </a>
                </h3>
                <p className="repository-list__item-text">{item.description}</p>
              </section>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};
