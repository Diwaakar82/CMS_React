import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditPost() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [ errors, setErrors ] = useState([]);
  const [ categories, setCategories ] = useState([]);
  const [ categoryIds, setCategoryIds ] = useState([]);
  const [ post, setPost ] = useState(null);

  const location = useLocation();
  const { currentPost } = location.state

  const storedData = JSON.parse(localStorage.getItem('userData'));

  const yourConfig = {
    headers: {
        Authorization: "Bearer " + storedData['token']
    }
  }

  const handleCheck = (e) => {
    const categoryId = parseInt(e.target.value);
    const isChecked = e.target.checked;

    if(isChecked)
        setCategoryIds(prevCategoryIds => [...prevCategoryIds, categoryId]);
    else
        setCategoryIds(prevCategoryIds => prevCategoryIds.filter(id => id !== categoryId));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.target);

      const body = {}
      body['title'] = formData.get('title');
      body['description'] = formData.get('description');
      body['category_ids'] = categoryIds;

      await axios.patch(`/posts/${post.ID}`, body, yourConfig);

      navigate(`/posts/${post.ID}`);
    } catch (error) {
        if (error.response) {
            setErrors(error.response.data.errors);
        } else {
            console.error('Error updating post:', error);
        }
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
        try {
          const response = await axios.get(`/posts/${postId}`, yourConfig);
          setPost(response.data[0]);
          setCategoryIds(response.data[0].categories.map(category => (category.id)));
        } catch (error) {
          console.error('Error fetching post:', error);
        }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get('/categories');
        setCategories(response.data);

        document.querySelectorAll('.post-nav').forEach(function(element) {
            element.classList.add('active');
        });
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
    if(currentPost)
    {
      setPost(currentPost);
      setCategoryIds(currentPost.categories.map(category => (category.id)));
    }
    else
      fetchPost();
  }, [postId]);

  return (
    <div className="comment-form">
      <h2>Edit Post</h2>
      {post && (
      <form onSubmit={handleSubmit}>
        {/* {errors.length > 0 && (
          <div id="error_explanation">
            <h2>{errors.length} {errors.length === 1 ? 'error' : 'errors'} prohibited this post from being saved:</h2>
            <ul>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )} */}

        <input type="hidden" name="_method" value="patch" />
        
        <div className="form-group">
          <label htmlFor="title">Title:</label><br />
          <input type="text" id="title" name="title" defaultValue={post.TITLE} className="form-control" />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label><br />
          <input type="text" id="description" name="description" defaultValue={post.DESCRIPTION} className="form-control" />
        </div>
        
        {/* Placeholder */}
        <input type="hidden" name="user_id" value="3" />

        <div className="change-categories">
          <div>Change categories</div>
          <br />
          {categories.map(category => (
            <div key={category.id}>
                {console.log(post.categories, categoryIds, categoryIds.includes(category.id))}
                <input type="checkbox" id={category.id} name={category.title} value={category.id} checked={categoryIds.includes(category.id)} onChange={handleCheck} />
                <label>{category.title}</label>
                <br />
            </div>
          ))}
        </div>

        <div className="button-container">
          <button type="submit" className="like-button">Submit</button>
        </div>
      </form>
      )}
    </div>
  );
}

export default EditPost;