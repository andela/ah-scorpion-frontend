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

  showComments = (payload) => {
    const comments = [];
    if (this.props.comments.comments_loaded) {
      if (this.props.comments.comment_count < 1) {
        comments.push(<h3 className="comments-title">No comments yet. Be first to comment</h3>);
      } else {
        if (payload === [] || payload === undefined || payload === null) return null;
        if (localStorage.getItem('token') === undefined || localStorage.getItem('token') === null) {
          comments.push(<h4 className="comments-title">Login to join the conversation</h4>);
        } else {
          comments.push(<h3 className="comments-title">Join the conversation. Leave a comment</h3>);
        }
        comments.push(<CommentBox slug={this.props.slug} />);
        comments.push(<br />);
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
    }
    // this.handleCommentsShown();
    return comments;
  };

  render() {
    return (
      <div className="container comments-section">
        {!this.props.comments.comments_loaded ? (
          <div>
            {' '}
            <br />
            <LoadingDots />
          </div>
        ) : null}
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
