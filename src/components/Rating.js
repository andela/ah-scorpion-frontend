import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';
import { connect } from 'react-redux';
import { rateArticle } from '../actions/rateAction';
import { InitialRate } from '../actions/rateAction';

class Rating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
    };
  }

  onStarClick = (nextValue) => {
    this.props.rateArticle(nextValue);
    this.setState({ rating: nextValue });
  };

  render() {
    const { rating } = this.state;
    return (
      <div>
        <div className="row">
          <StarRatingComponent name="rateArticle" value={rating} onStarClick={this.onStarClick} />
          <span style={{ marginLeft: '1em' }}>{rating}</span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ rate }) => ({
  rate,
});

export default connect(
  mapStateToProps,
  { rateArticle },
)(Rating);
