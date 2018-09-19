import PropTypes from 'prop-types';
import React from 'react';
import MyArticle from './MyArticle';

const MyArticlesList = ({
  articles,
  beginDelete,
  fetchFailure,
  errorMessage,
}) => {
  if (fetchFailure) {
    return <div className="alert alert-danger text-center">{errorMessage}</div>;
  }

  if (articles.length === 0) {
    return <h4>You have not created any articles yet.</h4>;
  }

  return articles.map((article) => (
    <div>
      <MyArticle
        title={article.title}
        createdAt={article.createdAt}
        description={article.description}
        slug={article.slug}
        key={article.slug}
        beginDelete={beginDelete}
        averageRating={article.averageRating}
        likes={article.likes}
        dislikes={article.dislikes}
        body={article.body}
      />
    </div>
  ));
};

MyArticlesList.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default MyArticlesList;
