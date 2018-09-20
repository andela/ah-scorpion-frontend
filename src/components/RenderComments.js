import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  articleComments,
  commentsShown,
} from '../actions/articleComments';
import Comment from './Comment';
import LoadingDots from './LoadingDots';
import CommentBox from './CommentBox';

class RenderComments extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    this.props.componentDidMount(this.props.slug);
  };

  handleCommentsShown() {
    this.props.handleCommentsShown();
  }

  showComments = (payload) => {
    const comments = [];
    if (localStorage.getItem('token') === undefined || localStorage.getItem('token') === null) {
      comments.push(<h4 className="comments-title">Login to join the conversation</h4>);
    } else {
      comments.push(<h3 className="comments-title">Join the conversation. Leave a comment</h3>);
    }
    comments.push(<CommentBox slug={this.props.slug} />);
    comments.push(<br />);
    if (payload.length < 1) {
      comments.push(<h3 className="comments-title">No comments yet. Be first to comment</h3>);
    } else {
      for (const i in payload) {
        const comment = payload[i];
        comments.push(<Comment
          user={comment.user}
          comment={comment.comment.content}
          author={this.props.author}
          slug={this.props.slug}
        />);
      }
    }
    // this.handleCommentsShown();
    return comments;
  };

  render() {
    return (
      <div className="container comments-section">
        {this.props.comments.comments_loading ? <LoadingDots /> : null}
        {this.props.comments.comments !== undefined
          ? this.showComments(this.props.comments.comments)
          : <h4>Login to join the conversation</h4>
        }

      </div>
    );
  }
}

RenderComments.propTypes = {
  slug: PropTypes.string.isRequired,
  articleId: PropTypes.number.isRequired,
  author: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  comments: state.comments,
});

const mapActionsToProps = {
  componentDidMount: articleComments,
  handleCommentsShown: commentsShown,
};

export default connect(mapStateToProps, mapActionsToProps)(RenderComments);
