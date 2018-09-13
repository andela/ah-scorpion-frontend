import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

import ConfirmDeleteModal from '../../components/ConfirmDeleteModal';
import MyArticle from '../../components/MyArticle';
import MyArticleList from '../../components/MyArticlesList';

describe('The getmyArticlesPage view', () => {
  describe('The ConfirmDeleteModal component', () => {
    const state = {
      confirmDelete: () => 1,
      cancelDelete: () => 1,
      deletedArticleSlug: 'test article',
      isDeleting: false,
      errorMessage: '',
      deleteFailure: false,
      postRequestCleanUp: () => 1,
      deleteSuccess: false,
    };
    it('Should initially ask for delete confirmation', () => {
      const tree = renderer.create(<ConfirmDeleteModal {...state} />);
      expect(tree.toJSON()).toMatchSnapshot();
    });
    it('Should show loading status when request is pending', () => {
      const tree = renderer.create(<ConfirmDeleteModal {...state} isDeleting />);
      expect(tree.toJSON()).toMatchSnapshot();
    });
    it('Should show success status when request is successful', () => {
      const tree = renderer.create(<ConfirmDeleteModal {...state} deleteSuccess />);
      expect(tree.toJSON()).toMatchSnapshot();
    });
    it('Should show error status when request fails', () => {
      const tree = renderer.create(<ConfirmDeleteModal {...state} deleteFailure />);
      expect(tree.toJSON()).toMatchSnapshot();
    });
  });
  describe('The MyArticle component', () => {
    it('Should not regress', () => {
      const tree = renderer.create(
        <MemoryRouter>
          <MyArticle
            title="test title"
            description="test description"
            createdAt="2018-09-12T18:51:24.099861Z"
            slug="test-slug-001"
            beginDelete={() => 1}
          />
        </MemoryRouter>,
      );
      expect(tree.toJSON()).toMatchSnapshot();
    });
  });

  describe('The MyArticleList component', () => {
    const testProps = {
      articles: [],
      beginDelete: () => 1,
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
      {
        id: 43,
        title: "Lenny's First Article 2",
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
        slug: 'lennys-first-article-2-29b5102ef9a84eb9bfbf60da42f63122',
        body: "Like I said... I don't know what's going on. I'm just testing Hoslack's work.",
        description: "This is my first article and I don't know what's going on...",
        images: ['https://url-to-image'],
        createdAt: '2018-09-12T18:51:24.099861Z',
        updatedAt: '2018-09-12T18:51:24.100977Z',
        tagList: ['Lenny', 'First'],
      },
    ];
    it('Should render text if user has no articles', () => {
      const tree = renderer.create(
        <MemoryRouter>
          <MyArticleList {...testProps} />
        </MemoryRouter>,
      );
      expect(tree.toJSON()).toMatchSnapshot();
    });
    it('Should render the error message in case of failure', () => {
      const tree = renderer.create(
        <MemoryRouter>
          <MyArticleList {...testProps} fetchFailure errorMessage="An error occurred" />
        </MemoryRouter>,
      );
      expect(tree.toJSON()).toMatchSnapshot();
    });

    it('Should render all articles in case of a successful request', () => {
      const tree = renderer.create(
        <MemoryRouter>
          <MyArticleList {...testProps} articles={articles} />
        </MemoryRouter>,
      );
      expect(tree.toJSON()).toMatchSnapshot();
    });
  });
});
