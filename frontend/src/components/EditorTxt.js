// import { Editor } from "react-draft-wysiwyg";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
// import { useState } from "react";
// import { convertToHTML } from 'draft-convert';
// import DOMPurify from 'dompurify';

// const EditorTxt = (props) => {

//   const [editorState, setEditorState] = useState(EditorState.createEmpty())
//   const [convertedContent, setConvertedContent] = useState("")

//   const onEditorStateChange = (editorState) => {
//     setEditorState(editorState);
//     // console.log('the state is',convertToRaw(editorState.getCurrentContent()))
//     // let saveType = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
//     // let readType = EditorState.createWithContent(convertFromRaw(JSON.parse(saveType)));
//     // console.log('Read type',readType);
//     // console.log('save type',saveType);
//     convertContentToHTML();
//     // const blocks = convertToRaw(editorState.getCurrentContent()).blocks;
//     // const value = blocks.map(block => (!block.text.trim() && '\n') || block.text).join('\n');
//     // console.log('value is',value)
//   }

//   const convertContentToHTML = () => {
//     let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
//     setConvertedContent(currentContentAsHTML);
//     //save below content
//     // console.log(convertedContent);
//     props.passData(currentContentAsHTML)
//   }

//   const createMarkup = (html) => {
//     return {
//       __html: DOMPurify.sanitize(html)
//     }
//   }

//   return (
//     <>
//       <Editor
//         textAlignment="right"
//         editorState={editorState}
//         toolbarClassName="toolbarClassName"
//         wrapperClassName="wrapperClassName"
//         editorClassName="editorClassName"
//         onEditorStateChange={onEditorStateChange}
//       />
//       {/* <div className="preview" dangerouslySetInnerHTML={createMarkup(convertedContent)}></div> */}
//     </>
//   )
// }

// export default EditorTxt
