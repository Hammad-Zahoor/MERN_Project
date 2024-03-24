import Home from "./screens/home";
import Profile from "./screens/profile";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Sign_in from "./screens/sign_in";
import Sign_up from "./screens/sign_up";
import Post from "./screens/post";

function App() {
  return (
    <Router>
      <div><Routes>
        <Route exact path="/" element={<Home/>}></Route>
        <Route exact path="/profile" element={<Profile/>}></Route>
        <Route exact path="/Sign_in" element={<Sign_in/>}></Route>
        <Route exact path="/Sign_up" element={<Sign_up/>}></Route>
        <Route exact path="/Post" element={<Post/>}></Route>
      </Routes></div>
    </Router>
  );
}

export default App;
