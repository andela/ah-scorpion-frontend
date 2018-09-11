import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as Avatar from '../assets/images/avatar.png';

class UserNavBar extends React.Component {
  constructor(props) {
    super(props);
    this.username = localStorage.getItem('username');
    this.imageUrl = localStorage.getItem('image_url');
  }


  handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('image_url');
    this.props.history.push('/login');
  };

  render() {
    return (
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
              <label className="sr-only" htmlFor="inlineFormInputGroupUsername2">Search</label>
              <div className="input-group mb-2 mr-sm-2">
                <div className="input-group-prepend">
                  <div className="input-group-text">
                    <i className="fa fa-search" aria-hidden="true" />
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
                <Link to="/dashboard">
                  <img
                    className="avatar"
                    src={(this.imageUrl !== 'null' && this.imageUrl !== undefined)
                      ? this.imageUrl : Avatar}
                    alt={this.username}
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
                  {this.username}
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <a className="dropdown-item" href="./profile.html">My Account</a>
                  <a className="dropdown-item" href="#">Settings</a>
                  <a
                    className="dropdown-item"
                    href="login"
                    id="logout-link"
                    onClick={this.handleLogout.bind(this)}
                  >
Sign Out
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}


UserNavBar.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};


export default UserNavBar;
