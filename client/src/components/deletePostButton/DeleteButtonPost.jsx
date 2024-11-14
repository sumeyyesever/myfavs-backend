import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function DeleteButtonPost({ id }) {
  const navgiate = useNavigate();
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${id}`);
      console.log("post deleted successfully");
      navgiate(0);
    } catch (error) {
      console.error("error deleting post:", error);
    }
  };

  return (
    <div onClick={handleDelete} style={{ cursor: 'pointer' }}>
      <span>🗑</span>
    </div>
  );
}
