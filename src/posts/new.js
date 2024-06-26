import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import "./posts.css"

function NewPost() {
  const { register, handleSubmit, errors } = useForm();
  const [ categories, setCategories ] = useState([]);
  const [ categoryIds, setCategoryIds ] = useState([]);

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

  const onSubmit = async (data) => {
    try {
      data['category_ids'] = categoryIds;
      await axios.post('/posts', data, yourConfig);
    } catch (error) {
      console.error('Error creating post:', error.response);
    }
  };

  useEffect(() => {
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
  }, []);

  return (
    <div>
      <h2 className="category_title">New Post</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="category-form">

        <div className="form-group">
          <label htmlFor="title" className="form-label">Title</label><br />
          <input type="text" id="title" {...register('title', { required: 'Title is required' })} className="form-control" />
        </div>

        <div className="form-group">
          <label htmlFor="description" className="form-label">Description</label><br />
          <textarea id="description" {...register('description', { required: 'Description is required' })} className="form-control" />
        </div>

        <input type="hidden" name="user_id" value={storedData['userId']} />

        <div className="change-categories">
          <div>Change categories</div>
          <br />
          {categories.map(category => (
            <div key={category.id}>
                <input type="checkbox" id={category.id} name={category.title} value={category.id} onChange={handleCheck} />
                <label>{category.title}</label>
                <br />
            </div>
          ))}
        </div>

        <div className="button-container">
          <button type="submit" className="like-button">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default NewPost;