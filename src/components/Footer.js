// This is an example of a "dumb" component which is not aware of Redux

import React from 'react';

const Footer = () => (
  <footer className="bg-dark text-white footer">
    <div className="row">
      <div className="col-md-12 mt-3">
        <p className="text-center text-muted">
          © Copyright 2018 Authors Haven - All rights reserved.{" "}
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
