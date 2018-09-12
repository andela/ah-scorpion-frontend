import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import UserNavBar from '../components/UserNavBar';
import Footer from '../components/Footer';
import handleGetMyArticles from '../actions/getMyArticles';
import handleDeleteMyArticle, {
  deleteMyArticleBegin,
  deleteMyArticleCancel,
  postRequestCleanUp,
} from '../actions/deleteMyArticle';
import Loader from '../components/Loader';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';

class MyArticlesPage extends Component {
  /** Perform the api call before the component mounts* */
  componentWillMount() {
    const { getMyArticles } = this.props;
    getMyArticles();
  }

  render() {
    const {
      isFetching,
      articles,
      fetchFailure,
      deleteFailure,
      errorMessage,
      deleteSuccess,
      confirmDelete,
      isDeleting,
      deletedArticleSlug,
      beginDelete,
      cancelDelete,
      cleanUpAfterDelete,
    } = this.props;
    return (
      <React.Fragment>
        <UserNavBar />
        <main className="py-5">
          <div className="mt-5 container">
            <ConfirmDeleteModal
              confirmDelete={confirmDelete}
              isDeleting={isDeleting}
              deletedArticleSlug={deletedArticleSlug}
              cancelDelete={cancelDelete}
              errorMessage={errorMessage}
              deleteFailure={deleteFailure}
              postRequestCleanUp={cleanUpAfterDelete}
              deleteSuccess={deleteSuccess}
            />
            <h1>Your Articles</h1>
            <hr />
            {isFetching ? (
              <div className="text-center">
                <Loader />
              </div>
            ) : (
              <div className="container">
                <MyArticlesList
                  articles={articles}
                  beginDelete={beginDelete}
                  fetchFailure={fetchFailure}
                  errorMessage={errorMessage}
                />
              </div>
            )}
          </div>
        </main>
        <Footer />
      </React.Fragment>
    );
  }
}

MyArticlesPage.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  articles: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  fetchFailure: PropTypes.bool.isRequired,
  deleteFailure: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  deleteSuccess: PropTypes.bool.isRequired,
  confirmDelete: PropTypes.func.isRequired,
  isDeleting: PropTypes.bool.isRequired,
  deletedArticleSlug: PropTypes.func.isRequired,
  beginDelete: PropTypes.func.isRequired,
  cancelDelete: PropTypes.func.isRequired,
  cleanUpAfterDelete: PropTypes.func.isRequired,
  getMyArticles: PropTypes.func.isRequired,
};

const Button = ({ className, buttonText, ...rest }) => (
  <button type="button" className={`btn btn-${className}`} {...rest}>
    {buttonText}
  </button>
);

Button.propTypes = {
  className: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
};

const MyArticle = ({
  title, description, createdAt, slug, beginDelete,
}) => (
  <div>
    <h3>
      <Link to={`./article/${slug}`} className="article-title">
        {title}
      </Link>
    </h3>
    <p>{description}</p>
    <div>
      <span className="text-muted">
        <small>
          Created:
          {' '}
          {new Date(createdAt).toDateString()}
        </small>
      </span>
      <span className="ml-5">
        <Button className="primary" buttonText="Edit" />
        <Button
          className="danger ml-2"
          buttonText="Delete"
          data-toggle="modal"
          data-target="#confirmDeleteModal"
          onClick={() => beginDelete(slug)}
        />
      </span>
      <hr />
    </div>
  </div>
);

MyArticle.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
};

const MyArticlesList = ({
  articles, beginDelete, fetchFailure, errorMessage,
}) => {
  if (articles === []) {
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

const mapDispatchToProps = dispatch => ({
  getMyArticles: () => dispatch(handleGetMyArticles()),
  confirmDelete: slug => dispatch(handleDeleteMyArticle(slug)),
  beginDelete: slug => dispatch(deleteMyArticleBegin(slug)),
  cancelDelete: () => dispatch(deleteMyArticleCancel()),
  cleanUpAfterDelete: () => dispatch(postRequestCleanUp()),
});

const mapStateToProps = ({ myArticles }) => myArticles;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyArticlesPage);
