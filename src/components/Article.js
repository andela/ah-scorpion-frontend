import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

const getReadingTime = (body) => {
  const blocks = JSON.parse(body).blocks;
  const text = blocks.map(obj => obj.text);
  const words = text.join(' ');
  const wordsPerMinute = 270;
  const time = Math.round(words.split(' ').length / wordsPerMinute);
  const readTime = time <= 0 ? 1 : time;
  return readTime;
};

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
  body,
}) => (
  <div className="col-4 p-5">
    <div className="card img-card pb-2">
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
        <small className="text-muted">{getReadingTime(body)} min read</small>
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
  body: PropTypes.shape().isRequired,
};

Article.defaultProps = {
  averageRating: null,
};

export default Article;
