import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as DateDiff from 'date-diff';
import { connect } from 'react-redux';

const dateFormat = require('dateformat');

const startOfDay = new Date();
startOfDay.setHours(0, 0, 0, 0);

class CommentHistory extends Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
    this.renderHistory = this.renderHistory.bind(this);
  }

  renderHistory(history) {
    const comments = [];
    for (const i in history) {
      const comment = history[i];
      let date = comment.date_created;
      let content = comment.comment;

      date = new DateDiff(new Date(),
        new Date(date)).seconds() < 60
        ? 'Just now'
        : new DateDiff(new Date(),
          new Date(date)).minutes() < 60
          ? (`${Math.round(new DateDiff(new Date(),
            new Date(date)).minutes())} minutes ago`)
          : new DateDiff(startOfDay,
            new Date(date)).days() > 1
            ? dateFormat(new Date(date),
              'dd mmm yyyy, HH:MM:ss')
            : new DateDiff(startOfDay,
              new Date(date)).days() > 0
              ? `Yesterday at ${dateFormat(new Date(date),
                'HH:MM:ss')}`
              : `Today at ${dateFormat(new Date(date),
                'HH:MM:ss')}`;
      content = `${date}:  ${content}`;
      comments.push(<tr>
        <td style={{ paddingLeft: '1em' }}>
          {content}
        </td>
      </tr>);
    }
    return comments;
  }

  render() {
    return (
      <div>
        <table
          style={{
            width: '40em',
          }}
          className="comment-table"
        >
          <thead>
            <tr>
              <td style={{
                fontSize: '12px',
                fontWeight: 'bold',
              }}
              />
            </tr>
          </thead>
          <tbody style={{
            backgroundColor: 'whitesmoke',
            border: 'lightgrey solid 1px',
            borderRadius: '200',
            marginLeft: '1em',
          }}
          >
            <tr>
              <td>
                {this.props.comments.history !== undefined
                  ? 'Comment edit history' : null}
              </td>
            </tr>
            {this.props.comments.history !== undefined
              ? this.renderHistory(this.props.comments.history)
              : null}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  comments: state.comments,
});

CommentHistory.propTypes = {
  show: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(CommentHistory);
