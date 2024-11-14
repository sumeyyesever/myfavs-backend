import React, { useState } from 'react'
import "./write.css"
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import axios from "axios"
import { useLocation, useNavigate } from 'react-router-dom';

export default function Write() {
    const state = useLocation().state;
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: state?.title || '',
        rating: state?.rating || '',
        category: state?.category || '',
        description: state?.description || ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (state) {
                //update an existing post
                const response = await axios.put(`http://localhost:5000/api/posts/${state.id}`, formData);
                console.log('Update Response:', response.data);
            } else {
                //create a new post
                const response = await axios.post("http://localhost:5000/api/posts", formData);
                console.log('Create Response:', response.data);
            }
            setFormData({ title: '', rating: '', category: '', description: '' });
            navigate("/");
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <>
            <Header />
            <div className='write-container'>
                <form className="write-form" onSubmit={handleSubmit}>
                    <input
                        className='title-input'
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder='Title'
                        required
                    />
                    <input
                        className='cat-input'
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        placeholder='#category'
                        required
                    />
                    <div className='stars-container'>
                        <label>
                            <input
                                type="radio"
                                name="rating"
                                value="★★★★"
                                checked={formData.rating === "★★★★"}
                                onChange={handleChange}
                            />
                            ★★★★
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="rating"
                                value="★★★★★"
                                checked={formData.rating === "★★★★★"}
                                onChange={handleChange}
                            />
                            ★★★★★
                        </label>
                    </div>
                    <textarea
                        className='write-textarea'
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                    <button className='submit-button' type="submit">
                        Submit
                    </button>
                </form>
            </div>
            <Footer />
        </>
    )
}
