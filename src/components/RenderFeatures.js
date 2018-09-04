import React from 'react';
import { Link } from 'react-router-dom';

const createTemplate = features => (
  <div className="col-md-6">
    <h4 className="text-primary">Featured Categories</h4>
    <ul className="list-group">
      {features.map(item => (
        <Link key={item.value} to="#technology">
          <li className="list-group-item d-flex justify-content-between align-items-center">
            {item.value}
            <span className="badge badge-pill badge-secondary">{item.num}</span>
          </li>
        </Link>
      ))}
    </ul>
  </div>
);

const RenderFeatures = () => {
  const features = [
    {
      value: 'Technology',
      num: '312',
    },
    {
      value: 'Lifestyle',
      num: '299',
    },
    {
      value: 'Science',
      num: '259',
    },
    {
      value: 'Finance',
      num: '219',
    },
    {
      value: 'Politics',
      num: '155',
    }];

  return (createTemplate(features));
};

export default RenderFeatures;
