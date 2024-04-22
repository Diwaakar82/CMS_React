import React from 'react';
import { Outlet, Link } from 'react-router-dom'; // Import Link for navigation
import './navbar.css';

function Navbar() {
  return (
    <>
      <header>
        <div className='h1_container'>
          <nav className='navbar'>
            <ul>
              <li><Link to="/categories" className="category-nav">Categories</Link></li>

              <li><Link to="/posts" className="post-nav">Posts</Link></li>
              <li style={{ float: 'right' }}><Link to="/signup" className="signup-nav">Sign Up</Link></li>
              <li style={{ float: 'right' }}><Link to="/login" className="signin-nav">Sign In</Link></li>
              
              <li><Link to="/users/1/my_posts" className="my-posts-nav">My Posts</Link></li>
              <li style={{ float: 'right' }}><Link to="/logout" className="signout-nav">Sign Out</Link></li>
              <li style={{ float: 'right' }}><Link to="/edit_profile" className="edit-profile-nav">Edit Profile</Link></li>
            </ul>
          </nav>
        </div>
      </header>
      <br />
      <br />
      <br />
      <Outlet />
    </>
  );
}

export default Navbar;