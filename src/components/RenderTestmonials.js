import React from 'react';
import * as Ruth from '../assets/images/ruth.jpg';
import * as Hos from '../assets/images/hos.jpg';
import * as Chim from '../assets/images/face1.jpg';

const RenderTestimonials = () => {
  const testimonials = [
    {
      name: 'Chimammanda',
      text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
      pic: Chim,
      type: 'Senior writer',
    },
    {
      name: 'Hoslack',
      text: 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec.',
      pic: Hos,
      type: 'Reader',
    },
    {
      name: 'Ruth',
      text: 'Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Cum sociis natoque penatibus et magnis dis parturient montes.',
      pic: Ruth,
      type: 'Reader',
    }];

  return (
    createTemplate(testimonials)
  );
};

const createTemplate = testimonials => (
  <div className="row">
    {testimonials.map((item, index) => (
      <div key={index} className="col-md-4 p-4">
        <img className="img-fluid rounded-circle testimonials" src={item.pic} alt={item.name} />
        <p className="my-4">
          <i>
            {item.text}
          </i>
        </p>
        <p>
          <b>{item.name}</b>
          <br />
          {item.type}
        </p>
      </div>
    ))}
  </div>
);


export default RenderTestimonials;
