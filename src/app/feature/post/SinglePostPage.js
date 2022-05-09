import React from 'react'
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getPostById, postsRemoved } from "./postsSlice";

import PostAuthor from "./PostAuthor";
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButtons';

const SinglePostPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const {postId} = useParams()
    const post = useSelector((state) => getPostById(state, Number(postId)))

    if(!post){
        return (
            <section>
                <h2>Post Not Found.</h2>
            </section>
        )
    }


    return (
        <article>
            <h2>{post.id}) {post.title}</h2>
            <p>{post.body}</p>

            <div className='postCredit'>
                <PostAuthor userId={post.userId} />
                <TimeAgo timeStamp={post.date} />
            </div>
            <ReactionButtons post={post}/>

            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between',marginTop: 10 }}>
                <button>Edit Post</button>
                <button onClick={() => {dispatch(postsRemoved({postId: post.id})); navigate('/');}}>Remove Post</button>
            </div>
        </article>
    )
}

export default SinglePostPage
