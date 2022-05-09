import React from 'react'
import PostAuthor from "./PostAuthor";
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButtons';

const PostsExcerpt = (props) => {
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
    </article>
  )
}

export default PostsExcerpt
