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

  // componentDidMount = () => {
  //   this.props.InitialRate();
  //   console.log('d', this.props);
  // };

  render() {
    const { rating } = this.state;
    return (
      <div>
        <div className="row">
          <StarRatingComponent
            name="rateArticle"
            value={console.log(this.props.rating)}
            onStarClick={this.onStarClick}
          />
          <span style={{ marginLeft: '1em' }}>{rating}</span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  val: state.rate,
});

export default connect(
  mapStateToProps,
  { rateArticle, InitialRate },
)(Rating);
