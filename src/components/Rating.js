import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';
import { connect } from 'react-redux';
import { rateArticle, InitialRate } from '../actions/rateAction';

class Rating extends Component {
  onStarClick = (nextValue) => {
    this.props.rateArticle(nextValue);
    this.setState({ rating: nextValue });
  };

  componentDidMount = () => {
    this.props.InitialRate();
  };

  render() {
    const { rate } = this.props;
    return (
      <div>
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
      </div>
    );
  }
}

const mapStateToProps = ({ rate }) => ({
  rate,
});

export default connect(
  mapStateToProps,
  { rateArticle, InitialRate },
)(Rating);
