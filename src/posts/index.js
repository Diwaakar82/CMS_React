import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../shared/auth';

function Posts() {
  const [posts, setPosts] = useState([]);
  const auth = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/posts');
        setPosts(response.data);

        document.querySelectorAll('.post-nav').forEach(function(element) {
            element.classList.add('active');
        });
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const likePost = async (postId) => {
    try {
      const response = await axios.post(`/posts/${postId}/like`);
      const updatedPosts = posts.map(post => {
        if (post.id === postId) {
          return { ...post, likes: response.data.likes };
        }
        return post;
      });
      setPosts(updatedPosts);
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  return (
    <div>
        { auth.isLoggedIn && (
          <p className="button-container" style={{ textAlign: 'right' }}>
              <a href="posts/new" className="like-button">Add post</a>
          </p>
        )}

      <h1 className="category_title">Posts</h1>

      <div className="post-container">
        {posts.map(post => (
          <div className="post" key={post.ID}>
            <div className="post-title">{post.TITLE}</div>
            <div className="post-description">{post.DESCRIPTION}</div>
            <div>Likes: {post.LIKES}</div>

            <div className="post-actions">
              <a href={`/posts/${post.ID}`}>Show</a>

                {auth.isLoggedIn && 
                  <button className="like-button" onClick={() => likePost(post.ID)}>
                      Like
                    {/* {post.likes.find(like => like.user_id === currentUserId) ? 'Unlike' : 'Like'} */}
                  </button>
                }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Posts;