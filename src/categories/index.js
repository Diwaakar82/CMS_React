import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./categories.css"
import { AuthContext } from '../shared/auth';

const Categories = () => {
    const [categories, setCategories] = useState([]);

    const auth = useContext(AuthContext);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`/categories`);
                setCategories(response.data);

                document.querySelectorAll('.category-nav').forEach(function(element) {
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
            {auth.isLoggedIn && (
                <div className="button-container" style={{ textAlign: 'right' }}>
                    <Link to="/categories/new" className="like-button">Add Category</Link>
                </div>
            )}
            <br />

            <h1 className="category_title">Categories</h1>
            <div className="categories">
                {categories.map(category => (
                    <Link key={category.id} to={`/categories/posts/${category.id}`} state={{ categoryName: category.title }} className="links">
                        {category.title}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Categories;