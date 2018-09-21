import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment, editComment } from '../actions/articleComments';
import '../index.css';

class CommentBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.editing ? this.props.commentBody : null,
      hasText: false,
    };
    this.handlePost = this.handlePost.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handlePost(event) {
    event.preventDefault();
    if (this.props.replying) {
      this.props.handlePost(this.props.slug, this.state.value, this.props.parentId);
    } else {
      this.props.handlePost(this.props.slug, this.state.value, 0);
    }
    this.props.closeReply();
    const commentText = this.refs.commentText;
    commentText.value = '';
  }

  handleUpdate(event) {
    event.preventDefault();
    this.props.handleUpdate(this.props.slug, this.state.value, this.props.commentId);
    const commentText = this.refs.commentText;
    this.props.closeReply();
    commentText.value = '';
  }

  handleChange(event) {
    const value = event.target.value;
    if (/\S/.test(value)) {
      this.setState({ value });
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
              placeholder={this.props.replying ? 'Enter your reply' : 'Enter your comment'}
              style={{ height: this.props.replying || this.props.editing ? 40 : 100 }}
              value={this.props.editing ? this.state.value : null}
            />
            <input
              disabled={!this.state.hasText || this.props.comments.posting_comment}
              onClick={this.props.editing ? this.handleUpdate : this.handlePost}
              type="submit"
              className="btn btn-primary comment-btn"
              value={this.props.comments.posting_comment ? this.props.replying ? 'Posting Reply...'
                : this.props.editing ? 'Updating Comment...'
                  : 'Posting Comment...' : this.props.replying ? 'Post Reply'
                : this.props.editing ? 'Update Comment'
                  : 'Post Comment'}
              style={{
                padding: this.props.replying || this.props.editing ? 4 : 7,
                fontSize: this.props.replying || this.props.editing ? 13 : 16,
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
  replying: PropTypes.bool.isRequired,
  closeReply: PropTypes.func.isRequired,
  commentBody: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  comments: state.comments,
});

const mapActionsToProps = {
  handlePost: addComment,
  handleUpdate: editComment,
};

export default connect(mapStateToProps, mapActionsToProps)(CommentBox);
