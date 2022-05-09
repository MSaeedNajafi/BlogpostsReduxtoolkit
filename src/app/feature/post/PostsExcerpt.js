import React from 'react'
import PostAuthor from "./PostAuthor";
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButtons';
import { postsRemoved } from './postsSlice';
import { useDispatch } from 'react-redux';


const PostsExcerpt = (props) => {
  const dispatch = useDispatch()
  const {post} =  props;
  
  return (
    <article>
        <h3>{props.index+1}) {post.title}</h3>
        <p>{post.body.substring(0, 100)}</p>

        <div className='postCredit'>
            <PostAuthor userId={post.userId} />
            <TimeAgo timeStamp={post.date} />
        </div>
        <ReactionButtons post={post}/>

        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between',marginTop: 10 }}>
          <button>Edit Post</button>

          <button onClick={() => dispatch(postsRemoved({postId: post.id}))}>Remove Post</button>

        </div>
    </article>
  )
}

export default PostsExcerpt
