import {
  COMMENTS_LOADED,
  COMMENTS_LOADING,
  COMMENTS_FETCHED,
  POSTING_COMMENT,
  COMMENT_POSTED,
  HISTORY_FETCHED,
  HISTORY_CLEARED,
} from '../actions/types';

const initialState = {
  comments: [],
  has_comments: false,
  comments_loading: false,
  posting_comment: false,
  comment_count: 0,
  comments_loaded: false,
};

export default function commentsReducer(state = initialState, { type, payload }) {
  switch (type) {
    case COMMENTS_FETCHED:
      const hasComments = payload[0] !== undefined;
      let user;
      let comment;
      const comments = [];
      let count = 1;
      for (const item in payload) {
        count++;
        user = payload[item].user;
        comment = {
          content: payload[item],
        };
        comments.push({ user, comment });
      }
      return {
        ...state,
        comment_count: count,
        hasComments,
        comments: hasComments ? comments : [],
        posting_comment: false,
        comments_loaded: true,
        comments_loading: false,
        message: count <= 1 ? 'No comments yet. Be first to comment'
          : 'Join the conversation. Leave a comment',
        initialComments: payload,
      };
    case COMMENTS_LOADING:
      return {
        ...state,
        comments_loading: true,
        comments_loaded: false,
      };
    case COMMENTS_LOADED:
      return {
        ...state,
        comments_loading: false,
        comments_loaded: true,
        message: 'Join the conversation. Leave a comment',
      };
    case POSTING_COMMENT:
      return {
        ...state,
        posting_comment: true,
      };
    case COMMENT_POSTED:
      return {
        ...state,
        posting_comment: false,
        comments_loading: false,
        comments_loaded: true,
        message: payload.message,
      };
    case HISTORY_FETCHED:
      return {
        ...state,
        history: payload,
        showHistory: true,
      };
    case HISTORY_CLEARED:
      return {
        ...state,
        history: undefined,
        showHistory: false,
      };
    default:
      return state;
  }
}
