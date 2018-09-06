import React from 'react';

const HomeFooter = () => (
  <div>
    <div className="text-md-left text-center p-4 bg-dark text-light">
      <div className="container">
        <div className="row">
          <div className="my-3 col-lg-4 col-md-6">
            <h4>Authors Haven</h4>
            <p className="text-muted">July 25 2018</p>
            <p className="my-3 text-muted">
              St. Catherines, Off Thika Road, Nairobi
              <br />
            </p>
          </div>
          <div className="my-3 col-lg-4 col-md-6">
            <h5 contentEditable="true">Ask us a question</h5>
            <form>
              <fieldset className="form-group my-3">
                <div>
                  <input
                    type="email"
                    className="form-control"
                    id="Input Email"
                    placeholder="Email"
                  />
                </div>
              </fieldset>
              <fieldset className="form-group my-3">
                <input
                  type="message"
                  className="form-control"
                  id="Input Message"
                  placeholder="Message"
                />
              </fieldset>
              <button type="submit" className="btn btn-outline-primary">Submit</button>
            </form>
          </div>
          <div className="col-lg-1" />
          <div className="my-3 col-lg-3">
            <h5>Follow</h5>
            <a href="https://www.facebook.com" target="blank">
              <i className="fa fa-facebook-square text-muted fa-3x m-2" />
            </a>
            <a href="https://www.instagram.com" target="blank">
              <i className="fa fa-3x fa-instagram text-muted m-2" />
            </a>
            <a href="https://twitter.com" target="blank">
              <i className="fa fa-3x fa-twitter m-2 text-muted" />
            </a>
            <a href="https://plus.google.com" target="blank">
              <i className="fa fa-3x fa-google-plus-official text-muted m-2" />
            </a>
          </div>
          <div className="row">
            <div className="col-md-12">
              <p className="text-muted">© Copyright 2018 Authors Haven - All rights reserved. </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default HomeFooter;
