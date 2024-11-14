import React from 'react'
import { Link } from 'react-router-dom'

export default function UpdatePostButton({post}) {
  return (
    <div>
      <Link to={`/write?edit=2`} state={post}>
        <span className='edit-button'>✎</span>
      </Link> 
    </div>
  )
}
