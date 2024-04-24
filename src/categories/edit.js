import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

function CategoryEdit() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [category, setCategory] = useState('');

  const location = useLocation();
  const { categoryName } = location.state

  const storedData = JSON.parse(localStorage.getItem('userData'));

  const yourConfig = {
    headers: {
        Authorization: "Bearer " + storedData['token']
    }
  }

  useEffect(() => {
    setCategory(categoryName);

    document.querySelectorAll('.category-nav').forEach(function(element) {
      element.classList.add('active');
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`/categories/${categoryId}`, {'title': category}, yourConfig);
      navigate(`/categories/posts/${categoryId}`, {state: { categoryName: category }});
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors)
        console.error('Failed to update category:', error);
      }
    }

  return (
    <div>
      <h2 className="category_title">Edit Category</h2>

      <form onSubmit={handleSubmit} className="category-form">
        <input type="hidden" name="_method" value="patch" />
        <div className="form-group">
          <label htmlFor="title" className="form-label">Title</label><br />
          <input
            type="text"
            id="title"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="button-container">
          <button type="submit" className="like-button">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default CategoryEdit;