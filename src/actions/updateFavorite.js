import axios from 'axios';
import {
  FAVORITE_CHANGED,
  FAVORITE_FAILED,
} from './types';


const favoriteChanged = () => {
  console.log('Dispatched');
  return {
    type: FAVORITE_CHANGED,
    payload: {
      favorite: true,
      message: 'Worked',
    },
  };
};

const favoriteFailed = message => ({
  type: FAVORITE_FAILED,
  payload: {
    favorite: false,
    message,
  },
});

export default function favouriteArticle() {
  const slug = 'lennys-first-article-16-778b1d5a2b6e438a97ffdf47c57651ad';
  const favUrl = `https://authors-haven-api.herokuapp.com/api/v1/articles/${slug}/favorite/`;
  const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZGVudGl0eSI6eyJlbWFpbCI6InNhbXVlbC5tdW55aWxpQGFuZGVsYS5jb20iLCJ1c2VybmFtZSI6InNtdW55aWxpIiwiYmlvIjoiIiwiaW1hZ2UiOm51bGx9LCJpYXQiOjE1MzY3ODAyNTYsImV4cCI6MTUzNjg2NjY1Nn0.zFpVgT2kODC8IjMLrSDQ5BIgjO3qFuIHrsDvup5NN1k';
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;

  return (dispatch) => {
    axios
      .post(favUrl)
      .then(response => (response.status === 200 ? dispatch(favoriteChanged())
        : dispatch(favoriteFailed(response.data))))
      .catch(error => dispatch(favoriteFailed(error.response.data)),
      );
  };
}
