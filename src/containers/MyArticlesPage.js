import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
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
import MyArticlesList from '../components/MyArticlesList';

class MyArticlesPage extends Component {
  /** Perform the api call before the component mounts* */
  componentWillMount() {
    const { getMyArticles } = this.props;
    getMyArticles();
  }

  /** The Page has the User's Navigation Bar, the Confirm Delete Modal, the Loader
   * The ArticlesList and Footer components
   * todo update with the Create Articles button
   * * */
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
            <div className="row">
              <h1>
                My Articles
              </h1>
              <Link to="/new-article" className="ml-auto">
                <Button bsStyle="outline-primary" style={{ height: '100%' }}>New Article</Button>
              </Link>
            </div>
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
  deletedArticleSlug: PropTypes.string.isRequired,
  beginDelete: PropTypes.func.isRequired,
  cancelDelete: PropTypes.func.isRequired,
  cleanUpAfterDelete: PropTypes.func.isRequired,
  getMyArticles: PropTypes.func.isRequired,
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
