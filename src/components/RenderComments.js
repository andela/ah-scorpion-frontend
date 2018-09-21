import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  articleComments,
  commentsShown,
} from '../actions/articleComments';
import Comment from './Comment';
import LoadingDots from './LoadingDots';
import CommentBox from './CommentBox';

class RenderComments extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    this.props.componentDidMount(this.props.slug);
  };


  nestComments = (payload) => {
    let comments = [];
    for (const i in payload) {
      const comment = payload[i];
      const parent = comment.comment.content.parent;
      const id = comment.comment.content.id;
      if (parent === null) {
        comments[id] = {
          comment: comment.comment.content,
          children: [],
        };
      } else {
        const aParent = comments[parent];
        let children = aParent.children;
        const mainParent = aParent.comment;
        const theChildren = children;
        theChildren.push(comment.comment.content);
        children = theChildren;
        comments[id] = {
          comment: mainParent,
          children,
        };
      }
    }
    const commentsMap = comments;
    comments = [];
    for (const key in commentsMap) {
      if (commentsMap.hasOwnProperty(key)) {
        const object = commentsMap[key];
        let comment = object.comment;
        const children = object.children;

        console.log('content = ', comment.content);

        comments.push(<Comment
          user={comment.user}
          comment={comment}
          author={this.props.author}
          slug={this.props.slug}
          isChild={false}
        />);

        if (object.children !== []) {
          for (const index in children) {
            comment = children[index];
            comments.push(<Comment
              user={comment.user}
              comment={comment}
              author={this.props.author}
              slug={this.props.slug}
              isChild
            />);
          }
        }
      }
    }

    return comments;
  };

  showComments = (payload) => {
    const comments = [];
    if (this.props.comments.comments_loaded) {
      if (this.props.comments.comment_count < 1) {
        comments.push(<h3 className="comments-title">No comments yet. Be first to comment</h3>);
      } else {
        if (payload === [] || payload === undefined || payload === null) return null;
        if (localStorage.getItem('token') === undefined || localStorage.getItem('token') === null) {
          comments.push(<h4 className="comments-title">Login to join the conversation</h4>);
        } else {
          comments.push(<h3 className="comments-title">Join the conversation. Leave a comment</h3>);
        }
        comments.push(<CommentBox slug={this.props.slug} />);
        comments.push(<br />);
        return this.nestComments(payload);
      }
    }
    // this.handleCommentsShown();
    return comments;
  };


  render() {
    return (
      <div className="container comments-section">
        {!this.props.comments.comments_loaded ? (
          <div>
            {' '}
            <br />
            <LoadingDots text="Loading comments" />
          </div>
        ) : null}
        {this.props.comments.comments !== undefined
          ? this.showComments(this.props.comments.comments)
          : <h4>Login to join the conversation</h4>
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
  handleCommentsShown: commentsShown,
};

export default connect(mapStateToProps, mapActionsToProps)(RenderComments);
