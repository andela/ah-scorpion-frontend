import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { rateArticle, InitialRate } from '../actions/rateAction';

class Rating extends Component {
  componentDidMount = () => {
    this.props.InitialRate();
  };

  onStarClick = (nextValue) => {
    this.props.rateArticle(nextValue);
    this.setState({ rating: nextValue });
  };

  render() {
    const { rate } = this.props;
    return (
      <React.Fragment>
        <div className="row" style={{ justifyContent: 'flex-end', marginRight: 'auto' }}>
          <StarRatingComponent
            name="rateArticle"
            value={rate.rating}
            onStarClick={this.onStarClick}
          />
        </div>
        {rate.errorMessage ? (
          <div
            className="alert alert-danger"
            role="alert"
            style={{ float: 'right', fontSize: '12px' }}
          >
            <strong>Ooops!</strong>
            {' '}
            {rate.errorMessage}
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ rate }) => ({
  rate,
});

Rating.propTypes = {
  InitialRate: PropTypes.func.isRequired,
  rateArticle: PropTypes.func.isRequired,
  rate: PropTypes.shape().isRequired,
};
export default connect(
  mapStateToProps,
  { rateArticle, InitialRate },
)(Rating);
