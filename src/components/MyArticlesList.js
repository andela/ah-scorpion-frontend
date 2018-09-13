import PropTypes from 'prop-types';
import React from 'react';
import MyArticle from './MyArticle';

const MyArticlesList = ({
  articles, beginDelete, fetchFailure, errorMessage,
}) => {
  if (articles.length === 0) {
    return (
      <h4>You have not created any articles yet.</h4>
    );
  }

  if (fetchFailure) {
    return (
      <div className="alert alert-danger text-center">
        {errorMessage}
      </div>
    );
  }
  return articles.map(article => (
    <MyArticle
      title={article.title}
      createdAt={article.createdAt}
      description={article.description}
      slug={article.slug}
      key={article.slug}
      beginDelete={beginDelete}
    />
  ));
};

MyArticlesList.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default MyArticlesList;
