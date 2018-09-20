/* eslint-disable react/no-multi-comp */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Editor, { composeDecorators } from 'draft-js-plugins-editor';
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import createInlineToolbarPlugin, { Separator } from 'draft-js-inline-toolbar-plugin';
import createImagePlugin from 'draft-js-image-plugin';
import createAlignmentPlugin from 'draft-js-alignment-plugin';
import createFocusPlugin from 'draft-js-focus-plugin';
import createResizeablePlugin from 'draft-js-resizeable-plugin';
import createBlockDndPlugin from 'draft-js-drag-n-drop-plugin';
import createDragNDropUploadPlugin from '@mikeljames/draft-js-drag-n-drop-upload-plugin';
import {
  BlockquoteButton,
  BoldButton,
  CodeBlockButton,
  CodeButton,
  HeadlineOneButton,
  HeadlineThreeButton,
  HeadlineTwoButton,
  ItalicButton,
  OrderedListButton,
  UnderlineButton,
  UnorderedListButton,
} from 'draft-js-buttons';
import 'draft-js-inline-toolbar-plugin/lib/plugin.css';
import editorStyles from '../editorStyles.css';

import handleEditMyArticle from '../actions/editMyArticle';
import handleGetOneArticle from '../actions/getOneArticle';
import Footer from '../components/Footer';
import UserNavBar from '../components/UserNavBar';
import Loader from '../components/Loader';

const focusPlugin = createFocusPlugin();
const resizeablePlugin = createResizeablePlugin();
const blockDndPlugin = createBlockDndPlugin();
const alignmentPlugin = createAlignmentPlugin();

const decorator = composeDecorators(
  resizeablePlugin.decorator,
  alignmentPlugin.decorator,
  focusPlugin.decorator,
  blockDndPlugin.decorator,
);
const imagePlugin = createImagePlugin({ decorator });
const upload = image => image;
const dragNDropFileUploadPlugin = createDragNDropUploadPlugin({
  addImage: imagePlugin.addImage,
  handleUpload: upload,
});

class HeadlinesPicker extends Component {
  componentDidMount() {
    setTimeout(() => {
      window.addEventListener('click', this.onWindowClick);
    });
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onWindowClick);
  }

  onWindowClick = () => {
    const { onOverrideContent } = this.props;
    onOverrideContent(undefined);
  };

  render() {
    const buttons = [HeadlineOneButton, HeadlineTwoButton, HeadlineThreeButton];
    return (
      <div>
        {buttons.map((
          Button,
          i, // eslint-disable-next-line
        ) => (
          <Button key={i + 1} {...this.props} />
        ))}
      </div>
    );
  }
}

class HeadlinesButton extends Component {
  // When using a click event inside overridden content, mouse down
  // events needs to be prevented so the focus stays in the editor
  // and the toolbar remains visible  onMouseDown = (event) => event.preventDefault()
  onMouseDown = event => event.preventDefault();

  onClick = () => {
    const { onOverrideContent } = this.props;
    onOverrideContent(HeadlinesPicker);
  };

  render() {
    return (
      <div onMouseDown={this.onMouseDown}>
        <button onClick={this.onClick}>H</button>
      </div>
    );
  }
}

const inlineToolbarPlugin = createInlineToolbarPlugin({
  structure: [
    BoldButton,
    ItalicButton,
    UnderlineButton,
    CodeButton,
    Separator,
    HeadlinesButton,
    UnorderedListButton,
    OrderedListButton,
    BlockquoteButton,
    CodeBlockButton,
  ],
});
const { InlineToolbar } = inlineToolbarPlugin;
const plugins = [
  dragNDropFileUploadPlugin,
  blockDndPlugin,
  focusPlugin,
  alignmentPlugin,
  resizeablePlugin,
  imagePlugin,
  inlineToolbarPlugin,
];

class EditMyArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    };
    this.slug = this.props.match.params.slug;
  }

  static getDerivedStateFromProps(props, state) {
    if (props.article.body !== undefined && !state.editorState.getCurrentContent().hasText()) {
      return {
        editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(props.article.body))),
      };
    }
    return null;
  }

  componentDidMount() {
    const { getOneArticle } = this.props;
    getOneArticle(this.slug);
  }

  onChange = (editorState) => {
    const contentState = editorState.getCurrentContent();
    this.saveContent(contentState);
    this.setState({
      editorState,
    });
  };

  saveContent = (content) => {
    window.localStorage.setItem('content', JSON.stringify(convertToRaw(content)));
  };

  onSubmit = (event) => {
    const { submitArticle, history } = this.props;
    event.preventDefault();
    const articleContent = JSON.parse(window.localStorage.getItem('content'));
    const data = {
      title: articleContent.blocks[0].text,
      body: JSON.stringify(articleContent),
      description: articleContent.blocks[2].text,
    };
    submitArticle(this.slug, data, history);
    localStorage.removeItem('content');
  };

  focus = () => {
    this.editor.focus();
  };

  renderForm = () => {
    const { fetchSuccess, submitFailure, errorMessage } = this.props;
    const { editorState } = this.state;
    if (fetchSuccess) {
      return (
        <div className="bg-light">
          <div className="container-contact2">
            <div className="wrap-contact2">
              <div className={editorStyles.editor} onClick={this.focus}>
                {submitFailure ? (
                  <div className="alert alert-danger">{errorMessage}</div>
                ) : (
                  <form onSubmit={this.onSubmit} className="contact2-form validate-form">
                    <button type="submit" style={{ float: 'right' }} className="btn btn-primary">
                      Submit Edit
                    </button>
                    <br />
                    <br />
                    <br />
                    <Editor
                      editorState={editorState}
                      onChange={this.onChange}
                      plugins={plugins}
                      ref={(element) => {
                        this.editor = element;
                      }}
                    />
                    <InlineToolbar />
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  render() {
    const { isFetching, isSubmitting, history } = this.props;
    return (
      <main className="one-article-view">
        <UserNavBar history={history} />
        {isFetching || isSubmitting ? (
          <div className="mt-5 text-center">
            <Loader style={{ marginTop: '5em' }} />
          </div>
        ) : (
          this.renderForm()
        )}
        <Footer />
      </main>
    );
  }
}

EditMyArticle.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  fetchSuccess: PropTypes.bool.isRequired,
  submitFailure: PropTypes.bool.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  history: PropTypes.shape().isRequired,
  errorMessage: PropTypes.string.isRequired,
  submitArticle: PropTypes.func.isRequired,
  getOneArticle: PropTypes.func.isRequired,
};

HeadlinesButton.propTypes = {
  onOverrideContent: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  submitArticle: (slug, data, history) => dispatch(handleEditMyArticle(slug, data, history)),
  getOneArticle: slug => dispatch(handleGetOneArticle(slug)),
});

const mapStateToProps = ({ editMyArticle }) => editMyArticle;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditMyArticle);
