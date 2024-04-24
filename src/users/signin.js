import React from 'react';
import { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';

function SignIn() {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/users/signin', user);

      navigate('/login');
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className="comment-form">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} className="category-form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" required className="form-control" value={user.username} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required className="form-control" value={user.email} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required className="form-control" value={user.password} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password_confirmation">Confirm Password</label>
          <input type="password" id="password_confirmation" name="password_confirmation" required className="form-control" value={user.password_confirmation} onChange={handleChange} />
        </div>
        <div className="button-container">
          <button type="submit" className="like-button">Sign Up</button>
        </div>
      </form>
    </div>
  );
}

export default SignIn;