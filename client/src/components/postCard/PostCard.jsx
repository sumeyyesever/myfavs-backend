import React from 'react'
import "./postCard.css"
import DeleteButtonPost from '../deletePostButton/DeleteButtonPost'
import UpdatePostButton from '../updatePostButton/UpdatePostButton'

export default function PostCard({ post }) {
  return (
    <div className='postcard-container'>
      <h2 className='postcard-title'>{post.title}</h2>
      <span className='postcard-cat'>#{post.category}</span>
      <span className='postcard-star'>{post.rating}</span>
      <p className='postcard-par'>{post.description}</p>
      <div className='postcard-buttons'>
        <UpdatePostButton post={post} />
        <DeleteButtonPost id={post.id} />
      </div>
    </div>
  )
}
