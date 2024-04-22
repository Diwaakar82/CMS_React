import React from 'react';
import { Link } from 'react-router-dom';
import "./index.css"

function Home() {
  return (
    <div className="landing_page">
      <h1>Content Management System</h1>
      <Link to="/categories" className="welcome_button">Categories</Link>

      <Link to="/posts" className="welcome_button">Posts</Link>
      {/* {userSignedIn && (
        <Link to={`/users/${currentUserId}/my_posts`} className="welcome_button">My Posts</Link>
      )} */}
    </div>
  );
}

export default Home;