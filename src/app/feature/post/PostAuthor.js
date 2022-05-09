import { useSelector } from "react-redux";
import { selectAllUsers } from "../user/usersSlice";

import React from 'react'

function PostAuthor(props) {

    const {userId} = props

    const users = useSelector(selectAllUsers)
    const author = users.find(u => u.id === userId)

    return (
        <span>by {author ? author.name : 'Unknown' } </span>
    )
}

export default PostAuthor
