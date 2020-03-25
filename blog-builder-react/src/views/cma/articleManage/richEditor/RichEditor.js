import React, { Component } from 'react'
import './richEditor.css'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
export default class RichEditor extends Component {
  state = {
    editorState: '',
    clientH: ''
  }
  onEditorStateChange = editorState => {
    this.setState({
      editorState
    })
  }
  onContentStateChange = contentState => {
    this.setState({
      contentState
    })
  }
  UNSAFE_componentWillMount() {
    if (this.props.htmlContent!==undefined) {
      const html = this.props.htmlContent;
      const contentBlock = htmlToDraft(html);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        const editorState = EditorState.createWithContent(contentState);
        this.setState({
          editorState,
        });
      }
    }
    this.setState({
      clientH: document.documentElement.clientHeight - 320 + 'px'
    })
  }
  render() {
    return (
      <div style={{ height: this.state.clientH, border: '1px solid #eee' }}>
        <Editor
          editorState={this.state.editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={this.onEditorStateChange}
          onContentStateChange={this.onContentStateChange}
          onBlur={() => {
            this.props.genContent(draftToHtml(this.state.contentState))
          }}
        />
      </div>
    )
  }
}
