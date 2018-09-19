import {
  COMMENTS_FETCHED,
} from '../actions/types';

const initialState = {
  comments: [],
  has_comments: false,
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
        comment = payload[item].content;
        comments.push({ user, comment });
      }
      return {
        ...state,
        hasComments,
        comments: hasComments ? comments : [],
      };
    default:
      return state;
  }
}
