import { BrowserRouter, Routes, Route } from "react-router-dom"
import CategoriesShow from "./categories/show";
import Categories from "./categories/index"
import Navbar from "./shared/navbar";
import Home from "./welcome";
import NoPage from "./shared/404";
import CategoryEdit from "./categories/edit";
import CategoryNew from "./categories/new";
import Posts from "./posts";
import NewPost from "./posts/new";
import EditPost from "./posts/edit";
import PostDetails from "./posts/show";

function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App;
