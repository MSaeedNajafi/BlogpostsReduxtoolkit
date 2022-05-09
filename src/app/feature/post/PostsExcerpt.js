import React from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import PostAuthor from "./PostAuthor";
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButtons';
import { postsRemoved } from './postsSlice';



const PostsExcerpt = (props) => {
  const dispatch = useDispatch()
  const {post} =  props;
  
  return (
    <article>
        <h3>{post.id}) {post.title}</h3>
        <p className='excerpt '>{post.body.substring(0, 75)}...</p>

        <div className='postCredit'>
          <br />
          <PostAuthor userId={post.userId} />
          <TimeAgo timeStamp={post.date} />
        </div>
        <ReactionButtons post={post}/>

        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between',marginTop: 10 }}>
          <button>
            <Link className='viewPost' to={`post/${post.id}`}>View Post</Link>
          </button>

          <button onClick={() => dispatch(postsRemoved({postId: post.id}))}>Remove Post</button>

        </div>
    </article>
  )
}

export default PostsExcerpt
