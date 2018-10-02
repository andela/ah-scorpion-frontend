import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
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
import './MyArticlesPage.css';

const { REACT_APP_BASE_URL } = process.env;
const articlesUrl = `${REACT_APP_BASE_URL}/articles/`;

const getMyUsername = () => localStorage.getItem('username');


class MyArticlesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      perPage: 5,
      pageCount: 1,
    };
  }

  componentWillMount() {
    const { getMyArticles } = this.props;
    const { perPage, offset } = this.state;
    getMyArticles(perPage, offset);
    axios.get(`${articlesUrl}?author__username=${getMyUsername()}`).then(({ data }) => {
      const pageCount = Math.ceil(data.length / perPage);
      this.setState({ pageCount });
    }).catch((error) => {
      console.log(error);
    });
  }

  handlePageClick = (data) => {
    const { selected } = data;
    const { perPage } = this.state;
    const { getMyArticles } = this.props;
    const offset = Math.ceil(selected * perPage);
    this.setState({ offset }, () => {
      getMyArticles(perPage, offset);
    });
  };

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
      history,
    } = this.props;
    const { pageCount } = this.state;
    return (
      <React.Fragment>
        <UserNavBar history={history} />
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
            <div className="row" style={{ padding: '0 0.75em' }}>
              <h2>My Articles</h2>
              <Link to="/article/new" className="ml-auto">
                <Button bsStyle="outline-primary" style={{ height: '100%' }}>
                  New Article
                </Button>
              </Link>
            </div>
            <hr />
            {isFetching ? (
              <div className="text-center">
                <Loader />
              </div>
            ) : (
              <MyArticlesList
                articles={articles}
                beginDelete={beginDelete}
                fetchFailure={fetchFailure}
                errorMessage={errorMessage}
              />
            )}
            <ReactPaginate
              previousLabel="previous"
              nextLabel="next"
              breakLabel={<a href="">...</a>}
              breakClassName="break-me"
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={this.handlePageClick}
              containerClassName="pagination"
              activeClassName="page-item active"
              disabledClassName="page-item disabled"
              pageClassName="page-item"
              extraAriaContext="Page navigation example"
            />
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
  history: PropTypes.shape().isRequired,
};

const mapDispatchToProps = dispatch => ({
  getMyArticles: (limit, offset) => dispatch(handleGetMyArticles(limit, offset)),
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
