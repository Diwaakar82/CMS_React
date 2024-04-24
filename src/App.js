import { BrowserRouter, Routes, Route } from "react-router-dom"
import useAuth, { AuthContext } from './shared/auth';

import Navbar from "./shared/navbar";
import Home from "./welcome";
import NoPage from "./shared/404";

import CategoriesShow from "./categories/show";
import Categories from "./categories/index"
import CategoryEdit from "./categories/edit";
import CategoryNew from "./categories/new";

import Posts from "./posts";
import NewPost from "./posts/new";
import EditPost from "./posts/edit";
import PostDetails from "./posts/show";
import SignIn from "./users/signin";
import Login from "./users/login";

function App() {
  const {token, login, logout, userId, name} = useAuth();
  
  let routes;

  if (token) {
    routes = (
      <Routes>
        <Route path="/" element = {<Navbar />}>
          <Route index element = {<Home />} />

          {/* Category Paths */}
          <Route path = "categories" element = {<Categories />} />
          <Route path = "categories/new" element = {<CategoryNew />} />
          <Route path = "categories/posts/:categoryId" element = {<CategoriesShow />} />
          <Route path = "/categories/:categoryId/edit" element = {<CategoryEdit />} />

          {/* Post Paths */}
          <Route path = "posts" element = {<Posts />} />
          <Route path = "/posts/new" element = {<NewPost />} />
          <Route path = "posts/:postId/edit" element = {<EditPost />} />
          <Route path = "posts/:postId" element = {<PostDetails />} />
        </Route>
        <Route path = "*" element = {<NoPage />} />
      </Routes>
    )
  } else {
    routes = (
      <Routes>
        <Route path="/" element = {<Navbar />}>
          <Route index element = {<Home />} />

          <Route path = "categories" element = {<Categories />} />
          <Route path = "categories/posts/:categoryId" element = {<CategoriesShow />} />
          <Route path = "posts" element = {<Posts />} />
          <Route path = "posts/:postId" element = {<PostDetails />} />

          <Route path="users/signin" element = {<SignIn />} />
          <Route path="users/login" element = {<Login />} /> 
        </Route>
        <Route path = "*" element = {<NoPage />} />
      </Routes>
    );
  }

  return (
    <AuthContext.Provider value={{isLoggedIn: !!token, token: token, login: login, logout: logout, userId: userId, name: name}}>
      <BrowserRouter>
        {routes}
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
