import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

const Article = ({
  title,
  description,
  image,
  createdAt,
  slug,
  averageRating,
  likes,
  dislikes,
  author,
}) => (
  <div className="col-4 p-5">
    <div className="card img-card">
      <h5 className="card-title text-center pt-2">
        <Link to={`/article/${slug}`} className="article-title">
          {title}
        </Link>
      </h5>
      <img
        className="card-img-top card-image-custom"
        alt=""
        style={{ backgroundColor: 'rgb(21, 127, 251)' }}
        src={image}
      />
      <div className="card-body">
        <p className="card-text card-overflow">{description}</p>
        <br />
        <small className="text-muted">
          author:
          {` ${author}`}
        </small>
        <div className="d-flex justify-content-between align-items-center">
          <small className="text-muted">
            created:
            {` ${new Date(createdAt).toDateString()}`}
          </small>
        </div>
      </div>
      <div className="row px-4">
        <div className="col-1 text-center">
          <i className="text-warning fa fa-star" />
          <br />
          <small>{averageRating || ' - '}</small>
        </div>
        <div className="col-1 text-center">
          <i className="text-success fa fa-thumbs-up" />
          <br />
          <small>{likes}</small>
        </div>
        <div className="col-1 text-center">
          <i className="text-danger fa fa-thumbs-down" />
          <br />
          <small>{dislikes}</small>
        </div>
        <div className="ml-auto">
          <Link to={`/article/${slug}`} className="ml-auto">
            <button type="button" className="btn btn-sm btn-outline-primary">
              Read More
            </button>
          </Link>
        </div>
      </div>
    </div>
  </div>
);

Article.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  averageRating: PropTypes.number,
  likes: PropTypes.number.isRequired,
  dislikes: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
};

Article.defaultProps = {
  averageRating: null,
};

export default Article;
