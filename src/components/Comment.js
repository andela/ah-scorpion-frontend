import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import * as DateDiff from 'date-diff';
import avatar from '../assets/images/user_avatar.png';
import likeComment from '../actions/likeComment';
import dislikeComment from '../actions/dislikeComment';
import deleteComment from '../actions/deleteComment';
import CommentBox from './CommentBox';
import { commentHistory } from '../actions/articleComments';
import CommentHistory from './CommentHistory';
import Modal from './index';

const dateFormat = require('dateformat');

const startOfDay = new Date();
startOfDay.setHours(0, 0, 0, 0);

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDelete: false,
      replying: false,
      editing: false,
      visible: false,
    };

    this.handleLike = this.handleLike.bind(this);

    this.handleDislike = this.handleDislike.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleReply = this.handleReply.bind(this);
    this.handleEditing = this.handleEditing.bind(this);
    this.getCommentHistory = this.getCommentHistory.bind(this);

    this.popoverRight = (
      <Popover className="comment-delete-popover">
        <button
          type="button"
          className="comment-option text-danger"
          onClick={() => this.handleDelete()}
        >
          Confirm Delete
        </button>
      </Popover>
    );
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
    this.setState({
      replying: !this.state.replying,
      editing: false,
    });
  }

  handleEditing() {
    this.setState({
      editing: !this.state.editing,
      replying: false,
    });
  }

  getCommentHistory() {
    this.props.getCommentHistory(this.props.slug, this.props.comment.id);
  }

  openModal() {
    this.getCommentHistory();
    this.setState({
      visible: true,
    });
  }

  closeModal() {
    this.setState({
      visible: false,
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className={this.props.isChild ? 'child-comment' : null}>
          <table className="comment-table">
            <tbody>
              <tr>
                <td rowSpan="2" className="avatar-col">
                  <img
                    src={this.props.user.image === undefined
                  || this.props.user.image === null
                  || this.props.user.image === 'null'
                  || this.props.user.image === '' ? avatar : this.props.user.image}
                    alt="X"
                    className="img img-rounded comment-img"
                  />
                </td>
                <td className="comment-name">
                  {this.props.user.username}
                  <span className="time-label">
                    {' '}
                    {this.props.comment.createdAt === 'Updating...'
                  || this.props.comment.createdAt === 'Posting...'
                  || this.props.comment.createdAt === undefined
                      ? this.props.comment.createdAt
                      : new DateDiff(new Date(),
                        new Date(this.props.comment.createdAt)).seconds() < 60
                        ? 'Just now'
                        : new DateDiff(new Date(),
                          new Date(this.props.comment.createdAt)).minutes() < 60
                          ? (`${Math.round(new DateDiff(new Date(),
                            new Date(this.props.comment.createdAt)).minutes())} minutes ago`)
                          : new DateDiff(startOfDay,
                            new Date(this.props.comment.createdAt)).days() > 1
                            ? dateFormat(new Date(this.props.comment.createdAt),
                              'dd mmm yyyy, HH:MM:ss')
                            : new DateDiff(startOfDay,
                              new Date(this.props.comment.createdAt)).days() > 0
                              ? `Yesterday at ${dateFormat(new Date(this.props.comment.createdAt),
                                'HH:MM:ss')}`
                              : `Today at ${dateFormat(new Date(this.props.comment.createdAt),
                                'HH:MM:ss')}`}
                  </span>
                </td>
                <td rowSpan="3" className="options-col">
                  <li>
                    <ul>
                      {localStorage.getItem('username') === this.props.user.username
                        ? (
                          <button
                            onClick={this.handleEditing}
                            type="button"
                            className="comment-option"
                          >
                          Edit
                          </button>
                        )
                        : null
                    }
                    </ul>
                    <ul>
                      {localStorage.getItem('username') === this.props.user.username
                    || localStorage.getItem('username') === this.props.author.username
                        ? (
                          <OverlayTrigger
                            trigger="click"
                            placement="right"
                            overlay={this.popoverRight}
                          >
                            <button
                              type="button"
                              className="comment-option"
                            >
                            Delete
                            </button>
                          </OverlayTrigger>
                        )
                        : null
                    }
                    </ul>
                    {!this.props.isChild
                      ? (
                        <ul>
                          <button
                            onClick={this.handleReply}
                            type="button"
                            className="comment-option"
                          >
                          Reply
                          </button>
                        </ul>
                      )
                      : null}
                  </li>
                </td>
              </tr>
              <tr>
                <td
                  className="comment-col"
                >
                  {this.props.comment.content}
                </td>
              </tr>
              <tr className="reactions">
                <td colSpan="2">
                  <tr>
                    <td>
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
                    </td>
                    <td>
                      <button
                        onClick={this.handleDislike}
                        type="button"
                        className="reaction-button dilike-button"
                      >
                        <span
                          className="reaction-count"
                        >
                  &#128078;
                          <span style={{ marginLeft: 3 }}>{this.props.comment.dislikes}</span>
                        </span>
                      </button>
                    </td>
                    <td className="edited-col">
                      {this.props.comment.createdAt !== 'Updating...'
                    && this.props.comment.createdAt !== 'Posting...'
                    && this.props.comment.createdAt !== undefined
                     && dateFormat(new Date(this.props.comment.createdAt), 'dd mmm yyyy, HH:MM:ss')
                    !== dateFormat(new Date(this.props.comment.updatedAt), 'dd mmm yyyy, HH:MM:ss')
                        ? (
                          <button
                            onClick={() => this.openModal()}
                            type="button"
                            className="link edited-btn"
                          >
edited
                          </button>
                        )
                        : null}
                    </td>
                  </tr>
                </td>
              </tr>
              <tr>
                <td />
                <td colSpan="2">
                  {(this.state.replying || this.state.editing)
                    ? (
                      <CommentBox
                        editing={this.state.editing}
                        replying={this.state.replying}
                        slug={this.props.slug}
                        parentId={this.props.comment.id}
                        commentId={this.props.comment.id}
                        closeReply={this.state.replying ? this.handleReply : this.handleEditing}
                        commentBody={this.props.comment.content}
                      />
                    )
                    : null}
                </td>
              </tr>
            </tbody>
          </table>
          <Modal visible={this.state.visible} width="600" height="500" effect="fadeInUp" onClickAway={() => this.closeModal()}>
            <div>
              <h6 style={{
                padding: '1em',
                margin: '0 auto',
              }}>Edit history</h6>
              <div className="container">
                { this.props.comments.history !== undefined
                  ? <CommentHistory history={this.props.comments.history} />
                  : null}
              </div>
              <a style={{
                bottom: '0',
                position: 'absolute',
                float: 'right',
                margin: '1.5em',
              }}
                 className="btn btn-default"
                 href="javascript:void(0);" onClick={() => this.closeModal()}>Close</a>
            </div>
          </Modal>

        </div>
      </React.Fragment>
    );
  }
}

Comment.propTypes = {
  user: PropTypes.object.isRequired,
  comment: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
  isChild: PropTypes.bool.isRequired,
  slug: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  comments: state.comments,
});

const mapActionsToProps = {
  handleLike: likeComment,
  handleDislike: dislikeComment,
  handleDelete: deleteComment,
  getCommentHistory: commentHistory,
};

export default connect(mapStateToProps, mapActionsToProps)(Comment);
