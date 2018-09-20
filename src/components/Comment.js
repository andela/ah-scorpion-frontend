import React, { Component } from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import avatar from '../assets/images/avatar.png';
import likeComment from '../actions/likeComment';
import dislikeComment from '../actions/dislikeComment';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleLike = this.handleLike.bind(this);
    this.handleDislike = this.handleDislike.bind(this);
  }

  handleLike() {
    this.props.handleLike(this.props.slug, this.props.comment.id);
  }

  handleDislike() {
    this.props.handleDislike(this.props.slug, this.props.comment.id);
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
                      ? <button type="button" className="comment-option">Delete</button>
                      : null
                  }
                  </ul>
                  <ul>
                    <button type="button" className="comment-option">Reply</button>
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
                    {this.props.comment.likes}
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
                    {this.props.comment.dislikes}
                  </span>
                </button>
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
};

export default connect(mapStateToProps, mapActionsToProps)(Comment);
