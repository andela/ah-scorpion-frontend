/* eslint-disable react/no-multi-comp */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Editor, { composeDecorators } from 'draft-js-plugins-editor';
import { EditorState, convertToRaw } from 'draft-js';
import createInlineToolbarPlugin, {
  Separator,
} from 'draft-js-inline-toolbar-plugin';
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

  onWindowClick = () => this.props.onOverrideContent(undefined);

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

  onClick = () => this.props.onOverrideContent(HeadlinesPicker);

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

class TextArea extends Component {
  state = {
    editorState: EditorState.createEmpty(),
  };

  saveContent = (content) => {
    window.localStorage.setItem('content', JSON.stringify(convertToRaw(content)));
  };

  onChange = (editorState) => {
    const contentState = editorState.getCurrentContent();
    this.saveContent(contentState);
    this.setState({
      editorState,
    });
  };

  submitArticle = (event) => {
    event.preventDefault();
    const articleContent = JSON.parse(window.localStorage.getItem('content'));
    const data = {
      title: articleContent.blocks[0].text,
      body: JSON.stringify(articleContent),
      description: articleContent.blocks[0].text,
    };
    console.log('Data from text area', data);
    this.props.postArticle(data);
    localStorage.removeItem('content');
  };

  focus = () => {
    this.editor.focus();
  };

  render() {
    return (
      <main>
        <div className="bg-contact2">
          <div className="container-contact2">
            <div className="wrap-contact2">
              <div className={editorStyles.editor} onClick={this.focus}>
                <form onSubmit={this.submitArticle} className="contact2-form validate-form">
                  <span className="contact2-form-title">New Article</span>
                  <Editor
                    editorState={this.state.editorState}
                    onChange={this.onChange}
                    plugins={plugins}
                    ref={(element) => {
                      this.editor = element;
                    }}
                    placeholder="Tell your story"
                  />
                  <InlineToolbar />
                  <div className="container-contact2-form-btn">
                    <div className="wrap-contact2-form-btn">
                      <div className="contact2-form-bgbtn" />
                      <button type="submit" className="contact2-form-btn">Submit Article</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

TextArea.propTypes = {
  postArticle: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  postArticle: data => dispatch(createArticleAction(data)),
});

const mapStateToProps = ({ createArticleReducer }) => createArticleReducer;

export default connect(mapStateToProps, mapDispatchToProps)(TextArea);
