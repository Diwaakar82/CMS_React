import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function CategoryShow() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`/categories/posts/${categoryId}`);
        setCategory(response.data);
      } catch (error) {
        console.error('Error fetching category:', error.response, error.config);
      }
    };

    fetchCategory();
  }, [categoryId]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure?')) {
      try {
        await axios.delete(`/categories/${categoryId}`);
        navigate('/categories');
      } catch (error) {
        console.error('Failed to delete category:', error);
      }
    }
  };

  if (!category) {
    <div>
      <div className="button-container" style={{ textAlign: 'left' }}>
        <button onClick={() => navigate(-1)} className="like-button">Back</button>
      </div>

      <h1 className="category_title">{category.title}</h1>

      <div className="post-actions">
        <Link to={`/edit/${categoryId}`} className="links">Edit</Link>
        <button onClick={handleDelete} className="delete-button">Delete</button>
      </div>
	</div>
  }

  return (
    <div>
      <div className="button-container" style={{ textAlign: 'left' }}>
        <button onClick={() => navigate(-1)} className="like-button">Back</button>
      </div>

      <h1 className="category_title">{category.title}</h1>

      <div className="post-actions">
        <Link to={`/edit/${categoryId}`} className="links">Edit</Link>
        <button onClick={handleDelete} className="delete-button">Delete</button>
      </div>
	
      <div className="post-container">
        {category.posts.map(post => (
          <div key={post.id} className="post">
            <div className="post-title">
              <Link to={`/posts/${post.id}`}>{post.title}</Link>
            </div>

            <div className="post-actions">
              <Link to={`/edit/${post.id}`}>Edit</Link>
              {/* <button onClick={() => handlePostDelete(post.id)} className="delete-button">
                Delete
              </button> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryShow;