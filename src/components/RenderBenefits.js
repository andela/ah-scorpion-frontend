import React from 'react';

const RenderBenefits = () => {
  const benefits = [
    {
      value: 'Authentic',
      icon: '👌',
    },
    {
      value: 'Knowledgeable Authors',
      icon: '📚',
    },
    {
      value: 'Membership',
      icon: '💳',
    },
    {
      value: 'Affordable',
      icon: '💸',
    },
    {
      value: 'Amazing',
      icon: '😌',
    },
    {
      value: 'Fun',
      icon: '🙌',
    }];

  return (
    createTemplate(benefits)
  );
};

const createTemplate = benefits => (
  <div className="col-md-6">
    <h4 className="text-primary">Benefits And Features</h4>
    <div className="row text-left pl-5">
      {benefits.map((item, index) => (
        <div key={index} className="col-md-6 my-3">
          <div className="row mb-3">
            <div className="align-self-center col-10 col-md-12">
              <h5 className="text-secondary">
                {item.value}
                {' '}
                {item.icon}
              </h5>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default RenderBenefits;
