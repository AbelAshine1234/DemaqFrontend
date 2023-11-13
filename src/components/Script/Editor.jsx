import React, {useState} from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";

export const Editor = () => {
  const [text, setText] = useState('');
  
  const handleChange = value => {
    setText(value);
  };

  const handleSave = () => {
    console.log(text);
  }

  const openFile = () => {
    console.log(text);
  }

  
  return (
      <div className="bg-white rounded-lg shadow-md h-96 max-w-5xl">
        <EditorToolbar handleSave={handleSave} openFile={openFile}/>
        <ReactQuill className="bg-white"
          theme="snow"
          value={text}
          onChange={handleChange}
          placeholder={"Write something awesome..."}
          modules={modules}
          formats={formats}
        />
      </div>
  );
};

export default Editor;