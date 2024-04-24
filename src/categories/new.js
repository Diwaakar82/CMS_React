import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CategoryNew() {
  const [title, setTitle] = useState('');
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const storedData = JSON.parse(localStorage.getItem('userData'));

  const yourConfig = {
    headers: {
        Authorization: "Bearer " + storedData['token']
    }
  }

  useEffect(() => {
    document.querySelectorAll('.category-nav').forEach(function(element) {
      element.classList.add('active');
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/categories', { title }, yourConfig);
      navigate('/categories');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        console.error('Failed to create category:', error);
      }
    }
  };

  return (
    <div>
      <h2 className="category_title">New Category</h2>

      {errors.length > 0 && (
        <div id="error_explanation">
          <h2>{errors.length} {errors.length === 1 ? 'error' : 'errors'} prohibited this category from being saved:</h2>
          <ul>
            {errors.map((msg, index) => (
              <li key={index}>{msg}</li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit} className="category-form">
        <div className="form-group">
          <label htmlFor="title" className="form-label">Title</label><br />
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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

export default CategoryNew;