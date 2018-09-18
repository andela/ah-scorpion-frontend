import React, { Component } from 'react';
import Rating from './Rating';

export default class ArticleExample extends Component {
  render() {
    return (
      <div className="container" style={{ marginTop: '2.5em' }}>
        <h2>Read an Article</h2>
        <br />
        <Rating />
      </div>
    );
  }
}
