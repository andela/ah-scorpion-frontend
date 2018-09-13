import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import React from 'react';


const MyArticle = ({
  title, description, createdAt, slug, beginDelete,
}) => (
  <div className="jumbotron">
    <h3>
      <Link to={`./article/${slug}/read`} className="article-title">
        {title}
      </Link>
    </h3>
    <p>{description}</p>
    <div>
      <span className="text-muted">
        <small>
          Created:
          {' '}
          {new Date(createdAt).toDateString()}
        </small>
      </span>
      <span className="ml-5">
        <Button bsStyle="primary">Edit</Button>
        <Button
          bsStyle="danger ml-2"
          data-toggle="modal"
          data-target="#confirmDeleteModal"
          onClick={() => beginDelete(slug)}
        >
          Delete
        </Button>
      </span>
    </div>
  </div>
);

MyArticle.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  beginDelete: PropTypes.func.isRequired,
};

export default MyArticle;
