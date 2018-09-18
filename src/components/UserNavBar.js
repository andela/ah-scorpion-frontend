import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as Avatar from '../assets/images/avatar.png';
import { logout } from '../actions/auth';

class UserNavBar extends React.Component {
  constructor(props) {
    super(props);
    this.username = localStorage.getItem('username');
    this.imageUrl = localStorage.getItem('image_url');

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout = (event) => {
    event.preventDefault();
    this.props.logout(this.props.history);
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
              <label className="sr-only" htmlFor="article-search">
                Search
              </label>
              <div className="input-group mb-2 mr-sm-2">
                <div className="input-group-prepend">
                  <div className="input-group-text">
                    <i className="fa fa-search" aria-hidden="true" />
                  </div>
                </div>
                <input
                  type="text"
                  className="form-control"
                  id="article-search"
                  name="article-search"
                  placeholder="Search"
                />
              </div>
            </form>
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/dashboard">
                  <img
                    className="avatar"
                    src={
                      this.imageUrl !== 'null' && this.imageUrl !== undefined
                        ? this.imageUrl
                        : Avatar
                    }
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
                <div className="dropdown-menu">
                  <a className="dropdown-item" href="./profile.html">
                    My Account
                  </a>
                  <a className="dropdown-item" href="/article/new">
                    Create Article
                  </a>
                  <a className="dropdown-item" href="/my-articles">
                    My Articles
                  </a>
                  <a className="dropdown-item" href="#">
                    Settings
                  </a>
                  <a
                    className="dropdown-item"
                    href="login"
                    id="logout-link"
                    onClick={this.handleLogout}
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
  logout: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { logout },
)(UserNavBar);
