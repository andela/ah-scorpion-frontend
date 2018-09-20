import React, { Component } from 'react';
import avatar from '../assets/images/avatar.png';
import PropTypes from 'prop-types';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    return (
      <React.Fragment>
        <table className="comment-table">
          <tr>
            <td rowSpan="2" className="avatar-col">
              <img src={avatar} alt="X" className="img img-rounded comment-img"/>
            </td>
            <td className="comment-name">
              {this.props.user.username}
            </td>
            <td rowSpan="3" className="options-col">
              <li>
                <ul>
                  <button type="button" className="comment-option">Edit</button>
                </ul>
                <ul>
                  <button type="button" className="comment-option">Delete</button>
                </ul>
                <ul>
                  <button type="button" className="comment-option">Reply</button>
                </ul>
              </li>
            </td>
          </tr>
          <tr>
            <td className="comment-col">
              {this.props.comment}
            </td>
          </tr>
          <tr>
            <td colSpan="2">
              <button type="button" className="fa fa-thumbs-up reaction-button"><span
                className="reaction-count">0</span></button>
              <button type="button" className="fa fa-thumbs-down reaction-button"><span
                className="reaction-count">0</span></button>
            </td>
          </tr>
        </table>
      </React.Fragment>
    );
  }
}

Comment.propTypes = {
  user: PropTypes.object.isRequired,
  comment: PropTypes.string.isRequired,
};

export default Comment;
