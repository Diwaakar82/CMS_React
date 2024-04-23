import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function PostDetails() {
  const { postId } = useParams();
  const [ post, setPost ] = useState(null);
  const [ deleteComment, setDeleteComment ] = useState(false);


  const navigate = useNavigate();

  const yourConfig = {
    headers: {
        Authorization: "Bearer " + process.env.REACT_APP_BEARER_TOKEN
    }
  }

  useEffect(() => {
    const fetchPost = async () => {
        try {
          const response = await axios.get(`/posts/${postId}`, yourConfig);
          setPost(response.data[0]);
          console.log(response.data[0]);
        } catch (error) {
          console.error('Error fetching post:', error);
        }
    };

    fetchPost();
  }, [postId]);

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
    console.log(commentId);
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

      {/* <p><strong>Posted by:</strong> {username(post.userId)}</p> */}

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
      <div className="post-actions">
        <Link to={`/posts/${post.ID}/edit`} state={{ currentPost: post }} className="links">Edit</Link>
        <button onClick={handleDelete} className="delete-button">Delete</button>
      </div>
      <div className="like-button">
        Like
      </div>
      <div className="comment-form">
        {/* Comment form */}
      </div>
      {post.comments && (
        <div className="post-comment-box">
          <h2>Comments:</h2>
          {post.comments.map(comment => (
            <div key={comment.id} className="comment">
              <p><strong>Commenter:</strong> {comment.id}</p>
              <p><strong>Comment:</strong> {comment.TEXT}</p>
              <div className="comment-actions">
                <button onClick={() => handleCommentDelete(comment.id)} className="delete-button">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PostDetails;