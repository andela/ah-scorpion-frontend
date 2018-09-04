import React from 'react';

const createTemplate = benefits => (
  <div className="col-md-6">
    <h4 className="text-primary">Benefits And Features</h4>
    <div className="row text-left pl-5">
      {benefits.map(item => (
        <div key={item.value} className="col-md-6 my-3">
          <div className="row mb-3">
            <div className="align-self-center col-10 col-md-12">
              <h5 className="text-secondary">
                {item.value.value}
                {' '}
                {item.value.icon}
              </h5>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const RenderBenefits = () => {
  const benefits = [
    {
      value: 'Authentic', icon: '👌',
    },
    {
      value: 'Knowledgeable Authors', icon: '📚',
    },
    {
      value: 'Membership', icon: '💳',
    },
    {
      value: 'Affordable', icon: '💸',
    },
    {
      value: 'Amazing', icon: '😌',
    },
    {
      value: 'Fun', icon: '🙌',
    }];

  return (createTemplate(benefits));
};


export default RenderBenefits;
