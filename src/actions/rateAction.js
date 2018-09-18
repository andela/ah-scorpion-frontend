import axios from 'axios';
import { USER_RATE_ARTICLE, CURRENT_AVG_RATE, RATING_ERROR } from './types';

const rateAction = val => ({
  type: USER_RATE_ARTICLE,
  val,
});

const currentRate = response => ({
  type: CURRENT_AVG_RATE,
  payload: {
    averageRating:
      response.ratings === undefined || response.ratings[0] === undefined
        ? 0
        : response.ratings[0].stars,
  },
});

const errorMessage = err => ({
  type: RATING_ERROR,
  payload: err[0],
});

// Get the slug from the url
const baseUrl = process.env.REACT_APP_BASE_URL;
const slug = window.location.pathname.split('/').pop();

export const rateArticle = val => (dispatch) => {
  const token = localStorage.getItem('token');
  axios({
    method: 'post',
    url: `${baseUrl}/articles/${slug}/ratings`,
    data: { stars: val },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      dispatch(rateAction(response.data));
    })
    .catch((err) => {
      dispatch(errorMessage(err.response.data.errors.detail));
    });
};

export const InitialRate = () => (dispatch) => {
  axios({
    method: 'get',
    url: `${baseUrl}/articles/${slug}/ratings`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    dispatch(currentRate(response.data));
  });
};
