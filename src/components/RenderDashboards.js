import React from 'react';
import PropTypes from 'prop-types';
import * as Chicken from '../assets/images/chicken.jpg';
import * as Mac from '../assets/images/macbook.jpg';
import * as Django from '../assets/images/django.png';
import * as JS from '../assets/images/es6.png';
import * as react from '../assets/images/react.jpg';
import * as Mic from '../assets/images/microphone.jpeg';
import * as promise from '../assets/images/promise.png';
import * as test from '../assets/images/testing.png';
import * as mpesa from '../assets/images/mpesa.png';

const createCard = details => (
  <div className="horizontal-scroll-view">
    {details.map(item => (
      <div className="col-md-4 p-3">
        <div className="card img-card">
          <h5 className="card-title text-center pt-2">{item.title}</h5>
          <img
            className="card-img-top card-image-custom"
            alt={item.title}
            style={{ backgroundColor: 'magenta' }}
            src={item.pic}
          />
          <div className="card-body">
            <p className="card-text">
              {item.text}
            </p>
            <div className="d-flex justify-content-between align-items-center">
              <div className="button-group">
                <button type="button" className="btn btn-sm btn-outline-primary">Read More</button>
              </div>
              <small className="text-muted">1 hr ago</small>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);


const RenderCards = (props) => {
  const text = 'Some quick example text to build on the card title and make up the bulk of the card\'s content.';
  const recentReads = [
    {
      title: 'Recipe: Teriyaki Chicken',
      text,
      pic: Chicken,
      style: '',
    },
    {
      title: 'MacBook core i9',
      text,
      pic: Mac,
      style: '',
    },
    {
      title: 'Django: Get Started',
      text,
      pic: Django,
      style: '',
    },
    {
      title: 'Django: Get Started',
      text,
      pic: null,
      style: 'background-color:#f44336;',
    },
    {
      title: 'Django: Get Started',
      text,
      pic: null,
      style: 'background-color:#f44336;',
    },
    {
      title: 'Django: Get Started',
      text,
      pic: null,
      style: 'background-color:blueviolet;',
    }];

  const recommendedReads = [
    {
      title: 'JavaScript ES6',
      text,
      pic: JS,
      style: '',
    },
    {
      title: 'Learn React.js',
      text,
      pic: react,
      style: '',
    },
    {
      title: 'Music: Vocal Production',
      text,
      pic: Mic,
      style: '',
    },
    {
      title: 'Music: Audio Production',
      text,
      pic: null,
      style: 'background-color:skyblue;',
    },
    {
      title: 'Music: Novice Production',
      text,
      pic: null,
      style: 'background-color:skyblue;',
    },
    {
      title: 'Music: Expert Production',
      text,
      pic: null,
      style: 'background-color:blueviolet;',
    }];

  const trendingReads = [
    {
      title: 'Promises in ES8',
      text,
      pic: promise,
      style: '',
    },
    {
      title: 'Writing Tests in Django',
      text,
      pic: test,
      style: '',
    },
    {
      title: 'Safaricom: Daraja API',
      text,
      pic: mpesa,
      style: '',
    },
    {
      title: 'Promises in ES8',
      text,
      pic: null,
      style: 'background-color:khaki;',
    },
    {
      title: 'Promises in ES9',
      text,
      pic: null,
      style: 'background-color:khaki;',
    },
    {
      title: 'Promises in ES10',
      text,
      pic: null,
      style: 'background-color:khaki;',
    }];

  switch (props.type) {
    case 1:
      return (
        createCard(recentReads));
    case 2:
      return (
        createCard(recommendedReads));
    case 3:
      return (
        createCard(trendingReads));
    default:
      return (
        createCard(recentReads));
  }
};


RenderCards.propTypes = {
  type: PropTypes.number.isRequired,
};

export default RenderCards;
