import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as DateDiff from 'date-diff';
import LoadingDots from './LoadingDots';

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
      const content = comment.comment;

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
      comments.push(<tr>
        <td style={{
          fontSize: '12px',
          width: '15em',
        }}
        >
          {date}
        </td>
        <td style={{
          fontSize: '12px',
          borderLeft: 'grey solid 1px',
        }}
        >
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
            width: '100%',
          }}
          className="table table-hover comment-table"
        >
          <thead
            style={{
              backgroundColor: 'lightgray',
              fontWeight: 'bold',
            }}
          >
            <tr>
              <td style={{
                fontSize: '12px',
                fontWeight: 'bold !important',
                width: '15em',
              }}
              >
              Date Created
              </td>
              <td style={{
                fontSize: '12px',
                fontWeight: 'bold',
                borderLeft: 'grey solid 1px',
              }}
              >
                Content
              </td>
            </tr>
          </thead>
          <tbody style={{
            backgroundColor: 'whitesmoke',
            border: 'lightgrey solid 1px',
            borderRadius: '200',
            marginLeft: '1em',
          }}
          >
            {this.props.history !== undefined
              ? this.renderHistory(this.props.history)
              : null}
          </tbody>
        </table>
      </div>
    );
  }
}

CommentHistory.propTypes = {
  history: PropTypes.object.isRequired,
};

export default CommentHistory;
