import React, {useState} from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import PostAuthor from "./PostAuthor";
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButtons';
import { deletePost } from './postsSlice';



const PostsExcerpt = (props) => {
  const {post} =  props;
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [requestStatus, setRequestStatus] = useState('idle')

  const onDeletePostClicked = () => {
    try {
        setRequestStatus('loading')
        dispatch(deletePost({ postId: post.id })).unwrap()

        navigate('/')
    } catch (err) {
        console.error('Failed to delete the post', err)
    } finally {
        setRequestStatus('idle')
    }
}
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

          <button onClick={onDeletePostClicked}>Remove Post</button>

        </div>
    </article>
  )
}

export default PostsExcerpt
