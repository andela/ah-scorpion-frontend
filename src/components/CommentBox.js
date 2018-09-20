import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { articleComments, commentsShown } from '../actions/articleComments';
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

  handlePost() {
    console.log('slug: ', this.props.slug);
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
          <textarea
            onChange={this.handleChange}
            className="form-control rounded-0 comment-text"
            id="exampleFormControlTextarea2"
            rows="3"
          />
          <button
            disabled={!this.state.hasText}
            onClick={this.handlePost}
            type="button"
            className="btn btn-primary comment-btn"
          >
            Post Comment
          </button>
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
  commentBody: PropTypes.string,
};

const mapStateToProps = state => ({
  comment: state.comment,
});

const mapActionsToProps = {
  componentDidMount: articleComments,
  handleCommentsShown: commentsShown,
};

export default connect(mapStateToProps, mapActionsToProps)(CommentBox);
