import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectAllUsers } from "../user/usersSlice";
import { addNewPost } from "./postsSlice";


const AddPostForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const users = useSelector(selectAllUsers)

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [userId, setUserId] = useState('')
    const [addRequestStatus, setAddRequestStatus] = useState('idle')

    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)
    const onAuthorChanged = e => setUserId(e.target.value)

    // check to see if the title and the user id and content are all true
    // enable or disable the form button
    // const canSave = Boolean(title) && Boolean(content) && Boolean(userId)
    const canSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle';
    const onSavePostClicked = () => {
        // if (title && content) {
        //     dispatch(
        //         postAdded(title, content, userId)
        //     )
        //     setTitle('')
        //     setContent('')
        //     setUserId('')
        // }

        // check the status now
        if(canSave){
            try{
                setAddRequestStatus('loading')
                dispatch(addNewPost({title, body: content, userId})).unwrap()

                // unwrap() function is added to the return promise
                // so it returns a new promise that either has the action payload or it throws as error if its the rejected action
                // unwrap() lets us use try-catch since it will either succesful or it will rhow an error

                setTitle('')
                setContent('')
                setUserId('')
                navigate('/')
            }
            catch (e){
                console.log(e.message)
            }
            // at the end set the status abck to idle
            finally{
                setAddRequestStatus('idle')
            }
        }
    }

    const userOptions = users.map(user => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ))

    return (
        <section>
            <h2>Add a New Post</h2>
            <form>
                <label htmlFor="postTitle">Post Title:</label>
                <input
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={onTitleChanged}
                />

                <label htmlFor="postTitle">Author:</label>
                <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
                    <option value=""></option>
                    {userOptions}
                </select>


                <label htmlFor="postContent">Content:</label>
                <textarea
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChanged}
                />
                <button disabled={!canSave} type="button" onClick={onSavePostClicked}>Save Post</button>
            </form>
        </section>
    )
}

export default AddPostForm