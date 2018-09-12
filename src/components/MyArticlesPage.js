import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import UserNavBar from './UserNavBar';
import Footer from './Footer';

const articles = [
  {
    id: 3,
    title: 'Lenny’s First Article',
    author: {
      email: 'lennykmutua@gmail.com',
      username: 'lenny',
      bio: '',
      image: '',
    },
    likes: 0,
    dislikes: 0,
    favorited: 0,
    averageRating: null,
    ratingsCount: 0,
    slug: 'lennys-first-article-1571c709468b4940819716b09c5fd263',
    body: 'Like I said...I don’t know what’s going on.I’m just testing Hoslack’s work.',
    description: 'This is my first article and I don’t know what’s going on...',
    images: ['https://url-to-image'],
    createdAt: '2018-09-11T11:35:15.992556Z',
    updatedAt: '2018-09-11T11:35:15.992604Z',
    tagList: ['Lenny', 'First'],
  },
  {
    id: 2,
    title: 'Lenny’s First Article',
    author: {
      email: 'lennykmutua@gmail.com',
      username: 'lenny',
      bio: '',
      image: '',
    },
    likes: 0,
    dislikes: 0,
    favorited: 0,
    averageRating: null,
    ratingsCount: 0,
    slug: 'lennys-first-article-1571c709468b4940819716b09c5fd263',
    body: 'Like I said...I don’t know what’s going on.I’m just testing Hoslack’s work.',
    description: 'This is my first article and I don’t know what’s going on...',
    images: ['https://url-to-image'],
    createdAt: '2018-09-11T11:35:15.992556Z',
    updatedAt: '2018-09-11T11:35:15.992604Z',
    tagList: ['Lenny', 'First'],
  },
  {
    id: 1,
    title: 'Lenny’s First Article',
    author: {
      email: 'lennykmutua@gmail.com',
      username: 'lenny',
      bio: '',
      image: '',
    },
    likes: 0,
    dislikes: 0,
    favorited: 0,
    averageRating: null,
    ratingsCount: 0,
    slug: 'lennys-first-article-1571c709468b4940819716b09c5fd263',
    body: 'Like I said...I don’t know what’s going on.I’m just testing Hoslack’s work.',
    description: 'This is my first article and I don’t know what’s going on...',
    images: ['https://url-to-image'],
    createdAt: '2018-09-11T11:35:15.992556Z',
    updatedAt: '2018-09-11T11:35:15.992604Z',
    tagList: ['Lenny', 'First'],
  },
];

const MyArticlesPage = () => (
  <React.Fragment>
    <UserNavBar />
    <main className="mt-2em">
      <div className="p-5 container">
        <h1>My Articles</h1>
        <hr />
        <MyArticleList articles={articles} />
      </div>
    </main>
    <Footer />
  </React.Fragment>
);

const Button = ({ className, buttonText }) => (
  <button type="button" className={`btn btn-${className}`}>
    {buttonText}
  </button>
);

Button.propTypes = {
  className: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
};

const MyArticle = ({
  title, description, createdAt, slug,
}) => (
  <div>
    <h3>
      <Link to={`./article/${slug}`} className="article-title">{title}</Link>
    </h3>
    <p>{description}</p>
    <div>
      <span className="text-muted">
        Created:
        {new Date(createdAt).toDateString()}
      </span>
      <span className="ml-5">
        <Button className="primary" buttonText="Edit" />
        <Button className="danger ml-2" buttonText="Delete" />
      </span>
      <hr />
    </div>
  </div>
);

MyArticle.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
};

const MyArticleList = ({ articles }) => articles.map(article => (
  <MyArticle
    title={article.title}
    createdAt={article.createdAt}
    description={article.description}
  />
));

MyArticleList.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default MyArticlesPage;
