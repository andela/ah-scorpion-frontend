import React from 'react';

const NavBar = () => (
  <nav className="navbar navbar-expand-md bg-primary navbar-dark fixed-top">
    <div className="container">
      <a className="navbar-brand" href="/">
        <img
          src="https://res.cloudinary.com/dqvk8ugtp/image/upload/v1535993624/Author_sHaven_logo_sxca8t.png"
          alt="Author's Haven Logo"
          style={{ borderRadius: '10px' }}
          height="60"
          width="50"
        />
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
      />
    </div>
  </nav>
);

export default NavBar;
