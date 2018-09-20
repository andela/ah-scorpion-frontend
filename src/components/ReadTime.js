import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ReadTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      readTime: 1,
    };
  }

  componentWillMount() {
    const { body } = this.props;
    const blocks = JSON.parse(body).blocks;
    this.setReadingTime(blocks);
  }

  setReadingTime(body) {
    const text = body.map(obj => obj.text);
    const words = text.join(' ');
    this.countWords(words);
  }

  countWords(words) {
    const wordsPerMinute = 270;
    const time = Math.round(words.split(' ').length / wordsPerMinute);
    const readTime = time <= 0 ? 1 : time;

    this.setState({
      readTime,
    });
  }

  render() {
    const { readTime } = this.state;
    return (
      <div className="ml-auto">
        <h6>
          {readTime}
          {' '}
min read
        </h6>
      </div>
    );
  }
}

ReadTime.propTypes = {
  body: PropTypes.shape().isRequired,
};

export default ReadTime;
