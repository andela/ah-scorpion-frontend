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
  }


  showComments = (payload) => {
    console.log('we are here', payload);
    const comments = [];

    for (let i in payload) {
      const comment = payload[i];
      console.log('Comment= ', comment.comment);
      comments.push(<Comment user={comment.user} comment={comment.comment} />);
    }
    return comments;
  }

  render() {
    return (
      <div className="container comments-section">
        Join the conversation. Leave a comment
        {console.log("Props", this.props)}
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
};

const mapStateToProps = state => ({
  comments: state.comments,
});

const mapActionsToProps = {
  componentDidMount: articleComments,
};

export default connect(mapStateToProps, mapActionsToProps)(RenderComments);
