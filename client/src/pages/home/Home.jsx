import React, { useEffect, useState } from 'react'
import PostCard from '../../components/postCard/PostCard'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import "./home.css"
import axios from "axios";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/posts");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <>
      <Header />
      <div className='home-container'>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      <Footer />
    </>
  )
}
