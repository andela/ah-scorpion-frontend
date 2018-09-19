import React, { Component } from 'react';

class ReadTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      readTime: 2,
    };
  }

  componentWillMount() {
    const { body } = this.props;
    this.setReadingTime(body);
  }

  setReadingTime(body) {
    const blocks = JSON.parse(body).blocks;
    const text = blocks.map((obj) => obj.text);
    const words = text.join(' ');
    this.countWords(words);
  }

  countWords(words) {
    const wordsPerMinute = 270;
    const time = Math.round(words.split(' ').length / wordsPerMinute);
    const readTime = time <= 0 ? 1 : time;

    this.setState({
      readTime: readTime,
    });
  }

  render() {
    const { readTime } = this.state;
    return (
      <div className="ml-auto">
        <h6>{readTime} min read</h6>
      </div>
    );
  }
}
export default ReadTime;
