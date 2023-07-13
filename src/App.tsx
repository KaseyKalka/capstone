import Home from "./views/Home/Home";
import MLB from "./views/MLB/MLB";
import NBA from "./views/NBA/NBA";
import NFL from "./views/NFL/NFL";
import NHL from "./views/NHL/NHL";
import SignIn from "./views/SignIn/SignIn";
import SignOut from "./views/SignOut/SignOut";
import SignUp from "./views/SignUp/SignUp";
import {Route, Routes} from "react-router-dom";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/signout" element={<SignOut/>}/>
        <Route path="/nfl" element={<NFL/>}/>
        <Route path="/nba" element={<NBA/>}/>
        <Route path="/mlb" element={<MLB/>}/>
        <Route path="/nhl" element={<NHL/>}/>
      </Routes>
    </>
  )
};

export default App
