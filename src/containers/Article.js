import React, { Component } from 'react';
import Footer from '../components/Footer';
import ArticleExample from '../components/ArticleExample';

class Article extends Component {
  render() {
    return (
      <div>
        <ArticleExample />
        <Footer />
      </div>
    );
  }
}

export default Article;
