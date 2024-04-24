import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../shared/auth';
import "./index.css"

function Home() {
  const auth = useContext(AuthContext);
  const storedData = JSON.parse(localStorage.getItem('userData'));

  return (
    <div className="landing_page">
      <h1>Content Management System</h1>
      <Link to="/categories" className="welcome_button">Categories</Link>

      <Link to="/posts" className="welcome_button">Posts</Link>

      { auth.isLoggedIn &&
          (<><Link to={`/users/${storedData['userId']}/my_posts`} className="welcome_button">My Posts</Link></>)
      }
    </div>
  );
}

export default Home;