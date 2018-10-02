import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import Footer from '../components/Footer';
import handleGetArticles from '../actions/getArticles';
import Loader from '../components/Loader';
import ArticlesList from '../components/ArticleList';
import './MyArticlesPage.css';

const { REACT_APP_BASE_URL } = process.env;
const articlesUrl = `${REACT_APP_BASE_URL}/articles/`;


class ArticlesSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      perPage: 6,
      pageCount: 1,
    };
  }

  componentWillMount() {
    const { getArticles } = this.props;
    const { perPage, offset } = this.state;
    getArticles(perPage, offset);
    axios.get(articlesUrl).then(({ data }) => {
      const pageCount = Math.ceil(data.length / perPage);
      this.setState({ pageCount });
    }).catch((error) => {
      console.log(error);
    });
  }

  handlePageClick = (data) => {
    const { selected } = data;
    const { perPage } = this.state;
    const { getArticles } = this.props;
    const offset = Math.ceil(selected * perPage);
    this.setState({ offset }, () => {
      getArticles(perPage, offset);
    });
  };


  render() {
    const {
      isFetching, articles, fetchFailure, errorMessage,
    } = this.props;
    const { pageCount } = this.state;

    return (
      <React.Fragment>
        <main>
          <div className="text-center py-5 dashboard-banner" style={{ height: '350px' }}>
            <div className="container">
              <div className="row my-5 justify-content-center">
                <div className="col-md-9">
                  <h1>Interesting Reads</h1>
                  <p className="lead text-white">
                    The articles are expertly written and captivating, the creators Make them short
                    and sweet, but not too short so folks don
                    {"'"}
t simply skip over them entirely.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="py-4 bg-light">
            <div className="container">
              {isFetching ? (
                <div className="text-center">
                  <Loader />
                </div>
              ) : (
                <div className="row">
                  <ArticlesList
                    articles={articles}
                    fetchFailure={fetchFailure}
                    errorMessage={errorMessage}
                  />
                </div>
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
          </div>
        </main>
        <Footer />
      </React.Fragment>
    );
  }
}

ArticlesSection.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  articles: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  fetchFailure: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  getArticles: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  getArticles: (limit, offset) => dispatch(handleGetArticles(limit, offset)),
});

const mapStateToProps = ({ AllArticles }) => AllArticles;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArticlesSection);
