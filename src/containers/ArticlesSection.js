import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Footer from '../components/Footer';
import handleGetArticles from '../actions/getArticles';
import Loader from '../components/Loader';
import ArticlesList from '../components/ArticleList';

class ArticlesSection extends Component {
  componentWillMount() {
    const { getArticles } = this.props;
    getArticles();
  }

  render() {
    const {
      isFetching, articles, fetchFailure, errorMessage,
    } = this.props;

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
  getArticles: () => dispatch(handleGetArticles()),
});

const mapStateToProps = ({ AllArticles }) => AllArticles;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArticlesSection);
