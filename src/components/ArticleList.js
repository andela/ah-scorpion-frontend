import PropTypes from 'prop-types';
import React from 'react';
import Article from './Article';

const ArticlesList = ({ articles, fetchFailure, errorMessage }) => {
  if (fetchFailure) {
    return <div className="alert alert-danger text-center">{errorMessage}</div>;
  }

  if (articles.length === 0) {
    return <h4>There is currently no article available.</h4>;
  }

  return articles.map((article) => {
    const imgBase = JSON.parse(article.body).entityMap[0];
    return (
      <Article
        title={article.title}
        createdAt={article.createdAt}
        description={article.description}
        slug={article.slug}
        key={article.slug}
        averageRating={article.averageRating}
        likes={article.likes}
        dislikes={article.dislikes}
        image={imgBase ? imgBase.data.src : ''}
        author={article.author.username}
      />
    );
  });
};

ArticlesList.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default ArticlesList;
