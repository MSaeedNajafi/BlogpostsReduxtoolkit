import React, {useState} from 'react'
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPostById, deletePost } from "./postsSlice";

import PostAuthor from "./PostAuthor";
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButtons';

const SinglePostPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const {postId} = useParams()
    const [requestStatus, setRequestStatus] = useState('idle')

    const post = useSelector((state) => getPostById(state, Number(postId)))

    const onDeletePostClicked = () => {
        try{
            setRequestStatus('pending')
            dispatch(deletePost({ postId: post.id })).unwrap()
            
            navigate('/')
        }
        catch(e){
            console.error('Failed to delete the post', e)
        }
        finally {
            setRequestStatus('idle')
        }
    }

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
                <button><Link className='viewPost' to={`/post/edit/${post.id}`} >Edit Post</Link></button>
                <button className="deleteButton"
                    type="button" onClick={onDeletePostClicked}>Remove Post</button>
            </div>
        </article>
    )
}


export default SinglePostPage
