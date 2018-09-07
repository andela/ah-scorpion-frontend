import React from 'react';
import { Link } from 'react-router-dom';
import RenderCards from './RenderDashboards';

const DashboardContainer = () => (
  <main>
    <div className="text-center py-5 dashboard-banner">
      <div className="container">
        <div className="row my-5 justify-content-center">
          <div className="col-md-9">
            <h1>Featured Article Series</h1>
            <p className="lead text-white">
                Something short and leading about the collection
                below—its contents, the creator, etc. Make it short
                and sweet, but not too short so folks don
              {'\''}
              t simply skip over it entirely.
            </p>
            <a href="#" className="btn btn-primary m-2">Read More</a>
          </div>
        </div>
      </div>
    </div>
    <div className="py-4 bg-light">
      <div className="container">
        <Link to="#" className="custom-link">
          <h3>Recent Reads...</h3>
        </Link>
        <RenderCards type={1} />
        <Link to="#" className="custom-link">
          <h3>Recommended For You...</h3>
        </Link>
        <RenderCards type={2} />
        <Link to="#" className="custom-link">
          <h3>Trending Now...</h3>
        </Link>
        <RenderCards type={3} />
      </div>
    </div>
  </main>
);


export default DashboardContainer;
