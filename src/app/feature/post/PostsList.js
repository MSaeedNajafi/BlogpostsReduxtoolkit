import React from 'react'
import { useSelector } from "react-redux"; 
import PostsExcerpt from './PostsExcerpt';
import { selectAllPosts, getPostError, getPostsStatus } from "./postsSlice";

 
const PostsList = () => {
    const posts = useSelector(selectAllPosts)
    const postsStatus = useSelector(getPostsStatus)
    const postsError = useSelector(getPostError)

    // useEffect(()=> {
    //     if(postsStatus === 'idle'){
    //         dispatch(fetchPosts())
    //     }
    // },[postsStatus, dispatch])
    

    // // to make the new post comes on top
    // // localeCompare returns -1 , 0, 1 based on the if one is greater than the other
    // // slice returns the shallow copy of the array
    // const orderedPosts = posts.slice().sort((a,b) => b.date.localeCompare(a.date));

    // const rebderPosts = orderedPosts.map(post => (
    //     <PostsExcerpt post={post} />
    // ))

    let content;
    if(postsStatus === 'loading'){
        content = <p>Loading...</p>
    }
    else if(postsStatus === 'succeeded'){
        const orderedPosts = posts.slice().sort((a,b) => b.date.localeCompare(a.date));
        content = orderedPosts.map((post, index) => <PostsExcerpt key={post.id} post={post} index={index}/>)
    }
    else if(postsStatus === 'failed'){
        content = <p>{postsError}</p>
    }

    return (
        <section>
            {content}
        </section>
    )
}
 
export default PostsList