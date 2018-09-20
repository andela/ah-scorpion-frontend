import React, { Component } from 'react';
import * as PropTypes from 'prop-types';


class NewComment extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        This is a div
        {this.props.isEditing ? (
          <textarea>
          This is the body of the comment
          </textarea>
        )
          : null}

      </div>
    );
  }
}

NewComment.propTypes = {
  isEditing: PropTypes.bool.isRequired,
};
export default NewComment;
