import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import avatar from '../assets/images/avatar.png';
import likeComment from '../actions/likeComment';
import dislikeComment from '../actions/dislikeComment';
import deleteComment from '../actions/deleteComment';
import CommentBox from './CommentBox';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDelete: false,
      replying: false,
    };

    this.handleLike = this.handleLike.bind(this);
    this.handleDislike = this.handleDislike.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleReply = this.handleReply.bind(this);
  }

  handleLike() {
    this.props.handleLike(this.props.slug, this.props.comment.id);
  }

  handleDislike() {
    this.props.handleDislike(this.props.slug, this.props.comment.id);
  }

  handleDelete() {
    this.props.handleDelete(this.props.slug, this.props.comment.id);
  }

  handleReply() {
    this.setState({ replying: !this.state.replying });
  }

  formatTime(time, prefix = '') {
    return typeof time === 'object' ? prefix + time.toLocaleDateString() : '';
  }


  render() {
    return (
      <React.Fragment>
        <table className="comment-table">
          <tbody>
            <tr>
              <td rowSpan="2" className="avatar-col">
                <img src={avatar} alt="X" className="img img-rounded comment-img" />
              </td>
              <td className="comment-name">
                {this.props.user.username}
                <span className="time-label">
Posted at {' '}
                  {new Date(this.props.comment.createdAt).toLocaleDateString()}
                </span>
              </td>
              <td rowSpan="3" className="options-col">
                <li>
                  <ul>
                    {localStorage.getItem('username') === this.props.user.username
                      ? <button type="button" className="comment-option">Edit</button>
                      : null
                  }
                  </ul>
                  <ul>
                    {localStorage.getItem('username') === this.props.user.username
                  || localStorage.getItem('username') === this.props.author.username
                      ? (
                        <button
                          onClick={this.handleDelete}
                          type="button"
                          className="comment-option"
                        >
                        Delete
                        </button>
                      )
                      : null
                  }
                  </ul>
                  <ul>
                    <button
                      onClick={this.handleReply}
                      type="button"
                      className="comment-option"
                    >
                    Reply
                    </button>
                  </ul>
                </li>
              </td>
            </tr>
            <tr>
              <td className="comment-col">
                {this.props.comment.content}
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <button
                  onClick={this.handleLike}
                  type="button"
                  className="reaction-button like-button"
                >
                  <span
                    className="reaction-count"
                  >
&#128077;
                    <span style={{ marginLeft: 3 }}>{this.props.comment.likes}</span>
                  </span>
                </button>
                <button
                  onClick={this.handleDislike}
                  type="button"
                  className="reaction-button dilike-button"
                >
                  <span
                    className="reaction-count"
                  >
                  &#128078;
                    <span style={{ marginLeft: 3 }}>
                      {' '}
                      {this.props.comment.dislikes}
                    </span>
                  </span>
                </button>
              </td>
            </tr>
            <tr>
              <td />
              <td colSpan="2">
                {this.state.replying
                  ? (
                    <CommentBox
                      editing
                      slug={this.props.slug}
                      parentId={this.props.comment.id}
                      closeReply={this.handleReply}
                    />
                  )
                  : null}
              </td>
            </tr>
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

Comment.propTypes = {
  user: PropTypes.object.isRequired,
  comment: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
  slug: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  comments: state.comments,
});

const mapActionsToProps = {
  handleLike: likeComment,
  handleDislike: dislikeComment,
  handleDelete: deleteComment,
};

export default connect(mapStateToProps, mapActionsToProps)(Comment);
