import React, { FC, FormEvent, useState } from 'react';
import { Link, useNavigate, useSearchParams, Outlet } from 'react-router-dom';

import './Header.css';

export const Header: FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!searchValue.trim().length) {
      return;
    }
    navigate(`/search?query=${searchValue}`);
    setSearchValue('');
  };

  const searchUser = searchParams.get('query');

  return (
    <>
      <header className="header">
        <div className="container header__container">
          <nav className="header__navigation">
            <ul className="header__navigation-list">
              <li className="header__navigation-list-item">
                <Link to="/" className="header__navigation-link">
                  Пользователи гитхаба
                </Link>
              </li>
              {searchUser && (
                <li className="header__navigation-list-item">
                  <a className="header__navigation-link header__navigation-link--user">{searchUser}</a>
                </li>
              )}
            </ul>
          </nav>

          <div className="header__search">
            <form className="header__search-form" onSubmit={onSubmit}>
              <input
                type="search"
                className="header__search-input"
                placeholder="Поиск пользователя"
                value={searchValue}
                onChange={(event) => setSearchValue(event.currentTarget.value)}
              />
              <button type="submit" className="header__search-button">
                Найти
              </button>
            </form>
          </div>
        </div>
      </header>
      <Outlet />
    </>
  );
};
