import React from 'react';

const UserNavBar = () => {
  const username = localStorage.getItem('username');
  return (
    <nav className="navbar navbar-expand-md bg-primary navbar-dark fixed-top">
      <div className="container">
        <a className="navbar-brand" href="/">
          <b> Authors Haven</b>
        </a>
        <button
          className="navbar-toggler navbar-toggler-right"
          type="button"
          data-toggle="collapse"
          data-target="#navbar2SupportedContent"
        >
          <span className="navbar-toggler-icon"/>
        </button>
        <div
          className="collapse navbar-collapse text-center justify-content-end"
          id="navbar2SupportedContent"
        >
          <form className="form-inline m-0 px-5">
            <label className="sr-only" htmlFor="inlineFormInputGroupUsername2">Search</label>
            <div className="input-group mb-2 mr-sm-2">
              <div className="input-group-prepend">
                <div className="input-group-text">
                  <i className="fa fa-search" aria-hidden="true"/>
                </div>
              </div>
              <input
                type="text"
                className="form-control"
                id="inlineFormInputGroupUsername2"
                placeholder="Search"
              />
            </div>
          </form>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" href="#">Home</a>
            </li>
            <li className="nav-item dropdown">
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
              <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <a className="dropdown-item" href="./profile.html">My Account</a>
                <a className="dropdown-item" href="#">Settings</a>
                <a className="dropdown-item" href="index.html">Sign Out</a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
export default UserNavBar;
