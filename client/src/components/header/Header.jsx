import React from 'react'
import "./header.css"
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <div className='header'>
      <Link className="link" to="/"><span className='header-logo'>MyFavs</span></Link>
      <Link className='link' to="/write"><button className='write-button'>Write</button></Link>
    </div>
  )
}

