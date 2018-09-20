import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow } from 'enzyme';
import shallowToJSON from 'enzyme-to-json';
import Article from '../../components/Article';
import ArticleList from '../../components/ArticleList';
import ArticlesSection from '../../containers/ArticlesSection';
import Dashboard from '../../containers/Dashboard';

describe('The Article component', () => {
  it('Should not regress', () => {
    const tree = shallow(
      <MemoryRouter initialEntries={[{ pathname: '/', key: 'testKey' }]}>
        <Article
          title="test title"
          description="test description"
          image=""
          createdAt="2018-09-12T18:51:24.099861Z"
          slug="test-slug-001"
          averageRating={1}
          likes={0}
          dislikes={0}
          author="lenny"
        />
      </MemoryRouter>,
    );
    expect(shallowToJSON(tree)).toMatchSnapshot();
  });
});

describe('The ArticleList component', () => {
  const testProps = {
    articles: [],
    fetchFailure: false,
    errorMessage: '',
  };
  const articles = [
    {
      id: 43,
      title: "Lenny's First Article 1",
      author: {
        email: 'lennykmutua@gmail.com',
        username: 'lenny',
        bio: '',
        image: '',
      },
      likes: 0,
      dislikes: 0,
      favorited: 1,
      averageRating: null,
      ratingsCount: 0,
      slug: 'lennys-first-article-1-29b5102ef9a84eb9bfbf60da42f63122',
      body: "Like I said... I don't know what's going on. I'm just testing Hoslack's work.",
      description: "This is my first article and I don't know what's going on...",
      images: ['https://url-to-image'],
      createdAt: '2018-09-12T18:51:24.099861Z',
      updatedAt: '2018-09-12T18:51:24.100977Z',
      tagList: ['Lenny', 'First'],
    },
  ];
  it('Should render text if there are no articles', () => {
    const tree = shallow(
      <MemoryRouter initialEntries={[{ pathname: '/', key: 'testKey' }]}>
        <ArticleList {...testProps} />
      </MemoryRouter>,
    );
    expect(shallowToJSON(tree)).toMatchSnapshot();
  });
  it('Should render the error message in case of failure', () => {
    const tree = shallow(
      <MemoryRouter initialEntries={[{ pathname: '/', key: 'testKey' }]}>
        <ArticleList {...testProps} fetchFailure errorMessage="An error occurred" />
      </MemoryRouter>,
    );
    expect(shallowToJSON(tree)).toMatchSnapshot();
  });

  it('Should render all articles in case of a successful request', () => {
    const tree = shallow(
      <MemoryRouter initialEntries={[{ pathname: '/', key: 'testKey' }]}>
        <ArticleList {...testProps} articles={articles} />
      </MemoryRouter>,
    );
    expect(shallowToJSON(tree)).toMatchSnapshot();
  });
});

describe('The ArticleSection component', () => {
  const testProps = {
    articles: [],
    fetchFailure: false,
    errorMessage: '',
    isFetching: false,
  };
  const articles = [
    {
      id: 43,
      title: "Lenny's First Article 1",
      author: {
        email: 'lennykmutua@gmail.com',
        username: 'lenny',
        bio: '',
        image: '',
      },
      likes: 0,
      dislikes: 0,
      favorited: 1,
      averageRating: null,
      ratingsCount: 0,
      slug: 'lennys-first-article-1-29b5102ef9a84eb9bfbf60da42f63122',
      body: "Like I said... I don't know what's going on. I'm just testing Hoslack's work.",
      description: "This is my first article and I don't know what's going on...",
      images: ['https://url-to-image'],
      createdAt: '2018-09-12T18:51:24.099861Z',
      updatedAt: '2018-09-12T18:51:24.100977Z',
      tagList: ['Lenny', 'First'],
    },
  ];
  it('Should render a loader if isFetching is true', () => {
    const tree = shallow(
      <MemoryRouter initialEntries={[{ pathname: '/', key: 'testKey' }]}>
        <ArticlesSection {...testProps} isFetching />
      </MemoryRouter>,
    );
    expect(shallowToJSON(tree)).toMatchSnapshot();
  });
  it('Should render the error message in case of failure', () => {
    const tree = shallow(
      <MemoryRouter initialEntries={[{ pathname: '/', key: 'testKey' }]}>
        <ArticlesSection {...testProps} fetchFailure errorMessage="An error occurred" />
      </MemoryRouter>,
    );
    expect(shallowToJSON(tree)).toMatchSnapshot();
  });

  it('Should render all articles in case of a successful request', () => {
    const tree = shallow(
      <MemoryRouter initialEntries={[{ pathname: '/', key: 'testKey' }]}>
        <ArticlesSection {...testProps} articles={articles} />
      </MemoryRouter>,
    );
    expect(shallowToJSON(tree)).toMatchSnapshot();
  });
});

describe('The Dashboard component', () => {
  it('Should not regress', () => {
    const tree = shallow(
      <MemoryRouter initialEntries={[{ pathname: '/', key: 'testKey' }]}>
        <Dashboard />
      </MemoryRouter>,
    );
    expect(shallowToJSON(tree)).toMatchSnapshot();
  });
});
