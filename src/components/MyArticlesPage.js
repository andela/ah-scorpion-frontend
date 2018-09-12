import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import UserNavBar from './UserNavBar';
import Footer from './Footer';
import handleGetMyArticles from '../actions/getMyArticles';
import handleDeleteMyArticle, {
  deleteMyArticleBegin,
  deleteMyArticleCancel,
  deleteMyArticlePostFailure
} from '../actions/deleteMyArticle';
import Loader from './Loader';
import ConfirmDeleteModal from './ConfirmDeleteModal';


class MyArticlesPage extends Component {
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
      error,
      fetchSuccess,
      deleteSuccess,
      confirmDelete,
      isDeleting,
      deletedArticleSlug,
      beginDelete,
      cancelDelete,
      cleanDeleteFailure,
    } = this.props;
    return (
      <React.Fragment>
        <UserNavBar />
        <main className="mt-2em">
          <div className="p-5 container">
            <ConfirmDeleteModal
              confirmDelete={confirmDelete}
              isDeleting={isDeleting}
              deletedArticleSlug={deletedArticleSlug}
              cancelDelete={cancelDelete}
              error={error}
              deleteFailure={deleteFailure}
              cleanDeleteFailure={cleanDeleteFailure}
            />
            <h1>Your Articles</h1>
            <hr />
            { isFetching ? (
              <div className="text-center">
                <Loader />
              </div>
            ) : <MyArticleList articles={articles} beginDelete={beginDelete} />
            }
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
  failure: PropTypes.bool.isRequired,
  success: PropTypes.bool.isRequired,
  errors: PropTypes.shape().isRequired,
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
      <Link to={`./article/${slug}`} className="article-title">{title}</Link>
    </h3>
    <p>{description}</p>
    <div>
      <span className="text-muted">
        <small>
          Created:
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

const MyArticleList = ({ articles, beginDelete }) => {
  if (articles === []) {
    return (
      <div>
        <h4>
        You have not created any articles yet.
        </h4>
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

MyArticleList.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

const mapDispatchToProps = dispatch => (
  {
    getMyArticles: () => dispatch(handleGetMyArticles()),
    confirmDelete: slug => dispatch(handleDeleteMyArticle(slug)),
    beginDelete: slug => dispatch(deleteMyArticleBegin(slug)),
    cancelDelete: () => dispatch(deleteMyArticleCancel()),
    cleanDeleteFailure: () => dispatch(deleteMyArticlePostFailure()),
  }
);

const mapStateToProps = ({ myArticles }) => myArticles;

export default connect(mapStateToProps, mapDispatchToProps)(MyArticlesPage);
