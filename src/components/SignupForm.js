import React from 'react';
import { Link } from 'react-router-dom';

const SignupForm = () => (
  <main className="mt-2em">
    <div className="container p-5 signup-container">
      <div className="card  form-bg ptb-1em">
        <div className="card-header text-center form-bg">
          <h2>Sign Up</h2>
        </div>
        <form className="pb-5 pl-5 pr-5 pt-0 form-bg">
          <div className="text-center">
            <p>You could sign up with...</p>
            <Link to="#facebbok">
              <button className="btn btn-primary social-btn" type="button">
                <div>
                  <i className="fa fa-facebook fa-2x" aria-hidden="true" />
                </div>
              </button>
            </Link>
            <Link to="#google">
              <button className="btn btn-danger social-btn" type="button">
                <div>
                  <i className="fa fa-google fa-2x" aria-hidden="true" />
                </div>
              </button>
            </Link>
            <br />
            <p className="mt-2em">Or</p>
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Email Address"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="exampleInputUsername"
              placeholder="Username"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword2"
              placeholder="Confirm Password"
            />
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
            <p>
              Already have an account? Login
              <Link to="login"> here</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  </main>
);

export default SignupForm;
