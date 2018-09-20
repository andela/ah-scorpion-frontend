import { USER_RATE_ARTICLE, CURRENT_AVG_RATE, RATING_ERROR } from '../actions/types';

export default function rate(state = {}, action) {
  switch (action.type) {
    case USER_RATE_ARTICLE:
      return { ...state, rating: action.val.ratings.stars };
    case CURRENT_AVG_RATE:
      return {
        ...state,
        rating: action.payload.averageRating,
      };
    case RATING_ERROR:
      return {
        ...state,
        errorMessage: action.payload,
      };

    default:
      return state;
  }
}
