import React from 'react';
import { Link, BrowserRouter as Router } from 'react-router-dom';

const NavBar = () => (
  <Router>
    <nav className="navbar navbar-expand-md bg-primary navbar-dark fixed-top">
      <div className="container">
        <Link to="/">
          <div className="navbar-brand">
            <b>Authors Haven</b>
          </div>
        </Link>

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
        />
      </div>
    </nav>
  </Router>
);

export default NavBar;
