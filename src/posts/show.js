import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../shared/auth';

function PostDetails() {
  const { postId } = useParams();
  const [ post, setPost ] = useState(null);
  const [ comment, setComment ] = useState('');
  const [ deleteComment, setDeleteComment ] = useState(false);

  const auth = useContext(AuthContext);

  const navigate = useNavigate();
  const storedData = JSON.parse(localStorage.getItem('userData'));

  const yourConfig = {};
  if(auth.isLoggedIn)
    yourConfig['headers'] = {
      Authorization: "Bearer " + storedData['token']
  }

  useEffect(() => {
    const fetchPost = async () => {
        try {
          const response = await axios.get(`/posts/${postId}`, yourConfig);
          setPost(response.data[0]);
        } catch (error) {
          console.error('Error fetching post:', error);
        }
    };

    fetchPost();
  }, [postId, deleteComment, comment]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.target);

      const body = {};
      body['commenter'] = formData['commenter'];
      body['text'] = comment;
      body['userId'] = formData['userId'];

      await axios.post(`/posts/${postId}/comments`, body, yourConfig);
      setComment('');
    } catch (error) {
        console.error('Failed to create category:', error);
      }
    }

  const handleDelete = async () => {
    if (window.confirm('Are you sure?')) {
      try {
        await axios.delete(`/posts/${post.ID}`, yourConfig);
        navigate('/posts');
      } catch (error) {
        console.error('Failed to delete post:', error);
      }
    }
  };

  const handleCommentDelete = async (commentId) => {
    if (window.confirm('Are you sure?')) {
      try {
        await axios.delete(`/posts/${post.ID}/comments/${commentId}`, yourConfig);
        setDeleteComment(!deleteComment);
      } catch (error) {
        console.error('Failed to delete comment:', error);
      }
    }
  };

  return (
    post &&
    <div className="post">
      <div className="button-container" style={{ textAlign: 'left' }}>
        <Link to="/posts" className="like-button">Back</Link>
      </div>
      <h1>{post.TITLE}</h1>

      <p><strong>Description:</strong> {post.DESCRIPTION}</p>
      <p>{post.LIKES === 1 ? 'Like: ' : 'Likes: '}{post.LIKES}</p>

      {post.categories.length > 0 &&
        <p>
          <strong>Categories:</strong>
          {post.categories.map(category => (
            <span key={category.id}> {category.title} </span>
          ))}
        </p>
      }
      { auth.isLoggedIn && <>
        <div className="post-actions">
          <Link to={`/posts/${post.ID}/edit`} state={{ currentPost: post }} className="links">Edit</Link>
          <button onClick={handleDelete} className="delete-button">Delete</button>
        </div>
        <div className="like-button">
          Like
        </div>
      </>}

      <div className="comment-form">
        <h2>Add Comment:</h2>
        <form onSubmit={handleSubmit} className="comment-form">

          <input type="hidden" id="commenter" value={storedData['name']} className="form-control" />

          <div className="form-group">
            <label htmlFor="text" className="form-label">Comment:</label><br />
            <input
              type="text"
              id="text"
              className="form-control"
              value={comment}
              onChange={(e) => {setComment(e.target.value)}}
            />
          </div>

          <input type="hidden" id="userId" value={storedData['userId']} className="form-control" />

          <div className="button-container">
            <button type="submit" className="like-button">Submit</button>
          </div>
        </form>
      </div>

      {post.comments && (
        <div className="post-comment-box">
          <h2>Comments:</h2>
          {post.comments.map(comment => (
            <div key={comment.id} className="comment">
              <p><strong>Commenter:</strong> {comment.commenter}</p>
              <p><strong>Comment:</strong> {comment.TEXT}</p>
              { auth.isLoggedIn && 
                <div className="comment-actions">
                  <button onClick={() => handleCommentDelete(comment.id)} className="delete-button">Delete</button>
                </div>
              }
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PostDetails;