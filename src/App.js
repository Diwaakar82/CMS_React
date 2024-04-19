import { BrowserRouter, Routes, Route } from "react-router-dom"
import CategoriesShow from "./categories/show";
import Categories from "./categories/index"
import Navbar from "./shared/navbar";
import Home from "./welcome";
import NoPage from "./shared/404";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element = {<Navbar />}>
            <Route index element = {<Home />} />
            <Route path = "categories" element = {<Categories />} />
            <Route path = "categories/posts/:categoryId" element = {<CategoriesShow />} />
        </Route>
      <Route path = "*" element = {<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
