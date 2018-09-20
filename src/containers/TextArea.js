/* eslint-disable react/no-multi-comp */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Editor, { composeDecorators } from 'draft-js-plugins-editor';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import createInlineToolbarPlugin, { Separator } from 'draft-js-inline-toolbar-plugin';
import createImagePlugin from 'draft-js-image-plugin';
import createAlignmentPlugin from 'draft-js-alignment-plugin';
import createFocusPlugin from 'draft-js-focus-plugin';
import createResizeablePlugin from 'draft-js-resizeable-plugin';
import createBlockDndPlugin from 'draft-js-drag-n-drop-plugin';
import createDragNDropUploadPlugin from '@mikeljames/draft-js-drag-n-drop-upload-plugin';
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
  CodeBlockButton,
} from 'draft-js-buttons';
import 'draft-js-inline-toolbar-plugin/lib/plugin.css';
import editorStyles from '../editorStyles.css';
import createArticleAction from '../actions/createArticleAction';
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

const initialState = {
  entityMap: {},
  blocks: [
    {
      key: '9gm3s',
      text: 'Title',
      type: 'header-one',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: 'e23a7',
      text: '',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: 'e23a8',
      text: 'Write Your Story...',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
  ],
};

class TextArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createWithContent(convertFromRaw(initialState)),
    };
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

  submitArticle = (event) => {
    const { postArticle, history } = this.props;
    event.preventDefault();
    const articleContent = JSON.parse(window.localStorage.getItem('content'));
    const data = {
      title: articleContent.blocks[0].text,
      body: JSON.stringify(articleContent),
      description: articleContent.blocks[2].text,
    };
    postArticle(data, history);
    localStorage.removeItem('content');
  };

  focus = () => {
    this.editor.focus();
  };

  renderForm = () => {
    const { errors } = this.props;
    const { editorState } = this.state;
    return (
      <div className="bg-light">
        <div className="container-contact2">
          <div className="wrap-contact2">
            <div>
              {errors ? (
                <div className="alert alert-danger p-2 mb-3 " style={{ fontSize: '12px' }}>
                  Ensure the Article has a Title and Short Description of more than 100 characters
                  at the start of the story.
                </div>
              ) : null}
            </div>
            <div className={editorStyles.editor} onClick={this.focus}>
              <form onSubmit={this.submitArticle} className="contact2-form validate-form">
                <button type="submit" style={{ float: 'right' }} className="btn btn-primary">
                  Submit Article
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
            </div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { loading, history } = this.props;
    return (
      <main>
        <UserNavBar history={history} />
        {loading ? (
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

TextArea.propTypes = {
  postArticle: PropTypes.func.isRequired,
  history: PropTypes.shape().isRequired,
  errors: PropTypes.shape(),
  loading: PropTypes.bool.isRequired,
};

HeadlinesButton.propTypes = {
  onOverrideContent: PropTypes.func.isRequired,
};

TextArea.defaultProps = {
  errors: null,
};

const mapDispatchToProps = dispatch => ({
  postArticle: (data, history) => dispatch(createArticleAction(data, history)),
});

const mapStateToProps = ({ createArticleReducer }) => createArticleReducer;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TextArea);
