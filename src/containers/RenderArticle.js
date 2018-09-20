/* eslint-disable react/no-multi-comp */
import React, { Component } from 'react';
import Editor, { composeDecorators } from 'draft-js-plugins-editor';
import { EditorState, convertFromRaw } from 'draft-js';
import propTypes from 'prop-types';
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
import axios from 'axios';
import Favourite from '../components/Favourite';
import editorStyles from '../editorStyles.css';
import Rating from '../components/Rating';
import RenderComments from '../components/RenderComments';

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

const baseUrl = process.env.REACT_APP_BASE_URL;

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
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      rendered: false,
      articleId: 0,
      author: {},
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const { slug } = match.params;
    const getUrl = `${baseUrl}/articles/${slug}/`;
    axios
      .get(getUrl)
      .then((res) => {
        this.setState({ articleId: res.data.id, author: res.data.author });
        const rawContent = JSON.parse(res.data.body);
        if (rawContent) {
          this.setState({
            editorState: EditorState.createWithContent(
              convertFromRaw(rawContent),
            ),
            rendered: true,
          });
          this.setState({ rendered: true });
        } else {
          this.setState({ editorState: EditorState.createEmpty() });
        }
      })
      .catch((error) => {
        throw error;
      });
  }

  onChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  render() {
    const { editorState } = this.state;
    if (!editorState) {
      return <h3 className="loading">Loading...</h3>;
    }

    return (
      <main>
        <div className="bg-contact2">
          <div className="container-contact2">
            <div className="wrap-contact2">
              <div className={editorStyles.editor} onClick={this.focus}>
                <form className="contact2-form validate-form">
                  <Editor
                    editorState={editorState}
                    onChange={this.onChange}
                    plugins={plugins}
                    readOnly
                  />
                  <div className="row reaction-row">
                    <div className="col-sm my-auto">
                      {this.state.rendered ? (
                        <Favourite
                          slug={this.props.match.params.slug}
                          articleId={this.state.articleId}
                        />
                      ) : null}
                    </div>
                    <div className="col-sm"><Rating slug={this.props.match.params.slug} /></div>
                  </div>
                </form>
                <RenderComments
                  slug={this.props.match.params.slug}
                  articleId={this.state.articleId}
                  author={this.state.author}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

TextArea.propTypes = {
  match: propTypes.shape({ params: propTypes.shape().isRequired }).isRequired,
};

export default TextArea;
