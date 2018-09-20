import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import articleComments from '../actions/articleComments';
import Comment from './Comment';

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
    for (const i in payload) {
      const comment = payload[i];
      comments.push(<Comment
        user={comment.user}
        comment={comment.comment.content}
        author={this.props.author}
        slug={this.props.slug}
      />);
    }
    return comments;
  };

  render() {
    return (
      <div className="container comments-section">
        <h3 className="comments-title">Join the conversation. Leave a comment</h3>
        {this.props.comments.comments !== undefined
          ? this.showComments(this.props.comments.comments)
          : null
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
};

export default connect(mapStateToProps, mapActionsToProps)(RenderComments);
