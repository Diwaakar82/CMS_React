import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../shared/auth";
import axios from 'axios';

const LogIn = () => {
    const auth = useContext(AuthContext);
    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    }

    const loginHandler = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('/users/login', user);

            const data = response['data'];
            
            auth.login(data.id, data.accessToken, data.name);
            navigate(`/`);
        } catch (err) {
            console.error('Error logging in:', err);
        }
    }

    return (
        <div className="comment-form">
            <h2>Login</h2>
            <form onSubmit={loginHandler} className="category-form">
                <div className="form-group">
                <label htmlFor="email">Email</label><br />
                <input type="email" id="email" name="email" autoFocus autoComplete="email" className="form-control" value={user.email} onChange={handleChange} />
                </div>
                <div className="form-group">
                <label htmlFor="password">Password</label><br />
                <input type="password" id="password" name="password" autoComplete="current-password" className="form-control" value={user.password} onChange={handleChange} />
                </div>
                <div className="button-container">
                <button type="submit" className="like-button">Sign In</button>
                </div>
            </form>
        </div>
    )
}

export default LogIn;