import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/LogIn"
import Signup from "./components/SignUp";
import Dashboard from "./layouts/Dashboard"
import Home from "./components/Home"
import  Sidenav from "./widgets/layout/Sidenav";
import Navbar  from "./components/Navbar";
import Editor from "./components/Editing/Editor"
import FileManagement from "./components/FileManagement";
import Record from "./components/Recording/Record";
import TextEditor from "./components/Script/TextEditor";

function App() {

  return (
    <>
     <div className="App bg-custom-dark">
        <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="signup" element={<Signup/>}/>
          {/* <Route path="/dash" element={<Dashboard/>}/> */}
          <Route path="/admin" element={<Home/>}/>
          <Route path="/side" element={<Sidenav/>}/>
          <Route path="/navbar" element={<Navbar/>}/>
          <Route path="/home" element={<Editor/>}/>
          <Route path="/file" element={<FileManagement/>}/>
          <Route path="/record" element={<Record/>}/>
          <Route path="/script" element={<TextEditor/>}/>
        </Routes>
        </BrowserRouter>
      </div>
      </>
)
 
   
}

export default App
