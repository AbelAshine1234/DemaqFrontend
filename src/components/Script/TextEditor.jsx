import React, {useState} from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import Editor from "./Editor";

export const TextEditor = () => {
    
  return (
    <div className="text-editor w-screen p-2 pt-5 grid place-items-center">
      <Editor/>
    </div>
  );
};

export default TextEditor;