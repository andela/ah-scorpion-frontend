import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../actions/articleComments';
import '../index.css';

class CommentBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
      hasText: false,
    };
    this.handlePost = this.handlePost.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handlePost(event) {
    event.preventDefault();
    if (this.props.editing) {
      console.log('slug: ', this.props.slug, 'parent ', this.props.parentId, 'value ', this.state.value);
      this.props.handlePost(this.props.slug, this.state.value, this.props.parentId);
      this.props.closeReply();
    } else {
      this.props.handlePost(this.props.slug, this.state.value, 0);
    }

    const commentText = this.refs.commentText;
    commentText.value = '';
  }

  handleChange(event) {
    const value = event.target.value;
    if (/\S/.test(value)) {
      this.setState({ value: event.target.value });
      this.setState({ hasText: true });
    } else {
      this.setState({ value: null });
      this.setState({ hasText: false });
    }
  }

  render() {
    return (
      <div className="row">
        <div className="form-group comments-box">
          <form>
            <textarea
              ref="commentText"
              onChange={this.handleChange}
              className="form-control rounded-0 comment-text"
              id="exampleFormControlTextarea2"
              rows="3"
              placeholder={this.props.editing ? 'Enter your reply' : 'Enter your comment'}
              style={{ height: this.props.editing ? 40 : 100 }}
            />
            <input
              disabled={!this.state.hasText || this.props.comments.posting_comment}
              onClick={this.handlePost}
              type="submit"
              className="btn btn-primary comment-btn"
              value={this.props.comments.posting_comment ? this.props.editing ? 'Posting Reply'
                : 'Posting Comment' : this.props.editing ? 'Post Reply' : 'Post Comment'}
              style={{
                padding: this.props.editing ? 4 : 7,
                fontSize: this.props.editing ? 13 : 16,
              }}
            />
          </form>
        </div>
      </div>
    );
  }
}

CommentBox.propTypes = {
  slug: PropTypes.string.isRequired,
  commentId: PropTypes.number.isRequired,
  parentId: PropTypes.number.isRequired,
  editing: PropTypes.bool.isRequired,
  closeReply: PropTypes.func.isRequired,
  commentBody: PropTypes.string,
};

const mapStateToProps = state => ({
  comments: state.comments,
});

const mapActionsToProps = {
  handlePost: addComment,
};

export default connect(mapStateToProps, mapActionsToProps)(CommentBox);
