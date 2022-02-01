import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home";
import SinglePost from "./pages/SinglePost";
import Login from "./pages/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { useEffect, useState } from "react";
import CategoryPosts from "./pages/CategoryPosts";
import WriteArticle from "./pages/WriteArticle";

function App() {
  const [user, setUSer] = useState(null);
  useEffect(() => {
    const getUser = async () => {
      const res = await fetch("http://localhost:5000/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      });

      if (res.status === 200) {
        const data = await res.json();
        setUSer(data.user);
      }
    };
    getUser();
  }, []);

  // console.log(user);
  return (
    <Router>
      <div className="App">
        <Navbar user={user} />
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route
            path="/login"
            element={user ? <Navigate to='/' /> : <Login/>}
          />
          <Route
            path="/post/:id"
            element={user ? <SinglePost /> : <Navigate to="/login" />}
          />
          <Route
            path="/posts/cats/:cat"
            element={<CategoryPosts />}
          />
          <Route
            path="/posts/write"
            element={<WriteArticle/>}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
