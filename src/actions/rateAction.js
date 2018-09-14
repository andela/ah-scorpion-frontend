import axios from 'axios';
import { USER_RATE_ARTICLE, CURRENT_AVG_RATE } from './types';

const rateAction = val => ({
  type: USER_RATE_ARTICLE,
  val,
});

const currentRate = response => ({
  type: CURRENT_AVG_RATE,
  payload: { averageRating: response.ratings[0].stars },
});

export const rateArticle = val => (dispatch) => {
  axios({
    method: 'post',
    url:
      'https://authors-haven-api.herokuapp.com/api/v1/articles/zacs-demo-article-8a5742ff66d54fe492be37673637c6a0/ratings',
    data: { stars: val },
    headers: {
      Authorization:
        'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZGVudGl0eSI6eyJlbWFpbCI6ImRhdmVubWF0aGV3c0BnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImRhdmVtYXRoZXdzIiwiYmlvIjoiIiwiaW1hZ2UiOm51bGx9LCJpYXQiOjE1MzY4NDgwOTMsImV4cCI6MTUzNjkzNDQ5M30.f3k3pFPoE90hvS21-7mZOxZYl0kAuK5F-PbmbJWLwOU',
    },
  }).then((response) => {
    dispatch(rateAction(response.data));
  });
};

export const InitialRate = () => (dispatch) => {
  console.log('ddddd...');
  axios({
    method: 'get',
    url:
      'https://authors-haven-api.herokuapp.com/api/v1/articles/zacs-demo-article-8a5742ff66d54fe492be37673637c6a0/ratings',
    headers: {
      Authorization:
        'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZGVudGl0eSI6eyJlbWFpbCI6ImRhdmVubWF0aGV3c0BnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImRhdmVtYXRoZXdzIiwiYmlvIjoiIiwiaW1hZ2UiOm51bGx9LCJpYXQiOjE1MzY4NDgwOTMsImV4cCI6MTUzNjkzNDQ5M30.f3k3pFPoE90hvS21-7mZOxZYl0kAuK5F-PbmbJWLwOU',
    },
  }).then((response) => {
    dispatch(currentRate(response.data));
  });
};
