import Home from "./views/Home/Home";
import SignIn from "./views/SignIn/SignIn";
import SignUp from "./views/SignUp/SignUp";
import {Route, Routes} from "react-router-dom";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        {/* <Route path="/sports" element={<Sports/>}/>*/}
      </Routes>
    </>
  )
};

export default App
