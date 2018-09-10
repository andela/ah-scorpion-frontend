import React from 'react';
import { Link } from 'react-router-dom';
import * as Avatar from '../assets/images/avatar.png';

const UserNavBar = () => {
  const username = localStorage.getItem('username');
  const imageUrl = localStorage.getItem('image_url');
  const nav = (
    <nav className="navbar navbar-expand-md bg-primary navbar-dark fixed-top">
      <div className="container">
        <a className="navbar-brand" href="/dashboard">
          <b> Authors Haven</b>
        </a>
        <button
          className="navbar-toggler navbar-toggler-right"
          type="button"
          data-toggle="collapse"
          data-target="#navbar2SupportedContent"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          className="collapse navbar-collapse text-center justify-content-end"
          id="navbar2SupportedContent"
        >
          <form className="form-inline m-0 px-5">
            <div className="input-group mb-2 mr-sm-2">
              <div className="input-group-prepend">
                <div className="input-group-text">
                  <i className="fa fa-search" aria-hidden="true" />
                </div>
              </div>
              <input
                type="text"
                className="form-control"
                id="search"
                placeholder="Search"
              />
            </div>
          </form>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/dashboard">
                <img
                  className="avatar"
                  src={(imageUrl !== 'null' && imageUrl !== undefined)
                    ? imageUrl : Avatar}
                  alt={username}
                />
              </Link>
            </li>
            <li className="nav-item dropdown name-field">
              <a
                className="nav-link text-white dropdown-toggle"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {username}
              </a>
              <div className="dropdown-menu">
                <a className="dropdown-item" href="profile.html">My Account</a>
                <a className="dropdown-item" href="settings.html">Settings</a>
                <a className="dropdown-item" href="index.html">Sign Out</a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
  return nav;
};
export default UserNavBar;
