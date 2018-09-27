import React from 'react';
import { Link } from 'react-router-dom';
import RenderBenefits from './RenderBenefits';
import RenderFeatures from './RenderFeatures';
import RenderTestmonials from './RenderTestmonials';

const Home = () => (
  <div>
    <div className="text-center home-banner">
      <div className="container">
        <div className="row">
          <div className="py-5 col-md-12">
            <img
              src="https://res.cloudinary.com/dqvk8ugtp/image/upload/v1535993624/Author_sHaven_logo_sxca8t.png"
              alt="Author's Haven Logo"
              style={{ borderRadius: '10px' }}
              height="210"
              width="150"
            />
            <h1 className="display-4 text-white">Authors Haven</h1>
            <h3 className="text-white">Big Ideas</h3>
            <br />
            <br />
            <Link to="login" className="btn mx-1 btn-secondary">
              Login
            </Link>
            <Link to="signup" className="btn btn-primary mx-1">
              Signup
            </Link>
          </div>
        </div>
      </div>
    </div>
    <div className="pt-5 bg-light">
      <div className="container">
        <div className="row text-center">
          <RenderFeatures />
          <RenderBenefits />
        </div>
      </div>
      <div className="py-5 text-center bg-light">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="text-primary">Testimonials</h1>
              <p className="lead">We grow together with the community</p>
            </div>
          </div>
          <RenderTestmonials />
        </div>
      </div>
    </div>
  </div>
);

export default Home;
