import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../shared/auth';

function CategoryShow() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [categoryPosts, setCategoryPosts] = useState(null);

  const location = useLocation();
  const { categoryName } = location.state

  const auth = useContext(AuthContext);
  const storedData = JSON.parse(localStorage.getItem('userData'));

  const yourConfig = {};
  if(auth.isLoggedIn)
    yourConfig['headers'] = {
      Authorization: "Bearer " + storedData['token']
  }

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`/categories/posts/${categoryId}`);
		
		setCategoryPosts(response.data);

		document.querySelectorAll('.category-nav').forEach(function(element) {
			element.classList.add('active');
		  });
      } catch (error) {
        console.error('Error fetching category:', error.response, error.config);
      }
    };

    fetchCategory();
  }, [categoryId]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure?')) {
      try {
        await axios.delete(`/categories/${categoryId}`, yourConfig);
        navigate('/categories');
      } catch (error) {
        console.error('Failed to delete category:', error);
      }
    }
  };

  if (!categoryPosts) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="button-container" style={{ textAlign: 'left' }}>
        <button onClick={() => navigate(-1)} className="like-button">Back</button>
      </div>

      <h1 className="category_title">{categoryName}</h1>

      { auth.isLoggedIn && (
        <div className="post-actions">
          <Link to={`/categories/${categoryId}/edit`} state={{ categoryName: categoryName }} className="links">Edit</Link>
          <button onClick={handleDelete} className="delete-button">Delete</button>
        </div>
      )}
	
      <div className="post-container">
        {categoryPosts.map(post => (
          <div key={post.ID} className="post">
            <div className="post-title">
              <Link to={`/posts/${post.ID}`}>{post.TITLE}</Link>
            </div>

            { auth.isLoggedIn && (<>
                <div className="post-actions">
                  <Link to={`/edit/${post.ID}`}>Edit</Link>

            {/* onClick={() => handlePostDelete(post.ID)} */}

                  <button className="delete-button">
                    Delete
                  </button>
                </div>
            </>)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryShow;