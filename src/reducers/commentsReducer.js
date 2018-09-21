import {
  COMMENTS_LOADED,
  COMMENTS_LOADING,
  COMMENTS_FETCHED, POSTING_COMMENT,
} from '../actions/types';

const initialState = {
  comments: [],
  has_comments: false,
  comments_loading: false,
  posting_comment: false,
};

export default function commentsReducer(state = initialState, { type, payload }) {
  switch (type) {
    case COMMENTS_FETCHED:
      const hasComments = payload[0] !== undefined;
      let user;
      let comment;
      const comments = [];
      for (const item in payload) {
        user = payload[item].user;
        comment = {
          content: payload[item],
        };
        comments.push({ user, comment });
      }
      return {
        ...state,
        hasComments,
        comments: hasComments ? comments : [],
        posting_comment: false,
      };
    case COMMENTS_LOADING:
      return {
        ...state,
        comments_loading: true,
      };
    case COMMENTS_LOADED:
      return {
        ...state,
        comments_loading: false,
      };
    case POSTING_COMMENT:
      return {
        ...state,
        posting_comment: true,
      };
    default:
      return state;
  }
}
