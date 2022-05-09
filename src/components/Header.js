import { Link } from 'react-router-dom';

import React from 'react'

const Header = () => {
  return (
    <header className='Header'>
        <h1>My Blog</h1>
        <nav>
            <ul className='navItem'>
                <li><Link className='itemLIst' to="/">Home</Link></li>
                <li><Link className='itemLIst' to="post">Add Post</Link></li>
            </ul>
        </nav>
    </header>
  )
}

export default Header