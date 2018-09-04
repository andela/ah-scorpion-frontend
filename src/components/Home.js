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
            <h1 className="display-4 text-white">Authors Haven</h1>
            <h3 className="text-white">
              Big Ideas
            </h3>
            <Link to="Login" className="btn mx-1 btn-secondary">Login</Link>
            <Link to="SignUp" className="btn btn-primary mx-1">Signup</Link>
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
