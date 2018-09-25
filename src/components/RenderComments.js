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
    let comments = {};
    for (const i in payload) {
      const comment = payload[i];
      const parent = comment.comment.content.parent;
      const id = comment.comment.content.id;
      const aComment = comment.comment.content;
      if (parent === null || parent === undefined) {
        comments[id] = {
          comment: aComment,
          children: [],
        };
      } else {
        const aParent = comments[parent];
        let children = aParent.children;
        const mainParent = aParent.comment;
        const parentId = mainParent.id;
        const theChildren = children;
        theChildren.push(aComment);
        children = theChildren;
        comments[parentId] = {
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

  render() {
    return (
      <div className="container comments-section">
        {this.props.comments.message !== undefined
          ? <h3 className="comments-title">{this.props.comments.message}</h3>
          : null}
        {this.props.comments.message !== undefined
        && this.props.comments.message !== 'Please login to view comments'
          ? <CommentBox slug={this.props.slug} /> : null}
        {!this.props.comments.comments_loaded ? (
          <div>
            {' '}
            <br />
            <LoadingDots text="Loading comments" />
          </div>
        ) : null}
        {this.props.comments.comments !== undefined
          ? this.nestComments(this.props.comments.comments)
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
