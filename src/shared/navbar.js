import React, { useContext } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom'; // Import Link for navigation
import './navbar.css';
import {AuthContext} from './auth';

function Navbar() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = (e) => {
    e.preventDefault();
    auth.logout();

    navigate('/users/login');
  }

  return (
    <>
      <header>
        <div className='h1_container'>
          <nav className='navbar'>
            <ul>
              <li><Link to="/categories" className="category-nav">Categories</Link></li>

              <li><Link to="/posts" className="post-nav">Posts</Link></li>
              { !auth.isLoggedIn && (
                <>
                  <li style={{ float: 'right' }}><Link to="/users/signup" className="signup-nav">Sign Up</Link></li>
                  <li style={{ float: 'right' }}><Link to="/users/login" className="signin-nav">Sign In</Link></li>
                </>
              )}

              { auth.isLoggedIn && (
                <>
                  <li style={{ float: 'right' }}><Link onClick={logout} className="signout-nav">Sign Out</Link></li>
                </>
              )}
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